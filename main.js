!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=10)}([function(e,t,n){!function(e,n){n(t)}(0,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var r,o,i,a,u;for(u=arguments.length;u-- >2;)G.push(arguments[u]);for(n&&n.children&&(G.length||G.push(n.children),delete n.children);G.length;)if((i=G.pop())instanceof Array)for(u=i.length;u--;)G.push(i[u]);else null!=i&&i!==!0&&i!==!1&&("number"==typeof i&&(i=String(i)),a="string"==typeof i,a&&o?r[r.length-1]+=i:((r||(r=[])).push(i),o=a));var s=new t(e,n||void 0,r||H);return A.vnode&&A.vnode(s),s}function r(e,t){if(t)for(var n in t)e[n]=t[n];return e}function o(e){return r({},e)}function i(e,t){for(var n=t.split("."),r=0;r<n.length&&e;r++)e=e[n[r]];return e}function a(e){return"function"==typeof e}function u(e){return"string"==typeof e}function s(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function c(e,t){return n(e.nodeName,r(o(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function l(e,t,n){var r=t.split(".");return function(t){for(var o=t&&t.target||this,a={},s=a,c=u(n)?i(t,n):o.nodeName?o.type.match(/^che|rad/)?o.checked:o.value:t,l=0;l<r.length-1;l++)s=s[r[l]]||(s[r[l]]=!l&&e.state[r[l]]||{});s[r[l]]=c,e.setState(a)}}function f(e){!e._dirty&&(e._dirty=!0)&&1==J.push(e)&&(A.debounceRendering||L)(p)}function p(){var e,t=J;for(J=[];e=t.pop();)e._dirty&&M(e)}function d(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function h(e,t){return e.nodeName(y(e),t||X)}function v(e,t){return u(t)?e instanceof Text:u(t.nodeName)?!e._componentConstructor&&m(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||d(t):void 0}function m(e,t){return e.normalizedNodeName===t||B(e.nodeName)===B(t)}function y(e){var t=o(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var r in n)void 0===t[r]&&(t[r]=n[r]);return t}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function b(e,t,n,r,o){if("className"===t&&(t="class"),"class"===t&&r&&"object"==typeof r&&(r=s(r)),"key"===t);else if("class"!==t||o)if("style"===t){if((!r||u(r)||u(n))&&(e.style.cssText=r||""),r&&"object"==typeof r){if(!u(n))for(var i in n)i in r||(e.style[i]="");for(var i in r)e.style[i]="number"!=typeof r[i]||V[i]?r[i]:r[i]+"px"}}else if("dangerouslySetInnerHTML"===t)r&&(e.innerHTML=r.__html||"");else if("o"==t[0]&&"n"==t[1]){var c=e._listeners||(e._listeners={});t=B(t.substring(2)),r?c[t]||e.addEventListener(t,x,!!F[t]):c[t]&&e.removeEventListener(t,x,!!F[t]),c[t]=r}else if("list"!==t&&"type"!==t&&!o&&t in e)g(e,t,null==r?"":r),null!=r&&r!==!1||e.removeAttribute(t);else{var l=o&&t.match(/^xlink\:?(.+)/);null==r||r===!1?l?e.removeAttributeNS("http://www.w3.org/1999/xlink",B(l[1])):e.removeAttribute(t):"object"==typeof r||a(r)||(l?e.setAttributeNS("http://www.w3.org/1999/xlink",B(l[1]),r):e.setAttribute(t,r))}else e.className=r||""}function g(e,t,n){try{e[t]=n}catch(e){}}function x(e){return this._listeners[e.type](A.event&&A.event(e)||e)}function S(e){if(_(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||B(e.nodeName);(q[t]||(q[t]=[])).push(e)}}function w(e,t){var n=B(e),r=q[n]&&q[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return r.normalizedNodeName=n,r}function O(){for(var e;e=K.pop();)A.afterMount&&A.afterMount(e),e.componentDidMount&&e.componentDidMount()}function C(e,t,n,r,o,i){Q++||($=o&&void 0!==o.ownerSVGElement,ee=e&&!(Y in e));var a=I(e,t,n,r);return o&&a.parentNode!==o&&o.appendChild(a),--Q||(ee=!1,i||O()),a}function I(e,t,n,r){for(var o=t&&t.attributes&&t.attributes.ref;d(t);)t=h(t,n);if(null==t&&(t=""),u(t))return e&&e instanceof Text&&e.parentNode?e.nodeValue!=t&&(e.nodeValue=t):(e&&N(e),e=document.createTextNode(t)),e;if(a(t.nodeName))return R(e,t,n,r);var i=e,s=String(t.nodeName),c=$,l=t.children;if($="svg"===s||"foreignObject"!==s&&$,e){if(!m(e,s)){for(i=w(s,$);e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),N(e)}}else i=w(s,$);var f=i.firstChild,p=i[Y];if(!p){i[Y]=p={};for(var v=i.attributes,y=v.length;y--;)p[v[y].name]=v[y].value}return!ee&&l&&1===l.length&&"string"==typeof l[0]&&f&&f instanceof Text&&!f.nextSibling?f.nodeValue!=l[0]&&(f.nodeValue=l[0]):(l&&l.length||f)&&k(i,l,n,r,!!p.dangerouslySetInnerHTML),j(i,t.attributes,p),o&&(p.ref=o)(i),$=c,i}function k(e,t,n,r,o){var i,a,u,s,c=e.childNodes,l=[],f={},p=0,d=0,h=c.length,m=0,y=t&&t.length;if(h)for(var b=0;b<h;b++){var g=c[b],x=g[Y],S=y?(a=g._component)?a.__key:x?x.key:null:null;null!=S?(p++,f[S]=g):(ee||o||x||g instanceof Text)&&(l[m++]=g)}if(y)for(var b=0;b<y;b++){u=t[b],s=null;var S=u.key;if(null!=S)p&&S in f&&(s=f[S],f[S]=void 0,p--);else if(!s&&d<m)for(i=d;i<m;i++)if((a=l[i])&&v(a,u)){s=a,l[i]=void 0,i===m-1&&m--,i===d&&d++;break}s=I(s,u,n,r),s&&s!==e&&(b>=h?e.appendChild(s):s!==c[b]&&(s===c[b+1]&&_(c[b]),e.insertBefore(s,c[b]||null)))}if(p)for(var b in f)f[b]&&N(f[b]);for(;d<=m;)(s=l[m--])&&N(s)}function N(e,t){var n=e._component;if(n)z(n,!t);else{e[Y]&&e[Y].ref&&e[Y].ref(null),t||S(e);for(var r;r=e.lastChild;)N(r,t)}}function j(e,t,n){var r;for(r in n)t&&r in t||null==n[r]||b(e,r,n[r],n[r]=void 0,$);if(t)for(r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||b(e,r,n[r],n[r]=t[r],$)}function E(e){var t=e.constructor.name,n=te[t];n?n.push(e):te[t]=[e]}function P(e,t,n){var r=new e(t,n),o=te[e.name];if(U.call(r,t,n),o)for(var i=o.length;i--;)if(o[i].constructor===e){r.nextBase=o[i].nextBase,o.splice(i,1);break}return r}function T(e,t,n,r,o){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||o?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&A.syncComponentUpdates===!1&&e.base?f(e):M(e,1,o)),e.__ref&&e.__ref(e))}function M(e,t,n,i){if(!e._disable){var u,s,c,l,f=e.props,p=e.state,v=e.context,m=e.prevProps||f,_=e.prevState||p,b=e.prevContext||v,g=e.base,x=e.nextBase,S=g||x,w=e._component;if(g&&(e.props=m,e.state=_,e.context=b,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(f,p,v)===!1?u=!0:e.componentWillUpdate&&e.componentWillUpdate(f,p,v),e.props=f,e.state=p,e.context=v),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!u){for(e.render&&(s=e.render(f,p,v)),e.getChildContext&&(v=r(o(v),e.getChildContext()));d(s);)s=h(s,v);var I,k,j=s&&s.nodeName;if(a(j)){var E=y(s);c=w,c&&c.constructor===j&&E.key==c.__key?T(c,E,1,v):(I=c,c=P(j,E,v),c.nextBase=c.nextBase||x,c._parentComponent=e,e._component=c,T(c,E,0,v),M(c,1,n,!0)),k=c.base}else l=S,I=w,I&&(l=e._component=null),(S||1===t)&&(l&&(l._component=null),k=C(l,s,v,n||!g,S&&S.parentNode,!0));if(S&&k!==S&&c!==w){var R=S.parentNode;R&&k!==R&&(R.replaceChild(k,S),I||(S._component=null,N(S)))}if(I&&z(I,k!==S),e.base=k,k&&!i){for(var U=e,D=e;D=D._parentComponent;)(U=D).base=k;k._component=U,k._componentConstructor=U.constructor}}!g||n?K.unshift(e):u||(e.componentDidUpdate&&e.componentDidUpdate(m,_,b),A.afterUpdate&&A.afterUpdate(e));var G,H=e._renderCallbacks;if(H)for(;G=H.pop();)G.call(e);Q||i||O()}}function R(e,t,n,r){for(var o=e&&e._component,i=o,a=e,u=o&&e._componentConstructor===t.nodeName,s=u,c=y(t);o&&!s&&(o=o._parentComponent);)s=o.constructor===t.nodeName;return o&&s&&(!r||o._component)?(T(o,c,3,n,r),e=o.base):(i&&!u&&(z(i,!0),e=a=null),o=P(t.nodeName,c,n),e&&!o.nextBase&&(o.nextBase=e,a=null),T(o,c,1,n,r),e=o.base,a&&e!==a&&(a._component=null,N(a))),e}function z(e,t){A.beforeUnmount&&A.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var r=e._component;if(r)z(r,t);else if(n){n[Y]&&n[Y].ref&&n[Y].ref(null),e.nextBase=n,t&&(_(n),E(e));for(var o;o=n.lastChild;)N(o,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function U(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function D(e,t,n){return C(n,e,{},!1,t)}var A={},G=[],H=[],W={},B=function(e){return W[e]||(W[e]=e.toLowerCase())},Z="undefined"!=typeof Promise&&Promise.resolve(),L=Z?function(e){Z.then(e)}:setTimeout,X={},Y="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",V={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},F={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},J=[],q={},K=[],Q=0,$=!1,ee=!1,te={};r(U.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=l(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=o(n)),r(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),f(this)},forceUpdate:function(){M(this,2)},render:function(){}}),e.h=n,e.cloneElement=c,e.Component=U,e.render=D,e.rerender=p,e.options=A})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.GRID_SIZE=10,t.WEST=1,t.EAST=2,t.NORTH=4,t.SOUTH=8},function(e,t,n){"use strict";function r(e){history.pushState(e,"","#"+encodeURIComponent(JSON.stringify(e)))}function o(e){clearTimeout(c),c=setTimeout(function(){return r(e)},100)}var i=n(0),a=n(3),u=function(e){return e&&e.__esModule?e:{default:e}}(a);Object.assign(document.body.style,{margin:0,padding:"10px",boxSizing:"border-box",display:"flex",height:"100vh",overflow:"hidden"});var s=[{type:"button",label:"blop",initialSize:{width:100,height:30}},{type:"text",text:"blip",initialSize:{width:100,height:30}},{type:"select",initialSize:{width:100,height:30}}],c=void 0,l=void 0;addEventListener("popstate",function(e){l.setState(e.state)}),(0,i.render)((0,i.h)(u.default,{ref:function(e){l=e},inventory:s,initialState:function(){if(history.state)return history.state;try{return JSON.parse(decodeURIComponent(location.hash.slice(1)))}catch(e){}}(),onUpdate:o}),document.body)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),l=n(0),f=n(8),p=r(f),d=n(1),h=n(9),v=r(h),m=n(4),y=r(m),_=n(7),b=r(_),g=function(e){function t(e){a(this,t);var n=u(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e)),r=e.initialState||{};return n.state={focusItemId:!1,items:r.items||{},itemsOrder:r.itemsOrder||[]},n}return s(t,e),c(t,[{key:"render",value:function(e,t){var n=this,r=e.inventory,o=t.items,i=t.itemsOrder,a=t.focusItemId;return(0,l.h)("div",{style:{display:"flex",flex:"1"}},(0,l.h)("div",{style:{backgroundColor:"#eee",padding:5}},r.map(function(e){return(0,l.h)(y.default,{style:{display:"flex",width:e.initialSize.width,height:e.initialSize.height},startMove:n._createDragScenario.bind(n,e),item:{options:e}})})),(0,l.h)("div",{ref:(0,p.default)(this,"_area"),style:{flex:1,position:"relative",backgroundImage:'url("data:image/svg+xml,'+encodeURIComponent("\n                            <svg\n                                xmlns='http://www.w3.org/2000/svg'\n                                width='"+d.GRID_SIZE+"'\n                                height='"+d.GRID_SIZE+"'\n                                viewbox='0 0 "+d.GRID_SIZE+" "+d.GRID_SIZE+"'\n                            >\n                                <circle cx=\""+d.GRID_SIZE/2+'" cy="'+d.GRID_SIZE/2+'" r="1" fill="#eee"/>\n                            </svg>\n                        ')+'")',backgroundPosition:d.GRID_SIZE/2+"px "+d.GRID_SIZE/2+"px"},onClick:function(){n.setState({focusItemId:!1})}},i.map(function(e){return(0,l.h)(y.default,{key:e,style:{position:"absolute",display:"flex",top:o[e].position.y,left:o[e].position.x,width:o[e].size.width,height:o[e].size.height,opacity:n._isInArea(o[e])?"1":"0.5",boxShadow:a===e?"0 0 10px rgba(0, 0, 0, 0.5)":"none",zIndex:a===e?"1":"0"},startMove:n._createDragScenario.bind(n,e),startResize:n._createResizeScenario.bind(n,e),onClick:function(){return n.setState({focusItemId:e})},item:o[e]})})))}},{key:"_createDragScenario",value:function(e,t,n){var r=this,a="string"==typeof e&&e,u=n.getBoundingClientRect(),s=t.pageX-u.left,c=t.pageY-u.top,l=function(e){var t=r._area.getBoundingClientRect();return{x:(0,v.default)(e.pageX-t.left-s),y:(0,v.default)(e.pageY-t.top-c)}};return{snap:function(t){a||(a=(0,b.default)(),r.setState(function(n){var r=n.items,u=n.itemsOrder;return{items:Object.assign({},r,i({},a,{id:a,position:l(t),size:e.initialSize,options:e,active:!0})),itemsOrder:[].concat(o(u),[a])}}))},move:function(e){r._replaceItem({id:a,position:l(e),active:!0})},stop:function(){r._dragStop(a)}}}},{key:"_createResizeScenario",value:function(e,t,n){var r=this,o=this.state.items[e],i=o.position,a=i.x,u=i.y,s=o.size,c=s.height,l=s.width;return{move:function(o){var i=(0,v.default)(o.pageX-n.pageX),s=(0,v.default)(o.pageY-n.pageY);r._replaceItem({id:e,position:{x:t&d.WEST?a+i:a,y:t&d.NORTH?u+s:u},size:{width:Math.max(d.GRID_SIZE,t&d.EAST?l+i:t&d.WEST?l-i:l),height:Math.max(d.GRID_SIZE,t&d.SOUTH?c+s:t&d.NORTH?c-s:c)},active:!0})},stop:function(){r._dragStop(e)}}}},{key:"_dragStop",value:function(e){var t=this;this._isInArea(this.state.items[e])?this._replaceItem({id:e,active:!1},function(){return t._triggerUpdateState()}):this._removeItem(e,function(){return t._triggerUpdateState()})}},{key:"_isInArea",value:function(e){var t=e.position,n=t.x,r=t.y,o=e.size,i=o.width,a=o.height;if(!this._area)return!0;var u=this._area.getBoundingClientRect();return n>=0&&r>=0&&n+i<=u.width&&r+a<=u.height}},{key:"_removeItem",value:function(e,t){this.setState(function(t){var n=t.items,r=t.focusItemId,o=t.itemsOrder,i=Object.assign({},n);return delete i[e],{items:i,focusItemId:r!==e&&r,itemsOrder:o.filter(function(t){return t!==e})}},t)}},{key:"_replaceItem",value:function(e,t){this.setState(function(t){var n=t.items;if(!n.hasOwnProperty(e.id))throw new Error("Unkwnown item "+e.id);return{items:Object.assign({},n,i({},e.id,Object.assign({},n[e.id],e)))}},t)}},{key:"_triggerUpdateState",value:function(){this.props.onUpdate&&this.props.onUpdate(this.state)}}]),t}(l.Component);t.default=g},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),c=n(6),l=r(c),f=n(5),p=r(f),d=n(1),h=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(e,t){var n=this,r=e.onClick,o=e.startResize,i=e.startMove,a=e.style,u=e.item,c=t.resizeDirection,l=void 0,f=u.active?-d.GRID_SIZE:0;return(0,s.h)("div",{ref:function(e){l=e},style:Object.assign({position:"relative"},a),onClick:function(e){e.stopPropagation(),r&&r()},onMouseMove:function(e){if(!u.active&&o&&!e.which){var t=l.getBoundingClientRect(),r=t.left,i=t.right,a=t.top,s=t.bottom,c=e.pageX,f=e.pageY,p=(c-r<10?d.WEST:0)|(i-c<10?d.EAST:0)|(f-a<10?d.NORTH:0)|(s-f<10?d.SOUTH:0);n.setState({resizeDirection:p})}},onMouseLeave:function(){!u.active&&o&&n.setState(function(){return{over:null}})}},(0,s.h)(v,{style:{position:"absolute",background:u.active?"rgba(0, 0, 0, 0.2)":"",top:f,right:f,left:f,bottom:f,cursor:c?c&d.WEST?c&d.NORTH?"nw-resize":c&d.SOUTH?"sw-resize":"w-resize":c&d.EAST?c&d.NORTH?"ne-resize":c&d.SOUTH?"se-resize":"e-resize":c&d.NORTH?"n-resize":"s-resize":"move"},start:function(e,t){return c&&o?o(c,e):i?i(e,t):void 0}}),(0,p.default)(u.options))}}]),t}(s.Component);t.default=h;var v=function(e){function t(){return o(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),u(t,[{key:"render",value:function(e){var t=Object.assign({},e);return delete t.start,(0,s.h)("div",t,this.props.children)}},{key:"componentDidMount",value:function(){var e=this;this._detachDrag=(0,l.default)(this.base,function(t){return e.props.start(t,e.base)})}},{key:"componentWillUnmount",value:function(){this._detachDrag()}}]),t}(s.Component)},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){switch(e.type){case"button":return(0,s.h)(c,e);case"text":return(0,s.h)(f,e);case"select":return(0,s.h)(l,e)}}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.default=a;var s=n(0),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(e){var t=e.label;return(0,s.h)("button",{style:{flex:1}},t)}}]),t}(s.Component),l=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(){return(0,s.h)("select",{style:{flex:1}})}}]),t}(s.Component),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),u(t,[{key:"render",value:function(e){var t=e.text;return(0,s.h)("input",{type:"text",style:{width:"100%",height:"100%",boxSizing:"border-box"},value:t})}}]),t}(s.Component)},function(e,t,n){"use strict";function r(e){return e.type.startsWith("touch")}function o(e,t,n){for(var r in t)e.addEventListener(r,t[r],n);return function(){for(var r in t)e.removeEventListener(r,t[r],n)}}function i(){p||(p=!0,o(document,{touchmove:c,mousemove:c,touchend:l,mouseup:l,touchcancel:l}))}function a(e,t){return void 0!==d.scenario[e]?d.scenario[e]:t}function u(e,t){return"function"==typeof d.scenario[e]?d.scenario[e](t):void 0}function s(e,t){if(!(d||(t.which||t.button||0)>=2)){var n=e(t);n&&(d={scenario:n,snapped:!1,startOrigin:{x:t.pageX,y:t.pageY}},r(t)||t.preventDefault())}}function c(e){if(d){if(!d.snapped){var t=r(e)?a("touchSnap",20):a("mouseSnap",10),n=Math.pow(Math.pow(e.pageX-d.startOrigin.x,2)+Math.pow(e.pageY-d.startOrigin.y,2),.5);(!t||n>t)&&(d.snapped=!0,u("snap",e))}d.snapped&&(e.preventDefault(),u("move",e))}}function l(e){d&&(d.snapped?(e.stopPropagation(),e.preventDefault(),u("stop",e),setTimeout(o(document,{click:function(e){e.stopPropagation()}},!0))):u("cancel",e),u("reset",e),d=!1)}function f(e,t){i();var n=o(e,{touchstart:s.bind(null,t),mousedown:s.bind(null,t)});return function(){n()}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=f;var p=!1,d=!1},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return r+=1,""+e+Math.floor(0x5c5e45240000*Math.random()).toString(36)+"-"+r};var r=0},function(e,t,n){"use strict";function r(e,t){var n=o.get(e);n||(n=new Map,o.set(e,n));var r=n.get(t);return r||(r=function(n){e[t]=n},n.set(t,r)),r}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=new WeakMap},function(e,t,n){"use strict";function r(e){return Math.round(e/o.GRID_SIZE)*o.GRID_SIZE}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var o=n(1)},function(e,t,n){e.exports=n(2)}]);