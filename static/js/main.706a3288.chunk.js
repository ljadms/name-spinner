(this["webpackJsonpname-spinner"]=this["webpackJsonpname-spinner"]||[]).push([[0],[,,,,,,,,,,function(t,e,n){t.exports=n(18)},,,,,function(t,e,n){},function(t,e,n){t.exports=n.p+"static/media/spin.2a738e54.mp3"},function(t,e,n){t.exports=n.p+"static/media/spinMusic.725bf97c.mp3"},function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(9),s=n.n(r),o=(n(15),n(1)),c=n(3),l=n(4),p=n(7),d=n(6),u=n(5),h="rgb(81, 192, 232)",m="rgb(130, 202, 208)",g="rgb(189, 222, 148)",f="rgb(100, 93, 163)",v="rgb(190, 87, 115)",y="#d4a659",b="#191919",E="rgb(59,59,59)",O=n(2),k=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).state=void 0,a.state={participants:t.participants,removeParticipant:t.removeParticipant,toggleParticipantMarked:t.toggleParticipantMarked},a}return Object(l.a)(n,[{key:"renderItem",value:function(t,e){var n=this.state.removeParticipant,i=this.state.toggleParticipantMarked;return a.createElement("div",{style:w.nameContainer,key:e},t.marked?a.createElement(O.b,{style:Object(o.a)(Object(o.a)({},w.icon),w.clickable),color:h,onClick:function(){return i(t)}}):a.createElement(O.b,{style:Object(o.a)(Object(o.a)({},w.icon),w.clickable),color:E,onClick:function(){return i(t)}}),a.createElement("div",{onClick:function(){return i(t)},style:Object(o.a)(Object(o.a)({},w.name),w.clickable)},t.name),a.createElement(O.f,{onClick:function(){return n(t)},style:Object(o.a)(Object(o.a)({},w.icon),w.clickable),color:E}))}},{key:"render",value:function(){var t=this,e=this.state.participants;return 0==e.length?a.createElement("div",null,a.createElement("div",{style:w.noParts}," Enter some names! ")):a.createElement("div",null,a.createElement("div",{style:w.noParts},"PARTICIPANTS"),e.map((function(e,n){return t.renderItem(e,n)})))}}],[{key:"getDerivedStateFromProps",value:function(t,e){if(t.participants!=e.participants)return{participants:t.participants}}}]),n}(a.Component),w={nameContainer:{display:"flex",width:240,margin:2,padding:2,flexDirection:"row",justifyContent:"space-between"},name:{fontSize:24,color:"white",flexGrow:2},icon:{width:20,padding:4,fontSize:24,flexShrink:0,alignSelf:"center"},iconContainer:{width:20},clickable:{cursor:"pointer"},noParts:{fontSize:24,fontWeight:"bold",color:y}},S=function(t){Object(d.a)(i,t);var e=Object(u.a)(i);function i(t){var a;return Object(c.a)(this,i),(a=e.call(this,t)).state=void 0,a.spinSound=void 0,a.spinMusic=void 0,a.size={height:600,width:600},a.styles={container:{display:"flex",flex:3,justifyContent:"center",alignItems:"center",flexFlow:"column"},doneContainer:{flexFlow:"column"},base:{height:a.size.height,width:a.size.width,position:"absolute"},pointer:{fontSize:75,transform:"translateX(".concat(a.size.width/2*-1-30,"px)")},circle:{borderRadius:5e3,backgroundColor:m,alignSelf:"center",overflow:"hidden",alignItems:"center",justifyContent:"center",borderColor:E,borderStyle:"solid",borderWidth:10},innerWedge:{transform:"translateY(".concat(a.size.height,"px)"),transformOrigin:"50% 0%",height:"100%",width:"100%"},name:{color:"white",fontSize:30,width:"100%",paddingLeft:25,position:"relative",top:-35},singleName:{fontSize:40,color:"white",position:"absolute",transform:"translateY(50%)",top:a.size.height/2-60,left:20},btn:{width:100,height:40,paddingTop:15,textAlign:"center",position:"relative",top:a.size.height/2-10},spinButton:{backgroundColor:h,color:"white",alignItems:"center",fontFamily:"helvetica",fontWeight:400,fontSize:24,cursor:"pointer"},iconContainer:{flexDirection:"row"},noParts:{fontSize:24,fontWeight:"bold",color:y},selectedName:{fontSize:36,fontWeight:"bold",color:"white",padding:4},nameContainer:{position:"relative",top:-1*(a.size.height/2+0),color:"white"},selectedContainer:{display:"flex",justifyContent:"space-between",width:a.size.width},goldText:{color:y}},a.WEDGE_COLORS=[m,g,v,f],a.state={rotate:0,participants:t.participants,rotating:!1,wasSpun:!1,toggleMarked:t.toggleMarked},a.spin=a.spin.bind(Object(p.a)(a)),a.spinSound=new Audio(n(16)),a.spinMusic=new Audio(n(17)),a}return Object(l.a)(i,[{key:"componentDidUpdate",value:function(t){var e=this.props;t!=e&&this.setState({participants:e.participants})}},{key:"spin",value:function(){var t=this;t.state.wasSpun&&t.state.toggleMarked(t.getselectedParticipant()),t.setState({rotating:!0});var e=Math.max(4,6*Math.random()),n=500*e,a=this.state.rotate,i=100*e,r=0;var s=setInterval((function(){var e=function(t,e,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,i=(Math.PI,[function(t){return t+5},function(t){return Math.sin(t*Math.PI/2)},function(t){return 1+s*Math.pow(t-1,3)+r*Math.pow(t-1,2)}]),r=1.70158,s=1+r,o=i[a](e);return(t+o*n)%360}(a,r/i,n,1);t.setState({rotate:e}),(r+=1)>=i&&(clearInterval(s),t.spinSound.pause(),t.spinSound.load(),t.spinMusic.pause(),t.spinMusic.load(),t.setState({rotating:!1,wasSpun:!0}))}),10);this.spinSound.currentTime=5-e,this.spinMusic.currentTime=0,this.state.participants.filter((function(t){return!t.marked})).length>0&&(this.spinSound.play(),this.spinMusic.play())}},{key:"getselectedParticipant",value:function(){var t=this.state.participants,e=360/t.length,n=this.state.rotate,a=Math.floor((270-n)/e);return a<0&&(a+=t.length),t[a]}},{key:"wedge",value:function(t,e,n){var i=e*n,r=e/-2;return a.createElement("div",{style:Object(o.a)(Object(o.a)({},this.styles.base),this.wedgeStyle(i))},a.createElement("div",{style:Object(o.a)(Object(o.a)({},this.styles.innerWedge),{backgroundColor:this.getWedgeColor(n),transform:"translateY(".concat(this.size.height,"px) rotate(").concat(e,"deg)")})},a.createElement("div",{style:Object(o.a)(Object(o.a)({},this.styles.name),{transform:"rotate(".concat(r,"deg)")})}," ",t," ")))}},{key:"render",value:function(){var t=this,e=this.state;return 0==e.participants.length?a.createElement("div",{style:Object(o.a)(Object(o.a)({},this.styles.container),this.styles.doneContainer)},e.wasSpun&&a.createElement("div",{style:this.styles.iconContainer},a.createElement(O.e,{size:60,color:"#d4a659",className:"md-star"}),a.createElement(O.e,{size:100,color:"#d4a659",className:"md-star"}),a.createElement(O.e,{size:60,color:"#d4a659",className:"md-star"})),a.createElement("div",{style:this.styles.noParts},e.wasSpun?"ALL DONE!":"ADD NAMES TO CREATE A WHEEL")):a.createElement("div",{style:this.styles.container},a.createElement("div",{style:this.styles.nameContainer},a.createElement("div",{style:this.styles.selectedName},e.wasSpun||e.rotating?a.createElement("div",{style:this.styles.selectedContainer},a.createElement("span",{style:this.styles.goldText},"LANDED ON: "),this.getselectedParticipant()?this.getselectedParticipant().name:"-"):a.createElement("span",{style:this.styles.goldText},"SPIN TO START"))),a.createElement("div",{style:Object(o.a)(Object(o.a)(Object(o.a)({},this.styles.base),this.styles.circle),{transform:"rotate(".concat(e.rotate,"deg)  ")})},e.participants.length>1?e.participants.map((function(n,a){return t.wedge(n.name,360/e.participants.length,a)})):a.createElement("div",{style:this.styles.singleName}," ",e.participants[0].name)),a.createElement("div",{style:this.styles.pointer},a.createElement(O.a,{color:y})),e.rotating?a.createElement("div",{style:this.styles.btn}):a.createElement("div",{onClick:this.spin,style:Object(o.a)(Object(o.a)({},this.styles.btn),this.styles.spinButton)},a.createElement("span",null,e.participants.length>1?"SPIN!":"DONE!")))}},{key:"getWedgeColor",value:function(t){var e=this.state.participants.length,n=t%this.WEDGE_COLORS.length;return t==e-1&&t%this.WEDGE_COLORS.length==0&&n++,this.WEDGE_COLORS[n]}},{key:"wedgeStyle",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.size.width/-2,n=t+90,a={backgroundColor:"transparent"};return a.transform="translateY(".concat(e,"px) rotate(").concat(n,"deg)"),a.transformOrigin="50% 100%",a.overflow="hidden",a}}]),i}(a.Component),P=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).state=void 0,a.state={addParticipant:t.addParticipant,disabled:t.disabled},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(t){t!=this.props&&this.setState({disabled:this.props.disabled})}},{key:"render",value:function(){var t=this.state.addParticipant,e=this.state.disabled;return a.createElement("div",null,a.createElement("div",{style:e?Object(o.a)(Object(o.a)({},j.addBtn),j.disabled):j.addBtn,onClick:function(){return!e&&t()}}," +ADD "))}}]),n}(a.Component),j={addBtn:{fontSize:20,color:h,marginTop:10,marginLeft:8,cursor:"pointer"},disabled:{color:E,cursor:"not-allowed"}},C=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(t){var a;return Object(c.a)(this,n),(a=e.call(this,t)).state=void 0,a.margin=40,a.styles={container:{position:"absolute",width:"100%",height:"100%",zIndex:1e3,display:"flex",justifyContent:"space-around",alignItems:"center"},shade:{position:"absolute",width:"100%",height:"100%",backgroundColor:E,opacity:.7,cursor:"alias"},contentContainer:{position:"absolute",backgroundColor:b,opacity:1,padding:16,borderRadius:5}},a.state={content:t.content,isOpen:t.isOpen},a}return Object(l.a)(n,[{key:"componentDidUpdate",value:function(t){t!=this.props&&(console.log("popup props changed | open:"+this.props.isOpen),this.setState({content:this.props.content,isOpen:this.props.isOpen}))}},{key:"closePopup",value:function(){this.setState({isOpen:!1})}},{key:"render",value:function(){var t=this;return this.state.isOpen?a.createElement("div",{style:this.styles.container},a.createElement("div",{style:this.styles.shade,onClick:function(){return t.props.toggle()}}),a.createElement("div",{style:this.styles.contentContainer},this.props.content)):a.createElement("div",null)}}]),n}(a.Component),x=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(t){var a;Object(c.a)(this,n),(a=e.call(this,t)).state=void 0;var i=localStorage.getItem("participants"),r=null==i?[]:JSON.parse(i);return a.state={participants:r,newParticipantName:"",popupOpen:!1},a.addParticipant=a.addParticipant.bind(Object(p.a)(a)),a.removeParticipant=a.removeParticipant.bind(Object(p.a)(a)),a.toggleParticipantMarked=a.toggleParticipantMarked.bind(Object(p.a)(a)),a}return Object(l.a)(n,[{key:"render",value:function(){var t=this,e=this.state.participants,n=i.a.createElement("div",{style:{color:"white"}},i.a.createElement("h1",{style:{color:y,marginTop:0}}," ",i.a.createElement(O.d,null)," HOW TO USE"),i.a.createElement("div",{style:{display:"flex",justifyContent:"space-evenly",alignItems:"baseline"}},i.a.createElement("div",{style:{width:200}},i.a.createElement("img",{src:"/name-spinner/help1.png",style:{width:200}}),"Add items to your spinner using the text input"),i.a.createElement("div",{style:{width:200}},i.a.createElement("img",{src:"/name-spinner/help2.png",style:{width:200}}),"Hit SPIN! to start the spinner"),i.a.createElement("div",{style:{width:200}},i.a.createElement("img",{src:"/name-spinner/help3.png",style:{width:200}}),"After an item has been landed on, it is automiatically removed from the wheel")),i.a.createElement("p",null),i.a.createElement("ul",null,i.a.createElement("li",null,"To hide or unhide a specific item from the wheel, click the item in the list"),i.a.createElement("li",null,"Clicking the trash icon will remove that item from the list")),i.a.createElement(O.c,{style:{color:y}}),"Your list of items is saved to the browser, you won't have to re-enter the items if you close or refresh the page!");return i.a.createElement("div",{style:M.container},i.a.createElement(C,{content:n,isOpen:this.state.popupOpen,toggle:this.togglePopup.bind(this)}),i.a.createElement("div",{style:Object(o.a)(Object(o.a)(Object(o.a)({},M.floating),M.popupIcon),M.helpIcon),title:"Help"},i.a.createElement(O.d,{onClick:this.togglePopup.bind(this)})),i.a.createElement("div",{style:M.participantContainter},i.a.createElement(k,{participants:e,removeParticipant:this.removeParticipant,toggleParticipantMarked:this.toggleParticipantMarked}),i.a.createElement("div",{style:M.inputs},i.a.createElement("input",{type:"text",style:M.nameInput,placeholder:"Enter a name",value:this.state.newParticipantName,onChange:function(e){return t.updateParticipantName(e)},onKeyPress:function(e){return t.enterPressed(e,t.addParticipant)}}),i.a.createElement(P,{disabled:!this.canAddName(),addParticipant:this.addParticipant}))),i.a.createElement(S,{participants:this.unMarked(),toggleMarked:this.toggleParticipantMarked}))}},{key:"unMarked",value:function(){return this.state.participants.filter((function(t){return!t.marked}))}},{key:"canAddName",value:function(){var t=this.state.participants,e=this.state.newParticipantName;return!(null!=t.find((function(t){return t.name==e}))||""==e||null==e)}},{key:"enterPressed",value:function(t,e){"Enter"===t.key&&e()}},{key:"addParticipant",value:function(){if(this.canAddName()){var t=this.state.participants,e=this.state.newParticipantName;t.push({name:e,marked:!1}),this.setState({newParticipantName:"",participants:t}),this.saveParticipantsToLocalStorage(t)}}},{key:"removeParticipant",value:function(t){var e=this.state.participants.filter((function(e){return e.name!=t.name}));this.setState({participants:e}),this.saveParticipantsToLocalStorage(e)}},{key:"toggleParticipantMarked",value:function(t){var e=this.state.participants,n=e.find((function(e){return e&&e.name==t.name}));null!=n&&(n.marked=!n.marked,this.setState({participants:e}))}},{key:"updateParticipantName",value:function(t){var e=t.target.value;this.setState({newParticipantName:e})}},{key:"saveParticipantsToLocalStorage",value:function(t){t.map((function(t){return t.marked=!1})),localStorage.setItem("participants",JSON.stringify(t))}},{key:"togglePopup",value:function(){this.setState({popupOpen:!this.state.popupOpen})}}]),n}(i.a.Component),M={container:{display:"flex",position:"absolute",flex:1,backgroundColor:b,width:"100%",height:"100%",flexDirection:"row",alignItems:"center"},participantContainter:{display:"flex",flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center"},participants:{flexGrow:3},spinner:{flex:3},spacer:{flex:1},inputs:{display:"flex",flex:1,flexDirection:"row",padding:6},nameInput:{padding:8,borderColor:"gray",borderStyle:"solid",borderWidth:2,height:30,color:"white",backgroundColor:"transparent",borderRadius:5},floating:{position:"absolute"},popupIcon:{color:m,fontSize:30,cursor:"pointer"},helpIcon:{right:10,top:10},newsIcon:{right:45,top:10,color:y}};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.706a3288.chunk.js.map