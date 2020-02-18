import React, { Component } from 'react';
import { apiDevices } from './services/cortadoEndpoint';
import Routing from './routing';
import routes from './routes';
import { handleCookies } from './services/tokenService';
import { handleAuth } from './services/authService';

/**
 *Für übermitteln von speziellen IDs
 *Einsetzen um spezielle Details anzuzeigen : Popup*  -> 8- Route Parameters
 <Route path="/devices/:id" component={DeviceDetails} />

 übermitteln von Parametern
 <Route path="/devices" render={(props) => <DeviceService sortBy='newest' {...props} />} />
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        showSnackbar: false,
        apiCallStatus: '',
        message: ''
      },
      drawer: {
        showDrawer: false,
        drawerOption: ''
      },
      dialog: {
        showDialog: false,
        dialogOption: ''
      },
      mtcenabled: true,
      activeMenu: routes[0].display,
      showNavBar: false,
      isAuthorized: false
    };
  }

  componentDidMount() {
    // this.checkIfMTCEnabled();
  }

  checkIfMTCEnabled = async () => {
    const { data } = await apiDevices.DoOperation('systemInfo');
    if (data.success) this.setState({ mtcenabled: data.systeminfo.mtcenabled });
  };

  lastActivatedMenu = activeMenu => {
    this.setState({ activeMenu });
  };

  toggleSnackbar = () => {
    const snackbar = { ...this.state.snackbar };
    snackbar.showSnackbar = !snackbar.showSnackbar;
    this.setState({ snackbar });
  };

  updateSnackbar = status => {
    const snackbar = { ...this.state.snackbar };
    const { dialog } = this.state;
    snackbar.showSnackbar = !snackbar.showSnackbar;
    snackbar.apiCallStatus = status;
    if (dialog) snackbar.message = dialog.dialogOption;

    this.setState({ snackbar });
  };

  toggleDialog = () => {
    const dialog = { ...this.state.dialog };
    dialog.showDialog = !dialog.showDialog;
    this.setState({ dialog });
  };

  updateDialog = dialogOption => {
    const dialog = { ...this.state.dialog };
    dialog.showDialog = !dialog.showDialog;
    dialog.dialogOption = dialogOption;
    this.setState({ dialog });
  };

  toggleDrawer = () => {
    const drawer = { ...this.state.drawer };
    drawer.showDrawer = !drawer.showDrawer;
    console.log('toggle Drawer!');
    this.setState({ drawer });
  };

  updateDrawer = drawerOption => {
    const drawer = { ...this.state.drawer };
    drawer.showDrawer = !drawer.showDrawer;
    drawer.drawerOption = drawerOption;
    console.log('update Drawer');
    this.setState({ drawer });
  };

  toggleNavBar = () => {
    const { showNavBar } = this.state;
    this.setState({ showNavBar: !showNavBar });
  };

  authorizeUser = () => {
    const { isAuthorized } = this.state;
    this.setState({ isAuthorized: !isAuthorized });
    console.log('authorize toggeld!', isAuthorized);
  };

  render() {
    const {
      drawer,
      dialog,
      snackbar,
      activeMenu,
      mtcenabled,
      showNavBar,
      isAuthorized
    } = this.state;
    if (isAuthorized && handleCookies.checkIfTokenISInvalid()) {
      alert('Session Ended. Redirect to Login');
      handleAuth.signout();
    }

    const handlerEvents = {
      dialog: {
        ...dialog,
        toggleDialog: this.toggleDialog,
        updateDialog: this.updateDialog
      },
      drawer: {
        ...drawer,
        toggleDrawer: this.toggleDrawer,
        updateDrawer: this.updateDrawer
      },
      snackbar: {
        ...snackbar,
        toggleSnackbar: this.toggleSnackbar,
        updateSnackbar: this.updateSnackbar
      }
    };
    return (
      <Routing
        mtcenabled={mtcenabled}
        handlerEvents={handlerEvents}
        activeMenu={activeMenu}
        lastActivatedMenu={this.lastActivatedMenu}
        toggleNavBar={this.toggleNavBar}
        showNavBar={showNavBar}
        authorizeUser={this.authorizeUser}
      />
    );
  }
}

export default App;
