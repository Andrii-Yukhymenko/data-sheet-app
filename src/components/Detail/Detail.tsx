import React, { FC } from 'react';
import classes from '../App/App.module.css';


const Detail: FC = () => {
  return (
    <div className={classes.columnDetail}>
      <div style={{ position: 'sticky', top: '0', right: '0' }}>
        <p>Choose data row</p>
        <p>id: 12</p>
        <p>Firstname: Andrii</p>
        <p>Lastname: Yukhymenko</p>
        <p>Email: email@email.com</p>
        <p>Phone: +1234567890</p>
        <p>Street address: 3422 Non Rd</p>
        <p>City: Forney</p>
        <p>State: PA</p>
        <p>Zip: 30400</p>
      </div>
    </div>
  );
};

export default Detail;
