(this["webpackJsonptwitch-mtg-legacy-finder"]=this["webpackJsonptwitch-mtg-legacy-finder"]||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(9),o=n.n(a),s=(n(14),n(5)),i=n(2),l=n.n(i),h=n(3),u=n(7),d={getStreams:function(){var e=Object(h.a)(l.a.mark((function e(t){var n,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.twitch.tv/helix/streams?game_id=2748&first=100",{method:"GET",headers:{Authorization:"Bearer ".concat(t),"client-id":"po7qw7qlnkajp4a5lf72h83x4dmzod"}});case 3:return n=e.sent,e.next=6,n.json();case 6:return c=e.sent,e.abrupt("return",c);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),getNextPage:function(){var e=Object(h.a)(l.a.mark((function e(t,n){var c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://api.twitch.tv/helix/streams?game_id=2748&after=".concat(n),{method:"GET",headers:{Authorization:"Bearer ".concat(t),"client-id":"po7qw7qlnkajp4a5lf72h83x4dmzod"}});case 3:return c=e.sent,e.next=6,c.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()},j=n(0),b=function(e){var t=e.title,n=e.streamer,c=e.thumbnail;console.log(c.toString().replace("{width}","250").replace("{height}","250"));var r=c.toString().replace("{width}","500").replace("{height}","250");return Object(j.jsxs)("div",{className:"card",children:[Object(j.jsx)("div",{className:"card-header",children:Object(j.jsx)("h1",{children:n})}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("h2",{children:t}),Object(j.jsxs)("div",{className:"img-link-container",children:[Object(j.jsxs)("a",{target:"_blank",rel:"noreferrer",href:"https://twitch.tv/".concat(n),children:[Object(j.jsx)("img",{src:r,alt:"".concat(n,"'s stream thumbnail")}),Object(j.jsx)("span",{className:"tooltip","data-text":"click to open ".concat(n,"'s stream")})]}),Object(j.jsx)("div",{className:"spacer"}),Object(j.jsxs)("a",{className:"link-button",rel:"noreferrer",target:"_blank",href:"https://twitch.tv/".concat(n),children:["Go to ",n,"'s stream!"]})]})]})]})},p=function(e){var t=e.legacyStreams;return console.log(t),Object(j.jsx)(j.Fragment,{children:(null===t||void 0===t?void 0:t.length)&&(null===t||void 0===t?void 0:t.map((function(e){return console.log(e),Object(j.jsx)(b,{title:e.title,streamer:e.user_name,thumbnail:e.thumbnail_url},e.id)})))})};var f=function(){var e,t=(null===(e=window.location.href.split("=")[1])||void 0===e?void 0:e.split("&")[0])||"",n="https://id.twitch.tv/oauth2/authorize?client_id=".concat("po7qw7qlnkajp4a5lf72h83x4dmzod","&redirect_uri=").concat("","&response_type=").concat("token","&scope=").concat("openid","&claims=").concat("","&force_verify=true"),r=Object(c.useState)([]),a=Object(u.a)(r,2),o=a[0],i=a[1],b=Object(c.useState)(),f=Object(u.a)(b,2),g=f[0],m=f[1],x=Object(c.useState)(JSON.parse(localStorage.getItem("closed"))||!1),O=Object(u.a)(x,2),v=O[0],w=O[1];Object(c.useEffect)((function(){t&&Object(h.a)(l.a.mark((function e(){var n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.getStreams(t);case 2:n=e.sent,c=n.data,r=n.pagination,m(r.cursor),y(c);case 7:case"end":return e.stop()}}),e)})))()}),[t]),Object(c.useEffect)((function(){window.onscroll=function(){window.innerHeight+window.scrollY>=document.body.offsetHeight&&k()}}));var y=function(e){var t=null===e||void 0===e?void 0:e.filter((function(e){return e.title.toLowerCase().includes("legacy")})),n=Object(s.a)(new Set(t));console.log(n),i((function(e){return e?[].concat(Object(s.a)(e),Object(s.a)(n)):Object(s.a)(n)}))},k=function(){var e=Object(h.a)(l.a.mark((function e(){var n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("hello"),!g){e.next=11;break}return e.next=4,d.getNextPage(t,g);case 4:n=e.sent,c=n.data,r=n.pagination,m(r.cursor?r.cursor:""),y(c),console.log(g),console.log("debug",o);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){console.log("before",v),w(!v),console.log("after",v),localStorage.setItem("closed",!v)};return Object(j.jsxs)("div",{className:"main-container",children:[v?Object(j.jsx)("button",{id:"show-message",onClick:S,children:"show message"}):Object(j.jsxs)("div",{className:"message",style:{display:v?"none":"flex"},children:[Object(j.jsx)("h1",{children:"Welcome to Twitch M:tG Legacy Finder"}),Object(j.jsx)("button",{onClick:S,children:"x"}),Object(j.jsx)("p",{children:"How does it work?"}),Object(j.jsxs)("p",{children:["1. Click Login to login to your Twitch account ",Object(j.jsx)("a",{href:"#",id:"why",children:"Why do I need to do this?"})]}),Object(j.jsx)("p",{children:"2. Browse live Magic: the Gathering streamers currently playing the best (Legacy) format"}),Object(j.jsx)("p",{children:"3. ???"}),Object(j.jsx)("p",{children:"4. Profit!"}),Object(j.jsx)("a",{className:"link-button",href:n,children:"Login"})]}),o&&Object(j.jsx)(p,{legacyStreams:o}),Object(j.jsx)("footer",{children:Object(j.jsxs)("span",{children:["\xa9 ",Object(j.jsx)("a",{href:"https://cobysher.dev",children:"Coby Sher"})," 2021"]})})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),a(e),o(e)}))};o.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(f,{})}),document.getElementById("root")),g()}},[[17,1,2]]]);
//# sourceMappingURL=main.1af7f4ad.chunk.js.map