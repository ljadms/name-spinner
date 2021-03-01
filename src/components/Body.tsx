import React, { ChangeEvent } from 'react';
import {ParticipantList, Participant } from './ParticipantList';
import {Spinner, SpinnerSettings} from './Spinner';
import { AddParticipant } from './AddParticipant';
import { COLORS } from '../common_style/colors';


interface BodyProps {
  participants: Participant[]
}

interface AppSettings {
  useSound: boolean,
  useMusic: boolean
}

interface BodyState {
  participants: Participant[],
  newParticipantName: string,
  helpPopupOpen: boolean,
  settingsPopupOpen: boolean,
  settings: AppSettings
}

export interface IStyleSheet {
  [key: string]: React.CSSProperties;
}

export default class Body extends React.Component {
  state: BodyState;

  constructor(props: BodyProps) {
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

    return (
      <div style={styles.container}>
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
    flex: 1,
    backgroundColor: COLORS.gray,
    width: '100%',
    minWidth: 1200,
    minHeight: 875, //diagnal length of box around spinner
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
