// ================= المواد =================

// ================= المواد =================

// ================= المواد =================

const subjects=[
{key:"geo",name:"الجغرافيا",img:"geography.jpeg",link:"https://drive.google.com/drive/folders/1S9gEZOhbVgd3aSF-e6dLQ34k7CjTVH7-"},
{key:"history",name:"الحضارة الإسلامية",img:"islamic_history.jpeg",link:"https://drive.google.com/drive/folders/1NXEuOvmCrVousydeLfjMbnVvf1Ypp67z"},
{key:"math_basic",name:"الرياضيات الأساسية",img:"math_basic.jpeg",link:"https://drive.google.com/drive/folders/1JzkI9N-4QwFeoZbnuSBbcOCeAAeAmiwH"},
{key:"env",name:"العلوم البيئية",img:"env_science.jpeg",link:"https://drive.google.com/drive/folders/1nkoOHYp-iKJFB7SHxngm_wyEh-oGQPvW"},

{key:"islamic",name:"التربية الإسلامية",img:"islamic.jpeg",link:"https://drive.google.com/drive/folders/1cMFLHtyuZTXyqmrmIhfRHxvCJiXKQGcX",core:true},
{key:"english",name:"اللغة الإنجليزية",img:"english.jpeg",link:"https://drive.google.com/drive/folders/1II1rohqf2cpWU2N5tzkjcH4tM_QdQW2f",core:true},
{key:"arabic",name:"اللغة العربية",img:"arabic.jpeg",link:"https://drive.google.com/drive/folders/1F6cAiX6i-Q4kTe7OnJW1vYHhIZK21GbR",core:true},
{key:"national",name:"هذا وطني",img:"national.jpeg",link:"https://drive.google.com/drive/folders/17NDoqmeQNw2-bDwWyzsGeBc1vnY6_1bT",core:true},

{key:"bio",name:"الأحياء",img:"bio.jpeg",link:"https://drive.google.com/drive/folders/1_3kF9fP7t22_PUNJ0xN3nhCigCOXbNSf"},
{key:"math_adv",name:"الرياضيات المتقدمة",img:"math_adv.jpeg",link:"https://drive.google.com/drive/folders/10Ba049PfHJOZ4byHQuTWZ-CjkMADgu9u"},
{key:"physics",name:"الفيزياء",img:"physics.jpeg",link:"https://drive.google.com/drive/folders/1HbhYLLYGHxAYx3RDdNwvJC3_KzVkE8YA"},
{key:"chem",name:"الكيمياء",img:"chemistry.jpeg",link:"https://drive.google.com/drive/folders/1GxYXI0LszbaMPbYrhl0uwQpRyxQ7wBGB"},

{key:"sport",name:"الرياضة",img:"sport.jpeg",link:"https://drive.google.com/drive/folders/1zqHcEzN1MA4xYFtDnS4it2FaN0a-8Zvi"},
{key:"art",name:"الفنون",img:"art.jpeg",link:"https://drive.google.com/drive/folders/1p2ogXAanfBSYaHXr7waBed6cYmEBweKO"},
{key:"music",name:"المهارات الموسيقية",img:"music.jpeg",link:"https://drive.google.com/drive/folders/1CAq-CCzfsGwF54VWzTPDVShFYDy3S_cI"},
{key:"it",name:"الحاسوب",img:"it.jpeg",link:"https://drive.google.com/drive/folders/1dET2gV5m4jged1GRamU20rmiRtQQLyj1"}
];
// ================= اختيار المواد =================

if(document.getElementById("core")){
subjects.forEach(s=>{
const div=document.createElement("div");
div.className="card";
div.innerHTML=`<img src="${s.img}"><p>${s.name}</p><input type="checkbox" value="${s.key}" ${s.core?"checked disabled":""}>`;
(s.core?core:others).appendChild(div);
});
}

function saveSubjects(){
let chosen=[];
document.querySelectorAll("input:checked").forEach(i=>chosen.push(i.value));
localStorage.setItem("subjects",JSON.stringify(chosen));
location="dashboard.html";
}

// ================= عرض المواد المختارة =================

if(document.getElementById("chosen")){
const name=localStorage.getItem("studentName");
if(document.getElementById("welcome")) welcome.innerText="أهلاً "+name;

const chosen=JSON.parse(localStorage.getItem("subjects")||"[]");
subjects.filter(s=>chosen.includes(s.key)||s.core).forEach(s=>{
const a=document.createElement("a");
a.href=s.link;
a.target="_blank";
a.className="card";
a.innerHTML=`<h3 class="title">${s.name}</h3><img src="${s.img}">`;
chosenDiv=document.getElementById("chosen");
chosenDiv.appendChild(a);
});
}

// ================= النقاط + الوقت =================

if(!localStorage.getItem("points")) localStorage.setItem("points",100);
let seconds=Number(localStorage.getItem("seconds")||0);
let ranking=JSON.parse(localStorage.getItem("ranking")||"[]");

setInterval(()=>{
seconds++;
localStorage.setItem("seconds",seconds);

if(seconds%3600==0){
let p=Number(localStorage.getItem("points"));
p+=10;
localStorage.setItem("points",p);
}

updateStats();
},1000);

function updateStats(){
if(document.getElementById("points")){
points.innerText=localStorage.getItem("points");
}

if(document.getElementById("time")){
let h=Math.floor(seconds/3600);
let m=Math.floor((seconds%3600)/60);
let s=seconds%60;
time.innerText=`${h}h ${m}m ${s}s`;
}

showRanking();
}

function duaaPoints(){
let p=Number(localStorage.getItem("points"));
p+=20;
localStorage.setItem("points",p);
}

// ================= ترتيب الطلاب =================

function saveRank(){
let name=localStorage.getItem("studentName");
let p=localStorage.getItem("points");
ranking.push({name,points:p});
ranking.sort((a,b)=>b.points-a.points);
ranking=ranking.slice(0,5);
localStorage.setItem("ranking",JSON.stringify(ranking));
}

function showRanking(){
let box=document.getElementById("ranking");
if(!box) return;
box.innerHTML="";
ranking.forEach(r=>{
box.innerHTML+=`<div>${r.name} ⭐ ${r.points}</div>`;
});
}

updateStats();
