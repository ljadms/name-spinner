import * as React from 'react';
import { FaCog, FaExclamation, FaQuestionCircle } from 'react-icons/fa';
import { COLORS } from '../common_style/colors';
import Toggle from './common/Toggle';



export const HelpPopup = () => (
  <div style={{color:'white'}}>
    <h1 style={{color: COLORS.gold, marginTop:0}}> <FaQuestionCircle style={{color: COLORS.blue, marginRight: 6}}/>HOW TO USE</h1>
    <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'baseline'}}>
      <div style={{width:200}}>
        <img src={require('./assets/help1.png')} style={{width:200}}/>
        Add items to your spinner using the text input
      </div>
      <div style={{width:200}}>
        <img src={require('./assets/help2.png')} style={{width:200}}/>
        Hit SPIN! to start the spinner
      </div>
      <div style={{width:200}}>
        <img src={require('./assets/help3.png')} style={{width:200}}/>
        After an item has been landed on, it is automiatically removed from the wheel
      </div>
    </div>
    <p/>
    <ul>
      <li>To hide or unhide a specific item from the wheel, click the item in the list</li>
      <li>Clicking the trash icon will remove that item from the list</li>
    </ul>
    <FaExclamation style={{color:COLORS.gold}}/>Your list of items is saved to the browser, you won't have to re-enter the items if you close or refresh the page!
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
    if (prevProps != this.props) {
      this.setState({
        useSound: this.props.useSound,
        useMusic: this.props.useMusic
      })
    }
  }

   render() {
     return (
      <div style={{minWidth: 300}}>
        <h1 style={{color: COLORS.gold, marginTop:0}}> <FaCog style={{color: COLORS.blue, marginRight: 6}} />
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
