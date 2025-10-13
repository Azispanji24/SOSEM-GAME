const centerEmoji = document.getElementById('center-emoji');
const result = document.getElementById('result');
const emotionName = document.getElementById('emotion-name');
const resetBtn = document.getElementById('reset-btn');
const circleContainer = document.querySelector('.circle-container');

const basePath = '../../assets/';

// Daftar emosi
const emotions = [
  { name: 'happy', emoji: '😊', sound: basePath + 'sounds/mixkit-game-level-completed-2059.wav' },
  { name: 'excited', emoji: '😆', sound: basePath + 'sounds/mixkit-game-level-completed-2059.wav' },
  { name: 'sad', emoji: '😢', sound: basePath + 'sounds/negative_beeps-6008.mp3' },
  { name: 'angry', emoji: '😠', sound: basePath + 'sounds/grunting-228447.mp3' },
  { name: 'surprised', emoji: '😮', sound: basePath + 'sounds/mixkit-female-surprised-gasp-968.wav' },
  { name: 'tired', emoji: '😴', sound: basePath + 'sounds/male-snoring-297875_oSbUdiph.mp3' },
];

// Fungsi atur posisi melingkar
function placeEmotions() {
  const screenWidth = window.innerWidth;
  let radius;

  // Atur jarak berdasarkan lebar layar (gunakan multiplier untuk kontrol)
  const distanceMultiplier = screenWidth < 640 ? 0.7 : screenWidth < 768 ? 0.7 : 1; // Control multiplier

  radius = 390 * distanceMultiplier; // Sesuaikan radius berdasarkan multiplier

  emotions.forEach((emotion, index) => {
    const angle = (360 / emotions.length) * index;
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);

    const btn = document.createElement('div');
    btn.className = 'emotion-btn';
    btn.style.top = `calc(38% + ${y}px)`;
    btn.style.left = `calc(41% + ${x}px)`;
    btn.innerHTML = `
      <span>${emotion.emoji}</span>
      <small>${emotion.name}</small>
    `;

    btn.addEventListener('click', () => selectEmotion(emotion));
    circleContainer.appendChild(btn);
  });
}

// Fungsi memilih emosi
function selectEmotion(emotion) {
  centerEmoji.textContent = emotion.emoji;
  emotionName.textContent = emotion.name;
  result.classList.remove('hidden');

  const audio = new Audio(emotion.sound);
  audio.play();
}

// Fungsi reset
resetBtn.addEventListener('click', () => {
  centerEmoji.textContent = '🙂';
  result.classList.add('hidden');
});

// Render awal
placeEmotions();

// Update posisi jika ukuran layar berubah
window.addEventListener('resize', () => {
  circleContainer.querySelectorAll('.emotion-btn').forEach((el) => el.remove());
  placeEmotions();
});
