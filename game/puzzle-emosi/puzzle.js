const container = document.getElementById('puzzle-container');
const statusText = document.getElementById('status');
const totalPieces = 6;

let positions = []; // posisi acak
let correctPositions = Array.from({ length: totalPieces }, (_, i) => i);
const resetButton = document.getElementById('reset-button');

function init() {
  positions = shuffle([...correctPositions]);
  renderPuzzle();
}

function renderPuzzle() {
  container.innerHTML = '';
  positions.forEach((pos, index) => {
    const piece = document.createElement('div');
    piece.classList.add('piece');

    // Hitung posisi background berdasarkan indeks potongan
    const cols = 3;
    const rows = 2;

    const x = (pos % cols) * (100 / (cols - 1)); // 0%, 50%, 100%
    const y = Math.floor(pos / cols) * (100 / (rows - 1)); // 0%, 100%

    piece.style.backgroundPosition = `${x}% ${y}%`;

    piece.draggable = true;
    piece.dataset.index = index;

    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragover', dragOver);
    piece.addEventListener('drop', dropPiece);

    container.appendChild(piece);
  });
}

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

let draggedIndex = null;

function dragStart(e) {
  draggedIndex = +this.dataset.index;
  this.classList.add('dragging');
}

function dragOver(e) {
  e.preventDefault();
}

function dropPiece(e) {
  const targetIndex = +this.dataset.index;
  [positions[draggedIndex], positions[targetIndex]] = [positions[targetIndex], positions[draggedIndex]];
  renderPuzzle();
  checkWin();
}

function checkWin() {
  const isWin = positions.every((pos, idx) => pos === idx);
  if (isWin) {
    statusText.textContent = '🎉 Puzzle Selesai!';
  } else {
    statusText.textContent = '';
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkWin() {
  const isWin = positions.every((pos, idx) => pos === idx);
  if (isWin) {
    statusText.textContent = '🎉 Puzzle Selesai!';
    resetButton.style.display = 'inline-block';

    // Tambahkan ulang animasi (reset)
    resetButton.classList.remove('pop');
    void resetButton.offsetWidth; // reflow hack
    resetButton.classList.add('pop');
  } else {
    statusText.textContent = '';
    resetButton.style.display = 'none';
  }
}

resetButton.addEventListener('click', () => {
  init(); // panggil fungsi inisialisasi ulang
  resetButton.style.display = 'none'; // sembunyikan tombol setelah ditekan
});

init();
