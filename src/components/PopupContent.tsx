import * as React from 'react';
import { FaExclamation } from 'react-icons/fa';
import { COLORS } from '../common_style/colors';
import Toggle from './common/Toggle';



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
