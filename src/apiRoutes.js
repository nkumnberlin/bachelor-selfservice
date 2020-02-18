const controller = '/CCREST/PublicApi/';
const version = 'v2/';
const endpointType = {
  user: 'user/',
  device: 'device/',
  system: 'system/'
};
const endpoint = {
  login: 'login',
  renewtoken: 'renewtoken',
  list: 'list',
  deviceinfo: 'info',
  enablelostmode: 'enablelostmode',
  disablelostmode: 'disablelostmode',
  wipe: 'wipe',
  lockscreen: 'lockscreen',
  systeminfo: 'info'
};
const RESTPath = {
  login: `${controller + version + endpointType.user + endpoint.login}`,
  renewtoken: `${controller + version + endpointType.user + endpoint.renewtoken}`,
  list: `${controller + version + endpointType.device + endpoint.list}`,
  deviceinfo: `${controller + version + endpointType.device + endpoint.deviceinfo}`,
  enablelostmode: `${controller + version + endpointType.device + endpoint.enablelostmode}`,
  disablelostmode: `${controller + version + endpointType.device + endpoint.disablelostmode}`,
  wipe: `${controller + version + endpointType.device + endpoint.wipe}`,
  lockscreen: `${controller + version + endpointType.device + endpoint.lockscreen}`,
  systeminfo: `${controller + version + endpointType.system + endpoint.systeminfo}`
};

export { RESTPath, endpoint };
