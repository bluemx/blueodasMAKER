(()=>{var e={73124:(e,t,r)=>{"use strict";r(18964),r(40702);var o=r(61957),n=r(71947),a=r(60499),i=r(59835);function s(e,t,r,o,n,a){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}const l=(0,i.aZ)({name:"App"});var c=r(11639);const u=(0,c.Z)(l,[["render",s]]),d=u;var p=r(23340),f=r(12502);const h=(0,p.h)((()=>{const e=(0,f.WB)();return e}));var v=r(18910);const m=[{path:"/",component:()=>Promise.all([r.e(736),r.e(963)]).then(r.bind(r,93963)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(903)]).then(r.bind(r,14903))}]},{path:"/avanzadas",component:()=>Promise.all([r.e(736),r.e(963)]).then(r.bind(r,93963)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(141)]).then(r.bind(r,85141))}]},{path:"/basicas",component:()=>Promise.all([r.e(736),r.e(963)]).then(r.bind(r,93963)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(228)]).then(r.bind(r,23228))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(409)]).then(r.bind(r,77409))}],b=m,g=(0,p.BC)((function(){const e=v.r5,t=(0,v.p7)({scrollBehavior:()=>({left:0,top:0}),routes:b,history:e("")});return t}));async function y(e,t){const r=e(d);r.use(n.Z,t);const o="function"===typeof h?await h({}):h;r.use(o);const i=(0,a.Xl)("function"===typeof g?await g({store:o}):g);return o.use((({store:e})=>{e.router=i})),{app:r,store:o,router:i}}var w=r(8471),P=r(4328);const O={config:{},plugins:{Dialog:w.Z,Notify:P.Z}},j="";async function k({app:e,router:t,store:r},o){let n=!1;const a=e=>{try{return t.resolve(e).href}catch(r){}return Object(e)===e?null:e},i=e=>{if(n=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=a(e);null!==t&&(window.location.href=t,window.location.reload())},s=window.location.href.replace(window.location.origin,"");for(let c=0;!1===n&&c<o.length;c++)try{await o[c]({app:e,router:t,store:r,ssrContext:null,redirect:i,urlPath:s,publicPath:j})}catch(l){return l&&l.url?void i(l.url):void console.error("[Quasar] boot error:",l)}!0!==n&&(e.use(t),e.mount("#q-app"))}y(o.ri,O).then((e=>Promise.all([Promise.resolve().then(r.bind(r,91569)),Promise.resolve().then(r.bind(r,52763)),Promise.resolve().then(r.bind(r,16119)),Promise.resolve().then(r.bind(r,53483)),Promise.resolve().then(r.t.bind(r,9047,23)),Promise.resolve().then(r.bind(r,11909))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));k(e,r)}))))},52763:(e,t,r)=>{"use strict";r.r(t)},91569:(e,t,r)=>{"use strict";r.r(t),r.d(t,{api:()=>i,default:()=>s});var o=r(23340),n=r(39981),a=r.n(n);const i=a().create({baseURL:"https://api.example.com"}),s=(0,o.xr)((({app:e})=>{e.config.globalProperties.$axios=a(),e.config.globalProperties.$api=i}))},16119:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var o=r(23340);r(20606);const n=(0,o.xr)((async()=>{}))},9047:()=>{},53483:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var o=r(23340),n=r(80687);const a=(0,o.xr)((async({app:e})=>{const t=(0,n.Z)();e.provide("EMITTER",t)}))},11909:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var o=r(23340),n=r(71753);const a=(0,o.xr)((async({app:e})=>{e.use(n.tc)}))}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o].call(a.exports,a,a.exports,r),a.exports}r.m=e,(()=>{var e=[];r.O=(t,o,n,a)=>{if(!o){var i=1/0;for(u=0;u<e.length;u++){for(var[o,n,a]=e[u],s=!0,l=0;l<o.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](o[l])))?o.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,n,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(o,n){if(1&n&&(o=this(o)),8&n)return o;if("object"===typeof o&&o){if(4&n&&o.__esModule)return o;if(16&n&&"function"===typeof o.then)return o}var a=Object.create(null);r.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&o;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((e=>i[e]=()=>o[e]));return i["default"]=()=>o,r.d(a,i),a}})(),(()=>{r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,o)=>(r.f[o](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{141:"835b3276",228:"e0a921fa",409:"eddca57e",903:"12b0550f",963:"5bfcfeb3"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{143:"1c72a42f",228:"ab8747d1",736:"42f4bbe0"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="blueodasmaker:";r.l=(o,n,a,i)=>{if(e[o])e[o].push(n);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[n];var p=(t,r)=>{s.onerror=s.onload=null,clearTimeout(f);var n=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((e=>e(r))),t)return t(r)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,o)=>{var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var a=a=>{if(n.onerror=n.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,n.parentNode.removeChild(n),o(l)}};return n.onerror=n.onload=a,n.href=t,document.head.appendChild(n),n},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=r[o],a=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(a===e||a===t))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],a=n.getAttribute("data-href");if(a===e||a===t)return n}},o=o=>new Promise(((n,a)=>{var i=r.miniCssF(o),s=r.p+i;if(t(i,s))return n();e(o,s,n,a)})),n={143:0};r.f.miniCss=(e,t)=>{var r={228:1};n[e]?t.push(n[e]):0!==n[e]&&r[e]&&t.push(n[e]=o(e).then((()=>{n[e]=0}),(t=>{throw delete n[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,o)=>{var n=r.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));o.push(n[2]=a);var i=r.p+r.u(t),s=new Error,l=o=>{if(r.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,n[1](s)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[i,s,l]=o,c=0;if(i.some((t=>0!==e[t]))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(l)var u=l(r)}for(t&&t(o);c<i.length;c++)a=i[c],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(u)},o=self["webpackChunkblueodasmaker"]=self["webpackChunkblueodasmaker"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=r.O(void 0,[736],(()=>r(73124)));o=r.O(o)})();