import React, { useCallback, useEffect, useState } from 'react';
import Search from '../Search/Search';
import classes from './App.module.css';
import globalClasses from '../../style/global.module.css';
import Detail from '../Detail/Detail';
import DataList from '../DataList/DataList';
import Pagination from '../Pagination/Pagination';
import API from '../../API';
import { dataItem, filterParamsTypes, sortParams } from '../../types';

function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fullSheet, setFullSheet] = useState<Array<dataItem>>([]);
  const [sortedSheet, setSortedSheet] = useState<Array<dataItem>>([]);
  const [croppedSheet, setCroppedSheet] = useState<Array<dataItem>>([]);
  const [detail, setDetail] = useState<any>({});
  const [load, setLoad] = useState<boolean>(false);

  // Пагинация
  const onePageLimit: number = 50;
  const [paginationPagesCount, setPaginationPagesCount] = useState<number>(0);

  // Filter State
  const [filterParams, setFilterParams] = useState<filterParamsTypes>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [filteredSheet, setFilteredSheet] = useState<Array<dataItem>>([]);
  const filterer = useCallback(() => {
    const { id, firstName, lastName, email, phone } = filterParams;
    setFilteredSheet(
      sortedSheet.filter(
        (itemFilter: dataItem) =>
          String(itemFilter.id).toLowerCase().includes(id.toLowerCase()) &&
          itemFilter.firstName.toLowerCase().includes(firstName.toLowerCase()) &&
          itemFilter.lastName.toLowerCase().includes(lastName.toLowerCase()) &&
          itemFilter.email.toLowerCase().includes(email.toLowerCase()) &&
          itemFilter.phone.toLowerCase().includes(phone.toLowerCase()),
      ),
    );
  }, [sortedSheet, filterParams]);

  // Sort State
  const [sortParams, setSortParams] = useState<sortParams>({ type: '', orientation: '' });
  const sorter = (params: sortParams) => {
    // Без сортировки
    if (params.type === '') {
      setSortedSheet(fullSheet);
    }

    // Сортировка по id
    if (params.type === 'id') {
      setSortedSheet(
        fullSheet.sort((obj1, obj2) => {
          if (params.orientation === 'up') {
            return Number(obj1.id) - Number(obj2.id);
          } else {
            return Number(obj2.id) - Number(obj1.id);
          }
        }),
      );
    }

    // Сортировка по имени
    if (params.type === 'firstName') {
      setSortedSheet(
        fullSheet.sort((obj1, obj2) => {
          if (obj1.firstName.toLowerCase() < obj2.firstName.toLowerCase()) {
            return params.orientation === 'up' ? -1 : 1;
          }
          if (obj1.firstName.toLowerCase() > obj2.firstName.toLowerCase()) {
            return params.orientation === 'down' ? -1 : 1;
          }
          return 0;
        }),
      );
    }

    // Сортировка по фамилии
    if (params.type === 'lastName') {
      setSortedSheet(
        fullSheet.sort((obj1, obj2) => {
          if (obj1.lastName.toLowerCase() < obj2.lastName.toLowerCase()) {
            return params.orientation === 'up' ? -1 : 1;
          }
          if (obj1.lastName.toLowerCase() > obj2.lastName.toLowerCase()) {
            return params.orientation === 'down' ? -1 : 1;
          }
          return 0;
        }),
      );
    }

    // Сортировка по почте
    if (params.type === 'email') {
      setSortedSheet(
        fullSheet.sort((obj1, obj2) => {
          if (obj1.email.toLowerCase() < obj2.email.toLowerCase()) {
            return params.orientation === 'up' ? -1 : 1;
          }
          if (obj1.email.toLowerCase() > obj2.email.toLowerCase()) {
            return params.orientation === 'down' ? -1 : 1;
          }
          return 0;
        }),
      );
    }

    // Сортировка по телефону
    if (params.type === 'phone') {
      setSortedSheet(
        fullSheet.sort((obj1, obj2) => {
          if (params.orientation === 'up') {
            return Number(obj1.phone) - Number(obj2.phone);
          } else {
            return Number(obj2.phone) - Number(obj1.phone);
          }
        }),
      );
    }
  };

  // Сортировка + фильтрация
  const mutateSheet: () => void = () => {
    sorter(sortParams);
    filterer();
  };

  // Effects
  // Получение данных из сервера при первой отрисовке
  useEffect(() => {
    API.getFullSheet()
      .then((response) => setFullSheet(response.data))
      .finally(() => setLoad(true));
  }, []);

  // Обрезание таблицы для вывода постранично
  useEffect(() => {
    setCroppedSheet(
      filteredSheet?.slice(currentPage * onePageLimit - onePageLimit, currentPage * onePageLimit),
    );
  }, [filteredSheet, currentPage]);

  // Сортировка и фильтрация
  useEffect(() => {
    console.clear();
    mutateSheet();
  }, [filterParams, sortParams, fullSheet]);

  // Если просчитать количество страниц после фильтрации, то состояние не успевает обновляться из-за асинхронности(я это так понимаю)
  // Поэтому этот эффект вынужден
  useEffect(() => {
    setPaginationPagesCount(Math.ceil(filteredSheet.length / onePageLimit));
  }, [filteredSheet]);

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
      <Pagination
        currentPage={currentPage}
        paginationPagesCount={paginationPagesCount}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
