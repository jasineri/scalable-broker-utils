function d(a){let b=e('//div[text()="Order abgelaufen"]');null!=b&&(a.g=0);switch(a.g){case 0:null==document.getElementById(a.h)&&null!=b&&(a.j=e('//div[text()="Beauftragte St\u00fcckzahl"]/following-sibling::*')?.textContent,a.i=e('//div[text()="Limitpreis"]/following-sibling::*')?.textContent,f(a,b));break;case 1:h(a,"//button//span[text()='V' or contains(text(), 'Verkaufen')]",2);break;case 2:h(a,"//div[text()='St\u00fcckzahl']",3);break;case 3:k(a,()=>{document.execCommand("insertText",!1,a.j);
h(a,"//button//*[contains(text(), 'Order vorbereiten')]",4)},3);break;case 4:h(a,"//input[@id='limit-price-checkbox']",5);break;case 5:k(a,()=>document.execCommand("insertText",!1,a.i),0)}}function e(a){try{return document.evaluate(a,document,null,XPathResult.ANY_TYPE,null).iterateNext()}catch(b){return null}}
function f(a,b){let c=document.createElement("button");c.addEventListener("click",()=>h(a,"//button[contains(node(), 'Schlie\u00dfen')]",1));c.innerText=a.h;c.id=a.h;b.parentElement.appendChild(c)}function h(a,b,c){setTimeout(()=>{let g=e(b);null!=g&&(a.g=c,g.click())},100)}function k(a,b,c){setTimeout(()=>{b();a.g=c},100)}
class l{constructor(){this.h="Resell";this.i=this.j=null;this.g=0;MutationObserver=window.MutationObserver;(new MutationObserver(()=>{d(this)})).observe(document,{subtree:!0,characterData:!0,attributes:!1})}}new l;
