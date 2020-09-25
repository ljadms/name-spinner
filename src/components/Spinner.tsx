import * as React from 'react';

import { Participant } from "./ParticipantList";
import { COLORS } from '../common_style/colors';
import { IStyleSheet } from '../App';
import { FaArrowRight, FaStar } from 'react-icons/fa';

export interface SpinnerProps {
  participants: Participant[],
  toggleMarked: (p: Participant) => void
}

interface SpinnerState {
  rotate: number,
  participants: Participant[],
  rotating: boolean,
  wasSpun: boolean,
  toggleMarked: (p: Participant) => void
}

export class Spinner extends React.Component<SpinnerProps> {
  state: SpinnerState;

  constructor(props: SpinnerProps) {
       super(props);
       this.state = {
         rotate: 0,
         participants: props.participants,
         rotating: false,
         wasSpun: false,
         toggleMarked: props.toggleMarked
       }

       this.spin = this.spin.bind(this)
  }

  componentDidUpdate(prevProps:SpinnerProps) {
  let currProps: SpinnerProps = this.props as SpinnerProps
   if(prevProps !=currProps) {
     this.setState({
       participants: currProps.participants
     })
   }
  }

  spin() {
   let self = this
   //if we spun already, mark the last person
   if(self.state.wasSpun) {
     self.state.toggleMarked(self.getselectedParticipant());
   }

   self.setState({
     rotating: true
   })

   function getVal(curr: number) {

     let y = curr * curr
     return (curr + 5) % 360;
   }
   function tick() {
     let val = getVal(self.state.rotate)
     self.setState({
       rotate: val
     })
   }

   // min/max seconds to spin
   let min = 1
   let max = 3

   let secs = ((Math.random() * max) + min)

   let spinTimer = setInterval(tick, .01)

   function endSpin() {
     clearInterval(spinTimer);
     self.setState({
       rotating: false,
       wasSpun: true
     })
   }
   setTimeout(() => endSpin(), secs*1000)
  }

  getselectedParticipant() {
   let participants = this.state.participants;
   let wedgeArc = (360 / participants.length);
   let rotation = this.state.rotate;

   const ARROW_DEG = 270;

   let offset = rotation
   let selectedIndex = Math.floor((ARROW_DEG - offset) / wedgeArc);

   if (selectedIndex < 0) {
     selectedIndex += participants.length
   }

   return participants[selectedIndex];
  }


  wedge (name:string, degrees: number, index: number) {
      let offset = degrees * index;
      let nameRotate = degrees/-2.25;
      return (
        <div style={ {...this.styles.base, ...this.wedgeStyle(offset)} }>
          <div style={
            {
              ...this.styles.innerWedge,
               ...{backgroundColor: this.getWedgeColor(index),
                  transform: `translateY(${this.size.height}px) rotate(${degrees}deg)`
                }
              }
            }>
            <div style={{...this.styles.name, ...{transform: `rotate(${nameRotate}deg)`}}}> {name} </div>
          </div>
        </div>
      )
    }

  render() {
  let state:SpinnerState = this.state

  if (state.participants.length == 0) {
    return (
      <div style={{...this.styles.container, ...this.styles.doneContainer}}>
        {state.wasSpun &&
        (<div style={this.styles.iconContainer}>
          <FaStar size={60}  color={'#d4a659'} className={'md-star'}/>
          <FaStar size={100}  color={'#d4a659'} className={'md-star'}/>
          <FaStar size={60} color={'#d4a659'} className={'md-star'}/>
        </div>)}
        <div style={this.styles.noParts}>{state.wasSpun ? "ALL DONE!" :"ADD NAMES TO CREATE A WHEEL"}</div>
      </div>
    )
  } else {
    return (
      <div style={this.styles.container}>
        {/** Name Display **/}
        <div style={this.styles.nameContainer}>
          <div style={this.styles.selectedName}>
            {!state.wasSpun && !state.rotating ? "SPIN TO START" : this.getselectedParticipant().name}
          </div>
        </div>
        {/** Wheel **/}
        <div style={{ ...this.styles.base, ...this.styles.circle, ...{ transform: `rotate(${state.rotate}deg)  `} }}>
        {state.participants.length > 1
          ? state.participants.map((item, ind) => this.wedge(item.name, (360 / state.participants.length), ind))
          : (<div style={this.styles.singleName}> {state.participants[0].name}</div>)
        }
       </div>
       {/** Arrow **/}
      <div style={this.styles.pointer}><FaArrowRight color={COLORS.gold}/></div>
      {/** spin button **/}
      { state.rotating ?   <div style={this.styles.btn}/> : (
        <div onClick={this.spin} style={{...this.styles.btn,...this.styles.spinButton}}>
         <span>{state.participants.length > 1 ? "SPIN!" : "DONE!"}</span>
        </div>
      ) }
      </div>
    )
    }
  }

  size = {
    height: 600,
    width: 600
  }

  styles: IStyleSheet = {
    container: {
      display: 'flex',
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column',
    },
    doneContainer: {
      flexFlow: 'column'
    },
    base: {
      height: this.size.height,
      width: this.size.width,
      position: 'absolute'
    },
    pointer: {
      fontSize: 75,
      transform: `translateX(${-1 * (this.size.width / 2) - 30}px)`
    },
    circle: {
      borderRadius: 5000,
      backgroundColor: COLORS.lightBlue,
      alignSelf: 'center',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: COLORS.lightGray,
      borderStyle: 'solid',
      borderWidth: 10,
    },
    innerWedge: {
      transform: `translateY(${this.size.height}px)`,
      transformOrigin: '50% 0%',
      height: '100%',
      width: '100%',
    },
    name: {
      color: 'white',
      fontSize: 30,
      width: '100%',
      paddingLeft: 40,
    },
    singleName: {
      fontSize: 40,
      color: 'white',
      position: 'absolute',
      transform: "translateY(50%)",
      top: (this.size.height / 2) - 50
    },
    btn: {
      width: 100,
      height: 40,
      paddingTop:15,
      textAlign: 'center',
      position: 'relative',
      top: (this.size.height / 2) - 10
    },
    spinButton: {
      backgroundColor: COLORS.blue,
      color: 'white',
      alignItems: 'center',
      fontFamily: 'helvetica',
      fontWeight: 400,
      fontSize: 24,
      cursor: 'pointer',
    },
    iconContainer: {
      flexDirection: 'row'
    },
    noParts:{
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.gold
    },
    selectedName: {
      fontSize: 36,
      fontWeight: 'bold',
      color: COLORS.gold,
      padding: 4,
    },
    nameContainer: {
      position: 'relative',
      top: -1 * ((this.size.height / 2) + 0),
      color: 'white'
    }
  }

  WEDGE_COLORS = [
    COLORS.lightBlue,
    COLORS.green,
    COLORS.pink,
    COLORS.purple
  ]

  getWedgeColor(index: number) {
    // get color for wedge so there's no repeats
    let participantLength: number = this.state.participants.length;
    let colorIndex: number = index % this.WEDGE_COLORS.length;
    (index == (participantLength - 1) && index % this.WEDGE_COLORS.length == 0) && colorIndex++;

    return this.WEDGE_COLORS[colorIndex]
  }

  wedgeStyle (offset = 0) {
    let y = (this.size.width / -2);
    let rot = (offset + 90)
    let style:any = {}
    style.backgroundColor = 'transparent';
    style.transform = `translateY(${y}px) rotate(${rot}deg)`;
    style.transformOrigin = '50% 100%'
    style.overflow = 'hidden'
    return style;
  }
}
