import { useState } from 'react';

export const useFetching = (callback: Function): [Function, boolean, string] => {
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

// Принимает коллбек функцию которая должна(выполнится).
// Возвращает: первое значение - ту же функцию, но уже обработанную;
//             второе значение - булиновое значение закончилась ли загрузка
//             третье значение - ошибка, если она есть.
