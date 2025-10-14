// // bg-sound.js for index.html - play snoring sound
// let bgSound; // disimpan global biar gak kehapus

// document.addEventListener('DOMContentLoaded', () => {
//   bgSound = document.getElementById('bgMusic'); // Use the audio element from HTML
//   bgSound.volume = 0.5;

//   // Fungsi untuk mulai play (dijalankan saat user klik pertama)
//   const startMusic = () => {
//     if (bgSound.paused) {
//       bgSound
//         .play()
//         .then(() => console.log('Snoring background music started'))
//         .catch((err) => console.log('Autoplay blocked:', err));
//     }
//     document.removeEventListener('click', startMusic);
//   };

//   // Coba play saat load, jika blocked tunggu klik
//   bgSound
//     .play()
//     .then(() => console.log('Snoring started on load'))
//     .catch(() => {
//       console.log('Autoplay blocked, waiting for click');
//       document.addEventListener('click', startMusic);
//     });
// });

// // --- OPTIONAL: hentikan musik saat keluar dari halaman
// window.addEventListener('beforeunload', () => {
//   if (bgSound) {
//     bgSound.pause();
//     bgSound.currentTime = 0;
//   }
// });

let bgSound;

document.addEventListener('DOMContentLoaded', () => {
  bgSound = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('toggleSoundBtn');
  bgSound.volume = 0.5;

  // Fungsi untuk memperbarui ikon tombol
  const updateButtonIcon = () => {
    if (bgSound.paused) {
      toggleBtn.textContent = '🔈'; // icon suara mati
    } else {
      toggleBtn.textContent = '🔊'; // icon suara nyala
    }
  };

  // Coba play otomatis saat load (akan gagal jika belum ada interaksi user)
  bgSound
    .play()
    .then(() => {
      console.log('Musik diputar otomatis');
      updateButtonIcon();
    })
    .catch(() => {
      console.log('Autoplay diblokir, tunggu interaksi pengguna');
      updateButtonIcon();
    });

  // Event listener tombol
  toggleBtn.addEventListener('click', () => {
    if (bgSound.paused) {
      bgSound
        .play()
        .then(() => {
          console.log('Musik dinyalakan lewat tombol');
          updateButtonIcon();
        })
        .catch((err) => {
          console.log('Gagal memutar musik:', err);
        });
    } else {
      bgSound.pause();
      console.log('Musik dimatikan lewat tombol');
      updateButtonIcon();
    }
  });
});

// Stop musik saat keluar dari halaman
window.addEventListener('beforeunload', () => {
  if (bgSound) {
    bgSound.pause();
    bgSound.currentTime = 0;
  }
});
