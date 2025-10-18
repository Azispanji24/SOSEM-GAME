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
