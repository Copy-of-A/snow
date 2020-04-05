"use strict";

let canvas = document.getElementById('canvas');
let particles = [];
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

function loop() {
    window.requestAnimationFrame(loop);
    createParticles();
    updateParticles();
    killParticles();
    drawParticles();
}
window.requestAnimationFrame(loop);

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function makeDepth(r) {
    if (r >= 1 && r < 3) return getRandomArbitrary(0.5, 1);
    if (r >= 3 && r < 6) return getRandomArbitrary(1, 2);
    if (r >= 6 && r < 8) return getRandomArbitrary(2, 3);
}

function createParticles() {
    // добавляем частицу, если их меньше 100
    if(particles.length < 300) {
        let rad = getRandomArbitrary(1, 8);
        particles.push({
            x: getRandomArbitrary(0, canvas.width) - 60,
            y: 0,
            radius: rad,
            speed: makeDepth(rad),
            color: "white",
        });
    }
}

function updateParticles() {
    for(let i in particles) {
        let part = particles[i];
        part.y += part.speed;
        part.x += (-1)*getRandomArbitrary(0.01, 0.4) * Math.sin(part.y / getRandomArbitrary(65, 85))
    }
}

function killParticles() {
    for(let i in particles) {
        let part = particles[i];
        if(part.y > canvas.height) {
            part.y = 0;
        }
    }
}

function drawParticles() {
    let c = canvas.getContext('2d');
    c.fillStyle = "black";
    c.fillRect(0,0,canvas.width,canvas.height);
    for(let i in particles) {
        let part = particles[i];
        c.beginPath();
        c.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        c.closePath();
        c.fillStyle = part.color;
        c.fill();
    }
}