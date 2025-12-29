// ==UserScript==
// @name        utils.scalable
// @author      jasineri @github.com/jasineri/scalable-broker-utils
// @namespace   jasineri
// @version     0.1.10
// @downloadURL   https://raw.githubusercontent.com/jasineri/scalable-broker-utils/master/greasemonkey/src/utils.scalable.user.js
// @description Enhancements on scalable.capital/broker: adds resell button to expired orders
// @match       *://de.scalable.capital/*
// ==/UserScript==
function c(a){e(a);clearTimeout(a.o);a.o=setTimeout(()=>{e(a);null!=a.h&&(a.g=0,g(a))},1E3);switch(a.g){case 0:g(a);break;case 1:h(a,"//button//span[not(@disabled) and (text()='V' or contains(text(), 'Verkaufen'))]",1);break;case 2:null!=a.i?h(a,"//button[contains(@aria-label, 'Handelsplatz')]",2,()=>h(a,"//div[contains(text(), '"+a.i+"')]",3)):a.g=4;break;case 4:h(a,"//*[text()='St\u00fcckzahl']",4,()=>k(a,()=>document.execCommand("insertText",!1,a.m),5,()=>h(a,"//button//*[contains(text(), 'Order vorbereiten')]",
6)));break;case 7:h(a,"//input[@id='limit-price-checkbox']",7,()=>k(a,()=>document.execCommand("insertText",!1,a.l),8))}}function e(a){a.h=m("//div[contains(text(), 'Order abgel')]");null==a.h&&(a.h=m("//div[contains(text(), 'Order storniert')]"))}
function g(a){if(null==document.getElementById(a.j)&&null!=a.h){a.i=m('//div[text()="Handelsplatz"]/following-sibling::*')?.textContent;a.m=m('//div[text()="Beauftragte St\u00fcckzahl"]/following-sibling::*')?.textContent;a.l=m('//div[text()="Limitpreis"]/following-sibling::*')?.textContent;let b=document.createElement("button");b.addEventListener("click",()=>h(a,"//button[contains(node(), 'Schlie\u00dfen')]",0));b.innerText=a.j;b.id=a.j;a.h.parentElement.appendChild(b)}}
function h(a,b,d,f){setTimeout(()=>{if(a.g===d){let l=m(b);null!=l&&(a.g=d+1,console.log("Step:"+d),l.click(),f&&f())}},200)}function k(a,b,d,f){setTimeout(()=>{a.g===d&&(b(),a.g=d+1,console.log("Step:"+d),f&&f())},200)}function m(a){try{return document.evaluate(a,document,null,XPathResult.ANY_TYPE,null).iterateNext()}catch(b){return null}}
class n{constructor(){this.j="Resell";this.l=this.m=this.i=null;this.g=0;this.h=null;this.o=void 0;MutationObserver=window.MutationObserver;(new MutationObserver(()=>{c(this)})).observe(document,{subtree:!0,childList:!0,attributes:!0})}}new n;
