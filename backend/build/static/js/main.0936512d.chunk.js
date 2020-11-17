(this["webpackJsonplens-viewer"]=this["webpackJsonplens-viewer"]||[]).push([[0],{150:function(e,t,a){},220:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a(0),r=a.n(c),s=a(15),i=a.n(s),o=(a(150),a(287)),d=a(284),l=a(31),u=a(22),j=a(33),h=a(4),b=a(263),p=a(27),f=a(280),x=a(281),O=a(224),g=a(63),m=a(223),v=a(291),y=a(279),w=a(261),C=a(275),k=a(282),S=a(271),I=a(283),B=a(125),L=a.n(B),N=a(126),D=a.n(N),U=a(127),_=a.n(U),M=a(128),F=a.n(M),R=a(254),G=a(257),P=a(258),E=a(259),z=a(285),W=a(262);function A(e){var t=e.open,a=e.onLogin,c=r.a.useState(""),s=Object(u.a)(c,2),i=s[0],o=s[1],d=r.a.useState(""),l=Object(u.a)(d,2),j=l[0],h=l[1],b=function(){0===i.trim().length?h("Enter a valid user ID"):a(i)};return Object(n.jsx)("div",{children:Object(n.jsxs)(R.a,{open:t,"aria-labelledby":"form-dialog-title",children:[Object(n.jsx)(G.a,{id:"form-dialog-title",children:"Log in"}),Object(n.jsxs)(P.a,{children:[Object(n.jsx)(E.a,{children:"Log in with a user id to save your batches"}),Object(n.jsx)(z.a,{autoFocus:!0,margin:"dense",id:"user_id",label:"User ID",type:"text",fullWidth:!0,value:i,onChange:function(e){return o(e.target.value)},error:Boolean(j),onKeyDown:function(e){13===e.keyCode&&b()},helperText:j})]}),Object(n.jsx)(W.a,{children:Object(n.jsx)(m.a,{onClick:b,color:"primary",children:"Login"})})]})})}var T=a(130),H=a(264),K=a(118),J=a.n(K).a.create({baseURL:"",withCredentials:!0}),Y=Object(b.a)((function(e){return{fileUpload:{backgroundColor:"#f1f1f1",padding:e.spacing(3)},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},wrapper:{position:"relative"}}}));function V(e){var t=Y(),a=e.uploadOpen,c=e.handleClose,s=r.a.useState(!1),i=Object(u.a)(s,2),o=i[0],d=i[1];return Object(n.jsx)(R.a,{open:a,onClose:c,children:Object(n.jsx)(T.a,{accept:".csv",children:function(e){var a=e.getRootProps,r=e.getInputProps,s=e.acceptedFiles;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(G.a,{children:"Upload batches"}),Object(n.jsx)(P.a,{children:Object(n.jsx)("div",{children:Object(n.jsxs)("div",Object(j.a)(Object(j.a)({},a({className:t.fileUpload})),{},{children:[Object(n.jsx)("input",Object(j.a)({},r())),s.length>0?s.map((function(e){return Object(n.jsxs)("li",{children:[e.path," - ",(e.size/1e6).toFixed(2)," Mb"]},e.path)})):Object(n.jsx)(g.a,{variant:"body2",children:"Click to upload your .csvs"})]}))})}),Object(n.jsxs)(W.a,{children:[Object(n.jsx)(m.a,{color:"primary",onClick:c,children:"Cancel"}),Object(n.jsxs)("div",{className:t.wrapper,children:[Object(n.jsx)(m.a,{color:"primary",disabled:o,onClick:function(){var e=new FormData;s.forEach((function(t){return e.append(t.name,t)})),d(!0),J.post("/upload-batches",e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then((function(){d(!1),c()})).catch((function(){d(!1)}))},children:"Upload"}),o&&Object(n.jsx)(H.a,{size:24,className:t.buttonProgress})]})]})]})}})})}var X=a(132),$=a(290),q=a(124),Q=a.n(q),Z=a(265),ee=a(266),te=a(267),ae=a(268),ne=a(269),ce=a(270),re=a(120),se=a.n(re),ie=a(119),oe=a.n(ie);function de(e){var t=e.candidate,a=r.a.useState(!1),c=Object(u.a)(a,2),s=c[0],i=c[1];return Object(n.jsx)(Z.a,{component:X.a,children:Object(n.jsxs)(ee.a,{size:"small",children:[Object(n.jsx)(te.a,{children:Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{children:Object(n.jsx)("b",{children:"Parameter"})}),Object(n.jsx)(ne.a,{children:Object(n.jsx)("b",{children:"Value"})})]})}),Object(n.jsxs)(ce.a,{children:[Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"RA"}),Object(n.jsx)(ne.a,{children:t.ra.toFixed(5)})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"DEC"}),Object(n.jsx)(ne.a,{children:t.dec.toFixed(5)})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"Grade"}),Object(n.jsx)(ne.a,{children:t.grade})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"URL"}),Object(n.jsx)(ne.a,{children:Object(n.jsx)("a",{href:t.skyviewer,target:"_blank",rel:"noopener noreferrer",children:"Skyviewer"})})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"Additional"}),Object(n.jsx)(ne.a,{children:Object(n.jsx)(O.a,{"aria-label":"expand row",size:"small",onClick:function(){return i(!s)},children:s?Object(n.jsx)(oe.a,{}):Object(n.jsx)(se.a,{})})})]}),s&&Object.entries(JSON.parse(t.additional)).map((function(e,t){var a=Object(u.a)(e,2),c=a[0],r=a[1];return Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:c}),Object(n.jsx)(ne.a,{children:r})]},t)}))]})]})})}var le,ue,je=a(286),he=a(274),be=a(272),pe=a(289),fe=a(276),xe=a(277),Oe=a(278),ge=a(54),me=a.n(ge),ve=a(273),ye=a(18),we=a.n(ye),Ce=a(35),ke=a(24),Se=a(25),Ie=a(40),Be=a(88),Le=a.n(Be),Ne=Object(ke.b)("auth/login",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/login",{user_id:t});case 2:return n=e.sent,a.dispatch(Ue()),e.abrupt("return",{userId:n.data.success?t:null});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),De=Object(ke.b)("auth/logout",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/logout");case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ue=Object(ke.b)("data/fetchBatches",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.get("/batches");case 2:return n=e.sent,e.abrupt("return",{batches:n.data.batches});case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),_e=Object(ke.b)("data/fetchCursor",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.getState().data.selectedBatchId,e.next=3,J.get("/cursor",{params:{batch_id:n}});case 3:return c=e.sent,e.abrupt("return",{cursor:c.data.cursor});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Me=Object(ke.b)("data/fetchCandidates",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c,r,s;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.start,c=t.stop,console.log(n,c),r=a.getState().data.selectedBatchId,e.next=5,J.get("/candidates",{params:{start:n,stop:c,batch_id:r}});case 5:return s=e.sent,e.abrupt("return",{candidates:s.data.candidates});case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Fe=Object(ke.b)("data/fetchCounts",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.getState().data.selectedBatchId,e.next=3,J.get("/batch_stats",{params:{batch_id:n}});case 3:return c=e.sent,e.abrupt("return",{counts:c.data.counts});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Re=Object(ke.b)("data/setGrade",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c,r,s;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.grade,r=Math.min(a.getState().data.cursor+1),a.dispatch(Ae.actions.setCursor({cursor:r})),e.next=5,J.post("/candidates",{id:n,grade:c});case 5:s=e.sent,a.dispatch(Ae.actions.setCounts({counts:s.data.counts})),a.dispatch(Ae.actions.updateCandidate({id:n,grade:c}));case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ge=Object(ke.b)("data/setComment",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.comment,e.next=3,J.post("/candidates",{id:n,comment:c});case 3:a.dispatch(Ae.actions.updateCandidate({id:n,comment:c}));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Pe=Object(ke.b)("data/setMark",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c,r,s;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.type,r=t.coordinate,e.next=3,J.post("/mark",{id:n,type:c,coordinate:r});case 3:s=e.sent,a.dispatch(Ae.actions.updateCandidate(Object(j.a)({id:n},s.data.candidate)));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ee=Object(ke.b)("data/clearMarks",function(){var e=Object(Ce.a)(we.a.mark((function e(t,a){var n,c;return we.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,J.delete("/mark",{data:{id:n}});case 3:c=e.sent,a.dispatch(Ae.actions.updateCandidate(Object(j.a)({id:n},c.data.candidate)));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),ze=Object(ke.d)({name:"auth",initialState:{userId:null},reducers:{},extraReducers:(le={},Object(l.a)(le,Ne.fulfilled,(function(e,t){e.userId=t.payload.userId})),Object(l.a)(le,De.pending,(function(e,t){e.userId=null})),le)}),We=Object(ke.c)(),Ae=Object(ke.d)({name:"data",initialState:We.getInitialState({selectedBatchId:null,useSkyviewer:!0,batches:{},cursor:null,counts:[0,0,0,0,0],filters:[!1,!1,!1,!1,!1]}),reducers:{flipFilter:function(e,t){e.filters[t.payload.idx]=!e.filters[t.payload.idx]},setUseSkyviewer:function(e,t){e.useSkyviewer=t.payload.useSkyviewer},selectBatch:function(e,t){e.batchId!==t.payload.batchId&&(e.selectedBatchId=t.payload.batchId,e.cursor=null,e.candidates={},e.counts=[0,0,0,0,0])},updateCandidate:function(e,t){var a=me.a.findKey(e.candidates,(function(e){return e.id===t.payload.id}));e.candidates[a]=Object(j.a)(Object(j.a)({},e.candidates[a]),t.payload)},setCursor:function(e,t){e.cursor=Math.min(Math.max(t.payload.cursor,0),e.batches[e.selectedBatchId].n_cands-1)},progressCursor:function(e,t){for(var a=t.payload.forward?1:-1,n=e.cursor+a,c=e.batches[e.selectedBatchId].n_cands;0<=n&&n<c&&e.filters[e.candidates[n].grade-1]&&null!==e.candidates[n].grade;)n+=a;e.cursor=Math.min(Math.max(n,0),c-1)},setCounts:function(e,t){e.counts=t.payload.counts},deleteBatch:function(e,t){e.batches=me.a.omit(e.batches,[t.payload.batchId]),e.selectedBatchId=null}},extraReducers:(ue={},Object(l.a)(ue,Ue.fulfilled,(function(e,t){e.batches=me.a.keyBy(t.payload.batches,"id")||{}})),Object(l.a)(ue,_e.fulfilled,(function(e,t){e.cursor=t.payload.cursor})),Object(l.a)(ue,Me.fulfilled,(function(e,t){t.payload.candidates.forEach((function(t){e.candidates[t.order]=t}))})),Object(l.a)(ue,Fe.fulfilled,(function(e,t){e.counts=t.payload.counts})),Object(l.a)(ue,De.fulfilled,(function(e){return{selectedBatchId:null,batches:[],candidates:{},cursor:null,counts:[0,0,0,0,0],filters:[!1,!1,!1,!1,!1],useSkyviewer:!0}})),ue)}),Te=function(e){return e.data.batches[e.data.selectedBatchId]},He={key:"auth",storage:Le.a,blacklist:["candidates"]},Ke={key:"root",version:1,storage:Le.a},Je=Object(Se.c)({auth:ze.reducer,data:Object(Ie.g)(He,Ae.reducer)}),Ye=Object(Ie.g)(Ke,Je),Ve=Object(ke.a)({reducer:Ye,middleware:Object(ke.e)({serializableCheck:{ignoredActions:[Ie.a,Ie.f,Ie.b,Ie.c,Ie.d,Ie.e]}})}),Xe=Object(Ie.h)(Ve),$e=a(28);var qe=Object($e.b)((function(e){return{useSkyviewer:e.data.useSkyviewer}}),{setUseSkyviewer:Ae.actions.setUseSkyviewer})((function(e){var t=e.open,a=e.handleClose;return Object(n.jsxs)(R.a,{open:t,onClose:a,children:[Object(n.jsx)(G.a,{children:"Settings"}),Object(n.jsxs)(P.a,{children:["Configuring inspection settings for current batch. TODO: custom keybindings, delete",Object(n.jsxs)(w.a,{children:[Object(n.jsx)(S.a,{primary:"Use Skyviewer"}),Object(n.jsx)(be.a,{children:Object(n.jsx)(ve.a,{edge:"end",onChange:function(){e.setUseSkyviewer({useSkyviewer:!e.useSkyviewer})},checked:e.useSkyviewer})})]}),Object(n.jsx)(m.a,{color:"secondary",children:"Delete (WIP)"})]})]})})),Qe=Object(b.a)((function(e){return{paper:{padding:e.spacing(3),gap:"".concat(e.spacing(1),"px"),display:"flex",flexDirection:"column",justifyContent:"space-evenly",flex:1},container:{flex:1,display:"flex",flexDirection:"column"}}}));var Ze=Object($e.b)((function(e){return{filters:e.data.filters}}),{flipFilter:Ae.actions.flipFilter})((function(e){var t=Qe(),a=e.batch,c=e.counts,s=r.a.useState(!1),i=Object(u.a)(s,2),o=i[0],d=i[1];return Object(n.jsxs)("div",{className:t.container,children:[Object(n.jsxs)(X.a,{className:t.paper,children:[Object(n.jsxs)(g.a,{variant:"h6",children:["Batch ",Object(n.jsx)("i",{children:a.name})," metrics"]}),Object(n.jsxs)(je.a,{display:"flex",alignItems:"center",children:[Object(n.jsx)(je.a,{minWidth:"125px",children:Object(n.jsx)(g.a,{variant:"body2",color:"textSecondary",children:"Grading progress: "})}),Object(n.jsx)(je.a,{width:"100%",mr:1,children:Object(n.jsx)(he.a,{variant:"determinate",value:me.a.sum(c)/a.n_cands*100})}),Object(n.jsx)(je.a,{children:Object(n.jsxs)(g.a,{variant:"body2",color:"textSecondary",children:[me.a.sum(c),"/",a.n_cands]})})]}),Object(n.jsx)(w.a,{children:["A","B","C","D","Non-lenses"].map((function(t,r){return Object(n.jsxs)(C.a,{button:!0,onClick:function(){e.flipFilter({idx:r})},children:[Object(n.jsx)(S.a,{primary:"".concat(t,": ").concat(c[r]," (").concat((c[r]/a.n_cands*100).toFixed(2),"%)")}),Object(n.jsx)(be.a,{children:Object(n.jsx)(pe.a,{edge:"end",onChange:function(){e.flipFilter({idx:r})},checked:!e.filters||!e.filters[r]})})]},r)}))}),Object(n.jsxs)(fe.a,{color:"primary",children:[Object(n.jsx)(m.a,{style:{width:"100%"},startIcon:Object(n.jsx)(xe.a,{}),onClick:function(){J.get("/export_batch",{params:{batch_id:a.id,timestamp:(new Date).getMilliseconds()},withCredentials:!0,responseType:"blob"}).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download","".concat(a.name,".csv")),document.body.appendChild(n),n.click()}))},children:"Export to CSV"}),Object(n.jsx)(m.a,{style:{width:"100%"},startIcon:Object(n.jsx)(Oe.a,{}),onClick:function(){return d(!0)},children:"Settings"})]})]}),Object(n.jsx)(qe,{open:o,handleClose:function(){return d(!1)}})]})})),et=a(122),tt=a(123),at=a(131),nt=["Grade A","Grade B","Grade C","Grade D","Non lens"],ct=Object(b.a)((function(e){return{card:{display:"flex",flexDirection:"row",padding:"".concat(e.spacing(1),"px"),paddingLeft:"".concat(e.spacing(2),"px"),alignItems:"center",justifyContent:"space-between"},container:{height:"100%",display:"flex",flexDirection:"column"}}}));var rt=Object($e.b)((function(e){return{useSkyviewer:e.data.useSkyviewer}}))((function(e){var t=e.candidates,a=e.useSkyviewer,c=e.batch,s=e.loadCands,i=e.cursor,o=e.setCursor,d=e.nextUngraded,l=ct(),u=r.a.createRef(),j=function(e){return Boolean(t[e])};return r.a.useEffect((function(){u.current&&i>=0&&u.current.scrollToItem(i,"center")}),[i]),Object(n.jsxs)(X.a,{className:l.container,children:[Object(n.jsx)(m.a,{style:{width:"100%",flex:0},onClick:d,children:"Next Ungraded"}),Object(n.jsx)(y.a,{}),Object(n.jsx)("div",{style:{flex:1},children:Object(n.jsx)(et.a,{children:function(e){var r=e.height,d=e.width;return Object(n.jsx)(tt.a,{isItemLoaded:j,itemCount:c.n_cands,minimumBatchSize:20,loadMoreItems:function(e,t){return s({start:e,stop:t})},children:function(e){var s=e.onItemsRendered,h=e.ref;return Object(n.jsx)(at.a,{height:r,width:d,itemSize:100,itemCount:c.n_cands,ref:function(e){e&&(h(e),u.current=e)},onItemsRendered:s,layout:"vertical",children:function(e){var c=e.index,r=e.style;return Object(n.jsxs)(C.a,{style:r,className:l.card,button:!0,selected:c===i,onClick:function(){return o({cursor:c})},children:[Object(n.jsx)("div",{children:j(c)?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(g.a,{variant:"body1",children:["Cand #",t[c].order]}),Object(n.jsx)(g.a,{variant:"body1",style:{color:t[c].grade?"green":"red"},children:t[c].grade?nt[t[c].grade-1]:"Ungraded"})]}):Object(n.jsx)(g.a,{variant:"body1",children:"Loading..."})}),j(c)&&Object(n.jsx)("img",{src:a?t[c].skyviewer:t[c].filename,style:{height:"100%"},alt:"Lens preview"})]},c)}})}})}})})]})})),st=a(288),it=a(55);var ot=Object($e.b)((function(e){return{useSkyviewer:e.data.useSkyviewer}}),{clearMarks:Ee,setMark:Pe})((function(e){var t=e.useSkyviewer,a=e.current,c=e.width,r=e.height,s=t?a.skyviewer:a.filename,i=Math.min(c,r),o=new window.Image;return o.src=s,o.height=i,o.width=i,Object(n.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(n.jsxs)(it.Stage,{width:i,height:i,style:{display:"flex",justifyContent:"center",height:"100%",width:"100%",alignItems:"center"},children:[Object(n.jsx)(it.Layer,{children:Object(n.jsx)(it.Image,{image:o,onClick:function(t){e.setMark({id:a.id,type:"source",coordinate:[t.evt.offsetX/i,t.evt.offsetY/i]})},onContextMenu:function(t){t.evt.preventDefault(),e.setMark({id:a.id,type:"lens",coordinate:[t.evt.offsetX/i,t.evt.offsetY/i]})}})}),Object(n.jsxs)(it.Layer,{children:[a.source&&a.source.map((function(e,t){var a=Object(u.a)(e,2),c=a[0],r=a[1];return Object(n.jsx)(it.Circle,{x:i*c,y:i*r,radius:i/20,stroke:"red"},t)})),a.lens&&2===a.lens.length&&Object(n.jsx)(it.Circle,{x:i*a.lens[0],y:i*a.lens[1],radius:i/20,stroke:"white"})]})]}),Object(n.jsx)(m.a,{style:{width:"100%"},size:"large",variant:"outlined",onClick:function(){return e.clearMarks({id:a.id})},children:"Clear"})]})})),dt=Object(b.a)((function(e){return{content:{display:"flex",flexDirection:"row",backgroundColor:e.palette.background.default,height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 3*").concat(e.spacing(3),"px)"),gap:"".concat(e.spacing(2),"px")},leftContainer:{display:"flex",flex:4,gap:"".concat(e.spacing(2),"px"),flexDirection:"column"},rightContainer:{display:"flex",flex:8,gap:"".concat(e.spacing(2),"px"),flexDirection:"column"},lensDataContainer:{overflowY:"auto"},metricContainer:{display:"flex",flex:4},imgListContainer:{flex:11,display:"flex",gap:"".concat(e.spacing(1),"px")},paper:{height:"100%",maxWidth:"100%",padding:e.spacing(3),gap:"".concat(e.spacing(1),"px")},img:{height:"100%",maxWidth:"100%",display:"block",marginLeft:"auto",marginRight:"auto"},button:{margin:e.spacing(1)}}}));var lt=Object($e.b)((function(e){return{selectedBatch:Te(e),cursor:e.data.cursor,candidates:e.data.candidates,counts:e.data.counts}}),{fetchCands:Me,fetchCursor:_e,fetchCounts:Fe,setCursor:Ae.actions.setCursor,updateCandidate:Ae.actions.updateCandidate,setGrade:Re,progressCursor:Ae.actions.progressCursor,setComment:Ge})((function(e){var t=dt(),a=e.selectedBatch,c=e.fetchCands,s=e.fetchCursor,i=e.fetchCounts,o=e.cursor,d=e.setCursor,l=e.progressCursor,j=e.candidates,h=e.setGrade,b=e.counts,p=e.setComment,f=r.a.useState(""),x=Object(u.a)(f,2),O=x[0],v=x[1],y=r.a.useState(!1),w=Object(u.a)(y,2),C=w[0],k=w[1];r.a.useEffect((function(){s(),i()}),[a.id,i,s]);var S=j[o];return r.a.useEffect((function(){S&&v(S.comment)}),[S]),Object(n.jsxs)("div",{className:t.content,onKeyPress:function(e){["1","2","3","4","5"].includes(e.key)?h({id:S.id,grade:parseInt(e.key)}):"b"===e.key?l({forward:!1}):"n"===e.key&&l({forward:!0})},tabIndex:"0",children:[Object(n.jsxs)("div",{className:t.leftContainer,children:[Object(n.jsx)("div",{className:t.lensDataContainer,children:Object(n.jsxs)(X.a,{className:t.paper,style:{height:"auto"},children:[Object(n.jsx)(g.a,{variant:"h6",children:"Lens Data"}),S?Object(n.jsx)(de,{candidate:S}):Object(n.jsx)(g.a,{children:"Loading..."})]})}),Object(n.jsx)("div",{className:t.metricContainer,children:Object(n.jsx)(Ze,{batch:a,counts:b})})]}),Object(n.jsxs)("div",{className:t.rightContainer,children:[Object(n.jsxs)("div",{className:t.imgListContainer,children:[Object(n.jsx)("div",{style:{flex:9},children:Object(n.jsx)(X.a,{className:t.paper,children:S?Object(n.jsx)(ot,{current:S,width:500,height:500}):Object(n.jsx)(g.a,{children:"Loading..."})})}),Object(n.jsx)("div",{style:{flex:3},children:Object(n.jsx)(rt,{candidates:j,batch:a,loadCands:c,cursor:o,setCursor:d,nextUngraded:s})})]}),Object(n.jsx)("div",{children:Object(n.jsxs)(X.a,{className:t.paper,style:{display:"flex"},children:[Object(n.jsx)(z.a,{label:"Comments",multiline:!0,fullWidth:!0,value:O,onKeyPressCapture:function(e){return e.stopPropagation()},onChange:function(e){v(e.target.value),e.stopPropagation()}}),Object(n.jsx)(m.a,{variant:"contained",color:"primary",className:t.button,onClick:function(){p({id:S.id,comment:O})},endIcon:Object(n.jsx)(Q.a,{}),children:"Comment"}),Object(n.jsx)($.a,{open:C,autoHideDuration:2e3,onClose:function(){return k(!1)},children:Object(n.jsx)(st.a,{elevation:6,variant:"filled",onClose:function(){return k(!1)},severity:"success",children:"Comment submitted!"})})]})})]})]})})),ut=240,jt=Object(b.a)((function(e){return{root:{display:"flex",width:"100%"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(ut,"px)"),marginLeft:ut,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:ut,flexShrink:0},drawerPaper:{width:ut},drawerHeader:Object(j.a)(Object(j.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0}}}));var ht=Object($e.b)((function(e){return{selectedBatch:Te(e),batches:e.data.batches,userId:e.auth.userId,selectedBatchId:e.data.selectedBatchId}}),{fetchBatches:Ue,logout:De,selectBatch:Ae.actions.selectBatch,login:Ne})((function(e){var t=jt(),a=Object(p.a)(),c=r.a.useState(!0),s=Object(u.a)(c,2),i=s[0],o=s[1],d=r.a.useState(!1),j=Object(u.a)(d,2),b=j[0],B=j[1],N=e.selectedBatch,U=e.fetchBatches,M=e.logout,R=e.batches,G=e.userId,P=e.selectBatch,E=e.login,z=e.selectedBatchId;return r.a.useEffect((function(){U()}),[U]),Object(n.jsxs)("div",{className:t.root,children:[Object(n.jsx)(A,{open:!Boolean(G),onLogin:E}),Object(n.jsx)(V,{uploadOpen:b,handleClose:function(){B(!1),U()}}),Object(n.jsx)(f.a,{position:"fixed",className:Object(h.a)(t.appBar,Object(l.a)({},t.appBarShift,i)),children:Object(n.jsxs)(x.a,{children:[Object(n.jsx)(O.a,{color:"inherit","aria-label":"open drawer",onClick:function(){return o(!0)},edge:"start",className:Object(h.a)(t.menuButton,i&&t.hide),children:Object(n.jsx)(L.a,{})}),Object(n.jsxs)(g.a,{variant:"h6",style:{flexGrow:1},children:["Logged in user: ",G]}),G&&Object(n.jsx)(m.a,{color:"inherit",variant:"outlined",onClick:M,children:"Logout"})]})}),Object(n.jsxs)(v.a,{className:t.drawer,variant:"persistent",anchor:"left",open:i,classes:{paper:t.drawerPaper},children:[Object(n.jsxs)("div",{className:t.drawerHeader,children:[Object(n.jsx)(g.a,{variant:"body1",children:"Collapse"}),Object(n.jsx)(O.a,{onClick:function(){return o(!1)},children:"ltr"===a.direction?Object(n.jsx)(D.a,{}):Object(n.jsx)(_.a,{})})]}),Object(n.jsx)(y.a,{}),Object(n.jsx)(w.a,{children:Object(n.jsxs)(C.a,{button:!0,onClick:function(){return B(!0)},children:[Object(n.jsx)(k.a,{children:Object(n.jsx)(F.a,{})}),Object(n.jsx)(S.a,{primary:"Upload"})]})}),Object(n.jsx)(y.a,{}),Object(n.jsx)(w.a,{subheader:Object(n.jsx)(I.a,{children:"Batches"}),children:Object.values(R).map((function(e){return Object(n.jsx)(C.a,{button:!0,onClick:function(){P({batchId:e.id})},selected:z===e.id,children:Object(n.jsx)(S.a,{primary:e.name,secondary:Object(n.jsxs)(n.Fragment,{children:["Count: ",e.n_cands," ",Object(n.jsx)("br",{}),"Created: ",new Date(Date.parse(e.upload_time)).toLocaleString("en-GB")]})})},e.id)}))})]}),Object(n.jsxs)("main",{className:Object(h.a)(t.content,Object(l.a)({},t.contentShift,i)),children:[Object(n.jsx)("div",{className:t.drawerHeader}),N&&G?Object(n.jsx)(lt,{}):Object(n.jsx)(g.a,{children:"Select a batch to grade"})]})]})})),bt=a(129);function pt(){return Object(n.jsx)(o.a,{children:Object(n.jsx)($e.a,{store:Ve,children:Object(n.jsxs)(bt.a,{loading:null,persistor:Xe,children:[Object(n.jsx)(d.a,{}),Object(n.jsx)(ht,{})]})})})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(n.jsx)(pt,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[220,1,2]]]);
//# sourceMappingURL=main.0936512d.chunk.js.map