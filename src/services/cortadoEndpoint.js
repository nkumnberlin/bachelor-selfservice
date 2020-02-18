import axios from 'axios';
import { RESTPath } from '../apiRoutes';

// https://codewithmosh.com/courses/357787/lectures/5867623
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.response.use(null, error => {
  const exceptedError =
    error.response && error.response.status >= 400 && error.response.status < 500;

  if (!exceptedError) {
    console.warn('An unexpecterd Error occurred');
  }
  return Promise.reject(error);
});

const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
const checkEnvironment = url => {
  let newURL;
  if (process.env.NODE_ENV === 'development') {
    newURL = process.env.REACT_APP_PUBLIC_URL;
  }
  return newURL || url;
};

export async function Auth(url, data) {
  try {
    return await axios({
      method: 'post',
      url: checkEnvironment(publicUrl.origin) + RESTPath[url],
      data
    });
  } catch (ex) {
    console.warn('Error while Auth ');
  }
}

export const apiDevices = {
  async DoOperation(url, token, clientid) {
    // timeout 20sek -> if server is not respondig it goes into catch block
    try {
      const response = await axios({
        method: 'post',
        url: checkEnvironment(publicUrl.origin) + RESTPath[url],
        timeout: 20000,
        data: {
          token,
          clientid,
          message: 'Nachricht von Cortado'
        }
      });
      return response;
    } catch (e) {
      console.warn('404 Error');
    }
  }
};
