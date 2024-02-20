// ==UserScript==
// @name        utils.scalable
// @author      jasineri @github.com/jasineri/scalable-broker-utils
// @namespace   jasineri
// @version     0.1.5
// @downloadURL   https://raw.githubusercontent.com/jasineri/scalable-broker-utils/master/greasemonkey/src/utils.scalable.user.js
// @description Enhancements on scalable.capital/broker: adds resell button to expired orders
// @match       *://de.scalable.capital/*
// ==/UserScript==
function c(a){d(a);clearTimeout(a.m);a.m=setTimeout(()=>{d(a);null!=a.h&&(a.g=0,f(a))},1E3);switch(a.g){case 0:f(a);break;case 1:g(a,()=>{if(1===a.g){let b=h("//button//span[not(@disabled) and (text()='V' or contains(text(), 'Verkaufen'))]");null!=b&&(a.g=0,b.click(),m(a,"//div[text()='St\u00fcckzahl']",0,()=>g(a,()=>document.execCommand("insertText",!1,a.l),()=>m(a,"//button//*[contains(text(), 'Order vorbereiten')]",0,()=>m(a,"//input[@id='limit-price-checkbox']",0,()=>g(a,()=>document.execCommand("insertText",
!1,a.j)))))))}})}}function d(a){a.h=h('//div[text()="Order abgelaufen"]')}function f(a){if(null==document.getElementById(a.i)&&null!=a.h){a.l=h('//div[text()="Beauftragte St\u00fcckzahl"]/following-sibling::*')?.textContent;a.j=h('//div[text()="Limitpreis"]/following-sibling::*')?.textContent;let b=document.createElement("button");b.addEventListener("click",()=>m(a,"//button[contains(node(), 'Schlie\u00dfen')]",1));b.innerText=a.i;b.id=a.i;a.h.parentElement.appendChild(b)}}
function g(a,b,e){setTimeout(()=>{b();a.g=0;e&&e()},200)}function h(a){try{return document.evaluate(a,document,null,XPathResult.ANY_TYPE,null).iterateNext()}catch(b){return null}}function m(a,b,e,k){setTimeout(()=>{let l=h(b);null!=l&&(a.g=e,l.click(),k&&k())},200)}class n{constructor(){this.i="Resell";this.j=this.l=null;this.g=0;this.h=null;this.m=void 0;MutationObserver=window.MutationObserver;(new MutationObserver(()=>{c(this)})).observe(document,{subtree:!0,childList:!0,attributes:!0})}}new n;
