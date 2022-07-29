System.register([],function(b){"use strict";return{execute:function(){const w=b("redux",(l,h)=>(s,n,r)=>(r.dispatch=t=>(s(y=>l(y,t),!1,t),t),r.dispatchFromDevtools=!0,{dispatch:(...t)=>r.dispatch(...t),...h})),I=b("devtools",(l,h={})=>(s,n,r)=>{const{enabled:t,anonymousActionType:y,...m}=h;let g;try{g=(t!=null?t:!1)&&window.__REDUX_DEVTOOLS_EXTENSION__}catch{}if(!g)return l(s,n,r);const o=g.connect(m);let d=!0;r.setState=(i,u,c)=>{const e=s(i,u);return d&&o.send(c===void 0?{type:y||"anonymous"}:typeof c=="string"?{type:c}:c,n()),e};const f=(...i)=>{const u=d;d=!1,s(...i),d=u},v=l(r.setState,n,r);if(o.init(v),r.dispatchFromDevtools&&typeof r.dispatch=="function"){const i=r.dispatch;r.dispatch=(...u)=>{i(...u)}}return o.subscribe(i=>{var u;switch(i.type){case"ACTION":if(typeof i.payload!="string"){console.error("[zustand devtools middleware] Unsupported action format");return}return T(i.payload,c=>{if(c.type==="__setState"){f(c.state);return}!r.dispatchFromDevtools||typeof r.dispatch=="function"&&r.dispatch(c)});case"DISPATCH":switch(i.payload.type){case"RESET":return f(v),o.init(r.getState());case"COMMIT":return o.init(r.getState());case"ROLLBACK":return T(i.state,c=>{f(c),o.init(r.getState())});case"JUMP_TO_STATE":case"JUMP_TO_ACTION":return T(i.state,c=>{f(c)});case"IMPORT_STATE":{const{nextLiftedState:c}=i.payload,e=(u=c.computedStates.slice(-1)[0])==null?void 0:u.state;if(!e)return;f(e),o.send(null,c);return}case"PAUSE_RECORDING":return d=!d}return}}),v}),T=(l,h)=>{let s;try{s=JSON.parse(l)}catch(n){console.error("[zustand devtools middleware] Could not parse the received json",n)}s!==void 0&&h(s)},z=b("subscribeWithSelector",l=>(h,s,n)=>{const r=n.subscribe;return n.subscribe=(t,y,m)=>{let g=t;if(y){const o=(m==null?void 0:m.equalityFn)||Object.is;let d=t(n.getState());g=f=>{const v=t(f);if(!o(d,v)){const i=d;y(d=v,i)}},m!=null&&m.fireImmediately&&y(d,d)}return r(g)},l(h,s,n)}),N=b("combine",(l,h)=>(...s)=>Object.assign({},l,h(...s))),O=l=>h=>{try{const s=l(h);return s instanceof Promise?s:{then(n){return O(n)(s)},catch(n){return this}}}catch(s){return{then(n){return this},catch(n){return O(n)(s)}}}},D=b("persist",(l,h)=>(s,n,r)=>{let t={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:e=>e,version:0,merge:(e,p)=>({...p,...e}),...h},y=!1;const m=new Set,g=new Set;let o;try{o=t.getStorage()}catch{}if(!o)return l((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${t.name}', the given storage is currently unavailable.`),s(...e)},n,r);const d=O(t.serialize),f=()=>{const e=t.partialize({...n()});let p;const a=d({state:e,version:t.version}).then(S=>o.setItem(t.name,S)).catch(S=>{p=S});if(p)throw p;return a},v=r.setState;r.setState=(e,p)=>{v(e,p),f()};const i=l((...e)=>{s(...e),f()},n,r);let u;const c=()=>{var e;if(!o)return;y=!1,m.forEach(a=>a(n()));const p=((e=t.onRehydrateStorage)==null?void 0:e.call(t,n()))||void 0;return O(o.getItem.bind(o))(t.name).then(a=>{if(a)return t.deserialize(a)}).then(a=>{if(a)if(typeof a.version=="number"&&a.version!==t.version){if(t.migrate)return t.migrate(a.state,a.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return a.state}).then(a=>{var S;return u=t.merge(a,(S=n())!=null?S:i),s(u,!0),f()}).then(()=>{p==null||p(u,void 0),y=!0,g.forEach(a=>a(u))}).catch(a=>{p==null||p(void 0,a)})};return r.persist={setOptions:e=>{t={...t,...e},e.getStorage&&(o=e.getStorage())},clearStorage:()=>{o==null||o.removeItem(t.name)},getOptions:()=>t,rehydrate:()=>c(),hasHydrated:()=>y,onHydrate:e=>(m.add(e),()=>{m.delete(e)}),onFinishHydration:e=>(g.add(e),()=>{g.delete(e)})},c(),u||i})}}});
