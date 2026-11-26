const opening = document.getElementById("opening");
const openBtn = document.getElementById("openBtn");

// TAP TO OPEN
openBtn.addEventListener("click", () => {

    if (!isMusicPlaying) {
        toggleMusic();
    }

    opening.classList.add("hide");

    document.body.style.overflowY = "auto";

    setTimeout(() => {
        opening.style.display = "none";
    }, 1800);

});

// SCROLL REVEAL
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });

}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(section => {
    observer.observe(section);
});


// WEDDING COUNTDOWN
const weddingDate = new Date(
    "December 20, 2026 10:30:00"
).getTime();

function countdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.querySelector(".countdown").innerHTML =
            "THE CELEBRATION HAS BEGUN!";
        return;
    }

    document.getElementById("days").textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").textContent =
        Math.floor((distance / (1000 * 60 * 60)) % 24);

    document.getElementById("minutes").textContent =
        Math.floor((distance / (1000 * 60)) % 60);

    document.getElementById("seconds").textContent =
        Math.floor((distance / 1000) % 60);
}

countdown();
setInterval(countdown, 1000);


// GOLDEN FLOATING PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < 65; i++) {
    particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.7 + 0.2
    });
}

function animateParticles() {

    ctx.clearRect(
        0, 0,
        window.innerWidth,
        window.innerHeight
    );

    particles.forEach(p => {

        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.01) * 0.3;

        if (p.y < -10) {
            p.y = window.innerHeight + 10;
            p.x = Math.random() * window.innerWidth;
        }

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(190, 145, 70, ${p.opacity})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#e8c77d";

        ctx.fill();

    });

    requestAnimationFrame(animateParticles);
}

animateParticles();


// DEMO BACKGROUND SONG — replace this URL with your own calm song
const DEMO_SONG_URL = "rathinamo-female-version-128-ytshorts.savetube.me.mp3";

const musicBtn = document.getElementById("musicBtn");
const musicLabel = musicBtn.querySelector(".music-label");
const backgroundMusic = new Audio(DEMO_SONG_URL);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.35;
let isMusicPlaying = false;

async function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
    } else {
        try {
            await backgroundMusic.play();
            isMusicPlaying = true;
        } catch (error) {
            console.warn("The demo song could not start:", error);
        }
    }

    musicBtn.classList.toggle("playing", isMusicPlaying);
    musicBtn.setAttribute("aria-pressed", String(isMusicPlaying));
    musicLabel.textContent = isMusicPlaying ? "MUSIC ON" : "PLAY MUSIC";
}

musicBtn.addEventListener("click", toggleMusic);