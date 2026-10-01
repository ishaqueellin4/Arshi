// নতুন ছবি/পাতা যোগ করতে নিচের albumPages তালিকায় আরেকটি লাইন যোগ করো।
const albumPages = [
  { image: "images/photo1.jpg", text: "কিছু মুহূর্ত থাকে, যেগুলো ছবির ফ্রেমে বন্দি হলেও মনে থেকে যায় অনেক দিন।" },
  { image: "images/photo2.jpg", text: "একটু হাসি, একটু মায়া—সাধারণ মুহূর্তও হয়ে ওঠে ভীষণ সুন্দর।" },
  { image: "images/photo3.jpg", text: "সময় বদলায়, দিন পেরিয়ে যায়; তবু কিছু স্মৃতি আপন আলোয় থেকে যায়।" },
  { image: "images/photo4.jpg", text: "এই অ্যালবামের প্রতিটি পাতায় থাকুক সুন্দর স্মৃতি আর মিষ্টি কিছু গল্প।" }
];

const pagesEl = document.getElementById("pages");
const cover = document.getElementById("cover");
const book = document.getElementById("book");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pageCount = document.getElementById("pageCount");
const hint = document.getElementById("hint");
const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let opened = false;
let current = 0;
const pageNodes = [];

albumPages.forEach((item, index) => {
  const page = document.createElement("div");
  page.className = "page";
  page.style.zIndex = String(albumPages.length - index);
  page.innerHTML = `
    <div class="page-face page-front">
      <div class="page-content">
        <img class="page-photo" src="${item.image}" alt="অ্যালবামের ছবি ${index + 1}">
        <p class="caption">${item.text}</p>
      </div>
      <span class="page-number">${index + 1}</span>
    </div>
    <div class="page-face page-back">
      <div class="page-content"><p class="caption">✿ স্মৃতির পাতায় ✿</p></div>
      <span class="page-number">${index + 1}</span>
    </div>`;
  page.addEventListener("click", () => {
    if (!opened) return;
    if (index === current && current < albumPages.length) turnNext();
    else if (index === current - 1 && current > 0) turnPrev();
  });
  pagesEl.appendChild(page);
  pageNodes.push(page);
});

function updateControls() {
  prev.disabled = !opened || current === 0;
  next.disabled = !opened || current >= albumPages.length;
  pageCount.textContent = opened
    ? (current === 0 ? "প্রথম পাতা" : `${Math.min(current * 2, albumPages.length)} / ${albumPages.length}`)
    : "কভার";
}
function openBook() {
  if (opened) return;
  opened = true;
  cover.classList.add("open");
  hint.textContent = "পাতায় ক্লিক করো অথবা নিচের বোতাম ব্যবহার করো ✿";
  updateControls();
  music.play().then(() => musicButton.textContent = "♫ গান বন্ধ করো").catch(() => {});
}
function turnNext() {
  if (!opened || current >= pageNodes.length) return;
  pageNodes[current].classList.add("flipped");
  current++;
  updateControls();
}
function turnPrev() {
  if (!opened || current <= 0) return;
  current--;
  pageNodes[current].classList.remove("flipped");
  updateControls();
}
cover.addEventListener("click", openBook);
next.addEventListener("click", turnNext);
prev.addEventListener("click", turnPrev);
musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicButton.textContent = "♫ গান বন্ধ করো"; }
    catch { musicButton.textContent = "♫ গান চালু করতে আবার চাপো"; }
  } else {
    music.pause();
    musicButton.textContent = "♫ গান চালু করো";
  }
});
updateControls();
