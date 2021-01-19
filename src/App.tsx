import React, { ChangeEvent } from 'react';
import {ParticipantList, Participant } from './components/ParticipantList';
import {Spinner, SpinnerSettings} from './components/Spinner';
import { AddParticipant } from './components/AddParticipant';
import { COLORS } from './common_style/colors';
import { FaCog, FaQuestionCircle } from 'react-icons/fa';
import { Popup } from './components/common/Popup';
import { HelpPopup, SettingsPopup, } from './components/PopupContent';


interface AppProps {
  participants: Participant[]
}

interface AppSettings {
  useSound: boolean,
  useMusic: boolean
}

interface AppState {
  participants: Participant[],
  newParticipantName: string,
  helpPopupOpen: boolean,
  settingsPopupOpen: boolean,
  settings: AppSettings
}

export interface IStyleSheet {
  [key: string]: React.CSSProperties;
}

export default class App extends React.Component {
  state: AppState;

  constructor(props: AppProps) {
    super(props);
    let savedParts = localStorage.getItem('participants')
    let participants = savedParts == null ? [] : JSON.parse(savedParts);
    let settings = {
      useSound: true,
      useMusic: true
    }
    this.state = {
      participants: participants,
      newParticipantName: "",
      helpPopupOpen: false,
      settingsPopupOpen: false,
      settings: settings
    }

    this.addParticipant = this.addParticipant.bind(this)
    this.removeParticipant = this.removeParticipant.bind(this)
    this.toggleParticipantMarked = this.toggleParticipantMarked.bind(this)
  }


  render() {
    let participants = this.state.participants;
    let spinnerSettings : SpinnerSettings = {
      useSound: this.state.settings.useSound,
      useMusic: this.state.settings.useMusic
    };

    let settingsPopup = (
    <SettingsPopup
    useSound={this.state.settings.useSound} useSoundOnChange={this.toggleSetting.bind(this,"useSound")}
    useMusic={this.state.settings.useMusic} useMusicOnChange={this.toggleSetting.bind(this,"useMusic")}
     />
  )

    return (
      <div style={styles.container}>
      <Popup isOpen={this.state.helpPopupOpen} toggle={this.togglePopup.bind(this, "help")}>{<HelpPopup />}</Popup>
      <Popup isOpen={this.state.settingsPopupOpen} toggle={this.togglePopup.bind(this, "settings")}>{settingsPopup}</Popup>
      <div style={{...styles.floating, ...styles.popupIcon, ...styles.helpIcon}} title="Help">
       <FaQuestionCircle onClick={this.togglePopup.bind(this, "help")}/>
       </div>
        <div style={{...styles.floating, ...styles.popupIcon, ...styles.newsIcon}} title="Settings">
          <FaCog onClick={this.togglePopup.bind(this, "settings" )}/>
        </div>
      <div style={styles.participantContainter}>
        <ParticipantList participants={participants} removeParticipant={this.removeParticipant} toggleParticipantMarked={this.toggleParticipantMarked}/>
        <div style={styles.inputs}>
          <input type="text" style={styles.nameInput} placeholder={"Enter a name"} value={this.state.newParticipantName} onChange={(ev) => this.updateParticipantName(ev)} onKeyPress={(e) => this.enterPressed(e,this.addParticipant)} />
          <AddParticipant disabled={!this.canAddName()} addParticipant={this.addParticipant}/>
        </div>
      </div>
        <Spinner participants = {this.unMarked()} toggleMarked={this.toggleParticipantMarked} settings={spinnerSettings}/>
      </div>
    );
  }

  unMarked() {
    return this.state.participants.filter((participant: Participant) => !participant.marked)
  }

  canAddName() {
    let participants = this.state.participants;
    let enteredName = this.state.newParticipantName;

    let exists = (participants.find((p:Participant) => p.name === enteredName) != null)

    return !(exists || (enteredName === "" || enteredName == null))
  }

  enterPressed(event: React.KeyboardEvent<HTMLElement>, onEnter: () => void) {
    if(event.key === 'Enter') {
      onEnter();
    }
  }

  addParticipant() {
    if(this.canAddName()) {
      let participants = this.state.participants;
      let participantName = this.state.newParticipantName;
      participants.push({
        name: participantName,
        marked: false
      })
      this.setState({
        newParticipantName: "",
        participants: participants
      })

      this.saveParticipantsToLocalStorage(participants);
    }
  }

  removeParticipant(participant: Participant) {
    let participants = this.state.participants
    let updatedParticipants = participants.filter((p: Participant) => p.name !== participant.name);
    this.setState({
      participants: updatedParticipants
    })

    this.saveParticipantsToLocalStorage(updatedParticipants);
  }

  toggleParticipantMarked(participant: Participant) {
    let participants = this.state.participants;
    let p = participants.find((p:Participant) => p && (p.name === participant.name) );
    if (p != null) {
      p.marked = !p.marked;
      this.setState({
        participants: participants
      })
    }
  }

  updateParticipantName(nameInput : ChangeEvent<HTMLInputElement>) {
    let name = nameInput.target.value;

    this.setState({
      newParticipantName: name
    })
  }

  saveParticipantsToLocalStorage(participants: Participant[]) {
    let saveParticipants: Participant[] = JSON.parse(JSON.stringify(participants)); // clone particiapants so we don't mutate current list
    saveParticipants.map(p => p.marked = false);

    localStorage.setItem('participants', JSON.stringify(saveParticipants))
  }

  togglePopup(popup: "settings" | "help") {

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
    flex: 1,
    backgroundColor: COLORS.gray,
    width: '100%',
    minWidth: 1200,
    minHeight: 875, //diagnal length of box around spinner
    height: '100%',
    flexDirection: "row",
    alignItems: 'center'
  },
  participantContainter: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  participants: {
    flexGrow: 3
  },
  spinner: {
    flex: 3
  },
  spacer: {
    flex: 1
  },
  inputs: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 6
  },
  nameInput: {
    padding: 8,
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 2,
    height: 30,
    color: 'white',
    backgroundColor: 'transparent',
    borderRadius: 5
  },
  floating: {
    position: 'absolute'
  },
  popupIcon: {
    color: COLORS.lightBlue,
    fontSize: 30,
    cursor: 'pointer'
  },
  helpIcon: {
    right: 45,
    top: 10,
  },
  newsIcon: {
    right: 10,
    top: 10
  }
};
