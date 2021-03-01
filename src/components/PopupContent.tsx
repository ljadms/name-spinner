import * as React from 'react';
import { FaExclamation } from 'react-icons/fa';
import { COLORS } from '../common_style/colors';
import Toggle from './common/Toggle';

interface onChangeHandler{
  (val:boolean): void
}

interface ToggleProps {
  useSound: boolean,
  useMusic: boolean,
  useSoundOnChange: onChangeHandler,
  useMusicOnChange: onChangeHandler
}

interface ToggleState {
  useSound: boolean,
  useMusic: boolean
}

export class SettingsPopup extends React.Component<ToggleProps> {
   state: ToggleState;

  constructor(props: ToggleProps) {
    super(props);

    this.state = {
      useSound: props.useSound,
      useMusic: props.useMusic
    }

  }

  componentDidUpdate(prevProps: ToggleProps) {
    if (prevProps !== this.props) {
      this.setState({
        useSound: this.props.useSound,
        useMusic: this.props.useMusic
      })
    }
  }

   render() {
     return (
      <div style={{minWidth: 300}}>
        <h1 style={{color: COLORS.gold, marginTop:0}}>
          SETTINGS
        </h1>
        <div style={{color: COLORS.white, fontSize: 24, fontWeight: 500}}>
          <Toggle name="SOUND EFFECTS" checked={this.state.useSound} onChange={this.props.useSoundOnChange}>
          <div>SOUND EFFECTS</div>
          </Toggle>
        </div>
        <div style={{color: COLORS.white, fontSize: 24, fontWeight: 500}}>
          <Toggle name="MUSIC" checked={this.state.useMusic} onChange={this.props.useMusicOnChange}>
          <div>MUSIC</div>
          </Toggle>
          </div>
      </div>
    )
  }
}

export const HelpPopup = () => (
  <div style={{color:'white'}}>
    <h1 style={{color: COLORS.gold, marginTop:0}}> HOW TO USE</h1>
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'baseline', padding: 10}}>
      <div style={{width:250}}>
        <img src={require('./assets/help1.png')} alt=" Add name input" style={{width:250}}/>
        Add items to your spinner using the text input
      </div>
      <div style={{width:250}}>
        <img src={require('./assets/help2.png')} alt="Spin button" style={{width:250}}/>
        Hit SPIN! to start the spinning wheel.
      </div>
      <div style={{width:250}}>
        <img src={require('./assets/help3.png')} alt="Checkmark next to a name" style={{width:250}}/>
        After an item has been landed on, it is automiatically removed from the wheel
      </div>
    </div>
    <p/>
    <ul>
      <li>To hide or unhide a specific item from the wheel, click the item in the list</li>
      <p/>
      <li>Clicking the trash icon will remove that item from the list</li>
    </ul>
    <p/>
    <FaExclamation style={{color:COLORS.gold}}/>Your list of items is saved to the browser.
  </div>
)


export const AboutPopup = () =>  (
  <div style={{color:'white'}}>
    <h1 style={{color: COLORS.gold, marginTop:0}}>ABOUT</h1>
    <div style={{padding: 10}}>
      The Name Spinner was created by Lincoln Adams
      <p/>
      Credits:<p/>
       "Trumpet Brass Fanfare.wav" by ohforheavensake on <a href="https://www.freesound.org">Freesound.org</a> is licensed under CC BY 4.0<p/>
       "Clowning Around" music by <a href="https://www.audionautix.com/">Audionautix.com</a> Licensed under CC <p/>
       "Prize Wheel" sound by <a href="http://www.theallsounds.com">AllSounds</a> Licensed under CC
    </div>
  </div>
  )
export const PrivacyPopup = () =>  (
  <div style={{color:'white'}}>
    <h1 style={{color: COLORS.gold, marginTop:0}}>PRIVACY POLICY</h1>
    <div style={{padding: 10}}>
      <b>
      Who's Next Wheel does not store any information externally from the user's browser. <br/>
      Who's Next Wheel will not collect or send any information anywhere.
      </b>
      <p/>
      However, the ads on this page are provided by Google, and use cookies to provide personalized ad content.
      <br/>
      <ul>
        <li> Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</li>
        <li> You can opt out of personalized advertising by visiting: <a href="https://www.google.com/settings/ads">Ads Settings</a></li>
      </ul>

    </div>
  </div>
)
