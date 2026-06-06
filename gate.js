/* Simple password gate. NOTE: this is a casual lock only — the password is in this
 * file's source, so it deters casual visitors but not technical ones. For real
 * protection use Vercel Password Protection. Unlocks once per device. */
(function(){
  var PW='regalo';
  var ok=false; try{ ok=localStorage.getItem('site_unlocked')==='1'; }catch(e){}
  if(ok) return;
  var st=document.createElement('style'); st.id='gateStyle';
  st.textContent='body{visibility:hidden!important}#gate{visibility:visible!important}';
  document.documentElement.appendChild(st);
  function build(){
    var g=document.createElement('div'); g.id='gate';
    g.style.cssText='position:fixed;inset:0;z-index:99999;background:#000;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif';
    g.innerHTML='<div style="text-align:center;color:#fff;max-width:300px;width:100%;padding:24px">'
      +'<div style="font-size:34px;margin-bottom:6px">🔒</div>'
      +'<div style="font-family:Georgia,serif;font-style:italic;font-size:24px;margin-bottom:18px">Private dashboard</div>'
      +'<input id="gatePw" type="password" placeholder="Password" autocomplete="off" style="width:100%;padding:13px 15px;border-radius:12px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font-size:15px;outline:none">'
      +'<div id="gateErr" style="color:#fb7185;font-size:12px;height:16px;margin-top:8px"></div>'
      +'<button id="gateBtn" style="width:100%;margin-top:6px;padding:13px;border:0;border-radius:12px;background:#6EE7B7;color:#04130c;font-weight:600;font-size:14px;cursor:pointer">Enter</button></div>';
    document.body.appendChild(g);
    var inp=g.querySelector('#gatePw'), btn=g.querySelector('#gateBtn'), err=g.querySelector('#gateErr');
    function tryit(){ if(inp.value===PW){ try{localStorage.setItem('site_unlocked','1');}catch(e){} var s=document.getElementById('gateStyle'); if(s)s.remove(); g.remove(); } else { err.textContent='Wrong password'; inp.value=''; inp.focus(); } }
    btn.onclick=tryit; inp.addEventListener('keydown',function(e){ if(e.key==='Enter')tryit(); }); setTimeout(function(){inp.focus();},50);
  }
  if(document.body) build(); else document.addEventListener('DOMContentLoaded',build);
})();
