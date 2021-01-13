import React, { ChangeEvent } from 'react';
import {ParticipantList, Participant } from './components/ParticipantList';
import {Spinner} from './components/Spinner';
import { AddParticipant } from './components/AddParticipant';
import { COLORS } from './common_style/colors';
import { FaExclamation, FaExclamationCircle, FaQuestionCircle } from 'react-icons/fa';
import { Popup } from './components/common/Popup';


interface AppProps {
  participants: Participant[]
}

interface AppState {
  participants: Participant[],
  newParticipantName: string,
  popupOpen: boolean
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
      newParticipantName: "",
      popupOpen: false
    }

    this.addParticipant = this.addParticipant.bind(this)
    this.removeParticipant = this.removeParticipant.bind(this)
    this.toggleParticipantMarked = this.toggleParticipantMarked.bind(this)
  }


  render() {
    let participants = this.state.participants

    let helpContent = (
      <div style={{color:'white'}}>
        <h1 style={{color: COLORS.gold, marginTop:0}}> <FaQuestionCircle/> HOW TO USE</h1>
        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'baseline'}}>
          <div style={{width:200}}>
            <img src={process.env.PUBLIC_URL+'/help1.png'} style={{width:200}}/>
            Add items to your spinner using the text input
          </div>
          <div style={{width:200}}>
            <img src={process.env.PUBLIC_URL+'/help2.png'} style={{width:200}}/>
            Hit SPIN! to start the spinner
          </div>
          <div style={{width:200}}>
            <img src={process.env.PUBLIC_URL+'/help3.png'} style={{width:200}}/>
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
    return (
      <div style={styles.container}>
      <Popup content={helpContent} isOpen={this.state.popupOpen} toggle={this.togglePopup.bind(this)} />
      <div style={{...styles.floating, ...styles.popupIcon, ...styles.helpIcon}} title="Help">
       <FaQuestionCircle onClick={this.togglePopup.bind(this)}/>
       </div>
       {
         /**
         TODO: what's new popup
        <div style={{...styles.floating, ...styles.popupIcon, ...styles.newsIcon}} title="What's New">
          <FaExclamationCircle onClick={this.togglePopup.bind(this)}/>
        </div>
        **/
      }
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

  togglePopup() {
    this.setState({popupOpen: !this.state.popupOpen})
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
    right: 10,
    top: 10,
  },
  newsIcon: {
    right: 45,
    top: 10,
    color: COLORS.gold
  }
};
