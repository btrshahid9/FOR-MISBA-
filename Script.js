// Aaj ki date
document.getElementById("today").textContent =
  new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});

// Naam / message
document.getElementById("name").textContent = "Our Princess MISBA 👑";
document.getElementById("msg").textContent = "Aaj ka din tumhara hai. Smile karo, tum sabse pyari ho!";

// Sparkles
const cv = document.getElementById("sparkles"), ctx = cv.getContext("2d");
let stars = [];
function resize(){cv.width = innerWidth; cv.height = innerHeight;}
resize(); addEventListener("resize", resize);

function burst(x, y, n = 30){
  for(let i=0;i<n;i++){
    stars.push({x, y, vx:(Math.random()-.5)*6, vy:(Math.random()-.5)*6-1,
      life:60+Math.random()*30, size:3+Math.random()*5,
      c:["#fff","#fde68a","#c4b5fd","#fb7185"][Math.floor(Math.random()*4)]});
  }
}
function loop(){
  ctx.clearRect(0,0,cv.width,cv.height);
  stars = stars.filter(s => s.life > 0);
  for(const s of stars){
    s.x += s.vx; s.y += s.vy; s.vy += .05; s.life--;
    ctx.globalAlpha = Math.max(s.life/60, 0);
    ctx.fillStyle = s.c;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 7); ctx.fill();
  }
  requestAnimationFrame(loop);
}
loop();

document.getElementById("magic").addEventListener("click", e => {
  burst(e.clientX, e.clientY, 60);
  for(let i=0;i<5;i++) setTimeout(()=>burst(Math.random()*innerWidth, Math.random()*innerHeight/1.5, 40), i*200);
});
addEventListener("touchstart", e => burst(e.touches[0].clientX, e.touches[0].clientY, 15));

// Wishes (apni wish yahan likho)
const wishes = [
  "Tum jahan jaoge, wahan roshni hogi ✨",
  "Hamesha apni crown seedhi rakhna 👑",
  "Tumhari smile sabse badi magic hai 💖",
  "Aaj sab kuch tumhari marzi se hoga 🌸",
  "Tum jaisi koi nahi 🦋",
  "Har sapna sach hoga, bas believe karo 🌙"
];
let w = 0;
document.getElementById("wishbtn").addEventListener("click", () => {
  document.getElementById("wishbox").textContent = wishes[w++ % wishes.length];
  burst(innerWidth/2, innerHeight/2, 40);
});