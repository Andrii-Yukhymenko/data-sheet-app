import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import classes from './App.module.css';
import globalClasses from '../../style/global.module.css';
import Detail from '../Detail/Detail';
import DataList from '../DataList/DataList';
import Pagination from '../Pagination/Pagination';
import API from '../../API';
import { dataItem } from '../../types';
import { useFetching } from '../../hooks/useFetching';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fullSheet, setFullSheet] = useState<dataItem[]>([]);
  const onePageLimit: number = 50;
  const [croppedSheet, setCroppedSheet] = useState<Array<dataItem>>([]);
  const [fetchData, isLoad, error] = useFetching(() => {
    API.getFullSheet().then((response) => setFullSheet(response.data));
  });
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setCroppedSheet(
      fullSheet?.slice(currentPage * onePageLimit - onePageLimit, currentPage * onePageLimit),
    );
    console.log(croppedSheet);
  }, [fullSheet, currentPage]);

  return (
    <>
      <Search />
      <section>
        <div className={`${classes.columns} ${globalClasses.container}`}>
          <DataList croppedSheet={croppedSheet} isLoad={isLoad}/>
          <Detail />
        </div>
      </section>
      <Pagination currentPage={currentPage} totalCount={20} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
