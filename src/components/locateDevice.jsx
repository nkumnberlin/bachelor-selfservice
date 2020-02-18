import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import { IconButton } from '@rmwc/icon-button';
import styled from 'styled-components';
import { showLastContactOfDevice } from '../helper/deviceHelper';
import '@material/icon-button/dist/mdc.icon-button.css';
import locDevices from '../assets/translation/en/locDeviceOverview';

//https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2

const StyledMap = styled(Map)`
  position: relative;
  width: 100% !important;
  height: 100% !important;
  @media (min-width: 320px) {
    width: 320px;
  }
  @media (min-width: 568px) {
    width: 568px;
  }
  @media (min-width: 768px) {
    width: 768px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const StlyedDivFlex = styled.div`
  width: 100%;
  @media (min-width: 320px) {
    width: 320px;
  }
  @media (min-width: 568px) {
    width: 568px;
  }
  @media (min-width: 768px) {
    width: 768px;
  }
  @media (min-width: 1024px) {
    width: 1024px;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 4rem;
  right: 7px;
`;

class LocateDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      showingInfoWindow: false
    };
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  render() {
    const device = this.props.device || '';
    const { toggleDrawer } = this.props;
    const { activeMarker, showingInfoWindow } = this.state;
    let deviceLat = '';
    let deviceLong = '';
    if (device) {
      deviceLat = device[0].location.latitude;
      deviceLong = device[0].location.longitude;
    }
    const createInfoWindow = () => (
      <InfoWindow
        marker={activeMarker}
        onClose={this.onInfoWindowClose}
        visible={showingInfoWindow}
      >
        <div>
          <p>
            {locDevices.labelDisplayName}
            {device[0].displayname}
          </p>
          <p>
            {locDevices.labelSerialNumber}
            {device[0].serialnumber}
          </p>
          <p>
            {locDevices.labelLastContact}
            {showLastContactOfDevice(device[0].location.timestamp)}
          </p>
        </div>
      </InfoWindow>
    );
    const createMarker = () => (
      <Marker position={{ lat: deviceLat, lng: deviceLong }} onClick={this.onMarkerClick} />
    );

    return (
      <StlyedDivFlex>
        <StyledMap
          google={this.props.google}
          zoom={15}
          initialCenter={{
            lat: deviceLat || 52.520008,
            lng: deviceLong || 13.404954
          }}
        >
          {device && <StyledIconButton icon="clear" onClick={() => toggleDrawer()} />}
          {device && createMarker()}
          {device && createInfoWindow()}
        </StyledMap>
      </StlyedDivFlex>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API
})(LocateDevice);
