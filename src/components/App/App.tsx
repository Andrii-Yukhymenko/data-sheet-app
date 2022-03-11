import React, {useState} from 'react';
import Search from '../Search/Search';
import classes from './App.module.css';
import globalClasses from '../../style/global.module.css';
import Detail from '../Detail/Detail';
import DataList from '../DataList/DataList';
import Pagination from '../Pagination/Pagination';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <Search />
      <section>
        <div className={`${classes.columns} ${globalClasses.container}`}>
          <DataList />
          <Detail />
        </div>
      </section>
      <Pagination currentPage={currentPage} totalCount={5} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
