import * as React from 'react';
import { IStyleSheet } from '../App';
import { COLORS } from '../common_style/colors';
import { FaCheck, FaTrash } from 'react-icons/fa'

export interface Participant {
  name: string;
  marked: boolean;
}

export interface ParticipantListProps {
  participants: Participant[]
  removeParticipant: (participant: Participant) => void,
  toggleParticipantMarked:  (participant: Participant) => void
}

interface ParticipantsListState {
  participants: Participant[],
  removeParticipant: (participant: Participant) => void,
  toggleParticipantMarked:  (participant: Participant) => void
}

export class ParticipantList extends React.Component<ParticipantListProps> {
  state: ParticipantsListState;

  constructor(props: ParticipantListProps) {
    super(props);
    this.state = {
      participants: props.participants,
      removeParticipant: props.removeParticipant,
      toggleParticipantMarked:  props.toggleParticipantMarked
    }

  }


   static getDerivedStateFromProps(nextProps: ParticipantListProps, prevState: ParticipantsListState) {
     if (nextProps.participants != prevState.participants) {
       return {
         participants: nextProps.participants
       }
     }
   }

 renderItem(participant: Participant, index:number): JSX.Element {
   let removeParticipant = this.state.removeParticipant as ((participant: Participant) => null)
   let toggle = this.state.toggleParticipantMarked
    return(
      <div style={styles.nameContainer} key={index}>

        <div onClick={() => toggle(participant)} style={{...styles.name, ...styles.clickable}}>
          {participant.marked
            ? <FaCheck style={{...styles.icon, ...styles.clickable}} color={COLORS.blue} />
            :  <FaCheck style={{...styles.icon, ...styles.clickable}} color={COLORS.lightGray} /> }
        {participant.name}
        </div>
        <FaTrash onClick={() => removeParticipant(participant)} style={{...styles.icon, ...styles.clickable}} color={COLORS.lightGray} />
      </div>
    )
  }

  render() {
    let participants: Participant[] = this.state.participants
    if (participants.length == 0) {
      return(
        <div>
          <div style={styles.noParts}> Enter some names! </div>
        </div>
      )
    } else {
      return(
      <div>
      <div style={styles.noParts}>PARTICIPANTS</div>
        {participants.map((item, index) => this.renderItem(item, index))}
      </div>
    )//render(props.participants);
  }
}

}

const styles: IStyleSheet = {
  nameContainer: {
    display: 'flex',
    width: 240,
    margin: 2,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  name: {
    alignSelf: 'center',
    fontSize: 24,
    color: 'white'
  },
  icon: {
    alignSelf: 'flex-end',
    width: 20,
    padding: 4,
    fontSize: 24
  },
  clickable: {
    cursor: 'pointer',
  },
  noParts: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gold

  }
}
