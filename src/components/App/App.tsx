import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import classes from './App.module.css';
import globalClasses from '../../style/global.module.css';
import Detail from '../Detail/Detail';
import DataList from '../DataList/DataList';
import Pagination from '../Pagination/Pagination';
import API from '../../API';
import { dataItem, filterParamsTypes, sorterParameters, sortParams } from '../../types';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fullSheet, setFullSheet] = useState<Array<dataItem>>([]);
  const [sortedSheet, setSortedSheet] = useState<Array<dataItem>>([]);
  const [croppedSheet, setCroppedSheet] = useState<Array<dataItem>>([]);
  // todo: исправить тип данных в detail на собственный
  const [detail, setDetail] = useState<any>({});
  const onePageLimit: number = 50;
  // const [fetchData, isLoad, error] = useFetching(() => {
  //   API.getFullSheet().then((response) => setFullSheet(response.data));
  // });
  const [load, setLoad] = useState<boolean>(false);

  // todo: сделать умную отрисовку количества страниц в пагинации.
  // todo: Сначала берем длинну массива filteredSheet и делим на onePageLimit и дальше уже отрисовываем

  // Filter State
  const [filterParams, setFilterParams] = useState<filterParamsTypes>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [filteredSheet, setFilteredSheet] = useState<Array<dataItem>>([]);

  // Sort State
  const [sortParams, setSortParams] = useState<sortParams>({ type: '', orientation: '' });

  const sorter: (type: any) => void = (type) => {
    // todo: ошибка с типом у type
    // if (type === 'id') {
    //   setSortedSheet(sortedSheet.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
    // }
    // Возвращает undefined
    // if (type === undefined) {
    setSortedSheet(fullSheet);
    // }
  };

  // Filter
  const filterer: (params: any) => void = (params) => {
    // todo: ошибка с типом у params
    let tempSheet = [...sortedSheet];
    Object.entries(params).forEach(([filterParameter, val]) => {
      console.log(typeof val);
      tempSheet = tempSheet.filter((sheetRow) => {
        // todo: решить вопрос с типами, как их использовать и вызывать в sheetRow
        if (sheetRow['email'].includes('')) {
          return sheetRow;
        }
      });
    });

    // Возвращает объект параметров, где каждый - пустая строка
    setFilteredSheet(tempSheet);
  };
  // При изменении fullSheet присваиваем состоянию sortedSheet значение fullSheet
  // При изменении sortedSheet присваиваем состоянию filteredSheet значение sortedSheet
  // В таблице отрисосвываем filteredSheet
  // Обрезать теперь нужно filteredSheet а не fullSheet

  const mutateSheet: () => void = () => {
    let mutatedSheet = [...fullSheet];
    sorter(sortParams);
    console.log(filterParams);
    filterer(filterParams);
  };

  // Effects
  // Получение данных из сервера при первой отрисовке
  useEffect(() => {
    API.getFullSheet()
      .then((response) => setFullSheet(response.data))
      .then(() => setSortedSheet(fullSheet))
      .finally(() => setLoad(true));
  }, []);

  // Обрезание таблицы для вывода пстраничн
  useEffect(() => {
    setCroppedSheet(
      filteredSheet?.slice(currentPage * onePageLimit - onePageLimit, currentPage * onePageLimit),
    );
  }, [filteredSheet, currentPage]);

  // Сортировка и фильтрация
  useEffect(() => {
    mutateSheet();
  }, [filterParams, sortParams, fullSheet]);

  // Render
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
