window.__require=function t(e,n,o){function a(i,s){if(!n[i]){if(!e[i]){var c=i.split("/");if(c=c[c.length-1],!e[c]){var u="function"==typeof __require&&__require;if(!s&&u)return u(c,!0);if(r)return r(c,!0);throw new Error("Cannot find module '"+i+"'")}}var f=n[i]={exports:{}};e[i][0].call(f.exports,function(t){return a(e[i][1][t]||t)},f,f.exports,t,e,n,o)}return n[i].exports}for(var r="function"==typeof __require&&__require,i=0;i<o.length;i++)a(o[i]);return a}({demo:[function(t,e,n){"use strict";cc._RF.push(e,"280c3rsZJJKnZ9RqbALVwtK","demo"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},start:function(){sdk.WeChatLogin({loginImg:"https://laixiao.github.io/lewan/html/img/btn_start.png",imgWidth:382,imgHeight:164},function(t){t&&console.log(t)})},update:function(t){}}),cc._RF.pop()},{}],md5:[function(t,e,n){"use strict";cc._RF.push(e,"0c39bEaYpFJxIYggw60YdWn","md5");var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};(function(t){function n(t,e){var n=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(n>>16)<<16|65535&n}function a(t,e,o,a,r,i){return n(function(t,e){return t<<e|t>>>32-e}(n(n(e,t),n(a,i)),r),o)}function r(t,e,n,o,r,i,s){return a(e&n|~e&o,t,e,r,i,s)}function i(t,e,n,o,r,i,s){return a(e&o|n&~o,t,e,r,i,s)}function s(t,e,n,o,r,i,s){return a(e^n^o,t,e,r,i,s)}function c(t,e,n,o,r,i,s){return a(n^(e|~o),t,e,r,i,s)}function u(t,e){var o,a,u,f,l;t[e>>5]|=128<<e%32,t[14+(e+64>>>9<<4)]=e;var p=1732584193,h=-271733879,g=-1732584194,d=271733878;for(o=0;o<t.length;o+=16)a=p,u=h,f=g,l=d,h=c(h=c(h=c(h=c(h=s(h=s(h=s(h=s(h=i(h=i(h=i(h=i(h=r(h=r(h=r(h=r(h,g=r(g,d=r(d,p=r(p,h,g,d,t[o],7,-680876936),h,g,t[o+1],12,-389564586),p,h,t[o+2],17,606105819),d,p,t[o+3],22,-1044525330),g=r(g,d=r(d,p=r(p,h,g,d,t[o+4],7,-176418897),h,g,t[o+5],12,1200080426),p,h,t[o+6],17,-1473231341),d,p,t[o+7],22,-45705983),g=r(g,d=r(d,p=r(p,h,g,d,t[o+8],7,1770035416),h,g,t[o+9],12,-1958414417),p,h,t[o+10],17,-42063),d,p,t[o+11],22,-1990404162),g=r(g,d=r(d,p=r(p,h,g,d,t[o+12],7,1804603682),h,g,t[o+13],12,-40341101),p,h,t[o+14],17,-1502002290),d,p,t[o+15],22,1236535329),g=i(g,d=i(d,p=i(p,h,g,d,t[o+1],5,-165796510),h,g,t[o+6],9,-1069501632),p,h,t[o+11],14,643717713),d,p,t[o],20,-373897302),g=i(g,d=i(d,p=i(p,h,g,d,t[o+5],5,-701558691),h,g,t[o+10],9,38016083),p,h,t[o+15],14,-660478335),d,p,t[o+4],20,-405537848),g=i(g,d=i(d,p=i(p,h,g,d,t[o+9],5,568446438),h,g,t[o+14],9,-1019803690),p,h,t[o+3],14,-187363961),d,p,t[o+8],20,1163531501),g=i(g,d=i(d,p=i(p,h,g,d,t[o+13],5,-1444681467),h,g,t[o+2],9,-51403784),p,h,t[o+7],14,1735328473),d,p,t[o+12],20,-1926607734),g=s(g,d=s(d,p=s(p,h,g,d,t[o+5],4,-378558),h,g,t[o+8],11,-2022574463),p,h,t[o+11],16,1839030562),d,p,t[o+14],23,-35309556),g=s(g,d=s(d,p=s(p,h,g,d,t[o+1],4,-1530992060),h,g,t[o+4],11,1272893353),p,h,t[o+7],16,-155497632),d,p,t[o+10],23,-1094730640),g=s(g,d=s(d,p=s(p,h,g,d,t[o+13],4,681279174),h,g,t[o],11,-358537222),p,h,t[o+3],16,-722521979),d,p,t[o+6],23,76029189),g=s(g,d=s(d,p=s(p,h,g,d,t[o+9],4,-640364487),h,g,t[o+12],11,-421815835),p,h,t[o+15],16,530742520),d,p,t[o+2],23,-995338651),g=c(g,d=c(d,p=c(p,h,g,d,t[o],6,-198630844),h,g,t[o+7],10,1126891415),p,h,t[o+14],15,-1416354905),d,p,t[o+5],21,-57434055),g=c(g,d=c(d,p=c(p,h,g,d,t[o+12],6,1700485571),h,g,t[o+3],10,-1894986606),p,h,t[o+10],15,-1051523),d,p,t[o+1],21,-2054922799),g=c(g,d=c(d,p=c(p,h,g,d,t[o+8],6,1873313359),h,g,t[o+15],10,-30611744),p,h,t[o+6],15,-1560198380),d,p,t[o+13],21,1309151649),g=c(g,d=c(d,p=c(p,h,g,d,t[o+4],6,-145523070),h,g,t[o+11],10,-1120210379),p,h,t[o+2],15,718787259),d,p,t[o+9],21,-343485551),p=n(p,a),h=n(h,u),g=n(g,f),d=n(d,l);return[p,h,g,d]}function f(t){var e,n="",o=32*t.length;for(e=0;e<o;e+=8)n+=String.fromCharCode(t[e>>5]>>>e%32&255);return n}function l(t){var e,n=[];for(n[(t.length>>2)-1]=void 0,e=0;e<n.length;e+=1)n[e]=0;var o=8*t.length;for(e=0;e<o;e+=8)n[e>>5]|=(255&t.charCodeAt(e/8))<<e%32;return n}function p(t){var e,n,o="";for(n=0;n<t.length;n+=1)e=t.charCodeAt(n),o+="0123456789abcdef".charAt(e>>>4&15)+"0123456789abcdef".charAt(15&e);return o}function h(t){return unescape(encodeURIComponent(t))}function g(t){return function(t){return f(u(l(t),8*t.length))}(h(t))}function d(t,e){return function(t,e){var n,o,a=l(t),r=[],i=[];for(r[15]=i[15]=void 0,a.length>16&&(a=u(a,8*t.length)),n=0;n<16;n+=1)r[n]=909522486^a[n],i[n]=1549556828^a[n];return o=u(r.concat(l(e)),512+8*e.length),f(u(i.concat(o),640))}(h(t),h(e))}function m(t,e,n){return e?n?d(e,t):function(t,e){return p(d(t,e))}(e,t):n?g(t):function(t){return p(g(t))}(t)}"function"==typeof define&&define.amd?define(function(){return m}):"object"===(void 0===e?"undefined":o(e))&&e.exports?e.exports=m:t.md5=m})(void 0),cc._RF.pop()},{}],mta:[function(t,e,n){"use strict";cc._RF.push(e,"0cb05xIPfZPVoI58Prt1Zt6","mta");var o={app_id:"",event_id:"",api_base:"https://pingtas.qq.com/pingd",prefix:"_mta_",version:"1.3.5",stat_share_app:!1,stat_pull_down_fresh:!1,stat_reach_bottom:!1};function a(){try{var t="s"+r();return wx.setStorageSync(o.prefix+"ssid",t),t}catch(t){}}function r(t){for(var e=[0,1,2,3,4,5,6,7,8,9],n=10;1<n;n--){var o=Math.floor(10*Math.random()),a=e[o];e[o]=e[n-1],e[n-1]=a}for(n=o=0;5>n;n++)o=10*o+e[n];return(t||"")+(o+"")+ +new Date}function i(){var t={dm:"wechat.apps.xx",url:function(){try{var t=getCurrentPages(),e="/";return 0<t.length&&(e=t.pop().__route__),e}catch(t){console.log("get current page path error:"+t)}}(),pvi:"",si:"",ty:0};return t.pvi=function(){var e=function(){try{return wx.getStorageSync(o.prefix+"auid")}catch(t){}}();return e||(e=function(){try{var t=r();return wx.setStorageSync(o.prefix+"auid",t),t}catch(t){}}(),t.ty=1),e}(),t.si=function(){var t=function(){try{return wx.getStorageSync(o.prefix+"ssid")}catch(t){}}();return t||(t=a()),t}(),t}function s(){var t=function(){var t=wx.getSystemInfoSync();return{adt:encodeURIComponent(t.model),scl:t.pixelRatio,scr:t.windowWidth+"x"+t.windowHeight,lg:t.language,fl:t.version,jv:encodeURIComponent(t.system),tz:encodeURIComponent(t.platform)}}();return function(t){wx.getNetworkType({success:function(e){t(e.networkType)}})}(function(t){try{wx.setStorageSync(o.prefix+"ntdata",t)}catch(t){}}),t.ct=wx.getStorageSync(o.prefix+"ntdata")||"4g",t}function c(){var t,e=u.Data.userInfo,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(t+"="+e[t]);return e=n.join(";"),{r2:o.app_id,r4:"wx",ext:"v="+o.version+(null!==e&&""!==e?";ui="+encodeURIComponent(e):"")}}var u={App:{init:function(t){"appID"in t&&(o.app_id=t.appID),"eventID"in t&&(o.event_id=t.eventID),"statShareApp"in t&&(o.stat_share_app=t.statShareApp),"statPullDownFresh"in t&&(o.stat_pull_down_fresh=t.statPullDownFresh),"statReachBottom"in t&&(o.stat_reach_bottom=t.statReachBottom),a(),"lauchOpts"in t&&(u.Data.lanchInfo=t.lauchOpts,u.Data.lanchInfo.landing=1)}},Page:{init:function(){var t=getCurrentPages()[getCurrentPages().length-1];t.onShow&&function(){var e=t.onShow;t.onShow=function(){u.Page.stat(),e.call(this,arguments)}}(),o.stat_pull_down_fresh&&t.onPullDownRefresh&&function(){var e=t.onPullDownRefresh;t.onPullDownRefresh=function(){u.Event.stat(o.prefix+"pulldownfresh",{url:t.__route__}),e.call(this,arguments)}}(),o.stat_reach_bottom&&t.onReachBottom&&function(){var e=t.onReachBottom;t.onReachBottom=function(){u.Event.stat(o.prefix+"reachbottom",{url:t.__route__}),e.call(this,arguments)}}(),o.stat_share_app&&t.onShareAppMessage&&function(){var e=t.onShareAppMessage;t.onShareAppMessage=function(){return u.Event.stat(o.prefix+"shareapp",{url:t.__route__}),e.call(this,arguments)}}()},stat:function(){if(""!=o.app_id){var t=[],e=c(),n=[i(),e,s()];u.Data.lanchInfo&&(n.push({ht:u.Data.lanchInfo.scene,rdm:"/",rurl:u.Data.lanchInfo.path}),u.Data.lanchInfo.query&&u.Data.lanchInfo.query._mta_ref_id&&n.push({rarg:u.Data.lanchInfo.query._mta_ref_id}),1==u.Data.lanchInfo.landing&&(e.ext+=";lp=1",u.Data.lanchInfo.landing=0)),n.push({rand:+new Date}),e=0;for(var a=n.length;e<a;e++)for(var r in n[e])n[e].hasOwnProperty(r)&&t.push(r+"="+(void 0===n[e][r]?"":n[e][r]));wx.request({url:o.api_base+"?"+t.join("&").toLowerCase()})}}},Event:{stat:function(t,e){if(""!=o.event_id){var n=[],a=i(),r=c();a.dm="wxapps.click",a.url=t,r.r2=o.event_id;var u,f=void 0===e?{}:e,l=[];for(u in f)f.hasOwnProperty(u)&&l.push(encodeURIComponent(u)+"="+encodeURIComponent(f[u]));for(f=l.join(";"),r.r5=f,f=0,r=(a=[a,r,s(),{rand:+new Date}]).length;f<r;f++)for(var p in a[f])a[f].hasOwnProperty(p)&&n.push(p+"="+(void 0===a[f][p]?"":a[f][p]));wx.request({url:o.api_base+"?"+n.join("&").toLowerCase()})}}},Data:{userInfo:null,lanchInfo:null}};e.exports=u,cc._RF.pop()},{}],sdk:[function(t,e,n){"use strict";cc._RF.push(e,"ebc8fVr5HZDI6csAuYLjsGR","sdk");var o=t("md5"),a=t("mta"),r={md5:o,mta:a,ip:"https://game.zuiqiangyingyu.net",debug:!1,app_name:"",version:"",login:"http://mock.eolinker.com/RiwKeAE4fb4e33cce254aee8509dbdd47b3898870569465?uri=https://login.llewan.com/Login/common",init:function(t){t.debug&&(this.debug=t.debug),t.app_name&&(this.app_name=t.app_name),t.version&&(this.version=t.version),this.debug&&console.log("\u52c7\u5f80sdk\u521d\u59cb\u5316\u53c2\u6570\uff1a",t),this.checkUpdate()},Get:function(t,e,n){var o=this;for(var a in t+="?",e)t+=a+"="+e[a]+"&";var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState)if(r.status>=200&&r.status<400){var e=r.responseText;if(e){var a=JSON.parse(e);n(a)}else o.debug&&console.log("\u8fd4\u56de\u6570\u636e\u4e0d\u5b58\u5728",t),n(null)}else o.debug&&console.log("\u8bf7\u6c42\u5931\u8d25",t),n(null)},r.open("GET",t,!0),r.send()},Post:function(t,e,n){var o=this,a="";for(var r in e)a+=r+"="+e[r]+"&";var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState)if(i.status>=200&&i.status<400){var t=i.responseText;if(t){var e=JSON.parse(t);n(e)}else o.debug&&console.log("\u8fd4\u56de\u6570\u636e\u4e0d\u5b58\u5728"),n(null)}else o.debug&&console.log("\u8bf7\u6c42\u5931\u8d25",i),n(null)},i.open("POST",t,!0),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),i.send(a)},checkUpdate:function(){if(cc.sys.platform===cc.sys.WECHAT_GAME&&"function"==typeof wx.getUpdateManager){var t=wx.getUpdateManager();t.onCheckForUpdate(function(t){self.debug&&console.log("\u8bf7\u6c42\u5b8c\u65b0\u7248\u672c\u4fe1\u606f\u7684\u56de\u8c03",t.hasUpdate)}),t.onUpdateReady(function(){self.debug&&console.log("\u65b0\u7684\u7248\u672c\u5df2\u7ecf\u4e0b\u8f7d\u597d\uff0c\u8c03\u7528 applyUpdate \u5e94\u7528\u65b0\u7248\u672c\u5e76\u91cd\u542f"),t.applyUpdate()}),t.onUpdateFailed(function(){self.debug&&console.log("\u65b0\u7684\u7248\u672c\u4e0b\u8f7d\u5931\u8d25")})}},getConfig:function(t){var e=this;this.Get(this.ip+this.common,{app_name:this.app_name,version:this.version},function(n){n&&0==n.code?t(n.data):(e.debug&&console.log("\u64cd\u4f5c\u5931\u8d25",n),t(null))})},getShare:function(t){this.Get(this.ip+this.gameshare_list,{app_name:this.app_name},function(e){e&&0==e.code?t(e.data.list):(self.debug&&console.log("\u64cd\u4f5c\u5931\u8d25",e),t(null))})},getAdv:function(t){this.Get(this.ip+this.gameads,{app_name:this.app_name},function(e){e&&0==e.code?t(e.data.list):(self.debug&&console.log("\u64cd\u4f5c\u5931\u8d25",e),t(null))})},getShareByWeight:function(t,e){for(var n={},o=[],a=(Math.random(),0);a<t.length;a++)e==t[a].position&&(t[a].weight=parseInt(t[a].weight),o.push(t[a]));var r=[];for(a=0;a<o.length;a++)for(var i=0;i<o[a].weight;i++)r.push(a);var s=r[parseInt(Math.random()*r.length)];return o[s]?(n.title=o[s].title,n.imageUrl=o[s].image):(n.title="\u5c0f\u5c0f\u9c7c\u5858",n.imageUrl=""),-1!=n.title.indexOf("&nick")&&(n.title=n.title.replace(/&nick/g,this.getUser().nickname)),n},getAdvByWeight:function(t){for(var e=[],n=(Math.random(),0);n<t.length;n++)t[n].weight=parseInt(t[n].weight),e.push(t[n]);var o=[];for(n=0;n<e.length;n++)for(var a=0;a<e[n].weight;a++)o.push(n);return e[o[parseInt(Math.random()*o.length)]]},createImage:function(t,e){var n=wx.createImage();n.onload=function(){var e=new cc.Texture2D;e.initWithElement(n),e.handleLoadedTexture(),t.spriteFrame=new cc.SpriteFrame(e)},n.src=e},initmta:function(t){a.App.init(t)},setmta:function(t,e){cc.sys.platform===cc.sys.WECHAT_GAME&&a.Event.stat(t,{value:"true"})},setItem:function(t,e){cc.sys.localStorage.setItem(this.app_name+t,e)},getItem:function(t){return cc.sys.localStorage.getItem(this.app_name+t)},onMessage:function(t){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.onMessage(function(e){t(e)})},postMessage:function(t){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.postMessage({message:t})},setUserCloudStorage:function(t,e){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.setUserCloudStorage({KVDataList:t,success:function(t){e(t)},fail:function(t){e(t)}})},getUserCloudStorage:function(t,e){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.getUserCloudStorage({keyList:t,success:function(t){e(t)},fail:function(t){e(t)}})},getGroupCloudStorage:function(t,e,n){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.getGroupCloudStorage({shareTicket:t,keyList:e,success:function(t){n(t)},fail:function(t){n(t)}})},getFriendCloudStorage:function(t,e){cc.sys.platform===cc.sys.WECHAT_GAME&&wx.getFriendCloudStorage({keyList:t,success:function(t){e(t)},fail:function(t){e(t)}})},sortList:function(t,e,n){return t.sort(function(t,o){for(var a=0,r=t.KVDataList,i=0;i<r.length;i++)r[i].key==e&&(a=r[i].value);var s=0;r=o.KVDataList;for(i=0;i<r.length;i++)r[i].key==e&&(s=r[i].value);return n?parseInt(a)-parseInt(s):parseInt(s)-parseInt(a)}),t},getMyRank3:function(t,e){for(var n=[],o=0;o<t.length;o++)if(t.length<=3){t[o].avatarUrl==e.avatarUrl&&t[o].nickname==e.nickName&&(t[o].isSelf=!0),n=t;for(o=0;o<n.length;o++)n[o].rank=o}else if(t[o].avatarUrl==e.avatarUrl&&t[o].nickname==e.nickName){t[o].isSelf=!0,o==t.length-1?(t[o].rank=o,t[o-1].rank=o-1,t[o-2].rank=o-2,n.push(t[o-2]),n.push(t[o-1]),n.push(t[o])):0==o?(t[o].rank=o,t[o+1].rank=o+1,t[o+2].rank=o+2,n.push(t[o]),n.push(t[o+1]),n.push(t[o+2])):(t[o-1].rank=o-1,t[o].rank=o,t[o+1].rank=o+1,n.push(t[o-1]),n.push(t[o]),n.push(t[o+1]));break}return n},WeChatLogin:function(t,e){var n=this,o="https://laixiao.github.io/lewan/html/img/btn_start.png",a=191,r=r/2,i="",s="",c="";if(t.loginImg&&(o=t.loginImg),t.imgWidth&&(a=t.imgWidth),t.imgHeight&&(r=t.imgHeight),t.referee_id&&(i=t.referee_id),t.source_id&&(s=t.source_id),t.source_id2&&(c=t.source_id2),cc.sys.platform===cc.sys.WECHAT_GAME){var u=this.getItem("userinfo");u?e(JSON.parse(u)):n.button?n.button.show():wx.getSystemInfo({success:function(t){n.button=wx.createUserInfoButton({type:"image",image:o,style:{left:t.screenWidth/2-a/2,top:t.screenHeight/2-r/2,width:a,height:r}}),n.button.onTap(function(t){wx.showToast({title:"\u767b\u5f55\u4e2d...",icon:"loading",duration:8}),wx.getSetting({success:function(o){o.authSetting["scope.userInfo"]?(console.log("===\u5df2\u7ecf\u6388\u6743==="),wx.login({success:function(o){var a={code:o.code,rawData:t.rawData,iv:t.iv,encryptedData:t.encryptedData,signature:t.signature,referee_id:i,source_id:s,source_id2:c};n.Post(n.login,a,function(t){1==t.c?(wx.hideToast(),n.setItem("user",t.d),n.button.hide(),e(t.d)):wx.showToast({title:"\u767b\u5f55\u5931\u8d25\u8bf7\u91cd\u8bd5"})})},fail:function(){wx.showToast({title:"\u767b\u5f55\u5931\u8d25\u8bf7\u91cd\u8bd5"}),e(!1)}})):e(!1)}})}),n.button.show()},fail:function(){e(!1)}})}}};window.sdk=r,cc._RF.pop()},{md5:"md5",mta:"mta"}]},{},["demo","md5","mta","sdk"]);