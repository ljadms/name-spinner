(this["webpackJsonpname-spinner"]=this["webpackJsonpname-spinner"]||[]).push([[0],{10:function(t,e,a){t.exports=a(16)},15:function(t,e,a){},16:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),r=a(9),s=a.n(r),o=(a(15),a(3)),c=a(4),l=a(7),d=a(6),p=a(5),u=a(1),h="rgb(81, 192, 232)",m="rgb(130, 202, 208)",g="rgb(189, 222, 148)",f="rgb(100, 93, 163)",v="rgb(190, 87, 115)",b="#d4a659",y="#191919",k="rgb(59,59,59)",O=a(2),E=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).state=void 0,n.state={participants:t.participants,removeParticipant:t.removeParticipant,toggleParticipantMarked:t.toggleParticipantMarked},n}return Object(c.a)(a,[{key:"renderItem",value:function(t,e){var a=this.state.removeParticipant,i=this.state.toggleParticipantMarked;return n.createElement("div",{style:P.nameContainer,key:e},n.createElement("div",{onClick:function(){return i(t)},style:Object(u.a)(Object(u.a)({},P.name),P.clickable)},t.marked?n.createElement(O.b,{style:Object(u.a)(Object(u.a)({},P.icon),P.clickable),color:h}):n.createElement(O.b,{style:Object(u.a)(Object(u.a)({},P.icon),P.clickable),color:k}),t.name),n.createElement(O.d,{onClick:function(){return a(t)},style:Object(u.a)(Object(u.a)({},P.icon),P.clickable),color:k}))}},{key:"render",value:function(){var t=this,e=this.state.participants;return 0==e.length?n.createElement("div",null,n.createElement("div",{style:P.noParts}," Enter some names! ")):n.createElement("div",null,n.createElement("div",{style:P.noParts},"PARTICIPANTS"),e.map((function(e,a){return t.renderItem(e,a)})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(t.participants!=e.participants)return{participants:t.participants}}}]),a}(n.Component),P={nameContainer:{display:"flex",width:240,margin:2,padding:2,flexDirection:"row",justifyContent:"space-between"},name:{alignSelf:"center",fontSize:24,color:"white"},icon:{alignSelf:"flex-end",width:20,padding:4,fontSize:24},clickable:{cursor:"pointer"},noParts:{fontSize:24,fontWeight:"bold",color:b}},w=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).state=void 0,n.size={height:600,width:600},n.styles={container:{display:"flex",flex:3,justifyContent:"center",alignItems:"center",flexFlow:"column"},doneContainer:{flexFlow:"column"},base:{height:n.size.height,width:n.size.width,position:"absolute"},pointer:{fontSize:75,transform:"translateX(".concat(n.size.width/2*-1-30,"px)")},circle:{borderRadius:5e3,backgroundColor:m,alignSelf:"center",overflow:"hidden",alignItems:"center",justifyContent:"center",borderColor:k,borderStyle:"solid",borderWidth:10},innerWedge:{transform:"translateY(".concat(n.size.height,"px)"),transformOrigin:"50% 0%",height:"100%",width:"100%"},name:{color:"white",fontSize:30,width:"100%",paddingLeft:40},singleName:{fontSize:40,color:"white",position:"absolute",transform:"translateY(50%)",top:n.size.height/2-50},btn:{width:100,height:40,paddingTop:15,textAlign:"center",position:"relative",top:n.size.height/2-10},spinButton:{backgroundColor:h,color:"white",alignItems:"center",fontFamily:"helvetica",fontWeight:400,fontSize:24,cursor:"pointer"},iconContainer:{flexDirection:"row"},noParts:{fontSize:24,fontWeight:"bold",color:b},selectedName:{fontSize:36,fontWeight:"bold",color:b,padding:4},nameContainer:{position:"relative",top:-1*(n.size.height/2+0),color:"white"}},n.WEDGE_COLORS=[m,g,v,f],n.state={rotate:0,participants:t.participants,rotating:!1,wasSpun:!1,toggleMarked:t.toggleMarked},n.spin=n.spin.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(t){var e=this.props;t!=e&&this.setState({participants:e.participants})}},{key:"spin",value:function(){var t=this;t.state.wasSpun&&t.state.toggleMarked(t.getselectedParticipant()),t.setState({rotating:!0});var e=3*Math.random()+1,a=setInterval((function(){var e=(t.state.rotate+5)%360;t.setState({rotate:e})}),.01);setTimeout((function(){return clearInterval(a),void t.setState({rotating:!1,wasSpun:!0})}),1e3*e)}},{key:"getselectedParticipant",value:function(){var t=this.state.participants,e=360/t.length,a=this.state.rotate,n=Math.floor((270-a)/e);return n<0&&(n+=t.length),t[n]}},{key:"wedge",value:function(t,e,a){var i=e*a,r=e/-2.25;return n.createElement("div",{style:Object(u.a)(Object(u.a)({},this.styles.base),this.wedgeStyle(i))},n.createElement("div",{style:Object(u.a)(Object(u.a)({},this.styles.innerWedge),{backgroundColor:this.getWedgeColor(a),transform:"translateY(".concat(this.size.height,"px) rotate(").concat(e,"deg)")})},n.createElement("div",{style:Object(u.a)(Object(u.a)({},this.styles.name),{transform:"rotate(".concat(r,"deg)")})}," ",t," ")))}},{key:"render",value:function(){var t=this,e=this.state;return 0==e.participants.length?n.createElement("div",{style:Object(u.a)(Object(u.a)({},this.styles.container),this.styles.doneContainer)},e.wasSpun&&n.createElement("div",{style:this.styles.iconContainer},n.createElement(O.c,{size:60,color:"#d4a659",className:"md-star"}),n.createElement(O.c,{size:100,color:"#d4a659",className:"md-star"}),n.createElement(O.c,{size:60,color:"#d4a659",className:"md-star"})),n.createElement("div",{style:this.styles.noParts},e.wasSpun?"ALL DONE!":"ADD NAMES TO CREATE A WHEEL")):n.createElement("div",{style:this.styles.container},n.createElement("div",{style:this.styles.nameContainer},n.createElement("div",{style:this.styles.selectedName},e.wasSpun||e.rotating?this.getselectedParticipant().name:"SPIN TO START")),n.createElement("div",{style:Object(u.a)(Object(u.a)(Object(u.a)({},this.styles.base),this.styles.circle),{transform:"rotate(".concat(e.rotate,"deg)  ")})},e.participants.length>1?e.participants.map((function(a,n){return t.wedge(a.name,360/e.participants.length,n)})):n.createElement("div",{style:this.styles.singleName}," ",e.participants[0].name)),n.createElement("div",{style:this.styles.pointer},n.createElement(O.a,{color:b})),e.rotating?n.createElement("div",{style:this.styles.btn}):n.createElement("div",{onClick:this.spin,style:Object(u.a)(Object(u.a)({},this.styles.btn),this.styles.spinButton)},n.createElement("span",null,e.participants.length>1?"SPIN!":"DONE!")))}},{key:"getWedgeColor",value:function(t){var e=this.state.participants.length,a=t%this.WEDGE_COLORS.length;return t==e-1&&t%this.WEDGE_COLORS.length==0&&a++,this.WEDGE_COLORS[a]}},{key:"wedgeStyle",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.size.width/-2,a=t+90,n={backgroundColor:"transparent"};return n.transform="translateY(".concat(e,"px) rotate(").concat(a,"deg)"),n.transformOrigin="50% 100%",n.overflow="hidden",n}}]),a}(n.Component),S=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).state=void 0,n.state={addParticipant:t.addParticipant,disabled:t.disabled},n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(t){t!=this.props&&this.setState({disabled:this.props.disabled})}},{key:"render",value:function(){var t=this.state.addParticipant,e=this.state.disabled;return n.createElement("div",null,n.createElement("div",{style:e?Object(u.a)(Object(u.a)({},j.addBtn),j.disabled):j.addBtn,onClick:function(){return!e&&t()}}," +ADD "))}}]),a}(n.Component),j={addBtn:{fontSize:20,color:h,marginTop:10,marginLeft:8,cursor:"pointer"},disabled:{color:k,cursor:"not-allowed"}},C=function(t){Object(d.a)(a,t);var e=Object(p.a)(a);function a(t){var n;Object(o.a)(this,a),(n=e.call(this,t)).state=void 0;var i=localStorage.getItem("participants"),r=null==i?[]:JSON.parse(i);return n.state={participants:r,newParticipantName:""},n.addParticipant=n.addParticipant.bind(Object(l.a)(n)),n.removeParticipant=n.removeParticipant.bind(Object(l.a)(n)),n.toggleParticipantMarked=n.toggleParticipantMarked.bind(Object(l.a)(n)),n}return Object(c.a)(a,[{key:"render",value:function(){var t=this,e=this.state.participants;return i.a.createElement("div",{style:x.container},i.a.createElement("div",{style:x.participantContainter},i.a.createElement(E,{participants:e,removeParticipant:this.removeParticipant,toggleParticipantMarked:this.toggleParticipantMarked}),i.a.createElement("div",{style:x.inputs},i.a.createElement("input",{type:"text",style:x.nameInput,placeholder:"Enter a name",value:this.state.newParticipantName,onChange:function(e){return t.updateParticipantName(e)},onKeyPress:function(e){return t.enterPressed(e,t.addParticipant)}}),i.a.createElement(S,{disabled:!this.canAddName(),addParticipant:this.addParticipant}))),i.a.createElement(w,{participants:this.unMarked(),toggleMarked:this.toggleParticipantMarked}))}},{key:"unMarked",value:function(){return this.state.participants.filter((function(t){return!t.marked}))}},{key:"canAddName",value:function(){var t=this.state.participants,e=this.state.newParticipantName;return!(null!=t.find((function(t){return t.name==e}))||""==e||null==e)}},{key:"enterPressed",value:function(t,e){"Enter"===t.key&&e()}},{key:"addParticipant",value:function(){if(this.canAddName()){var t=this.state.participants,e=this.state.newParticipantName;t.push({name:e,marked:!1}),this.setState({newParticipantName:"",participants:t}),this.saveParticipantsToLocalStorage(t)}}},{key:"removeParticipant",value:function(t){var e=this.state.participants.filter((function(e){return e.name!=t.name}));this.setState({participants:e}),this.saveParticipantsToLocalStorage(e)}},{key:"toggleParticipantMarked",value:function(t){var e=this.state.participants,a=e.find((function(e){return e&&e.name==t.name}));null!=a&&(a.marked=!a.marked,this.setState({participants:e}))}},{key:"updateParticipantName",value:function(t){var e=t.target.value;this.setState({newParticipantName:e})}},{key:"saveParticipantsToLocalStorage",value:function(t){t.map((function(t){return t.marked=!1})),localStorage.setItem("participants",JSON.stringify(t))}}]),a}(i.a.Component),x={container:{display:"flex",position:"absolute",flex:1,backgroundColor:y,width:"100%",height:"100%",flexDirection:"row",alignItems:"center"},participantContainter:{display:"flex",flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center"},participants:{flexGrow:3},spinner:{flex:3},spacer:{flex:1},inputs:{display:"flex",flex:1,flexDirection:"row",padding:6},nameInput:{padding:8,borderColor:"gray",borderStyle:"solid",borderWidth:2,height:30,color:"white",backgroundColor:"transparent",borderRadius:5}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.d1069db0.chunk.js.map