function startGame(game) {
  // Start background sound when clicking the game link
  if (bgSound && bgSound.paused) {
    bgSound
      .play()
      .then(() => console.log('Background music started'))
      .catch((err) => console.log('Autoplay blocked:', err));
  }
  // Navigate to the game page
  window.location.href = `game/${game}/${game.split('-')[0]}.html`;
}

// script.js

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.game-link');

  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // supaya nggak pindah halaman
      const gameName = this.getAttribute('data-game');
      alert('ini nanti ya bu guruuu, programmer nya mager plus banyak tugas hahaha ');
    });
  });
});
