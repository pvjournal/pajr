/* PaJR index app - data from core.json */

const D=window.__D;
const byUrl={};
const _R=D.records;
Object.entries(D.whereIdx).forEach(([t,is])=>is.forEach(_i=>{
  const _r=_R[_i], p={u:_r.url,t:_r.title,h:_r.sha256.slice(0,12)};
  (byUrl[p.u]=byUrl[p.u]||{u:p.u,t:p.t,h:p.h,terms:[]}).terms.push(t)}));
const all=Object.values(byUrl);
let sel=null;
let RARE=false;
const dfs=D.terms.map(t=>t.df||t.n),mxd=Math.max(...dfs),mnd=Math.min(...dfs);
const ns=D.terms.map(t=>t.n),mxn=Math.max(...ns),mnn=Math.min(...ns);
const cloud=document.getElementById('cloud');
function sizeCloud(){
 [...cloud.children].forEach((b,i)=>{const t=D.terms[i];const df=t.df||t.n;
  let k;
  if(RARE){ // invert: the rarer (low df), the bigger. df=1,2 become the headline.
   k=1-(Math.log(df)-Math.log(mnd))/((Math.log(mxd)-Math.log(mnd))||1);
   b.style.color=df<=2?'var(--warm)':'';
  }else{
   k=(Math.log(t.n)-Math.log(mnn))/((Math.log(mxn)-Math.log(mnn))||1);
   b.style.color='';
  }
  b.style.fontSize=(13+k*28).toFixed(1)+'px';b.style.opacity=(.55+k*.45).toFixed(2);});}
D.terms.forEach(t=>{const b=document.createElement('button');b.textContent=t.t;
 const dfn=t.df||t.n;
 b.onclick=()=>{sel=(sel===t.t?null:t.t);document.getElementById('q').value='';render()};
 b.dataset.t=t.t;b.dataset.df=dfn;b.style.setProperty('--d',(Math.random()*4).toFixed(2)+'s');
 cloud.appendChild(b)});
sizeCloud();
document.getElementById('rare').onclick=()=>{RARE=!RARE;
 document.getElementById('rare').classList.toggle('on',RARE);
 document.getElementById('rare').textContent=RARE?'Show all':'Spotlight rare';sizeCloud()};
function render(){
 const q=document.getElementById('q').value.trim().toLowerCase();
 let rows=all;
 if(sel) rows=rows.filter(r=>r.terms.includes(sel));
 if(q) rows=rows.filter(r=>(r.t||'').toLowerCase().includes(q)||r.terms.some(t=>t.includes(q)));
 rows.sort((a,b)=>b.terms.length-a.terms.length);
 document.getElementById('rh').textContent=sel?('Reports — '+sel):'Reports';
 document.getElementById('c').textContent=rows.length+' of '+all.length;
 [...cloud.children].forEach(b=>b.classList.toggle('on',b.dataset.t===sel));
 const l=document.getElementById('rl');l.innerHTML='';l.className=JR?'rack':'';
 if(JR){l.className='rack';let last='';
  rows.slice(0,600).forEach(r=>{
   const m=(r.u.match(/\/(\d{4})\/(\d{2})\//)||[]);
   const vol=m[1]?(['','January','February','March','April','May','June','July',
     'August','September','October','November','December'][+m[2]]+' '+m[1]):'Undated';
   if(vol!==last){last=vol;const h=document.createElement('div');h.className='vol2';
    h.textContent=vol;l.appendChild(h)}
   const a=document.createElement('a');a.className='mag';a.href=r.u;a.target='_blank';a.rel='noopener';
   const host=r.u.split('/')[2].replace('.blogspot.com','');
   a.innerHTML='<div class="masthead">'+host+'</div>'+
    '<div class="cover">'+(r.t||r.u).replace(/</g,'&lt;').slice(0,110)+'</div>'+
    '<div class="tags2">'+r.terms.slice(0,4).map(x=>'<span>'+x+'</span>').join('')+'</div>'+
    '<div class="foot">'+(m[1]||'')+' · sha '+r.h+'</div>';
   l.appendChild(a)});
  return}
 rows.slice(0,400).forEach(r=>{const li=document.createElement('li');
  const a=document.createElement('a');a.href=r.u;a.target='_blank';a.rel='noopener';
  a.textContent=r.t||r.u;li.appendChild(a);
  const m=document.createElement('span');m.className='meta';
  m.textContent='sha '+r.h+'  ·  '+r.u.replace(/^https?:\/\//,'');li.appendChild(m);
  const tg=document.createElement('div');tg.className='tags';
  r.terms.slice(0,9).forEach(t=>{const s=document.createElement('span');s.textContent=t;
   tg.appendChild(s)});li.appendChild(tg);l.appendChild(li)});
}
document.getElementById('q').oninput=render;

// --- Research Kundali: a chart per contributor, from public output only ------
document.getElementById('kn').onclick=async()=>{
 const l=document.getElementById('rl');
 document.getElementById('rh').textContent='Contributors';
 l.className='';l.innerHTML='<li>loading kundali.json…</li>';
 let K;try{K=await (await fetch('kundali.json')).json()}catch(e){
  l.innerHTML='<li>kundali.json not alongside this page.</li>';return}
 const S=K._stats||{};l.innerHTML='';
 if(S.contributors){const b=document.createElement('li');b.style.borderTop='0';
  b.innerHTML='<div class="statgrid">'+
   [['contributors',S.contributors],['attributed reports',S.attributed_posts],
    ['unattributed',S.unattributed_posts],['median / contributor',S.median_per_contributor],
    ['most prolific',S.max_per_contributor],['one-report authors',S.single_report_contributors]]
   .map(x=>'<div class="stat"><b>'+x[0]+'</b><i>'+x[1]+'</i></div>').join('')+'</div>';
  l.appendChild(b)}
 Object.entries(K).filter(([a])=>a!=='_stats').forEach(([a,v])=>{const li=document.createElement('li');
  const yrs=Object.entries(v.years||{}).sort();
  const mx=Math.max(1,...yrs.map(y=>y[1]));
  li.innerHTML='<b>'+a+'</b> <span class="meta">'+v.posts+' reports · '+
   (v.hosts||[]).length+' blog(s)'+(v.profile?' · <a href="'+v.profile+
   '" target="_blank" rel="noopener">profile</a>':'')+'</span>'+
   '<div class="tags">'+(v.terms||[]).slice(0,10).map(x=>'<span>'+x+'</span>').join('')+'</div>'+
   '<div class="spark">'+yrs.map(y=>'<i style="height:'+(6+28*y[1]/mx)+
   'px" title="'+y[0]+': '+y[1]+'"></i><em>'+y[0].slice(2)+'</em>').join('')+'</div>';
  l.appendChild(li)});};

// --- journal view: same corpus, arranged as issues by year and month ---------
let JR=false;
document.getElementById('vw').onclick=()=>{JR=!JR;
 document.getElementById('vw').textContent=JR?'Cloud view':'News rack';
 document.getElementById('rl').className=JR?'jrn':'';render()};

// --- "aren't you giddy yet?" ------------------------------------------------
document.getElementById('gd').onclick=()=>{
 if(!document.body.classList.contains('giddy-on')){
  if(!confirm("This turns the page into rapidly shifting colours.\n\n"+
   "Skip it if you are sensitive to flashing or animated colour, or if you would "+
   "rather keep reading case reports in peace.\n\nProceed?")) return;}
 document.body.classList.toggle('giddy-on');
 document.getElementById('gd').textContent=
  document.body.classList.contains('giddy-on')?'Sober up':"Aren't you giddy yet?";};
const NS='http://www.w3.org/2000/svg',svg=document.getElementById('net'),pos={};
const E=D.edges.slice(0,120),ks=[...new Set(E.flatMap(e=>[e.a,e.b]))];
ks.forEach((n,i)=>{const a=2*Math.PI*i/ks.length;
 pos[n]={x:500+330*Math.cos(a),y:170+140*Math.sin(a)}});
E.forEach(e=>{const L=document.createElementNS(NS,'line');
 L.setAttribute('x1',pos[e.a].x);L.setAttribute('y1',pos[e.a].y);
 L.setAttribute('x2',pos[e.b].x);L.setAttribute('y2',pos[e.b].y);
 L.setAttribute('stroke-width',Math.min(2.5,e.n/6));svg.appendChild(L)});
ks.forEach(n=>{const c=document.createElementNS(NS,'circle');
 c.setAttribute('cx',pos[n].x);c.setAttribute('cy',pos[n].y);c.setAttribute('r',3.6);
 c.onclick=()=>{sel=n;render();window.scrollTo({top:document.getElementById('rh').offsetTop-70,behavior:'smooth'})};
 svg.appendChild(c);
 const t=document.createElementNS(NS,'text');t.setAttribute('x',pos[n].x+5);
 t.setAttribute('y',pos[n].y+3);t.textContent=n;svg.appendChild(t)});
// hover a report title -> floating "seed an AI conversation" affordance
let hoverBar=document.createElement('div');hoverBar.id='hb';
hoverBar.innerHTML='<button>Seed an AI conversation about this</button>';
document.body.appendChild(hoverBar);
hoverBar.firstChild.onclick=()=>{const u=hoverBar.dataset.u,ti=hoverBar.dataset.t;
 const p='I am a clinician reading a published, deidentified, consented case report '+
  'titled "'+ti+'" at '+u+'. It belongs to its authors (PaJR Health, CC BY-NC-SA 4.0); '+
  'this is a public URL, not reproduced text.\n\n'+
  'Please help me: (1) trace the clinical reasoning and differential; (2) note what to '+
  'learn for practice; (3) suggest, as an OPTIONAL workflow aid, how a simple visual '+
  '"system painting" (an AAB-style sketch of the patient system — organs, timeline, '+
  'interactions) might make this case easier to reason about and hand over; and '+
  '(4) flag any low-cost, sustainable practice steps relevant here.\n\n'+
  'Verify everything against the primary record; AI output can be wrong.';
 window.open('https://claude.ai/new?q='+encodeURIComponent(p),'_blank');};
document.addEventListener('mouseover',e=>{const a=e.target.closest('#rl a[href]');
 if(!a){return}const r=a.getBoundingClientRect();
 hoverBar.dataset.u=a.href;hoverBar.dataset.t=a.textContent;
 hoverBar.style.left=Math.min(r.left,innerWidth-260)+'px';
 hoverBar.style.top=(window.scrollY+r.bottom+2)+'px';hoverBar.style.display='block';});
document.addEventListener('mouseout',e=>{if(e.target.closest('#rl a'))
 setTimeout(()=>{if(!hoverBar.matches(':hover'))hoverBar.style.display='none';},250);});

// non-clinical hosts, linked to the Wayback Machine so the trail stays traceable
if((D.non_clinical||[]).length){const h2=document.createElement('h2');
 h2.textContent='Linked non-clinical blogs (via web archive)';
 document.querySelector('main').insertBefore(h2,document.getElementById('ft'));
 const ol=document.createElement('ol');
 D.non_clinical.slice(0,60).forEach(x=>{const li=document.createElement('li');
  li.innerHTML='<a href="'+x.archive+'" target="_blank" rel="noopener">'+x.host+
   '</a> <span class="meta">web.archive.org snapshot</span>';ol.appendChild(li)});
 document.querySelector('main').insertBefore(ol,document.getElementById('ft'));}

document.getElementById('aabmore').onclick=()=>{
 const p='As a clinical workflow aid, explain how to make a quick "system painting" of '+
  'a patient case — a simple visual sketch of the patient as a system (organs, timeline, '+
  'key interactions and how the illness moves through them) — and how using such sketches '+
  'routinely can improve diagnostic reasoning, teaching and handover. Keep it practical '+
  'and low-cost, and add any sustainability angle (reusable templates, low-resource '+
  'settings).';
 window.open('https://claude.ai/new?q='+encodeURIComponent(p),'_blank');};
document.getElementById('ft').textContent=
 D.posts+' case reports indexed · '+D.terms.length+' terms · generated '+D.generated_utc+
 ' · index only, no report text reproduced';
render();
