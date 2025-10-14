function startGame(game) {
  window.location.href = `game/${perasaan - hari - ini}/${perasaan.split('-')[0]}.html`;
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
