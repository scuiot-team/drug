"use strict";(self.webpackJsonp=self.webpackJsonp||[]).push([[738],{"6349":function(t,e,a){a.d(e,{"By":function(){return o},"Fo":function(){return r},"N$":function(){return getUntokenDrugs},"nQ":function(){return l},"ys":function(){return getFutureDrugs}});var i=a(885),n=a(3144),u=a(5671),r=(0,n.Z)((function DrugInfo(t,e,a,i,n){(0,u.Z)(this,DrugInfo),this.time=t,this.name=e,this.use=a,this.func=i,this.otc=n})),o=function(){return(0,n.Z)((function DrugData(t,e,a,i,n,r,o,l,d){(0,u.Z)(this,DrugData),this.id=t,this.drugName=e,this.dosage=a,this.form=i,this.dose=n,this.interval=r,this.time=o,this.startDate=l,this.stopDate=d}),null,[{"key":"findWithID","value":function findWithID(t,e){return t.find((function(t){return t.id===e}))}}])}(),l=function(){function DrugRecord(t,e,a,i,n,r,o,l){(0,u.Z)(this,DrugRecord),this.id=t,this.drugName=e,this.dosage=a,this.form=i,this.dose=n,this.date=r,this.time=o,this.skip=l,this.skip=!1}return(0,n.Z)(DrugRecord,null,[{"key":"getTime","value":function getTime(t){return new Date(t.date+"T"+t.time).getTime()}},{"key":"compareByDateTime","value":function compareByDateTime(t,e){var a=DrugRecord.getTime(t),i=DrugRecord.getTime(e);return a<i?-1:a>i?1:0}}])}();function getDHMS(t){var e=new Date(t);return[e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0"),String(e.getHours()).padStart(2,"0"),String(e.getMinutes()).padStart(2,"0"),String(e.getSeconds()).padStart(2,"0")]}function toStamp(t){var e=t.split(":"),a=(0,i.Z)(e,3),n=a[0],u=a[1],r=a[2];return 1e3*(3600*Number(n)+60*Number(u)+Number(r))}function toTimeStamp(t,e){return new Date(t+"T"+e).getTime()}function getUntokenDrugs(t,e){var a=(new Date).getTime(),n=[],u=[],r={};return e.forEach((function(t){r[t.id]||(r[t.id]=[]),r[t.id].push(t)})),t.forEach((function(t){var e=toTimeStamp(t.startDate,t.time),o=toTimeStamp(t.stopDate,"24:00:00"),d=toStamp(t.interval);if(e<=a&&a<=o){var c=e;if(r[t.id]){var s=r[t.id].slice(-1)[0];c=toTimeStamp(s.date,s.time)}for(;c<=a;){var m=getDHMS(c+=d),g=(0,i.Z)(m,4),h=g[0],v=g[1],f=g[2],p=g[3];n.push(new l(t.id,t.drugName,t.dosage,t.form,t.dose,h,"".concat(v,":").concat(f,":").concat(p),!1))}var D=n.pop();null!=D&&u.push(D)}})),n.sort(l.compareByDateTime),u.sort(l.compareByDateTime),[n,u[0]]}function getFutureDrugs(t,e,a,n){var u=[],r={};return e.forEach((function(t){r[t.id]||(r[t.id]=[]),r[t.id].push(t)})),t.forEach((function(t){var e=toTimeStamp(t.startDate,t.time),o=toTimeStamp(t.stopDate,"24:00:00"),d=toStamp(t.interval);if(e<=a&&a<=o){var c=e;if(r[t.id]){var s=r[t.id].slice(-1)[0];c=toTimeStamp(s.date,s.time)}var m=Math.ceil((a-c)/d);if(m>0)for(var g=c+m*d;g<=n;){var h=getDHMS(g),v=(0,i.Z)(h,4),f=v[0],p=v[1],D=v[2],S=v[3];u.push(new l(t.id,t.drugName,t.dosage,t.form,t.dose,f,"".concat(p,":").concat(D,":").concat(S),!1)),g+=d}}})),u.sort(l.compareByDateTime),u}},"9830":function(t,e,a){a.d(e,{"p":function(){return setGlobalData},"r":function(){return getGlobalData}});var i=a(2667),n=a(6349),u={"box_id":"","MQTTurl":"i7148e41.ala.us-east-1.emqxsl.com","tabList":[{"url":"/pages/homePage/home","title":"首页","iconType":"home"},{"url":"/pages/statisticsPage/statistics","title":"统计","iconType":"bullet-list"},{"url":"/pages/chatPage/chat","title":"问AI","iconType":"message"},{"url":"/pages/selfPage/self","title":"我的","iconType":"user","max":99}],"userInfo":{"isLogin":!0,"account":"","password":"","avatar":"https://img2.baidu.com/it/u=18303046,1217185652&fm=253&fmt=auto&app=138&f=JPEG?w=502&h=500","nickName":"小马哥","urgentPhone":""},"patients":[new i.Z("小明",66,"男","19434636375","https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280","子女","高血压","否","暂无","良好",170,60,100,99,100,70,"胰岛素增敏剂"),new i.Z("老明",90,"男","19436563675","https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280","子孙","糖尿病","否","暂无","良好",162,52,100,99,100,73,"胰岛素增敏剂")],"drugStock":[new n.Fo("1721804283","毛果芸香碱滴眼液","一次1滴，一日1～4次","慢性青光眼、闭角型青光眼",!1),new n.Fo("1721804283","布洛芬胶囊","一次1粒，一日3～4次","缓解类风湿关节炎和骨关节炎、解热镇痛",!0)],"drugRecord":[new n.nQ("1720656002","毛果芸香碱","1","滴","滴眼","2024-08-13","00:00:00",!1),new n.nQ("1720656001","山莨菪碱","2","片","口服","2024-08-13","02:30:00",!1),new n.nQ("1720656003","阿托品","2","片","口服","2024-08-13","06:30:00",!1),new n.nQ("1720656000","阿司匹林","1","片","口服","2024-08-13","08:00:00",!1),new n.nQ("1720656004","胰岛素","1","滴","静脉注射","2024-08-13","08:00:00",!1)],"drugs":[new n.By("1720656000","阿司匹林","1","片","口服","12:00:00","08:00:00","2024-07-20","2024-10-10"),new n.By("1720656001","山莨菪碱","2","片","口服","10:30:00","10:00:00","2024-07-19","2024-10-10"),new n.By("1720656002","毛果芸香碱","1","滴","滴眼","16:00:00","08:00:00","2024-07-18","2024-10-10"),new n.By("1720656003","阿托品","2","片","口服","13:30:00","08:00:00","2024-07-21","2024-10-10"),new n.By("1720656004","胰岛素","1","滴","静脉注射","24:00:00","08:00:00","2024-07-19","2024-10-10")],"healthIndicators":{"heightData":[{"date":"2024-10-01","time":"08:00:00","value":170}],"bloodPressureData":[{"date":"2024-10-01","time":"08:00:00","high":110,"low":80},{"date":"2024-10-02","time":"08:00:00","high":112,"low":80},{"date":"2024-10-03","time":"08:00:00","high":115,"low":82},{"date":"2024-10-04","time":"08:00:00","high":113,"low":81},{"date":"2024-10-05","time":"08:00:00","high":110,"low":79},{"date":"2024-10-06","time":"08:00:00","high":108,"low":75},{"date":"2024-10-07","time":"08:00:00","high":109,"low":73},{"date":"2024-10-08","time":"08:00:00","high":110,"low":72},{"date":"2024-10-09","time":"08:00:00","high":111,"low":70},{"date":"2024-10-10","time":"08:00:00","high":112,"low":71}],"weightData":[{"date":"2024-10-01","time":"08:00:00","value":65},{"date":"2024-10-02","time":"08:00:00","value":64},{"date":"2024-10-03","time":"08:00:00","value":65},{"date":"2024-10-04","time":"08:00:00","value":64},{"date":"2024-10-05","time":"08:00:00","value":65},{"date":"2024-10-06","time":"08:00:00","value":65},{"date":"2024-10-07","time":"08:00:00","value":66},{"date":"2024-10-08","time":"08:00:00","value":67},{"date":"2024-10-09","time":"08:00:00","value":68},{"date":"2024-10-10","time":"08:00:00","value":69},{"date":"2024-10-11","time":"08:00:00","value":69},{"date":"2024-10-12","time":"08:00:00","value":68},{"date":"2024-10-13","time":"08:00:00","value":68}],"heartRateData":[{"date":"2024-10-01","time":"08:00:00","value":70},{"date":"2024-10-02","time":"08:00:00","value":69},{"date":"2024-10-03","time":"08:00:00","value":70},{"date":"2024-10-04","time":"08:00:00","value":71},{"date":"2024-10-05","time":"08:00:00","value":70},{"date":"2024-10-06","time":"08:00:00","value":70},{"date":"2024-10-07","time":"08:00:00","value":69},{"date":"2024-10-08","time":"08:00:00","value":70},{"date":"2024-10-09","time":"08:00:00","value":71},{"date":"2024-10-10","time":"08:00:00","value":72},{"date":"2024-10-11","time":"08:00:00","value":73},{"date":"2024-10-12","time":"08:00:00","value":74},{"date":"2024-10-13","time":"08:00:00","value":72}],"bloodOxygenData":[{"date":"2024-10-01","time":"08:00:00","value":98},{"date":"2024-10-02","time":"08:00:00","value":98},{"date":"2024-10-03","time":"08:00:00","value":99},{"date":"2024-10-04","time":"08:00:00","value":98},{"date":"2024-10-05","time":"08:00:00","value":98},{"date":"2024-10-06","time":"08:00:00","value":99},{"date":"2024-10-07","time":"08:00:00","value":98},{"date":"2024-10-08","time":"08:00:00","value":98},{"date":"2024-10-09","time":"08:00:00","value":99},{"date":"2024-10-10","time":"08:00:00","value":98},{"date":"2024-10-11","time":"08:00:00","value":98},{"date":"2024-10-12","time":"08:00:00","value":97},{"date":"2024-10-13","time":"08:00:00","value":98}],"bloodGlucoseData":[{"date":"2024-10-01","time":"08:00:00","value":6.5},{"date":"2024-10-02","time":"08:00:00","value":6.4},{"date":"2024-10-03","time":"08:00:00","value":6.3},{"date":"2024-10-04","time":"08:00:00","value":6.4},{"date":"2024-10-05","time":"08:00:00","value":6.4},{"date":"2024-10-06","time":"08:00:00","value":6.5},{"date":"2024-10-07","time":"08:00:00","value":6.6},{"date":"2024-10-08","time":"08:00:00","value":6.7},{"date":"2024-10-09","time":"08:00:00","value":6.7},{"date":"2024-10-10","time":"08:00:00","value":6.7},{"date":"2024-10-11","time":"08:00:00","value":6.9},{"date":"2024-10-12","time":"08:00:00","value":6.8},{"date":"2024-10-13","time":"08:00:00","value":6.8}]}};function setGlobalData(t,e){u[t]=e}function getGlobalData(t){return u[t]}},"6898":function(t,e,a){a.d(e,{"$M":function(){return genRandStr},"MR":function(){return switchTab},"Td":function(){return getCurrTime},"V5":function(){return getCurrDate},"_3":function(){return getDate},"hK":function(){return getTime}});var i=a(7945),n=a(9830);function getTime(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=new Date(t),i=String(a.getHours()).padStart(2,"0"),n=String(a.getMinutes()).padStart(2,"0"),u=String(a.getSeconds()).padStart(2,"0");return e?"".concat(i,":").concat(n,":").concat(u):"".concat(i,":").concat(n)}function getDate(t){var e=new Date(t);return e.getFullYear()+"-"+String(e.getMonth()+1).padStart(2,"0")+"-"+String(e.getDate()).padStart(2,"0")}function getCurrTime(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=new Date,a=String(e.getHours()).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0"),n=String(e.getSeconds()).padStart(2,"0");return t?"".concat(a,":").concat(i,":").concat(n):"".concat(a,":").concat(i)}function getCurrDate(){var t=new Date;return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")}function switchTab(t){var e=(0,n.r)("tabList");i.ZP.switchTab({"url":e[t].url})}function genRandStr(t){for(var e="",a=0;a<t;a++)e+=String.fromCharCode(Math.floor(26*Math.random())+97);return e}},"2667":function(t,e,a){a.d(e,{"Z":function(){return u}});var i=a(3144),n=a(5671),u=(0,i.Z)((function PatientInfo(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"男",i=arguments.length>3?arguments[3]:void 0,u=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"https://b0.bdstatic.com/0df6c8c7f109aa7b67e7cb15e6f8d025.jpg@h_1280",r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"其他",o=arguments.length>6?arguments[6]:void 0,l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"否",d=arguments.length>8?arguments[8]:void 0,c=arguments.length>9?arguments[9]:void 0,s=arguments.length>10?arguments[10]:void 0,m=arguments.length>11?arguments[11]:void 0,g=arguments.length>12?arguments[12]:void 0,h=arguments.length>13?arguments[13]:void 0,v=arguments.length>14?arguments[14]:void 0,f=arguments.length>15?arguments[15]:void 0,p=arguments.length>16?arguments[16]:void 0;(0,n.Z)(this,PatientInfo),this.name=t,this.age=e,this.gender=a,this.phone=i,this.avatar=u,this.relation=r,this.illness=o,this.liveAlone=l,this.eatingHabit=d,this.bodyHealth=c,this.height=s,this.weight=m,this.BP=g,this.BF=h,this.BG=v,this.HR=f,this.drug=p}))},"4738":function(t,e,a){a.r(e),a.d(e,{"default":function(){return m}});var i=a(6252),n=a(3577),u=a(2262),r=a(1963),o=a(8595),l=a(7945),d=a(9830),c=a(6898),s={"name":"addRecord2Page"};var m=Object.assign(s,{"setup":function setup(t){var e=(0,r.FN)().router.params;console.log(e);var a=decodeURIComponent(e.title),s=decodeURIComponent(e.name),m=(0,u.iH)("".concat((0,c.V5)(),"T").concat((0,c.Td)())),g=(0,u.iH)(),h=(0,u.iH)();function timeInput(t){console.log(t),m.value=t}function value1Input(t){console.log(t),g.value=t}function value2Input(t){console.log(t),h.value=t}function saveRecord(t){console.log("saveRecord"),console.log("get time:",m.value);var e=(0,u.iH)((0,d.r)("healthIndicators")),a=m.value.split(" ");e.value[s].push({"date":a[0],"time":a[1],"high":g.value,"low":h.value}),(0,o.CF)({"title":"保存成功","icon":"success","duration":1e3}),setTimeout((function(){l.ZP.navigateBack()}),500)}return function(t,e){var r=(0,i.up)("View"),o=(0,i.up)("AtInput"),l=(0,i.up)("AtForm"),d=(0,i.up)("AtButton");return(0,i.wg)(),(0,i.j4)(r,{"class":"root-addrecord2"},{"default":(0,i.w5)((function(){return[(0,i.Wm)(r,{"class":"headline"},{"default":(0,i.w5)((function(){return[(0,i.Uk)(" 添加"+(0,n.zw)((0,u.SU)(a))+"记录 ",1)]})),"_":1}),(0,i.Wm)(l,null,{"default":(0,i.w5)((function(){return[(0,i.Wm)(o,{"title":"时间","type":"text","placeholder":"时间","value":(0,u.SU)(m),"onChange":timeInput},null,8,["value"]),(0,i.Wm)(o,{"name":"value","title":"收缩压","type":"number","placeholder":"请输入收缩压值(大的那个)","value":(0,u.SU)(g),"onChange":value1Input},null,8,["value"]),(0,i.Wm)(o,{"name":"value","title":"舒张压","type":"number","placeholder":"请输入舒张压值(小的那个)","value":(0,u.SU)(h),"onChange":value2Input},null,8,["value"])]})),"_":1}),(0,i.Wm)(d,{"class":"save-btn","type":"primary","size":"normal","onClick":saveRecord},{"default":(0,i.w5)((function(){return[(0,i.Uk)(" 保存 ")]})),"_":1})]})),"_":1})}}})}}]);