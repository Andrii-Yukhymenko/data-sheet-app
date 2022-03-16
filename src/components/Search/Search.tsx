import React, { FC, useEffect, useState } from 'react';
import classes from './Search.module.css';
import globalClasses from '../../style/global.module.css';
import { filterParams } from '../../types';

interface searchProps {
  setFilterParams: Function;
}

const Search: FC<searchProps> = ({ setFilterParams }) => {
  const [id, setId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  useEffect(() => {
    setFilterParams({
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    });
  }, [id, firstName, lastName, email, phone]);
  return (
    <section className={classes.wrapper}>
      <div className={globalClasses.container}>
        <div className={classes.inputList}>
          <label>
            <p>Id</p>
            <input className={classes.input} value={id} onChange={(e) => setId(e.target.value)} />
          </label>
          <label>
            <p>First Name</p>
            <input
              className={classes.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            <p>Last Name</p>
            <input
              className={classes.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            <p>Email</p>
            <input
              className={classes.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Phone</p>
            <input
              className={classes.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <button
            onClick={() => {
              setId('');
              setFirstName('');
              setLastName('');
              setEmail('');
              setPhone('');
            }}>
            Reset filter
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;
