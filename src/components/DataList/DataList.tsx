import React, { FC } from 'react';
import classes from './DataList.module.css';
import { dataItem } from '../../types';
import DataListItem from '../DataListItem/DataListItem';

interface DataListProps {
  croppedSheet: Array<dataItem>;
  setDetail: Function;
}
const DataList: FC<DataListProps> = ({ croppedSheet, setDetail }) => {
  return (
    <>
      <div className={classes.columnDataList}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tableColumn}>
              <td className={classes.tableRow} onClick={() => console.log('Id')}>Id</td>
              <td className={classes.tableRow}> First name</td>
              <td className={classes.tableRow}> Last name</td>
              <td className={classes.tableRow}> Email</td>
              <td className={classes.tableRow}> Phone</td>
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
