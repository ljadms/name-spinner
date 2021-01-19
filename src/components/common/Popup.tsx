import * as React from 'react';
import { IStyleSheet } from '../../App';
import { COLORS } from '../../common_style/colors';

export interface PopupProps {
  isOpen: boolean,
  toggle: () => void,
  children: JSX.Element
}

interface PopupState {
  isOpen: boolean
}

export class Popup extends React.Component<PopupProps> {
  state: PopupState;

  constructor(props: PopupProps) {
    super(props);

    this.state = {
      //content: props.content,
      isOpen: props.isOpen
    }
  }

  componentDidUpdate(prevProps:PopupProps) {
    if (prevProps != this.props) {
      this.setState({
        isOpen: this.props.isOpen
      })
    }
  }

  closePopup() {
    this.setState({isOpen: false})
  }

  render() {

    if (this.state.isOpen) {
      return(
        <div style={this.styles.container}>
          <div style={this.styles.shade} onClick={() => this.props.toggle()}></div>
          <div style={this.styles.contentContainer}>
            {this.props.children}
          </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }

  }

  margin = 40;

  styles: IStyleSheet = {
    container: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    shade: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: COLORS.lightGray,
      opacity: 0.7,
      cursor: 'alias'
    },
    contentContainer: {
      position: 'absolute',
      backgroundColor: COLORS.gray,
      opacity: 1,
      padding: 16,
      borderRadius: 5
    }
  }

}
