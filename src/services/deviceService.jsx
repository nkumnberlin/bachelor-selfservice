import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button';
import styled from 'styled-components';
import Dialog from '../components/handler/dialog';
import Drawer from '../components/handler/drawer';
import { handleCookies } from './tokenService';
import { handleAuth } from './authService';
import { apiDevices } from './cortadoEndpoint';
import { endpoint } from '../apiRoutes';
import '@material/list/dist/mdc.list.css';
import '@rmwc/list/collapsible-list.css';
import RenderDevice from '../components/device';
import LocateDevice from '../components/locateDevice';
import LoadingState from '../helper/loadingState';
import locDevices from '../assets/translation/en/locDeviceOverview';

const Container = styled.main``;
const StyledDeviceButton = styled(Button)`
  margin-top: 2.4375rem;
  float: right;
`;
const StyledDeviceHeader = styled.h1`
  margin-top: 2.4375rem;
  height: 24px;
`;

const StyleGrid = styled(Grid)`
  display: none;
  display: ${props =>
    props.shownavbar ? '@media(min-width:1000px) {display: none}' : 'display: block'};
  @media (min-width: 1000px) {
    display: block;
  }
`;

class DeviceService extends Component {
  constructor(props) {
    super(props);
    this.handleCookies = handleCookies;
    this.handleAuth = handleAuth;
    this.apiDevices = apiDevices;

    this.state = {
      device: {
        clientid: '',
        modelName: '',
        requestLocation: false
      },
      data: '',
      isFetching: false,
      isUpdatingDevice: false,
      handler: ''
    };
  }

  //https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
  componentDidMount() {
    this.fetchDevices();
    this.activateAutoFetching();
  }

  componentWillUnmount() {
    this.clearAutoFetching();
  }

  activateAutoFetching = () => {
    this.timer = setInterval(() => {
      this.fetchDevices();
    }, 30000);
  };

  clearAutoFetching = () => {
    clearInterval(this.timer);
    this.timer = null;
  };

  fetchDevices = async () => {
    try {
      const token = this.handleCookies.getCCSToken();
      const response = await this.doApiRequests(endpoint.list, token, '');
      if (response.data.success) {
        this.setState({
          data: response.data,
          isFetching: false
        });
        this.handleCookies.setDeviceData(response.data);
      } else {
        this.handleAuth.signout();
      }
    } catch (e) {
      console.warn('*ERROR WHILE FETCHING DEVICES*');
      this.setState({ isFetching: false });
    }
  };

  activateFetchingState = () => {
    this.setState({
      ...this.state,
      isFetching: true
    });
  };

  getCurrentDevice = id => {
    const { data } = this.state;
    if (id) {
      return data.devices.filter(device => {
        if (device.clientid === id) {
          return device;
        }
      });
    }
  };

  timeOutFetchDevice = () => {
    this.setState({ isUpdatingDevice: true });
    setTimeout(() => this.fetchDeviceInfo(), 7000);
  };

  lockScreenOfDevice = async () => {
    const { device } = this.state;
    const token = this.handleCookies.getCCSToken();
    const { data } = await this.doApiRequests(endpoint.lockscreen, token, device.clientid);
    if (data.success) this.timeOutFetchDevice();
  };

  enableLostMode = async () => {
    const { device } = this.state;
    const token = this.handleCookies.getCCSToken();
    const { data } = await this.doApiRequests(endpoint.enablelostmode, token, device.clientid);
    if (data.success) this.timeOutFetchDevice();
  };

  disableLostMode = async () => {
    const { device } = this.state;
    const token = this.handleCookies.getCCSToken();
    const { data } = await this.doApiRequests(endpoint.disablelostmode, token, device.clientid);
    if (data.success) this.timeOutFetchDevice();
  };

  wipeCurrentDevice = async () => {
    const { device } = this.state;
    const token = this.handleCookies.getCCSToken();
    await this.doApiRequests(endpoint.wipe, token, device.clientid);
  };

  openLocateDevice = () => {
    const { drawer } = this.props.handler;
    drawer.toggleDrawer();
  };

  fetchDeviceInfo = async () => {
    const { device } = this.state;
    const token = this.handleCookies.getCCSToken();
    const { data } = await this.doApiRequests(endpoint.deviceinfo, token, device.clientid);
    if (data.success) {
      this.updateDeviceData(data.deviceinfo);
      return data;
    }
  };

  updateDeviceData = updatedData => {
    const { data } = this.state;

    const indexOfData = data.devices.findIndex(x => x.clientid === updatedData.clientid);
    data.devices[indexOfData] = updatedData;
    this.setState({ data, isFetching: false, isUpdatingDevice: false });
  };

  showSnackbar = res => {
    const { snackbar } = this.props.handler;
    snackbar.updateSnackbar(res.data.success);
  };

  checkSession = () => {
    if (this.handleCookies.getCCSToken() === undefined) {
      this.handleAuth.signout();
    }
  };

  doApiRequests = async (url, token, clientid) => {
    try {
      this.activateFetchingState();
      const response = await this.apiDevices.DoOperation(url, token, clientid);
      if (response.data.success) {
        if (!!response.data.tokenstatus && url !== endpoint.list)
          this.handleCookies.updateCCSToken();
        if (url !== endpoint.deviceinfo && url !== endpoint.list) this.showSnackbar(response);
      }
      return response;
    } catch (e) {
      if (url === endpoint.list) {
        const data = JSON.parse(this.handleCookies.getDeviceData());
        this.setState({ data });
      }
      console.error('Lost Connection');
    }
  };

  updateDeviceInfo = deviceInformation => {
    this.setState({ device: deviceInformation });
  };

  render() {
    const { data, device, isFetching, isUpdatingDevice } = this.state;
    const { drawer, dialog } = this.props.handler;
    const { showNavBar } = this.props;
    const dialogAction = {
      lockScreen: this.lockScreenOfDevice,
      enableLostMode: this.enableLostMode,
      disableLostMode: this.disableLostMode,
      wipeDevice: this.wipeCurrentDevice,
      openLocateDevice: this.openLocateDevice
    };
    const checkMobileView = () => (
      <>
        <StyleGrid shownavbar={showNavBar ? 1 : 0}>
          <GridCell desktop={6}>
            <StyledDeviceHeader>
              {locDevices.headerDevice} <LoadingState isFetching={isFetching} size={'medium'} />
            </StyledDeviceHeader>
          </GridCell>
          <GridCell desktop={6}>
            <StyledDeviceButton unelevated>{locDevices.labelAddDevices} </StyledDeviceButton>
          </GridCell>
        </StyleGrid>
      </>
    );

    const renderDevice = (
      <>
        <Drawer
          drawer={drawer}
          component={
            <LocateDevice
              toggleDrawer={drawer.toggleDrawer}
              device={this.getCurrentDevice(device.clientid)}
            />
          }
          dir={'rtl'}
          wide
        />
        {checkMobileView()}
        <Grid>
          {!!data.devices &&
            data.devices.map((key, index) => {
              return (
                <React.Fragment key={index}>
                  <RenderDevice
                    device={key}
                    updateDeviceInfo={this.updateDeviceInfo}
                    updateDialog={dialog.updateDialog}
                    toggleDrawer={drawer.toggleDrawer}
                    openLocateDevice={this.openLocateDevice}
                    showNavBar={showNavBar}
                    isUpdating={device.clientid === key.clientid ? isUpdatingDevice : false}
                  />
                </React.Fragment>
              );
            })}
        </Grid>
        <Dialog dialog={dialog} modelName={device.modelName} dialogAction={dialogAction} />
      </>
    );

    return <Container>{renderDevice}</Container>;
  }
}

export default DeviceService;

DeviceService.propTypes = {
  handler: PropTypes.object.isRequired,
  drawer: PropTypes.object,
  showNavBar: PropTypes.bool.isRequired
};
