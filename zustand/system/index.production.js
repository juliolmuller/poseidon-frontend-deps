System.register(["zustand/vanilla","react","use-sync-external-store/shim/with-selector"],function(c){"use strict";var S={default:1,useStore:1,createStore:1},i,o,f;return{setters:[function(t){i=t.default;var u={createStore:t.default};for(var r in t)S[r]||(u[r]=t[r]);c(u)},function(t){o=t.useDebugValue},function(t){f=t.default}],execute:function(){c("useStore",u);const{useSyncExternalStoreWithSelector:t}=f;function u(e,s=e.getState,n){const a=t(e.subscribe,e.getState,e.getServerState||e.getState,s,n);return o(a),a}const r=e=>{const s=typeof e=="function"?i(e):e,n=(a,l)=>u(s,a,l);return Object.assign(n,s),n};var v=c("default",e=>e?r(e):r)}}});
