const tools=[
{name:"Word & Character Counter",cat:"text",icon:"T",color:"#267cff",desc:"Count words, characters, sentences and paragraphs instantly.",file:"tools/word-counter.html"},
{name:"Aspect Ratio Calculator",cat:"calculator",icon:"[]",color:"#783cff",desc:"Find the right aspect ratio for videos, images and social media.",file:"tools/aspect-ratio.html"},
{name:"YouTube Title Checker",cat:"youtube",icon:"▶",color:"#ff304f",desc:"Check title length and get quick SEO-friendly guidance.",file:"tools/title-checker.html"},
{name:"Hashtag Counter",cat:"social",icon:"#",color:"#16b887",desc:"Count hashtags and clean repeated tags quickly.",file:"tools/hashtag-counter.html"},
{name:"Video Bitrate Calculator",cat:"video",icon:"▣",color:"#ff7b17",desc:"Estimate a practical bitrate for quality and file size.",file:"tools/bitrate.html"},
{name:"Image Resizer",cat:"image",icon:"↗",color:"#12c6c4",desc:"Resize images to any pixel dimension in your browser.",file:"tools/image-resizer.html"},
{name:"Image Compressor",cat:"image",icon:"▤",color:"#f12b91",desc:"Compress images locally without uploading them to a server.",file:"tools/image-compressor.html"},
{name:"More Tools Coming Soon",cat:"other",icon:"⚙",color:"#765cff",desc:"More useful tools for creators are on the way.",file:"#"}
];
const grid=document.getElementById("toolGrid"),empty=document.getElementById("emptyState");
function render(filter="all",query=""){grid.innerHTML="";const list=tools.filter(t=>(filter==="all"||t.cat===filter)&&(!query||t.name.toLowerCase().includes(query.toLowerCase())||t.desc.toLowerCase().includes(query.toLowerCase())));empty.hidden=list.length>0;list.forEach(t=>{grid.insertAdjacentHTML("beforeend",`<article class="tool-card"><div class="tool-icon" style="background:${t.color}">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p><a href="${t.file}">${t.file==="#"?"Coming Soon":"Open Tool →"}</a></article>`)});}
const activeFilter=()=>document.querySelector(".cat.active")?.dataset.filter||"all";
render();
document.querySelectorAll(".cat").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter,document.getElementById("searchInput").value);}));
document.getElementById("searchInput").addEventListener("input",e=>render(activeFilter(),e.target.value));
document.getElementById("searchBtn").addEventListener("click",()=>document.getElementById("tools").scrollIntoView({behavior:"smooth"}));
document.getElementById("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light");const light=document.body.classList.contains("light");document.getElementById("themeBtn").textContent=light?"☀":"☾";localStorage.setItem("creator-theme",light?"light":"dark");});
if(localStorage.getItem("creator-theme")==="light"){document.body.classList.add("light");document.getElementById("themeBtn").textContent="☀";}
document.getElementById("menuBtn")?.addEventListener("click",()=>{const n=document.getElementById("mainNav");const opened=n.dataset.opened==="1";n.dataset.opened=opened?"0":"1";n.style.display=opened?"none":"flex";n.style.position="absolute";n.style.top="70px";n.style.left="0";n.style.right="0";n.style.padding="15px 25px";n.style.background="#080c18";n.style.flexDirection="column";n.style.gap="8px";});

/* ===== Dynamic Liquid Glass Interaction ===== */
(() => {
  const nav = document.querySelector(".navbar");
  const updateNav = () => nav?.classList.toggle("scrolled", window.scrollY > 18);
  window.addEventListener("scroll", updateNav, {passive:true});
  updateNav();

  if (window.matchMedia("(pointer:fine)").matches) {
    const cards = document.querySelectorAll(".hero,.tool-card,.cta,.tool-box,.panel,.control-box,.preview-box");
    cards.forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / Math.max(r.width, 1)) * 100;
        const y = ((e.clientY - r.top) / Math.max(r.height, 1)) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
      });
    });
  }
})();
