(this["webpackJsonpwaifu-site"]=this["webpackJsonpwaifu-site"]||[]).push([[0],{107:function(e,t,a){},131:function(e,t,a){"use strict";a.r(t);var c=a(1),n=a(0),r=a.n(n),i=a(15),o=a.n(i),s=a(9),l=a(12),u=(a(107),a(13)),d=a(156),j=a(157),b=a(158),p=a(134),h=a(155),f=a(16),g=a(36),O=a.n(g),x=a(11),m=a(174),v=a(42),y=a.n(v),w=Object(h.a)((function(e){return{root:{flexGrow:1},search:Object(u.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(f.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(f.b)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"220px"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:{padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),width:"100%"},searchRes:{position:"absolute",backgroundColor:"green",width:"300px",height:"300px"}}}));function k(e){var t=w(),a=e.match,r=(e.history,a.params.userID,Object(n.useState)()),i=Object(x.a)(r,2);i[0],i[1];return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:t.search,children:[Object(c.jsx)("div",{className:t.searchIcon,children:Object(c.jsx)(y.a,{})}),Object(c.jsx)(m.a,{onChange:function(e,t){console.log("test...- ".concat(e))}({}),placeholder:"Szukaj u\u017cytkownika",classes:{root:t.inputRoot,input:t.inputInput},inputProps:{"aria-label":"search"}})]})})}var C=Object(h.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:Object(u.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(u.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(f.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(f.b)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:{padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),width:"100%"}}}));function S(e){var t=C();return Object(c.jsx)("div",{className:t.root,children:Object(c.jsx)(d.a,{position:"static",children:Object(c.jsxs)(j.a,{children:[Object(c.jsx)(b.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"open drawer",href:"#/",children:Object(c.jsx)(O.a,{})}),Object(c.jsx)(p.a,{className:t.title,variant:"h6",noWrap:!0,children:"Pocket-Waifu"}),Object(c.jsx)(k,Object(s.a)({},e))]})})})}var N=function(e){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(S,Object(s.a)({},e)),Object(c.jsx)("div",{className:"divWhite",children:"/user/85/cards"}),Object(c.jsx)("div",{className:"divWhite",children:"/user/85/profile"})]})},I=function(e){var t=e.match,a=(e.history,t.params.userID);return Object(c.jsx)("div",{children:"user id: ".concat(a)})},D=a(168),T=a(169),R=a(170),L=a(171),z=a(172),B=a(47),P=a.n(B),E=a(164),F=a(162),G=a(173),J=a(165),A=a(166),W=a(55),M=a.n(W),U=a(163),q=a(87),H=a.n(q),K=a(161),V=a(135),Z=a(86),_=a.n(Z),Q=a(85),X=a.n(Q),Y=a(64),$=a.n(Y),ee=a(160),te=a(159),ae=a(89),ce=a(176),ne=a(177),re=a(175),ie=Object(h.a)((function(e){return{root:{flexGrow:1,bottom:e.spacing(2),right:e.spacing(2)},barColor:{borderTop:"1px solid rgba(0,0,0,0.1)",backgroundColor:"#364596"},button:{margin:e.spacing(1)},delete:{color:"#ffffff"},left:{marginLeft:"auto"},center:{marginLeft:"auto",marginRight:"auto"},searchRes:{position:"absolute",backgroundColor:"green",width:"300px",height:"300px"},search:Object(u.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(f.b)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(f.b)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"220px"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:{padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),width:"100%"}}}));function oe(e){var t=e.props,a=e.profileData,i=ie(),o=t.match,l=(t.history,o.params.userID),u=Object(n.useState)(""),p=Object(x.a)(u,2),h=p[0],f=p[1];var g=r.a.useState(!1),O=Object(x.a)(g,2),v=O[0],w=O[1],k=r.a.useRef(null),C=r.a.useState(a.tagList.map((function(e){return{value:e,choice:null}}))),S=Object(x.a)(C,2),N=S[0],I=S[1],D=r.a.useState(!1),T=Object(x.a)(D,2),R=T[0],L=T[1],z=function(e){k.current&&k.current.contains(e.target)||w(!1)},B=function(e){if(null!==e.choice)return"assign"===e.choice?{color:"green"}:"reject"===e.choice?{color:"red"}:void 0},P=r.a.useState(!1),E=Object(x.a)(P,2),F=E[0],G=E[1],J=r.a.useRef(null),A=r.a.useState(0),W=Object(x.a)(A,2),M=W[0],U=W[1],q=["Id","Nazwa","Ranga","Tytu\u0142 anime","\u017bycie","Bazowe \u017cycie","Atak","Obrona","Do\u015bwiadczenie","Dere","Obrazek"],H=r.a.useState(q.map((function(e){return{value:e,choice:null}}))),K=Object(x.a)(H,2),Z=K[0],Q=K[1],Y=r.a.useState(!1),oe=Object(x.a)(Y,2),se=oe[0],le=oe[1],ue=function(e){switch(e){case null:case"reject":return"assign";case"assign":return"reject";default:return null}},de=function(e){J.current&&J.current.contains(e.target)||G(!1)},je=function(e){if(null!==e.choice)return"assign"===e.choice?{color:"green"}:"reject"===e.choice?{color:"red"}:void 0};var be=function(){var e=function(e){switch(e.value){case"Id":if("assign"===e.choice)return"id";if("reject"===e.choice)return"idDes";case"Nazwa":if("assign"===e.choice)return"name";if("reject"===e.choice)return"nameDes";case"Ranga":if("assign"===e.choice)return"rarity";if("reject"===e.choice)return"rarityDes";case"Tytu\u0142 anime":if("assign"===e.choice)return"title";if("reject"===e.choice)return"titleDes";case"\u017bycie":if("assign"===e.choice)return"health";if("reject"===e.choice)return"healthDes";case"Bazowe \u017cycie":if("assign"===e.choice)return"healthBase";if("reject"===e.choice)return"healthBaseDes";case"Atak":if("assign"===e.choice)return"atack";if("reject"===e.choice)return"atackDes";case"Obrona":if("assign"===e.choice)return"defence";if("reject"===e.choice)return"defenceDes";case"Do\u015bwiadczenie":if("assign"===e.choice)return"exp";if("reject"===e.choice)return"expDes";case"Dere":if("assign"===e.choice)return"dere";if("reject"===e.choice)return"dereDes";case"Obrazek":if("assign"===e.choice)return"picture";if("reject"===e.choice)return"pictureDes";default:return"id"}}(Z[M]);console.log(Z[M]);var t=[],a=[];N.map((function(e){"assign"===e.choice&&t.push(e.value),"reject"===e.choice&&a.push(e.value)}));var c={orderBy:e,includeTags:t,excludeTags:a,searchText:h},n={optionsTag:N,optionsSort:Z,searchData:h,index:M};localStorage.setItem("u".concat(l,"filter"),JSON.stringify(c)),localStorage.setItem("u".concat(l,"dataFilter"),JSON.stringify(n)),console.log("reload"),window.location.reload()};return Object(n.useEffect)((function(){var e=JSON.parse(localStorage.getItem("u".concat(l,"dataFilter")));null!==e&&(I(e.optionsTag),Q(e.optionsSort),f(e.searchData),U(e.index))}),[]),Object(c.jsx)("div",{className:i.root,children:Object(c.jsx)(d.a,{position:"static",className:i.barColor,children:Object(c.jsxs)(j.a,{variant:"dense",className:i.barColor,children:[Object(c.jsxs)("div",{className:i.center,children:[Object(c.jsxs)(V.a,{ref:J,variant:"contained",color:"primary",size:"small","aria-controls":F?"split-button-menu":void 0,"aria-expanded":F?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){G((function(e){return!e}))},children:["Sortuj",Object(c.jsx)($.a,{})]}),Object(c.jsx)(ce.a,{open:F,anchorEl:J.current,role:void 0,transition:!0,disablePortal:!0,children:function(e){var t=e.TransitionProps,a=e.placement;return Object(c.jsx)(te.a,Object(s.a)(Object(s.a)({},t),{},{style:{transformOrigin:"bottom"===a?"center top":"center bottom"},children:Object(c.jsx)(ae.a,{children:Object(c.jsx)(ee.a,{onClickAway:de,children:Object(c.jsx)(re.a,{id:"split-button-menu",children:Z.map((function(e,t){return Object(c.jsx)(ne.a,{selected:!1,onClick:function(e){return function(e,t){U(t);for(var a=0;a<Z.length;a++){var c=Z[a];Z[a].choice=a!==t?null:ue(c.choice)}le(!se)}(0,t)},style:je(e),children:e.value},e.value)}))})})})}))}}),Object(c.jsxs)(V.a,{ref:k,variant:"contained",color:"primary",size:"small","aria-controls":v?"split-button-menu":void 0,"aria-expanded":v?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){w((function(e){return!e}))},children:["Tagi",Object(c.jsx)($.a,{})]}),Object(c.jsx)(ce.a,{open:v,anchorEl:k.current,role:void 0,transition:!0,disablePortal:!0,children:function(e){var t=e.TransitionProps,a=e.placement;return Object(c.jsx)(te.a,Object(s.a)(Object(s.a)({},t),{},{style:{transformOrigin:"bottom"===a?"center top":"center bottom"},children:Object(c.jsx)(ae.a,{children:Object(c.jsx)(ee.a,{onClickAway:z,children:Object(c.jsx)(re.a,{id:"split-button-menu",children:N.map((function(e,t){return Object(c.jsx)(ne.a,{onClick:function(e){return function(e,t){var a,c=null===(a=N[t]).choice?{value:a.value,choice:"assign"}:"assign"===a.choice?{value:a.value,choice:"reject"}:(a.choice,{value:a.value,choice:null});N[t]=c,L(!R)}(0,t)},style:B(e),children:e.value},e.value)}))})})})}))}})]}),Object(c.jsxs)("div",{className:i.search,children:[Object(c.jsx)("div",{className:i.searchIcon,children:Object(c.jsx)(y.a,{})}),Object(c.jsx)(m.a,{onChange:function(e){return t=e.target.value,void f(t);var t},value:h,placeholder:"Szukaj karty",classes:{root:i.inputRoot,input:i.inputInput},inputProps:{"aria-label":"search"}})]}),Object(c.jsxs)("div",{className:i.left,children:[Object(c.jsx)(V.a,{onClick:function(){be()},variant:"contained",color:"primary",size:"small",className:i.button,startIcon:Object(c.jsx)(X.a,{}),children:"Zastosuj"}),Object(c.jsx)(b.a,{"aria-label":"delete",onClick:function(){return function(){Q(q.map((function(e){return{value:e,choice:null}}))),U(0),I(a.tagList.map((function(e){return{value:e,choice:null}}))),f("");var e={optionsTag:N,optionsSort:Z,searchData:h,index:M};localStorage.setItem("u".concat(l,"filter"),JSON.stringify({orderBy:"id",includeTags:[],excludeTags:[],searchText:null})),localStorage.setItem("u".concat(l,"dataFilter"),JSON.stringify(e))}()},className:i.delete,children:Object(c.jsx)(_.a,{})})]})]})})})}var se=Object(h.a)((function(e){return{root:{flexGrow:1,bottom:e.spacing(2),right:e.spacing(2)},menuButton:Object(u.a)({marginRight:e.spacing(2),display:"none"},e.breakpoints.up("sm"),{display:"block"}),title:Object(u.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),card:Object(u.a)({flexGrow:1},e.breakpoints.up("sm"),{display:"block"}),icon:{color:"#ffffff"}}}));function le(e){var t=e.props,a=e.profileData,r=se(),i=t.match,o=(t.history,i.params.userID),l=Object(n.useState)(!1),u=Object(x.a)(l,2),h=u[0],f=u[1];return Object(c.jsx)("div",{className:r.root,children:Object(c.jsxs)(d.a,{position:"fixed",children:[Object(c.jsxs)(j.a,{children:[Object(c.jsx)(b.a,{edge:"start",className:r.menuButton,color:"inherit","aria-label":"open drawer",href:"#/",children:Object(c.jsx)(O.a,{})}),Object(c.jsx)(p.a,{className:r.title,variant:"h6",noWrap:!0,children:"Pocket-Waifu"}),Object(c.jsxs)(K.a,{disableElevation:!0,variant:"contained",color:"primary",className:r.card,children:[Object(c.jsx)(V.a,{href:"#/user/".concat(o,"/profile"),children:"Profil"}),Object(c.jsx)(V.a,{href:"#/user/".concat(o,"/cards"),children:"Karty"})]}),Object(c.jsx)(b.a,{className:r.icon,onClick:function(){f((function(e){return!e}))},children:Object(c.jsx)(H.a,{})}),Object(c.jsx)(k,Object(s.a)({},t))]}),Object(c.jsx)("div",{children:h?Object(c.jsx)(oe,{props:t,profileData:a}):""})]})})}var ue=Object(h.a)((function(e){return{root:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}}}));function de(e){var t=e.children,a=e.window,n=ue(),r=Object(F.a)({target:a?a():void 0,disableHysteresis:!0,threshold:100});return Object(c.jsx)(U.a,{in:r,children:Object(c.jsx)("div",{onClick:function(e){var t=(e.target.ownerDocument||document).querySelector("#back-to-top-anchor");t&&t.scrollIntoView({behavior:"smooth",block:"center"})},role:"presentation",className:n.root,children:t})})}function je(e){var t=e.props,a=e.profileData;return Object(c.jsxs)(r.a.Fragment,{children:[Object(c.jsx)(E.a,{}),Object(c.jsx)(le,{props:t,profileData:a}),Object(c.jsx)(j.a,{id:"back-to-top-anchor"}),Object(c.jsx)(J.a,{children:Object(c.jsx)(G.a,{my:2})}),Object(c.jsx)(de,Object(s.a)(Object(s.a)({},t),{},{children:Object(c.jsx)(A.a,{color:"secondary",size:"small","aria-label":"scroll back to top",children:Object(c.jsx)(M.a,{})})}))]})}var be=a(167),pe=Object(h.a)((function(e){return{cardMedia:{width:"190px",height:"276px",margin:"auto"}}})),he=function(e){var t=Object(n.useState)(!1),a=Object(x.a)(t,2),r=a[0],i=a[1],o=Object(n.useRef)(null),s=pe();return Object(n.useEffect)((function(){if(!r&&o.current){var e=new IntersectionObserver((function(e){Object(x.a)(e,1)[0].intersectionRatio>0&&i(!0)}));return e.observe(o.current),function(){return e.disconnect()}}}),[r,o]),r?Object(c.jsx)(be.a,{component:"img",image:e.image,className:s.cardMedia,alt:e.alt}):Object(c.jsx)("div",{style:{height:e.height,backgroundColor:"#EEE"},"aria-label":e.alt,ref:o})},fe=Object(h.a)((function(e){return{root:{margin:"auto"},cardsContainer:{flexGrow:1,paddingTop:"20px",paddingLeft:"50px",paddingRight:"50px"},cardStyle:{paddingTop:"20px",backgroundColor:"#272a33",width:"240px",height:"410px"},cardContent:{textAlign:"center",color:"white"},cardMedia:{width:"190px",height:"276px",margin:"auto"},id:{fontWeight:"bold"},link:{color:"#495dcc"}}})),ge=function(e){var t=e.match,a=(e.history,t.params.userID),r=fe(),i=Object(n.useState)(),o=Object(x.a)(i,2),l=o[0],u=o[1],d=Object(n.useState)(),j=Object(x.a)(d,2),b=j[0],p=j[1],h={orderBy:"id",includeTags:[],excludeTags:[],searchText:null},f=Object(n.useState)(h),g=Object(x.a)(f,2),O=g[0],m=(g[1],Object(n.useState)(JSON.parse(localStorage.getItem("u".concat(a,"test"))))),v=Object(x.a)(m,2),y=(v[0],v[1],JSON.parse(localStorage.getItem("u".concat(a,"filter"))));Object(n.useEffect)((function(){var e;console.log("useEffect - test"),null===y&&(e=h,localStorage.setItem("u".concat(a,"filter"),JSON.stringify(e)),JSON.parse(localStorage.getItem("u".concat(a,"filter")))),console.log("localFilter",y),void 0===b&&(console.info("Pobieram dane z api - profil"),P.a.get("https://api.sanakan.pl/api/waifu/user/".concat(a,"/profile")).then((function(e){var t=e.data;p(t)})),void 0===l&&(console.info("Pobieram dane z api - karty"),P.a.post("https://api.sanakan.pl/api/waifu/user/".concat(a,"/cards/0/10000"),y).then((function(e){var t=e.data;u(t)}))))}),[O]);return Object(c.jsx)(c.Fragment,{children:l?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(je,{props:e,profileData:b}),Object(c.jsx)(D.a,{container:!0,spacing:2,justify:"center",className:r.cardsContainer,children:l.map((function(t){return function(t){var a=t.id,n=t.imageUrl,i=t.name,o=t.animeTitle,l=t.characterUrl,u=t.isTradable,d=t.isInCage,j=t.isUnique,b=t.isUltimate,p=t.affection,h=t.tags;return Object(c.jsx)(D.a,{item:!0,children:Object(c.jsxs)(T.a,{className:r.cardStyle,children:[Object(c.jsx)(he,Object(s.a)({image:n,alt:a,className:r.cardMedia},e)),Object(c.jsxs)(R.a,{className:r.cardContent,children:[Object(c.jsx)("a",{className:r.id,children:a}),": ",Object(c.jsx)(L.a,{className:r.link,href:l,target:"_blank",children:i}),"".concat(h.map((function(e){return e.toLowerCase()})).indexOf("wymiana")?"":"\ud83d\udd03"),"".concat(h.map((function(e){return e.toLowerCase()})).indexOf("ulubione")?"":"\ud83d\udc97"),"".concat(h.map((function(e){return e.toLowerCase()})).indexOf("rezerwacja")?"":"\ud83d\udcdd"),"".concat(j?"\ud83d\udca0":""),"".concat(b?"\ud83c\udf96\ufe0f":""),"".concat("Pogarda"===p?"\ud83d\udc94":""),"".concat(u?" ":"\u26d4"),"".concat(d?"\ud83d\udd12":""),Object(c.jsx)("br",{}),"".concat(o)]})]})},a)}(t)}))})]}):Object(c.jsx)("center",{children:Object(c.jsx)(z.a,{size:100})})})},Oe=Object(h.a)((function(e){return{root:{flexGrow:1,bottom:e.spacing(2),right:e.spacing(2)},menuButton:Object(u.a)({marginRight:e.spacing(2),display:"none"},e.breakpoints.up("sm"),{display:"block"}),title:Object(u.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),card:Object(u.a)({flexGrow:1},e.breakpoints.up("sm"),{display:"block"})}}));function xe(e){var t=Oe(),a=e.match,n=(e.history,a.params.userID);return Object(c.jsx)("div",{className:t.root,children:Object(c.jsx)(d.a,{position:"fixed",children:Object(c.jsxs)(j.a,{children:[Object(c.jsx)(b.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"open drawer",href:"#/",children:Object(c.jsx)(O.a,{})}),Object(c.jsx)(p.a,{className:t.title,variant:"h6",noWrap:!0,children:"Pocket-Waifu"}),Object(c.jsxs)(K.a,{disableElevation:!0,variant:"contained",color:"primary",className:t.card,children:[Object(c.jsx)(V.a,{href:"#/user/".concat(n,"/profile"),children:"Profil"}),Object(c.jsx)(V.a,{href:"#/user/".concat(n,"/cards"),children:"Karty"})]}),Object(c.jsx)(k,Object(s.a)({},e))]})})})}var me=Object(h.a)((function(e){return{root:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2)}}}));function ve(e){var t=e.children,a=e.window,n=me(),r=Object(F.a)({target:a?a():void 0,disableHysteresis:!0,threshold:100});return Object(c.jsx)(U.a,{in:r,children:Object(c.jsx)("div",{onClick:function(e){var t=(e.target.ownerDocument||document).querySelector("#back-to-top-anchor");t&&t.scrollIntoView({behavior:"smooth",block:"center"})},role:"presentation",className:n.root,children:t})})}function ye(e){return Object(c.jsxs)(r.a.Fragment,{children:[Object(c.jsx)(E.a,{}),Object(c.jsx)(xe,Object(s.a)({},e)),Object(c.jsx)(j.a,{id:"back-to-top-anchor"}),Object(c.jsx)(J.a,{children:Object(c.jsx)(G.a,{my:2})}),Object(c.jsx)(ve,Object(s.a)(Object(s.a)({},e),{},{children:Object(c.jsx)(A.a,{color:"secondary",size:"small","aria-label":"scroll back to top",children:Object(c.jsx)(M.a,{})})}))]})}var we=Object(h.a)((function(e){var t;return t={root:{flexGrow:1,color:"white",textAlign:"center"},cardsContainer:{paddingTop:"20px",paddingLeft:"50px",paddingRight:"50px"},cardStyle:{border:"0px",backgroundColor:"rgba(0,0,0,0)"},cardContent:{textAlign:"center",color:"white"},cardMedia:{width:"190px",height:"276px"},details:{display:"block",float:"left",flexDirection:"column"},content:{backgroundColor:"#272a33",flex:"1 0 auto",padding:"auto",marginLeft:"auto",marginRight:"auto"},cover:{width:"100px"},controls:{display:"flex",alignItems:"center",paddingLeft:e.spacing(1),paddingBottom:e.spacing(1)},paper:{display:"flex",flexWrap:"wrap","& > *":{margin:e.spacing(1),width:e.spacing(16),height:e.spacing(16)}},profileCards:{alignItems:"center",margin:"auto",paddingTop:"20px",paddingLeft:"50px",paddingRight:"50px",paddingBottom:"20px"},img:{width:"475px",height:"677px",marginLeft:"auto"}},Object(u.a)(t,"details",{textAlign:"left",paddingTop:"50px",fontSize:"32px"}),Object(u.a)(t,"exchangeConditions",{paddingTop:"25px",paddingBottom:"20px",fontSize:"25px"}),t})),ke=function(e){var t=e.match,a=(e.history,t.params.userID),r=we(),i=Object(n.useState)(),o=Object(x.a)(i,2),l=o[0],u=o[1];Object(n.useEffect)((function(){P.a.get("https://api.sanakan.pl/api/waifu/user/".concat(a,"/profile")).then((function(e){var t=e.data;u(t)}))}),[]);return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(ye,Object(s.a)({},e)),Object(c.jsx)("div",{className:r.root,children:l?Object(c.jsxs)("div",{className:r.root,children:[Object(c.jsx)("div",{children:Object(c.jsxs)(D.a,{container:!0,spacing:3,className:r.profileCards,children:[Object(c.jsx)(D.a,{item:!0,xs:12,sm:6,children:Object(c.jsx)(be.a,{component:"img",image:l.waifu.profileImageUrl,alt:l.waifu.id,className:r.img})},l.waifu.profileImageUrl),Object(c.jsx)(D.a,{item:!0,xs:12,sm:6,children:Object(c.jsxs)("div",{className:r.details,children:["Posiadane karty:",Object(c.jsxs)("div",{children:["SSS: ","".concat(l.sssCount)]}),Object(c.jsxs)("div",{children:["SS: ","".concat(l.ssCount)]}),Object(c.jsxs)("div",{children:["S: ","".concat(l.sCount)]}),Object(c.jsxs)("div",{children:["A: ","".concat(l.aCount)]}),Object(c.jsxs)("div",{children:["B: ","".concat(l.bCount)]}),Object(c.jsxs)("div",{children:["C: ","".concat(l.cCount)]}),Object(c.jsxs)("div",{children:["D: ","".concat(l.dCount)]}),Object(c.jsxs)("div",{children:["E: ","".concat(l.eCount)]}),Object(c.jsxs)("div",{children:["SUMA: ","".concat(function(e){return e.sssCount+e.ssCount+e.sCount+e.aCount+e.bCount+e.cCount+e.dCount+e.eCount}(l))]})]})},l.waifu.id)]})}),Object(c.jsx)("div",{className:r.exchangeConditions,children:l.exchangeConditions}),Object(c.jsx)("div",{children:l.gallery?Object(c.jsx)(D.a,{container:!0,justify:"center",alignItems:"baseline",spacing:2,className:r.cardsContainer,children:l.gallery.map((function(t){return function(t){var a=t.profileImageUrl,n=t.id;return Object(c.jsx)(D.a,{item:!0,children:Object(c.jsx)(T.a,{variant:"outlined",className:r.cardStyle,children:Object(c.jsx)(he,Object(s.a)({image:a,alt:n,className:r.cardMedia},e))})},n)}(t)}))}):""})]}):Object(c.jsx)("center",{children:Object(c.jsx)(z.a,{size:100})})})]})};var Ce=function(){return Object(c.jsxs)(l.c,{children:[Object(c.jsx)(l.a,{exact:!0,path:"/",render:function(e){return Object(c.jsx)(N,Object(s.a)({},e))}}),Object(c.jsx)(l.a,{exact:!0,path:"/user/:userID",render:function(e){return Object(c.jsx)(I,Object(s.a)({},e))}}),Object(c.jsx)(l.a,{exact:!0,path:"/user/:userID/Cards",render:function(e){return Object(c.jsx)(ge,Object(s.a)({},e))}}),Object(c.jsx)(l.a,{exact:!0,path:"/user/:userID/Profile",render:function(e){return Object(c.jsx)(ke,Object(s.a)({},e))}})]})},Se=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,179)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,i=t.getTTFB;a(e),c(e),n(e),r(e),i(e)}))},Ne=a(63),Ie=a(19),De=Object(Ie.a)();o.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(Ne.a,{history:De,children:Object(c.jsx)(Ce,{})})}),document.getElementById("root")),Se()}},[[131,1,2]]]);
//# sourceMappingURL=main.b677e6fd.chunk.js.map