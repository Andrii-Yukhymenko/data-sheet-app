import React, { FC, useEffect, useState } from 'react';
import classes from './DataList.module.css';
import { dataItem } from '../../types';
import DataListItem from '../DataListItem/DataListItem';
import TriangleUp from '../../images/TriangleUp.svg';
import TriangleDown from '../../images/TriangleDown.svg';

interface DataListProps {
  croppedSheet: Array<dataItem>;
  setDetail: Function;
  setSortParams: Function;
}
const DataList: FC<DataListProps> = ({ croppedSheet, setDetail, setSortParams }) => {
  const [type, setType] = useState<string>('');
  const [orientation, setOrientation] = useState<string>('');

  // При первом нажатии ориентация обнуляется
  const setParams: (t: string) => void = (t) => {
    // Если вы выбираете новую колонку для сортировки то по умолчанию выбирается сортировка по возростанию
    t !== type ? setOrientation('up') : setOrientation(orientation === 'up' ? 'down' : 'up');
    setType(t);
  };

  useEffect(() => {
    setSortParams({
      type: type,
      orientation: orientation,
    });
  }, [type, orientation]);
  return (
    <>
      <div className={classes.columnDataList}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableColumn}>
              <td className={classes.tableRow} onClick={() => setParams('id')}>
                Id
                {orientation !== '' && type === 'id' && (
                  <img
                    className={classes.sortIcon}
                    src={orientation === 'up' ? TriangleUp : TriangleDown}
                  />
                )}
              </td>
              <td className={classes.tableRow} onClick={() => setParams('firstName')}>
                First Name
                {orientation !== '' && type === 'firstName' && (
                  <img
                    className={classes.sortIcon}
                    src={orientation === 'up' ? TriangleUp : TriangleDown}
                  />
                )}
              </td>
              <td className={classes.tableRow} onClick={() => setParams('lastName')}>
                First Name
                {orientation !== '' && type === 'lastName' && (
                  <img
                    className={classes.sortIcon}
                    src={orientation === 'up' ? TriangleUp : TriangleDown}
                  />
                )}
              </td>
              <td className={classes.tableRow} onClick={() => setParams('email')}>
                Email
                {orientation !== '' && type === 'email' && (
                  <img
                    className={classes.sortIcon}
                    src={orientation === 'up' ? TriangleUp : TriangleDown}
                  />
                )}
              </td>
              <td className={classes.tableRow} onClick={() => setParams('phone')}>
                Phone
                {orientation !== '' && type === 'phone' && (
                  <img
                    className={classes.sortIcon}
                    src={orientation === 'up' ? TriangleUp : TriangleDown}
                  />
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            {croppedSheet.map((i) => (
              <DataListItem key={i.id} dataItem={i} setDetail={setDetail} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataList;
