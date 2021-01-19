import * as React from 'react';
import { FaCheck, FaCheckSquare, FaSquare } from 'react-icons/fa';
import { IStyleSheet } from '../../App';
import { COLORS } from '../../common_style/colors';



interface ToggleProps {
  name?: string,
  children?: JSX.Element,
  checked: boolean,
  onChange: (checked:boolean) => void
}

interface ToggleState {
  checked: boolean
}

export default class Toggle extends React.Component<ToggleProps> {
  state: ToggleState;

  constructor(props: ToggleProps) {
    super(props);

    if(props.name === null) {
      props.name = ""
    }

    this.state = {
      checked: props.checked
    }
  }

  componentDidUpdate(prevProps: ToggleProps) {
    if(this.props != prevProps) {
      this.setState({checked: this.props.checked})
    }
  }

  onChangeH() {
    this.props.onChange(!this.state.checked)
  }

  render() {

    return(
      <div style={{cursor: "pointer"}} onClick={this.onChangeH.bind(this)}>
           <div hidden={this.state.checked}
            style={styles.checkContainer}
            title={this.props.name}>
              <FaSquare color={COLORS.lightGray} style={styles.icon} />
           </div>
           <div hidden={!this.state.checked}
            style={styles.checkContainer}
            title={this.props.name}>
              <FaCheckSquare color={COLORS.blue} style={styles.icon} />
            </div>
            {this.props.children}
      </div>
    )
  }

};

const styles: IStyleSheet = {
  checkContainer: {
    width: 24,
  },
  icon: {
    fontSize: 24,
    float: "left",
    margin: 6
  }
};
