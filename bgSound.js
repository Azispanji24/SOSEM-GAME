// bg-sound.js
let bgSound; // disimpan global biar gak kehapus

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi sound
  bgSound = new Audio('assets/sounds/mixkit-kidding-around-9.mp3'); // ganti dengan file kamu
  bgSound.loop = true; // biar muter terus
  bgSound.volume = 0.5;

  // Fungsi untuk mulai play (dijalankan saat user klik pertama)
  const startMusic = () => {
    if (bgSound.paused) {
      bgSound
        .play()
        .then(() => console.log('Background music started'))
        .catch((err) => console.log('Autoplay blocked:', err));
    }
    document.removeEventListener('click', startMusic);
  };

  // Play saat user pertama kali klik halaman
  document.addEventListener('click', startMusic);
});

// --- OPTIONAL: hentikan musik saat keluar dari halaman
window.addEventListener('beforeunload', () => {
  if (bgSound) {
    bgSound.pause();
    bgSound.currentTime = 0;
  }
});
