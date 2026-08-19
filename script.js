const slides=[...document.querySelectorAll('.slide')];
const prev=document.getElementById('prevBtn');
const next=document.getElementById('nextBtn');
const current=document.getElementById('currentPage');
const total=document.getElementById('totalPage');
const progress=document.getElementById('progressBar');
const toc=document.getElementById('toc');
const tocBtn=document.getElementById('tocBtn');
const tocClose=document.getElementById('tocClose');
const tocList=document.getElementById('tocList');
const backdrop=document.getElementById('backdrop');

let index=0;
total.textContent=slides.length;

slides.forEach((slide,i)=>{
  const li=document.createElement('li');
  const btn=document.createElement('button');
  btn.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span>${slide.dataset.title}</span>`;
  btn.addEventListener('click',()=>{go(i);closeToc();});
  li.appendChild(btn); tocList.appendChild(li);
});

function go(i){
  index=(i+slides.length)%slides.length;
  slides.forEach((s,n)=>s.classList.toggle('active',n===index));
  [...tocList.querySelectorAll('button')].forEach((b,n)=>b.classList.toggle('active',n===index));
  current.textContent=index+1;
  progress.style.width=`${((index+1)/slides.length)*100}%`;
  location.hash=`page-${index+1}`;
}
function fromHash(){
  const m=location.hash.match(/page-(\d+)/);
  if(m){ const n=Math.min(slides.length,Math.max(1,Number(m[1]))); index=n-1; }
  go(index);
}
function openToc(){toc.classList.add('open');backdrop.classList.add('show');toc.setAttribute('aria-hidden','false')}
function closeToc(){toc.classList.remove('open');backdrop.classList.remove('show');toc.setAttribute('aria-hidden','true')}

prev.addEventListener('click',()=>go(index-1));
next.addEventListener('click',()=>go(index+1));
tocBtn.addEventListener('click',openToc);
tocClose.addEventListener('click',closeToc);
backdrop.addEventListener('click',closeToc);

document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'||e.key==='PageDown') go(index+1);
  if(e.key==='ArrowLeft'||e.key==='PageUp') go(index-1);
  if(e.key==='Escape') closeToc();
});
window.addEventListener('hashchange',fromHash);
fromHash();
