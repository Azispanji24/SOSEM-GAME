// const centerEmoji = document.getElementById('center-emoji');
// const result = document.getElementById('result');
// const emotionName = document.getElementById('emotion-name');
// const resetBtn = document.getElementById('reset-btn');
// const circleContainer = document.querySelector('.circle-container');

// const basePath = '../../assets/';

// // Daftar emosi
// const emotions = [
//   { name: 'happy', emoji: '😊', sound: basePath + 'sounds/mixkit-game-level-completed-2059.wav' },
//   { name: 'excited', emoji: '😆', sound: basePath + 'sounds/mixkit-game-level-completed-2059.wav' },
//   { name: 'sad', emoji: '😢', sound: basePath + 'sounds/negative_beeps-6008.mp3' },
//   { name: 'angry', emoji: '😠', sound: basePath + 'sounds/grunting-228447.mp3' },
//   { name: 'surprised', emoji: '😮', sound: basePath + 'sounds/mixkit-female-surprised-gasp-968.wav' },
//   { name: 'tired', emoji: '😴', sound: basePath + 'sounds/male-snoring-297875_oSbUdiph.mp3' },
// ];

// // Fungsi atur posisi melingkar
// function placeEmotions() {
//   const screenWidth = window.innerWidth;
//   let radius;

//   // Atur jarak berdasarkan lebar layar (gunakan multiplier untuk kontrol, dikurangi untuk mencegah overflow)
//   const distanceMultiplier = screenWidth < 480 ? 0.5 : screenWidth < 768 ? 0.45 : screenWidth < 1024 ? 0.5 : 2; // Reduced multipliers

//   radius = Math.min(250, screenWidth * 0.9) * distanceMultiplier; // Base radius capped and proportional

//   emotions.forEach((emotion, index) => {
//     const angle = (360 / emotions.length) * index;
//     const x = radius * Math.cos((angle * Math.PI) / 180);
//     const y = radius * Math.sin((angle * Math.PI) / 180);

//     const btn = document.createElement('div');
//     btn.className = 'emotion-btn';
//     btn.style.top = `calc(40% + ${y}px)`;
//     btn.style.left = `calc(40% + ${x}px)`;
//     btn.innerHTML = `
//       <span>${emotion.emoji}</span>

//     `;
//     {
//       /* <small>${emotion.name}</small> */
//     }
//     btn.addEventListener('click', () => selectEmotion(emotion));
//     circleContainer.appendChild(btn);
//   });
// }

// // Fungsi memilih emosi
// function selectEmotion(emotion) {
//   centerEmoji.textContent = emotion.emoji;
//   emotionName.textContent = emotion.name;
//   result.classList.remove('hidden');

//   const audio = new Audio(emotion.sound);
//   audio.play();
// }

// // Fungsi reset
// resetBtn.addEventListener('click', () => {
//   centerEmoji.textContent = '🙂';
//   result.classList.add('hidden');
// });

// // Render awal
// placeEmotions();

// // Update posisi jika ukuran layar berubah
// window.addEventListener('resize', () => {
//   circleContainer.querySelectorAll('.emotion-btn').forEach((el) => el.remove());
//   placeEmotions();
// });

// Background sound for this page
let bgSound; // disimpan global biar gak kehapus

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi sound
  bgSound = new Audio('../../assets/sounds/mixkit-kidding-around-9.mp3'); // path relatif dari perasaan.html
  bgSound.loop = true; // biar muter terus
  bgSound.volume = 0.5;

  // Coba mainkan saat halaman dimuat
  bgSound
    .play()
    .then(() => console.log('Background music started on perasaan.html'))
    .catch((err) => {
      console.log('Autoplay blocked on load:', err);
      // Jika blocked, mainkan saat user klik pertama
      const startMusic = () => {
        if (bgSound.paused) {
          bgSound
            .play()
            .then(() => console.log('Background music started after click'))
            .catch((err) => console.log('Autoplay blocked:', err));
        }
        document.removeEventListener('click', startMusic);
      };
      document.addEventListener('click', startMusic);
    });
});

// --- OPTIONAL: hentikan musik saat keluar dari halaman
window.addEventListener('beforeunload', () => {
  if (bgSound) {
    bgSound.pause();
    bgSound.currentTime = 0;
  }
});

const centerEmoji = document.getElementById('center-emoji');
const result = document.getElementById('result');
const emotionName = document.getElementById('emotion-name');
const resetBtn = document.getElementById('reset-btn');
const circleContainer = document.querySelector('.circle-container');

const basePath = '../../assets/';
const imagePath = basePath + 'images/';
const soundPath = basePath + 'sounds/';

// Daftar emosi (gunakan file PNG)
const emotions = [
  { name: 'happy', image: imagePath + 'smiling-face.png', sound: soundPath + 'mixkit-game-level-completed-2059.wav' },
  {
    name: 'excited',
    image: imagePath + 'grinning-squinting.png',
    sound: soundPath + 'mixkit-game-level-completed-2059.wav',
  },
  { name: 'sad', image: imagePath + 'crying-face.png', sound: soundPath + 'negative_beeps-6008.mp3' },
  { name: 'angry', image: imagePath + 'angry-face.png', sound: soundPath + 'grunting-228447.mp3' },
  {
    name: 'surprised',
    image: imagePath + 'open-mouth.png',
    sound: soundPath + 'mixkit-female-surprised-gasp-968.wav',
  },
  { name: 'tired', image: imagePath + 'sleeping-face.png', sound: soundPath + 'male-snoring-297875_oSbUdiph.mp3' },
];

// Fungsi atur posisi melingkar
function placeEmotions() {
  const screenWidth = window.innerWidth;
  let radius;

  // Sesuaikan jarak lingkaran agar tetap responsif
  const distanceMultiplier = screenWidth < 480 ? 0.45 : screenWidth < 768 ? 0.65 : screenWidth < 1024 ? 0.8 : 2.2;
  radius = Math.min(250, screenWidth * 0.9) * distanceMultiplier;

  emotions.forEach((emotion, index) => {
    const angle = (360 / emotions.length) * index;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);

    const btn = document.createElement('div');
    btn.className = 'emotion-btn';
    btn.style.top = `calc(40% + ${y}px)`;
    btn.style.left = `calc(40% + ${x}px)`;
    btn.innerHTML = `
      <img src="${emotion.image}" alt="${emotion.name}" class="emotion-img">
    `;

    btn.addEventListener('click', () => selectEmotion(emotion));
    circleContainer.appendChild(btn);
  });
}

// Fungsi memilih emosi
function selectEmotion(emotion) {
  centerEmoji.innerHTML = `<img src="${emotion.image}" alt="${emotion.name}" class="center-img">`;
  emotionName.textContent = emotion.name;
  result.classList.remove('hidden');

  const audio = new Audio(emotion.sound);
  audio.play();
}

// Fungsi reset
resetBtn.addEventListener('click', () => {
  centerEmoji.innerHTML = `<img src="${imagePath}slightly-smiling.png" alt="neutral" class="center-img">`;
  result.classList.add('hidden');
});

// Render awal
placeEmotions();

// Update posisi jika ukuran layar berubah
window.addEventListener('resize', () => {
  circleContainer.querySelectorAll('.emotion-btn').forEach((el) => el.remove());
  placeEmotions();
});
