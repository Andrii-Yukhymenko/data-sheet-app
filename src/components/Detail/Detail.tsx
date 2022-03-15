import React, { FC } from 'react';
import classes from './Detail.module.css';
import { dataItem } from '../../types';

interface DetailProps {
  detail: dataItem;
}

const Detail: FC<DetailProps> = ({ detail }) => {
  return (
    <>
      <div className={classes.columnDetail}>
        <div style={{ position: 'sticky', top: '0', right: '0' }}>
          {Object.keys(detail).length ? (
            <>
              <p>Id: {detail?.id}</p>
              <p>Firstname: {detail?.firstName}</p>
              <p>Lastname: {detail?.lastName}</p>
              <p>Email: {detail?.email}</p>
              <p>Phone: {detail?.phone}</p>
              <p>Street address: {detail?.address.streetAddress}</p>
              <p>City: {detail?.address.city}</p>
              <p>State: {detail?.address.state}</p>
              <p>Zip: {detail?.address.zip}</p>
            </>
          ) : (
            <p>Choose data row</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
