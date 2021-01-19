import * as React from 'react';
import { COLORS } from '../common_style/colors';

export interface AddParticipantProps {
  addParticipant: () => void,
  disabled: boolean
}

export class AddParticipant extends React.Component<AddParticipantProps> {
  state: AddParticipantProps

  constructor(props: AddParticipantProps) {
    super(props);
    this.state = {
      addParticipant: props.addParticipant,
      disabled: props.disabled
    }

  }

  componentDidUpdate(prevProps: AddParticipantProps) {
    if(prevProps !== this.props) {
      this.setState({
        disabled: this.props.disabled
      })
    }
  }

  render() {
    let addFunc = this.state.addParticipant;
    let disabled = this.state.disabled;
    return(
    <div>
      <div style={disabled ? {...styles.addBtn, ...styles.disabled} : styles.addBtn} onClick={() => disabled ? false : addFunc()} > +ADD </div>
    </div>
  )//render(props.participants);
}

}

const styles = {
  addBtn:{
    fontSize: 20,
    color: COLORS.blue,
    marginTop: 10,
    marginLeft: 8,
    cursor: 'pointer'
  },
  disabled:{
    color: COLORS.lightGray,
    cursor: 'not-allowed'
  }
}
