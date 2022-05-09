(()=>{"use strict";class e{constructor(e,t,s=""){this.node=document.createElement(e),this.node.classList.add(...t),this.node.textContent=s}}const t=[],s=[];let a="true"===localStorage.getItem("isEn"),n=!1,o=!1,c=!1;const l=new Set;let r=0,i=0;const d=()=>a,u=e=>{n=e},h=()=>n,k=e=>{e.classList.add("press-key"),e.classList.remove("key-hover")},f=e=>{e.classList.remove("press-key"),e.classList.add("key-hover")},g=e=>{e.classList.toggle("press-key"),e.classList.toggle("key-hover")},p=(e,t)=>{r=e,i=t},L=()=>({start:r,end:i}),v=e=>{const t=(()=>{let e="";return d()?(e=h()?"enShift":"en",localStorage.setItem("isEn",!0)):(e=h()?"ruShift":"ru",localStorage.setItem("isEn",!1)),e})();e.forEach(((e,a)=>{"undefined"!==e&&(e.textContent=s[a][t])}))},y=()=>{a=!a,v(t)},w=(e,t)=>{const{length:s}=t.value,a=t.selectionStart,n=e.length;if(a===s)t.value+=e,p(s+n,s+n),t.setSelectionRange(s+n,s+n);else if(0===a)t.value=e+t.value,p(a+n,a+n),t.setSelectionRange(a+n+1,a+n+1);else{const o=t.value.slice(0,a)+e+t.value.slice(a,s);t.value=o,p(a+n,a+n),t.setSelectionRange(a+n,a+n)}},S=(e,s)=>{if(s.focus(),e.classList.contains("key--dark"))switch(e.dataset.key){case"Backspace":(e=>{const{start:t,end:s}=L(),{length:a}=e.value;if(t===a||s===a)e.value=e.value.slice(0,-1);else if(t>0&&s>0){const n=e.value.slice(0,t-1)+e.value.slice(s,a);e.value=n}t>0&&s>0&&(e.setSelectionRange(t-1,s-1),p(t-1,s-1))})(s);break;case"ShiftLeft":case"ShiftRight":u(!0),c&&u(!n),o||(o=!0,v(t));break;case"CapsLock":(()=>{u(!n),c=!c;const e=[];t.forEach((t=>{"Key"===t.dataset.key.slice(0,3)?e.push(t):e.push("undefined")})),v(e)})();break;case"Enter":w("\n",s);break;case"Tab":w("    ",s);break;case"ControlLeft":case"ControlRight":case"AltLeft":case"AltRight":((e,t,...s)=>{let a;switch(t){case"ControlLeft":case"ControlRight":a=t.slice(0,7);break;case"AltLeft":case"AltRight":a=t.slice(0,3)}l.add(a);for(const e of s)if(!l.has(e))return;l.clear(),e()})(y,e.dataset.key,"Control","Alt");break;case"Delete":(e=>{const{start:t,end:s}=L(),{length:a}=e.value;if(0===t||0===s)e.value=e.value.slice(1,a);else if(t<a&&s<a){const n=e.value.slice(0,t)+e.value.slice(s+1,a);e.value=n}t<a&&s<a&&(e.setSelectionRange(t,s),p(t,s))})(s);break;case"ArrowUp":w("▲",s);break;case"ArrowLeft":w("◄",s);break;case"ArrowDown":w("▼",s);break;case"ArrowRight":w("►",s)}else w(e.textContent,s)},b=e=>{if(e.classList.contains("key--dark"))switch(e.dataset.key){case"ShiftLeft":case"ShiftRight":o=!1,u(!1),c&&u(!0),v(t);break;case"ControlLeft":case"ControlRight":case"AltLeft":case"AltRight":(e=>{let t;switch(e){case"ControlLeft":case"ControlRight":t=e.slice(0,7);break;case"AltLeft":case"AltRight":t=e.slice(0,3)}l.delete(t)})(e.dataset.key)}};class C extends e{constructor(){super("div",["row"])}}class R extends e{constructor(e,t,s){super("button",e,t),this.node.dataset.key=s}}const E=new e("div",["wrapper"]),m=new e("h1",["title"],"RSS Virtual keyboard"),A=new class extends e{constructor(){super("textarea",["area"]),this.node.cols="50",this.node.rows="5"}},x=new class extends e{constructor(){super("div",["keyboard"])}update=async()=>{this.node.innerHTML="",(await(async()=>{try{const e=await fetch("./keys.json");return await e.json()}catch(e){throw new Error(e)}})()).forEach((e=>{const a=new C;for(let n=0;n<e.length;n++){const{classes:o,content:c,data:l}=e[n];s.push(c);const r=d()?c.en:c.ru,i=new R(o,r,l);t.push(i.node),a.node.append(i.node)}this.node.append(a.node)}))}},D=new e("p",["text"],"Keyboard created in OS Windows"),I=new e("p",["text"],"To switch language: ctrl + alt");x.update(),E.node.append(m.node,A.node,x.node,D.node,I.node),document.body.append(E.node),x.node.addEventListener("mousedown",(e=>{if(e.target.classList.contains("key")){const t=e.target;"CapsLock"===t.dataset.key?g(t):k(t),S(t,A.node)}})),x.node.addEventListener("mouseup",(e=>{if(e.target.classList.contains("key")){const t=e.target;"CapsLock"!==t.dataset.key&&f(t),b(t)}})),x.node.addEventListener("mouseout",(e=>{if(e.target.classList.contains("key")){const t=e.target,s=t.dataset.key;"CapsLock"!==s&&"ShiftLeft"!==s&&"ShiftRight"!==s&&f(t)}})),document.addEventListener("keydown",(e=>{e.preventDefault();const s=t.filter((t=>t.dataset.key===e.code))[0];"CapsLock"===e.code?g(s):k(s),S(s,A.node)})),document.addEventListener("keyup",(e=>{const s=t.filter((t=>t.dataset.key===e.code))[0];"CapsLock"!==e.code&&f(s),b(s)})),A.node.addEventListener("click",(e=>{e.preventDefault();const t=A.node.selectionStart,s=A.node.selectionEnd;p(t,s)}))})();