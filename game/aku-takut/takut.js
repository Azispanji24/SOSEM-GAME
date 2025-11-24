const roomBg = document.getElementById('room-bg');
const child = document.getElementById('child');
const switchBtn = document.getElementById('switch-btn');

// ==== fungsi cek mobile setiap saat ====
function checkMobile() {
  return window.matchMedia('(max-width: 600px)').matches;
}

// ==== Gambar Desktop ====
const DESK_DARK = '../../assets/images/bggelapdes.jpeg';
const DESK_LIGHT = '../../assets/images/bgterangdes.jpeg';

// ==== Gambar Mobile ====
const MOB_DARK = '../../assets/images/bggelaphp.png';
const MOB_LIGHT = '../../assets/images/bgteranghp.png';

// ==== Gambar Anak ====
const CHILD_SCARED = '../../assets/images/anaktakut.png';
const CHILD_BRAVE = '../../assets/images/anakberani.png';

// ==== Gambar Saklar ====
const SWITCH_OFF = '../../assets/images/lampu2.png';
const SWITCH_ON = '../../assets/images/lampu2.png';

// ==== Audio ====
const bgSound = new Audio('../../assets/sounds/kids1.mp3');
bgSound.loop = true;
bgSound.volume = 0.5;

const enterSound = new Audio('../../assets/sounds/kamarglap.mp3');
enterSound.loop = false;
enterSound.volume = 1.0;

const lightOnSound = new Audio('../../assets/sounds/bintang.mp3');
lightOnSound.loop = false;
lightOnSound.volume = 1.0;

let isLightOn = false;

// ==== Fungsi update scene ====
function updateScene() {
  const mobile = checkMobile();

  if (isLightOn) {
    // Ruangan terang
    roomBg.src = mobile ? MOB_LIGHT : DESK_LIGHT;
    child.src = CHILD_BRAVE;
    switchBtn.src = SWITCH_ON;

    // Hentikan animasi getar
    child.classList.remove('shake');
  } else {
    // Ruangan gelap
    roomBg.src = mobile ? MOB_DARK : DESK_DARK;
    child.src = CHILD_SCARED;
    switchBtn.src = SWITCH_OFF;

    // Aktifkan animasi getar
    child.classList.add('shake');
  }
}

// ==== Event klik switch ====
switchBtn.addEventListener('click', () => {
  // Toggle lampu
  isLightOn = !isLightOn;

  // Update scene
  updateScene();

  // Jika lampu baru saja dinyalakan, mainkan audio yeay
  if (isLightOn) {
    lightOnSound.currentTime = 0;
    lightOnSound.play().catch((err) => console.log('Audio yeay blocked:', err));
  }
});

// ==== Update saat resize layar ====
window.addEventListener('resize', updateScene);

// ==== Jalankan awal ====
updateScene();

// ==== Play background music ====
document.addEventListener('DOMContentLoaded', () => {
  bgSound.play().catch((err) => {
    console.log('Autoplay bgSound blocked:', err);
    const startBg = () => {
      if (bgSound.paused) bgSound.play().catch((e) => console.log(e));
      document.removeEventListener('click', startBg);
    };
    document.addEventListener('click', startBg);
  });

  // Mainkan suara masuk game sekali
  enterSound.play().catch((err) => {
    console.log('Autoplay enterSound blocked:', err);
    const startEnter = () => {
      enterSound.play().catch((e) => console.log(e));
      document.removeEventListener('click', startEnter);
    };
    document.addEventListener('click', startEnter);
  });

  // Fungsi untuk render emosi jika ada
  if (typeof placeEmotions === 'function') placeEmotions();
});
