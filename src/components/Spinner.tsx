import * as React from 'react';

import { Participant } from "./ParticipantList";
import { COLORS } from '../common_style/colors';
import { IStyleSheet } from '../App';
import { FaArrowRight, FaStar } from 'react-icons/fa';

export interface SpinnerProps {
  participants: Participant[],
  toggleMarked: (p: Participant) => void,
  settings?: SpinnerSettings
}

export interface SpinnerSettings {
  useSound: boolean,
  useMusic: boolean
}

interface SpinnerState {
  rotate: number,
  participants: Participant[],
  rotating: boolean,
  wasSpun: boolean,
  toggleMarked: (p: Participant) => void,
  settings: SpinnerSettings
}

const DEFAULT_SETTINGS = {
  useSound: true,
  useMusic: true
}

export class Spinner extends React.Component<SpinnerProps> {
  state: SpinnerState;
  spinSound: HTMLAudioElement;
  spinMusic: HTMLAudioElement;
  doneSound: HTMLAudioElement;

  constructor(props: SpinnerProps) {
       super(props);

       let settings = props.settings != null ? props.settings : DEFAULT_SETTINGS

       this.state = {
         rotate: 0,
         participants: props.participants,
         rotating: false,
         wasSpun: false,
         toggleMarked: props.toggleMarked,
         settings: settings
       }

       this.spin = this.spin.bind(this);
       this.spinSound = new Audio(require("./assets/spin.mp3"));
       this.spinMusic = new Audio(require("./assets/spinMusic.mp3"));
       this.doneSound = new Audio(require("./assets/fanfare.wav"));
  }

  componentDidUpdate(prevProps:SpinnerProps) {
  let currProps: SpinnerProps = this.props as SpinnerProps
   if(prevProps !== currProps) {
     this.setState({
       participants: currProps.participants,
       settings: currProps.settings
     })
   }
  }

  spin() {
   let self = this
   //if we spun already, mark the last person
   if(self.state.wasSpun) {
     self.state.toggleMarked(self.getselectedParticipant());
     if(self.props.settings && self.props.settings.useSound && self.props.participants.filter((p:Participant) => !p.marked).length == 0) {
       self.doneSound.currentTime = 0;
       self.doneSound.play()
     }
   }

   self.setState({
     rotating: true
   })

   // min/max seconds to spin
   let min = 3
   let max = 6.5
   let secs = Math.max(min, (Math.random() * max))

   let totalRotation = (secs * 500);
   let initialRotation = this.state.rotate;
   let ticks = secs * 100;
   let currTick = 0;

   function getVal(initial: number, x: number, totalRotation: number, spinType:number = 0) {

     let spinTypes = [
       (x:number) => x + 5,
       (x:number) => Math.sin((x * Math.PI) / 2),
       (x:number) => 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
     ]

     let c1 = 1.70158
     let c3 = 1 + c1;
     let progress = spinTypes[spinType](x);
     return (initial + (progress * totalRotation)) % 360;
   }

   function tick() {
     let val = getVal(initialRotation, currTick/ticks, totalRotation,1);
     self.setState({
       rotate: val
     })
     currTick+=1;
     if(currTick >= ticks) {
       endSpin();
     }
   }

   let spinTimer = setInterval(tick, 10)

   //make sound if spinning
   this.spinSound.currentTime = 5 - secs;
   this.spinMusic.currentTime = 0;
   if(this.state.participants.filter(x => !x.marked).length > 0){
     if (this.state.settings.useSound) { this.spinSound.play() }
     if (this.state.settings.useMusic) { this.spinMusic.play() }
   }

   function endSpin() {
     clearInterval(spinTimer);
     self.spinSound.pause();
     self.spinSound.load();
     self.spinMusic.pause();
     self.spinMusic.load();
     self.setState({
       rotating: false,
       wasSpun: true
     })
   }
   //setTimeout(() => endSpin(), ticks)
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

   // if(participants[selectedIndex] == undefined){
   //   alert(selectedIndex)
   // }
   return participants[selectedIndex];
  }


  wedge (name:string, degrees: number, index: number) {
      let offset = degrees * index;
      let nameRotate = degrees/-2;
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

  if (state.participants.length === 0) {
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
            {!state.wasSpun && !state.rotating
               ? (<span style={this.styles.goldText}>SPIN TO START</span>)
               : (<div style={this.styles.selectedContainer}>
                    <span style={this.styles.goldText}>LANDED ON: </span>{ this.getselectedParticipant() ? this.getselectedParticipant().name : "-"}
                  </div>)
            }
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
      overflow: 'hidden'
    },
    name: {
      color: 'white',
      fontSize: 30,
      width: '100%',
      paddingLeft: 25,
      position: 'relative',
      top: -35
    },
    singleName: {
      fontSize: 40,
      color: 'white',
      position: 'absolute',
      transform: "translateY(50%)",
      top: (this.size.height / 2) - 60,
      left: 20
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
      color: 'white',
      padding: 4,
    },
    nameContainer: {
      position: 'relative',
      top: -1 * ((this.size.height / 2) + 0),
      color: 'white'
    },
    selectedContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: this.size.width
    },
    goldText: {
      color: COLORS.gold
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
    (index === (participantLength - 1) && index % this.WEDGE_COLORS.length === 0) && colorIndex++;

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
