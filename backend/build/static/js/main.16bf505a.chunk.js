(this["webpackJsonplens-viewer"]=this["webpackJsonplens-viewer"]||[]).push([[0],{145:function(e,t,a){},215:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a(0),r=a.n(c),s=a(15),i=a.n(s),o=(a(145),a(281)),d=a(278),l=a(30),u=a(22),j=a(31),h=a(4),b=a(258),p=a(27),x=a(273),f=a(274),O=a(266),m=a(60),g=a(218),v=a(284),y=a(271),C=a(256),w=a(272),k=a(275),I=a(276),B=a(277),S=a(121),L=a.n(S),N=a(122),D=a.n(N),M=a(123),_=a.n(M),F=a(124),U=a.n(F),R=a(249),G=a(252),E=a(253),P=a(254),z=a(279),W=a(257);function A(e){var t=e.open,a=e.onLogin,c=r.a.useState(""),s=Object(u.a)(c,2),i=s[0],o=s[1],d=r.a.useState(""),l=Object(u.a)(d,2),j=l[0],h=l[1],b=function(){0===i.trim().length?h("Enter a valid user ID"):a(i)};return Object(n.jsx)("div",{children:Object(n.jsxs)(R.a,{open:t,"aria-labelledby":"form-dialog-title",children:[Object(n.jsx)(G.a,{id:"form-dialog-title",children:"Log in"}),Object(n.jsxs)(E.a,{children:[Object(n.jsx)(P.a,{children:"Log in with a user id to save your batches"}),Object(n.jsx)(z.a,{autoFocus:!0,margin:"dense",id:"user_id",label:"User ID",type:"text",fullWidth:!0,value:i,onChange:function(e){return o(e.target.value)},error:Boolean(j),onKeyDown:function(e){13===e.keyCode&&b()},helperText:j})]}),Object(n.jsx)(W.a,{children:Object(n.jsx)(g.a,{onClick:b,color:"primary",children:"Login"})})]})})}var H=a(126),T=a(259),K=a(114),J=a.n(K).a.create({baseURL:"",withCredentials:!0}),Y=Object(b.a)((function(e){return{fileUpload:{backgroundColor:"#f1f1f1",padding:e.spacing(3)},buttonProgress:{position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12},wrapper:{position:"relative"}}}));function V(e){var t=Y(),a=e.uploadOpen,c=e.handleClose,s=r.a.useState(!1),i=Object(u.a)(s,2),o=i[0],d=i[1];return Object(n.jsx)(R.a,{open:a,onClose:c,children:Object(n.jsx)(H.a,{accept:".csv",children:function(e){var a=e.getRootProps,r=e.getInputProps,s=e.acceptedFiles;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(G.a,{children:"Upload batches"}),Object(n.jsx)(E.a,{children:Object(n.jsx)("div",{children:Object(n.jsxs)("div",Object(j.a)(Object(j.a)({},a({className:t.fileUpload})),{},{children:[Object(n.jsx)("input",Object(j.a)({},r())),s.length>0?s.map((function(e){return Object(n.jsxs)("li",{children:[e.path," - ",(e.size/1e6).toFixed(2)," Mb"]},e.path)})):Object(n.jsx)(m.a,{variant:"body2",children:"Click to upload your .csvs"})]}))})}),Object(n.jsxs)(W.a,{children:[Object(n.jsx)(g.a,{color:"primary",onClick:c,children:"Cancel"}),Object(n.jsxs)("div",{className:t.wrapper,children:[Object(n.jsx)(g.a,{color:"primary",disabled:o,onClick:function(){var e=new FormData;s.forEach((function(t){return e.append(t.name,t)})),d(!0),J.post("/upload-batches",e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}).then((function(){d(!1),c()})).catch((function(){d(!1)}))},children:"Upload"}),o&&Object(n.jsx)(T.a,{size:24,className:t.buttonProgress})]})]})]})}})})}var X=a(128),$=a(283),q=a(120),Q=a.n(q),Z=a(260),ee=a(261),te=a(262),ae=a(263),ne=a(264),ce=a(265),re=a(116),se=a.n(re),ie=a(115),oe=a.n(ie);function de(e){var t=e.candidate,a=r.a.useState(!1),c=Object(u.a)(a,2),s=c[0],i=c[1];return Object(n.jsx)(Z.a,{component:X.a,children:Object(n.jsxs)(ee.a,{size:"small",children:[Object(n.jsx)(te.a,{children:Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{children:Object(n.jsx)("b",{children:"Parameter"})}),Object(n.jsx)(ne.a,{children:Object(n.jsx)("b",{children:"Value"})})]})}),Object(n.jsxs)(ce.a,{children:[Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"RA"}),Object(n.jsx)(ne.a,{children:t.ra.toFixed(5)})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"DEC"}),Object(n.jsx)(ne.a,{children:t.dec.toFixed(5)})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"Grade"}),Object(n.jsx)(ne.a,{children:t.grade})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"URL"}),Object(n.jsx)(ne.a,{children:Object(n.jsx)("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:"Skyviewer"})})]}),Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:"Additional"}),Object(n.jsx)(ne.a,{children:Object(n.jsx)(O.a,{"aria-label":"expand row",size:"small",onClick:function(){return i(!s)},children:s?Object(n.jsx)(oe.a,{}):Object(n.jsx)(se.a,{})})})]}),s&&Object.entries(JSON.parse(t.additional)).map((function(e,t){var a=Object(u.a)(e,2),c=a[0],r=a[1];return Object(n.jsxs)(ae.a,{children:[Object(n.jsx)(ne.a,{component:"th",scope:"row",children:c}),Object(n.jsx)(ne.a,{children:r})]},t)}))]})]})})}var le=a(280),ue=a(267),je=a(268),he=a(269),be=a(270),pe=a(51),xe=a.n(pe);function fe(e){var t=e.open,a=e.handleClose;return Object(n.jsxs)(R.a,{open:t,onClose:a,children:[Object(n.jsx)(G.a,{children:"Settings"}),Object(n.jsxs)(E.a,{children:[Object(n.jsx)(P.a,{children:"More settings to come"}),Object(n.jsx)(g.a,{color:"secondary",children:"Delete"})]})]})}var Oe=Object(b.a)((function(e){return{paper:{padding:e.spacing(3),gap:"".concat(e.spacing(1),"px"),display:"flex",flexDirection:"column",justifyContent:"space-evenly",flex:1},container:{flex:1,display:"flex",flexDirection:"column"}}}));function me(e){var t=Oe(),a=e.batch,c=e.counts,s=r.a.useState(!1),i=Object(u.a)(s,2),o=i[0],d=i[1];return Object(n.jsxs)("div",{className:t.container,children:[Object(n.jsxs)(X.a,{className:t.paper,children:[Object(n.jsxs)(m.a,{variant:"h6",children:["Batch ",Object(n.jsx)("i",{children:a.name})," metrics"]}),Object(n.jsxs)(le.a,{display:"flex",alignItems:"center",children:[Object(n.jsx)(le.a,{minWidth:"125px",children:Object(n.jsx)(m.a,{variant:"body2",color:"textSecondary",children:"Grading progress: "})}),Object(n.jsx)(le.a,{width:"100%",mr:1,children:Object(n.jsx)(ue.a,{variant:"determinate",value:xe.a.sum(c)/a.n_cands*100})}),Object(n.jsx)(le.a,{children:Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:[xe.a.sum(c),"/",a.n_cands]})})]}),Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:["Marked A's: ",c[0]," (",(c[0]/a.n_cands*100).toFixed(2),"%)"]}),Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:["Marked B's: ",c[1]," (",(c[1]/a.n_cands*100).toFixed(2),"%)"]}),Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:["Marked C's: ",c[2]," (",(c[2]/a.n_cands*100).toFixed(2),"%)"]}),Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:["Marked D's: ",c[3]," (",(c[3]/a.n_cands*100).toFixed(2),"%)"]}),Object(n.jsxs)(m.a,{variant:"body2",color:"textSecondary",children:["Marked non-lens: ",c[4]," (",(c[4]/a.n_cands*100).toFixed(2),"%)"]}),Object(n.jsxs)(je.a,{color:"primary",children:[Object(n.jsx)(g.a,{style:{width:"100%"},startIcon:Object(n.jsx)(he.a,{}),onClick:function(){J.get("/export_batch",{params:{batch_id:a.id,timestamp:(new Date).getMilliseconds()},withCredentials:!0,responseType:"blob"}).then((function(e){var t=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=t,n.setAttribute("download","".concat(a.name,".csv")),document.body.appendChild(n),n.click()}))},children:"Export to CSV"}),Object(n.jsx)(g.a,{style:{width:"100%"},startIcon:Object(n.jsx)(be.a,{}),onClick:function(){return d(!0)},children:"Settings"})]})]}),Object(n.jsx)(fe,{open:o,handleClose:function(){return d(!1)}})]})}var ge=a(117),ve=a(118),ye=a(127),Ce=["Grade A","Grade B","Grade C","Grade D","Non lens"],we=Object(b.a)((function(e){return{card:{display:"flex",flexDirection:"row",padding:"".concat(e.spacing(1),"px"),paddingLeft:"".concat(e.spacing(2),"px"),alignItems:"center",justifyContent:"space-between"},container:{height:"100%",display:"flex",flexDirection:"column"}}}));function ke(e){var t=e.candidates,a=e.batch,c=e.loadCands,s=e.cursor,i=e.setCursor,o=e.nextUngraded,d=we(),l=r.a.createRef(),u=function(e){return Boolean(t[e])};return r.a.useEffect((function(){l.current&&s>=0&&l.current.scrollToItem(s,"center")}),[s]),Object(n.jsxs)(X.a,{className:d.container,children:[Object(n.jsx)(g.a,{style:{width:"100%",flex:0},onClick:o,children:"Next Ungraded"}),Object(n.jsx)(y.a,{}),Object(n.jsx)("div",{style:{flex:1},children:Object(n.jsx)(ge.a,{children:function(e){var r=e.height,o=e.width;return Object(n.jsx)(ve.a,{isItemLoaded:u,itemCount:a.n_cands,minimumBatchSize:20,loadMoreItems:function(e,t){return c({start:e,stop:t})},children:function(e){var c=e.onItemsRendered,j=e.ref;return Object(n.jsx)(ye.a,{height:r,width:o,itemSize:100,itemCount:a.n_cands,ref:function(e){e&&(j(e),l.current=e)},onItemsRendered:c,layout:"vertical",children:function(e){var a=e.index,c=e.style;return Object(n.jsxs)(w.a,{style:c,className:d.card,button:!0,selected:a===s,onClick:function(){return i({cursor:a})},children:[Object(n.jsx)("div",{children:u(a)?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)(m.a,{variant:"body1",children:["Cand #",t[a].order]}),Object(n.jsx)(m.a,{variant:"body1",style:{color:t[a].grade?"green":"red"},children:t[a].grade?Ce[t[a].grade-1]:"Ungraded"})]}):Object(n.jsx)(m.a,{variant:"body1",children:"Loading..."})}),u(a)&&Object(n.jsx)("img",{src:t[a].url,style:{height:"100%"},alt:"Lens preview"})]},a)}})}})}})})]})}var Ie,Be,Se=a(282),Le=a(42),Ne=a(18),De=a.n(Ne),Me=a(33),_e=a(24),Fe=a(25),Ue=a(37),Re=a(83),Ge=a.n(Re),Ee=Object(_e.b)("auth/login",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/login",{user_id:t});case 2:return n=e.sent,a.dispatch(ze()),e.abrupt("return",{userId:n.data.success?t:null});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Pe=Object(_e.b)("auth/logout",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.post("/logout");case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),ze=Object(_e.b)("data/fetchBatches",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J.get("/batches");case 2:return n=e.sent,e.abrupt("return",{batches:n.data.batches});case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),We=Object(_e.b)("data/fetchCursor",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.getState().data.selectedBatchId,e.next=3,J.get("/cursor",{params:{batch_id:n}});case 3:return c=e.sent,e.abrupt("return",{cursor:c.data.cursor});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ae=Object(_e.b)("data/fetchCandidates",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c,r,s;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.start,c=t.stop,console.log(n,c),r=a.getState().data.selectedBatchId,e.next=5,J.get("/candidates",{params:{start:n,stop:c,batch_id:r}});case 5:return s=e.sent,e.abrupt("return",{candidates:s.data.candidates});case 7:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),He=Object(_e.b)("data/fetchCounts",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.getState().data.selectedBatchId,e.next=3,J.get("/batch_stats",{params:{batch_id:n}});case 3:return c=e.sent,e.abrupt("return",{counts:c.data.counts});case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Te=Object(_e.b)("data/setGrade",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c,r,s;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.grade,r=Math.min(a.getState().data.cursor+1),a.dispatch($e.actions.setCursor({cursor:r})),e.next=5,J.post("/candidates",{id:n,grade:c});case 5:s=e.sent,a.dispatch($e.actions.setCounts({counts:s.data.counts})),a.dispatch($e.actions.updateCandidate({id:n,grade:c}));case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ke=Object(_e.b)("data/setComment",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.comment,e.next=3,J.post("/candidates",{id:n,comment:c});case 3:a.dispatch($e.actions.updateCandidate({id:n,comment:c}));case 4:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Je=Object(_e.b)("data/setMark",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c,r,s;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,c=t.type,r=t.coordinate,e.next=3,J.post("/mark",{id:n,type:c,coordinate:r});case 3:s=e.sent,a.dispatch($e.actions.updateCandidate(Object(j.a)({id:n},s.data.candidate)));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ye=Object(_e.b)("data/clearMarks",function(){var e=Object(Me.a)(De.a.mark((function e(t,a){var n,c;return De.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,J.delete("/mark",{data:{id:n}});case 3:c=e.sent,a.dispatch($e.actions.updateCandidate(Object(j.a)({id:n},c.data.candidate)));case 5:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()),Ve=Object(_e.d)({name:"auth",initialState:{userId:null},reducers:{},extraReducers:(Ie={},Object(l.a)(Ie,Ee.fulfilled,(function(e,t){e.userId=t.payload.userId})),Object(l.a)(Ie,Pe.pending,(function(e,t){e.userId=null})),Ie)}),Xe=Object(_e.c)(),$e=Object(_e.d)({name:"data",initialState:Xe.getInitialState({selectedBatchId:null,batches:{},cursor:null,counts:[0,0,0,0,0]}),reducers:{selectBatch:function(e,t){e.batchId!==t.payload.batchId&&(e.selectedBatchId=t.payload.batchId,e.cursor=null,e.candidates={},e.counts=[0,0,0,0,0])},updateCandidate:function(e,t){var a=xe.a.findKey(e.candidates,(function(e){return e.id===t.payload.id}));e.candidates[a]=Object(j.a)(Object(j.a)({},e.candidates[a]),t.payload)},setCursor:function(e,t){e.cursor=Math.min(Math.max(t.payload.cursor,0),e.batches[e.selectedBatchId].n_cands-1)},setCounts:function(e,t){e.counts=t.payload.counts},deleteBatch:function(e,t){e.batches=xe.a.omit(e.batches,[t.payload.batchId]),e.selectedBatchId=null}},extraReducers:(Be={},Object(l.a)(Be,ze.fulfilled,(function(e,t){e.batches=xe.a.keyBy(t.payload.batches,"id")||{}})),Object(l.a)(Be,We.fulfilled,(function(e,t){e.cursor=t.payload.cursor})),Object(l.a)(Be,Ae.fulfilled,(function(e,t){t.payload.candidates.forEach((function(t){e.candidates[t.order]=t}))})),Object(l.a)(Be,He.fulfilled,(function(e,t){e.counts=t.payload.counts})),Object(l.a)(Be,Pe.fulfilled,(function(e){return{selectedBatchId:null,batches:[],candidates:{},cursor:null,counts:[0,0,0,0,0]}})),Be)}),qe=function(e){return e.data.batches[e.data.selectedBatchId]},Qe={key:"auth",storage:Ge.a,blacklist:["candidates"]},Ze={key:"root",version:1,storage:Ge.a},et=Object(Fe.c)({auth:Ve.reducer,data:Object(Ue.g)(Qe,$e.reducer)}),tt=Object(Ue.g)(Ze,et),at=Object(_e.a)({reducer:tt,middleware:Object(_e.e)({serializableCheck:{ignoredActions:[Ue.a,Ue.f,Ue.b,Ue.c,Ue.d,Ue.e]}})}),nt=Object(Ue.h)(at),ct=a(52);var rt=Object(Le.b)(null,{clearMarks:Ye,setMark:Je})((function(e){var t=e.current,a=e.width,c=e.height,r=t.url,s=Math.min(a,c),i=new window.Image;return i.src=r,i.height=s,i.width=s,Object(n.jsxs)("div",{style:{height:"100%",display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(n.jsxs)(ct.Stage,{width:s,height:s,style:{display:"flex",justifyContent:"center",height:"100%",width:"100%",alignItems:"center"},children:[Object(n.jsx)(ct.Layer,{children:Object(n.jsx)(ct.Image,{image:i,onClick:function(a){e.setMark({id:t.id,type:"source",coordinate:[a.evt.offsetX/s,a.evt.offsetY/s]})},onContextMenu:function(a){a.evt.preventDefault(),e.setMark({id:t.id,type:"lens",coordinate:[a.evt.offsetX/s,a.evt.offsetY/s]})}})}),Object(n.jsxs)(ct.Layer,{children:[t.source&&t.source.map((function(e,t){var a=Object(u.a)(e,2),c=a[0],r=a[1];return Object(n.jsx)(ct.Circle,{x:s*c,y:s*r,radius:s/20,stroke:"red"},t)})),t.lens&&2===t.lens.length&&Object(n.jsx)(ct.Circle,{x:s*t.lens[0],y:s*t.lens[1],radius:s/20,stroke:"white"})]})]}),Object(n.jsx)(g.a,{style:{width:"100%"},size:"large",variant:"outlined",onClick:function(){return e.clearMarks({id:t.id})},children:"Clear"})]})})),st=Object(b.a)((function(e){return{content:{display:"flex",flexDirection:"row",backgroundColor:e.palette.background.default,height:"calc(100vh - ".concat(e.mixins.toolbar.minHeight,"px - 3*").concat(e.spacing(3),"px)"),gap:"".concat(e.spacing(2),"px")},leftContainer:{display:"flex",flex:4,gap:"".concat(e.spacing(2),"px"),flexDirection:"column"},rightContainer:{display:"flex",flex:8,gap:"".concat(e.spacing(2),"px"),flexDirection:"column"},lensDataContainer:{overflowY:"auto"},metricContainer:{display:"flex",flex:4},imgListContainer:{flex:11,display:"flex",gap:"".concat(e.spacing(1),"px")},paper:{height:"100%",maxWidth:"100%",padding:e.spacing(3),gap:"".concat(e.spacing(1),"px")},img:{height:"100%",maxWidth:"100%",display:"block",marginLeft:"auto",marginRight:"auto"},button:{margin:e.spacing(1)}}}));var it=Object(Le.b)((function(e){return{selectedBatch:qe(e),cursor:e.data.cursor,candidates:e.data.candidates,counts:e.data.counts}}),{fetchCands:Ae,fetchCursor:We,fetchCounts:He,setCursor:$e.actions.setCursor,updateCandidate:$e.actions.updateCandidate,setGrade:Te,setComment:Ke})((function(e){var t=st(),a=e.selectedBatch,c=e.fetchCands,s=e.fetchCursor,i=e.fetchCounts,o=e.cursor,d=e.setCursor,l=e.candidates,j=e.setGrade,h=e.counts,b=e.setComment,p=r.a.useState(""),x=Object(u.a)(p,2),f=x[0],O=x[1],v=r.a.useState(!1),y=Object(u.a)(v,2),C=y[0],w=y[1];r.a.useEffect((function(){s(),i()}),[a.id,i,s]);var k=l[o];return r.a.useEffect((function(){k&&O(k.comment)}),[k]),Object(n.jsxs)("div",{className:t.content,onKeyPress:function(e){["1","2","3","4","5"].includes(e.key)?j({id:k.id,grade:parseInt(e.key)}):"b"===e.key?d({cursor:o-1}):"n"===e.key&&d({cursor:o+1})},tabIndex:"0",children:[Object(n.jsxs)("div",{className:t.leftContainer,children:[Object(n.jsx)("div",{className:t.lensDataContainer,children:Object(n.jsxs)(X.a,{className:t.paper,style:{height:"auto"},children:[Object(n.jsx)(m.a,{variant:"h6",children:"Lens Data"}),k?Object(n.jsx)(de,{candidate:k}):Object(n.jsx)(m.a,{children:"Loading..."})]})}),Object(n.jsx)("div",{className:t.metricContainer,children:Object(n.jsx)(me,{batch:a,counts:h})})]}),Object(n.jsxs)("div",{className:t.rightContainer,children:[Object(n.jsxs)("div",{className:t.imgListContainer,children:[Object(n.jsx)("div",{style:{flex:9},children:Object(n.jsx)(X.a,{className:t.paper,children:k?Object(n.jsx)(rt,{current:k,width:500,height:500}):Object(n.jsx)(m.a,{children:"Loading..."})})}),Object(n.jsx)("div",{style:{flex:3},children:Object(n.jsx)(ke,{candidates:l,batch:a,loadCands:c,cursor:o,setCursor:d,nextUngraded:s})})]}),Object(n.jsx)("div",{children:Object(n.jsxs)(X.a,{className:t.paper,style:{display:"flex"},children:[Object(n.jsx)(z.a,{label:"Comments",multiline:!0,fullWidth:!0,value:f,onKeyPressCapture:function(e){return e.stopPropagation()},onChange:function(e){O(e.target.value),e.stopPropagation()}}),Object(n.jsx)(g.a,{variant:"contained",color:"primary",className:t.button,onClick:function(){b({id:k.id,comment:f})},endIcon:Object(n.jsx)(Q.a,{}),children:"Comment"}),Object(n.jsx)($.a,{open:C,autoHideDuration:2e3,onClose:function(){return w(!1)},children:Object(n.jsx)(Se.a,{elevation:6,variant:"filled",onClose:function(){return w(!1)},severity:"success",children:"Comment submitted!"})})]})})]})]})})),ot=240,dt=Object(b.a)((function(e){return{root:{display:"flex",width:"100%"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(ot,"px)"),marginLeft:ot,transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},hide:{display:"none"},drawer:{width:ot,flexShrink:0},drawerPaper:{width:ot},drawerHeader:Object(j.a)(Object(j.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-end"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginLeft:-240},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginLeft:0}}}));var lt=Object(Le.b)((function(e){return{selectedBatch:qe(e),batches:e.data.batches,userId:e.auth.userId,selectedBatchId:e.data.selectedBatchId}}),{fetchBatches:ze,logout:Pe,selectBatch:$e.actions.selectBatch,login:Ee})((function(e){var t=dt(),a=Object(p.a)(),c=r.a.useState(!0),s=Object(u.a)(c,2),i=s[0],o=s[1],d=r.a.useState(!1),j=Object(u.a)(d,2),b=j[0],S=j[1],N=e.selectedBatch,M=e.fetchBatches,F=e.logout,R=e.batches,G=e.userId,E=e.selectBatch,P=e.login,z=e.selectedBatchId;return r.a.useEffect((function(){M()}),[M]),Object(n.jsxs)("div",{className:t.root,children:[Object(n.jsx)(A,{open:!Boolean(G),onLogin:P}),Object(n.jsx)(V,{uploadOpen:b,handleClose:function(){S(!1),M()}}),Object(n.jsx)(x.a,{position:"fixed",className:Object(h.a)(t.appBar,Object(l.a)({},t.appBarShift,i)),children:Object(n.jsxs)(f.a,{children:[Object(n.jsx)(O.a,{color:"inherit","aria-label":"open drawer",onClick:function(){return o(!0)},edge:"start",className:Object(h.a)(t.menuButton,i&&t.hide),children:Object(n.jsx)(L.a,{})}),Object(n.jsxs)(m.a,{variant:"h6",style:{flexGrow:1},children:["Logged in user: ",G]}),G&&Object(n.jsx)(g.a,{color:"inherit",variant:"outlined",onClick:F,children:"Logout"})]})}),Object(n.jsxs)(v.a,{className:t.drawer,variant:"persistent",anchor:"left",open:i,classes:{paper:t.drawerPaper},children:[Object(n.jsxs)("div",{className:t.drawerHeader,children:[Object(n.jsx)(m.a,{variant:"body1",children:"Collapse"}),Object(n.jsx)(O.a,{onClick:function(){return o(!1)},children:"ltr"===a.direction?Object(n.jsx)(D.a,{}):Object(n.jsx)(_.a,{})})]}),Object(n.jsx)(y.a,{}),Object(n.jsx)(C.a,{children:Object(n.jsxs)(w.a,{button:!0,onClick:function(){return S(!0)},children:[Object(n.jsx)(k.a,{children:Object(n.jsx)(U.a,{})}),Object(n.jsx)(I.a,{primary:"Upload"})]})}),Object(n.jsx)(y.a,{}),Object(n.jsx)(C.a,{subheader:Object(n.jsx)(B.a,{children:"Batches"}),children:Object.values(R).map((function(e){return Object(n.jsx)(w.a,{button:!0,onClick:function(){E({batchId:e.id})},selected:z===e.id,children:Object(n.jsx)(I.a,{primary:e.name,secondary:Object(n.jsxs)(n.Fragment,{children:["Count: ",e.n_cands," ",Object(n.jsx)("br",{}),"Created: ",new Date(Date.parse(e.upload_time)).toLocaleString("en-GB")]})})},e.id)}))})]}),Object(n.jsxs)("main",{className:Object(h.a)(t.content,Object(l.a)({},t.contentShift,i)),children:[Object(n.jsx)("div",{className:t.drawerHeader}),N&&G?Object(n.jsx)(it,{}):Object(n.jsx)(m.a,{children:"Select a batch to grade"})]})]})})),ut=a(125);function jt(){return Object(n.jsx)(o.a,{children:Object(n.jsx)(Le.a,{store:at,children:Object(n.jsxs)(ut.a,{loading:null,persistor:nt,children:[Object(n.jsx)(d.a,{}),Object(n.jsx)(lt,{})]})})})}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(n.jsx)(jt,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[215,1,2]]]);
//# sourceMappingURL=main.16bf505a.chunk.js.map