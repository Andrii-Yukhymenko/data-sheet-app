import React, { FC } from 'react';
import { dataItem } from '../../types';
import classes from './DataListItem.module.css';

interface DataListItemProps {
  dataItem: dataItem;
  setDetail: Function;
}

const DataListItem: FC<DataListItemProps> = ({ dataItem, setDetail }) => {
  return (
    <tr className={classes.tableColumn}>
      <td className={classes.tableRow}>{dataItem.id}</td>
      <td className={classes.tableRow}>{dataItem.firstName}</td>
      <td className={classes.tableRow}>{dataItem.lastName}</td>
      <td className={classes.tableRow}>{dataItem.email}</td>
      <td className={classes.tableRow}>{dataItem.phone}</td>
      <td><button className={classes.button} onClick={() => setDetail(dataItem)}>Detail</button></td>
    </tr>
  );
};

export default DataListItem;
