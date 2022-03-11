import React, { FC } from 'react';
import classes from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  setCurrentPage: Function;
}
const Pagination: FC<PaginationProps> = ({ currentPage, totalCount, setCurrentPage }) => {
  const pageBtnsList = [];
  for (let i = 1; i < totalCount + 1; i++) {
    pageBtnsList.push(i);
  }
  return (
    <>
      <div onClick={() => setCurrentPage(currentPage - 1)}>Previous</div>
      <div className={classes.list}>
        {pageBtnsList.map((i) => {
          let cn: Array<string> = [classes.button];
          if (currentPage == i) {
            cn.push(classes.selected);
          }
          return (
            <div className={`${classes.button} ${currentPage == i ? classes.selected : ''}`} key={i} onClick={() => setCurrentPage(i)}>
              {i}
            </div>
          );
        })}
      </div>
      <div onClick={() => setCurrentPage(currentPage + 1)}>Next</div>
    </>
  );
};

export default Pagination;
