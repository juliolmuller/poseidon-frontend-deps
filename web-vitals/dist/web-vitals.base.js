var e=function(e,t){return{name:e,value:void 0===t?-1:t,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},t=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},n=function(e,t){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(e(i),t&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},i=function(e){addEventListener("pageshow",(function(t){t.persisted&&e(t)}),!0)},r=function(e,t,n){var i;return function(r){t.value>=0&&(r||n)&&(t.delta=t.value-(i||0),(t.delta||void 0===i)&&(i=t.value,e(t)))}},a=-1,o=function(){n((function(e){var t=e.timeStamp;a=t}),!0)},u=function(){return a<0&&((a=window.webVitals.firstHiddenTime)===1/0&&o(),i((function(){setTimeout((function(){a="hidden"===document.visibilityState?0:1/0,o()}),0)}))),{get firstHiddenTime(){return a}}},c=function(n,a){var o,c=u(),s=e("FCP"),f=function(e){"first-contentful-paint"===e.name&&(d&&d.disconnect(),e.startTime<c.firstHiddenTime&&(s.value=e.startTime,s.entries.push(e),o(!0)))},m=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],d=m?null:t("paint",f);(m||d)&&(o=r(n,s,a),m&&f(m),i((function(t){s=e("FCP"),o=r(n,s,a),requestAnimationFrame((function(){requestAnimationFrame((function(){s.value=performance.now()-t.timeStamp,o(!0)}))}))})))},s=!1,f=-1,m=function(a,o){s||(c((function(e){f=e.value})),s=!0);var u,m=function(e){f>-1&&a(e)},d=e("CLS",0),v=0,l=[],p=function(e){if(!e.hadRecentInput){var t=l[0],n=l[l.length-1];v&&e.startTime-n.startTime<1e3&&e.startTime-t.startTime<5e3?(v+=e.value,l.push(e)):(v=e.value,l=[e]),v>d.value&&(d.value=v,d.entries=l,u())}},T=t("layout-shift",p);T&&(u=r(m,d,o),n((function(){T.takeRecords().map(p),u(!0)})),i((function(){v=0,f=-1,d=e("CLS",0),u=r(m,d,o)})))},d=function(a,o){var c,s=u(),f=e("FID"),m=function(e){e.startTime<s.firstHiddenTime&&(f.value=e.processingStart-e.startTime,f.entries.push(e),c(!0))},d=t("first-input",m);c=r(a,f,o),d&&n((function(){d.takeRecords().map(m),d.disconnect()}),!0),d||window.webVitals.firstInputPolyfill(m),i((function(){f=e("FID"),c=r(a,f,o),window.webVitals.resetFirstInputPolyfill(),window.webVitals.firstInputPolyfill(m)}))},v={},l=function(a,o){var c,s=u(),f=e("LCP"),m=function(e){var t=e.startTime;t<s.firstHiddenTime&&(f.value=t,f.entries.push(e),c())},d=t("largest-contentful-paint",m);if(d){c=r(a,f,o);var l=function(){v[f.id]||(d.takeRecords().map(m),d.disconnect(),v[f.id]=!0,c(!0))};["keydown","click"].forEach((function(e){addEventListener(e,l,{once:!0,capture:!0})})),n(l,!0),i((function(t){f=e("LCP"),c=r(a,f,o),requestAnimationFrame((function(){requestAnimationFrame((function(){f.value=performance.now()-t.timeStamp,v[f.id]=!0,c(!0)}))}))}))}},p=function(t){var n,i=e("TTFB");n=function(){try{var e=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,t={entryType:"navigation",startTime:0};for(var n in e)"navigationStart"!==n&&"toJSON"!==n&&(t[n]=Math.max(e[n]-e.navigationStart,0));return t}();if(i.value=i.delta=e.responseStart,i.value<0||i.value>performance.now())return;i.entries=[e],t(i)}catch(e){}},"complete"===document.readyState?setTimeout(n,0):addEventListener("load",(function(){return setTimeout(n,0)}))};export{m as getCLS,c as getFCP,d as getFID,l as getLCP,p as getTTFB};
