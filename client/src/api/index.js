import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

export const URL_PATH = {
  TODOS: '/api/todos',
};

class FetchApi {
  static commonHeaders = () => {
    return {'Content-Type': `application/json`};
  };

  get = (url, params = undefined) => {
    return axios(url, {
      method: 'get',
      headers: this.constructor.commonHeaders(),
      params,
    });
  };

  post = (url, data, params = undefined) => {
    return axios(url, {
      method: 'post',
      headers: this.constructor.commonHeaders(),
      data: JSON.stringify(data),
      params,
    });
  };

  put = (url, data, params = undefined) => {
    return axios(url, {
      method: 'put',
      headers: this.constructor.commonHeaders(),
      data: JSON.stringify(data),
      params,
    });
  };

  delete = (url, params = undefined) => {
    return axios(url, {
      method: 'delete',
      headers: this.constructor.commonHeaders(),
      params,
    });
  };
}

export const fetchApi = new FetchApi();
