System.register([],function(a){"use strict";return{execute:function(){a("default",f);function f(b){let e;const n=new Set,u=(t,c)=>{const s=typeof t=="function"?t(e):t;if(s!==e){const r=e;e=c?s:Object.assign({},e,s),n.forEach(o=>o(e,r))}},i=()=>e,l=(t,c=i,s=Object.is)=>{console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");let r=c(e);function o(){const S=c(e);if(!s(r,S)){const E=r;t(r=S,E)}}return n.add(o),()=>n.delete(o)},d={setState:u,getState:i,subscribe:(t,c,s)=>c||s?l(t,c,s):(n.add(t),()=>n.delete(t)),destroy:()=>n.clear()};return e=b(u,i,d),d}}}});
