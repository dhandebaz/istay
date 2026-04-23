var h=`
self.onmessage = async (e) => {
  const { dataUrl, maxWidth, quality } = e.data;
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    
    let width = bitmap.width;
    let height = bitmap.height;
    
    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }
    
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get OffscreenCanvas context");
    
    ctx.drawImage(bitmap, 0, 0, width, height);
    
    const outBlob = await canvas.convertToBlob({ type: "image/jpeg", quality });
    self.postMessage({ success: true, blob: outBlob });
  } catch (err) {
    self.postMessage({ success: false, error: err.message });
  }
};
`,l=null;function f(){if(typeof Worker>"u")return null;if(!l){let n=new Blob([h],{type:"application/javascript"});l=URL.createObjectURL(n)}return new Worker(l)}function p(n,a=1200,m=.7){if(n.length<5e5)return Promise.resolve(n);let u=new Promise((c,t)=>{if(typeof OffscreenCanvas>"u"||typeof Worker>"u"){let e=new Image;e.src=n,e.onload=()=>{let r=document.createElement("canvas"),g=r.getContext("2d");if(!g)return t(new Error("Could not get canvas context"));let s=e.width,i=e.height;s>a&&(i=a/s*i,s=a),r.width=s,r.height=i,g.drawImage(e,0,0,s,i),c(r.toDataURL("image/jpeg",m))},e.onerror=()=>t(new Error("Image failed to load for compression"));return}let o=f();if(!o)return t(new Error("Worker not available"));let d=setTimeout(()=>{o.terminate(),t(new Error("Worker compression timed out"))},1e4);o.onmessage=e=>{if(clearTimeout(d),e.data.success){let r=new FileReader;r.onload=()=>c(r.result),r.readAsDataURL(e.data.blob)}else t(new Error(e.data.error));o.terminate()},o.onerror=e=>{clearTimeout(d),o.terminate(),t(new Error(e.message))},o.postMessage({dataUrl:n,maxWidth:a,quality:m})}),w=new Promise((c,t)=>{setTimeout(()=>t(new Error("Image compression timed out")),10500)});return Promise.race([u,w])}export{p as a};
