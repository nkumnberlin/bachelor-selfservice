import Cookies from 'js-cookie';
import { apiDevices } from './cortadoEndpoint';

const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
const inTwoMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);

export const handleCookies = {
  ccsToken: 'ccs-token',
  dataToken: 'data-token',

  getCCSToken() {
    return Cookies.get(handleCookies.ccsToken);
  },
  setCCSToken(token) {
    Cookies.set(handleCookies.ccsToken, token, { expires: inTwoMinutes });
  },
  removeCCSToken() {
    Cookies.remove(handleCookies.ccsToken);
  },
  async updateCCSToken() {
    console.warn('update Token');
    const res = await apiDevices.DoOperation('renewToken', handleCookies.getCCSToken());
    handleCookies.setCCSToken(res.data.token);
  },
  checkIfTokenISInvalid() {
    if (handleCookies.getCCSToken() === undefined) return true;
  },

  setDeviceData(data) {
    Cookies.set(handleCookies.dataToken, data, { expires: inFifteenMinutes });
  },
  getDeviceData() {
    return Cookies.get(handleCookies.dataToken);
  }
};
