(this.webpackJsonpchatapp=this.webpackJsonpchatapp||[]).push([[0],{29:function(e,t,a){},41:function(e,t,a){},42:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a.n(n),i=a(30),c=a.n(i),r=a(17),o=a(16),u=a.n(o),l=a(20),j=a(31),d=a(32),h=a(35),b=a(34),O=(a(41),a(8)),f=(a(42),a(15),a(7)),m=(a(54),{apiKey:"AIzaSyDS6fe2Sp3IUQiL-VrrRBynE27ljvxzais",authDomain:"pihipurjehtija-chat.firebaseapp.com",projectId:"pihipurjehtija-chat",storageBucket:"pihipurjehtija-chat.appspot.com",messagingSenderId:"830653045546",appId:"1:830653045546:web:4e3d897f7cfc16ba811c53"});f.a.initializeApp(m);var x=f.a.auth(),v=(f.a.firestore(),new f.a.auth.GoogleAuthProvider,new f.a.auth.EmailAuthProvider,a(1)),p=function(e){var t=Object(n.useState)(""),a=Object(O.a)(t,2),s=a[0],i=a[1],c=Object(n.useState)(""),o=Object(O.a)(c,2),u=o[0],l=o[1],j=Object(n.useState)(""),d=Object(O.a)(j,2),h=d[0],b=d[1];return Object(v.jsx)("div",{children:Object(v.jsx)("div",{className:"container",children:Object(v.jsxs)("div",{className:"login",children:[Object(v.jsx)("h1",{children:"Kirjaudu"}),Object(v.jsx)("p",{children:"T\xe4yt\xe4 alla olevat kohdat luodaksesi uuden tilin tai kirjautuaksesi sis\xe4\xe4n."}),Object(v.jsx)("div",{children:Object(v.jsx)("input",{className:"input-field",placeholder:"S\xe4hk\xf6posti",name:"email",type:"email",value:s,onChange:function(e){return i(e.target.value)}})}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{children:Object(v.jsx)("input",{placeholder:"Salasana",className:"input-field",name:"password",type:"password",value:u,onChange:function(e){return l(e.target.value)}})}),Object(v.jsx)("br",{}),Object(v.jsx)("span",{className:"button-login",onClick:function(){x.signInWithEmailAndPassword(s,u).then((function(t){e.setAvatars(!1),e.authentication(!0),e.setUserInIfName()})).catch((function(e){var t=e.message;b(t)}))},children:"Kirjaudu"}),"  ",Object(v.jsx)("span",{className:"button-makeAccount",onClick:function(){x.createUserWithEmailAndPassword(s,u).then((function(t){e.authentication(!0)})).catch((function(e){var t=e.message;b(t)}))},children:"Luo tili"}),Object(v.jsx)("br",{}),Object(v.jsx)("br",{}),Object(v.jsx)(r.b,{to:"/Request-password",children:"Unohtuiko salasana?"}),Object(v.jsx)("p",{style:{color:"red"},children:h})]})})})},k=(a(50),a.p+"static/media/arrow.83f7b593.svg"),g=function(e){var t=Object(n.useState)(""),a=Object(O.a)(t,2),s=a[0],i=a[1],c=function(e){e.preventDefault(),r()},r=function(){var e=Object(l.a)(u.a.mark((function e(t){var a,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==s){e.next=4;break}return e.abrupt("return");case 4:return a=x.currentUser.uid,n=f.a.firestore().collection("messages"),e.next=8,n.add({text:s,createdAt:f.a.firestore.FieldValue.serverTimestamp(),uid:a,time:Date.now()});case 8:i("");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return window.matchMedia("(max-width: 768px)").matches?Object(v.jsx)("div",{className:"container-send-phone",children:Object(v.jsxs)("form",{className:"sendMessage-phone",onSubmit:c,children:[Object(v.jsx)("textarea",{rows:"4",cols:"30",type:"text",value:s,onChange:function(e){return i(e.target.value)}}),Object(v.jsx)("div",{className:"button-send-mobile",onClick:c,children:Object(v.jsx)("img",{src:k,alt:"Send",className:"arrow"})})]})}):Object(v.jsx)("div",{className:"container-send",children:Object(v.jsx)("form",{className:"sendMessage-form",onSubmit:r,children:Object(v.jsx)("textarea",{rows:"2",placeholder:"Kirjoita jotain...",className:"sendMessage-input",type:"text",value:s,onChange:function(e){return i(e.target.value)},onKeyDown:function(e){13===e.keyCode&&r()}})})})},N=(a(51),a(22)),S=function(e){var t=e.message,a=t.text,n=t.uid,s=t.time,i=f.a.firestore().collection("userName"),c=Object(N.a)(i),r=Object(O.a)(c,1)[0],o=n===x.currentUser.uid?"sent":"received";return Object(v.jsx)("div",{className:"message".concat(o),children:Object(v.jsxs)("div",{className:"message-background-".concat(o),children:[Object(v.jsxs)("div",{className:"message-info",children:[Object(v.jsx)("div",{style:{color:"#379187",fontSize:"12px",fontWeight:"600"},children:function(){if(r){var e=r.map((function(e){return e.uid})).indexOf(n);return r[e].text}}()}),Object(v.jsx)("span",{style:{color:"#379187",fontSize:"12px",fontWeight:"400"},children:function(){if(r){var e=new Date(s),t=e.getHours(),a=e.getMinutes(),n=e.getDate(),i=e.getMonth()+1,c=e.getFullYear();return Object(v.jsxs)("div",{children:[n,".",i,".",c," kello: ",t,":",a<10?"0"+a:a]})}}()})]}),Object(v.jsx)("div",{className:"message-text",children:a})]})})},w=function(e){var t=f.a.firestore().collection("messages").orderBy("createdAt"),a=Object(N.a)(t,{idField:"id"}),s=Object(O.a)(a,1)[0],i=Object(n.useRef)();return Object(n.useEffect)((function(){i.current.scrollIntoView()}),[s]),Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("main",{children:[s&&s.map((function(e){return Object(v.jsx)(S,{message:e},e.id)})),Object(v.jsx)("div",{ref:i})]})})},y=(a(29),function(e){var t=Object(n.useState)(""),a=Object(O.a)(t,2),s=a[0],i=a[1],c=Object(n.useState)(!0),r=Object(O.a)(c,2),o=r[0],j=r[1],d=Object(n.useState)(""),h=Object(O.a)(d,2),b=h[0],m=h[1],p=x.currentUser.uid,k=f.a.firestore().collection("userName"),g=Object(N.a)(k),S=Object(O.a)(g,1)[0];Object(n.useEffect)((function(){if(S){if(!S.map((function(e){return e.uid})).includes(p))return;j(!1)}else console.log("Loading...")}),[p,S]);var w=function(){var t=Object(l.a)(u.a.mark((function t(a){var n,c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),n=function(){var e=S.map((function(e){return e.text.toLowerCase()})),t=s.toLocaleLowerCase();return e.includes(t)},""!==s&&o){t.next=6;break}return t.abrupt("return");case 6:if(!0!==n()){t.next=10;break}m("Nimi on jo k\xe4yt\xf6ss\xe4"),t.next=14;break;case 10:return c=f.a.firestore().collection("userName"),t.next=13,c.add({text:s,uid:p});case 13:e.setAvatarOk(!0);case 14:i("");case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return o?Object(v.jsx)("div",{className:"container",children:Object(v.jsxs)("div",{className:"box",children:[Object(v.jsx)("h2",{children:"Melkein valmista!"}),Object(v.jsxs)("form",{onSubmit:w,children:[Object(v.jsxs)("p",{children:["Luo viel\xe4 k\xe4ytt\xe4j\xe4nimi, joka n\xe4kyy muille keskustelijoille.",Object(v.jsx)("br",{}),Object(v.jsx)("br",{}),Object(v.jsx)("span",{style:{fontWeight:"600"},children:"Nimen voi luoda vain kerran,"}),Object(v.jsx)("br",{}),"eik\xe4 sit\xe4 voi j\xe4lkeenp\xe4in muuttaa."]}),Object(v.jsx)("input",{className:"input-field",placeholder:"Nimimerkki",type:"text",name:"name",value:s,onChange:function(e){return i(e.target.value)}}),Object(v.jsx)("br",{}),Object(v.jsx)("p",{style:{color:"red"},children:b}),Object(v.jsx)("div",{className:"button-send",onClick:w,children:"Tallenna nimi"}),Object(v.jsx)("div",{className:"button-out",onClick:function(){x.signOut().then((function(){e.authentication(!1)}))},children:"Kirjaudu ulos"})]})]})}):Object(v.jsx)("div",{className:"container-reloaderButton",children:Object(v.jsx)("div",{className:"button-send",onClick:function(){return window.location.reload()},children:"Siirry chattiin!"})})}),A=(a(52),function(e){return Object(v.jsx)("div",{onClick:function(){x.signOut().then((function(){e.authentication(!1)}))},className:"logOut-button",children:"Kirjaudu ulos"})}),C=a(5),U=function(){var e=Object(n.useState)(""),t=Object(O.a)(e,2),a=t[0],s=t[1],i=Object(n.useState)(!1),c=Object(O.a)(i,2),o=c[0],u=c[1],l=Object(n.useState)(""),j=Object(O.a)(l,2),d=j[0],h=j[1],b=Object(n.useState)(!1),f=Object(O.a)(b,2),m=f[0],p=f[1];return m?Object(v.jsx)(C.a,{to:"/"}):Object(v.jsx)("div",{className:"container",children:Object(v.jsxs)("div",{className:"box",children:[Object(v.jsx)("h2",{children:"Vaihda salasana"}),Object(v.jsxs)("p",{children:["Kirjoita alla olevaan kentt\xe4\xe4n s\xe4hk\xf6postiosoitteesi ja paina l\xe4het\xe4.",Object(v.jsx)("br",{}),"Saat hetken kuluttua s\xe4hk\xf6postiisi linkin salasanan vaihtamiseksi."]}),Object(v.jsx)("input",{className:"input-field",placeholder:"S\xe4hk\xf6posti",name:"email",type:"email",value:a,onChange:function(e){return s(e.target.value)}}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{className:"button-send",onClick:function(){x.sendPasswordResetEmail(a).then((function(){u(!0),setTimeout((function(){u(!1),p(!0)}),4e3)})).catch((function(){h("Salasanan vaihtaminen ei onnistu.")}))},children:"L\xe4het\xe4"}),Object(v.jsx)("br",{}),Object(v.jsx)("br",{}),Object(v.jsx)("div",{children:o?"S\xe4hk\xf6postiisi on l\xe4hetetty linkki salasanan vaihtamiseksi.":Object(v.jsx)(r.b,{to:"/",children:"Takaisin etusivulle."})}),Object(v.jsx)("p",{style:{color:"red"},children:d})]})})},I=function(e){Object(h.a)(a,e);var t=Object(b.a)(a);function a(){var e;Object(j.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={authenticated:!1,avatars:[],newUser:[],avatarOk:!1,bottom:!0},e.aliasOk=Object(l.a)(u.a.mark((function t(){var a,n,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:a=x.currentUser.uid,n=e.state.avatars.map((function(e){return e.uid})),s=n.includes(a),e.setState({avatarOk:s});case 4:case"end":return t.stop()}}),t)}))),e.componentDidMount=function(){f.a.firestore().collection("userName").get().then((function(a){a.forEach((function(a){var n=a.data();t.push(n),e.setState({avatars:t}),e.aliasOk()}))}));f.a.auth().onAuthStateChanged((function(t){t?e.onAuthentication(!0):e.setState({authenticated:!1})}));var t=[]},e.handleScroll=function(t){t.target.scrollHeight-t.target.scrollTop===t.target.clientHeight?e.setState({bottom:!0}):e.setState({bottom:!1})},e.setAvatars=function(t){e.setState({avatars:t})},e.setNewUser=function(t){e.setState({newUser:t})},e.onAuthentication=function(t){e.setState({authenticated:t})},e.SingOut=function(){x.signOut().then((function(){e.setState({authenticated:!1})}))},e.setAvatarOk=function(t){e.setState({avatarOk:t})},e.togleInput=function(){return window.matchMedia("(max-width: 768px)").matches},e}return Object(d.a)(a,[{key:"render",value:function(){return Object(v.jsxs)(r.a,{children:[Object(v.jsx)(C.b,{exact:!0,path:"/",children:Object(v.jsx)("div",{children:this.state.authenticated?Object(v.jsx)("div",{children:this.state.avatarOk?Object(v.jsxs)("div",{className:"app-container",children:[Object(v.jsx)("div",{className:"data-container",children:Object(v.jsx)("div",{className:"logOutNow",children:Object(v.jsx)(A,{authentication:this.onAuthentication})})}),Object(v.jsx)("div",{className:"data-container",children:Object(v.jsx)("div",{className:"message-container",onScroll:this.handleScroll,children:Object(v.jsx)(w,{setAvatars:this.setAvatars,bottom:this.state.bottom})})}),Object(v.jsx)("div",{className:"data-container input",children:Object(v.jsx)(g,{authentication:this.onAuthentication})})]}):Object(v.jsx)("div",{children:Object(v.jsx)(y,{setNewUser:this.setNewUser,avatar:this.state.avatars,setAvatarOk:this.setAvatarOk})})}):Object(v.jsx)(p,{authentication:this.onAuthentication,setAvatars:this.setAvatars,setAvatarOk:this.setAvatarOk})})}),Object(v.jsx)(C.b,{path:"/Request-password",children:Object(v.jsx)(U,{})})]})}}]),a}(s.a.Component);c.a.render(Object(v.jsx)(r.a,{children:Object(v.jsx)(I,{})}),document.querySelector("#root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.c4900256.chunk.js.map