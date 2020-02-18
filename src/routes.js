import locNavBar from './assets/translation/en/locNavBarContent';

const routes = [
  {
    path: '/devices',
    display: locNavBar.itemDevices,
    icon: 'devices_other',
    menu: true
  },
  {
    path: '/settings',
    display: locNavBar.itemSettings,
    icon: 'settings',
    menu: true
  },
  {
    path: '/downloads',
    display: locNavBar.itemDownloads,
    icon: 'cloud_download',
    menu: true
  }
];
export default routes;
