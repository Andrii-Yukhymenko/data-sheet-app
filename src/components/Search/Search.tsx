import React, { FC } from 'react';
import classes from './Search.module.css';
import globalClasses from '../../style/global.module.css';

const Search: FC = () => {
  return (
    <section className={classes.wrapper}>
      <div className={globalClasses.container}>
        <div className={classes.inputList}>
          <input className={classes.input} />
          <input className={classes.input} />
          <input className={classes.input} />
          <input className={classes.input} />
        </div>
      </div>
    </section>
  );
};

export default Search;
