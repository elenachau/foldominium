(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! @svgdotjs/svg.js v3.2.4 MIT*/;
/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.2.4
* https://svgjs.dev/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Thu Jun 27 2024 12:00:16 GMT+0200 (Central European Summer Time)
*/
var SVG=function(){"use strict";const t={},e=[];function n(e,i){if(Array.isArray(e))for(const t of e)n(t,i);else if("object"!=typeof e)r(Object.getOwnPropertyNames(i)),t[e]=Object.assign(t[e]||{},i);else for(const t in e)n(t,e[t])}function i(e){return t[e]||{}}function r(t){e.push(...t)}function s(t,e){let n;const i=t.length,r=[];for(n=0;n<i;n++)r.push(e(t[n]));return r}function o(t,e){let n;const i=t.length,r=[];for(n=0;n<i;n++)e(t[n])&&r.push(t[n]);return r}function h(t){return t%360*Math.PI/180}function u(t){return t.replace(/([A-Z])/g,(function(t,e){return"-"+e.toLowerCase()}))}function a(t){return t.charAt(0).toUpperCase()+t.slice(1)}function l(t,e,n,i){return null!=e&&null!=n||(i=i||t.bbox(),null==e?e=i.width/i.height*n:null==n&&(n=i.height/i.width*e)),{width:e,height:n}}function c(t,e){const n=t.origin;let i=null!=t.ox?t.ox:null!=t.originX?t.originX:"center",r=null!=t.oy?t.oy:null!=t.originY?t.originY:"center";null!=n&&([i,r]=Array.isArray(n)?n:"object"==typeof n?[n.x,n.y]:[n,n]);const s="string"==typeof i,o="string"==typeof r;if(s||o){const{height:t,width:n,x:h,y:u}=e.bbox();s&&(i=i.includes("left")?h:i.includes("right")?h+n:h+n/2),o&&(r=r.includes("top")?u:r.includes("bottom")?u+t:u+t/2)}return[i,r]}const f=new Set(["desc","metadata","title"]),d=t=>f.has(t.nodeName),m=(t,e,n={})=>{const i={...e};for(const t in i)i[t].valueOf()===n[t]&&delete i[t];Object.keys(i).length?t.node.setAttribute("data-svgjs",JSON.stringify(i)):(t.node.removeAttribute("data-svgjs"),t.node.removeAttribute("svgjs:data"))};var p={__proto__:null,capitalize:a,degrees:function(t){return 180*t/Math.PI%360},filter:o,getOrigin:c,isDescriptive:d,map:s,proportionalSize:l,radians:h,unCamelCase:u,writeDataToDom:m};const y="http://www.w3.org/2000/svg",w="http://www.w3.org/1999/xhtml",g="http://www.w3.org/2000/xmlns/",_="http://www.w3.org/1999/xlink";var x={__proto__:null,html:w,svg:y,xlink:_,xmlns:g};const b={window:"undefined"==typeof window?null:window,document:"undefined"==typeof document?null:document};function v(t=null,e=null){b.window=t,b.document=e}const M={};function O(){M.window=b.window,M.document=b.document}function k(){b.window=M.window,b.document=M.document}function T(){return b.window}class C{}const N={},S="___SYMBOL___ROOT___";function E(t,e=y){return b.document.createElementNS(e,t)}function j(t,e=!1){if(t instanceof C)return t;if("object"==typeof t)return z(t);if(null==t)return new N[S];if("string"==typeof t&&"<"!==t.charAt(0))return z(b.document.querySelector(t));const n=e?b.document.createElement("div"):E("svg");return n.innerHTML=t,t=z(n.firstChild),n.removeChild(n.firstChild),t}function D(t,e){return e&&(e instanceof b.window.Node||e.ownerDocument&&e instanceof e.ownerDocument.defaultView.Node)?e:E(t)}function I(t){if(!t)return null;if(t.instance instanceof C)return t.instance;if("#document-fragment"===t.nodeName)return new N.Fragment(t);let e=a(t.nodeName||"Dom");return"LinearGradient"===e||"RadialGradient"===e?e="Gradient":N[e]||(e="Dom"),new N[e](t)}let z=I;function P(t,e=t.name,n=!1){return N[e]=t,n&&(N[S]=t),r(Object.getOwnPropertyNames(t.prototype)),t}function R(t){return N[t]}let L=1e3;function q(t){return"Svgjs"+a(t)+L++}function F(t){for(let e=t.children.length-1;e>=0;e--)F(t.children[e]);return t.id?(t.id=q(t.nodeName),t):t}function X(t,e){let n,i;for(i=(t=Array.isArray(t)?t:[t]).length-1;i>=0;i--)for(n in e)t[i].prototype[n]=e[n]}function Y(t){return function(...e){const n=e[e.length-1];return!n||n.constructor!==Object||n instanceof Array?t.apply(this,e):t.apply(this,e.slice(0,-1)).attr(n)}}n("Dom",{siblings:function(){return this.parent().children()},position:function(){return this.parent().index(this)},next:function(){return this.siblings()[this.position()+1]},prev:function(){return this.siblings()[this.position()-1]},forward:function(){const t=this.position();return this.parent().add(this.remove(),t+1),this},backward:function(){const t=this.position();return this.parent().add(this.remove(),t?t-1:0),this},front:function(){return this.parent().add(this.remove()),this},back:function(){return this.parent().add(this.remove(),0),this},before:function(t){(t=j(t)).remove();const e=this.position();return this.parent().add(t,e),this},after:function(t){(t=j(t)).remove();const e=this.position();return this.parent().add(t,e+1),this},insertBefore:function(t){return(t=j(t)).before(this),this},insertAfter:function(t){return(t=j(t)).after(this),this}});const B=/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,H=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,V=/rgb\((\d+),(\d+),(\d+)\)/,$=/(#[a-z_][a-z0-9\-_]*)/i,U=/\)\s*,?\s*/,W=/\s/g,Q=/^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i,J=/^rgb\(/,Z=/^(\s+)?$/,K=/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,tt=/\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,et=/[\s,]+/,nt=/[MLHVCSQTAZ]/i;var it={__proto__:null,delimiter:et,hex:H,isBlank:Z,isHex:Q,isImage:tt,isNumber:K,isPathLetter:nt,isRgb:J,numberAndUnit:B,reference:$,rgb:V,transforms:U,whitespace:W};function rt(t){const e=Math.round(t),n=Math.max(0,Math.min(255,e)).toString(16);return 1===n.length?"0"+n:n}function st(t,e){for(let n=e.length;n--;)if(null==t[e[n]])return!1;return!0}function ot(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}n("Dom",{classes:function(){const t=this.attr("class");return null==t?[]:t.trim().split(et)},hasClass:function(t){return-1!==this.classes().indexOf(t)},addClass:function(t){if(!this.hasClass(t)){const e=this.classes();e.push(t),this.attr("class",e.join(" "))}return this},removeClass:function(t){return this.hasClass(t)&&this.attr("class",this.classes().filter((function(e){return e!==t})).join(" ")),this},toggleClass:function(t){return this.hasClass(t)?this.removeClass(t):this.addClass(t)}}),n("Dom",{css:function(t,e){const n={};if(0===arguments.length)return this.node.style.cssText.split(/\s*;\s*/).filter((function(t){return!!t.length})).forEach((function(t){const e=t.split(/\s*:\s*/);n[e[0]]=e[1]})),n;if(arguments.length<2){if(Array.isArray(t)){for(const e of t){const t=e;n[e]=this.node.style.getPropertyValue(t)}return n}if("string"==typeof t)return this.node.style.getPropertyValue(t);if("object"==typeof t)for(const e in t)this.node.style.setProperty(e,null==t[e]||Z.test(t[e])?"":t[e])}return 2===arguments.length&&this.node.style.setProperty(t,null==e||Z.test(e)?"":e),this},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},visible:function(){return"none"!==this.css("display")}}),n("Dom",{data:function(t,e,n){if(null==t)return this.data(s(o(this.node.attributes,(t=>0===t.nodeName.indexOf("data-"))),(t=>t.nodeName.slice(5))));if(t instanceof Array){const e={};for(const n of t)e[n]=this.data(n);return e}if("object"==typeof t)for(e in t)this.data(e,t[e]);else if(arguments.length<2)try{return JSON.parse(this.attr("data-"+t))}catch(e){return this.attr("data-"+t)}else this.attr("data-"+t,null===e?null:!0===n||"string"==typeof e||"number"==typeof e?e:JSON.stringify(e));return this}}),n("Dom",{remember:function(t,e){if("object"==typeof arguments[0])for(const e in t)this.remember(e,t[e]);else{if(1===arguments.length)return this.memory()[t];this.memory()[t]=e}return this},forget:function(){if(0===arguments.length)this._memory={};else for(let t=arguments.length-1;t>=0;t--)delete this.memory()[arguments[t]];return this},memory:function(){return this._memory=this._memory||{}}});class ht{constructor(...t){this.init(...t)}static isColor(t){return t&&(t instanceof ht||this.isRgb(t)||this.test(t))}static isRgb(t){return t&&"number"==typeof t.r&&"number"==typeof t.g&&"number"==typeof t.b}static random(t="vibrant",e){const{random:n,round:i,sin:r,PI:s}=Math;if("vibrant"===t){const t=24*n()+57,e=38*n()+45,i=360*n();return new ht(t,e,i,"lch")}if("sine"===t){const t=i(80*r(2*s*(e=null==e?n():e)/.5+.01)+150),o=i(50*r(2*s*e/.5+4.6)+200),h=i(100*r(2*s*e/.5+2.3)+150);return new ht(t,o,h)}if("pastel"===t){const t=8*n()+86,e=17*n()+9,i=360*n();return new ht(t,e,i,"lch")}if("dark"===t){const t=10+10*n(),e=50*n()+86,i=360*n();return new ht(t,e,i,"lch")}if("rgb"===t){const t=255*n(),e=255*n(),i=255*n();return new ht(t,e,i)}if("lab"===t){const t=100*n(),e=256*n()-128,i=256*n()-128;return new ht(t,e,i,"lab")}if("grey"===t){const t=255*n();return new ht(t,t,t)}throw new Error("Unsupported random color mode")}static test(t){return"string"==typeof t&&(Q.test(t)||J.test(t))}cmyk(){const{_a:t,_b:e,_c:n}=this.rgb(),[i,r,s]=[t,e,n].map((t=>t/255)),o=Math.min(1-i,1-r,1-s);if(1===o)return new ht(0,0,0,1,"cmyk");return new ht((1-i-o)/(1-o),(1-r-o)/(1-o),(1-s-o)/(1-o),o,"cmyk")}hsl(){const{_a:t,_b:e,_c:n}=this.rgb(),[i,r,s]=[t,e,n].map((t=>t/255)),o=Math.max(i,r,s),h=Math.min(i,r,s),u=(o+h)/2,a=o===h,l=o-h;return new ht(360*(a?0:o===i?((r-s)/l+(r<s?6:0))/6:o===r?((s-i)/l+2)/6:o===s?((i-r)/l+4)/6:0),100*(a?0:u>.5?l/(2-o-h):l/(o+h)),100*u,"hsl")}init(t=0,e=0,n=0,i=0,r="rgb"){if(t=t||0,this.space)for(const t in this.space)delete this[this.space[t]];if("number"==typeof t)r="string"==typeof i?i:r,i="string"==typeof i?0:i,Object.assign(this,{_a:t,_b:e,_c:n,_d:i,space:r});else if(t instanceof Array)this.space=e||("string"==typeof t[3]?t[3]:t[4])||"rgb",Object.assign(this,{_a:t[0],_b:t[1],_c:t[2],_d:t[3]||0});else if(t instanceof Object){const n=function(t,e){const n=st(t,"rgb")?{_a:t.r,_b:t.g,_c:t.b,_d:0,space:"rgb"}:st(t,"xyz")?{_a:t.x,_b:t.y,_c:t.z,_d:0,space:"xyz"}:st(t,"hsl")?{_a:t.h,_b:t.s,_c:t.l,_d:0,space:"hsl"}:st(t,"lab")?{_a:t.l,_b:t.a,_c:t.b,_d:0,space:"lab"}:st(t,"lch")?{_a:t.l,_b:t.c,_c:t.h,_d:0,space:"lch"}:st(t,"cmyk")?{_a:t.c,_b:t.m,_c:t.y,_d:t.k,space:"cmyk"}:{_a:0,_b:0,_c:0,space:"rgb"};return n.space=e||n.space,n}(t,e);Object.assign(this,n)}else if("string"==typeof t)if(J.test(t)){const e=t.replace(W,""),[n,i,r]=V.exec(e).slice(1,4).map((t=>parseInt(t)));Object.assign(this,{_a:n,_b:i,_c:r,_d:0,space:"rgb"})}else{if(!Q.test(t))throw Error("Unsupported string format, can't construct Color");{const e=t=>parseInt(t,16),[,n,i,r]=H.exec(function(t){return 4===t.length?["#",t.substring(1,2),t.substring(1,2),t.substring(2,3),t.substring(2,3),t.substring(3,4),t.substring(3,4)].join(""):t}(t)).map(e);Object.assign(this,{_a:n,_b:i,_c:r,_d:0,space:"rgb"})}}const{_a:s,_b:o,_c:h,_d:u}=this,a="rgb"===this.space?{r:s,g:o,b:h}:"xyz"===this.space?{x:s,y:o,z:h}:"hsl"===this.space?{h:s,s:o,l:h}:"lab"===this.space?{l:s,a:o,b:h}:"lch"===this.space?{l:s,c:o,h:h}:"cmyk"===this.space?{c:s,m:o,y:h,k:u}:{};Object.assign(this,a)}lab(){const{x:t,y:e,z:n}=this.xyz();return new ht(116*e-16,500*(t-e),200*(e-n),"lab")}lch(){const{l:t,a:e,b:n}=this.lab(),i=Math.sqrt(e**2+n**2);let r=180*Math.atan2(n,e)/Math.PI;r<0&&(r*=-1,r=360-r);return new ht(t,i,r,"lch")}rgb(){if("rgb"===this.space)return this;if("lab"===(t=this.space)||"xyz"===t||"lch"===t){let{x:t,y:e,z:n}=this;if("lab"===this.space||"lch"===this.space){let{l:i,a:r,b:s}=this;if("lch"===this.space){const{c:t,h:e}=this,n=Math.PI/180;r=t*Math.cos(n*e),s=t*Math.sin(n*e)}const o=(i+16)/116,h=r/500+o,u=o-s/200,a=16/116,l=.008856,c=7.787;t=.95047*(h**3>l?h**3:(h-a)/c),e=1*(o**3>l?o**3:(o-a)/c),n=1.08883*(u**3>l?u**3:(u-a)/c)}const i=3.2406*t+-1.5372*e+-.4986*n,r=-.9689*t+1.8758*e+.0415*n,s=.0557*t+-.204*e+1.057*n,o=Math.pow,h=.0031308,u=i>h?1.055*o(i,1/2.4)-.055:12.92*i,a=r>h?1.055*o(r,1/2.4)-.055:12.92*r,l=s>h?1.055*o(s,1/2.4)-.055:12.92*s;return new ht(255*u,255*a,255*l)}if("hsl"===this.space){let{h:t,s:e,l:n}=this;if(t/=360,e/=100,n/=100,0===e){n*=255;return new ht(n,n,n)}const i=n<.5?n*(1+e):n+e-n*e,r=2*n-i,s=255*ot(r,i,t+1/3),o=255*ot(r,i,t),h=255*ot(r,i,t-1/3);return new ht(s,o,h)}if("cmyk"===this.space){const{c:t,m:e,y:n,k:i}=this,r=255*(1-Math.min(1,t*(1-i)+i)),s=255*(1-Math.min(1,e*(1-i)+i)),o=255*(1-Math.min(1,n*(1-i)+i));return new ht(r,s,o)}return this;var t}toArray(){const{_a:t,_b:e,_c:n,_d:i,space:r}=this;return[t,e,n,i,r]}toHex(){const[t,e,n]=this._clamped().map(rt);return`#${t}${e}${n}`}toRgb(){const[t,e,n]=this._clamped();return`rgb(${t},${e},${n})`}toString(){return this.toHex()}xyz(){const{_a:t,_b:e,_c:n}=this.rgb(),[i,r,s]=[t,e,n].map((t=>t/255)),o=i>.04045?Math.pow((i+.055)/1.055,2.4):i/12.92,h=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92,u=s>.04045?Math.pow((s+.055)/1.055,2.4):s/12.92,a=(.4124*o+.3576*h+.1805*u)/.95047,l=(.2126*o+.7152*h+.0722*u)/1,c=(.0193*o+.1192*h+.9505*u)/1.08883,f=a>.008856?Math.pow(a,1/3):7.787*a+16/116,d=l>.008856?Math.pow(l,1/3):7.787*l+16/116,m=c>.008856?Math.pow(c,1/3):7.787*c+16/116;return new ht(f,d,m,"xyz")}_clamped(){const{_a:t,_b:e,_c:n}=this.rgb(),{max:i,min:r,round:s}=Math;return[t,e,n].map((t=>i(0,r(s(t),255))))}}class ut{constructor(...t){this.init(...t)}clone(){return new ut(this)}init(t,e){const n=0,i=0,r=Array.isArray(t)?{x:t[0],y:t[1]}:"object"==typeof t?{x:t.x,y:t.y}:{x:t,y:e};return this.x=null==r.x?n:r.x,this.y=null==r.y?i:r.y,this}toArray(){return[this.x,this.y]}transform(t){return this.clone().transformO(t)}transformO(t){lt.isMatrixLike(t)||(t=new lt(t));const{x:e,y:n}=this;return this.x=t.a*e+t.c*n+t.e,this.y=t.b*e+t.d*n+t.f,this}}function at(t,e,n){return Math.abs(e-t)<1e-6}class lt{constructor(...t){this.init(...t)}static formatTransforms(t){const e="both"===t.flip||!0===t.flip,n=t.flip&&(e||"x"===t.flip)?-1:1,i=t.flip&&(e||"y"===t.flip)?-1:1,r=t.skew&&t.skew.length?t.skew[0]:isFinite(t.skew)?t.skew:isFinite(t.skewX)?t.skewX:0,s=t.skew&&t.skew.length?t.skew[1]:isFinite(t.skew)?t.skew:isFinite(t.skewY)?t.skewY:0,o=t.scale&&t.scale.length?t.scale[0]*n:isFinite(t.scale)?t.scale*n:isFinite(t.scaleX)?t.scaleX*n:n,h=t.scale&&t.scale.length?t.scale[1]*i:isFinite(t.scale)?t.scale*i:isFinite(t.scaleY)?t.scaleY*i:i,u=t.shear||0,a=t.rotate||t.theta||0,l=new ut(t.origin||t.around||t.ox||t.originX,t.oy||t.originY),c=l.x,f=l.y,d=new ut(t.position||t.px||t.positionX||NaN,t.py||t.positionY||NaN),m=d.x,p=d.y,y=new ut(t.translate||t.tx||t.translateX,t.ty||t.translateY),w=y.x,g=y.y,_=new ut(t.relative||t.rx||t.relativeX,t.ry||t.relativeY);return{scaleX:o,scaleY:h,skewX:r,skewY:s,shear:u,theta:a,rx:_.x,ry:_.y,tx:w,ty:g,ox:c,oy:f,px:m,py:p}}static fromArray(t){return{a:t[0],b:t[1],c:t[2],d:t[3],e:t[4],f:t[5]}}static isMatrixLike(t){return null!=t.a||null!=t.b||null!=t.c||null!=t.d||null!=t.e||null!=t.f}static matrixMultiply(t,e,n){const i=t.a*e.a+t.c*e.b,r=t.b*e.a+t.d*e.b,s=t.a*e.c+t.c*e.d,o=t.b*e.c+t.d*e.d,h=t.e+t.a*e.e+t.c*e.f,u=t.f+t.b*e.e+t.d*e.f;return n.a=i,n.b=r,n.c=s,n.d=o,n.e=h,n.f=u,n}around(t,e,n){return this.clone().aroundO(t,e,n)}aroundO(t,e,n){const i=t||0,r=e||0;return this.translateO(-i,-r).lmultiplyO(n).translateO(i,r)}clone(){return new lt(this)}decompose(t=0,e=0){const n=this.a,i=this.b,r=this.c,s=this.d,o=this.e,h=this.f,u=n*s-i*r,a=u>0?1:-1,l=a*Math.sqrt(n*n+i*i),c=Math.atan2(a*i,a*n),f=180/Math.PI*c,d=Math.cos(c),m=Math.sin(c),p=(n*r+i*s)/u,y=r*l/(p*n-i)||s*l/(p*i+n);return{scaleX:l,scaleY:y,shear:p,rotate:f,translateX:o-t+t*d*l+e*(p*d*l-m*y),translateY:h-e+t*m*l+e*(p*m*l+d*y),originX:t,originY:e,a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f}}equals(t){if(t===this)return!0;const e=new lt(t);return at(this.a,e.a)&&at(this.b,e.b)&&at(this.c,e.c)&&at(this.d,e.d)&&at(this.e,e.e)&&at(this.f,e.f)}flip(t,e){return this.clone().flipO(t,e)}flipO(t,e){return"x"===t?this.scaleO(-1,1,e,0):"y"===t?this.scaleO(1,-1,0,e):this.scaleO(-1,-1,t,e||t)}init(t){const e=lt.fromArray([1,0,0,1,0,0]);return t=t instanceof Element?t.matrixify():"string"==typeof t?lt.fromArray(t.split(et).map(parseFloat)):Array.isArray(t)?lt.fromArray(t):"object"==typeof t&&lt.isMatrixLike(t)?t:"object"==typeof t?(new lt).transform(t):6===arguments.length?lt.fromArray([].slice.call(arguments)):e,this.a=null!=t.a?t.a:e.a,this.b=null!=t.b?t.b:e.b,this.c=null!=t.c?t.c:e.c,this.d=null!=t.d?t.d:e.d,this.e=null!=t.e?t.e:e.e,this.f=null!=t.f?t.f:e.f,this}inverse(){return this.clone().inverseO()}inverseO(){const t=this.a,e=this.b,n=this.c,i=this.d,r=this.e,s=this.f,o=t*i-e*n;if(!o)throw new Error("Cannot invert "+this);const h=i/o,u=-e/o,a=-n/o,l=t/o,c=-(h*r+a*s),f=-(u*r+l*s);return this.a=h,this.b=u,this.c=a,this.d=l,this.e=c,this.f=f,this}lmultiply(t){return this.clone().lmultiplyO(t)}lmultiplyO(t){const e=t instanceof lt?t:new lt(t);return lt.matrixMultiply(e,this,this)}multiply(t){return this.clone().multiplyO(t)}multiplyO(t){const e=t instanceof lt?t:new lt(t);return lt.matrixMultiply(this,e,this)}rotate(t,e,n){return this.clone().rotateO(t,e,n)}rotateO(t,e=0,n=0){t=h(t);const i=Math.cos(t),r=Math.sin(t),{a:s,b:o,c:u,d:a,e:l,f:c}=this;return this.a=s*i-o*r,this.b=o*i+s*r,this.c=u*i-a*r,this.d=a*i+u*r,this.e=l*i-c*r+n*r-e*i+e,this.f=c*i+l*r-e*r-n*i+n,this}scale(){return this.clone().scaleO(...arguments)}scaleO(t,e=t,n=0,i=0){3===arguments.length&&(i=n,n=e,e=t);const{a:r,b:s,c:o,d:h,e:u,f:a}=this;return this.a=r*t,this.b=s*e,this.c=o*t,this.d=h*e,this.e=u*t-n*t+n,this.f=a*e-i*e+i,this}shear(t,e,n){return this.clone().shearO(t,e,n)}shearO(t,e=0,n=0){const{a:i,b:r,c:s,d:o,e:h,f:u}=this;return this.a=i+r*t,this.c=s+o*t,this.e=h+u*t-n*t,this}skew(){return this.clone().skewO(...arguments)}skewO(t,e=t,n=0,i=0){3===arguments.length&&(i=n,n=e,e=t),t=h(t),e=h(e);const r=Math.tan(t),s=Math.tan(e),{a:o,b:u,c:a,d:l,e:c,f:f}=this;return this.a=o+u*r,this.b=u+o*s,this.c=a+l*r,this.d=l+a*s,this.e=c+f*r-i*r,this.f=f+c*s-n*s,this}skewX(t,e,n){return this.skew(t,0,e,n)}skewY(t,e,n){return this.skew(0,t,e,n)}toArray(){return[this.a,this.b,this.c,this.d,this.e,this.f]}toString(){return"matrix("+this.a+","+this.b+","+this.c+","+this.d+","+this.e+","+this.f+")"}transform(t){if(lt.isMatrixLike(t)){return new lt(t).multiplyO(this)}const e=lt.formatTransforms(t),{x:n,y:i}=new ut(e.ox,e.oy).transform(this),r=(new lt).translateO(e.rx,e.ry).lmultiplyO(this).translateO(-n,-i).scaleO(e.scaleX,e.scaleY).skewO(e.skewX,e.skewY).shearO(e.shear).rotateO(e.theta).translateO(n,i);if(isFinite(e.px)||isFinite(e.py)){const t=new ut(n,i).transform(r),s=isFinite(e.px)?e.px-t.x:0,o=isFinite(e.py)?e.py-t.y:0;r.translateO(s,o)}return r.translateO(e.tx,e.ty),r}translate(t,e){return this.clone().translateO(t,e)}translateO(t,e){return this.e+=t||0,this.f+=e||0,this}valueOf(){return{a:this.a,b:this.b,c:this.c,d:this.d,e:this.e,f:this.f}}}function ct(){if(!ct.nodes){const t=j().size(2,0);t.node.style.cssText=["opacity: 0","position: absolute","left: -100%","top: -100%","overflow: hidden"].join(";"),t.attr("focusable","false"),t.attr("aria-hidden","true");const e=t.path().node;ct.nodes={svg:t,path:e}}if(!ct.nodes.svg.node.parentNode){const t=b.document.body||b.document.documentElement;ct.nodes.svg.addTo(t)}return ct.nodes}function ft(t){return!(t.width||t.height||t.x||t.y)}P(lt,"Matrix");class dt{constructor(...t){this.init(...t)}addOffset(){return this.x+=b.window.pageXOffset,this.y+=b.window.pageYOffset,new dt(this)}init(t){return t="string"==typeof t?t.split(et).map(parseFloat):Array.isArray(t)?t:"object"==typeof t?[null!=t.left?t.left:t.x,null!=t.top?t.top:t.y,t.width,t.height]:4===arguments.length?[].slice.call(arguments):[0,0,0,0],this.x=t[0]||0,this.y=t[1]||0,this.width=this.w=t[2]||0,this.height=this.h=t[3]||0,this.x2=this.x+this.w,this.y2=this.y+this.h,this.cx=this.x+this.w/2,this.cy=this.y+this.h/2,this}isNulled(){return ft(this)}merge(t){const e=Math.min(this.x,t.x),n=Math.min(this.y,t.y),i=Math.max(this.x+this.width,t.x+t.width)-e,r=Math.max(this.y+this.height,t.y+t.height)-n;return new dt(e,n,i,r)}toArray(){return[this.x,this.y,this.width,this.height]}toString(){return this.x+" "+this.y+" "+this.width+" "+this.height}transform(t){t instanceof lt||(t=new lt(t));let e=1/0,n=-1/0,i=1/0,r=-1/0;return[new ut(this.x,this.y),new ut(this.x2,this.y),new ut(this.x,this.y2),new ut(this.x2,this.y2)].forEach((function(s){s=s.transform(t),e=Math.min(e,s.x),n=Math.max(n,s.x),i=Math.min(i,s.y),r=Math.max(r,s.y)})),new dt(e,i,n-e,r-i)}}function mt(t,e,n){let i;try{if(i=e(t.node),ft(i)&&((r=t.node)!==b.document&&!(b.document.documentElement.contains||function(t){for(;t.parentNode;)t=t.parentNode;return t===b.document}).call(b.document.documentElement,r)))throw new Error("Element not in the dom")}catch(e){i=n(t)}var r;return i}n({viewbox:{viewbox(t,e,n,i){return null==t?new dt(this.attr("viewBox")):this.attr("viewBox",new dt(t,e,n,i))},zoom(t,e){let{width:n,height:i}=this.attr(["width","height"]);if((n||i)&&"string"!=typeof n&&"string"!=typeof i||(n=this.node.clientWidth,i=this.node.clientHeight),!n||!i)throw new Error("Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element");const r=this.viewbox(),s=n/r.width,o=i/r.height,h=Math.min(s,o);if(null==t)return h;let u=h/t;u===1/0&&(u=Number.MAX_SAFE_INTEGER/100),e=e||new ut(n/2/s+r.x,i/2/o+r.y);const a=new dt(r).transform(new lt({scale:u,origin:e}));return this.viewbox(a)}}}),P(dt,"Box");class pt extends Array{constructor(t=[],...e){if(super(t,...e),"number"==typeof t)return this;this.length=0,this.push(...t)}}X([pt],{each(t,...e){return"function"==typeof t?this.map(((e,n,i)=>t.call(e,e,n,i))):this.map((n=>n[t](...e)))},toArray(){return Array.prototype.concat.apply([],this)}});const yt=["toArray","constructor","each"];function wt(t,e){return new pt(s((e||b.document).querySelectorAll(t),(function(t){return I(t)})))}pt.extend=function(t){t=t.reduce(((t,e)=>(yt.includes(e)||"_"===e[0]||(e in Array.prototype&&(t["$"+e]=Array.prototype[e]),t[e]=function(...t){return this.each(e,...t)}),t)),{}),X([pt],t)};let gt=0;const _t={};function xt(t){let e=t.getEventHolder();return e===b.window&&(e=_t),e.events||(e.events={}),e.events}function bt(t){return t.getEventTarget()}function vt(t){let e=t.getEventHolder();e===b.window&&(e=_t),e.events&&(e.events={})}function Mt(t,e,n,i,r){const s=n.bind(i||t),o=j(t),h=xt(o),u=bt(o);e=Array.isArray(e)?e:e.split(et),n._svgjsListenerId||(n._svgjsListenerId=++gt),e.forEach((function(t){const e=t.split(".")[0],i=t.split(".")[1]||"*";h[e]=h[e]||{},h[e][i]=h[e][i]||{},h[e][i][n._svgjsListenerId]=s,u.addEventListener(e,s,r||!1)}))}function At(t,e,n,i){const r=j(t),s=xt(r),o=bt(r);("function"!=typeof n||(n=n._svgjsListenerId))&&(e=Array.isArray(e)?e:(e||"").split(et)).forEach((function(t){const e=t&&t.split(".")[0],h=t&&t.split(".")[1];let u,a;if(n)s[e]&&s[e][h||"*"]&&(o.removeEventListener(e,s[e][h||"*"][n],i||!1),delete s[e][h||"*"][n]);else if(e&&h){if(s[e]&&s[e][h]){for(a in s[e][h])At(o,[e,h].join("."),a);delete s[e][h]}}else if(h)for(t in s)for(u in s[t])h===u&&At(o,[t,h].join("."));else if(e){if(s[e]){for(u in s[e])At(o,[e,u].join("."));delete s[e]}}else{for(t in s)At(o,t);vt(r)}}))}function Ot(t,e,n,i){const r=bt(t);return e instanceof b.window.Event||(e=new b.window.CustomEvent(e,{detail:n,cancelable:!0,...i})),r.dispatchEvent(e),e}class kt extends C{addEventListener(){}dispatch(t,e,n){return Ot(this,t,e,n)}dispatchEvent(t){const e=this.getEventHolder().events;if(!e)return!0;const n=e[t.type];for(const e in n)for(const i in n[e])n[e][i](t);return!t.defaultPrevented}fire(t,e,n){return this.dispatch(t,e,n),this}getEventHolder(){return this}getEventTarget(){return this}off(t,e,n){return At(this,t,e,n),this}on(t,e,n,i){return Mt(this,t,e,n,i),this}removeEventListener(){}}function Tt(){}P(kt,"EventTarget");const Ct={duration:400,ease:">",delay:0},Nt={"fill-opacity":1,"stroke-opacity":1,"stroke-width":0,"stroke-linejoin":"miter","stroke-linecap":"butt",fill:"#000000",stroke:"#000000",opacity:1,x:0,y:0,cx:0,cy:0,width:0,height:0,r:0,rx:0,ry:0,offset:0,"stop-opacity":1,"stop-color":"#000000","text-anchor":"start"};var St={__proto__:null,attrs:Nt,noop:Tt,timeline:Ct};class Et extends Array{constructor(...t){super(...t),this.init(...t)}clone(){return new this.constructor(this)}init(t){return"number"==typeof t||(this.length=0,this.push(...this.parse(t))),this}parse(t=[]){return t instanceof Array?t:t.trim().split(et).map(parseFloat)}toArray(){return Array.prototype.concat.apply([],this)}toSet(){return new Set(this)}toString(){return this.join(" ")}valueOf(){const t=[];return t.push(...this),t}}class jt{constructor(...t){this.init(...t)}convert(t){return new jt(this.value,t)}divide(t){return t=new jt(t),new jt(this/t,this.unit||t.unit)}init(t,e){return e=Array.isArray(t)?t[1]:e,t=Array.isArray(t)?t[0]:t,this.value=0,this.unit=e||"","number"==typeof t?this.value=isNaN(t)?0:isFinite(t)?t:t<0?-34e37:34e37:"string"==typeof t?(e=t.match(B))&&(this.value=parseFloat(e[1]),"%"===e[5]?this.value/=100:"s"===e[5]&&(this.value*=1e3),this.unit=e[5]):t instanceof jt&&(this.value=t.valueOf(),this.unit=t.unit),this}minus(t){return t=new jt(t),new jt(this-t,this.unit||t.unit)}plus(t){return t=new jt(t),new jt(this+t,this.unit||t.unit)}times(t){return t=new jt(t),new jt(this*t,this.unit||t.unit)}toArray(){return[this.value,this.unit]}toJSON(){return this.toString()}toString(){return("%"===this.unit?~~(1e8*this.value)/1e6:"s"===this.unit?this.value/1e3:this.value)+this.unit}valueOf(){return this.value}}const Dt=new Set(["fill","stroke","color","bgcolor","stop-color","flood-color","lighting-color"]),It=[];class Dom extends kt{constructor(t,e){super(),this.node=t,this.type=t.nodeName,e&&t!==e&&this.attr(e)}add(t,e){return(t=j(t)).removeNamespace&&this.node instanceof b.window.SVGElement&&t.removeNamespace(),null==e?this.node.appendChild(t.node):t.node!==this.node.childNodes[e]&&this.node.insertBefore(t.node,this.node.childNodes[e]),this}addTo(t,e){return j(t).put(this,e)}children(){return new pt(s(this.node.children,(function(t){return I(t)})))}clear(){for(;this.node.hasChildNodes();)this.node.removeChild(this.node.lastChild);return this}clone(t=!0,e=!0){this.writeDataToDom();let n=this.node.cloneNode(t);return e&&(n=F(n)),new this.constructor(n)}each(t,e){const n=this.children();let i,r;for(i=0,r=n.length;i<r;i++)t.apply(n[i],[i,n]),e&&n[i].each(t,e);return this}element(t,e){return this.put(new Dom(E(t),e))}first(){return I(this.node.firstChild)}get(t){return I(this.node.childNodes[t])}getEventHolder(){return this.node}getEventTarget(){return this.node}has(t){return this.index(t)>=0}html(t,e){return this.xml(t,e,w)}id(t){return void 0!==t||this.node.id||(this.node.id=q(this.type)),this.attr("id",t)}index(t){return[].slice.call(this.node.childNodes).indexOf(t.node)}last(){return I(this.node.lastChild)}matches(t){const e=this.node,n=e.matches||e.matchesSelector||e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.oMatchesSelector||null;return n&&n.call(e,t)}parent(t){let e=this;if(!e.node.parentNode)return null;if(e=I(e.node.parentNode),!t)return e;do{if("string"==typeof t?e.matches(t):e instanceof t)return e}while(e=I(e.node.parentNode));return e}put(t,e){return t=j(t),this.add(t,e),t}putIn(t,e){return j(t).add(this,e)}remove(){return this.parent()&&this.parent().removeElement(this),this}removeElement(t){return this.node.removeChild(t.node),this}replace(t){return t=j(t),this.node.parentNode&&this.node.parentNode.replaceChild(t.node,this.node),t}round(t=2,e=null){const n=10**t,i=this.attr(e);for(const t in i)"number"==typeof i[t]&&(i[t]=Math.round(i[t]*n)/n);return this.attr(i),this}svg(t,e){return this.xml(t,e,y)}toString(){return this.id()}words(t){return this.node.textContent=t,this}wrap(t){const e=this.parent();if(!e)return this.addTo(t);const n=e.index(this);return e.put(t,n).put(this)}writeDataToDom(){return this.each((function(){this.writeDataToDom()})),this}xml(t,e,n){if("boolean"==typeof t&&(n=e,e=t,t=null),null==t||"function"==typeof t){e=null==e||e,this.writeDataToDom();let n=this;if(null!=t){if(n=I(n.node.cloneNode(!0)),e){const e=t(n);if(n=e||n,!1===e)return""}n.each((function(){const e=t(this),n=e||this;!1===e?this.remove():e&&this!==n&&this.replace(n)}),!0)}return e?n.node.outerHTML:n.node.innerHTML}e=null!=e&&e;const i=E("wrapper",n),r=b.document.createDocumentFragment();i.innerHTML=t;for(let t=i.children.length;t--;)r.appendChild(i.firstElementChild);const s=this.parent();return e?this.replace(r)&&s:this.add(r)}}X(Dom,{attr:function(t,e,n){if(null==t){t={},e=this.node.attributes;for(const n of e)t[n.nodeName]=K.test(n.nodeValue)?parseFloat(n.nodeValue):n.nodeValue;return t}if(t instanceof Array)return t.reduce(((t,e)=>(t[e]=this.attr(e),t)),{});if("object"==typeof t&&t.constructor===Object)for(e in t)this.attr(e,t[e]);else if(null===e)this.node.removeAttribute(t);else{if(null==e)return null==(e=this.node.getAttribute(t))?Nt[t]:K.test(e)?parseFloat(e):e;"number"==typeof(e=It.reduce(((e,n)=>n(t,e,this)),e))?e=new jt(e):Dt.has(t)&&ht.isColor(e)?e=new ht(e):e.constructor===Array&&(e=new Et(e)),"leading"===t?this.leading&&this.leading(e):"string"==typeof n?this.node.setAttributeNS(n,t,e.toString()):this.node.setAttribute(t,e.toString()),!this.rebuild||"font-size"!==t&&"x"!==t||this.rebuild()}return this},find:function(t){return wt(t,this.node)},findOne:function(t){return I(this.node.querySelector(t))}}),P(Dom,"Dom");class Element extends Dom{constructor(t,e){super(t,e),this.dom={},this.node.instance=this,(t.hasAttribute("data-svgjs")||t.hasAttribute("svgjs:data"))&&this.setData(JSON.parse(t.getAttribute("data-svgjs"))??JSON.parse(t.getAttribute("svgjs:data"))??{})}center(t,e){return this.cx(t).cy(e)}cx(t){return null==t?this.x()+this.width()/2:this.x(t-this.width()/2)}cy(t){return null==t?this.y()+this.height()/2:this.y(t-this.height()/2)}defs(){const t=this.root();return t&&t.defs()}dmove(t,e){return this.dx(t).dy(e)}dx(t=0){return this.x(new jt(t).plus(this.x()))}dy(t=0){return this.y(new jt(t).plus(this.y()))}getEventHolder(){return this}height(t){return this.attr("height",t)}move(t,e){return this.x(t).y(e)}parents(t=this.root()){const e="string"==typeof t;e||(t=j(t));const n=new pt;let i=this;for(;(i=i.parent())&&i.node!==b.document&&"#document-fragment"!==i.nodeName&&(n.push(i),e||i.node!==t.node)&&(!e||!i.matches(t));)if(i.node===this.root().node)return null;return n}reference(t){if(!(t=this.attr(t)))return null;const e=(t+"").match($);return e?j(e[1]):null}root(){const t=this.parent(R(S));return t&&t.root()}setData(t){return this.dom=t,this}size(t,e){const n=l(this,t,e);return this.width(new jt(n.width)).height(new jt(n.height))}width(t){return this.attr("width",t)}writeDataToDom(){return m(this,this.dom),super.writeDataToDom()}x(t){return this.attr("x",t)}y(t){return this.attr("y",t)}}X(Element,{bbox:function(){const t=mt(this,(t=>t.getBBox()),(t=>{try{const e=t.clone().addTo(ct().svg).show(),n=e.node.getBBox();return e.remove(),n}catch(e){throw new Error(`Getting bbox of element "${t.node.nodeName}" is not possible: ${e.toString()}`)}}));return new dt(t)},rbox:function(t){const e=mt(this,(t=>t.getBoundingClientRect()),(t=>{throw new Error(`Getting rbox of element "${t.node.nodeName}" is not possible`)})),n=new dt(e);return t?n.transform(t.screenCTM().inverseO()):n.addOffset()},inside:function(t,e){const n=this.bbox();return t>n.x&&e>n.y&&t<n.x+n.width&&e<n.y+n.height},point:function(t,e){return new ut(t,e).transformO(this.screenCTM().inverseO())},ctm:function(){return new lt(this.node.getCTM())},screenCTM:function(){try{if("function"==typeof this.isRoot&&!this.isRoot()){const t=this.rect(1,1),e=t.node.getScreenCTM();return t.remove(),new lt(e)}return new lt(this.node.getScreenCTM())}catch(t){return console.warn(`Cannot get CTM from SVG node ${this.node.nodeName}. Is the element rendered?`),new lt}}}),P(Element,"Element");const zt={stroke:["color","width","opacity","linecap","linejoin","miterlimit","dasharray","dashoffset"],fill:["color","opacity","rule"],prefix:function(t,e){return"color"===e?t:t+"-"+e}};["fill","stroke"].forEach((function(t){const e={};let i;e[t]=function(e){if(void 0===e)return this.attr(t);if("string"==typeof e||e instanceof ht||ht.isRgb(e)||e instanceof Element)this.attr(t,e);else for(i=zt[t].length-1;i>=0;i--)null!=e[zt[t][i]]&&this.attr(zt.prefix(t,zt[t][i]),e[zt[t][i]]);return this},n(["Element","Runner"],e)})),n(["Element","Runner"],{matrix:function(t,e,n,i,r,s){return null==t?new lt(this):this.attr("transform",new lt(t,e,n,i,r,s))},rotate:function(t,e,n){return this.transform({rotate:t,ox:e,oy:n},!0)},skew:function(t,e,n,i){return 1===arguments.length||3===arguments.length?this.transform({skew:t,ox:e,oy:n},!0):this.transform({skew:[t,e],ox:n,oy:i},!0)},shear:function(t,e,n){return this.transform({shear:t,ox:e,oy:n},!0)},scale:function(t,e,n,i){return 1===arguments.length||3===arguments.length?this.transform({scale:t,ox:e,oy:n},!0):this.transform({scale:[t,e],ox:n,oy:i},!0)},translate:function(t,e){return this.transform({translate:[t,e]},!0)},relative:function(t,e){return this.transform({relative:[t,e]},!0)},flip:function(t="both",e="center"){return-1==="xybothtrue".indexOf(t)&&(e=t,t="both"),this.transform({flip:t,origin:e},!0)},opacity:function(t){return this.attr("opacity",t)}}),n("radius",{radius:function(t,e=t){return"radialGradient"===(this._element||this).type?this.attr("r",new jt(t)):this.rx(t).ry(e)}}),n("Path",{length:function(){return this.node.getTotalLength()},pointAt:function(t){return new ut(this.node.getPointAtLength(t))}}),n(["Element","Runner"],{font:function(t,e){if("object"==typeof t){for(e in t)this.font(e,t[e]);return this}return"leading"===t?this.leading(e):"anchor"===t?this.attr("text-anchor",e):"size"===t||"family"===t||"weight"===t||"stretch"===t||"variant"===t||"style"===t?this.attr("font-"+t,e):this.attr(t,e)}});n("Element",["click","dblclick","mousedown","mouseup","mouseover","mouseout","mousemove","mouseenter","mouseleave","touchstart","touchmove","touchleave","touchend","touchcancel","contextmenu","wheel","pointerdown","pointermove","pointerup","pointerleave","pointercancel"].reduce((function(t,e){return t[e]=function(t){return null===t?this.off(e):this.on(e,t),this},t}),{})),n("Element",{untransform:function(){return this.attr("transform",null)},matrixify:function(){const t=(this.attr("transform")||"").split(U).slice(0,-1).map((function(t){const e=t.trim().split("(");return[e[0],e[1].split(et).map((function(t){return parseFloat(t)}))]})).reverse().reduce((function(t,e){return"matrix"===e[0]?t.lmultiply(lt.fromArray(e[1])):t[e[0]].apply(t,e[1])}),new lt);return t},toParent:function(t,e){if(this===t)return this;if(d(this.node))return this.addTo(t,e);const n=this.screenCTM(),i=t.screenCTM().inverse();return this.addTo(t,e).untransform().transform(i.multiply(n)),this},toRoot:function(t){return this.toParent(this.root(),t)},transform:function(t,e){if(null==t||"string"==typeof t){const e=new lt(this).decompose();return null==t?e:e[t]}lt.isMatrixLike(t)||(t={...t,origin:c(t,this)});const n=new lt(!0===e?this:e||!1).transform(t);return this.attr("transform",n)}});class Container extends Element{flatten(){return this.each((function(){if(this instanceof Container)return this.flatten().ungroup()})),this}ungroup(t=this.parent(),e=t.index(this)){return e=-1===e?t.children().length:e,this.each((function(n,i){return i[i.length-n-1].toParent(t,e)})),this.remove()}}P(Container,"Container");class Defs extends Container{constructor(t,e=t){super(D("defs",t),e)}flatten(){return this}ungroup(){return this}}P(Defs,"Defs");class Shape extends Element{}function Pt(t){return this.attr("rx",t)}function Rt(t){return this.attr("ry",t)}function Lt(t){return null==t?this.cx()-this.rx():this.cx(t+this.rx())}function qt(t){return null==t?this.cy()-this.ry():this.cy(t+this.ry())}function Ft(t){return this.attr("cx",t)}function Xt(t){return this.attr("cy",t)}function Yt(t){return null==t?2*this.rx():this.rx(new jt(t).divide(2))}function Bt(t){return null==t?2*this.ry():this.ry(new jt(t).divide(2))}P(Shape,"Shape");var Gt={__proto__:null,cx:Ft,cy:Xt,height:Bt,rx:Pt,ry:Rt,width:Yt,x:Lt,y:qt};class Ellipse extends Shape{constructor(t,e=t){super(D("ellipse",t),e)}size(t,e){const n=l(this,t,e);return this.rx(new jt(n.width).divide(2)).ry(new jt(n.height).divide(2))}}X(Ellipse,Gt),n("Container",{ellipse:Y((function(t=0,e=t){return this.put(new Ellipse).size(t,e).move(0,0)}))}),P(Ellipse,"Ellipse");class Ht extends Dom{constructor(t=b.document.createDocumentFragment()){super(t)}xml(t,e,n){if("boolean"==typeof t&&(n=e,e=t,t=null),null==t||"function"==typeof t){const t=new Dom(E("wrapper",n));return t.add(this.node.cloneNode(!0)),t.xml(!1,n)}return super.xml(t,!1,n)}}function Vt(t,e){return"radialGradient"===(this._element||this).type?this.attr({fx:new jt(t),fy:new jt(e)}):this.attr({x1:new jt(t),y1:new jt(e)})}function $t(t,e){return"radialGradient"===(this._element||this).type?this.attr({cx:new jt(t),cy:new jt(e)}):this.attr({x2:new jt(t),y2:new jt(e)})}P(Ht,"Fragment");var Ut,Wt={__proto__:null,from:Vt,to:$t};class Gradient extends Container{constructor(t,e){super(D(t+"Gradient","string"==typeof t?null:t),e)}attr(t,e,n){return"transform"===t&&(t="gradientTransform"),super.attr(t,e,n)}bbox(){return new dt}targets(){return wt("svg [fill*="+this.id()+"]")}toString(){return this.url()}update(t){return this.clear(),"function"==typeof t&&t.call(this,this),this}url(){return"url(#"+this.id()+")"}}X(Gradient,Wt),n({Container:{gradient(...t){return this.defs().gradient(...t)}},Defs:{gradient:Y((function(t,e){return this.put(new Gradient(t)).update(e)}))}}),P(Gradient,"Gradient");class Pattern extends Container{constructor(t,e=t){super(D("pattern",t),e)}attr(t,e,n){return"transform"===t&&(t="patternTransform"),super.attr(t,e,n)}bbox(){return new dt}targets(){return wt("svg [fill*="+this.id()+"]")}toString(){return this.url()}update(t){return this.clear(),"function"==typeof t&&t.call(this,this),this}url(){return"url(#"+this.id()+")"}}n({Container:{pattern(...t){return this.defs().pattern(...t)}},Defs:{pattern:Y((function(t,e,n){return this.put(new Pattern).update(n).attr({x:0,y:0,width:t,height:e,patternUnits:"userSpaceOnUse"})}))}}),P(Pattern,"Pattern");class Image extends Shape{constructor(t,e=t){super(D("image",t),e)}load(t,e){if(!t)return this;const n=new b.window.Image;return Mt(n,"load",(function(t){const i=this.parent(Pattern);0===this.width()&&0===this.height()&&this.size(n.width,n.height),i instanceof Pattern&&0===i.width()&&0===i.height()&&i.size(this.width(),this.height()),"function"==typeof e&&e.call(this,t)}),this),Mt(n,"load error",(function(){At(n)})),this.attr("href",n.src=t,_)}}Ut=function(t,e,n){return"fill"!==t&&"stroke"!==t||tt.test(e)&&(e=n.root().defs().image(e)),e instanceof Image&&(e=n.root().defs().pattern(0,0,(t=>{t.add(e)}))),e},It.push(Ut),n({Container:{image:Y((function(t,e){return this.put(new Image).size(0,0).load(t,e)}))}}),P(Image,"Image");class Qt extends Et{bbox(){let t=-1/0,e=-1/0,n=1/0,i=1/0;return this.forEach((function(r){t=Math.max(r[0],t),e=Math.max(r[1],e),n=Math.min(r[0],n),i=Math.min(r[1],i)})),new dt(n,i,t-n,e-i)}move(t,e){const n=this.bbox();if(t-=n.x,e-=n.y,!isNaN(t)&&!isNaN(e))for(let n=this.length-1;n>=0;n--)this[n]=[this[n][0]+t,this[n][1]+e];return this}parse(t=[0,0]){const e=[];(t=t instanceof Array?Array.prototype.concat.apply([],t):t.trim().split(et).map(parseFloat)).length%2!=0&&t.pop();for(let n=0,i=t.length;n<i;n+=2)e.push([t[n],t[n+1]]);return e}size(t,e){let n;const i=this.bbox();for(n=this.length-1;n>=0;n--)i.width&&(this[n][0]=(this[n][0]-i.x)*t/i.width+i.x),i.height&&(this[n][1]=(this[n][1]-i.y)*e/i.height+i.y);return this}toLine(){return{x1:this[0][0],y1:this[0][1],x2:this[1][0],y2:this[1][1]}}toString(){const t=[];for(let e=0,n=this.length;e<n;e++)t.push(this[e].join(","));return t.join(" ")}transform(t){return this.clone().transformO(t)}transformO(t){lt.isMatrixLike(t)||(t=new lt(t));for(let e=this.length;e--;){const[n,i]=this[e];this[e][0]=t.a*n+t.c*i+t.e,this[e][1]=t.b*n+t.d*i+t.f}return this}}var Jt={__proto__:null,MorphArray:Qt,height:function(t){const e=this.bbox();return null==t?e.height:this.size(e.width,t)},width:function(t){const e=this.bbox();return null==t?e.width:this.size(t,e.height)},x:function(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)},y:function(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)}};class Line extends Shape{constructor(t,e=t){super(D("line",t),e)}array(){return new Qt([[this.attr("x1"),this.attr("y1")],[this.attr("x2"),this.attr("y2")]])}move(t,e){return this.attr(this.array().move(t,e).toLine())}plot(t,e,n,i){return null==t?this.array():(t=void 0!==e?{x1:t,y1:e,x2:n,y2:i}:new Qt(t).toLine(),this.attr(t))}size(t,e){const n=l(this,t,e);return this.attr(this.array().size(n.width,n.height).toLine())}}X(Line,Jt),n({Container:{line:Y((function(...t){return Line.prototype.plot.apply(this.put(new Line),null!=t[0]?t:[0,0,0,0])}))}}),P(Line,"Line");class Marker extends Container{constructor(t,e=t){super(D("marker",t),e)}height(t){return this.attr("markerHeight",t)}orient(t){return this.attr("orient",t)}ref(t,e){return this.attr("refX",t).attr("refY",e)}toString(){return"url(#"+this.id()+")"}update(t){return this.clear(),"function"==typeof t&&t.call(this,this),this}width(t){return this.attr("markerWidth",t)}}function Zt(t,e){return function(n){return null==n?this[t]:(this[t]=n,e&&e.call(this),this)}}n({Container:{marker(...t){return this.defs().marker(...t)}},Defs:{marker:Y((function(t,e,n){return this.put(new Marker).size(t,e).ref(t/2,e/2).viewbox(0,0,t,e).attr("orient","auto").update(n)}))},marker:{marker(t,e,n,i){let r=["marker"];return"all"!==t&&r.push(t),r=r.join("-"),t=arguments[1]instanceof Marker?arguments[1]:this.defs().marker(e,n,i),this.attr(r,t)}}}),P(Marker,"Marker");const Kt={"-":function(t){return t},"<>":function(t){return-Math.cos(t*Math.PI)/2+.5},">":function(t){return Math.sin(t*Math.PI/2)},"<":function(t){return 1-Math.cos(t*Math.PI/2)},bezier:function(t,e,n,i){return function(r){return r<0?t>0?e/t*r:n>0?i/n*r:0:r>1?n<1?(1-i)/(1-n)*r+(i-n)/(1-n):t<1?(1-e)/(1-t)*r+(e-t)/(1-t):1:3*r*(1-r)**2*e+3*r**2*(1-r)*i+r**3}},steps:function(t,e="end"){e=e.split("-").reverse()[0];let n=t;return"none"===e?--n:"both"===e&&++n,(i,r=!1)=>{let s=Math.floor(i*t);const o=i*s%1==0;return"start"!==e&&"both"!==e||++s,r&&o&&--s,i>=0&&s<0&&(s=0),i<=1&&s>n&&(s=n),s/n}}};class te{done(){return!1}}class ee extends te{constructor(t=Ct.ease){super(),this.ease=Kt[t]||t}step(t,e,n){return"number"!=typeof t?n<1?t:e:t+(e-t)*this.ease(n)}}class ne extends te{constructor(t){super(),this.stepper=t}done(t){return t.done}step(t,e,n,i){return this.stepper(t,e,n,i)}}function ie(){const t=(this._duration||500)/1e3,e=this._overshoot||0,n=Math.PI,i=Math.log(e/100+1e-10),r=-i/Math.sqrt(n*n+i*i),s=3.9/(r*t);this.d=2*r*s,this.k=s*s}class re extends ne{constructor(t=500,e=0){super(),this.duration(t).overshoot(e)}step(t,e,n,i){if("string"==typeof t)return t;if(i.done=n===1/0,n===1/0)return e;if(0===n)return t;n>100&&(n=16),n/=1e3;const r=i.velocity||0,s=-this.d*r-this.k*(t-e),o=t+r*n+s*n*n/2;return i.velocity=r+s*n,i.done=Math.abs(e-o)+Math.abs(r)<.002,i.done?e:o}}X(re,{duration:Zt("_duration",ie),overshoot:Zt("_overshoot",ie)});class se extends ne{constructor(t=.1,e=.01,n=0,i=1e3){super(),this.p(t).i(e).d(n).windup(i)}step(t,e,n,i){if("string"==typeof t)return t;if(i.done=n===1/0,n===1/0)return e;if(0===n)return t;const r=e-t;let s=(i.integral||0)+r*n;const o=(r-(i.error||0))/n,h=this._windup;return!1!==h&&(s=Math.max(-h,Math.min(s,h))),i.error=r,i.integral=s,i.done=Math.abs(r)<.001,i.done?e:t+(this.P*r+this.I*s+this.D*o)}}X(se,{windup:Zt("_windup"),p:Zt("P"),i:Zt("I"),d:Zt("D")});const oe={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0},he={M:function(t,e,n){return e.x=n.x=t[0],e.y=n.y=t[1],["M",e.x,e.y]},L:function(t,e){return e.x=t[0],e.y=t[1],["L",t[0],t[1]]},H:function(t,e){return e.x=t[0],["H",t[0]]},V:function(t,e){return e.y=t[0],["V",t[0]]},C:function(t,e){return e.x=t[4],e.y=t[5],["C",t[0],t[1],t[2],t[3],t[4],t[5]]},S:function(t,e){return e.x=t[2],e.y=t[3],["S",t[0],t[1],t[2],t[3]]},Q:function(t,e){return e.x=t[2],e.y=t[3],["Q",t[0],t[1],t[2],t[3]]},T:function(t,e){return e.x=t[0],e.y=t[1],["T",t[0],t[1]]},Z:function(t,e,n){return e.x=n.x,e.y=n.y,["Z"]},A:function(t,e){return e.x=t[5],e.y=t[6],["A",t[0],t[1],t[2],t[3],t[4],t[5],t[6]]}},ue="mlhvqtcsaz".split("");for(let t=0,e=ue.length;t<e;++t)he[ue[t]]=function(t){return function(e,n,i){if("H"===t)e[0]=e[0]+n.x;else if("V"===t)e[0]=e[0]+n.y;else if("A"===t)e[5]=e[5]+n.x,e[6]=e[6]+n.y;else for(let t=0,i=e.length;t<i;++t)e[t]=e[t]+(t%2?n.y:n.x);return he[t](e,n,i)}}(ue[t].toUpperCase());function ae(t){return t.segment.length&&t.segment.length-1===oe[t.segment[0].toUpperCase()]}function le(t,e){t.inNumber&&ce(t,!1);const n=nt.test(e);if(n)t.segment=[e];else{const e=t.lastCommand,n=e.toLowerCase(),i=e===n;t.segment=["m"===n?i?"l":"L":e]}return t.inSegment=!0,t.lastCommand=t.segment[0],n}function ce(t,e){if(!t.inNumber)throw new Error("Parser Error");t.number&&t.segment.push(parseFloat(t.number)),t.inNumber=e,t.number="",t.pointSeen=!1,t.hasExponent=!1,ae(t)&&fe(t)}function fe(t){t.inSegment=!1,t.absolute&&(t.segment=function(t){const e=t.segment[0];return he[e](t.segment.slice(1),t.p,t.p0)}(t)),t.segments.push(t.segment)}function de(t){if(!t.segment.length)return!1;const e="A"===t.segment[0].toUpperCase(),n=t.segment.length;return e&&(4===n||5===n)}function me(t){return"E"===t.lastToken.toUpperCase()}const pe=new Set([" ",",","\t","\n","\r","\f"]);class ye extends Et{bbox(){return ct().path.setAttribute("d",this.toString()),new dt(ct.nodes.path.getBBox())}move(t,e){const n=this.bbox();if(t-=n.x,e-=n.y,!isNaN(t)&&!isNaN(e))for(let n,i=this.length-1;i>=0;i--)n=this[i][0],"M"===n||"L"===n||"T"===n?(this[i][1]+=t,this[i][2]+=e):"H"===n?this[i][1]+=t:"V"===n?this[i][1]+=e:"C"===n||"S"===n||"Q"===n?(this[i][1]+=t,this[i][2]+=e,this[i][3]+=t,this[i][4]+=e,"C"===n&&(this[i][5]+=t,this[i][6]+=e)):"A"===n&&(this[i][6]+=t,this[i][7]+=e);return this}parse(t="M0 0"){return Array.isArray(t)&&(t=Array.prototype.concat.apply([],t).toString()),function(t,e=!0){let n=0,i="";const r={segment:[],inNumber:!1,number:"",lastToken:"",inSegment:!1,segments:[],pointSeen:!1,hasExponent:!1,absolute:e,p0:new ut,p:new ut};for(;r.lastToken=i,i=t.charAt(n++);)if(r.inSegment||!le(r,i))if("."!==i)if(isNaN(parseInt(i)))if(pe.has(i))r.inNumber&&ce(r,!1);else if("-"!==i&&"+"!==i)if("E"!==i.toUpperCase()){if(nt.test(i)){if(r.inNumber)ce(r,!1);else{if(!ae(r))throw new Error("parser Error");fe(r)}--n}}else r.number+=i,r.hasExponent=!0;else{if(r.inNumber&&!me(r)){ce(r,!1),--n;continue}r.number+=i,r.inNumber=!0}else{if("0"===r.number||de(r)){r.inNumber=!0,r.number=i,ce(r,!0);continue}r.inNumber=!0,r.number+=i}else{if(r.pointSeen||r.hasExponent){ce(r,!1),--n;continue}r.inNumber=!0,r.pointSeen=!0,r.number+=i}return r.inNumber&&ce(r,!1),r.inSegment&&ae(r)&&fe(r),r.segments}(t)}size(t,e){const n=this.bbox();let i,r;for(n.width=0===n.width?1:n.width,n.height=0===n.height?1:n.height,i=this.length-1;i>=0;i--)r=this[i][0],"M"===r||"L"===r||"T"===r?(this[i][1]=(this[i][1]-n.x)*t/n.width+n.x,this[i][2]=(this[i][2]-n.y)*e/n.height+n.y):"H"===r?this[i][1]=(this[i][1]-n.x)*t/n.width+n.x:"V"===r?this[i][1]=(this[i][1]-n.y)*e/n.height+n.y:"C"===r||"S"===r||"Q"===r?(this[i][1]=(this[i][1]-n.x)*t/n.width+n.x,this[i][2]=(this[i][2]-n.y)*e/n.height+n.y,this[i][3]=(this[i][3]-n.x)*t/n.width+n.x,this[i][4]=(this[i][4]-n.y)*e/n.height+n.y,"C"===r&&(this[i][5]=(this[i][5]-n.x)*t/n.width+n.x,this[i][6]=(this[i][6]-n.y)*e/n.height+n.y)):"A"===r&&(this[i][1]=this[i][1]*t/n.width,this[i][2]=this[i][2]*e/n.height,this[i][6]=(this[i][6]-n.x)*t/n.width+n.x,this[i][7]=(this[i][7]-n.y)*e/n.height+n.y);return this}toString(){return function(t){let e="";for(let n=0,i=t.length;n<i;n++)e+=t[n][0],null!=t[n][1]&&(e+=t[n][1],null!=t[n][2]&&(e+=" ",e+=t[n][2],null!=t[n][3]&&(e+=" ",e+=t[n][3],e+=" ",e+=t[n][4],null!=t[n][5]&&(e+=" ",e+=t[n][5],e+=" ",e+=t[n][6],null!=t[n][7]&&(e+=" ",e+=t[n][7])))));return e+" "}(this)}}const we=t=>{const e=typeof t;return"number"===e?jt:"string"===e?ht.isColor(t)?ht:et.test(t)?nt.test(t)?ye:Et:B.test(t)?jt:_e:Me.indexOf(t.constructor)>-1?t.constructor:Array.isArray(t)?Et:"object"===e?ve:_e};class ge{constructor(t){this._stepper=t||new ee("-"),this._from=null,this._to=null,this._type=null,this._context=null,this._morphObj=null}at(t){return this._morphObj.morph(this._from,this._to,t,this._stepper,this._context)}done(){return this._context.map(this._stepper.done).reduce((function(t,e){return t&&e}),!0)}from(t){return null==t?this._from:(this._from=this._set(t),this)}stepper(t){return null==t?this._stepper:(this._stepper=t,this)}to(t){return null==t?this._to:(this._to=this._set(t),this)}type(t){return null==t?this._type:(this._type=t,this)}_set(t){this._type||this.type(we(t));let e=new this._type(t);return this._type===ht&&(e=this._to?e[this._to[4]]():this._from?e[this._from[4]]():e),this._type===ve&&(e=this._to?e.align(this._to):this._from?e.align(this._from):e),e=e.toConsumable(),this._morphObj=this._morphObj||new this._type,this._context=this._context||Array.apply(null,Array(e.length)).map(Object).map((function(t){return t.done=!0,t})),e}}class _e{constructor(...t){this.init(...t)}init(t){return t=Array.isArray(t)?t[0]:t,this.value=t,this}toArray(){return[this.value]}valueOf(){return this.value}}class xe{constructor(...t){this.init(...t)}init(t){return Array.isArray(t)&&(t={scaleX:t[0],scaleY:t[1],shear:t[2],rotate:t[3],translateX:t[4],translateY:t[5],originX:t[6],originY:t[7]}),Object.assign(this,xe.defaults,t),this}toArray(){const t=this;return[t.scaleX,t.scaleY,t.shear,t.rotate,t.translateX,t.translateY,t.originX,t.originY]}}xe.defaults={scaleX:1,scaleY:1,shear:0,rotate:0,translateX:0,translateY:0,originX:0,originY:0};const be=(t,e)=>t[0]<e[0]?-1:t[0]>e[0]?1:0;class ve{constructor(...t){this.init(...t)}align(t){const e=this.values;for(let n=0,i=e.length;n<i;++n){if(e[n+1]===t[n+1]){if(e[n+1]===ht&&t[n+7]!==e[n+7]){const e=t[n+7],i=new ht(this.values.splice(n+3,5))[e]().toArray();this.values.splice(n+3,0,...i)}n+=e[n+2]+2;continue}if(!t[n+1])return this;const i=(new t[n+1]).toArray(),r=e[n+2]+3;e.splice(n,r,t[n],t[n+1],t[n+2],...i),n+=e[n+2]+2}return this}init(t){if(this.values=[],Array.isArray(t))return void(this.values=t.slice());t=t||{};const e=[];for(const n in t){const i=we(t[n]),r=new i(t[n]).toArray();e.push([n,i,r.length,...r])}return e.sort(be),this.values=e.reduce(((t,e)=>t.concat(e)),[]),this}toArray(){return this.values}valueOf(){const t={},e=this.values;for(;e.length;){const n=e.shift(),i=e.shift(),r=e.shift(),s=e.splice(0,r);t[n]=new i(s)}return t}}const Me=[_e,xe,ve];function Ae(t=[]){Me.push(...[].concat(t))}function Oe(){X(Me,{to(t){return(new ge).type(this.constructor).from(this.toArray()).to(t)},fromArray(t){return this.init(t),this},toConsumable(){return this.toArray()},morph(t,e,n,i,r){return this.fromArray(t.map((function(t,s){return i.step(t,e[s],n,r[s],r)})))}})}class Path extends Shape{constructor(t,e=t){super(D("path",t),e)}array(){return this._array||(this._array=new ye(this.attr("d")))}clear(){return delete this._array,this}height(t){return null==t?this.bbox().height:this.size(this.bbox().width,t)}move(t,e){return this.attr("d",this.array().move(t,e))}plot(t){return null==t?this.array():this.clear().attr("d","string"==typeof t?t:this._array=new ye(t))}size(t,e){const n=l(this,t,e);return this.attr("d",this.array().size(n.width,n.height))}width(t){return null==t?this.bbox().width:this.size(t,this.bbox().height)}x(t){return null==t?this.bbox().x:this.move(t,this.bbox().y)}y(t){return null==t?this.bbox().y:this.move(this.bbox().x,t)}}Path.prototype.MorphArray=ye,n({Container:{path:Y((function(t){return this.put(new Path).plot(t||new ye)}))}}),P(Path,"Path");var ke={__proto__:null,array:function(){return this._array||(this._array=new Qt(this.attr("points")))},clear:function(){return delete this._array,this},move:function(t,e){return this.attr("points",this.array().move(t,e))},plot:function(t){return null==t?this.array():this.clear().attr("points","string"==typeof t?t:this._array=new Qt(t))},size:function(t,e){const n=l(this,t,e);return this.attr("points",this.array().size(n.width,n.height))}};class Polygon extends Shape{constructor(t,e=t){super(D("polygon",t),e)}}n({Container:{polygon:Y((function(t){return this.put(new Polygon).plot(t||new Qt)}))}}),X(Polygon,Jt),X(Polygon,ke),P(Polygon,"Polygon");class Polyline extends Shape{constructor(t,e=t){super(D("polyline",t),e)}}n({Container:{polyline:Y((function(t){return this.put(new Polyline).plot(t||new Qt)}))}}),X(Polyline,Jt),X(Polyline,ke),P(Polyline,"Polyline");class Rect extends Shape{constructor(t,e=t){super(D("rect",t),e)}}X(Rect,{rx:Pt,ry:Rt}),n({Container:{rect:Y((function(t,e){return this.put(new Rect).size(t,e)}))}}),P(Rect,"Rect");class Te{constructor(){this._first=null,this._last=null}first(){return this._first&&this._first.value}last(){return this._last&&this._last.value}push(t){const e=void 0!==t.next?t:{value:t,next:null,prev:null};return this._last?(e.prev=this._last,this._last.next=e,this._last=e):(this._last=e,this._first=e),e}remove(t){t.prev&&(t.prev.next=t.next),t.next&&(t.next.prev=t.prev),t===this._last&&(this._last=t.prev),t===this._first&&(this._first=t.next),t.prev=null,t.next=null}shift(){const t=this._first;return t?(this._first=t.next,this._first&&(this._first.prev=null),this._last=this._first?this._last:null,t.value):null}}const Ce={nextDraw:null,frames:new Te,timeouts:new Te,immediates:new Te,timer:()=>b.window.performance||b.window.Date,transforms:[],frame(t){const e=Ce.frames.push({run:t});return null===Ce.nextDraw&&(Ce.nextDraw=b.window.requestAnimationFrame(Ce._draw)),e},timeout(t,e){e=e||0;const n=Ce.timer().now()+e,i=Ce.timeouts.push({run:t,time:n});return null===Ce.nextDraw&&(Ce.nextDraw=b.window.requestAnimationFrame(Ce._draw)),i},immediate(t){const e=Ce.immediates.push(t);return null===Ce.nextDraw&&(Ce.nextDraw=b.window.requestAnimationFrame(Ce._draw)),e},cancelFrame(t){null!=t&&Ce.frames.remove(t)},clearTimeout(t){null!=t&&Ce.timeouts.remove(t)},cancelImmediate(t){null!=t&&Ce.immediates.remove(t)},_draw(t){let e=null;const n=Ce.timeouts.last();for(;(e=Ce.timeouts.shift())&&(t>=e.time?e.run():Ce.timeouts.push(e),e!==n););let i=null;const r=Ce.frames.last();for(;i!==r&&(i=Ce.frames.shift());)i.run(t);let s=null;for(;s=Ce.immediates.shift();)s();Ce.nextDraw=Ce.timeouts.first()||Ce.frames.first()?b.window.requestAnimationFrame(Ce._draw):null}},Ne=function(t){const e=t.start,n=t.runner.duration();return{start:e,duration:n,end:e+n,runner:t.runner}},Se=function(){const t=b.window;return(t.performance||t.Date).now()};class Ee extends kt{constructor(t=Se){super(),this._timeSource=t,this.terminate()}active(){return!!this._nextFrame}finish(){return this.time(this.getEndTimeOfTimeline()+1),this.pause()}getEndTime(){const t=this.getLastRunnerInfo(),e=t?t.runner.duration():0;return(t?t.start:this._time)+e}getEndTimeOfTimeline(){const t=this._runners.map((t=>t.start+t.runner.duration()));return Math.max(0,...t)}getLastRunnerInfo(){return this.getRunnerInfoById(this._lastRunnerId)}getRunnerInfoById(t){return this._runners[this._runnerIds.indexOf(t)]||null}pause(){return this._paused=!0,this._continue()}persist(t){return null==t?this._persist:(this._persist=t,this)}play(){return this._paused=!1,this.updateTime()._continue()}reverse(t){const e=this.speed();if(null==t)return this.speed(-e);const n=Math.abs(e);return this.speed(t?-n:n)}schedule(t,e,n){if(null==t)return this._runners.map(Ne);let i=0;const r=this.getEndTime();if(e=e||0,null==n||"last"===n||"after"===n)i=r;else if("absolute"===n||"start"===n)i=e,e=0;else if("now"===n)i=this._time;else if("relative"===n){const n=this.getRunnerInfoById(t.id);n&&(i=n.start+e,e=0)}else{if("with-last"!==n)throw new Error('Invalid value for the "when" parameter');{const t=this.getLastRunnerInfo();i=t?t.start:this._time}}t.unschedule(),t.timeline(this);const s=t.persist(),o={persist:null===s?this._persist:s,start:i+e,runner:t};return this._lastRunnerId=t.id,this._runners.push(o),this._runners.sort(((t,e)=>t.start-e.start)),this._runnerIds=this._runners.map((t=>t.runner.id)),this.updateTime()._continue(),this}seek(t){return this.time(this._time+t)}source(t){return null==t?this._timeSource:(this._timeSource=t,this)}speed(t){return null==t?this._speed:(this._speed=t,this)}stop(){return this.time(0),this.pause()}time(t){return null==t?this._time:(this._time=t,this._continue(!0))}unschedule(t){const e=this._runnerIds.indexOf(t.id);return e<0||(this._runners.splice(e,1),this._runnerIds.splice(e,1),t.timeline(null)),this}updateTime(){return this.active()||(this._lastSourceTime=this._timeSource()),this}_continue(t=!1){return Ce.cancelFrame(this._nextFrame),this._nextFrame=null,t?this._stepImmediate():(this._paused||(this._nextFrame=Ce.frame(this._step)),this)}_stepFn(t=!1){const e=this._timeSource();let n=e-this._lastSourceTime;t&&(n=0);const i=this._speed*n+(this._time-this._lastStepTime);this._lastSourceTime=e,t||(this._time+=i,this._time=this._time<0?0:this._time),this._lastStepTime=this._time,this.fire("time",this._time);for(let t=this._runners.length;t--;){const e=this._runners[t],n=e.runner;this._time-e.start<=0&&n.reset()}let r=!1;for(let t=0,e=this._runners.length;t<e;t++){const n=this._runners[t],s=n.runner;let o=i;const h=this._time-n.start;if(h<=0){r=!0;continue}if(h<o&&(o=h),!s.active())continue;if(s.step(o).done){if(!0!==n.persist){s.duration()-s.time()+this._time+n.persist<this._time&&(s.unschedule(),--t,--e)}}else r=!0}return r&&!(this._speed<0&&0===this._time)||this._runnerIds.length&&this._speed<0&&this._time>0?this._continue():(this.pause(),this.fire("finished")),this}terminate(){this._startTime=0,this._speed=1,this._persist=0,this._nextFrame=null,this._paused=!0,this._runners=[],this._runnerIds=[],this._lastRunnerId=-1,this._time=0,this._lastSourceTime=0,this._lastStepTime=0,this._step=this._stepFn.bind(this,!1),this._stepImmediate=this._stepFn.bind(this,!0)}}n({Element:{timeline:function(t){return null==t?(this._timeline=this._timeline||new Ee,this._timeline):(this._timeline=t,this)}}});class je extends kt{constructor(t){super(),this.id=je.id++,t="function"==typeof(t=null==t?Ct.duration:t)?new ne(t):t,this._element=null,this._timeline=null,this.done=!1,this._queue=[],this._duration="number"==typeof t&&t,this._isDeclarative=t instanceof ne,this._stepper=this._isDeclarative?t:new ee,this._history={},this.enabled=!0,this._time=0,this._lastTime=0,this._reseted=!0,this.transforms=new lt,this.transformId=1,this._haveReversed=!1,this._reverse=!1,this._loopsDone=0,this._swing=!1,this._wait=0,this._times=1,this._frameId=null,this._persist=!!this._isDeclarative||null}static sanitise(t,e,n){let i=1,r=!1,s=0;return e=e??Ct.delay,n=n||"last","object"!=typeof(t=t??Ct.duration)||t instanceof te||(e=t.delay??e,n=t.when??n,r=t.swing||r,i=t.times??i,s=t.wait??s,t=t.duration??Ct.duration),{duration:t,delay:e,swing:r,times:i,wait:s,when:n}}active(t){return null==t?this.enabled:(this.enabled=t,this)}addTransform(t){return this.transforms.lmultiplyO(t),this}after(t){return this.on("finished",t)}animate(t,e,n){const i=je.sanitise(t,e,n),r=new je(i.duration);return this._timeline&&r.timeline(this._timeline),this._element&&r.element(this._element),r.loop(i).schedule(i.delay,i.when)}clearTransform(){return this.transforms=new lt,this}clearTransformsFromQueue(){this.done&&this._timeline&&this._timeline._runnerIds.includes(this.id)||(this._queue=this._queue.filter((t=>!t.isTransform)))}delay(t){return this.animate(0,t)}duration(){return this._times*(this._wait+this._duration)-this._wait}during(t){return this.queue(null,t)}ease(t){return this._stepper=new ee(t),this}element(t){return null==t?this._element:(this._element=t,t._prepareRunner(),this)}finish(){return this.step(1/0)}loop(t,e,n){return"object"==typeof t&&(e=t.swing,n=t.wait,t=t.times),this._times=t||1/0,this._swing=e||!1,this._wait=n||0,!0===this._times&&(this._times=1/0),this}loops(t){const e=this._duration+this._wait;if(null==t){const t=Math.floor(this._time/e),n=(this._time-t*e)/this._duration;return Math.min(t+n,this._times)}const n=t%1,i=e*Math.floor(t)+this._duration*n;return this.time(i)}persist(t){return null==t?this._persist:(this._persist=t,this)}position(t){const e=this._time,n=this._duration,i=this._wait,r=this._times,s=this._swing,o=this._reverse;let h;if(null==t){const t=function(t){const e=s*Math.floor(t%(2*(i+n))/(i+n)),r=e&&!o||!e&&o,h=Math.pow(-1,r)*(t%(i+n))/n+r;return Math.max(Math.min(h,1),0)},u=r*(i+n)-i;return h=e<=0?Math.round(t(1e-5)):e<u?t(e):Math.round(t(u-1e-5)),h}const u=Math.floor(this.loops()),a=s&&u%2==0;return h=u+(a&&!o||o&&a?t:1-t),this.loops(h)}progress(t){return null==t?Math.min(1,this._time/this.duration()):this.time(t*this.duration())}queue(t,e,n,i){this._queue.push({initialiser:t||Tt,runner:e||Tt,retarget:n,isTransform:i,initialised:!1,finished:!1});return this.timeline()&&this.timeline()._continue(),this}reset(){return this._reseted||(this.time(0),this._reseted=!0),this}reverse(t){return this._reverse=null==t?!this._reverse:t,this}schedule(t,e,n){if(t instanceof Ee||(n=e,e=t,t=this.timeline()),!t)throw Error("Runner cannot be scheduled without timeline");return t.schedule(this,e,n),this}step(t){if(!this.enabled)return this;t=null==t?16:t,this._time+=t;const e=this.position(),n=this._lastPosition!==e&&this._time>=0;this._lastPosition=e;const i=this.duration(),r=this._lastTime<=0&&this._time>0,s=this._lastTime<i&&this._time>=i;this._lastTime=this._time,r&&this.fire("start",this);const o=this._isDeclarative;this.done=!o&&!s&&this._time>=i,this._reseted=!1;let h=!1;return(n||o)&&(this._initialise(n),this.transforms=new lt,h=this._run(o?t:e),this.fire("step",this)),this.done=this.done||h&&o,s&&this.fire("finished",this),this}time(t){if(null==t)return this._time;const e=t-this._time;return this.step(e),this}timeline(t){return void 0===t?this._timeline:(this._timeline=t,this)}unschedule(){const t=this.timeline();return t&&t.unschedule(this),this}_initialise(t){if(t||this._isDeclarative)for(let e=0,n=this._queue.length;e<n;++e){const n=this._queue[e],i=this._isDeclarative||!n.initialised&&t;t=!n.finished,i&&t&&(n.initialiser.call(this),n.initialised=!0)}}_rememberMorpher(t,e){if(this._history[t]={morpher:e,caller:this._queue[this._queue.length-1]},this._isDeclarative){const t=this.timeline();t&&t.play()}}_run(t){let e=!0;for(let n=0,i=this._queue.length;n<i;++n){const i=this._queue[n],r=i.runner.call(this,t);i.finished=i.finished||!0===r,e=e&&i.finished}return e}_tryRetarget(t,e,n){if(this._history[t]){if(!this._history[t].caller.initialised){const e=this._queue.indexOf(this._history[t].caller);return this._queue.splice(e,1),!1}this._history[t].caller.retarget?this._history[t].caller.retarget.call(this,e,n):this._history[t].morpher.to(e),this._history[t].caller.finished=!1;const i=this.timeline();return i&&i.play(),!0}return!1}}je.id=0;class De{constructor(t=new lt,e=-1,n=!0){this.transforms=t,this.id=e,this.done=n}clearTransformsFromQueue(){}}X([je,De],{mergeWith(t){return new De(t.transforms.lmultiply(this.transforms),t.id)}});const Ie=(t,e)=>t.lmultiplyO(e),ze=t=>t.transforms;function Pe(){const t=this._transformationRunners.runners.map(ze).reduce(Ie,new lt);this.transform(t),this._transformationRunners.merge(),1===this._transformationRunners.length()&&(this._frameId=null)}class Re{constructor(){this.runners=[],this.ids=[]}add(t){if(this.runners.includes(t))return;const e=t.id+1;return this.runners.push(t),this.ids.push(e),this}clearBefore(t){const e=this.ids.indexOf(t+1)||1;return this.ids.splice(0,e,0),this.runners.splice(0,e,new De).forEach((t=>t.clearTransformsFromQueue())),this}edit(t,e){const n=this.ids.indexOf(t+1);return this.ids.splice(n,1,t+1),this.runners.splice(n,1,e),this}getByID(t){return this.runners[this.ids.indexOf(t+1)]}length(){return this.ids.length}merge(){let t=null;for(let e=0;e<this.runners.length;++e){const n=this.runners[e];if(t&&n.done&&t.done&&(!n._timeline||!n._timeline._runnerIds.includes(n.id))&&(!t._timeline||!t._timeline._runnerIds.includes(t.id))){this.remove(n.id);const i=n.mergeWith(t);this.edit(t.id,i),t=i,--e}else t=n}return this}remove(t){const e=this.ids.indexOf(t+1);return this.ids.splice(e,1),this.runners.splice(e,1),this}}n({Element:{animate(t,e,n){const i=je.sanitise(t,e,n),r=this.timeline();return new je(i.duration).loop(i).element(this).timeline(r.play()).schedule(i.delay,i.when)},delay(t,e){return this.animate(0,t,e)},_clearTransformRunnersBefore(t){this._transformationRunners.clearBefore(t.id)},_currentTransform(t){return this._transformationRunners.runners.filter((e=>e.id<=t.id)).map(ze).reduce(Ie,new lt)},_addRunner(t){this._transformationRunners.add(t),Ce.cancelImmediate(this._frameId),this._frameId=Ce.immediate(Pe.bind(this))},_prepareRunner(){null==this._frameId&&(this._transformationRunners=(new Re).add(new De(new lt(this))))}}});X(je,{attr(t,e){return this.styleAttr("attr",t,e)},css(t,e){return this.styleAttr("css",t,e)},styleAttr(t,e,n){if("string"==typeof e)return this.styleAttr(t,{[e]:n});let i=e;if(this._tryRetarget(t,i))return this;let r=new ge(this._stepper).to(i),s=Object.keys(i);return this.queue((function(){r=r.from(this.element()[t](s))}),(function(e){return this.element()[t](r.at(e).valueOf()),r.done()}),(function(e){const n=Object.keys(e),o=(h=s,n.filter((t=>!h.includes(t))));var h;if(o.length){const e=this.element()[t](o),n=new ve(r.from()).valueOf();Object.assign(n,e),r.from(n)}const u=new ve(r.to()).valueOf();Object.assign(u,e),r.to(u),s=n,i=e})),this._rememberMorpher(t,r),this},zoom(t,e){if(this._tryRetarget("zoom",t,e))return this;let n=new ge(this._stepper).to(new jt(t));return this.queue((function(){n=n.from(this.element().zoom())}),(function(t){return this.element().zoom(n.at(t),e),n.done()}),(function(t,i){e=i,n.to(t)})),this._rememberMorpher("zoom",n),this},transform(t,e,n){if(e=t.relative||e,this._isDeclarative&&!e&&this._tryRetarget("transform",t))return this;const i=lt.isMatrixLike(t);n=null!=t.affine?t.affine:null!=n?n:!i;const r=new ge(this._stepper).type(n?xe:lt);let s,o,h,u,a;return this.queue((function(){o=o||this.element(),s=s||c(t,o),a=new lt(e?void 0:o),o._addRunner(this),e||o._clearTransformRunnersBefore(this)}),(function(l){e||this.clearTransform();const{x:c,y:f}=new ut(s).transform(o._currentTransform(this));let d=new lt({...t,origin:[c,f]}),m=this._isDeclarative&&h?h:a;if(n){d=d.decompose(c,f),m=m.decompose(c,f);const t=d.rotate,e=m.rotate,n=[t-360,t,t+360],i=n.map((t=>Math.abs(t-e))),r=Math.min(...i),s=i.indexOf(r);d.rotate=n[s]}e&&(i||(d.rotate=t.rotate||0),this._isDeclarative&&u&&(m.rotate=u)),r.from(m),r.to(d);const p=r.at(l);return u=p.rotate,h=new lt(p),this.addTransform(h),o._addRunner(this),r.done()}),(function(e){(e.origin||"center").toString()!==(t.origin||"center").toString()&&(s=c(e,o)),t={...e,origin:s}}),!0),this._isDeclarative&&this._rememberMorpher("transform",r),this},x(t){return this._queueNumber("x",t)},y(t){return this._queueNumber("y",t)},ax(t){return this._queueNumber("ax",t)},ay(t){return this._queueNumber("ay",t)},dx(t=0){return this._queueNumberDelta("x",t)},dy(t=0){return this._queueNumberDelta("y",t)},dmove(t,e){return this.dx(t).dy(e)},_queueNumberDelta(t,e){if(e=new jt(e),this._tryRetarget(t,e))return this;const n=new ge(this._stepper).to(e);let i=null;return this.queue((function(){i=this.element()[t](),n.from(i),n.to(i+e)}),(function(e){return this.element()[t](n.at(e)),n.done()}),(function(t){n.to(i+new jt(t))})),this._rememberMorpher(t,n),this},_queueObject(t,e){if(this._tryRetarget(t,e))return this;const n=new ge(this._stepper).to(e);return this.queue((function(){n.from(this.element()[t]())}),(function(e){return this.element()[t](n.at(e)),n.done()})),this._rememberMorpher(t,n),this},_queueNumber(t,e){return this._queueObject(t,new jt(e))},cx(t){return this._queueNumber("cx",t)},cy(t){return this._queueNumber("cy",t)},move(t,e){return this.x(t).y(e)},amove(t,e){return this.ax(t).ay(e)},center(t,e){return this.cx(t).cy(e)},size(t,e){let n;return t&&e||(n=this._element.bbox()),t||(t=n.width/n.height*e),e||(e=n.height/n.width*t),this.width(t).height(e)},width(t){return this._queueNumber("width",t)},height(t){return this._queueNumber("height",t)},plot(t,e,n,i){if(4===arguments.length)return this.plot([t,e,n,i]);if(this._tryRetarget("plot",t))return this;const r=new ge(this._stepper).type(this._element.MorphArray).to(t);return this.queue((function(){r.from(this._element.array())}),(function(t){return this._element.plot(r.at(t)),r.done()})),this._rememberMorpher("plot",r),this},leading(t){return this._queueNumber("leading",t)},viewbox(t,e,n,i){return this._queueObject("viewbox",new dt(t,e,n,i))},update(t){return"object"!=typeof t?this.update({offset:arguments[0],color:arguments[1],opacity:arguments[2]}):(null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",t.offset),this)}}),X(je,{rx:Pt,ry:Rt,from:Vt,to:$t}),P(je,"Runner");class Svg extends Container{constructor(t,e=t){super(D("svg",t),e),this.namespace()}defs(){return this.isRoot()?I(this.node.querySelector("defs"))||this.put(new Defs):this.root().defs()}isRoot(){return!this.node.parentNode||!(this.node.parentNode instanceof b.window.SVGElement)&&"#document-fragment"!==this.node.parentNode.nodeName}namespace(){return this.isRoot()?this.attr({xmlns:y,version:"1.1"}).attr("xmlns:xlink",_,g):this.root().namespace()}removeNamespace(){return this.attr({xmlns:null,version:null}).attr("xmlns:xlink",null,g).attr("xmlns:svgjs",null,g)}root(){return this.isRoot()?this:super.root()}}n({Container:{nested:Y((function(){return this.put(new Svg)}))}}),P(Svg,"Svg",!0);class Symbol extends Container{constructor(t,e=t){super(D("symbol",t),e)}}n({Container:{symbol:Y((function(){return this.put(new Symbol)}))}}),P(Symbol,"Symbol");var Le={__proto__:null,amove:function(t,e){return this.ax(t).ay(e)},ax:function(t){return this.attr("x",t)},ay:function(t){return this.attr("y",t)},build:function(t){return this._build=!!t,this},center:function(t,e,n=this.bbox()){return this.cx(t,n).cy(e,n)},cx:function(t,e=this.bbox()){return null==t?e.cx:this.attr("x",this.attr("x")+t-e.cx)},cy:function(t,e=this.bbox()){return null==t?e.cy:this.attr("y",this.attr("y")+t-e.cy)},length:function(){return this.node.getComputedTextLength()},move:function(t,e,n=this.bbox()){return this.x(t,n).y(e,n)},plain:function(t){return!1===this._build&&this.clear(),this.node.appendChild(b.document.createTextNode(t)),this},x:function(t,e=this.bbox()){return null==t?e.x:this.attr("x",this.attr("x")+t-e.x)},y:function(t,e=this.bbox()){return null==t?e.y:this.attr("y",this.attr("y")+t-e.y)}};class Text extends Shape{constructor(t,e=t){super(D("text",t),e),this.dom.leading=this.dom.leading??new jt(1.3),this._rebuild=!0,this._build=!1}leading(t){return null==t?this.dom.leading:(this.dom.leading=new jt(t),this.rebuild())}rebuild(t){if("boolean"==typeof t&&(this._rebuild=t),this._rebuild){const t=this;let e=0;const n=this.dom.leading;this.each((function(i){if(d(this.node))return;const r=b.window.getComputedStyle(this.node).getPropertyValue("font-size"),s=n*new jt(r);this.dom.newLined&&(this.attr("x",t.attr("x")),"\n"===this.text()?e+=s:(this.attr("dy",i?s+e:0),e=0))})),this.fire("rebuild")}return this}setData(t){return this.dom=t,this.dom.leading=new jt(t.leading||1.3),this}writeDataToDom(){return m(this,this.dom,{leading:1.3}),this}text(t){if(void 0===t){const e=this.node.childNodes;let n=0;t="";for(let i=0,r=e.length;i<r;++i)"textPath"===e[i].nodeName||d(e[i])?0===i&&(n=i+1):(i!==n&&3!==e[i].nodeType&&!0===I(e[i]).dom.newLined&&(t+="\n"),t+=e[i].textContent);return t}if(this.clear().build(!0),"function"==typeof t)t.call(this,this);else for(let e=0,n=(t=(t+"").split("\n")).length;e<n;e++)this.newLine(t[e]);return this.build(!1).rebuild()}}X(Text,Le),n({Container:{text:Y((function(t=""){return this.put(new Text).text(t)})),plain:Y((function(t=""){return this.put(new Text).plain(t)}))}}),P(Text,"Text");class Tspan extends Shape{constructor(t,e=t){super(D("tspan",t),e),this._build=!1}dx(t){return this.attr("dx",t)}dy(t){return this.attr("dy",t)}newLine(){this.dom.newLined=!0;const t=this.parent();if(!(t instanceof Text))return this;const e=t.index(this),n=b.window.getComputedStyle(this.node).getPropertyValue("font-size"),i=t.dom.leading*new jt(n);return this.dy(e?i:0).attr("x",t.x())}text(t){return null==t?this.node.textContent+(this.dom.newLined?"\n":""):("function"==typeof t?(this.clear().build(!0),t.call(this,this),this.build(!1)):this.plain(t),this)}}X(Tspan,Le),n({Tspan:{tspan:Y((function(t=""){const e=new Tspan;return this._build||this.clear(),this.put(e).text(t)}))},Text:{newLine:function(t=""){return this.tspan(t).newLine()}}}),P(Tspan,"Tspan");class Circle extends Shape{constructor(t,e=t){super(D("circle",t),e)}radius(t){return this.attr("r",t)}rx(t){return this.attr("r",t)}ry(t){return this.rx(t)}size(t){return this.radius(new jt(t).divide(2))}}X(Circle,{x:Lt,y:qt,cx:Ft,cy:Xt,width:Yt,height:Bt}),n({Container:{circle:Y((function(t=0){return this.put(new Circle).size(t).move(0,0)}))}}),P(Circle,"Circle");class ClipPath extends Container{constructor(t,e=t){super(D("clipPath",t),e)}remove(){return this.targets().forEach((function(t){t.unclip()})),super.remove()}targets(){return wt("svg [clip-path*="+this.id()+"]")}}n({Container:{clip:Y((function(){return this.defs().put(new ClipPath)}))},Element:{clipper(){return this.reference("clip-path")},clipWith(t){const e=t instanceof ClipPath?t:this.parent().clip().add(t);return this.attr("clip-path","url(#"+e.id()+")")},unclip(){return this.attr("clip-path",null)}}}),P(ClipPath,"ClipPath");class qe extends Element{constructor(t,e=t){super(D("foreignObject",t),e)}}n({Container:{foreignObject:Y((function(t,e){return this.put(new qe).size(t,e)}))}}),P(qe,"ForeignObject");var Fe={__proto__:null,dmove:function(t,e){return this.children().forEach((n=>{let i;try{i=n.node instanceof T().SVGSVGElement?new dt(n.attr(["x","y","width","height"])):n.bbox()}catch(t){return}const r=new lt(n),s=r.translate(t,e).transform(r.inverse()),o=new ut(i.x,i.y).transform(s);n.move(o.x,o.y)})),this},dx:function(t){return this.dmove(t,0)},dy:function(t){return this.dmove(0,t)},height:function(t,e=this.bbox()){return null==t?e.height:this.size(e.width,t,e)},move:function(t=0,e=0,n=this.bbox()){const i=t-n.x,r=e-n.y;return this.dmove(i,r)},size:function(t,e,n=this.bbox()){const i=l(this,t,e,n),r=i.width/n.width,s=i.height/n.height;return this.children().forEach((t=>{const e=new ut(n).transform(new lt(t).inverse());t.scale(r,s,e.x,e.y)})),this},width:function(t,e=this.bbox()){return null==t?e.width:this.size(t,e.height,e)},x:function(t,e=this.bbox()){return null==t?e.x:this.move(t,e.y,e)},y:function(t,e=this.bbox()){return null==t?e.y:this.move(e.x,t,e)}};class G extends Container{constructor(t,e=t){super(D("g",t),e)}}X(G,Fe),n({Container:{group:Y((function(){return this.put(new G)}))}}),P(G,"G");class A extends Container{constructor(t,e=t){super(D("a",t),e)}target(t){return this.attr("target",t)}to(t){return this.attr("href",t,_)}}X(A,Fe),n({Container:{link:Y((function(t){return this.put(new A).to(t)}))},Element:{unlink(){const t=this.linker();if(!t)return this;const e=t.parent();if(!e)return this.remove();const n=e.index(t);return e.add(this,n),t.remove(),this},linkTo(t){let e=this.linker();return e||(e=new A,this.wrap(e)),"function"==typeof t?t.call(e,e):e.to(t),this},linker(){const t=this.parent();return t&&"a"===t.node.nodeName.toLowerCase()?t:null}}}),P(A,"A");class Mask extends Container{constructor(t,e=t){super(D("mask",t),e)}remove(){return this.targets().forEach((function(t){t.unmask()})),super.remove()}targets(){return wt("svg [mask*="+this.id()+"]")}}n({Container:{mask:Y((function(){return this.defs().put(new Mask)}))},Element:{masker(){return this.reference("mask")},maskWith(t){const e=t instanceof Mask?t:this.parent().mask().add(t);return this.attr("mask","url(#"+e.id()+")")},unmask(){return this.attr("mask",null)}}}),P(Mask,"Mask");class Stop extends Element{constructor(t,e=t){super(D("stop",t),e)}update(t){return("number"==typeof t||t instanceof jt)&&(t={offset:arguments[0],color:arguments[1],opacity:arguments[2]}),null!=t.opacity&&this.attr("stop-opacity",t.opacity),null!=t.color&&this.attr("stop-color",t.color),null!=t.offset&&this.attr("offset",new jt(t.offset)),this}}n({Gradient:{stop:function(t,e,n){return this.put(new Stop).update(t,e,n)}}}),P(Stop,"Stop");class Style extends Element{constructor(t,e=t){super(D("style",t),e)}addText(t=""){return this.node.textContent+=t,this}font(t,e,n={}){return this.rule("@font-face",{fontFamily:t,src:e,...n})}rule(t,e){return this.addText(function(t,e){if(!t)return"";if(!e)return t;let n=t+"{";for(const t in e)n+=u(t)+":"+e[t]+";";return n+="}",n}(t,e))}}n("Dom",{style(t,e){return this.put(new Style).rule(t,e)},fontface(t,e,n){return this.put(new Style).font(t,e,n)}}),P(Style,"Style");class TextPath extends Text{constructor(t,e=t){super(D("textPath",t),e)}array(){const t=this.track();return t?t.array():null}plot(t){const e=this.track();let n=null;return e&&(n=e.plot(t)),null==t?n:this}track(){return this.reference("href")}}n({Container:{textPath:Y((function(t,e){return t instanceof Text||(t=this.text(t)),t.path(e)}))},Text:{path:Y((function(t,e=!0){const n=new TextPath;let i;if(t instanceof Path||(t=this.defs().path(t)),n.attr("href","#"+t,_),e)for(;i=this.node.firstChild;)n.node.appendChild(i);return this.put(n)})),textPath(){return this.findOne("textPath")}},Path:{text:Y((function(t){return t instanceof Text||(t=(new Text).addTo(this.parent()).text(t)),t.path(this)})),targets(){return wt("svg textPath").filter((t=>(t.attr("href")||"").includes(this.id())))}}}),TextPath.prototype.MorphArray=ye,P(TextPath,"TextPath");class Use extends Shape{constructor(t,e=t){super(D("use",t),e)}use(t,e){return this.attr("href",(e||"")+"#"+t,_)}}n({Container:{use:Y((function(t,e){return this.put(new Use).use(t,e)}))}}),P(Use,"Use");const Xe=j;X([Svg,Symbol,Image,Pattern,Marker],i("viewbox")),X([Line,Polyline,Polygon,Path],i("marker")),X(Text,i("Text")),X(Path,i("Path")),X(Defs,i("Defs")),X([Text,Tspan],i("Tspan")),X([Rect,Ellipse,Gradient,je],i("radius")),X(kt,i("EventTarget")),X(Dom,i("Dom")),X(Element,i("Element")),X(Shape,i("Shape")),X([Container,Ht],i("Container")),X(Gradient,i("Gradient")),X(je,i("Runner")),pt.extend([...new Set(e)]),Ae([jt,ht,dt,lt,Et,Qt,ye,ut]),Oe();var Ye={__proto__:null,A:A,Animator:Ce,Array:Et,Box:dt,Circle:Circle,ClipPath:ClipPath,Color:ht,Container:Container,Controller:ne,Defs:Defs,Dom:Dom,Ease:ee,Element:Element,Ellipse:Ellipse,EventTarget:kt,ForeignObject:qe,Fragment:Ht,G:G,Gradient:Gradient,Image:Image,Line:Line,List:pt,Marker:Marker,Mask:Mask,Matrix:lt,Morphable:ge,NonMorphable:_e,Number:jt,ObjectBag:ve,PID:se,Path:Path,PathArray:ye,Pattern:Pattern,Point:ut,PointArray:Qt,Polygon:Polygon,Polyline:Polyline,Queue:Te,Rect:Rect,Runner:je,SVG:Xe,Shape:Shape,Spring:re,Stop:Stop,Style:Style,Svg:Svg,Symbol:Symbol,Text:Text,TextPath:TextPath,Timeline:Ee,TransformBag:xe,Tspan:Tspan,Use:Use,adopt:I,assignNewId:F,clearEvents:vt,create:E,defaults:St,dispatch:Ot,easing:Kt,eid:q,extend:X,find:wt,getClass:R,getEventTarget:bt,getEvents:xt,getWindow:T,makeInstance:j,makeMorphable:Oe,mockAdopt:function(t=I){z=t},namespaces:x,nodeOrNew:D,off:At,on:Mt,parser:ct,regex:it,register:P,registerMorphableType:Ae,registerWindow:v,restoreWindow:k,root:S,saveWindow:O,utils:p,windowEvents:_t,withWindow:function(t,e){O(),v(t,t.document),e(t,t.document),k()},wrapWithAttrCheck:Y};function Be(t,e){return j(t,e)}return Object.assign(Be,Ye),Be}();


},{}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],4:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":5}],5:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],6:[function(require,module,exports){
require('fold');
require('@svgdotjs/svg.js/dist/svg.min.js');
require('./cpedit.js');
},{"./cpedit.js":7,"@svgdotjs/svg.js/dist/svg.min.js":1,"fold":12}],7:[function(require,module,exports){
(function (process){(function (){
(function() {
  var Editor, LineAssignMode, LineDrawMode, LineEraseMode, LinePaintMode, Mode, VSVG, VertexMoveMode, cli, defaultPage, foldAngleToOpacity, margin, modes;

  margin = 0.5;

  FOLD = require('fold');

  defaultPage = function() {
    return {
      xMin: 0,
      yMin: 0,
      xMax: 4,
      yMax: 4
    };
  };

  foldAngleToOpacity = function(foldAngle, assignment) {
    if (assignment === 'M' || assignment === 'V') {
      return Math.max(0.1, (Math.abs(foldAngle != null ? foldAngle : 180)) / 180);
    } else {
      return 1;
    }
  };

  Editor = class Editor {
    constructor(svg1) {
      this.svg = svg1;
      this.undoStack = [];
      this.redoStack = [];
      this.updateUndoStack();
      this.fold = {
        file_spec: 1.2,
        file_creator: 'Crease Pattern Editor',
        file_classes: ['singleModel'],
        frame_classes: ['creasePattern'],
        vertices_coords: [],
        edges_vertices: [],
        edges_assignment: [],
        edges_foldAngle: [],
        "cpedit:page": defaultPage()
      };
      this.gridGroup = this.svg.group().addClass('grid');
      this.creaseGroup = this.svg.group().addClass('crease');
      this.creaseLine = {};
      this.vertexGroup = this.svg.group().addClass('vertex');
      this.vertexCircle = {};
      this.dragGroup = this.svg.group().addClass('drag');
      this.updateGrid();
    }

    updateGrid() {
      var j, k, page, ref, ref1, ref2, ref3, x, y;
      // Call whenever page dimensions change
      page = this.fold["cpedit:page"];
      if (typeof document !== "undefined" && document !== null) {
        if ((ref = document.getElementById('width')) != null) {
          ref.innerHTML = page.xMax;
        }
      }
      if (typeof document !== "undefined" && document !== null) {
        if ((ref1 = document.getElementById('height')) != null) {
          ref1.innerHTML = page.yMax;
        }
      }
      this.gridGroup.clear();
      for (x = j = 0, ref2 = page.xMax; (0 <= ref2 ? j <= ref2 : j >= ref2); x = 0 <= ref2 ? ++j : --j) {
        this.gridGroup.line(x, page.yMin, x, page.yMax);
      }
      for (y = k = 0, ref3 = page.yMax; (0 <= ref3 ? k <= ref3 : k >= ref3); y = 0 <= ref3 ? ++k : --k) {
        this.gridGroup.line(page.xMin, y, page.xMax, y);
      }
      return this.svg.viewbox(page.xMin - margin, page.yMin - margin, page.xMax - page.xMin + 2 * margin, page.yMax - page.yMin + 2 * margin);
    }

    nearestFeature(pt) {
      var closest, p, page, v, vertex;
      p = [pt.x, pt.y];
      page = this.fold["cpedit:page"];
      closest = [Math.max(page.xMin, Math.min(page.xMax, Math.round(pt.x))), Math.max(page.yMin, Math.min(page.yMax, Math.round(pt.y)))];
      v = FOLD.geom.closestIndex(p, this.fold.vertices_coords);
      if (v != null) {
        vertex = this.fold.vertices_coords[v];
        if (FOLD.geom.dist(vertex, p) < FOLD.geom.dist(closest, p)) {
          closest = vertex;
        }
      }
      return {
        x: closest[0],
        y: closest[1]
      };
    }

    setTitle(title) {
      return this.fold['file_title'] = title;
    }

    setMode(mode) {
      var ref;
      if ((ref = this.mode) != null) {
        ref.exit(this);
      }
      this.mode = mode;
      return this.mode.enter(this);
    }

    setLineType(lineType) {
      this.lineType = lineType;
    }

    setAbsFoldAngle(absFoldAngle) {
      this.absFoldAngle = absFoldAngle;
    }

    getFoldAngle() {
      if (this.lineType === 'V') {
        return this.absFoldAngle;
      } else if (this.lineType === 'M') {
        return -this.absFoldAngle;
      } else {
        return 0;
      }
    }

    escape() {
      var ref;
      return (ref = this.mode) != null ? typeof ref.escape === "function" ? ref.escape(this) : void 0 : void 0;
    }

    addVertex(v) {
      var changedEdges, e, i, j, len;
      [i, changedEdges] = FOLD.filter.addVertexAndSubdivide(this.fold, [v.x, v.y], FOLD.geom.EPS);
      if (i === this.fold.vertices_coords.length - 1) { // new vertex
        this.drawVertex(i);
      }
      for (j = 0, len = changedEdges.length; j < len; j++) {
        e = changedEdges[j];
        this.drawEdge(e);
      }
      return i;
    }

    addCrease(p1, p2, assignment, foldAngle) {
      var changedEdges, e, i, j, k, len, len1, len2, m, n, newVertices, ref, ref1, ref2, ref3, ref4, results1, v;
      p1 = this.addVertex(p1);
      p2 = this.addVertex(p2);
      newVertices = this.fold.vertices_coords.length;
      changedEdges = FOLD.filter.addEdgeAndSubdivide(this.fold, p1, p2, FOLD.geom.EPS);
      ref = changedEdges[0];
      for (j = 0, len = ref.length; j < len; j++) {
        e = ref[j];
        this.fold.edges_assignment[e] = assignment;
        this.fold.edges_foldAngle[e] = foldAngle;
      }
      ref1 = [0, 1];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        i = ref1[k];
        ref2 = changedEdges[i];
        for (m = 0, len2 = ref2.length; m < len2; m++) {
          e = ref2[m];
          this.drawEdge(e);
        }
      }
      results1 = [];
      for (v = n = ref3 = newVertices, ref4 = this.fold.vertices_coords.length; (ref3 <= ref4 ? n < ref4 : n > ref4); v = ref3 <= ref4 ? ++n : --n) {
        results1.push(this.drawVertex(v));
      }
      return results1;
    }

    //console.log @fold
    //@loadFold @fold
    subdivide() {
      FOLD.filter.collapseNearbyVertices(this.fold, FOLD.geom.EPS);
      FOLD.filter.subdivideCrossingEdges_vertices(this.fold, FOLD.geom.EPS);
      return this.loadFold(this.fold);
    }

    saveForUndo() {
      this.undoStack.push(FOLD.convert.deepCopy(this.fold));
      this.redoStack = [];
      return this.updateUndoStack();
    }

    undo() {
      if (!this.undoStack.length) {
        return;
      }
      this.redoStack.push(this.fold);
      this.fold = this.undoStack.pop();
      this.loadFold(this.fold);
      return this.updateUndoStack();
    }

    redo() {
      if (!this.redoStack.length) {
        return;
      }
      this.undoStack.push(this.fold);
      this.fold = this.redoStack.pop();
      this.loadFold(this.fold);
      return this.updateUndoStack();
    }

    updateUndoStack() {
      var ref, ref1;
      if (typeof document !== "undefined" && document !== null) {
        if ((ref = document.getElementById('undo')) != null) {
          ref.disabled = this.undoStack.length === 0;
        }
      }
      return typeof document !== "undefined" && document !== null ? (ref1 = document.getElementById('redo')) != null ? ref1.disabled = this.redoStack.length === 0 : void 0 : void 0;
    }

    transform(matrix, integerize = true) {
      var coords, i, int, integers, ints, j, k, len, len1, v, x;
      /*
      Main transforms we care about (reflection and 90-degree rotation) should
      preserve integrality of coordinates.  Force this when integerize is true.
      */
      this.saveForUndo();
      if (integerize) {
        integers = (function() {
          var j, len, ref, results1;
          ref = this.fold.vertices_coords;
          results1 = [];
          for (j = 0, len = ref.length; j < len; j++) {
            coords = ref[j];
            results1.push((function() {
              var k, len1, results2;
              results2 = [];
              for (k = 0, len1 = coords.length; k < len1; k++) {
                x = coords[k];
                results2.push(Number.isInteger(x));
              }
              return results2;
            })());
          }
          return results1;
        }).call(this);
      }
      FOLD.filter.transform(this.fold, matrix);
      if (integerize) {
        for (v = j = 0, len = integers.length; j < len; v = ++j) {
          ints = integers[v];
          for (i = k = 0, len1 = ints.length; k < len1; i = ++k) {
            int = ints[i];
            if (int) {
              this.fold.vertices_coords[v][i] = Math.round(this.fold.vertices_coords[v][i]);
            }
          }
        }
      }
      return this.loadFold(this.fold);
    }

    reflectX() {
      var xMax, xMin;
      ({xMin, xMax} = this.fold['cpedit:page']);
      return this.transform(FOLD.geom.matrixReflectAxis(0, 2, (xMin + xMax) / 2));
    }

    reflectY() {
      var yMax, yMin;
      ({yMin, yMax} = this.fold['cpedit:page']);
      return this.transform(FOLD.geom.matrixReflectAxis(1, 2, (yMin + yMax) / 2));
    }

    rotate90(cw) {
      var angle, xMax, xMin, yMax, yMin;
      ({xMin, xMax, yMin, yMax} = this.fold['cpedit:page']);
      if (cw) {
        angle = Math.PI / 2;
      } else {
        angle = -Math.PI / 2;
      }
      return this.transform(FOLD.geom.matrixRotate2D(angle, [(xMin + xMax) / 2, (yMin + yMax) / 2]));
    }

    rotateCW() {
      return this.rotate90(true);
    }

    rotateCCW() {
      return this.rotate90(false);
    }

    translate(dx, dy) {
      return this.transform(FOLD.geom.matrixTranslate([dx, dy]));
    }

    shiftL() {
      return this.translate(-1, 0);
    }

    shiftR() {
      return this.translate(+1, 0);
    }

    shiftU() {
      return this.translate(0, -1);
    }

    shiftD() {
      return this.translate(0, +1);
    }

    loadFold(fold1) {
      var assignment, base, base1, ref, ref1, ref2, ref3, v;
      this.fold = fold1;
      this.fold.version = 1.2;
      if ((ref = this.mode) != null) {
        ref.exit(this);
      }
      this.drawVertices();
      if ((base = this.fold).edges_foldAngle == null) {
        base.edges_foldAngle = (function() {
          var j, len, ref1, results1;
          ref1 = this.fold.edges_assignment;
          results1 = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            assignment = ref1[j];
            switch (assignment) {
              case 'V':
                results1.push(180); // "The fold angle is positive for valley folds,"
                break;
              case 'M':
                results1.push(-180); // "negative for mountain folds, and"
                break;
              default:
                results1.push(0); // "zero for flat, unassigned, and border folds"
            }
          }
          return results1;
        }).call(this);
      }
      this.drawEdges();
      if ((base1 = this.fold)["cpedit:page"] == null) {
        base1["cpedit:page"] = ((ref1 = this.fold.vertices_coords) != null ? ref1.length : void 0) ? {
          xMin: Math.min(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[0]);
            }
            return results1;
          }).call(this))),
          yMin: Math.min(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[1]);
            }
            return results1;
          }).call(this))),
          xMax: Math.max(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[0]);
            }
            return results1;
          }).call(this))),
          yMax: Math.max(...((function() {
            var j, len, ref2, results1;
            ref2 = this.fold.vertices_coords;
            results1 = [];
            for (j = 0, len = ref2.length; j < len; j++) {
              v = ref2[j];
              results1.push(v[1]);
            }
            return results1;
          }).call(this)))
        } : defaultPage();
      }
      this.updateGrid();
      if (typeof document !== "undefined" && document !== null) {
        document.getElementById('title').value = (ref2 = this.fold.file_title) != null ? ref2 : '';
      }
      return (ref3 = this.mode) != null ? ref3.enter(this) : void 0;
    }

    drawVertices() {
      var j, ref, results1, v;
      this.vertexGroup.clear();
      results1 = [];
      for (v = j = 0, ref = this.fold.vertices_coords.length; (0 <= ref ? j < ref : j > ref); v = 0 <= ref ? ++j : --j) {
        results1.push(this.drawVertex(v));
      }
      return results1;
    }

    drawEdges() {
      var e, j, ref, results1;
      this.creaseGroup.clear();
      results1 = [];
      for (e = j = 0, ref = this.fold.edges_vertices.length; (0 <= ref ? j < ref : j > ref); e = 0 <= ref ? ++j : --j) {
        results1.push(this.drawEdge(e));
      }
      return results1;
    }

    drawVertex(v) {
      var ref;
      if ((ref = this.vertexCircle[v]) != null) {
        ref.remove();
      }
      return this.vertexCircle[v] = this.vertexGroup.circle(0.2).center(...this.fold.vertices_coords[v]).attr('data-index', v);
    }

    drawEdge(e) {
      var coords, l, ref, v;
      if ((ref = this.creaseLine[e]) != null) {
        ref.remove();
      }
      coords = (function() {
        var j, len, ref1, results1;
        ref1 = this.fold.edges_vertices[e];
        results1 = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          v = ref1[j];
          results1.push(this.fold.vertices_coords[v]);
        }
        return results1;
      }).call(this);
      return this.creaseLine[e] = l = this.creaseGroup.line(coords[0][0], coords[0][1], coords[1][0], coords[1][1]).addClass(this.fold.edges_assignment[e]).attr('stroke-opacity', foldAngleToOpacity(this.fold.edges_foldAngle[e], this.fold.edges_assignment[e])).attr('data-index', e);
    }

    cleanup() {
      var coords, edge, edges, i, j, k, len, m, otherV, ref, ref1, v, vectors, vertex, vertices;
      // Check for vertices of degree 0, or of degree 2
      // where the two incident edges are parallel.
      // Consider vertices in decreasing order so that indices don't change.
      FOLD.convert.edges_vertices_to_vertices_edges_unsorted(this.fold);
      for (v = j = ref = this.fold.vertices_coords.length - 1; (ref <= 0 ? j <= 0 : j >= 0); v = ref <= 0 ? ++j : --j) {
        if (this.fold.vertices_edges[v].length === 0) {
          FOLD.filter.removeVertex(this.fold, v);
        } else if (this.fold.vertices_edges[v].length === 2) {
          edges = this.fold.vertices_edges[v];
          vectors = (function() {
            var k, len, results1;
            results1 = [];
            for (k = 0, len = edges.length; k < len; k++) {
              edge = edges[k];
              vertices = this.fold.edges_vertices[edge];
              coords = (function() {
                var len1, m, results2;
                results2 = [];
                for (m = 0, len1 = vertices.length; m < len1; m++) {
                  vertex = vertices[m];
                  results2.push(this.fold.vertices_coords[vertex]);
                }
                return results2;
              }).call(this);
              results1.push(FOLD.geom.mul(FOLD.geom.unit(FOLD.geom.sub(coords[0], coords[1])), vertices[0] === v ? 1 : -1));
            }
            return results1;
          }).call(this);
          if ((FOLD.geom.dot(vectors[0], vectors[1])) <= -1 + FOLD.geom.EPS) {
            ref1 = this.fold.edges_vertices[edges[1]];
            for (k = 0, len = ref1.length; k < len; k++) {
              otherV = ref1[k];
              if (v !== otherV) {
                break;
              }
            }
            vertices = this.fold.edges_vertices[edges[0]];
            for (i = m = 0; m < 2; i = ++m) {
              if (vertices[i] === v) {
                vertices[i] = otherV;
              }
            }
            FOLD.filter.removeEdge(this.fold, edges[1]);
            FOLD.filter.removeVertex(this.fold, v);
            FOLD.convert.edges_vertices_to_vertices_edges_unsorted(this.fold);
          }
        }
      }
      delete this.fold.vertices_edges;
      this.drawVertices();
      return this.drawEdges();
    }

    convertToFold(splitCuts, json = true) {
      var c, fold;
      //# Add face structure to @fold
      fold = FOLD.convert.deepCopy(this.fold);
      FOLD.convert.edges_vertices_to_vertices_edges_sorted(fold);
      fold.frame_classes = (function() {
        var j, len, ref, ref1, results1;
        ref1 = (ref = fold.frame_classes) != null ? ref : [];
        results1 = [];
        for (j = 0, len = ref1.length; j < len; j++) {
          c = ref1[j];
          if (c !== 'cuts' && c !== 'noCuts') {
            results1.push(c);
          }
        }
        return results1;
      })();
      if (!FOLD.filter.cutEdges(fold).length) {
        fold.frame_classes.push('noCuts');
      } else if (splitCuts) {
        fold.frame_classes.push('noCuts');
        FOLD.filter.splitCuts(fold);
      } else {
        //console.log 'cut', fold
        fold.frame_classes.push('cuts');
      }
      FOLD.convert.vertices_edges_to_faces_vertices_edges(fold);
      if (json) {
        //console.log fold
        fold = FOLD.convert.toJSON(fold);
      }
      return fold;
    }

    downloadFold() {
      //json = FOLD.convert.toJSON @fold  # minimal content
      return this.download(this.convertToFold(false), 'application/json', '.fold');
    }

    downloadSplitFold() {
      return this.download(this.convertToFold(true), 'application/json', '-split.fold');
    }

    convertToSVG(options) {
      var svg;
      svg = this.svg.clone();
      svg.find('.C').front();
      svg.find('.B').front();
      svg.find('.B').stroke({
        color: '#000000'
      });
      if (options != null ? options.nice : void 0) {
        //# Cuts look the same as boundary, and are very thick (0.2).
        svg.find('.B, .C').stroke({
          width: 0.2
        });
        svg.find('.C').stroke({
          color: '#000000'
        });
        //# Nice blue/red, even in grayscale
        svg.find('.M').stroke({
          color: '#ff6060'
        });
        svg.find('.V').stroke({
          color: '#385dcf'
        });
        //# Instead of opacity, use thickness for bigger folds.
        //# 90 degrees has thickness 0.1, while 180 degrees has thickness 0.15.
        svg.find('.M, .V, .B, .C').each(function() {
          var t;
          t = this.attr('stroke-opacity');
          this.stroke({
            width: (1 - t) * 0.05 + t * 0.15
          });
          return this.attr('stroke-opacity', 1);
        });
      } else {
        svg.find('.M, .V, .B, .C').stroke({
          width: 0.1
        });
        svg.find('.C').stroke({
          color: '#00ff00'
        });
        svg.find('.M').stroke({
          color: '#ff0000'
        });
        svg.find('.V').stroke({
          color: '#0000ff'
        });
      }
      if (!(options != null ? options.noUnfold : void 0)) {
        svg.find('.U').stroke({
          color: '#ffff00',
          width: 0.1
        });
      }
      svg.find('.vertex, .drag').remove();
      if (options != null ? options.grid : void 0) {
        svg.find('.grid').stroke({
          color: '#dddddd',
          width: 0.05
        });
      } else {
        svg.find('.grid').remove();
      }
      svg.attr('width', `${this.svg.viewbox().width}cm`);
      svg.attr('height', `${this.svg.viewbox().height}cm`);
      svg.element('style').words(`line { stroke-linecap: round; }`);
      return svg.svg().replace(/[ ]id="[^"]+"/g, '');
    }

    downloadSVG() {
      return this.download(this.convertToSVG(), 'image/svg+xml', '.svg');
    }

    download(content, type, extension) {
      var a, url;
      a = document.getElementById('download');
      a.href = url = URL.createObjectURL(new Blob([content], {type}));
      a.download = (this.fold.file_title || 'creasepattern') + extension;
      a.click();
      a.href = '';
      return URL.revokeObjectURL(url);
    }

  };

  Mode = class Mode {};

  LineDrawMode = class LineDrawMode extends Mode {
    enter(editor) {
      var move, svg;
      svg = editor.svg;
      this.which = 0; //# 0 = first point, 1 = second point
      this.points = {};
      this.circles = [];
      this.crease = this.line = null;
      this.dragging = false;
      svg.mousemove(move = (e) => {
        var point;
        point = editor.nearestFeature(svg.point(e.clientX, e.clientY));
        //# Wait for distance threshold in drag before triggering drag
        if (e.buttons) {
          if (this.down != null) {
            if (!(point.x === this.down.x && point.y === this.down.y)) {
              this.dragging = true;
              this.which = 1;
            }
          } else if (this.down === null) {
            this.down = point;
          }
        }
        this.points[this.which] = point;
        if (!(this.which < this.circles.length)) {
          this.circles.push(editor.dragGroup.circle(0.3));
        }
        this.circles[this.which].center(this.points[this.which].x, this.points[this.which].y);
        if (this.which === 1) {
          if (this.line == null) {
            this.line = editor.dragGroup.line().addClass('drag');
          }
          if (this.crease == null) {
            this.crease = editor.dragGroup.line().addClass(editor.lineType).attr('stroke-opacity', foldAngleToOpacity(editor.getFoldAngle(), editor.lineType));
          }
          this.line.plot(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
          return this.crease.plot(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
        }
      });
      svg.mousedown((e) => {
        this.down = null; // special value meaning 'set'
        return move(e);
      });
      svg.mouseup((e) => {
        move(e);
        //# Click, click style line drawing: advance to second point if not
        //# currently in drag mode, and didn't just @escape (no "down" point).
        if (this.which === 0 && !this.dragging && this.down !== void 0) {
          return this.which = 1;
        } else {
          //# Commit new crease, unless it's zero length.
          if (!(this.which === 0 || (this.points[0].x === this.points[1].x && this.points[0].y === this.points[1].y))) {
            editor.saveForUndo();
            editor.addCrease(this.points[0], this.points[1], editor.lineType, editor.getFoldAngle());
          }
          this.escape(editor);
          return move(e);
        }
      });
      svg.mouseenter((e) => {
        if (this.dragging && e.buttons === 0) {
          //# Cancel crease if user exits, lets go of button, and re-enters
          this.escape(editor);
        }
        return move(e);
      });
      return svg.mouseleave((e) => {
        if (this.circles.length === this.which + 1) {
          return this.circles.pop().remove();
        }
      });
    }

    escape(editor) {
      var ref, ref1;
      while (this.circles.length) {
        this.circles.pop().remove();
      }
      if ((ref = this.crease) != null) {
        ref.remove();
      }
      if ((ref1 = this.line) != null) {
        ref1.remove();
      }
      this.crease = this.line = null;
      this.which = 0;
      this.dragging = false;
      return this.down = void 0;
    }

    exit(editor) {
      this.escape(editor);
      return editor.svg.mousemove(null).mousedown(null).mouseup(null).mouseenter(null).mouseleave(null);
    }

  };

  LinePaintMode = class LinePaintMode extends Mode {
    enter(editor) {
      var change, svg;
      svg = editor.svg;
      svg.mousedown(change = (e) => {
        var edge;
        if (!e.buttons) {
          return;
        }
        if (e.target.tagName !== 'line') {
          return;
        }
        edge = parseInt(e.target.getAttribute('data-index'));
        if (isNaN(edge)) {
          return;
        }
        return this.paint(editor, edge);
      });
      return svg.mouseover(change); // painting
    }

    exit(editor) {
      return editor.svg.mousedown(null).mouseover(null);
    }

  };

  LineAssignMode = class LineAssignMode extends LinePaintMode {
    paint(editor, edge) {
      if (!(editor.fold.edges_assignment[edge] === editor.lineType && editor.fold.edges_foldAngle[edge] === editor.getFoldAngle())) {
        editor.saveForUndo();
        editor.fold.edges_assignment[edge] = editor.lineType;
        editor.fold.edges_foldAngle[edge] = editor.getFoldAngle();
        return editor.drawEdge(edge);
      }
    }

  };

  LineEraseMode = class LineEraseMode extends LinePaintMode {
    paint(editor, edge) {
      var edgeVertices, incident, j, k, len, len1, len2, m, ref, results1, vertex, vertices;
      editor.saveForUndo();
      vertices = editor.fold.edges_vertices[edge];
      FOLD.filter.removeEdge(editor.fold, edge);
      editor.drawEdges();
      // Remove any now-isolated vertices
      incident = {};
      ref = editor.fold.edges_vertices;
      for (j = 0, len = ref.length; j < len; j++) {
        edgeVertices = ref[j];
        for (k = 0, len1 = edgeVertices.length; k < len1; k++) {
          vertex = edgeVertices[k];
          incident[vertex] = true;
        }
      }
      // Remove vertices in decreasing order so that indices don't change
      if (vertices[0] < vertices[1]) {
        vertices = [vertices[1], vertices[0]];
      }
      results1 = [];
      for (m = 0, len2 = vertices.length; m < len2; m++) {
        vertex = vertices[m];
        if (!incident[vertex]) {
          FOLD.filter.removeVertex(editor.fold, vertex);
          results1.push(editor.drawVertices()); // might get called twice
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    }

  };

  VertexMoveMode = class VertexMoveMode extends Mode {
    enter(editor) {
      var move, svg;
      svg = editor.svg;
      svg.mousemove(move = (e) => {
        this.point = editor.nearestFeature(svg.point(e.clientX, e.clientY));
        if (this.vertex != null) {
          return this.drag(editor);
        }
      });
      svg.mousedown((e) => {
        this.vertex = parseInt(e.target.getAttribute('data-index'));
        if (e.target.tagName === 'circle' && (this.vertex != null)) {
          this.circle = e.target.instance.addClass('drag');
          this.down = null; // special value meaning 'set'
          return move(e);
        } else {
          return this.circle = this.vertex = null;
        }
      });
      svg.mouseup((e) => {
        move(e);
        if (this.vertex != null) {
          //# Commit new location
          if (!(this.point.x === editor.fold.vertices_coords[this.vertex][0] && this.point.y === editor.fold.vertices_coords[this.vertex][1])) {
            editor.saveForUndo();
            editor.fold.vertices_coords[this.vertex][0] = this.point.x;
            editor.fold.vertices_coords[this.vertex][1] = this.point.y;
            this.vertex = null;
            editor.subdivide();
          }
          //editor.drawVertex @vertex
          //for vertices, edge in editor.fold.edges_vertices
          //  editor.drawEdge edge if @vertex in vertices
          return this.escape(editor);
        }
      });
      svg.mouseover((e) => {
        var index;
        if (this.vertex != null) {
          return;
        }
        if (!(e.target.tagName === 'circle' && (index = e.target.getAttribute('data-index')))) {
          return;
        }
        return e.target.instance.addClass('drag');
      });
      return svg.mouseout((e) => {
        if (!(e.target.tagName === 'circle' && e.target.getAttribute('data-index'))) {
          return;
        }
        if (this.vertex === parseInt(e.target.getAttribute('data-index'))) {
          return;
        }
        return e.target.instance.removeClass('drag');
      });
    }

    //svg.mouseenter (e) =>
    //  ## Cancel crease if user exits, lets go of button, and re-enters
    //  @escape editor if @dragging and e.buttons == 0
    //  move e
    //svg.mouseleave (e) =>
    //  if @circles.length == @which + 1
    //    @circles.pop().remove()
    escape(editor) {
      if (this.vertex != null) {
        this.circle.removeClass('drag');
        this.point = {
          x: editor.fold.vertices_coords[this.vertex][0],
          y: editor.fold.vertices_coords[this.vertex][1]
        };
        this.drag(editor);
      }
      return this.circle = this.vertex = null;
    }

    exit(editor) {
      this.escape(editor);
      editor.svg.find('.vertex circle.drag').removeClass('drag');
      return editor.svg.mousemove(null).mousedown(null).mouseup(null).mouseenter(null).mouseleave(null);
    }

    drag(editor) {
      var point, vertex;
      this.circle.center(this.point.x, this.point.y);
      vertex = this.vertex;
      point = this.point;
      return editor.svg.find('.crease line').each(function() {
        var edge, i;
        edge = this.attr('data-index');
        i = editor.fold.edges_vertices[edge].indexOf(vertex);
        if (i >= 0) {
          this.attr(`x${i + 1}`, point.x);
          return this.attr(`y${i + 1}`, point.y);
        }
      });
    }

  };

  modes = {
    drawLine: new LineDrawMode(),
    assignLine: new LineAssignMode(),
    eraseLine: new LineEraseMode(),
    moveVertex: new VertexMoveMode()
  };

  if (typeof window !== "undefined" && window !== null) {
    window.onload = function() {
      var amt, angle, angleInput, checkReady, delta, dim, editor, id, input, j, k, len, len1, len2, len3, len4, len5, m, n, o, onReady, op, q, ready, ref, ref1, ref2, ref3, ref4, ref5, setAngle, sign, simulator, size, svg;
      svg = SVG().addTo('#interface');
      editor = new Editor(svg);
      ref = document.getElementsByTagName('input');
      for (j = 0, len = ref.length; j < len; j++) {
        input = ref[j];
        (function(input) {
          switch (input.getAttribute('name')) {
            case 'mode':
              if (input.checked) {
                editor.setMode(modes[input.id]);
              }
              input.addEventListener('change', function(e) {
                if (!input.checked) {
                  return;
                }
                if (input.id in modes) {
                  return editor.setMode(modes[input.id]);
                } else {
                  return console.warn(`Unrecognized mode ${input.id}`);
                }
              });
              break;
            case 'line':
              if (input.checked) {
                editor.setLineType(input.value);
              }
              input.addEventListener('change', function(e) {
                if (!input.checked) {
                  return;
                }
                return editor.setLineType(input.value);
              });
          }
          return input.parentElement.addEventListener('click', function(e) {
            var ref1;
            if (!(e.target === input || ((ref1 = e.target.tagName) === 'LABEL' || ref1 === 'INPUT' || ref1 === 'A'))) {
              return input.click();
            }
          });
        })(input);
      }
      window.addEventListener('keyup', (e) => {
        switch (e.key) {
          case 'd':
          case 'D':
            return document.getElementById('drawLine').click();
          case 'a':
          case 'A':
            return document.getElementById('assignLine').click();
          case 'e':
          case 'E':
            return document.getElementById('eraseLine').click();
          case 'm':
            return document.getElementById('moveVertex').click();
          case 'b':
          case 'B':
            return document.getElementById('boundary').click();
          case 'M':
            return document.getElementById('mountain').click();
          case 'V':
            return document.getElementById('valley').click();
          case 'u':
          case 'U':
            return document.getElementById('unfolded').click();
          case 'c':
          case 'C':
            return document.getElementById('cut').click();
          case 'Escape':
            return editor.escape();
          case 'z':
            return editor.undo();
          case 'y':
          case 'Z':
            return editor.redo();
        }
      });
      ref1 = ['cleanup', 'undo', 'redo', 'reflectX', 'reflectY', 'rotateCCW', 'rotateCW', 'shiftL', 'shiftD', 'shiftU', 'shiftR'];
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        id = ref1[k];
        (function(id) {
          return document.getElementById(id).addEventListener('click', function(e) {
            e.stopPropagation();
            return editor[id]();
          });
        })(id);
      }
      document.getElementById('loadFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return document.getElementById('fileFold').click();
      });
      document.getElementById('fileFold').addEventListener('input', function(e) {
        var file, reader;
        e.stopPropagation();
        if (!e.target.files.length) {
          return;
        }
        file = e.target.files[0];
        reader = new FileReader();
        reader.onload = function() {
          return editor.loadFold(JSON.parse(reader.result));
        };
        return reader.readAsText(file);
      });
      document.getElementById('downloadFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return editor.downloadFold();
      });
      document.getElementById('downloadSplitFold').addEventListener('click', function(e) {
        e.stopPropagation();
        return editor.downloadSplitFold();
      });
      document.getElementById('downloadSVG').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return editor.downloadSVG();
      });
      ref2 = [['width', 'x'], ['height', 'y']];
      for (m = 0, len2 = ref2.length; m < len2; m++) {
        [size, dim] = ref2[m];
        ref3 = [[-1, 'Dec'], [+1, 'Inc']];
        for (n = 0, len3 = ref3.length; n < len3; n++) {
          [delta, op] = ref3[n];
          (function(size, dim, delta, op) {
            return document.getElementById(size + op).addEventListener('click', function(e) {
              e.stopPropagation();
              editor.saveForUndo();
              editor.fold["cpedit:page"][dim + 'Max'] += delta;
              return editor.updateGrid();
            });
          })(size, dim, delta, op);
        }
      }
      document.getElementById('title').addEventListener('input', function(e) {
        return editor.setTitle(document.getElementById('title').value);
      });
      //# Fold angle
      angleInput = document.getElementById('angle');
      angle = null;
      setAngle = function(value) {
        if (typeof value !== 'number') {
          return;
        }
        if (isNaN(value)) {
          return;
        }
        angle = value;
        angle = Math.max(angle, 0);
        angle = Math.min(angle, 180);
        angleInput.value = angle;
        return editor.setAbsFoldAngle(angle);
      };
      setAngle(parseFloat(angleInput.value)); // initial value
      angleInput.addEventListener('change', function(e) {
        return setAngle(eval(angleInput.value)); // allow formulas via eval
      });
      ref4 = [[+1, 'Add'], [-1, 'Sub']];
      for (o = 0, len4 = ref4.length; o < len4; o++) {
        [sign, op] = ref4[o];
        ref5 = [1, 90];
        for (q = 0, len5 = ref5.length; q < len5; q++) {
          amt = ref5[q];
          document.getElementById(`angle${op}${amt}`).addEventListener('click', (function(sign, amt) {
            return function(e) {
              return setAngle(angle + sign * amt);
            };
          })(sign, amt));
        }
      }
      //# Origami Simulator
      simulator = null;
      ready = false;
      onReady = null;
      checkReady = function() {
        if (ready) {
          if (typeof onReady === "function") {
            onReady();
          }
          return onReady = null;
        }
      };
      window.addEventListener('message', function(e) {
        if (e.data && e.data.from === 'OrigamiSimulator' && e.data.status === 'ready') {
          ready = true;
          return checkReady();
        }
      });
      return document.getElementById('simulate').addEventListener('click', function(e) {
        var assignment, fold;
        if ((simulator != null) && !simulator.closed) {
          simulator.focus();
        } else {
          ready = false;
          //simulator = window.open 'OrigamiSimulator/?model=', 'simulator'
          simulator = window.open('https://origamisimulator.org/?model=', 'simulator');
        }
        fold = editor.convertToFold(true, false); // split cuts, no JSON
        //# Origami Simulator wants 'F' for unfolded (facet) creases;
        //# it uses 'U' for undriven creases. :-/
        fold.edges_assignment = (function() {
          var len6, r, ref6, results1;
          ref6 = fold.edges_assignment;
          results1 = [];
          for (r = 0, len6 = ref6.length; r < len6; r++) {
            assignment = ref6[r];
            if (assignment === 'U') {
              results1.push('F');
            } else {
              results1.push(assignment);
            }
          }
          return results1;
        })();
        onReady = function() {
          return simulator.postMessage({
            op: 'importFold',
            fold: fold
          }, '*');
        };
        return checkReady();
      });
    };
  }

  //# CLI

    //# VDOM simulation of used subset of svg.js interface
  VSVG = class VSVG {
    constructor(tag1, parent) {
      this.tag = tag1;
      this.parent = parent;
      this.classes = new Set();
      this.attrs = new Map();
      this.children = [];
    }

    svg() {
      var c, child, key, ref, s, value, z;
      s = '';
      if (this.tag === 'svg') {
        s += `<?xml version="1.0" encoding="utf-8"?>
`;
        this.attrs.set('xmlns', 'http://www.w3.org/2000/svg');
      }
      if (this.classes.size) {
        this.attrs.set('class', ((function() {
          var ref, results1;
          ref = this.classes;
          results1 = [];
          for (c of ref) {
            results1.push(c);
          }
          return results1;
        }).call(this)).join(' '));
      } else {
        this.attrs.delete('class');
      }
      s += `<${this.tag}`;
      ref = this.attrs;
      for (z of ref) {
        [key, value] = z;
        s += ` ${key}=\"${value}\"`;
      }
      if (this.innerHTML) {
        return s + ">\n" + this.innerHTML + `\n</${this.tag}>`;
      } else if (this.children.length) {
        return s + ">\n" + ((function() {
          var j, len, ref1, results1;
          ref1 = this.children;
          results1 = [];
          for (j = 0, len = ref1.length; j < len; j++) {
            child = ref1[j];
            if (!child.removed) {
              results1.push(child.svg());
            }
          }
          return results1;
        }).call(this)).join("\n") + `\n</${this.tag}>`;
      } else {
        return s + "/>";
      }
    }

    remove() {
      this.removed = true;
      return this;
    }

    clear() {
      var child, j, len, ref;
      ref = this.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        child.parent = void 0;
      }
      this.children = [];
      return this;
    }

    attr(key, value) {
      if (value != null) {
        this.attrs.set(key, value);
        return this;
      } else {
        return this.attrs.get(key); // setter
      }
    }

    viewbox(x, y, width, height) {
      var coords;
      if (x != null) {
        return this.attr('viewBox', `${x} ${y} ${width} ${height}`);
      } else {
        coords = this.attr('viewBox').split(/\s+/).map(parseFloat);
        return {
          x: coords[0],
          y: coords[1],
          width: coords[2],
          height: coords[3]
        }; // setter
      }
    }

    addClass(c) {
      this.classes.add(c);
      return this;
    }

    group() {
      var child;
      this.children.push(child = new VSVG('g', this));
      return child;
    }

    line(x1, y1, x2, y2) {
      var child;
      this.children.push(child = new VSVG('line', this));
      return child.attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);
    }

    stroke({color, width}) {
      if (color != null) {
        this.attr('stroke', color);
      }
      if (width != null) {
        this.attr('stroke-width', width);
      }
      return this;
    }

    circle(diameter) {
      var child;
      this.children.push(child = new VSVG('circle', this));
      return child.attr('r', diameter / 2);
    }

    center(x, y) {
      console.assert(this.tag === 'circle');
      return this.attr('cx', x).attr('cy', y);
    }

    front() {
      var i;
      i = this.parent.children.indexOf(this);
      console.assert(i >= 0);
      this.parent.children.splice(i, 1);
      this.parent.children.push(this);
      return this;
    }

    element(tag) {
      var child;
      this.children.push(child = new VSVG(tag, this));
      return child;
    }

    words(child) {
      this.innerHTML = child;
      return this;
    }

    clone() {
      return this;
    }

    find(pattern) {
      var classes, j, len, match, part, recurse, ref, results, shortcut;
      classes = (function() {
        var j, len, ref, results1;
        ref = pattern.split(/\s*,\s*/);
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          part = ref[j];
          match = part.match(/^\.([^.]+)$/);
          if (match == null) {
            throw new Error(`Bad select pattern '${part}'`);
          }
          results1.push(match[1]);
        }
        return results1;
      })();
      results = [];
      results.each = function(f) {
        var j, len, node, ref, results1;
        ref = this;
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          node = ref[j];
          results1.push(f.call(node));
        }
        return results1;
      };
      ref = ['stroke', 'remove', 'front'];
      for (j = 0, len = ref.length; j < len; j++) {
        shortcut = ref[j];
        (function(shortcut) {
          return results[shortcut] = function(...args) {
            var k, len1, node, results1;
            results1 = [];
            for (k = 0, len1 = results.length; k < len1; k++) {
              node = results[k];
              results1.push(node[shortcut](...args));
            }
            return results1;
          };
        })(shortcut);
      }
      recurse = function(node) {
        var child, class_, k, len1, len2, m, ref1;
        match = false;
        for (k = 0, len1 = classes.length; k < len1; k++) {
          class_ = classes[k];
          if (node.classes.has(class_)) {
            match = true;
            break;
          }
        }
        if (match) {
          results.push(node);
        }
        ref1 = node.children;
        for (m = 0, len2 = ref1.length; m < len2; m++) {
          child = ref1[m];
          if (!child.removed) {
            recurse(child);
          }
        }
      };
      recurse(this);
      return results;
    }

  };

  cli = function(args = process.argv.slice(2)) {
    var arg, cleanup, cpData, cpFile, cpFiles, editor, format, formats, fs, j, k, len, len1, options, output, outputPath, results1;
    fs = require('fs');
    if (!args.length) {
      console.log(`Usage: coffee cpedit.coffee [formats/options] file1.fold file2.fold ...
Formats:
  -s/--svg   .svg
  -f/--fold  .fold
Options:
  -c/--cleanup    Remove unnecessary degree-0 and -2 vertices
  -g/--grid       Keep grid lines
  -u/--no-unfold  Don't color unfolded creases yellow
  -n/--nice       Nice colors instead of pure RGB for Origami Simulator`);
    }
    formats = [];
    cpFiles = [];
    cleanup = false;
    options = {};
    for (j = 0, len = args.length; j < len; j++) {
      arg = args[j];
      switch (arg) {
        case '-c':
        case '--clean':
        case '--cleanup':
          cleanup = true;
          break;
        case '-s':
        case '--svg':
          formats.push('SVG');
          break;
        case '-f':
        case '--fold':
          formats.push('Fold');
          break;
        case '-u':
        case '--no-unfold':
          options.noUnfold = true;
          break;
        case '-g':
        case '--grid':
          options.grid = true;
          break;
        case '-n':
        case '--nice':
          options.nice = true;
          break;
        default:
          if (arg.startsWith('-')) {
            console.log(`Unknown option: ${arg}`);
            continue;
          }
          cpFiles.push(arg);
      }
    }
    results1 = [];
    for (k = 0, len1 = cpFiles.length; k < len1; k++) {
      cpFile = cpFiles[k];
      editor = new Editor(new VSVG('svg'));
      cpData = JSON.parse(fs.readFileSync(cpFile, {
        encoding: 'utf8'
      }));
      editor.loadFold(cpData);
      if (cleanup) {
        editor.cleanup();
      }
      results1.push((function() {
        var len2, m, results2;
        results2 = [];
        for (m = 0, len2 = formats.length; m < len2; m++) {
          format = formats[m];
          output = editor[`convertTo${format}`](options);
          outputPath = cpFile.replace(/(\.(fold|cp))?$/, `.${format.toLowerCase()}`);
          results2.push(fs.writeFileSync(outputPath, output, {
            encoding: 'utf8'
          }));
        }
        return results2;
      })());
    }
    return results1;
  };

  if ((typeof module !== "undefined" && module !== null) && (typeof require !== "undefined" && require !== null ? require.main : void 0) === module) {
    cli();
  }

}).call(this);

}).call(this)}).call(this,require('_process'))
},{"_process":5,"fold":12,"fs":3}],8:[function(require,module,exports){
  /* FOLD FORMAT MANIPULATORS */
var convert, filter, geom,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; },
  hasProp = {}.hasOwnProperty;

geom = require('./geom');

filter = require('./filter');

convert = exports;

convert.edges_vertices_to_vertices_vertices_unsorted = function(fold) {
  /*
  Works for abstract structures, so NOT SORTED.
  Use sort_vertices_vertices to sort in counterclockwise order.
  */
  fold.vertices_vertices = filter.edges_vertices_to_vertices_vertices(fold);
  return fold;
};

convert.edges_vertices_to_vertices_edges_unsorted = function(fold) {
  /*
  Invert edges_vertices into vertices_edges.
  Works for abstract structures, so NOT SORTED.
  */
  fold.vertices_edges = filter.edges_vertices_to_vertices_edges(fold);
  return fold;
};

convert.edges_vertices_to_vertices_vertices_sorted = function(fold) {
  /*
  Given a FOLD object with 2D `vertices_coords` and `edges_vertices` property
  (defining edge endpoints), automatically computes the `vertices_vertices`
  property and sorts them counterclockwise by angle in the plane.
  */
  convert.edges_vertices_to_vertices_vertices_unsorted(fold);
  return convert.sort_vertices_vertices(fold);
};

convert.edges_vertices_to_vertices_edges_sorted = function(fold) {
  /*
  Given a FOLD object with 2D `vertices_coords` and `edges_vertices` property
  (defining edge endpoints), automatically computes the `vertices_edges`
  and `vertices_vertices` property and sorts them counterclockwise by angle
  in the plane.
  */
  convert.edges_vertices_to_vertices_vertices_sorted(fold);
  return convert.vertices_vertices_to_vertices_edges(fold);
};

convert.sort_vertices_vertices = function(fold) {
  var neighbors, ref, ref1, ref2, v;
  /*
  Sorts `fold.vertices_neighbords` in counterclockwise order using
  `fold.vertices_coordinates`.  2D only.
  Constructs `fold.vertices_neighbords` if absent, via
  `convert.edges_vertices_to_vertices_vertices`.
  */
  if (((ref = fold.vertices_coords) != null ? (ref1 = ref[0]) != null ? ref1.length : void 0 : void 0) !== 2) {
    throw new Error("sort_vertices_vertices: Vertex coordinates missing or not two dimensional");
  }
  if (fold.vertices_vertices == null) {
    convert.edges_vertices_to_vertices_vertices(fold);
  }
  ref2 = fold.vertices_vertices;
  for (v in ref2) {
    neighbors = ref2[v];
    geom.sortByAngle(neighbors, v, function(x) {
      return fold.vertices_coords[x];
    });
  }
  return fold;
};

convert.vertices_vertices_to_faces_vertices = function(fold) {
  /*
  Given a FOLD object with counterclockwise-sorted `vertices_vertices`
  property, constructs the implicitly defined faces, setting `faces_vertices`
  property.
  */
  var face, i, j, k, key, l, len, len1, len2, neighbors, next, ref, ref1, u, uv, v, w, x;
  next = {};
  ref = fold.vertices_vertices;
  for (v = j = 0, len = ref.length; j < len; v = ++j) {
    neighbors = ref[v];
    for (i = k = 0, len1 = neighbors.length; k < len1; i = ++k) {
      u = neighbors[i];
      next[`${u},${v}`] = neighbors[modulo(i - 1, neighbors.length)];
    }
  }
  //console.log u, v, neighbors[(i-1) %% neighbors.length]
  fold.faces_vertices = [];
  ref1 = (function() {
    var results;
    results = [];
    for (key in next) {
      results.push(key);
    }
    return results;
  })();
  //for uv, w of next
  for (l = 0, len2 = ref1.length; l < len2; l++) {
    uv = ref1[l];
    w = next[uv];
    if (w == null) {
      continue;
    }
    next[uv] = null;
    [u, v] = uv.split(',');
    u = parseInt(u);
    v = parseInt(v);
    face = [u, v];
    while (w !== face[0]) {
      if (w == null) {
        console.warn(`Confusion with face ${face}`);
        break;
      }
      face.push(w);
      [u, v] = [v, w];
      w = next[`${u},${v}`];
      next[`${u},${v}`] = null;
    }
    next[`${face[face.length - 1]},${face[0]}`] = null;
    //# Outside face is clockwise; exclude it.
    if ((w != null) && geom.polygonOrientation((function() {
      var len3, m, results;
      results = [];
      for (m = 0, len3 = face.length; m < len3; m++) {
        x = face[m];
        results.push(fold.vertices_coords[x]);
      }
      return results;
    })()) > 0) {
      //console.log face
      fold.faces_vertices.push(face);
    }
  }
  //else
  //  console.log face, 'clockwise'
  return fold;
};

convert.vertices_edges_to_faces_vertices_edges = function(fold) {
  /*
  Given a FOLD object with counterclockwise-sorted `vertices_edges` property,
  constructs the implicitly defined faces, setting both `faces_vertices`
  and `faces_edges` properties.  Handles multiple edges to the same vertex
  (unlike `FOLD.convert.vertices_vertices_to_faces_vertices`).
  */
  var e, e1, e2, edges, i, j, k, l, len, len1, len2, len3, m, neighbors, next, nexts, ref, ref1, v, vertex, vertices, x;
  next = [];
  ref = fold.vertices_edges;
  for (v = j = 0, len = ref.length; j < len; v = ++j) {
    neighbors = ref[v];
    next[v] = {};
    for (i = k = 0, len1 = neighbors.length; k < len1; i = ++k) {
      e = neighbors[i];
      next[v][e] = neighbors[modulo(i - 1, neighbors.length)];
    }
  }
  //console.log e, neighbors[(i-1) %% neighbors.length]
  fold.faces_vertices = [];
  fold.faces_edges = [];
  for (vertex = l = 0, len2 = next.length; l < len2; vertex = ++l) {
    nexts = next[vertex];
    for (e1 in nexts) {
      e2 = nexts[e1];
      if (e2 == null) {
        continue;
      }
      e1 = parseInt(e1);
      nexts[e1] = null;
      edges = [e1];
      vertices = [filter.edges_verticesIncident(fold.edges_vertices[e1], fold.edges_vertices[e2])];
      if (vertices[0] == null) {
        throw new Error(`Confusion at edges ${e1} and ${e2}`);
      }
      while (e2 !== edges[0]) {
        if (e2 == null) {
          console.warn(`Confusion with face containing edges ${edges}`);
          break;
        }
        edges.push(e2);
        ref1 = fold.edges_vertices[e2];
        for (m = 0, len3 = ref1.length; m < len3; m++) {
          v = ref1[m];
          if (v !== vertices[vertices.length - 1]) {
            vertices.push(v);
            break;
          }
        }
        e1 = e2;
        e2 = next[v][e1];
        next[v][e1] = null;
      }
      //# Move e1 to the end so that edges[0] connects vertices[0] to vertices[1]
      edges.push(edges.shift());
      //# Outside face is clockwise; exclude it.
      if ((e2 != null) && geom.polygonOrientation((function() {
        var len4, n, results;
        results = [];
        for (n = 0, len4 = vertices.length; n < len4; n++) {
          x = vertices[n];
          results.push(fold.vertices_coords[x]);
        }
        return results;
      })()) > 0) {
        //console.log vertices, edges
        fold.faces_vertices.push(vertices);
        fold.faces_edges.push(edges);
      }
    }
  }
  //else
  //  console.log face, 'clockwise'
  return fold;
};

convert.edges_vertices_to_faces_vertices = function(fold) {
  /*
  Given a FOLD object with 2D `vertices_coords` and `edges_vertices`,
  computes a counterclockwise-sorted `vertices_vertices` property and
  constructs the implicitly defined faces, setting `faces_vertices` property.
  */
  convert.edges_vertices_to_vertices_vertices_sorted(fold);
  return convert.vertices_vertices_to_faces_vertices(fold);
};

convert.edges_vertices_to_faces_vertices_edges = function(fold) {
  /*
  Given a FOLD object with 2D `vertices_coords` and `edges_vertices`,
  computes counterclockwise-sorted `vertices_vertices` and `vertices_edges`
  properties and constructs the implicitly defined faces, setting
  both `faces_vertices` and `faces_edges` property.
  */
  convert.edges_vertices_to_vertices_edges_sorted(fold);
  return convert.vertices_edges_to_faces_vertices_edges(fold);
};

convert.vertices_vertices_to_vertices_edges = function(fold) {
  /*
  Given a FOLD object with `vertices_vertices` and `edges_vertices`,
  fills in the corresponding `vertices_edges` property (preserving order).
  */
  var edge, edgeMap, i, j, len, ref, v1, v2, vertex, vertices;
  edgeMap = {};
  ref = fold.edges_vertices;
  for (edge = j = 0, len = ref.length; j < len; edge = ++j) {
    [v1, v2] = ref[edge];
    edgeMap[`${v1},${v2}`] = edge;
    edgeMap[`${v2},${v1}`] = edge;
  }
  return fold.vertices_edges = (function() {
    var k, len1, ref1, results;
    ref1 = fold.vertices_vertices;
    results = [];
    for (vertex = k = 0, len1 = ref1.length; k < len1; vertex = ++k) {
      vertices = ref1[vertex];
      results.push((function() {
        var l, ref2, results1;
        results1 = [];
        for (i = l = 0, ref2 = vertices.length; (0 <= ref2 ? l < ref2 : l > ref2); i = 0 <= ref2 ? ++l : --l) {
          results1.push(edgeMap[`${vertex},${vertices[i]}`]);
        }
        return results1;
      })());
    }
    return results;
  })();
};

convert.faces_vertices_to_faces_edges = function(fold) {
  /*
  Given a FOLD object with `faces_vertices` and `edges_vertices`,
  fills in the corresponding `faces_edges` property (preserving order).
  */
  var edge, edgeMap, face, i, j, len, ref, v1, v2, vertices;
  edgeMap = {};
  ref = fold.edges_vertices;
  for (edge = j = 0, len = ref.length; j < len; edge = ++j) {
    [v1, v2] = ref[edge];
    edgeMap[`${v1},${v2}`] = edge;
    edgeMap[`${v2},${v1}`] = edge;
  }
  return fold.faces_edges = (function() {
    var k, len1, ref1, results;
    ref1 = fold.faces_vertices;
    results = [];
    for (face = k = 0, len1 = ref1.length; k < len1; face = ++k) {
      vertices = ref1[face];
      results.push((function() {
        var l, ref2, results1;
        results1 = [];
        for (i = l = 0, ref2 = vertices.length; (0 <= ref2 ? l < ref2 : l > ref2); i = 0 <= ref2 ? ++l : --l) {
          results1.push(edgeMap[`${vertices[i]},${vertices[(i + 1) % vertices.length]}`]);
        }
        return results1;
      })());
    }
    return results;
  })();
};

convert.faces_vertices_to_edges = function(mesh) {
  var edge, edgeMap, face, i, key, ref, v1, v2, vertices;
  /*
  Given a FOLD object with just `faces_vertices`, automatically fills in
  `edges_vertices`, `edges_faces`, `faces_edges`, and `edges_assignment`
  (indicating which edges are boundary with 'B').
  This code currently assumes an orientable manifold, and uses nulls to
  represent missing neighbor faces in `edges_faces` (for boundary edges).
  */
  mesh.edges_vertices = [];
  mesh.edges_faces = [];
  mesh.faces_edges = [];
  mesh.edges_assignment = [];
  edgeMap = {};
  ref = mesh.faces_vertices;
  for (face in ref) {
    vertices = ref[face];
    face = parseInt(face);
    mesh.faces_edges.push((function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = vertices.length; j < len; i = ++j) {
        v1 = vertices[i];
        v1 = parseInt(v1);
        v2 = vertices[(i + 1) % vertices.length];
        if (v1 <= v2) {
          key = `${v1},${v2}`;
        } else {
          key = `${v2},${v1}`;
        }
        if (key in edgeMap) {
          edge = edgeMap[key];
          // Second instance of edge means not on boundary
          mesh.edges_assignment[edge] = null;
        } else {
          edge = edgeMap[key] = mesh.edges_vertices.length;
          if (v1 <= v2) {
            mesh.edges_vertices.push([v1, v2]);
          } else {
            mesh.edges_vertices.push([v2, v1]);
          }
          mesh.edges_faces.push([null, null]);
          // First instance of edge might be on boundary
          mesh.edges_assignment.push('B');
        }
        if (v1 <= v2) {
          mesh.edges_faces[edge][0] = face;
        } else {
          mesh.edges_faces[edge][1] = face;
        }
        results.push(edge);
      }
      return results;
    })());
  }
  return mesh;
};

convert.edges_vertices_to_edges_faces_edges = function(fold) {
  var edge, edgeMap, face, i, orient, ref, ref1, v1, v2, vertices;
  /*
  Given a `fold` object with `edges_vertices` and `faces_vertices`,
  fills in `faces_edges` and `edges_vertices`.
  */
  fold.edges_faces = (function() {
    var j, ref, results;
    results = [];
    for (edge = j = 0, ref = fold.edges_vertices.length; (0 <= ref ? j < ref : j > ref); edge = 0 <= ref ? ++j : --j) {
      results.push([null, null]);
    }
    return results;
  })();
  edgeMap = {};
  ref = fold.edges_vertices;
  for (edge in ref) {
    vertices = ref[edge];
    if (!(vertices != null)) {
      continue;
    }
    edge = parseInt(edge);
    edgeMap[`${vertices[0]},${vertices[1]}`] = [
      edge,
      0 // forward
    ];
    edgeMap[`${vertices[1]},${vertices[0]}`] = [
      edge,
      1 // backward
    ];
  }
  ref1 = fold.faces_vertices;
  for (face in ref1) {
    vertices = ref1[face];
    face = parseInt(face);
    fold.faces_edges[face] = (function() {
      var j, len, results;
      results = [];
      for (i = j = 0, len = vertices.length; j < len; i = ++j) {
        v1 = vertices[i];
        v2 = vertices[(i + 1) % vertices.length];
        [edge, orient] = edgeMap[`${v1},${v2}`];
        fold.edges_faces[edge][orient] = face;
        results.push(edge);
      }
      return results;
    })();
  }
  return fold;
};

convert.flatFoldedGeometry = function(fold, rootFace = 0) {
  var base, edge, edge2, face, face2, i, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, level, m, mapped, maxError, n, nextLevel, o, orientation, p, q, ref, ref1, ref2, ref3, ref4, ref5, ref6, row, transform, vertex, vertex2;
  /*
  Assuming `fold` is a locally flat foldable crease pattern in the xy plane,
  sets `fold.vertices_flatFoldCoords` to give the flat-folded geometry
  as determined by repeated reflection relative to `rootFace`; sets
  `fold.faces_flatFoldTransform` transformation matrix mapping each face's
  unfolded --> folded geometry; and sets `fold.faces_flatFoldOrientation` to
  +1 or -1 to indicate whether each folded face matches its original
  orientation or is upside-down (so is oriented clockwise in 2D).

  Requires `fold` to have `vertices_coords` and `edges_vertices`;
  `edges_faces` and `faces_edges` will be created if they do not exist.

  Returns the maximum displacement error from closure constraints (multiple
  mappings of the same vertices, or multiple transformations of the same face).
  */
  if ((fold.vertices_coords != null) && (fold.edges_vertices != null) && !((fold.edges_faces != null) && (fold.faces_edges != null))) {
    convert.edges_vertices_to_edges_faces_edges(fold);
  }
  maxError = 0;
  level = [rootFace];
  fold.faces_flatFoldTransform = (function() {
    var j, ref, results;
    results = [];
    for (face = j = 0, ref = fold.faces_edges.length; (0 <= ref ? j < ref : j > ref); face = 0 <= ref ? ++j : --j) {
      results.push(null);
    }
    return results;
  })();
  fold.faces_flatFoldTransform[rootFace] = [
    [1,
    0,
    0],
    [
      0,
      1,
      0 // identity
    ]
  ];
  fold.faces_flatFoldOrientation = (function() {
    var j, ref, results;
    results = [];
    for (face = j = 0, ref = fold.faces_edges.length; (0 <= ref ? j < ref : j > ref); face = 0 <= ref ? ++j : --j) {
      results.push(null);
    }
    return results;
  })();
  fold.faces_flatFoldOrientation[rootFace] = +1;
  fold.vertices_flatFoldCoords = (function() {
    var j, ref, results;
    results = [];
    for (vertex = j = 0, ref = fold.vertices_coords.length; (0 <= ref ? j < ref : j > ref); vertex = 0 <= ref ? ++j : --j) {
      results.push(null);
    }
    return results;
  })();
  ref = fold.faces_edges[rootFace];
  // Use fold.faces_edges -> fold.edges_vertices, which are both needed below,
  // in case fold.faces_vertices isn't defined.
  for (j = 0, len = ref.length; j < len; j++) {
    edge = ref[j];
    ref1 = fold.edges_vertices[edge];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      vertex = ref1[k];
      if ((base = fold.vertices_flatFoldCoords)[vertex] == null) {
        base[vertex] = fold.vertices_coords[vertex].slice(0);
      }
    }
  }
  while (level.length) {
    nextLevel = [];
    for (l = 0, len2 = level.length; l < len2; l++) {
      face = level[l];
      orientation = -fold.faces_flatFoldOrientation[face];
      ref2 = fold.faces_edges[face];
      for (m = 0, len3 = ref2.length; m < len3; m++) {
        edge = ref2[m];
        ref3 = fold.edges_faces[edge];
        for (n = 0, len4 = ref3.length; n < len4; n++) {
          face2 = ref3[n];
          if (!((face2 != null) && face2 !== face)) {
            continue;
          }
          transform = geom.matrixMatrix(fold.faces_flatFoldTransform[face], geom.matrixReflectLine(...((function() {
            var len5, o, ref4, results;
            ref4 = fold.edges_vertices[edge];
            results = [];
            for (o = 0, len5 = ref4.length; o < len5; o++) {
              vertex = ref4[o];
              results.push(fold.vertices_coords[vertex]);
            }
            return results;
          })())));
          if (fold.faces_flatFoldTransform[face2] != null) {
            ref4 = fold.faces_flatFoldTransform[face2];
            for (i = o = 0, len5 = ref4.length; o < len5; i = ++o) {
              row = ref4[i];
              maxError = Math.max(maxError, geom.dist(row, transform[i]));
            }
            if (orientation !== fold.faces_flatFoldOrientation[face2]) {
              maxError = Math.max(1, maxError);
            }
          } else {
            fold.faces_flatFoldTransform[face2] = transform;
            fold.faces_flatFoldOrientation[face2] = orientation;
            ref5 = fold.faces_edges[face2];
            for (p = 0, len6 = ref5.length; p < len6; p++) {
              edge2 = ref5[p];
              ref6 = fold.edges_vertices[edge2];
              for (q = 0, len7 = ref6.length; q < len7; q++) {
                vertex2 = ref6[q];
                mapped = geom.matrixVector(transform, fold.vertices_coords[vertex2]);
                if (fold.vertices_flatFoldCoords[vertex2] != null) {
                  maxError = Math.max(maxError, geom.dist(fold.vertices_flatFoldCoords[vertex2], mapped));
                } else {
                  fold.vertices_flatFoldCoords[vertex2] = mapped;
                }
              }
            }
            nextLevel.push(face2);
          }
        }
      }
    }
    level = nextLevel;
  }
  return maxError;
};

convert.deepCopy = function(fold) {
  var copy, item, j, key, len, ref, results, value;
  //# Given a FOLD object, make a copy that shares no pointers with the original.
  if ((ref = typeof fold) === 'number' || ref === 'string' || ref === 'boolean') {
    return fold;
  } else if (Array.isArray(fold)) {
    results = [];
    for (j = 0, len = fold.length; j < len; j++) {
      item = fold[j];
      results.push(convert.deepCopy(item)); // Object
    }
    return results;
  } else {
    copy = {};
    for (key in fold) {
      if (!hasProp.call(fold, key)) continue;
      value = fold[key];
      copy[key] = convert.deepCopy(value);
    }
    return copy;
  }
};

convert.toJSON = function(fold) {
  var key, obj, value;
  //# Convert FOLD object into a nicely formatted JSON string.
  return "{\n" + ((function() {
    var results;
    results = [];
    for (key in fold) {
      value = fold[key];
      results.push(`  ${JSON.stringify(key)}: ` + (Array.isArray(value) ? "[\n" + ((function() {
        var j, len, results1;
        results1 = [];
        for (j = 0, len = value.length; j < len; j++) {
          obj = value[j];
          results1.push(`    ${JSON.stringify(obj)}`);
        }
        return results1;
      })()).join(',\n') + "\n  ]" : JSON.stringify(value)));
    }
    return results;
  })()).join(',\n') + "\n}\n";
};

convert.extensions = {};

convert.converters = {};

convert.getConverter = function(fromExt, toExt) {
  if (fromExt === toExt) {
    return function(x) {
      return x;
    };
  } else {
    return convert.converters[`${fromExt}${toExt}`];
  }
};

convert.setConverter = function(fromExt, toExt, converter) {
  convert.extensions[fromExt] = true;
  convert.extensions[toExt] = true;
  return convert.converters[`${fromExt}${toExt}`] = converter;
};

convert.convertFromTo = function(data, fromExt, toExt) {
  var converter;
  if (fromExt[0] !== '.') {
    fromExt = `.${fromExt}`;
  }
  if (toExt[0] !== '.') {
    toExt = `.${toExt}`;
  }
  converter = convert.getConverter(fromExt, toExt);
  if (converter == null) {
    if (fromExt === toExt) {
      return data;
    }
    throw new Error(`No converter from ${fromExt} to ${toExt}`);
  }
  return converter(data);
};

convert.convertFrom = function(data, fromExt) {
  return convert.convertFromTo(data, fromExt, '.fold');
};

convert.convertTo = function(data, toExt) {
  return convert.convertFromTo(data, '.fold', toExt);
};

convert.oripa = require('./oripa');

},{"./filter":10,"./geom":11,"./oripa":13}],9:[function(require,module,exports){
(function (process){(function (){
var convert, file, fs, path;

fs = require('fs');

path = require('path');

convert = require('./convert');

file = exports;

file.extensionOf = function(filename) {
  var parsed;
  parsed = path.parse(filename);
  if (parsed.ext) {
    return parsed.ext;
  } else if (parsed.base[0] === '.') {
    return parsed.base;
  } else if (`.${filename}` in convert.extensions) {
    return `.${filename}`;
  } else {
    return null;
  }
};

file.toFile = function(fold, output, converter = null) {
  var outFormat, result;
  outFormat = file.extensionOf(output);
  if (!outFormat) {
    console.warn(`Could not detect extension of ${output}`);
    return;
  }
  if (converter == null) {
    converter = convert.getConverter('.fold', outFormat);
    if (converter == null) {
      console.warn(`No converter from .fold to ${outFormat}`);
      return;
    }
  }
  result = converter(fold);
  if (typeof result !== 'string') {
    result = convert.toJSON(result);
  }
  return fs.writeFileSync(output, result, 'utf-8');
};

file.fileToFile = function(input, output, options) {
  var converter, inFormat, outFormat, result;
  inFormat = file.extensionOf(input);
  outFormat = file.extensionOf(output);
  if (!inFormat) {
    console.warn(`Could not detect extension of ${input}`);
    return;
  }
  if (!outFormat) {
    console.warn(`Could not detect extension of ${output}`);
    return;
  }
  converter = options.converter;
  if (converter == null) {
    converter = convert.getConverter(inFormat, outFormat);
    if (converter == null) {
      console.warn(`No converter from ${inFormat} to ${outFormat}`);
      return;
    }
  }
  if (outFormat === output || outFormat === `.${output}`) {
    //# just extension => concatenate
    output = path.parse(input);
    output.ext = outFormat;
    output.base = output.name + output.ext;
    output = path.format(output);
  }
  if (input === output) {
    return console.warn(`Attempt to convert ${input} to same filename`);
  } else {
    console.log(input, '->', output);
    result = fs.readFileSync(input, 'utf-8');
    if ((inFormat === '.fold' && '.fold' !== outFormat)) { // avoid double mogrification
      result = file.mogrify(result, options);
    }
    result = converter(result);
    if (outFormat === '.fold') {
      result = file.mogrify(result, options);
    }
    if (typeof result !== 'string') {
      result = convert.toJSON(result);
    }
    return fs.writeFileSync(output, result, 'utf-8');
  }
};

file.mogrify = function(data, options) {
  var error, fold;
  if (!options.flatFold) { // or any options set
    return;
  }
  fold = JSON.parse(data);
  fold.file_creator = "fold-convert";
  if (options.flatFold) {
    fold.file_creator += " --flat-fold";
    error = convert.flatFoldedGeometry(fold);
    console.log(` -- Flat folding error: ${error}`);
    fold.vertices_flatUnfoldCoords = fold.vertices_coords;
    fold.vertices_coords = fold.vertices_flatFoldCoords;
    fold.frame_classes = fold.frame_classes.filter(function(x) {
      return x !== 'creasePattern';
    }).concat('foldedForm');
    delete fold.vertices_flatFoldCoords;
  }
  return convert.toJSON(fold);
};

file.main = function(args = process.argv.slice(2)) {
  var arg, filename, filenames, i, j, len, len1, mode, options, output, results;
  filenames = [];
  output = '.fold'; //# Default behavior: convert to .fold
  options = {
    flatFold: false
  };
  mode = null;
  for (i = 0, len = args.length; i < len; i++) {
    arg = args[i];
    switch (mode) {
      case 'output':
        output = arg;
        mode = null;
        break;
      default:
        switch (arg) {
          case '-o':
          case '--output':
            mode = 'output';
            break;
          case '--flat-fold':
            options.flatFold = true;
            break;
          default:
            filenames.push(arg);
        }
    }
  }
  results = [];
  for (j = 0, len1 = filenames.length; j < len1; j++) {
    filename = filenames[j];
    results.push(file.fileToFile(filename, output, options));
  }
  return results;
};

if (require.main === module) {
  file.main();
}

}).call(this)}).call(this,require('_process'))
},{"./convert":8,"_process":5,"fs":3,"path":4}],10:[function(require,module,exports){
var RepeatedPointsDS, filter, geom,
  indexOf = [].indexOf;

geom = require('./geom');

filter = exports;

filter.edgesAssigned = function(fold, target) {
  var assignment, i, k, len, ref, results;
  ref = fold.edges_assignment;
  results = [];
  for (i = k = 0, len = ref.length; k < len; i = ++k) {
    assignment = ref[i];
    if (assignment === target) {
      results.push(i);
    }
  }
  return results;
};

filter.mountainEdges = function(fold) {
  return filter.edgesAssigned(fold, 'M');
};

filter.valleyEdges = function(fold) {
  return filter.edgesAssigned(fold, 'V');
};

filter.flatEdges = function(fold) {
  return filter.edgesAssigned(fold, 'F');
};

filter.boundaryEdges = function(fold) {
  return filter.edgesAssigned(fold, 'B');
};

filter.unassignedEdges = function(fold) {
  return filter.edgesAssigned(fold, 'U');
};

filter.cutEdges = function(fold) {
  return filter.edgesAssigned(fold, 'C');
};

filter.joinEdges = function(fold) {
  return filter.edgesAssigned(fold, 'J');
};

filter.keysStartingWith = function(fold, prefix) {
  var key, results;
  results = [];
  for (key in fold) {
    if (key.slice(0, prefix.length) === prefix) {
      results.push(key);
    }
  }
  return results;
};

filter.keysEndingWith = function(fold, suffix) {
  var key, results;
  results = [];
  for (key in fold) {
    if (key.slice(-suffix.length) === suffix) {
      results.push(key);
    }
  }
  return results;
};

filter.remapField = function(fold, field, old2new) {
  /*
  old2new: null means throw away that object
  */
  var array, i, j, k, key, l, len, len1, len2, m, new2old, old, ref, ref1;
  new2old = [];
//# later overwrites earlier
  for (i = k = 0, len = old2new.length; k < len; i = ++k) {
    j = old2new[i];
    if (j != null) {
      new2old[j] = i;
    }
  }
  ref = filter.keysStartingWith(fold, `${field}_`);
  for (l = 0, len1 = ref.length; l < len1; l++) {
    key = ref[l];
    fold[key] = (function() {
      var len2, m, results;
      results = [];
      for (m = 0, len2 = new2old.length; m < len2; m++) {
        old = new2old[m];
        results.push(fold[key][old]);
      }
      return results;
    })();
  }
  ref1 = filter.keysEndingWith(fold, `_${field}`);
  for (m = 0, len2 = ref1.length; m < len2; m++) {
    key = ref1[m];
    fold[key] = (function() {
      var len3, n, ref2, results;
      ref2 = fold[key];
      results = [];
      for (n = 0, len3 = ref2.length; n < len3; n++) {
        array = ref2[n];
        results.push((function() {
          var len4, o, results1;
          results1 = [];
          for (o = 0, len4 = array.length; o < len4; o++) {
            old = array[o];
            results1.push(old2new[old]);
          }
          return results1;
        })());
      }
      return results;
    })();
  }
  return fold;
};

filter.remapFieldSubset = function(fold, field, keep) {
  var id, old2new, value;
  id = 0;
  old2new = (function() {
    var k, len, results;
    results = [];
    for (k = 0, len = keep.length; k < len; k++) {
      value = keep[k];
      if (value) {
        results.push(id++);
      } else {
        results.push(null); //# remove
      }
    }
    return results;
  })();
  filter.remapField(fold, field, old2new);
  return old2new;
};

filter.remove = function(fold, field, index) {
  var i;
  /*
  Remove given index from given field ('vertices', 'edges', 'faces'), in place.
  */
  return filter.remapFieldSubset(fold, field, (function() {
    var k, ref, results;
    results = [];
    for (i = k = 0, ref = filter.numType(fold, field); (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      results.push(i !== index);
    }
    return results;
  })());
};

filter.removeVertex = function(fold, index) {
  return filter.remove(fold, 'vertices', index);
};

filter.removeEdge = function(fold, index) {
  return filter.remove(fold, 'edges', index);
};

filter.removeFace = function(fold, index) {
  return filter.remove(fold, 'faces', index);
};

filter.transform = function(fold, matrix) {
  var coords, k, key, l, len, len1, ref, ref1, transform;
  ref = filter.keysEndingWith(fold, "_coords");
  /*
  Transforms all fields ending in _coords (in particular, vertices_coords)
  and all fields ending in FoldTransform (in particular,
  faces_flatFoldTransform generated by convert.flat_folded_geometry)
  according to the given transformation matrix.
  */
  for (k = 0, len = ref.length; k < len; k++) {
    key = ref[k];
    fold[key] = (function() {
      var l, len1, ref1, results;
      ref1 = fold[key];
      results = [];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        coords = ref1[l];
        results.push(geom.matrixVector(matrix, coords));
      }
      return results;
    })();
  }
  ref1 = filter.keysEndingWith(fold, "FoldTransform");
  for (l = 0, len1 = ref1.length; l < len1; l++) {
    key = ref1[l];
    if (indexOf.call(key, '_') >= 0) {
      fold[key] = (function() {
        var len2, m, ref2, results;
        ref2 = fold[key];
        results = [];
        for (m = 0, len2 = ref2.length; m < len2; m++) {
          transform = ref2[m];
          results.push(geom.matrixMatrix(matrix, transform));
        }
        return results;
      })();
    }
  }
  return fold;
};

filter.numType = function(fold, type) {
  /*
  Count the maximum number of objects of a given type, by looking at all
  fields with key of the form `type_...`, and if that fails, looking at all
  fields with key of the form `..._type`.  Returns `0` if nothing found.
  */
  var counts, key, value;
  counts = (function() {
    var k, len, ref, results;
    ref = filter.keysStartingWith(fold, `${type}_`);
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      key = ref[k];
      value = fold[key];
      if (value.length == null) {
        continue;
      }
      results.push(value.length);
    }
    return results;
  })();
  if (!counts.length) {
    counts = (function() {
      var k, len, ref, results;
      ref = filter.keysEndingWith(fold, `_${type}`);
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        key = ref[k];
        results.push(1 + Math.max(...fold[key]));
      }
      return results;
    })();
  }
  if (counts.length) {
    return Math.max(...counts);
  } else {
    return 0; //# nothing of this type
  }
};

filter.numVertices = function(fold) {
  return filter.numType(fold, 'vertices');
};

filter.numEdges = function(fold) {
  return filter.numType(fold, 'edges');
};

filter.numFaces = function(fold) {
  return filter.numType(fold, 'faces');
};

filter.removeDuplicateEdges_vertices = function(fold) {
  var edge, id, key, old2new, seen, v, w;
  seen = {};
  id = 0;
  old2new = (function() {
    var k, len, ref, results;
    ref = fold.edges_vertices;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      edge = ref[k];
      [v, w] = edge;
      if (v < w) {
        key = `${v},${w}`;
      } else {
        key = `${w},${v}`;
      }
      if (!(key in seen)) {
        seen[key] = id;
        id += 1;
      }
      results.push(seen[key]);
    }
    return results;
  })();
  filter.remapField(fold, 'edges', old2new);
  return old2new;
};

filter.edges_verticesIncident = function(e1, e2) {
  var k, len, v;
  for (k = 0, len = e1.length; k < len; k++) {
    v = e1[k];
    if (indexOf.call(e2, v) >= 0) {
      return v;
    }
  }
  return null;
};

//# Use hashing to find points within an epsilon > 0 distance from each other.
//# Each integer cell will have O(1) distinct points before matching
//# (number of disjoint half-unit disks that fit in a unit square).
RepeatedPointsDS = class RepeatedPointsDS {
  constructor(vertices_coords, epsilon1) {
    var base, coord, k, len, name, ref, v;
    this.vertices_coords = vertices_coords;
    this.epsilon = epsilon1;
    //# Note: if vertices_coords has some duplicates in the initial state,
    //# then we will detect them but won't remove them here.  Rather,
    //# future duplicate inserts will return the higher-index vertex.
    this.hash = {};
    ref = this.vertices_coords;
    for (v = k = 0, len = ref.length; k < len; v = ++k) {
      coord = ref[v];
      ((base = this.hash)[name = this.key(coord)] != null ? base[name] : base[name] = []).push(v);
    }
    null;
  }

  lookup(coord) {
    var k, key, l, len, len1, len2, m, ref, ref1, ref2, ref3, v, x, xr, xt, y, yr, yt;
    [x, y] = coord;
    xr = Math.round(x / this.epsilon);
    yr = Math.round(y / this.epsilon);
    ref = [xr, xr - 1, xr + 1];
    for (k = 0, len = ref.length; k < len; k++) {
      xt = ref[k];
      ref1 = [yr, yr - 1, yr + 1];
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        yt = ref1[l];
        key = `${xt},${yt}`;
        ref3 = (ref2 = this.hash[key]) != null ? ref2 : [];
        for (m = 0, len2 = ref3.length; m < len2; m++) {
          v = ref3[m];
          if (this.epsilon > geom.dist(this.vertices_coords[v], coord)) {
            return v;
          }
        }
      }
    }
    return null;
  }

  key(coord) {
    var key, x, xr, y, yr;
    [x, y] = coord;
    xr = Math.round(x / this.epsilon);
    yr = Math.round(y / this.epsilon);
    return key = `${xr},${yr}`;
  }

  insert(coord) {
    var base, name, v;
    v = this.lookup(coord);
    if (v != null) {
      return v;
    }
    ((base = this.hash)[name = this.key(coord)] != null ? base[name] : base[name] = []).push(v = this.vertices_coords.length);
    this.vertices_coords.push(coord);
    return v;
  }

};

filter.collapseNearbyVertices = function(fold, epsilon) {
  var coords, old2new, vertices;
  vertices = new RepeatedPointsDS([], epsilon);
  old2new = (function() {
    var k, len, ref, results;
    ref = fold.vertices_coords;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      coords = ref[k];
      results.push(vertices.insert(coords));
    }
    return results;
  })();
  return filter.remapField(fold, 'vertices', old2new);
};

//# In particular: fold.vertices_coords = vertices.vertices_coords
filter.maybeAddVertex = function(fold, coords, epsilon) {
  /*
  Add a new vertex at coordinates `coords` and return its (last) index,
  unless there is already such a vertex within distance `epsilon`,
  in which case return the closest such vertex's index.
  */
  var i;
  i = geom.closestIndex(coords, fold.vertices_coords);
  if ((i != null) && epsilon >= geom.dist(coords, fold.vertices_coords[i])) {
    return i; //# Closest point is close enough
  } else {
    return fold.vertices_coords.push(coords) - 1;
  }
};

filter.addVertexLike = function(fold, oldVertexIndex) {
  var k, key, len, ref, vNew;
  //# Add a vertex and copy data from old vertex.
  vNew = filter.numVertices(fold);
  ref = filter.keysStartingWith(fold, 'vertices_');
  for (k = 0, len = ref.length; k < len; k++) {
    key = ref[k];
    switch (key.slice(6)) {
      case 'vertices':
        break;
      default:
        //# Leaving these broken
        fold[key][vNew] = fold[key][oldVertexIndex];
    }
  }
  return vNew;
};

filter.addEdgeLike = function(fold, oldEdgeIndex, v1, v2) {
  var eNew, k, key, len, ref;
  //# Add an edge between v1 and v2, and copy data from old edge.
  //# If v1 or v2 are unspecified, defaults to the vertices of the old edge.
  //# Must have `edges_vertices` property.
  eNew = fold.edges_vertices.length;
  ref = filter.keysStartingWith(fold, 'edges_');
  for (k = 0, len = ref.length; k < len; k++) {
    key = ref[k];
    switch (key.slice(6)) {
      case 'vertices':
        fold.edges_vertices.push([v1 != null ? v1 : fold.edges_vertices[oldEdgeIndex][0], v2 != null ? v2 : fold.edges_vertices[oldEdgeIndex][1]]);
        break;
      case 'edges':
        break;
      default:
        //# Leaving these broken
        fold[key][eNew] = fold[key][oldEdgeIndex];
    }
  }
  return eNew;
};

filter.addVertexAndSubdivide = function(fold, coords, epsilon) {
  var changedEdges, e, i, iNew, k, len, ref, s, u, v;
  v = filter.maybeAddVertex(fold, coords, epsilon);
  changedEdges = [];
  if (v === fold.vertices_coords.length - 1) {
    ref = fold.edges_vertices;
    //# Similar to "Handle overlapping edges" case:
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      e = ref[i];
      if (indexOf.call(e, v) >= 0) { // shouldn't happen
        continue;
      }
      s = (function() {
        var l, len1, results;
        results = [];
        for (l = 0, len1 = e.length; l < len1; l++) {
          u = e[l];
          results.push(fold.vertices_coords[u]);
        }
        return results;
      })();
      if (geom.pointStrictlyInSegment(coords, s)) { //# implicit epsilon
        //console.log coords, 'in', s
        iNew = filter.addEdgeLike(fold, i, v, e[1]);
        changedEdges.push(i, iNew);
        e[1] = v;
      }
    }
  }
  return [v, changedEdges];
};

filter.removeLoopEdges = function(fold) {
  var edge;
  /*
  Remove edges whose endpoints are identical.  After collapsing via
  `filter.collapseNearbyVertices`, this removes epsilon-length edges.
  */
  return filter.remapFieldSubset(fold, 'edges', (function() {
    var k, len, ref, results;
    ref = fold.edges_vertices;
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      edge = ref[k];
      results.push(edge[0] !== edge[1]);
    }
    return results;
  })());
};

filter.subdivideCrossingEdges_vertices = function(fold, epsilon, involvingEdgesFrom) {
  /*
  Using just `vertices_coords` and `edges_vertices` and assuming all in 2D,
  subdivides all crossing/touching edges to form a planar graph.
  In particular, all duplicate and loop edges are also removed.

  If called without `involvingEdgesFrom`, does all subdivision in quadratic
  time.  xxx Should be O(n log n) via plane sweep.
  In this case, returns an array of indices of all edges that were subdivided
  (both modified old edges and new edges).

  If called with `involvingEdgesFrom`, does all subdivision involving an
  edge numbered `involvingEdgesFrom` or higher.  For example, after adding an
  edge with largest number, call with `involvingEdgesFrom =
  edges_vertices.length - 1`; then this will run in linear time.
  In this case, returns two arrays of edges: the first array are all subdivided
  from the "involved" edges, while the second array is the remaining subdivided
  edges.
  */
  var addEdge, changedEdges, cross, crossI, e, e1, e2, i, i1, i2, k, l, len, len1, len2, len3, m, n, old2new, p, ref, ref1, ref2, ref3, s, s1, s2, u, v, vertices;
  changedEdges = [[], []];
  addEdge = function(v1, v2, oldEdgeIndex, which) {
    var eNew;
    //console.log 'adding', oldEdgeIndex, fold.edges_vertices.length, 'to', which
    eNew = filter.addEdgeLike(fold, oldEdgeIndex, v1, v2);
    return changedEdges[which].push(oldEdgeIndex, eNew);
  };
  //# Handle overlapping edges by subdividing edges at any vertices on them.
  //# We use a while loop instead of a for loop to process newly added edges.
  i = involvingEdgesFrom != null ? involvingEdgesFrom : 0;
  while (i < fold.edges_vertices.length) {
    e = fold.edges_vertices[i];
    s = (function() {
      var k, len, results;
      results = [];
      for (k = 0, len = e.length; k < len; k++) {
        u = e[k];
        results.push(fold.vertices_coords[u]);
      }
      return results;
    })();
    ref = fold.vertices_coords;
    for (v = k = 0, len = ref.length; k < len; v = ++k) {
      p = ref[v];
      if (indexOf.call(e, v) >= 0) {
        continue;
      }
      if (geom.pointStrictlyInSegment(p, s)) { //# implicit epsilon
        //console.log p, 'in', s
        addEdge(v, e[1], i, 0);
        e[1] = v;
      }
    }
    i++;
  }
  //# Handle crossing edges
  //# We use a while loop instead of a for loop to process newly added edges.
  vertices = new RepeatedPointsDS(fold.vertices_coords, epsilon);
  i1 = involvingEdgesFrom != null ? involvingEdgesFrom : 0;
  while (i1 < fold.edges_vertices.length) {
    e1 = fold.edges_vertices[i1];
    s1 = (function() {
      var l, len1, results;
      results = [];
      for (l = 0, len1 = e1.length; l < len1; l++) {
        v = e1[l];
        results.push(fold.vertices_coords[v]);
      }
      return results;
    })();
    ref1 = fold.edges_vertices.slice(0, i1);
    for (i2 = l = 0, len1 = ref1.length; l < len1; i2 = ++l) {
      e2 = ref1[i2];
      s2 = (function() {
        var len2, m, results;
        results = [];
        for (m = 0, len2 = e2.length; m < len2; m++) {
          v = e2[m];
          results.push(fold.vertices_coords[v]);
        }
        return results;
      })();
      if (!filter.edges_verticesIncident(e1, e2) && geom.segmentsCross(s1, s2)) {
        //# segment intersection is too sensitive a test;
        //# segmentsCross more reliable
        //cross = segmentIntersectSegment s1, s2
        cross = geom.lineIntersectLine(s1, s2);
        if (cross == null) {
          continue;
        }
        crossI = vertices.insert(cross);
        //console.log e1, s1, 'intersects', e2, s2, 'at', cross, crossI
        if (!(indexOf.call(e1, crossI) >= 0 && indexOf.call(e2, crossI) >= 0)) { //# don't add endpoint again
          //console.log e1, e2, '->'
          if (indexOf.call(e1, crossI) < 0) {
            addEdge(crossI, e1[1], i1, 0);
            e1[1] = crossI;
            s1[1] = fold.vertices_coords[crossI];
          }
          //console.log '->', e1, fold.edges_vertices[fold.edges_vertices.length-1]
          if (indexOf.call(e2, crossI) < 0) {
            addEdge(crossI, e2[1], i2, 1);
            e2[1] = crossI;
          }
        }
      }
    }
    //console.log '->', e2, fold.edges_vertices[fold.edges_vertices.length-1]
    i1++;
  }
  old2new = filter.removeDuplicateEdges_vertices(fold);
  ref2 = [0, 1];
  for (m = 0, len2 = ref2.length; m < len2; m++) {
    i = ref2[m];
    changedEdges[i] = (function() {
      var len3, n, ref3, results;
      ref3 = changedEdges[i];
      results = [];
      for (n = 0, len3 = ref3.length; n < len3; n++) {
        e = ref3[n];
        results.push(old2new[e]);
      }
      return results;
    })();
  }
  old2new = filter.removeLoopEdges(fold);
  ref3 = [0, 1];
  for (n = 0, len3 = ref3.length; n < len3; n++) {
    i = ref3[n];
    changedEdges[i] = (function() {
      var len4, o, ref4, results;
      ref4 = changedEdges[i];
      results = [];
      for (o = 0, len4 = ref4.length; o < len4; o++) {
        e = ref4[o];
        results.push(old2new[e]);
      }
      return results;
    })();
  }
  //fold
  if (involvingEdgesFrom != null) {
    return changedEdges;
  } else {
    return changedEdges[0].concat(changedEdges[1]);
  }
};

filter.addEdgeAndSubdivide = function(fold, v1, v2, epsilon) {
  var changedEdges, changedEdges1, changedEdges2, e, i, iNew, k, len, ref;
  /*
  Add an edge between vertex indices or points `v1` and `v2`, subdivide
  as necessary, and return two arrays: all the subdivided parts of this edge,
  and all the other edges that change.
  If the edge is a loop or a duplicate, both arrays will be empty.
  */
  if (v1.length != null) {
    [v1, changedEdges1] = filter.addVertexAndSubdivide(fold, v1, epsilon);
  }
  if (v2.length != null) {
    [v2, changedEdges2] = filter.addVertexAndSubdivide(fold, v2, epsilon);
  }
  if (v1 === v2) { //# Ignore loop edges
    return [[], []];
  }
  ref = fold.edges_vertices;
  for (i = k = 0, len = ref.length; k < len; i = ++k) {
    e = ref[i];
    if ((e[0] === v1 && e[1] === v2) || (e[0] === v2 && e[1] === v1)) {
      return [[i], []]; //# Ignore duplicate edges
    }
  }
  iNew = fold.edges_vertices.push([v1, v2]) - 1;
  if (iNew) {
    changedEdges = filter.subdivideCrossingEdges_vertices(fold, epsilon, iNew);
    if (indexOf.call(changedEdges[0], iNew) < 0) {
      changedEdges[0].push(iNew);
    }
  } else {
    changedEdges = [[iNew], []];
  }
  if (changedEdges1 != null) {
    changedEdges[1].push(...changedEdges1);
  }
  if (changedEdges2 != null) {
    changedEdges[1].push(...changedEdges2);
  }
  return changedEdges;
};

filter.splitCuts = function(fold, es = filter.cutEdges(fold)) {
  var b, b1, b2, boundaries, e, e1, e2, ev, i, i1, i2, ie, ie1, ie2, k, l, len, len1, len2, len3, len4, len5, len6, len7, len8, m, n, neighbor, neighbors, o, q, r, ref, ref1, ref10, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, t, u1, u2, v, v1, v2, ve, vertices_boundaries, z;
  if (!es.length) {
    /*
    Given a FOLD object with `edges_vertices`, `edges_assignment`, and
    counterclockwise-sorted `vertices_edges`
    (see `FOLD.convert.edges_vertices_to_vertices_edges_sorted`),
    cuts apart ("unwelds") all edges in `es` into pairs of boundary edges.
    When an endpoint of a cut edge ends up on n boundaries,
    it splits into n vertices.
    Preserves above-mentioned properties (so you can then compute faces via
    `FOLD.convert.edges_vertices_to_faces_vertices_edges`),
    and recomputes `vertices_vertices` if present,
    but ignores face properties.
    `es` is unspecified, cuts all edges with an assignment of `"C"`,
    effectively switching from FOLD 1.2's `"C"` assignments to
    FOLD 1.1's `"B"` assignments.
    */
    return fold;
  }
  //# Maintain map from every vertex to array of incident boundary edges
  vertices_boundaries = [];
  ref = filter.boundaryEdges(fold);
  for (k = 0, len = ref.length; k < len; k++) {
    e = ref[k];
    ref1 = fold.edges_vertices[e];
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      v = ref1[l];
      (vertices_boundaries[v] != null ? vertices_boundaries[v] : vertices_boundaries[v] = []).push(e);
    }
  }
  for (m = 0, len2 = es.length; m < len2; m++) {
    e1 = es[m];
    //# Split e1 into two edges {e1, e2}
    e2 = filter.addEdgeLike(fold, e1);
    ref2 = fold.edges_vertices[e1];
    for (i = n = 0, len3 = ref2.length; n < len3; i = ++n) {
      v = ref2[i];
      ve = fold.vertices_edges[v];
      //# Insert e2 before e1 in first vertex and after e1 in second vertex
      //# to represent valid counterclockwise ordering
      ve.splice(ve.indexOf(e1) + i, 0, e2);
    }
    ref3 = fold.edges_vertices[e1];
    //# Check for endpoints of {e1, e2} to split, when they're on the boundary
    for (i = o = 0, len4 = ref3.length; o < len4; i = ++o) {
      v1 = ref3[i];
      u1 = fold.edges_vertices[e1][1 - i];
      u2 = fold.edges_vertices[e2][1 - i];
      boundaries = (ref4 = vertices_boundaries[v1]) != null ? ref4.length : void 0;
      if (boundaries >= 2) { //# vertex already on boundary
        if (boundaries > 2) {
          throw new Error(`${vertices_boundaries[v1].length} boundary edges at vertex ${v1}`);
        }
        [b1, b2] = vertices_boundaries[v1];
        neighbors = fold.vertices_edges[v1];
        i1 = neighbors.indexOf(b1);
        i2 = neighbors.indexOf(b2);
        if (i2 === (i1 + 1) % neighbors.length) {
          if (i2 !== 0) {
            neighbors = neighbors.slice(i2).concat(neighbors.slice(0, +i1 + 1 || 9e9));
          }
        } else if (i1 === (i2 + 1) % neighbors.length) {
          if (i1 !== 0) {
            neighbors = neighbors.slice(i1).concat(neighbors.slice(0, +i2 + 1 || 9e9));
          }
        } else {
          throw new Error(`Nonadjacent boundary edges at vertex ${v1}`);
        }
        //# Find first vertex among e1, e2 among neighbors, so other is next
        ie1 = neighbors.indexOf(e1);
        ie2 = neighbors.indexOf(e2);
        ie = Math.min(ie1, ie2);
        fold.vertices_edges[v1] = neighbors.slice(0, +ie + 1 || 9e9);
        v2 = filter.addVertexLike(fold, v1);
        fold.vertices_edges[v2] = neighbors.slice(1 + ie);
        ref5 = fold.vertices_edges[v2];
        //console.log "Split #{neighbors} into #{fold.vertices_edges[v1]} for #{v1} and #{fold.vertices_edges[v2]} for #{v2}"
        //# Update relevant incident edges to use v2 instead of v1
        for (q = 0, len5 = ref5.length; q < len5; q++) {
          neighbor = ref5[q];
          ev = fold.edges_vertices[neighbor];
          ev[ev.indexOf(v1)] = v2;
        }
        //# Partition boundary edges incident to v1
        vertices_boundaries[v1] = [];
        vertices_boundaries[v2] = [];
        ref6 = [b1, b2];
        for (r = 0, len6 = ref6.length; r < len6; r++) {
          b = ref6[r];
          if (indexOf.call(fold.vertices_edges[v1], b) >= 0) {
            vertices_boundaries[v1].push(b); //if b in fold.vertices_edges[v2]
          } else {
            vertices_boundaries[v2].push(b);
          }
        }
      }
    }
    //# e1 and e2 are new boundary edges
    if ((ref7 = fold.edges_assignment) != null) {
      ref7[e1] = 'B';
    }
    if ((ref8 = fold.edges_assignment) != null) {
      ref8[e2] = 'B';
    }
    ref9 = fold.edges_vertices[e1];
    for (i = t = 0, len7 = ref9.length; t < len7; i = ++t) {
      v = ref9[i];
      (vertices_boundaries[v] != null ? vertices_boundaries[v] : vertices_boundaries[v] = []).push(e1);
    }
    ref10 = fold.edges_vertices[e2];
    for (i = z = 0, len8 = ref10.length; z < len8; i = ++z) {
      v = ref10[i];
      (vertices_boundaries[v] != null ? vertices_boundaries[v] : vertices_boundaries[v] = []).push(e2);
    }
  }
  if (fold.vertices_vertices != null) {
    fold.vertices_vertices = filter.edges_vertices_to_vertices_vertices(fold); // would be out-of-date
  }
  return fold;
};

filter.edges_vertices_to_vertices_vertices = function(fold) {
  /*
  Works for abstract structures, so NOT SORTED.
  Use sort_vertices_vertices to sort in counterclockwise order.
  */
  var k, len, numVertices, ref, v, vertices_vertices, w;
  numVertices = filter.numVertices(fold);
  vertices_vertices = (function() {
    var k, ref, results;
    results = [];
    for (v = k = 0, ref = numVertices; (0 <= ref ? k < ref : k > ref); v = 0 <= ref ? ++k : --k) {
      results.push([]);
    }
    return results;
  })();
  ref = fold.edges_vertices;
  for (k = 0, len = ref.length; k < len; k++) {
    [v, w] = ref[k];
    while (v >= vertices_vertices.length) {
      vertices_vertices.push([]);
    }
    while (w >= vertices_vertices.length) {
      vertices_vertices.push([]);
    }
    vertices_vertices[v].push(w);
    vertices_vertices[w].push(v);
  }
  return vertices_vertices;
};

filter.edges_vertices_to_vertices_edges = function(fold) {
  /*
  Invert edges_vertices into vertices_edges.
  Works for abstract structures, so NOT SORTED in any sense.
  */
  var edge, k, l, len, len1, numVertices, ref, v, vertex, vertices, vertices_edges;
  numVertices = filter.numVertices(fold);
  vertices_edges = (function() {
    var k, ref, results;
    results = [];
    for (v = k = 0, ref = numVertices; (0 <= ref ? k < ref : k > ref); v = 0 <= ref ? ++k : --k) {
      results.push([]);
    }
    return results;
  })();
  ref = fold.edges_vertices;
  for (edge = k = 0, len = ref.length; k < len; edge = ++k) {
    vertices = ref[edge];
    for (l = 0, len1 = vertices.length; l < len1; l++) {
      vertex = vertices[l];
      vertices_edges[vertex].push(edge);
    }
  }
  return vertices_edges;
};

},{"./geom":11}],11:[function(require,module,exports){
  /* BASIC GEOMETRY */
var geom,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

geom = exports;

/*
    Utilities
*/
geom.EPS = 0.000001;

geom.sum = function(a, b) {
  return a + b;
};

geom.min = function(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
};

geom.max = function(a, b) {
  if (a > b) {
    return a;
  } else {
    return b;
  }
};

geom.all = function(a, b) {
  return a && b;
};

geom.next = function(start, n, i = 1) {
  /*
  Returns the ith cyclic ordered number after start in the range [0..n].
  */
  return modulo(start + i, n);
};

geom.rangesDisjoint = function([a1, a2], [b1, b2]) {
  var ref, ref1;
  //# Returns whether the scalar interval [a1, a2] is disjoint from the scalar
  //# interval [b1,b2].
  return ((b1 < (ref = Math.min(a1, a2)) && ref > b2)) || ((b1 > (ref1 = Math.max(a1, a2)) && ref1 < b2));
};

geom.topologicalSort = function(vs) {
  var l, len, list, v;
  (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = vs.length; l < len; l++) {
      v = vs[l];
      results.push([v.visited, v.parent] = [false, null]);
    }
    return results;
  })();
  list = [];
  for (l = 0, len = vs.length; l < len; l++) {
    v = vs[l];
    if (!v.visited) {
      list = geom.visit(v, list);
    }
  }
  return list;
};

geom.visit = function(v, list) {
  var l, len, ref, u;
  v.visited = true;
  ref = v.children;
  for (l = 0, len = ref.length; l < len; l++) {
    u = ref[l];
    if (!(!u.visited)) {
      continue;
    }
    u.parent = v;
    list = geom.visit(u, list);
  }
  return list.concat([v]);
};

//#
//# Vector operations
//#
geom.magsq = function(a) {
  //# Returns the squared magnitude of vector a having arbitrary dimension.
  return geom.dot(a, a);
};

geom.mag = function(a) {
  //# Returns the magnitude of vector a having arbitrary dimension.
  return Math.sqrt(geom.magsq(a));
};

geom.unit = function(a, eps = geom.EPS) {
  var length;
  //# Returns the unit vector in the direction of vector a having arbitrary
  //# dimension. Returns null if magnitude of a is zero.
  length = geom.magsq(a);
  if (length < eps) {
    return null;
  }
  return geom.mul(a, 1 / geom.mag(a));
};

geom.ang2D = function(a, eps = geom.EPS) {
  if (geom.magsq(a) < eps) {
    //# Returns the angle of a 2D vector relative to the standard
    //# east-is-0-degrees rule.
    return null;
  }
  return Math.atan2(a[1], a[0]);
};

geom.mul = function(a, s) {
  var i, l, len, results;
  results = [];
  for (l = 0, len = a.length; l < len; l++) {
    i = a[l];
    //# Returns the vector a multiplied by scaler factor s.
    results.push(i * s);
  }
  return results;
};

geom.linearInterpolate = function(t, a, b) {
  //# Returns linear interpolation of vector a to vector b for 0 < t < 1
  return geom.plus(geom.mul(a, 1 - t), geom.mul(b, t));
};

geom.plus = function(a, b) {
  var ai, i, l, len, results;
  results = [];
  for (i = l = 0, len = a.length; l < len; i = ++l) {
    ai = a[i];
    //# Returns the vector sum between of vectors a and b having the same
    //# dimension.
    results.push(ai + b[i]);
  }
  return results;
};

geom.sub = function(a, b) {
  //# Returns the vector difference of vectors a and b having the same dimension.
  return geom.plus(a, geom.mul(b, -1));
};

geom.dot = function(a, b) {
  var ai, i;
  return ((function() {
    var l, len, results;
    results = [];
    for (i = l = 0, len = a.length; l < len; i = ++l) {
      ai = a[i];
      //# Returns the dot product between two vectors a and b having the same
      //# dimension.
      results.push(ai * b[i]);
    }
    return results;
  })()).reduce(geom.sum);
};

geom.distsq = function(a, b) {
  //# Returns the squared Euclidean distance between two vectors a and b having 
  //# the same dimension.
  return geom.magsq(geom.sub(a, b));
};

geom.dist = function(a, b) {
  //# Returns the Euclidean distance between general vectors a and b having the
  //# same dimension.
  return Math.sqrt(geom.distsq(a, b));
};

geom.closestIndex = function(a, bs) {
  var b, dist, i, l, len, minDist, minI;
  //# Finds the closest point to `a` among points in `bs`, and returns the
  //# index of that point in `bs`.  Returns `undefined` if `bs` is empty.
  minDist = 2e308;
  for (i = l = 0, len = bs.length; l < len; i = ++l) {
    b = bs[i];
    if (minDist > (dist = geom.dist(a, b))) {
      minDist = dist;
      minI = i;
    }
  }
  return minI;
};

geom.dir = function(a, b) {
  //# Returns a unit vector in the direction from vector a to vector b, in the
  //# same dimension as a and b.
  return geom.unit(geom.sub(b, a));
};

geom.ang = function(a, b) {
  var ua, ub, v;
  //# Returns the angle spanned by vectors a and b having the same dimension.
  [ua, ub] = (function() {
    var l, len, ref, results;
    ref = [a, b];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      v = ref[l];
      results.push(geom.unit(v));
    }
    return results;
  })();
  if (!((ua != null) && (ub != null))) {
    return null;
  }
  return Math.acos(geom.dot(ua, ub));
};

geom.cross = function(a, b) {
  var i, j, ref, ref1;
  //# Returns the cross product of two 2D or 3D vectors a, b.
  if ((a.length === (ref = b.length) && ref === 2)) {
    return a[0] * b[1] - a[1] * b[0];
  }
  if ((a.length === (ref1 = b.length) && ref1 === 3)) {
    return (function() {
      var l, len, ref2, results;
      ref2 = [[1, 2], [2, 0], [0, 1]];
      results = [];
      for (l = 0, len = ref2.length; l < len; l++) {
        [i, j] = ref2[l];
        results.push(a[i] * b[j] - a[j] * b[i]);
      }
      return results;
    })();
  }
  return null;
};

geom.parallel = function(a, b, eps = geom.EPS) {
  var ua, ub, v;
  //# Return if vectors are parallel, up to accuracy eps
  [ua, ub] = (function() {
    var l, len, ref, results;
    ref = [a, b];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      v = ref[l];
      results.push(geom.unit(v));
    }
    return results;
  })();
  if (!((ua != null) && (ub != null))) {
    return null;
  }
  return 1 - Math.abs(geom.dot(ua, ub)) < eps;
};

geom.rotate = function(a, u, t) {
  var ct, i, l, len, p, q, ref, results, st;
  //# Returns the rotation of 3D vector a about 3D unit vector u by angle t.
  u = geom.unit(u);
  if (u == null) {
    return null;
  }
  [ct, st] = [Math.cos(t), Math.sin(t)];
  ref = [[0, 1, 2], [1, 2, 0], [2, 0, 1]];
  results = [];
  for (l = 0, len = ref.length; l < len; l++) {
    p = ref[l];
    results.push(((function() {
      var len1, o, ref1, results1;
      ref1 = [ct, -st * u[p[2]], st * u[p[1]]];
      results1 = [];
      for (i = o = 0, len1 = ref1.length; o < len1; i = ++o) {
        q = ref1[i];
        results1.push(a[p[i]] * (u[p[0]] * u[p[i]] * (1 - ct) + q));
      }
      return results1;
    })()).reduce(geom.sum));
  }
  return results;
};

geom.reflectPoint = function(p, q) {
  //# Reflect point p through the point q into the "symmetric point"
  return geom.sub(geom.mul(q, 2), p);
};

geom.reflectLine = function(p, a, b) {
  var dot, lenSq, projection, vec;
  //# Reflect point p through line through points a and b
  // [based on https://math.stackexchange.com/a/11532]
  // projection = a + (b - a) * [(b - a) dot (p - a)] / ||b - a||^2
  vec = geom.sub(b, a);
  lenSq = geom.magsq(vec);
  dot = geom.dot(vec, geom.sub(p, a));
  projection = geom.plus(a, geom.mul(vec, dot / lenSq));
  // reflection = 2*projection - p (symmetric point of p opposite projection)
  return geom.sub(geom.mul(projection, 2), p);
};

/*
Matrix transformations

2D transformation matrices are of the form (where last column is optional):
  [[a, b, c],
   [d, e, f]]

3D transformation matrices are of the form (where last column is optional):
  [[a, b, c, d],
   [e, f, g, h],
   [i, j, k, l]]

Transformation matrices are designed to be multiplied on the left of points,
i.e., T*x gives vector x transformed by matrix T, where x has an implicit 1
at the end (homogeneous coordinates) when T has the optional last column.
See `geom.matrixVector`.
*/
geom.matrixVector = function(matrix, vector, implicitLast = 1) {
  var j, l, len, results, row, val, x;
//# Returns matrix-vector product, matrix * vector.
//# Requires the number of matrix columns to be <= vector length.
//# If the matrix has more columns than the vector length, then the vector
//# is assumed to be padded with zeros at the end, EXCEPT when the matrix
//# has more columns than rows (as in transformation matrices above),
//# in which case the final vector padding is implicitLast,
//# which defaults to 1 (point); set to 0 for treating like a vector.
  results = [];
  for (l = 0, len = matrix.length; l < len; l++) {
    row = matrix[l];
    val = ((function() {
      var len1, o, results1;
      results1 = [];
      for (j = o = 0, len1 = vector.length; o < len1; j = ++o) {
        x = vector[j];
        results1.push(row[j] * x);
      }
      return results1;
    })()).reduce(geom.sum);
    if (row.length > vector.length && row.length > matrix.length) {
      val += row[row.length - 1] * implicitLast;
    }
    results.push(val);
  }
  return results;
};

geom.matrixMatrix = function(matrix1, matrix2) {
  var j, k, l, len, product, ref, ref1, results, row1, row2, val;
//# Returns matrix-matrix product, matrix1 * matrix2.
//# Requires number of matrix1 columns equal to or 1 more than matrix2 rows.
//# In the latter case, treats matrix2 as having an extra row [0,0,...,0,0,1],
//# which may involve adding an implicit column to matrix2 as well.
  results = [];
  for (l = 0, len = matrix1.length; l < len; l++) {
    row1 = matrix1[l];
    if ((matrix2.length !== (ref = row1.length) && ref !== matrix2.length + 1)) {
      throw new Error(`Invalid matrix dimension ${row1.length} vs. matrix dimension ${matrix2.length}`);
    }
    product = (function() {
      var o, ref1, ref2, results1;
      results1 = [];
      for (j = o = 0, ref1 = matrix2[0].length; (0 <= ref1 ? o < ref1 : o > ref1); j = 0 <= ref1 ? ++o : --o) {
        val = ((function() {
          var len1, r, results2;
          results2 = [];
          for (k = r = 0, len1 = matrix2.length; r < len1; k = ++r) {
            row2 = matrix2[k];
            results2.push(row1[k] * row2[j]);
          }
          return results2;
        })()).reduce(geom.sum);
        if ((j === (ref2 = row1.length - 1) && ref2 === matrix2.length)) {
          val += row1[j];
        }
        results1.push(val);
      }
      return results1;
    })();
    if ((row1.length - 1 === (ref1 = matrix2.length) && ref1 === matrix2[0].length)) {
      product.push(row1[row1.length - 1]);
    }
    results.push(product);
  }
  return results;
};

geom.matrixInverseRT = function(matrix) {
  var i, invRow, j, l, lastCol, len, results, row;
  //# Returns inverse of a matrix consisting of rotations and/or translations,
  //# where the inverse can be found by a transpose and dot products
  //# [http://www.graphics.stanford.edu/courses/cs248-98-fall/Final/q4.html].
  if (matrix[0].length === matrix.length + 1) {
    lastCol = (function() {
      var l, len, results;
      results = [];
      for (l = 0, len = matrix.length; l < len; l++) {
        row = matrix[l];
        results.push(row[row.length - 1]);
      }
      return results;
    })();
  } else if (matrix[0].length !== matrix.length) {
    throw new Error(`Invalid matrix dimensions ${matrix.length}x${matrix[0].length}`);
  }
  results = [];
  for (i = l = 0, len = matrix.length; l < len; i = ++l) {
    row = matrix[i];
    invRow = (function() {
      var o, ref, results1;
// transpose
      results1 = [];
      for (j = o = 0, ref = matrix.length; (0 <= ref ? o < ref : o > ref); j = 0 <= ref ? ++o : --o) {
        results1.push(matrix[j][i]);
      }
      return results1;
    })();
    if (lastCol != null) {
      invRow.push(-geom.dot(row.slice(0, matrix.length), lastCol));
    }
    results.push(invRow);
  }
  return results;
};

geom.matrixInverse = function(matrix) {
  var bestRow, i, inverse, j, l, o, r, ref, ref1, ref2, ref3, ref4, ref5, row, w;
  //# Returns inverse of a matrix computed via Gauss-Jordan elimination method.
  if ((matrix.length !== (ref = matrix[0].length) && ref !== matrix.length + 1)) {
    throw new Error(`Invalid matrix dimensions ${matrix.length}x${matrix[0].length}`);
  }
  matrix = (function() {
    var l, len, results;
// copy before elimination
    results = [];
    for (l = 0, len = matrix.length; l < len; l++) {
      row = matrix[l];
      results.push(row.slice(0));
    }
    return results;
  })();
  inverse = (function() {
    var l, len, results;
    results = [];
    for (i = l = 0, len = matrix.length; l < len; i = ++l) {
      row = matrix[i];
      results.push((function() {
        var o, ref1, results1;
        results1 = [];
        for (j = o = 0, ref1 = row.length; (0 <= ref1 ? o < ref1 : o > ref1); j = 0 <= ref1 ? ++o : --o) {
          results1.push(0 + (i === j));
        }
        return results1;
      })());
    }
    return results;
  })();
  for (j = l = 0, ref1 = matrix.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
    // Pivot to maximize absolute value in jth column
    bestRow = j;
    for (i = o = ref2 = j + 1, ref3 = matrix.length; (ref2 <= ref3 ? o < ref3 : o > ref3); i = ref2 <= ref3 ? ++o : --o) {
      if (Math.abs(matrix[i][j]) > Math.abs(matrix[bestRow][j])) {
        bestRow = i;
      }
    }
    if (bestRow !== j) {
      [matrix[bestRow], matrix[j]] = [matrix[j], matrix[bestRow]];
      [inverse[bestRow], inverse[j]] = [inverse[j], inverse[bestRow]];
    }
    // Scale row to unity in jth column
    inverse[j] = geom.mul(inverse[j], 1 / matrix[j][j]);
    matrix[j] = geom.mul(matrix[j], 1 / matrix[j][j]);
// Eliminate other rows in jth column
    for (i = r = 0, ref4 = matrix.length; (0 <= ref4 ? r < ref4 : r > ref4); i = 0 <= ref4 ? ++r : --r) {
      if (!(i !== j)) {
        continue;
      }
      inverse[i] = geom.plus(inverse[i], geom.mul(inverse[j], -matrix[i][j]));
      matrix[i] = geom.plus(matrix[i], geom.mul(matrix[j], -matrix[i][j]));
    }
  }
  if (matrix[0].length === matrix.length + 1) {
    for (i = w = 0, ref5 = matrix.length; (0 <= ref5 ? w < ref5 : w > ref5); i = 0 <= ref5 ? ++w : --w) {
      if (!(i !== j)) {
        continue;
      }
      inverse[i][inverse[i].length - 1] -= matrix[i][matrix[i].length - 1];
      matrix[i][matrix[i].length - 1] -= matrix[i][matrix[i].length - 1];
    }
  }
  return inverse;
};

geom.matrixTranslate = function(v) {
  var i, j, l, len, results, row, x;
//# Transformation matrix for translating by given vector v.
//# Works in any dimension, assuming v.length is that dimension.
  results = [];
  for (i = l = 0, len = v.length; l < len; i = ++l) {
    x = v[i];
    row = (function() {
      var o, ref, results1;
      results1 = [];
      for (j = o = 0, ref = v.length; (0 <= ref ? o < ref : o > ref); j = 0 <= ref ? ++o : --o) {
        results1.push(0 + (i === j));
      }
      return results1;
    })();
    row.push(x);
    results.push(row);
  }
  return results;
};

geom.matrixRotate2D = function(t, center) {
  var ct, st, x, y;
  //# 2D rotation matrix around center, which defaults to origin,
  //# counterclockwise by t radians.
  [ct, st] = [Math.cos(t), Math.sin(t)];
  if (center != null) {
    [x, y] = center;
    return [[ct, -st, -x * ct + y * st + x], [st, ct, -x * st - y * ct + y]];
  } else {
    return [[ct, -st], [st, ct]];
  }
};

geom.matrixReflectAxis = function(a, d, center) {
  var i, j, l, ref, results, row;
//# Matrix transformation negating dimension a out of d dimensions,
//# or if center is specified, reflecting around that value of dimension a.
  results = [];
  for (i = l = 0, ref = d; (0 <= ref ? l < ref : l > ref); i = 0 <= ref ? ++l : --l) {
    row = (function() {
      var o, ref1, results1;
      results1 = [];
      for (j = o = 0, ref1 = d; (0 <= ref1 ? o < ref1 : o > ref1); j = 0 <= ref1 ? ++o : --o) {
        if (i === j) {
          if (a === i) {
            results1.push(-1);
          } else {
            results1.push(1);
          }
        } else {
          results1.push(0);
        }
      }
      return results1;
    })();
    if (center != null) {
      if (a === i) {
        row.push(2 * center);
      } else {
        row.push(0);
      }
    }
    results.push(row);
  }
  return results;
};

geom.matrixReflectLine = function(a, b) {
  var dot2, lenSq, vec;
  //# Matrix transformation implementing 2D geom.reflectLine(*, a, b)
  vec = geom.sub(b, a);
  lenSq = geom.magsq(vec);
  // dot = vec dot (p - a) = vec dot p - vec dot a
  dot2 = geom.dot(vec, a);
  //proj = (a[i] + vec[i] * dot / lenSq for i in [0...2])
  //[[vec[0] * vec[0] / lenSq,
  //  vec[0] * vec[1] / lenSq,
  //  a[0] - vec[0] * dot2 / lenSq]
  // [vec[1] * vec[0] / lenSq,
  //  vec[1] * vec[1] / lenSq,
  //  a[1] - vec[1] * dot2 / lenSq]]
  return [[2 * (vec[0] * vec[0] / lenSq) - 1, 2 * (vec[0] * vec[1] / lenSq), 2 * (a[0] - vec[0] * dot2 / lenSq)], [2 * (vec[1] * vec[0] / lenSq), 2 * (vec[1] * vec[1] / lenSq) - 1, 2 * (a[1] - vec[1] * dot2 / lenSq)]];
};

//#
//# Polygon Operations
//#
geom.interiorAngle = function(a, b, c) {
  var ang;
  //# Computes the angle of three points that are, say, part of a triangle.
  //# Specify in counterclockwise order.
  //#          a
  //#         /
  //#        /
  //#      b/_)__ c
  ang = geom.ang2D(geom.sub(a, b)) - geom.ang2D(geom.sub(c, b));
  return ang + (ang < 0 ? 2 * Math.PI : 0);
};

geom.turnAngle = function(a, b, c) {
  //# Returns the turn angle, the supplement of the interior angle
  return Math.PI - geom.interiorAngle(a, b, c);
};

geom.triangleNormal = function(a, b, c) {
  //# Returns the right handed normal unit vector to triangle a, b, c in 3D. If
  //# the triangle is degenerate, returns null.
  return geom.unit(geom.cross(geom.sub(b, a), geom.sub(c, b)));
};

geom.polygonNormal = function(points, eps = geom.EPS) {
  var i, p;
  //# Returns the right handed normal unit vector to the polygon defined by
  //# points in 3D. Assumes the points are planar.
  return geom.unit(((function() {
    var l, len, results;
    results = [];
    for (i = l = 0, len = points.length; l < len; i = ++l) {
      p = points[i];
      results.push(geom.cross(p, points[geom.next(i, points.length)]));
    }
    return results;
  })()).reduce(geom.plus), eps);
};

geom.twiceSignedArea = function(points) {
  var i, v0, v1;
  return ((function() {
    var l, len, results;
//# Returns twice signed area of polygon defined by input points.
//# Calculates and sums twice signed area of triangles in a fan from the first
//# vertex.
    results = [];
    for (i = l = 0, len = points.length; l < len; i = ++l) {
      v0 = points[i];
      v1 = points[geom.next(i, points.length)];
      results.push(v0[0] * v1[1] - v1[0] * v0[1]);
    }
    return results;
  })()).reduce(geom.sum);
};

geom.polygonOrientation = function(points) {
  //# Returns the orientation of the 2D polygon defined by the input points.
  //# +1 for counterclockwise, -1 for clockwise
  //# via computing sum of signed areas of triangles formed with origin
  return Math.sign(geom.twiceSignedArea(points));
};

geom.sortByAngle = function(points, origin = [0, 0], mapping = function(x) {
    return x;
  }) {
  //# Sort a set of 2D points in place counter clockwise about origin
  //# under the provided mapping.
  origin = mapping(origin);
  return points.sort(function(p, q) {
    var pa, qa;
    pa = geom.ang2D(geom.sub(mapping(p), origin));
    qa = geom.ang2D(geom.sub(mapping(q), origin));
    return pa - qa;
  });
};

geom.segmentsCross = function([p0, q0], [p1, q1]) {
  //# May not work if the segments are collinear.
  //# First do rough overlap check in x and y.  This helps with
  //# near-collinear segments.  (Inspired by oripa/geom/GeomUtil.java)
  if (geom.rangesDisjoint([p0[0], q0[0]], [p1[0], q1[0]]) || geom.rangesDisjoint([p0[1], q0[1]], [p1[1], q1[1]])) {
    return false;
  }
  //# Now do orientation test.
  return geom.polygonOrientation([p0, q0, p1]) !== geom.polygonOrientation([p0, q0, q1]) && geom.polygonOrientation([p1, q1, p0]) !== geom.polygonOrientation([p1, q1, q0]);
};

geom.parametricLineIntersect = function([p1, p2], [q1, q2]) {
  var denom;
  //# Returns the parameters s,t for the equations s*p1+(1-s)*p2 and
  //# t*q1+(1-t)*q2.  Used Maple's result of:
  //#    solve({s*p2x+(1-s)*p1x=t*q2x+(1-t)*q1x,
  //#           s*p2y+(1-s)*p1y=t*q2y+(1-t)*q1y}, {s,t});
  //# Returns null, null if the intersection couldn't be found
  //# because the lines are parallel.
  //# Input points must be 2D.
  denom = (q2[1] - q1[1]) * (p2[0] - p1[0]) + (q1[0] - q2[0]) * (p2[1] - p1[1]);
  if (denom === 0) {
    return [null, null];
  } else {
    return [(q2[0] * (p1[1] - q1[1]) + q2[1] * (q1[0] - p1[0]) + q1[1] * p1[0] - p1[1] * q1[0]) / denom, (q1[0] * (p2[1] - p1[1]) + q1[1] * (p1[0] - p2[0]) + p1[1] * p2[0] - p2[1] * p1[0]) / denom];
  }
};

geom.segmentIntersectSegment = function(s1, s2) {
  var s, t;
  [s, t] = geom.parametricLineIntersect(s1, s2);
  if ((s != null) && ((0 <= s && s <= 1)) && ((0 <= t && t <= 1))) {
    return geom.linearInterpolate(s, s1[0], s1[1]);
  } else {
    return null;
  }
};

geom.lineIntersectLine = function(l1, l2) {
  var s, t;
  [s, t] = geom.parametricLineIntersect(l1, l2);
  if (s != null) {
    return geom.linearInterpolate(s, l1[0], l1[1]);
  } else {
    return null;
  }
};

geom.pointStrictlyInSegment = function(p, s, eps = geom.EPS) {
  var v0, v1;
  v0 = geom.sub(p, s[0]);
  v1 = geom.sub(p, s[1]);
  return geom.parallel(v0, v1, eps) && geom.dot(v0, v1) < 0;
};

geom.centroid = function(points) {
  //# Returns the centroid of a set of points having the same dimension.
  return geom.mul(points.reduce(geom.plus), 1.0 / points.length);
};

geom.basis = function(ps, eps = geom.EPS) {
  var d, ds, n, ns, p, x, y, z;
  if (((function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ps.length; l < len; l++) {
      p = ps[l];
      results.push(p.length !== 3);
    }
    return results;
  })()).reduce(geom.all)) {
    //# Returns a basis of a 3D point set.
    //#  - [] if the points are all the same point (0 dimensional)
    //#  - [x] if the points lie on a line with basis direction x
    //#  - [x,y] if the points lie in a plane with basis directions x and y
    //#  - [x,y,z] if the points span three dimensions
    return null;
  }
  ds = (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ps.length; l < len; l++) {
      p = ps[l];
      if (geom.distsq(p, ps[0]) > eps) {
        results.push(geom.dir(p, ps[0]));
      }
    }
    return results;
  })();
  if (ds.length === 0) {
    return [];
  }
  x = ds[0];
  if (((function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ds.length; l < len; l++) {
      d = ds[l];
      results.push(geom.parallel(d, x, eps));
    }
    return results;
  })()).reduce(geom.all)) {
    return [x];
  }
  ns = (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ds.length; l < len; l++) {
      d = ds[l];
      results.push(geom.unit(geom.cross(d, x)));
    }
    return results;
  })();
  ns = (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ns.length; l < len; l++) {
      n = ns[l];
      if (n != null) {
        results.push(n);
      }
    }
    return results;
  })();
  z = ns[0];
  y = geom.cross(z, x);
  if (((function() {
    var l, len, results;
    results = [];
    for (l = 0, len = ns.length; l < len; l++) {
      n = ns[l];
      results.push(geom.parallel(n, z, eps));
    }
    return results;
  })()).reduce(geom.all)) {
    return [x, y];
  }
  return [x, y, z];
};

geom.above = function(ps, qs, n, eps = geom.EPS) {
  var pn, qn, v, vs;
  [pn, qn] = (function() {
    var l, len, ref, results;
    ref = [ps, qs];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      vs = ref[l];
      results.push((function() {
        var len1, o, results1;
        results1 = [];
        for (o = 0, len1 = vs.length; o < len1; o++) {
          v = vs[o];
          results1.push(geom.dot(v, n));
        }
        return results1;
      })());
    }
    return results;
  })();
  if (qn.reduce(geom.max) - pn.reduce(geom.min) < eps) {
    return 1;
  }
  if (pn.reduce(geom.max) - qn.reduce(geom.min) < eps) {
    return -1;
  }
  return 0;
};

geom.separatingDirection2D = function(t1, t2, n, eps = geom.EPS) {
  var i, j, l, len, len1, len2, m, o, p, q, r, ref, sign, t;
  ref = [t1, t2];
  //# If points are contained in a common plane with normal n and a separating 
  //# direction exists, a direction perpendicular to some pair of points from 
  //# the same set is also a separating direction.
  for (l = 0, len = ref.length; l < len; l++) {
    t = ref[l];
    for (i = o = 0, len1 = t.length; o < len1; i = ++o) {
      p = t[i];
      for (j = r = 0, len2 = t.length; r < len2; j = ++r) {
        q = t[j];
        if (!(i < j)) {
          continue;
        }
        m = geom.unit(geom.cross(geom.sub(p, q), n));
        if (m != null) {
          sign = geom.above(t1, t2, m, eps);
          if (sign !== 0) {
            return geom.mul(m, sign);
          }
        }
      }
    }
  }
  return null;
};

geom.separatingDirection3D = function(t1, t2, eps = geom.EPS) {
  var i, j, l, len, len1, len2, len3, m, o, p, q1, q2, r, ref, sign, w, x1, x2;
  ref = [[t1, t2], [t2, t1]];
  //# If points are not contained in a common plane and a separating direction
  //# exists, a plane spanning two points from one set and one point from the
  //# other set is a separating plane, with its normal a separating direction. 
  for (l = 0, len = ref.length; l < len; l++) {
    [x1, x2] = ref[l];
    for (o = 0, len1 = x1.length; o < len1; o++) {
      p = x1[o];
      for (i = r = 0, len2 = x2.length; r < len2; i = ++r) {
        q1 = x2[i];
        for (j = w = 0, len3 = x2.length; w < len3; j = ++w) {
          q2 = x2[j];
          if (!(i < j)) {
            continue;
          }
          m = geom.unit(geom.cross(geom.sub(p, q1), geom.sub(p, q2)));
          if (m != null) {
            sign = geom.above(t1, t2, m, eps);
            if (sign !== 0) {
              return geom.mul(m, sign);
            }
          }
        }
      }
    }
  }
  return null;
};

//#
//# Hole Filling Methods
//# 
geom.circleCross = function(d, r1, r2) {
  var x, y;
  x = (d * d - r2 * r2 + r1 * r1) / d / 2;
  y = Math.sqrt(r1 * r1 - x * x);
  return [x, y];
};

geom.creaseDir = function(u1, u2, a, b, eps = geom.EPS) {
  var b1, b2, x, y, z, zmag;
  b1 = Math.cos(a) + Math.cos(b);
  b2 = Math.cos(a) - Math.cos(b);
  x = geom.plus(u1, u2);
  y = geom.sub(u1, u2);
  z = geom.unit(geom.cross(y, x));
  x = geom.mul(x, b1 / geom.magsq(x));
  y = geom.mul(y, geom.magsq(y) < eps ? 0 : b2 / geom.magsq(y));
  zmag = Math.sqrt(1 - geom.magsq(x) - geom.magsq(y));
  z = geom.mul(z, zmag);
  return [x, y, z].reduce(geom.plus);
};

geom.quadSplit = function(u, p, d, t) {
  // Split from origin in direction U subject to external point P whose
  // shortest path on the surface is distance D and projecting angle is T
  if (geom.magsq(p) > d * d) {
    throw new Error("STOP! Trying to split expansive quad.");
  }
  return geom.mul(u, (d * d - geom.magsq(p)) / 2 / (d * Math.cos(t) - geom.dot(u, p)));
};

},{}],12:[function(require,module,exports){
module.exports = {
  geom: require('./geom'),
  viewer: require('./viewer'),
  filter: require('./filter'),
  convert: require('./convert'),
  file: require('./file')
};

},{"./convert":8,"./file":9,"./filter":10,"./geom":11,"./viewer":14}],13:[function(require,module,exports){
//#TODO: match spec (no frame_designer, no frame_reference, fix cw -> ccw)
//#TODO: oripa folded state format
var DOMParser, convert, filter, oripa, ref, x, y;

if (typeof DOMParser === "undefined" || DOMParser === null) {
  DOMParser = require('@xmldom/xmldom').DOMParser;
}

//XMLSerializer = require('@xmldom/xmldom').XMLSerializer unless XMLSerializer?
//DOMImplementation = require('@xmldom/xmldom').DOMImplementation unless DOMImplementation?
convert = require('./convert');

filter = require('./filter');

oripa = exports;

//# Based on src/oripa/geom/OriLine.java
oripa.type2fold = {
  0: 'F', //# TYPE_NONE = flat
  1: 'B', //# TYPE_CUT = boundary 
  2: 'M', //# TYPE_RIDGE = mountain
  3: 'V' //# TYPE_VALLEY = valley
};

oripa.fold2type = {};

ref = oripa.type2fold;
for (x in ref) {
  y = ref[x];
  oripa.fold2type[y] = x;
}

oripa.fold2type_default = 0;

oripa.prop_xml2fold = {
  'editorName': 'frame_author',
  'originalAuthorName': 'frame_designer',
  'reference': 'frame_reference',
  'title': 'frame_title',
  'memo': 'frame_description',
  'paperSize': null,
  'mainVersion': null,
  'subVersion': null
};

//oripa.prop_fold2xml = {}
//for x, y of oripa.prop_xml2fold
//  oripa.prop_fold2xml[y] = x if y?
oripa.POINT_EPS = 1.0;

oripa.toFold = function(oripaStr) {
  var children, fold, j, k, l, len, len1, len2, len3, len4, line, lines, m, n, nodeSpec, object, oneChildSpec, oneChildText, prop, property, ref1, ref2, ref3, ref4, ref5, subproperty, top, type, vertex, x0, x1, xml, y0, y1;
  fold = {
    vertices_coords: [],
    edges_vertices: [],
    edges_assignment: [],
    file_creator: 'oripa2fold'
  };
  vertex = function(x, y) {
    var v;
    v = fold.vertices_coords.length;
    fold.vertices_coords.push([parseFloat(x), parseFloat(y)]);
    return v;
  };
  nodeSpec = function(node, type, key, value) {
    if ((type != null) && node.tagName !== type) {
      console.warn(`ORIPA file has ${node.tagName} where ${type} was expected`);
      return null;
    } else if ((key != null) && (!node.hasAttribute(key) || ((value != null) && node.getAttribute(key) !== value))) {
      console.warn(`ORIPA file has ${node.tagName} with ${key} = ${node.getAttribute(key)} where ${value} was expected`);
      return null;
    } else {
      return node;
    }
  };
  children = function(node) {
    var child, j, len, ref1, results;
    if (node) {
      ref1 = node.childNodes;
      //# element
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        child = ref1[j];
        if (child.nodeType === 1) {
          results.push(child);
        }
      }
      return results;
    } else {
      return [];
    }
  };
  oneChildSpec = function(node, type, key, value) {
    var sub;
    sub = children(node);
    if (sub.length !== 1) {
      console.warn(`ORIPA file has ${node.tagName} with ${node.childNodes.length} children, not 1`);
      return null;
    } else {
      return nodeSpec(sub[0], type, key, value);
    }
  };
  oneChildText = function(node) {
    var child;
    if (node.childNodes.length > 1) {
      console.warn(`ORIPA file has ${node.tagName} with ${node.childNodes.length} children, not 0 or 1`);
      return null;
    } else if (node.childNodes.length === 0) {
      return '';
    } else {
      child = node.childNodes[0];
      if (child.nodeType !== 3) {
        return console.warn(`ORIPA file has nodeType ${child.nodeType} where 3 (text) was expected`);
      } else {
        return child.data;
      }
    }
  };
  xml = new DOMParser().parseFromString(oripaStr, 'text/xml');
  ref1 = children(xml.documentElement);
  for (j = 0, len = ref1.length; j < len; j++) {
    top = ref1[j];
    if (nodeSpec(top, 'object', 'class', 'oripa.DataSet')) {
      ref2 = children(top);
      for (k = 0, len1 = ref2.length; k < len1; k++) {
        property = ref2[k];
        if (property.getAttribute('property') === 'lines') {
          lines = oneChildSpec(property, 'array', 'class', 'oripa.OriLineProxy');
          ref3 = children(lines);
          for (l = 0, len2 = ref3.length; l < len2; l++) {
            line = ref3[l];
            if (nodeSpec(line, 'void', 'index')) {
              ref4 = children(line);
              for (m = 0, len3 = ref4.length; m < len3; m++) {
                object = ref4[m];
                if (nodeSpec(object, 'object', 'class', 'oripa.OriLineProxy')) {
                  //# Java doesn't encode the default value, 0
                  x0 = x1 = y0 = y1 = type = 0;
                  ref5 = children(object);
                  for (n = 0, len4 = ref5.length; n < len4; n++) {
                    subproperty = ref5[n];
                    if (nodeSpec(subproperty, 'void', 'property')) {
                      switch (subproperty.getAttribute('property')) {
                        case 'x0':
                          x0 = oneChildText(oneChildSpec(subproperty, 'double'));
                          break;
                        case 'x1':
                          x1 = oneChildText(oneChildSpec(subproperty, 'double'));
                          break;
                        case 'y0':
                          y0 = oneChildText(oneChildSpec(subproperty, 'double'));
                          break;
                        case 'y1':
                          y1 = oneChildText(oneChildSpec(subproperty, 'double'));
                          break;
                        case 'type':
                          type = oneChildText(oneChildSpec(subproperty, 'int'));
                      }
                    }
                  }
                  if ((x0 != null) && (x1 != null) && (y0 != null) && (y1 != null)) {
                    fold.edges_vertices.push([vertex(x0, y0), vertex(x1, y1)]);
                    if (type != null) {
                      type = parseInt(type);
                    }
                    fold.edges_assignment.push(oripa.type2fold[type]);
                  } else {
                    console.warn(`ORIPA line has missing data: ${x0} ${x1} ${y0} ${y1} ${type}`);
                  }
                }
              }
            }
          }
        } else if (property.getAttribute('property') in oripa.prop_xml2fold) {
          prop = oripa.prop_xml2fold[property.getAttribute('property')];
          if (prop != null) {
            fold[prop] = oneChildText(oneChildSpec(property, 'string'));
          }
        } else {
          console.warn(`Ignoring ${property.tagName} ${top.getAttribute('property')} in ORIPA file`);
        }
      }
    }
  }
  //# src/oripa/Doc.java uses absolute distance POINT_EPS = 1.0 to detect
  //# points being the same.
  filter.collapseNearbyVertices(fold, oripa.POINT_EPS);
  filter.subdivideCrossingEdges_vertices(fold, oripa.POINT_EPS);
  //# In particular, convert.removeLoopEdges fold
  convert.edges_vertices_to_faces_vertices(fold);
  return fold;
};

oripa.fromFold = function(fold) {
  var coord, edge, ei, fp, i, j, len, line, lines, ref1, s, vertex, vs, xp, z;
  if (typeof fold === 'string') {
    fold = JSON.parse(fold);
  }
  s = `<?xml version="1.0" encoding="UTF-8"?> 
<java version="1.5.0_05" class="java.beans.XMLDecoder"> 
 <object class="oripa.DataSet"> 
  <void property="mainVersion"> 
   <int>1</int> 
  </void> 
  <void property="subVersion"> 
   <int>1</int> 
  </void> 
  <void property="paperSize"> 
   <double>400.0</double> 
  </void> 
`;
  ref1 = oripa.prop_xml2fold;
  for (xp in ref1) {
    fp = ref1[xp];
    //if fp of fold
    s += `.
  <void property="${xp}"> 
   <string>${fold[fp] || ''}</string> 
  </void> 
`.slice(2);
  }
  z = 0;
  lines = (function() {
    var j, len, ref2, results;
    ref2 = fold.edges_vertices;
    results = [];
    for (ei = j = 0, len = ref2.length; j < len; ei = ++j) {
      edge = ref2[ei];
      vs = (function() {
        var k, l, len1, len2, ref3, results1;
        results1 = [];
        for (k = 0, len1 = edge.length; k < len1; k++) {
          vertex = edge[k];
          ref3 = fold.vertices_coords[vertex].slice(2);
          for (l = 0, len2 = ref3.length; l < len2; l++) {
            coord = ref3[l];
            if (coord !== 0) {
              z += 1;
            }
          }
          results1.push(fold.vertices_coords[vertex]);
        }
        return results1;
      })();
      results.push({
        x0: vs[0][0],
        y0: vs[0][1],
        x1: vs[1][0],
        y1: vs[1][1],
        type: oripa.fold2type[fold.edges_assignment[ei]] || oripa.fold2type_default
      });
    }
    return results;
  })();
  s += `.
  <void property="lines"> 
   <array class="oripa.OriLineProxy" length="${lines.length}"> 
`.slice(2);
  for (i = j = 0, len = lines.length; j < len; i = ++j) {
    line = lines[i];
    s += `.
    <void index="${i}"> 
     <object class="oripa.OriLineProxy"> 
      <void property="type"> 
       <int>${line.type}</int> 
      </void> 
      <void property="x0"> 
       <double>${line.x0}</double> 
      </void> 
      <void property="x1"> 
       <double>${line.x1}</double> 
      </void> 
      <void property="y0"> 
       <double>${line.y0}</double> 
      </void> 
      <void property="y1"> 
       <double>${line.y1}</double> 
      </void> 
     </object> 
    </void> 
`.slice(2);
  }
  s += `.
   </array> 
  </void> 
 </object> 
</java> 
`.slice(2);
  return s;
};

convert.setConverter('.fold', '.opx', oripa.fromFold);

convert.setConverter('.opx', '.fold', oripa.toFold);

},{"./convert":8,"./filter":10,"@xmldom/xmldom":2}],14:[function(require,module,exports){
var DEFAULTS, STYLES, SVGNS, geom, viewer;

geom = require('./geom');

viewer = exports;

STYLES = {
  vert: "fill: white; r: 0.03; stroke: black; stroke-width: 0.005;",
  face: "stroke: none; fill-opacity: 0.8;",
  top: "fill: cyan;",
  bot: "fill: yellow;",
  edge: "fill: none; stroke-width: 0.01; stroke-linecap: round;",
  axis: "fill: none; stroke-width: 0.01; stroke-linecap: round;",
  text: "fill: black; font-size: 0.04; text-anchor: middle; font-family: sans-serif;",
  B: "stroke: black;",
  V: "stroke: blue;",
  M: "stroke: red;",
  U: "stroke: white;",
  F: "stroke: gray;",
  ax: "stroke: blue;",
  ay: "stroke: red;",
  az: "stroke: green;"
};

/* UTILITIES */
viewer.setAttrs = function(el, attrs) {
  var k, v;
  (function() {
    var results;
    results = [];
    for (k in attrs) {
      v = attrs[k];
      results.push(el.setAttribute(k, v));
    }
    return results;
  })();
  return el;
};

viewer.appendHTML = function(el, tag, attrs) {
  return el.appendChild(viewer.setAttrs(document.createElement(tag), attrs));
};

SVGNS = 'http://www.w3.org/2000/svg';

viewer.appendSVG = function(el, tag, attrs) {
  return el.appendChild(viewer.setAttrs(document.createElementNS(SVGNS, tag), attrs));
};

viewer.makePath = function(coords) {
  var c, i;
  return ((function() {
    var l, len, results;
    results = [];
    for (i = l = 0, len = coords.length; l < len; i = ++l) {
      c = coords[i];
      results.push(`${i === 0 ? 'M' : 'L'} ${c[0]} ${c[1]} `);
    }
    return results;
  })()).reduce(geom.sum);
};

/* INTERFACE */
viewer.processInput = function(input, view) {
  var k;
  if (typeof input === 'string') {
    view.fold = JSON.parse(input);
  } else {
    view.fold = input;
  }
  view.model = viewer.makeModel(view.fold);
  viewer.addRotation(view);
  viewer.draw(view);
  viewer.update(view);
  if (view.opts.properties) {
    view.properties.innerHTML = '';
    for (k in view.fold) {
      if (view.opts.properties) {
        viewer.appendHTML(view.properties, 'option', {
          value: k
        }).innerHTML = k;
      }
    }
    return viewer.updateProperties(view);
  }
};

viewer.updateProperties = function(view) {
  var s, v;
  v = view.fold[view.properties.value];
  s = v.length != null ? `${v.length} elements: ` : '';
  return view.data.innerHTML = s + JSON.stringify(v);
};

viewer.importURL = function(url, view) {
  var xhr;
  xhr = new XMLHttpRequest();
  xhr.onload = (e) => {
    return viewer.processInput(e.target.responseText, view);
  };
  xhr.open('GET', url);
  return xhr.send();
};

viewer.importFile = function(file, view) {
  var file_reader;
  file_reader = new FileReader();
  file_reader.onload = (e) => {
    return viewer.processInput(e.target.result, view);
  };
  return file_reader.readAsText(file);
};

DEFAULTS = {
  viewButtons: true,
  axisButtons: true,
  attrViewer: true,
  examples: false,
  import: true,
  export: true,
  properties: true
};

viewer.addViewer = function(div, opts = {}) {
  var buttonDiv, i, inputDiv, k, l, len, ref, ref1, ref2, select, t, title, toggleDiv, url, v, val, view;
  view = {
    cam: viewer.initCam(),
    opts: DEFAULTS
  };
  for (k in opts) {
    v = opts[k];
    view.opts[k] = v;
  }
  if (view.opts.viewButtons) {
    toggleDiv = viewer.appendHTML(div, 'div');
    toggleDiv.innerHtml = '';
    toggleDiv.innerHtml += 'Toggle: ';
    ref = view.cam.show;
    for (k in ref) {
      v = ref[k];
      t = viewer.appendHTML(toggleDiv, 'input', {
        type: 'checkbox',
        value: k
      });
      if (v) {
        t.setAttribute('checked', '');
      }
      toggleDiv.innerHTML += k + ' ';
    }
  }
  if (view.opts.axisButtons) {
    buttonDiv = viewer.appendHTML(div, 'div');
    buttonDiv.innerHTML += 'View: ';
    ref1 = ['x', 'y', 'z'];
    for (i = l = 0, len = ref1.length; l < len; i = ++l) {
      val = ref1[i];
      viewer.appendHTML(buttonDiv, 'input', {
        type: 'button',
        value: val
      });
    }
  }
  if (view.opts.properties) {
    buttonDiv.innerHTML += ' Property:';
    view.properties = viewer.appendHTML(buttonDiv, 'select');
    view.data = viewer.appendHTML(buttonDiv, 'div', {
      style: 'width: 300; padding: 10px; overflow: auto; border: 1px solid black; display: inline-block; white-space: nowrap;'
    });
  }
  if (view.opts.examples || view.opts.import) {
    inputDiv = viewer.appendHTML(div, 'div');
    if (view.opts.examples) {
      inputDiv.innerHTML = 'Example: ';
      select = viewer.appendHTML(inputDiv, 'select');
      ref2 = view.opts.examples;
      for (title in ref2) {
        url = ref2[title];
        viewer.appendHTML(select, 'option', {
          value: url
        }).innerHTML = title;
      }
      viewer.importURL(select.value, view);
    }
    if (view.opts.import) {
      inputDiv.innerHTML += ' Import: ';
      viewer.appendHTML(inputDiv, 'input', {
        type: 'file'
      });
    }
  }
  div.onclick = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.hasAttribute('checked')) {
        e.target.removeAttribute('checked');
      } else {
        e.target.setAttribute('checked', '');
      }
      view.cam.show[e.target.value] = e.target.hasAttribute('checked');
      viewer.update(view);
    }
    if (e.target.type === 'button') {
      switch (e.target.value) {
        case 'x':
          viewer.setCamXY(view.cam, [0, 1, 0], [0, 0, 1]);
          break;
        case 'y':
          viewer.setCamXY(view.cam, [0, 0, 1], [1, 0, 0]);
          break;
        case 'z':
          viewer.setCamXY(view.cam, [1, 0, 0], [0, 1, 0]);
      }
      return viewer.update(view);
    }
  };
  div.onchange = (e) => {
    if (e.target.type === 'file') {
      viewer.importFile(e.target.files[0], view);
    }
    if (e.target.type === 'select-one') {
      if (e.target === view.properties) {
        return viewer.updateProperties(view);
      } else {
        return viewer.importURL(e.target.value, view);
      }
    }
  };
  view.svg = viewer.appendSVG(div, 'svg', {
    xmlns: SVGNS,
    width: 600
  });
  return view;
};

/* CAMERA */
viewer.initCam = function() {
  return {
    c: [0, 0, 0],
    x: [1, 0, 0],
    y: [0, 1, 0],
    z: [0, 0, 1],
    r: 1,
    last: null,
    show: {
      'Faces': true,
      'Edges': true,
      'Vertices': false,
      'Face Text': false
    }
  };
};

viewer.proj = function(p, cam) {
  var q;
  q = geom.mul(geom.sub(p, cam.c), 1 / cam.r);
  return [geom.dot(q, cam.x), -geom.dot(q, cam.y), 0];
};

viewer.setCamXY = function(cam, x, y) {
  return [cam.x, cam.y, cam.z] = [x, y, geom.cross(x, y)];
};

viewer.addRotation = function(view) {
  var cam, l, len, ref, s, svg;
  ({
    svg: svg,
    cam: cam
  } = view);
  ref = ['contextmenu', 'selectstart', 'dragstart'];
  for (l = 0, len = ref.length; l < len; l++) {
    s = ref[l];
    svg[`on${s}`] = function(e) {
      return e.preventDefault();
    };
  }
  svg.onmousedown = (e) => {
    return cam.last = [e.clientX, e.clientY];
  };
  svg.onmousemove = (e) => {
    return viewer.rotateCam([e.clientX, e.clientY], view);
  };
  return svg.onmouseup = (e) => {
    viewer.rotateCam([e.clientX, e.clientY], view);
    return cam.last = null;
  };
};

viewer.rotateCam = function(p, view) {
  var cam, d, e, u, x, y;
  cam = view.cam;
  if (cam.last == null) {
    return;
  }
  d = geom.sub(p, cam.last);
  if (!geom.mag(d) > 0) {
    return;
  }
  u = geom.unit(geom.plus(geom.mul(cam.x, -d[1]), geom.mul(cam.y, -d[0])));
  [x, y] = (function() {
    var l, len, ref, results;
    ref = ['x', 'y'];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      e = ref[l];
      results.push(geom.rotate(cam[e], u, geom.mag(d) * 0.01));
    }
    return results;
  })();
  viewer.setCamXY(cam, x, y);
  cam.last = p;
  return viewer.update(view);
};

/* RENDERING */
viewer.makeModel = function(fold) {
  var a, as, b, cs, edge, f, f1, f2, i, i1, j, j1, l, len, len1, len2, len3, len4, m, normRel, o, r, ref, ref1, ref2, ref3, ref4, ref5, v, vs, w, z;
  m = {
    vs: null,
    fs: null,
    es: {}
  };
  m.vs = (function() {
    var l, len, ref, results;
    ref = fold.vertices_coords;
    results = [];
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      cs = ref[i];
      results.push({
        i: i,
        cs: cs
      });
    }
    return results;
  })();
  (function() {
    var l, len, ref, results;
    ref = m.vs;
    results = [];
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      v = ref[i];
      if (v.cs.length === 2) {
        results.push(m.vs[i].cs[2] = 0);
      }
    }
    return results;
  })();
  m.fs = (function() {
    var l, len, ref, results;
    ref = fold.faces_vertices;
    results = [];
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      vs = ref[i];
      results.push({
        i: i,
        vs: (function() {
          var len1, r, results1;
          results1 = [];
          for (r = 0, len1 = vs.length; r < len1; r++) {
            v = vs[r];
            results1.push(m.vs[v]);
          }
          return results1;
        })()
      });
    }
    return results;
  })();
  if (fold.edges_vertices != null) {
    ref = fold.edges_vertices;
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      v = ref[i];
      [a, b] = v[0] > v[1] ? [v[1], v[0]] : [v[0], v[1]];
      as = ((ref1 = fold.edges_assignment) != null ? ref1[i] : void 0) != null ? fold.edges_assignment[i] : 'U';
      m.es[`e${a}e${b}`] = {
        v1: m.vs[a],
        v2: m.vs[b],
        as: as
      };
    }
  } else {
    ref2 = m.fs;
    for (i = r = 0, len1 = ref2.length; r < len1; i = ++r) {
      f = ref2[i];
      ref3 = f.vs;
      for (j = z = 0, len2 = ref3.length; z < len2; j = ++z) {
        v = ref3[j];
        w = f.vs[geom.next(j, f.vs.length)];
        [a, b] = v.i > w.i ? [w, v] : [v, w];
        m.es[`e${a.i}e${b.i}`] = {
          v1: a,
          v2: b,
          as: 'U'
        };
      }
    }
  }
  ref4 = m.fs;
  for (i = i1 = 0, len3 = ref4.length; i1 < len3; i = ++i1) {
    f = ref4[i];
    m.fs[i].n = geom.polygonNormal((function() {
      var j1, len4, ref5, results;
      ref5 = f.vs;
      results = [];
      for (j1 = 0, len4 = ref5.length; j1 < len4; j1++) {
        v = ref5[j1];
        results.push(v.cs);
      }
      return results;
    })());
    m.fs[i].c = geom.centroid((function() {
      var j1, len4, ref5, results;
      ref5 = f.vs;
      results = [];
      for (j1 = 0, len4 = ref5.length; j1 < len4; j1++) {
        v = ref5[j1];
        results.push(v.cs);
      }
      return results;
    })());
    m.fs[i].es = {};
    m.fs[i].es = (function() {
      var j1, len4, ref5, results;
      ref5 = f.vs;
      results = [];
      for (j = j1 = 0, len4 = ref5.length; j1 < len4; j = ++j1) {
        v = ref5[j];
        w = f.vs[geom.next(j, f.vs.length)];
        [a, b] = v.i > w.i ? [w, v] : [v, w];
        edge = m.es[`e${a.i}e${b.i}`];
        if (edge == null) {
          edge = {
            v1: a,
            v2: b,
            as: 'U'
          };
        }
        results.push(edge);
      }
      return results;
    })();
    m.fs[i].ord = {};
  }
  if (fold.faceOrders != null) {
    ref5 = fold.faceOrders;
    for (j1 = 0, len4 = ref5.length; j1 < len4; j1++) {
      [f1, f2, o] = ref5[j1];
      if (o !== 0) {
        if (geom.parallel(m.fs[f1].n, m.fs[f2].n)) {
          normRel = geom.dot(m.fs[f1].n, m.fs[f2].n) > 0 ? 1 : -1;
          if (m.fs[f1].ord[`f${f2}`] != null) {
            console.log(`Warning: duplicate ordering input information for faces ${f1} and ${f2}. Using first found in the faceOrder list.`);
            if (m.fs[f1].ord[`f${f2}`] !== o) {
              console.log(`Error: duplicate ordering [${f1},${f2},${o}] is inconsistent with a previous entry.`);
            }
          } else {
            m.fs[f1].ord[`f${f2}`] = o;
            m.fs[f2].ord[`f${f1}`] = -o * normRel;
          }
        } else {
          console.log(`Warning: order for non-parallel faces [${f1},${f2}]`);
        }
      }
    }
  }
  return m;
};

viewer.faceAbove = function(f1, f2, n) {
  var basis, dir, f, ord, p1, p2, sepDir, v, v1, v2;
  [p1, p2] = (function() {
    var l, len, ref, results;
    ref = [f1, f2];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      f = ref[l];
      results.push((function() {
        var len1, r, ref1, results1;
        ref1 = f.vs;
        results1 = [];
        for (r = 0, len1 = ref1.length; r < len1; r++) {
          v = ref1[r];
          results1.push(v.ps);
        }
        return results1;
      })());
    }
    return results;
  })();
  sepDir = geom.separatingDirection2D(p1, p2, [0, 0, 1]);
  if (sepDir != null) {
    return null; // projections do not overlap
  }
  [v1, v2] = (function() {
    var l, len, ref, results;
    ref = [f1, f2];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      f = ref[l];
      results.push((function() {
        var len1, r, ref1, results1;
        ref1 = f.vs;
        results1 = [];
        for (r = 0, len1 = ref1.length; r < len1; r++) {
          v = ref1[r];
          results1.push(v.cs);
        }
        return results1;
      })());
    }
    return results;
  })();
  basis = geom.basis(v1.concat(v2));
  if (basis.length === 3) {
    dir = geom.separatingDirection3D(v1, v2);
    if (dir != null) {
      return 0 > geom.dot(n, dir); // faces are separable in 3D
    } else {
      console.log(`Warning: faces ${f1.i} and ${f2.i} properly intersect. Ordering is unresolved.`);
    }
  }
  if (basis.length === 2) {
    ord = f1.ord[`f${f2.i}`];
    if (ord != null) {
      return 0 > geom.dot(f2.n, n) * ord; // faces coplanar and have order
    }
  }
  return null;
};

viewer.orderFaces = function(view) {
  var c, direction, f, f1, f1_above, f2, faces, i, i1, j, l, len, len1, len2, len3, p, r, ref, ref1, results, z;
  faces = view.model.fs;
  direction = geom.mul(view.cam.z, -1);
  (function() {
    var l, len, results;
    results = [];
    for (l = 0, len = faces.length; l < len; l++) {
      f = faces[l];
      results.push(f.children = []);
    }
    return results;
  })();
  for (i = l = 0, len = faces.length; l < len; i = ++l) {
    f1 = faces[i];
    for (j = r = 0, len1 = faces.length; r < len1; j = ++r) {
      f2 = faces[j];
      if (!(i < j)) {
        continue;
      }
      f1_above = viewer.faceAbove(f1, f2, direction);
      if (f1_above != null) {
        [p, c] = f1_above ? [f1, f2] : [f2, f1];
        p.children = p.children.concat([c]);
      }
    }
  }
  view.model.fs = geom.topologicalSort(faces);
  ref = view.model.fs;
  for (z = 0, len2 = ref.length; z < len2; z++) {
    f = ref[z];
    f.g.parentNode.removeChild(f.g);
  }
  ref1 = view.model.fs;
  results = [];
  for (i1 = 0, len3 = ref1.length; i1 < len3; i1++) {
    f = ref1[i1];
    results.push(view.svg.appendChild(f.g));
  }
  return results;
};

viewer.draw = function({
    svg: svg,
    cam: cam,
    model: model
  }) {
  var c, e, f, i, i1, j, k, l, len, len1, len2, len3, max, min, r, ref, ref1, ref2, ref3, results, style, t, v, z;
  svg.innerHTML = '';
  style = viewer.appendSVG(svg, 'style');
  for (k in STYLES) {
    v = STYLES[k];
    style.innerHTML += `.${k}{${v}}\n`;
  }
  min = (function() {
    var l, len, ref, results;
    ref = [0, 1, 2];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      i = ref[l];
      results.push(((function() {
        var len1, r, ref1, results1;
        ref1 = model.vs;
        results1 = [];
        for (r = 0, len1 = ref1.length; r < len1; r++) {
          v = ref1[r];
          results1.push(v.cs[i]);
        }
        return results1;
      })()).reduce(geom.min));
    }
    return results;
  })();
  max = (function() {
    var l, len, ref, results;
    ref = [0, 1, 2];
    results = [];
    for (l = 0, len = ref.length; l < len; l++) {
      i = ref[l];
      results.push(((function() {
        var len1, r, ref1, results1;
        ref1 = model.vs;
        results1 = [];
        for (r = 0, len1 = ref1.length; r < len1; r++) {
          v = ref1[r];
          results1.push(v.cs[i]);
        }
        return results1;
      })()).reduce(geom.max));
    }
    return results;
  })();
  cam.c = geom.mul(geom.plus(min, max), 0.5);
  cam.r = geom.mag(geom.sub(max, min)) / 2 * 1.05;
  c = viewer.proj(cam.c, cam);
  viewer.setAttrs(svg, {
    viewBox: "-1,-1,2,2"
  });
  t = "translate(0,0.01)";
  ref = model.fs;
  for (i = l = 0, len = ref.length; l < len; i = ++l) {
    f = ref[i];
    f.g = viewer.appendSVG(svg, 'g');
    f.path = viewer.appendSVG(f.g, 'path');
    f.text = viewer.appendSVG(f.g, 'text', {
      class: 'text',
      transform: t
    });
    f.text.innerHTML = `f${f.i}`;
    f.eg = [];
    ref1 = f.es;
    for (j = r = 0, len1 = ref1.length; r < len1; j = ++r) {
      e = ref1[j];
      f.eg[j] = viewer.appendSVG(f.g, 'path');
    }
    f.vg = [];
    ref2 = f.vs;
    for (j = z = 0, len2 = ref2.length; z < len2; j = ++z) {
      v = ref2[j];
      f.vg[j] = viewer.appendSVG(f.g, 'g');
      f.vg[j].path = viewer.appendSVG(f.vg[j], 'circle', {
        class: 'vert'
      });
      f.vg[j].text = viewer.appendSVG(f.vg[j], 'text', {
        transform: 'translate(0, 0.01)',
        class: 'text'
      });
      f.vg[j].text.innerHTML = `${v.i}`;
    }
  }
  cam.axis = viewer.appendSVG(svg, 'g', {
    transform: 'translate(-0.9,-0.9)'
  });
  ref3 = ['x', 'y', 'z'];
  results = [];
  for (i1 = 0, len3 = ref3.length; i1 < len3; i1++) {
    c = ref3[i1];
    results.push(cam.axis[c] = viewer.appendSVG(cam.axis, 'path', {
      id: `a${c}`,
      class: `a${c} axis`
    }));
  }
  return results;
};

viewer.update = function(view) {
  var c, cam, e, end, f, i, j, k, l, len, len1, len2, model, p, r, ref, ref1, ref2, ref3, ref4, results, show, svg, v, visibleSide, z;
  ({
    model: model,
    cam: cam,
    svg: svg
  } = view);
  (function() {
    var l, len, ref, results;
    ref = model.vs;
    results = [];
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      v = ref[i];
      results.push(model.vs[i].ps = viewer.proj(v.cs, cam));
    }
    return results;
  })();
  (function() {
    var l, len, ref, results;
    ref = model.fs;
    results = [];
    for (i = l = 0, len = ref.length; l < len; i = ++l) {
      f = ref[i];
      results.push(model.fs[i].c2 = viewer.proj(f.c, cam));
    }
    return results;
  })();
  viewer.orderFaces(view);
  show = {};
  ref = cam.show;
  for (k in ref) {
    v = ref[k];
    show[k] = v ? 'visible' : 'hidden';
  }
  ref1 = model.fs;
  for (i = l = 0, len = ref1.length; l < len; i = ++l) {
    f = ref1[i];
    if (!(f.path != null)) {
      continue;
    }
    visibleSide = geom.dot(f.n, cam.z) > 0 ? 'top' : 'bot';
    viewer.setAttrs(f.text, {
      x: f.c2[0],
      y: f.c2[1],
      visibility: show['Face Text']
    });
    viewer.setAttrs(f.path, {
      d: viewer.makePath((function() {
        var len1, r, ref2, results;
        ref2 = f.vs;
        results = [];
        for (r = 0, len1 = ref2.length; r < len1; r++) {
          v = ref2[r];
          results.push(v.ps);
        }
        return results;
      })()) + 'Z',
      visibility: show['Faces'],
      class: `face ${visibleSide}`
    });
    ref2 = f.es;
    for (j = r = 0, len1 = ref2.length; r < len1; j = ++r) {
      e = ref2[j];
      viewer.setAttrs(f.eg[j], {
        d: viewer.makePath([e.v1.ps, e.v2.ps]),
        visibility: show['Edges'],
        class: `edge ${e.as}`
      });
    }
    ref3 = f.vs;
    for (j = z = 0, len2 = ref3.length; z < len2; j = ++z) {
      v = ref3[j];
      viewer.setAttrs(f.vg[j], {
        visibility: show['Vertices']
      });
      viewer.setAttrs(f.vg[j].path, {
        cx: v.ps[0],
        cy: v.ps[1]
      });
      viewer.setAttrs(f.vg[j].text, {
        x: v.ps[0],
        y: v.ps[1]
      });
    }
  }
  ref4 = {
    x: [1, 0, 0],
    y: [0, 1, 0],
    z: [0, 0, 1]
  };
  results = [];
  for (c in ref4) {
    v = ref4[c];
    end = geom.plus(geom.mul(v, 0.05 * cam.r), cam.c);
    results.push(viewer.setAttrs(cam.axis[c], {
      d: viewer.makePath((function() {
        var i1, len3, ref5, results1;
        ref5 = [cam.c, end];
        results1 = [];
        for (i1 = 0, len3 = ref5.length; i1 < len3; i1++) {
          p = ref5[i1];
          results1.push(viewer.proj(p, cam));
        }
        return results1;
      })())
    }));
  }
  return results;
};

},{"./geom":11}]},{},[6]);
