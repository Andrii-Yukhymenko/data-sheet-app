import React, { FC, useEffect, useState } from 'react';
import classes from './DataList.module.css';
import { dataItem } from '../../types';
import DataListItem from '../DataListItem/DataListItem';

interface DataListProps {
  croppedSheet: Array<dataItem>;
  setDetail: Function;
  setSortParams: Function;
}
const DataList: FC<DataListProps> = ({ croppedSheet, setDetail, setSortParams }) => {
  const [type, setType] = useState<string>('');
  const [orientation, setOrientation] = useState<string>('');

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
              <td className={classes.tableRow} onClick={() => {setType('id'); setOrientation('up')}}>
                Id
              </td>
              {/*<td className={classes.tableRow} onClick={() => sorter('firstName')}>*/}
              {/*  First name*/}
              {/*</td>*/}
              {/*<td className={classes.tableRow} onClick={() => sorter('lastName')}>*/}
              {/*  Last name*/}
              {/*</td>*/}
              {/*<td className={classes.tableRow} onClick={() => sorter('email')}>*/}
              {/*  Email*/}
              {/*</td>*/}
              {/*<td className={classes.tableRow} onClick={() => sorter('phone')}>*/}
              {/*  Phone*/}
              {/*</td>*/}
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
