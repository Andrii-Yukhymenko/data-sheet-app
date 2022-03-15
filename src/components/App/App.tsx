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
  const [fullSheet, setFullSheet] = useState<Array<dataItem>>([]);
  const [croppedSheet, setCroppedSheet] = useState<Array<dataItem>>([]);
  const [detail, setDetail] = useState<any>({});
  const onePageLimit: number = 50;
  const [fetchData, isLoad, error] = useFetching(() => {
    API.getFullSheet().then((response) => setFullSheet(response.data));
  });
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    API.getFullSheet().then((response) => setFullSheet(response.data)).finally(() => setLoad(true))
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
          {load ? (
            <>
              <DataList croppedSheet={croppedSheet} setDetail={setDetail} />
              <Detail detail={detail} />
            </>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </section>
      <Pagination currentPage={currentPage} totalCount={20} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
