import{a as n,b as i}from"./chunk-OWBRQ5SI.js";import{a as e}from"./chunk-BYRZ2NRM.js";import"./chunk-JP5XG2OT.js";function a(){let[s,o]=n(!1);return i(()=>{let t=()=>o(!navigator.onLine);return window.addEventListener("online",t),window.addEventListener("offline",t),t(),()=>{window.removeEventListener("online",t),window.removeEventListener("offline",t)}},[]),s?e("div",{class:"fixed top-0 left-0 right-0 z-[100] animate-slide-down",children:[e("div",{class:"bg-amber-500 text-white px-4 py-2.5 flex items-center justify-between shadow-lg",children:[e("div",{class:"flex items-center gap-3",children:[e("span",{class:"text-lg",children:"\u{1F4E1}"}),e("div",{children:[e("p",{class:"text-[11px] font-900 uppercase tracking-widest leading-none",children:"Offline Mode"}),e("p",{class:"text-[10px] font-600 opacity-90 mt-1",children:"Actions will be synced when connection is restored."})]})]}),e("button",{onClick:()=>window.location.reload(),class:"px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-800 uppercase transition-all",children:"Check again"})]}),e("style",{children:`
          @keyframes slide-down {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          .animate-slide-down {
            animation: slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `})]}):null}export{a as default};
