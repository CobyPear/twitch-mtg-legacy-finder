(this["webpackJsonptwitch-mtg-legacy-finder"]=this["webpackJsonptwitch-mtg-legacy-finder"]||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(9),i=n.n(a),o=(n(14),n(2)),s=n.n(o),l=n(4),d=n(3),u=n(6),h={getStreams:function(){var e=Object(l.a)(s.a.mark((function e(t){var n,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.twitch.tv/helix/streams?game_id=2748&first=100",{method:"GET",headers:{Authorization:"Bearer ".concat(t),"client-id":"po7qw7qlnkajp4a5lf72h83x4dmzod"}});case 3:return n=e.sent,e.next=6,n.json();case 6:return c=e.sent,e.abrupt("return",c);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getNextPage:function(){var e=Object(l.a)(s.a.mark((function e(t,n){var c,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.twitch.tv/helix/streams?game_id=2748&after=".concat(n),{method:"GET",headers:{Authorization:"Bearer ".concat(t),"client-id":"po7qw7qlnkajp4a5lf72h83x4dmzod"}});case 3:return c=e.sent,e.next=6,c.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()},j=n(0),b=function(e){var t=e.title,n=e.streamer,c=e.thumbnail.toString().replace("{width}","500").replace("{height}","250");return Object(j.jsxs)("div",{className:"card",children:[Object(j.jsx)("div",{className:"card-header",children:Object(j.jsx)("h1",{children:n})}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("h2",{children:t}),Object(j.jsxs)("div",{className:"img-link-container",children:[Object(j.jsxs)("a",{target:"_blank",rel:"noreferrer",href:"https://twitch.tv/".concat(n),children:[Object(j.jsx)("img",{src:c,alt:"".concat(n,"'s stream thumbnail")}),Object(j.jsx)("span",{className:"tooltip","data-text":"click to open ".concat(n,"'s stream")})]}),Object(j.jsx)("div",{className:"spacer"}),Object(j.jsxs)("a",{className:"link-button",rel:"noreferrer",target:"_blank",href:"https://twitch.tv/".concat(n),children:["Go to ",n,"'s stream!"]})]})]})]})},f=function(e){var t,n=e.legacyStreams,c=(null===(t=window.location.href.split("=")[1])||void 0===t?void 0:t.split("&")[0])||"";return Object(j.jsx)("div",{id:"resp",children:(null===n||void 0===n?void 0:n.length)?null===n||void 0===n?void 0:n.map((function(e){return Object(j.jsx)(b,{title:e.title,streamer:e.user_name,thumbnail:e.thumbnail_url},e.id)})):Object(j.jsx)("p",{style:{textAlign:"center"},children:c?"No live streamers at the moment. Try again later, or switch to a different format":"Please login to view live streamers"})})};var m=function(){var e,t=(null===(e=window.location.href.split("=")[1])||void 0===e?void 0:e.split("&")[0])||"",n="https://id.twitch.tv/oauth2/authorize?client_id=".concat("po7qw7qlnkajp4a5lf72h83x4dmzod","&redirect_uri=").concat("https://cobypear.github.io/twitch-mtg-legacy-finder","&response_type=").concat("token","&scope=").concat("openid","&claims=").concat("","&force_verify=true"),r=Object(c.useState)([]),a=Object(u.a)(r,2),i=a[0],o=a[1],b=Object(c.useState)(),m=Object(u.a)(b,2),p=m[0],g=m[1],v=Object(c.useState)(JSON.parse(localStorage.getItem("closed"))||!1),O=Object(u.a)(v,2),x=O[0],w=O[1],y=Object(c.useState)(JSON.parse(localStorage.getItem("format"))||"legacy"),k=Object(u.a)(y,2),S=k[0],N=k[1];Object(c.useEffect)((function(){if(t){var e=function(e){var t=null===e||void 0===e?void 0:e.filter((function(e){return e.title.toLowerCase().includes(S)})),n=Object(d.a)(new Set(t));o((function(e){return console.log(e),Object(d.a)(n)}))};Object(l.a)(s.a.mark((function n(){var c,r,a;return s.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,h.getStreams(t);case 2:c=n.sent,r=c.data,a=c.pagination,g(null===a||void 0===a?void 0:a.cursor),e(r);case 7:case"end":return n.stop()}}),n)})))()}}),[t,S]),Object(c.useEffect)((function(){window.onscroll=function(){window.innerHeight+window.scrollY>=document.body.offsetHeight&&_()}}));var C=function(e){var t=null===e||void 0===e?void 0:e.filter((function(e){return e.title.toLowerCase().includes(S)})),n=Object(d.a)(new Set(t));o((function(e){return e?[].concat(Object(d.a)(e),Object(d.a)(n)):Object(d.a)(n)})),console.log(i)},_=function(){var e=Object(l.a)(s.a.mark((function e(){var n,c,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!p){e.next=8;break}return e.next=3,h.getNextPage(t,p);case 3:n=e.sent,c=n.data,r=n.pagination,g(r.cursor?r.cursor:""),C(c);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){w(!x),localStorage.setItem("closed",!x)};return Object(j.jsxs)("div",{className:"main-container",children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("button",{id:"filter-btn",onClick:function(){N("legacy"===S?"modern":"legacy"),localStorage.setItem("format",JSON.stringify("legacy"===S?"modern":"legacy"))},children:["switch to ","".concat("legacy"===S?"modern":"legacy")]}),Object(j.jsx)("a",{className:"link-button",id:"login",href:n,children:"Login"}),x&&Object(j.jsx)("button",{id:"show-message",onClick:L,children:"show message"})]}),!x&&Object(j.jsx)("div",{className:"row",children:Object(j.jsxs)("div",{className:"message",style:{display:x?"none":"inline-block"},children:[Object(j.jsx)("h1",{children:"Welcome to Twitch M:tG Legacy Finder"}),Object(j.jsx)("button",{onClick:L,children:"x"}),Object(j.jsx)("p",{children:"How does it work?"}),Object(j.jsxs)("p",{children:["1. Click Login to login to your Twitch account ",Object(j.jsx)("a",{href:"https://github.com/CobyPear/twitch-mtg-legacy-finder#question-why-do-i-need-to-login-to-twitch",id:"why",children:"Why do I need to do this?"})]}),Object(j.jsx)("p",{children:"2. Browse live Magic: the Gathering streamers currently playing the best (Legacy) format"}),Object(j.jsx)("a",{className:"link-button",href:n,children:"Login"})]})}),Object(j.jsx)("div",{id:"cards",children:i&&Object(j.jsx)(f,{legacyStreams:i})}),Object(j.jsx)("footer",{id:"footer",children:Object(j.jsxs)("span",{children:["\xa9 ",Object(j.jsx)("a",{href:"https://cobysher.dev",children:"Coby Sher"})," 2021"]})})]})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),r(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(m,{})}),document.getElementById("root")),p()}},[[17,1,2]]]);
//# sourceMappingURL=main.eaa88089.chunk.js.map