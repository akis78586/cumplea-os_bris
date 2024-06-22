document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById('myAudio');
    const playButton = document.getElementById('playButton');

    // Event listener para reproducir la canción al hacer clic en el botón
    playButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(error => {
                console.error('Error al reproducir audio:', error);
            });
        } else {
            audio.pause();
        }
    });

    createFireworks();
    createConfetti();
});

function createFireworks() {
    const fireworksContainer = document.getElementById('fireworks-container');
    for (let i = 0; i < 5; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 50}%`;
        firework.style.animationDelay = `${Math.random() * 3}s`;
        fireworksContainer.appendChild(firework);
    }
}

function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }
}

function getRandomColor() {
    const colors = ['#ff0', '#ff0', '#0ff', '#f0f', '#f00', '#0f0', '#00f'];
    return colors[Math.floor(Math.random() * colors.length)];
}



