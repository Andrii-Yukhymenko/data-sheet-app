import axios from 'axios';

const BASE_URL = 'http://www.filltext.com/';
export default class API {
  static getFullSheet = () => {
    const config = {
      method: 'get',
      baseURL:
        BASE_URL +
        '/?rows=10&id={password}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone}&address={addressObject}&description={lorem|32}',
    };
    return axios(config);
  };
}
