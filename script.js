const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

const tilesContainer = document.getElementById("tiles");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

let selectedImages = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function loadImages() {
  tilesContainer.innerHTML = "";
  message.innerText = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  selectedImages = [];

  const duplicateIndex = Math.floor(Math.random() * imageClasses.length);
  const images = [...imageClasses, imageClasses[duplicateIndex]];
  shuffle(images);

  images.forEach((cls) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.cls = cls;
    img.addEventListener("click", () => handleImageClick(img));
    tilesContainer.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selectedImages.includes(img) || selectedImages.length >= 2) return;

  img.classList.add("selected");
  selectedImages.push(img);
  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  loadImages();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;
  if (img1.dataset.cls === img2.dataset.cls) {
    message.innerText = "You are a human. Congratulations!";
  } else {
    message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

window.onload = loadImages;
