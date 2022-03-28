import React, { FC } from 'react';
import classes from './Detail.module.css';
import { dataItem } from '../../types';

interface DetailProps {
  detail: dataItem;
}

const Detail: FC<DetailProps> = ({ detail }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.body}>
          {Object.keys(detail).length ? (
            <>
              <div className={classes.listItem}>
                <p className={classes.title}>Id:</p>
                <p className={classes.text}>{detail.id}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>First Name:</p>
                <p className={classes.text}>{detail.firstName}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Last Name:</p>
                <p className={classes.text}>{detail.lastName}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Email:</p>
                <p className={classes.text}>{detail.email}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Phone:</p>
                <p className={classes.text}>{detail.phone}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>City:</p>
                <p className={classes.text}>{detail.address.city}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>State:</p>
                <p className={classes.text}>{detail.address.state}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Street Address:</p>
                <p className={classes.text}>{detail.address.streetAddress}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Zip:</p>
                <p className={classes.text}>{detail.address.zip}</p>
              </div>
              <div className={classes.listItem}>
                <p className={classes.title}>Description:</p>
                <p className={classes.text}>{detail.description}</p>
              </div>
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
