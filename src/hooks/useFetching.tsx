import { useState } from 'react';
import {useFetchingReturn} from "../types";

export const useFetching: (callback: Function) => useFetchingReturn = (callback) => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetching = async () => {
    try {
      await callback();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoad(true);
    }
  };

  return [fetching, isLoad, error];
};

// Принимает коллбек функцию которая должна(выполнитца).
// Возвращает: первое значение - ту же функцию, но уже обработаную;
//             второе значение - булевое значение закончилась ли загрузка
//             третее значение - ошибка, если она есть.
