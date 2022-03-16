import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import classes from './App.module.css';
import globalClasses from '../../style/global.module.css';
import Detail from '../Detail/Detail';
import DataList from '../DataList/DataList';
import Pagination from '../Pagination/Pagination';
import API from '../../API';
import { dataItem, filterParams, sorterParameters, sortParams } from '../../types';
import { useFetching } from '../../hooks/useFetching';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fullSheet, setFullSheet] = useState<Array<dataItem>>([]);
  const [sortedSheet, setSortedSheet] = useState<Array<dataItem>>([]);
  const [croppedSheet, setCroppedSheet] = useState<Array<dataItem>>([]);
  const [detail, setDetail] = useState<any>({});
  const onePageLimit: number = 50;
  // const [fetchData, isLoad, error] = useFetching(() => {
  //   API.getFullSheet().then((response) => setFullSheet(response.data));
  // });
  const [load, setLoad] = useState<boolean>(false);

  // Filter State
  const [filterParams, setFilterParams] = useState<filterParams>();
  const [filteredSheet, setFilteredSheet] = useState<Array<dataItem>>([]);

  // Sort State
  const [sortParams, setSortParams] = useState<sortParams>();

  const sorter: (type: sorterParameters) => void = (type) => {
    // if (type === 'id') {
    //   setSortedSheet(sortedSheet.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
    // }
    // if (type === 'firstName') {
    // }
    // if (type === 'email') {
    // }
    // if (type === 'lastName') {
    // }
    // if (type === 'email') {
    // }
    // Возвращает undefined
    if (type === undefined) {
      setSortedSheet(fullSheet);
    }
  };

  // Filter
  const filterer: (params: filterParams | undefined) => void = (params) => {
    // if (params === undefined) {
    //   setFilteredSheet(sortedSheet);
    // }
    // Возвращает объект параметров, где каждый - пустая строка
    setFilteredSheet(sortedSheet);
  };
  // При изменении fullSheet присваиваем состоянию sortedSheet значение fullSheet
  // При изменении sortedSheet присваиваем состоянию filteredSheet значение sortedSheet
  // В таблице отрисосвываем filteredSheet
  // Обрезать теперь нужно filteredSheet а не fullSheet
  //
  useEffect(() => {
    API.getFullSheet()
      .then((response) => setFullSheet(response.data))
      .then(() => setSortedSheet(fullSheet))
      .finally(() => setLoad(true));
  }, []);
  useEffect(() => {
    setCroppedSheet(
      filteredSheet?.slice(currentPage * onePageLimit - onePageLimit, currentPage * onePageLimit),
    );
    console.log(croppedSheet);
  }, [filteredSheet, currentPage]);
  useEffect(() => {
    sorter(sortParams?.type);
    filterer(filterParams);
  }, [filterParams, sortParams, fullSheet]);

  return (
    <>
      <Search setFilterParams={setFilterParams} />
      <section>
        <div className={`${classes.columns} ${globalClasses.container}`}>
          {load ? (
            <>
              <DataList
                croppedSheet={croppedSheet}
                setDetail={setDetail}
                setSortParams={setSortParams}
              />
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
