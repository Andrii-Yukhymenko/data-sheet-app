import React, { FC } from 'react';
import classes from './DataList.module.css';
import { dataItem } from '../../types';

interface DataListProps {
  croppedSheet: Array<dataItem>;
  isLoad: boolean;
}
const DataList: FC<DataListProps> = ({ croppedSheet, isLoad }) => {
  return (
    <div className={classes.columnDataList}>
      <table>
        <tr>
          <td onClick={() => console.log('Id')}>Id</td>
          <td>First name</td>
          <td>Last name</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>
        {croppedSheet.map((i) => {
          return (
            <>
              <tr className={classes.tableColumn}>
                <td className={classes.tableRow}>{i.id}</td>
                <td className={classes.tableRow}>{i.firstName}</td>
                <td className={classes.tableRow}>{i.lastName}</td>
                <td className={classes.tableRow}>{i.email}</td>
                <td className={classes.tableRow}>{i.phone}</td>
                <button>Detail</button>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default DataList;
