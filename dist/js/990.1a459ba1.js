"use strict";(self["webpackChunktrekkingcastillayleon"]=self["webpackChunktrekkingcastillayleon"]||[]).push([[990],{8990:function(t,e,n){n.r(e),n.d(e,{createSwipeBackGesture:function(){return c}});var r=n(6587),i=n(545),a=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=(t,e,n,c,o)=>{const s=t.ownerDocument.defaultView,l=(0,i.i)(t),u=t=>{const e=50,{startX:n}=t;return l?n>=s.innerWidth-e:n<=e},h=t=>l?-t.deltaX:t.deltaX,k=t=>l?-t.velocityX:t.velocityX,d=t=>u(t)&&e(),f=t=>{const e=h(t),n=e/s.innerWidth;c(n)},w=t=>{const e=h(t),n=s.innerWidth,i=e/n,a=k(t),c=n/2,l=a>=0&&(a>.2||e>c),u=l?1-i:i,d=u*n;let f=0;if(d>5){const t=d/Math.abs(a);f=Math.min(t,540)}o(l,i<=0?.01:(0,r.j)(0,i,.9999),f)};return(0,a.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:d,onStart:n,onMove:f,onEnd:w})}}}]);
//# sourceMappingURL=990.1a459ba1.js.map