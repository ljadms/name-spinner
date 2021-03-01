import React from 'react';
import { COLORS } from './common_style/colors';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Popup } from './components/common/Popup';
import { HelpPopup, SettingsPopup, AboutPopup, PrivacyPopup } from './components/PopupContent';
import Body from './components/Body';


interface AppProps {

}

interface AppSettings {
  useSound: boolean,
  useMusic: boolean
}

interface AppState {
  helpPopupOpen: boolean,
  settingsPopupOpen: boolean,
  aboutPopupOpen: boolean,
  privacyPopupOpen: boolean,
  settings: AppSettings,
  menuOpen: Boolean
}

export interface IStyleSheet {
  [key: string]: React.CSSProperties;
}

export default class App extends React.Component {
  state: AppState;

  constructor(props: AppProps) {
    super(props);

    let settings = {
      useSound: true,
      useMusic: true
    }
    this.state = {
      helpPopupOpen: false,
      settingsPopupOpen: false,
      aboutPopupOpen: false,
      privacyPopupOpen: false,
      settings: settings,
      menuOpen: false
    }

  }


  render() {

    let settingsPopup = (
      <SettingsPopup
      useSound={this.state.settings.useSound} useSoundOnChange={this.toggleSetting.bind(this,"useSound")}
      useMusic={this.state.settings.useMusic} useMusicOnChange={this.toggleSetting.bind(this,"useMusic")}
      />
    );

    return (
      <div style={{...styles.container, ...styles.fullWidth}}>
        <Popup isOpen={this.state.helpPopupOpen} toggle={this.togglePopup.bind(this, "help")}>{<HelpPopup />}</Popup>
        <Popup isOpen={this.state.settingsPopupOpen} toggle={this.togglePopup.bind(this, "settings")}>{settingsPopup}</Popup>
        <Popup isOpen={this.state.aboutPopupOpen} toggle={this.togglePopup.bind(this, "about")}>{<AboutPopup />}</Popup>
        <Popup isOpen={this.state.privacyPopupOpen} toggle={this.togglePopup.bind(this, "privacy")}>{<PrivacyPopup />}</Popup>
        <div style={styles.menu} hidden={!this.state.menuOpen}>
          <div style={styles.menuContainer}>
            <span onClick={this.togglePopup.bind(this,"help")} style={styles.popupButton}> HELP </span> <br/>
            <span onClick={this.togglePopup.bind(this,"settings")} style={styles.popupButton}>SETTINGS </span> <br/>
            <span onClick={this.togglePopup.bind(this,"about")} style={styles.popupButton}> ABOUT </span>

          </div>
        </div>
        <div style={{...styles.fullWidth, ...styles.bar, color:'white'}}>
          <div style={{height:70, lineHeight:"70px", position:'absolute' }}><img src={require('./components/assets/logo_big.png')} alt="wheel logo" style={{height:70}}/>
            <span style={{fontSize:42, verticalAlign:"top"}}>WhosNextWheel.com</span>
          </div>
         {
            this.state.menuOpen ?
            <FaTimes onClick={this.togglePopup.bind(this,"menu")} style={styles.menuButton}/> :
            <FaBars onClick={this.togglePopup.bind(this,"menu")} style={styles.menuButton}/>
          }
        </div>
        <Body />
        <div style={{...styles.fullWidth, ...styles.bar, borderTop: 'solid 1px gray'}}>
        <span onClick={this.togglePopup.bind(this,"privacy")} style={{...styles.popupButton}}> Privacy Policy </span>
        </div>
      </div>

    );
  }


  togglePopup(popup: "settings" | "help" | "about" | "privacy" | "menu") {

    switch(popup) {
      case "help" :
        this.setState({
          helpPopupOpen: !this.state.helpPopupOpen,
        });
        break;

      case "settings" :
      this.setState({
        settingsPopupOpen: !this.state.settingsPopupOpen,
      });
      break;

      case "about" :
      this.setState({
        aboutPopupOpen: !this.state.aboutPopupOpen
      });
      break;

      case "privacy" :
      this.setState({
        privacyPopupOpen: !this.state.privacyPopupOpen
      });
      break;

      case "menu" :
      this.setState({
        menuOpen: !this.state.menuOpen
      });
      break;

    }

  }

  toggleSetting(settingName: "useSound"|"useMusic") {
    let settings = this.state.settings;
    settings[settingName] = !this.state.settings[settingName];

    this.setState({
      settings: settings
    })
  }

}


const styles: IStyleSheet = {
  container: {
    display: 'flex',
    position: 'absolute',
    flexDirection: "column",
    alignItems: 'center',
    height: "100%"
  },
  fullWidth: {
    width: "100%"
  },
  bar: {
    backgroundColor: COLORS.gray,
    height:70,
    minHeight: 70,
    maxHeight: 70
  },
  menuButton: {
    float: "right",
    color: COLORS.gold,
    cursor: 'pointer',
    padding: 16,
    fontSize: 24
  },
  menu: {
    position: "absolute",
    top: 40,
    right: 40,
    backgroundColor: COLORS.gray,
    border: "1px solid black",
    boxShadow: "0px 1px 3px black",
    zIndex:999
  },
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: 10
  },
  popupButton: {
    fontSize: 18,
    color: "white",
    cursor: "pointer",
    fontWeight: 'bold',
    width: "100%",
  },
  ad: {
    height: 90,
    width: 970,
    border: "solid red 1px",
    margin: 'auto',
    marginTop: -20
  }
};
