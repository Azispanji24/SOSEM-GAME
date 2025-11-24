let selectedSource = null;
let matchedCount = 0;
let lines = [];

const sources = document.querySelectorAll('.source');
const targets = document.querySelectorAll('.target');
const resultBox = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

function playBothSounds(sound1, sound2) {
  [sound1, sound2].forEach((sound) => {
    sound.currentTime = 0;
    try {
      sound.play();
    } catch (e) {
      console.warn('Gagal memutar suara:', e);
    }
  });
}

function resetGame() {
  matchedCount = 0;
  selectedSource = null;
  resultBox.textContent = '';

  lines.forEach((line) => line.remove());
  lines = [];
  document.getElementById('popup').classList.add('hidden');

  document.querySelectorAll('.item').forEach((el) => {
    el.classList.remove('matched');
    el.style.borderColor = 'transparent';
    el.style.opacity = '1';
    el.style.pointerEvents = 'auto';
    el.classList.remove('clicked');
  });
}

function addClickedBorder(element) {
  document.querySelectorAll('.item').forEach((el) => {
    el.classList.remove('clicked');
  });
  element.classList.add('clicked');
}

function showPopup() {
  document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}

sources.forEach((source) => {
  source.addEventListener('click', () => {
    if (source.classList.contains('matched')) return;
    selectedSource = source;
    sources.forEach((s) => (s.style.borderColor = 'transparent'));
    source.style.borderColor = '#007bff';
    addClickedBorder(source);
  });
});

targets.forEach((target) => {
  target.addEventListener('click', () => {
    if (!selectedSource || target.classList.contains('matched')) return;

    const sourceEmotion = selectedSource.dataset.emotion;
    const targetEmotion = target.dataset.emotion;

    const dotStart = document.getElementById(`dot-source-${sourceEmotion}`);
    const dotEnd = document.getElementById(`dot-target-${targetEmotion}`);
    if (sourceEmotion === targetEmotion) {
      const line = new LeaderLine(
        LeaderLine.pointAnchor(dotStart, { x: '50%', y: '50%' }),
        LeaderLine.pointAnchor(dotEnd, { x: '50%', y: '50%' }),
        {
          color: 'green',
          size: 4,
          startPlug: 'disc',
          endPlug: 'arrow',
          path: 'straight',
        }
      );
      lines.push(line);

      selectedSource.classList.add('matched');
      target.classList.add('matched');
      selectedSource.style.borderColor = 'green';
      target.style.borderColor = 'green';
      addClickedBorder(target);

      // 🔊 Play 2 success sounds
      playBothSounds(document.getElementById('successSound'), document.getElementById('successSound2'));

      matchedCount++; // INI DIPINDAHKAN KE ATAS

      // Sekarang cek setelah matchedCount ditambahkan
      if (matchedCount === 4) {
        resultBox.textContent = '🎉 Semua cocok! Hebat!';
        playBothSounds(document.getElementById('completeSound1'), document.getElementById('completeSound2'));
      }
    } else {
      // 🔊 Play 2 error sounds
      playBothSounds(document.getElementById('errorSound'), document.getElementById('errorSound2'));
      addClickedBorder(target);
      showPopup();
    }

    selectedSource = null;
    sources.forEach((s) => (s.style.borderColor = 'transparent'));
  });
});

resetBtn.addEventListener('click', resetGame);

let bgSound;

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi sound
  bgSound = new Audio('../../assets/sounds/kids2.mp3');
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

  // ======== AUDIO MASUK KE GAME (ONCE) ========
  enterSound = new Audio('../../assets/sounds/bgcocokan2.mp3');

  enterSound.loop = false;
  enterSound.volume = 1.0;

  // Coba play saat masuk ke game
  enterSound.play().catch(() => {
    // Jika autoplay diblokir → play setelah user klik pertama
    const startEnterSound = () => {
      enterSound.play().catch((err) => console.log('Autoplay enter sound blocked:', err));
      document.removeEventListener('click', startEnterSound);
    };
    document.addEventListener('click', startEnterSound);
  });

  // Render emosi setelah DOM siap
  placeEmotions();
});

// document.addEventListener('DOMContentLoaded', () => {
//   // Inisialisasi audio
//   const enterSound1 = new Audio('../../assets/sounds/bgcocokan.mp3');
//   const enterSound2 = new Audio('../../assets/sounds/enterSound2.mp3');

//   enterSound1.loop = false;
//   enterSound2.loop = false;

//   function playEnterSounds() {
//     enterSound1.currentTime = 0;
//     enterSound1.play().catch(() => {
//       const startEnterSounds = () => {
//         enterSound1.play().catch(() => {});
//         document.removeEventListener('click', startEnterSounds);
//       };
//       document.addEventListener('click', startEnterSounds);
//     });

//     // Audio kedua diputar setelah audio pertama selesai
//     enterSound1.addEventListener('ended', () => {
//       enterSound2.currentTime = 0;
//       enterSound2.play().catch(() => {});
//     });
//   }

//   // Panggil langsung tanpa nested DOMContentLoaded
//   playEnterSounds();

//   // Render emosi setelah DOM siap
//   placeEmotions();
// });
