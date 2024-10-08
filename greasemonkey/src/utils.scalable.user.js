// ==UserScript==
// @name        utils.scalable
// @author      jasineri @github.com/jasineri/scalable-broker-utils
// @namespace   jasineri
// @version     0.1.7
// @downloadURL   https://raw.githubusercontent.com/jasineri/scalable-broker-utils/master/greasemonkey/src/utils.scalable.user.js
// @description Enhancements on scalable.capital/broker: adds resell button to expired orders
// @match       *://de.scalable.capital/*
// ==/UserScript==
function d(a){f(a);clearTimeout(a.m);a.m=setTimeout(()=>{f(a);null!=a.h&&(a.g=0,g(a))},1E3);switch(a.g){case 0:g(a);break;case 1:h(a,"//button//span[not(@disabled) and (text()='V' or contains(text(), 'Verkaufen'))]",1);break;case 2:h(a,"//div[text()='St\u00fcckzahl']",2,()=>k(a,()=>document.execCommand("insertText",!1,a.l),3,()=>h(a,"//button//*[contains(text(), 'Order vorbereiten')]",4)));break;case 5:h(a,"//input[@id='limit-price-checkbox']",5,()=>k(a,()=>document.execCommand("insertText",!1,a.j),
6))}}function f(a){a.h=m("//div[contains(text(), 'Order abgel')]")}function g(a){if(null==document.getElementById(a.i)&&null!=a.h){a.l=m('//div[text()="Beauftragte St\u00fcckzahl"]/following-sibling::*')?.textContent;a.j=m('//div[text()="Limitpreis"]/following-sibling::*')?.textContent;let b=document.createElement("button");b.addEventListener("click",()=>h(a,"//button[contains(node(), 'Schlie\u00dfen')]",0));b.innerText=a.i;b.id=a.i;a.h.parentElement.appendChild(b)}}
function h(a,b,c,e){setTimeout(()=>{if(a.g===c){let l=m(b);null!=l&&(a.g=c+1,console.log("Step:"+c),l.click(),e&&e())}},200)}function k(a,b,c,e){setTimeout(()=>{a.g===c&&(b(),a.g=c+1,console.log("Step:"+c),e&&e())},200)}function m(a){try{return document.evaluate(a,document,null,XPathResult.ANY_TYPE,null).iterateNext()}catch(b){return null}}
class n{constructor(){this.i="Resell";this.j=this.l=null;this.g=0;this.h=null;this.m=void 0;MutationObserver=window.MutationObserver;(new MutationObserver(()=>{d(this)})).observe(document,{subtree:!0,childList:!0,attributes:!0})}}new n;
