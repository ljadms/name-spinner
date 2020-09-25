import React, { ChangeEvent } from 'react';
import {ParticipantList, Participant } from './components/ParticipantList';
import {Spinner} from './components/Spinner';
import { AddParticipant } from './components/AddParticipant';
import { COLORS } from './common_style/colors';


interface AppProps {
  participants: Participant[]
}

interface AppState {
  participants: Participant[],
  newParticipantName: string
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
    this.state = {
      participants: participants,
      newParticipantName: ""
    }

    this.addParticipant = this.addParticipant.bind(this)
    this.removeParticipant = this.removeParticipant.bind(this)
    this.toggleParticipantMarked = this.toggleParticipantMarked.bind(this)
  }


  render() {
    let participants = this.state.participants
    return (
      <div style={styles.container}>
      <div style={styles.participantContainter}>
        <ParticipantList participants={participants} removeParticipant={this.removeParticipant} toggleParticipantMarked={this.toggleParticipantMarked}/>
        <div style={styles.inputs}>
          <input type="text" style={styles.nameInput} placeholder={"Enter a name"} value={this.state.newParticipantName} onChange={(ev) => this.updateParticipantName(ev)} onKeyPress={(e) => this.enterPressed(e,this.addParticipant)} />
          <AddParticipant disabled={!this.canAddName()} addParticipant={this.addParticipant}/>
        </div>
      </div>
        <Spinner participants = {this.unMarked()} toggleMarked={this.toggleParticipantMarked}/>
      </div>
    );
  }

  unMarked() {
    return this.state.participants.filter((participant: Participant) => !participant.marked)
  }

  canAddName() {
    let participants = this.state.participants;
    let enteredName = this.state.newParticipantName;

    let exists = (participants.find((p:Participant) => p.name == enteredName) != null)

    return !(exists || (enteredName == "" || enteredName == null))
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
    let updatedParticipants = participants.filter((p: Participant) => p.name != participant.name);
    this.setState({
      participants: updatedParticipants
    })

    this.saveParticipantsToLocalStorage(updatedParticipants);
  }

  toggleParticipantMarked(participant: Participant) {
    let participants = this.state.participants;
    let p = participants.find((p:Participant) => p && (p.name == participant.name) );
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
    participants.map(p => p.marked = false);

    localStorage.setItem('participants', JSON.stringify(participants))
  }
}


const styles: IStyleSheet = {
  container: {
    display: 'flex',
    position: 'absolute',
    flex: 1,
    backgroundColor: COLORS.gray,
    width: '100%',
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
  }
};
