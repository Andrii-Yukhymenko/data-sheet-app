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

  // Пагинация
  const onePageLimit: number = 50;
  const [paginationPagesCount, setPaginationPagesCount] = useState<number>(0);

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
  const sorter: (params: any) => void = (params) => {
    // todo: ошибка с типом у type

    // Без сортировки
    if (params.type === '') {
      setSortedSheet(fullSheet);
    }

    // Сортировка по id
    if (params.type === 'id') {
      if (params.orientation === 'up') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            return Number(obj1.id) - Number(obj2.id);
          }),
        );
      }
      if (params.orientation === 'down') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            return Number(obj2.id) - Number(obj1.id);
          }),
        );
      }
    }

    // Сортировка по имени
    if (params.type === 'firstName') {
      if (params.orientation === 'up') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.firstName.toLowerCase();
            let name2 = obj2.firstName.toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            if (name1 > name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
      if (params.orientation === 'down') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.firstName.toLowerCase();
            let name2 = obj2.firstName.toLowerCase();
            if (name1 > name2) {
              return -1;
            }
            if (name1 < name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
    }

    // Сортировка по фамилии
    if (params.type === 'lastName') {
      if (params.orientation === 'up') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.lastName.toLowerCase();
            let name2 = obj2.lastName.toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            if (name1 > name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
      if (params.orientation === 'down') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.lastName.toLowerCase();
            let name2 = obj2.lastName.toLowerCase();
            if (name1 > name2) {
              return -1;
            }
            if (name1 < name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
    }

    // Сортировка по почте
    if (params.type === 'email') {
      if (params.orientation === 'up') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.email.toLowerCase();
            let name2 = obj2.email.toLowerCase();
            if (name1 < name2) {
              return -1;
            }
            if (name1 > name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
      if (params.orientation === 'down') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            let name1 = obj1.email.toLowerCase();
            let name2 = obj2.email.toLowerCase();
            if (name1 > name2) {
              return -1;
            }
            if (name1 < name2) {
              return 1;
            }
            return 0;
          }),
        );
      }
    }

    // Сортировка по телефону
    if (params.type === 'phone') {
      if (params.orientation === 'up') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            return Number(obj1.phone) - Number(obj2.phone);
          }),
        );
      }
      if (params.orientation === 'down') {
        setSortedSheet(
          fullSheet.sort((obj1, obj2) => {
            return Number(obj2.phone) - Number(obj1.phone);
          }),
        );
      }
    }
  };

  // Filter
  const filterer: (params: filterParamsTypes) => any = async (params) => {
    // todo: ошибка с типом у params
    let tempSheet: Array<dataItem> = [...sortedSheet];
    await Object.entries(params).forEach(([paramsType, paramsValue]) => {
      // ! Такое ощущение, что forEach подбирает массив tempSheet только один раз и больше не выплевывает его наружу
      tempSheet = tempSheet.filter(async (sheetRow: any) => {
        // todo: решить вопрос с типами, как их использовать и вызывать в sheetRow
        let c = sheetRow[paramsType];
        // Проблема из-за того что с сервера id приходит как число
        // ! Id теперь это строка
        console.log(`Итерация внутри filter: строка - ${c}, содержит - ${paramsValue}`);
        if (c?.includes(paramsValue)) {
          console.log('совпадение');
          return true;
        }
        // return c.includes(vv);
      });
      console.log('forEach is end');
    });

    setFilteredSheet(tempSheet);
    console.log('set is end');
  };

  // При изменении fullSheet присваиваем состоянию sortedSheet значение fullSheet
  // При изменении sortedSheet присваиваем состоянию filteredSheet значение sortedSheet
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
    console.clear();
    mutateSheet();
  }, [filterParams, sortParams, fullSheet]);

  // Если просчитать количество страниц псле фильтрации, то состояние не успевает обновляться из за асинхронности(я это так понимаю)
  // Поэтому этот юзэфект вынужден
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
