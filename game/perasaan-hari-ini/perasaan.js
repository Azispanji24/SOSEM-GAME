const centerEmoji = document.getElementById('center-emoji');
const cResult = document.querySelector('.cResult');
const result = document.getElementById('result');

const emotionName = document.getElementById('emotion-name');
const resetBtn = document.getElementById('reset-btn');
const circleContainer = document.querySelector('.circle-container');

const basePath = '../../assets/';
const imagePath = basePath + 'images/';
const soundPath = basePath + 'sounds/';
const suaraPath = basePath + 'sounds/';

// Daftar emosi
const emotions = [
  {
    name: 'gembira',
    image: imagePath + 'exited.png',
    sounds: [soundPath + 'mixkit-game-level-completed-2059.wav', suaraPath + 'bahagiaFix.mp3'],
  },
  {
    name: 'murung',
    image: imagePath + 'sad.png',
    sounds: [soundPath + 'negative_beeps-6008.mp3', suaraPath + 'murung.mp3'],
  },
  {
    name: 'sedih',
    image: imagePath + 'sedih.png',
    sounds: [soundPath + 'negative_beeps-6008.mp3', suaraPath + 'sedihFix.mp3'],
  },
  {
    name: 'kaget',
    image: imagePath + 'kaget.png',
    sounds: [soundPath + 'mixkit-female-surprised-gasp-968.wav', suaraPath + 'kaget.mp3'],
  },
];

// Background sound for this page
let bgSound;

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi sound
  bgSound = new Audio('../../assets/sounds/mixkit-kidding-around-9.mp3');
  bgSound.loop = true;
  bgSound.volume = 0.5;

  // Coba mainkan saat halaman dimuat
  bgSound
    .play()
    .then(() => console.log('Background music started on perasaan.html'))
    .catch((err) => {
      console.log('Autoplay blocked on load:', err);
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

  // Render emosi setelah DOM siap
  placeEmotions();
});

// Hentikan musik saat keluar dari halaman
window.addEventListener('beforeunload', () => {
  if (bgSound) {
    bgSound.pause();
    bgSound.currentTime = 0;
  }
});

// Fungsi untuk mendapatkan radius circle container
function getCircleRadius() {
  const circleRect = circleContainer.getBoundingClientRect();
  // Radius = setengah dari lebar/tinggi container minus setengah dari ukuran emotion button
  const emotionBtnSize = Math.min(
    circleRect.width * 0.15, // Maksimal 15% dari lebar container
    circleRect.height * 0.15 // Maksimal 15% dari tinggi container
  );

  const radius = Math.min(circleRect.width, circleRect.height) / 2 - emotionBtnSize / 2;
  return radius;
}

// Fungsi atur posisi melingkar yang mengikuti radius container
function placeEmotions() {
  const radius = getCircleRadius();

  emotions.forEach((emotion, index) => {
    const angle = (360 / emotions.length) * index;
    const radian = (angle * Math.PI) / 180;

    // Hitung posisi x dan y berdasarkan radius
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    // Dapatkan ukuran circle container untuk referensi posisi
    const circleRect = circleContainer.getBoundingClientRect();
    const centerX = circleRect.width / 2;
    const centerY = circleRect.height / 2;

    const btn = document.createElement('div');
    btn.className = 'emotion-btn';

    // Atur posisi berdasarkan pusat circle container
    btn.style.left = `calc(40% + ${x}px)`;
    btn.style.top = `calc(38% + ${y}px)`;

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
  result.classList.remove('hidden', 'animate__fadeOutDown'); // Kalau sebelumnya pernah pakai keluar
  result.classList.add('animate__animated', 'animate__fadeInUp');
  cResult.classList.remove('hidden');

  // Mainkan semua suara untuk emosi ini
  if (emotion.sounds && Array.isArray(emotion.sounds)) {
    emotion.sounds.forEach((sound) => {
      const audio = new Audio(sound);
      audio.play().catch((err) => console.log('Error playing sound:', err));
    });
  }
}

// Fungsi reset
resetBtn.addEventListener('click', () => {
  centerEmoji.innerHTML = '';
  result.classList.remove('animate__fadeInUp');
  result.classList.add('animate__animated', 'animate__fadeOutDown');

  // Tunggu animasi keluar selesai dulu baru sembunyikan
  setTimeout(() => {
    cResult.classList.add('hidden');
    result.classList.add('hidden');
    result.classList.remove('animate__animated', 'animate__fadeOutDown');
    centerEmoji.innerHTML = '';
    emotionName.textContent = '';
  }, 500);
  // durasi sesuai animasi
});

// Update posisi jika ukuran layar berubah
window.addEventListener('resize', () => {
  circleContainer.querySelectorAll('.emotion-btn').forEach((el) => el.remove());
  placeEmotions();
});

// Juga update posisi saat container selesai dimuat/berubah
if (typeof ResizeObserver !== 'undefined') {
  const resizeObserver = new ResizeObserver(() => {
    circleContainer.querySelectorAll('.emotion-btn').forEach((el) => el.remove());
    placeEmotions();
  });

  resizeObserver.observe(circleContainer);
}
