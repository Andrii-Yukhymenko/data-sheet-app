import React, { FC } from 'react';
import classes from './Pagination.module.css';
import globalClasses from '../../style/global.module.css';

interface PaginationProps {
  currentPage: number;
  paginationPagesCount: number;
  setCurrentPage: Function;
}
const Pagination: FC<PaginationProps> = ({ currentPage, paginationPagesCount, setCurrentPage }) => {
  const pageBtnsList = [];
  for (let i = 1; i < paginationPagesCount + 1; i++) {
    pageBtnsList.push(i);
  }
  return (
    <>
      {pageBtnsList.length > 0 && (
        <div className={[classes.container, globalClasses.container].join(' ')}>
          <div className={classes.list}>
            <button
              className={`${currentPage === 1 && classes.disabled} ${[
                classes.button,
                classes.buttonBig,
              ].join(' ')}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>
              <p>Previous</p>
            </button>
            {pageBtnsList.map((i) => {
              let cn: Array<string> = [classes.button];
              if (currentPage === i) {
                cn.push(classes.selected);
              }
              return (
                <button
                  className={`${classes.button} ${currentPage === i ? classes.selected : ''}`}
                  key={i}
                  onClick={() => setCurrentPage(i)}>
                  <p>{i}</p>
                </button>
              );
            })}
            <button
              className={`${currentPage === paginationPagesCount && classes.disabled} ${[
                classes.button,
                classes.buttonBig,
              ].join(' ')}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === paginationPagesCount}>
              <p>Next</p>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
