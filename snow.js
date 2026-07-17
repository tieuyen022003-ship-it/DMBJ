const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let width;
let height;

function resize() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resize();

window.addEventListener("resize", resize);

const flakes = [];

const TOTAL = 70;

class Snow {

    constructor() {

        this.reset(true);

    }

    reset(first = false) {

        this.x = Math.random() * width;

        this.y = first
            ? Math.random() * height
            : -20;

        this.r = Math.random() * 2.8 + 1.2;

        this.speedY = Math.random() * 0.7 + 0.35;

        this.speedX = (Math.random() - 0.5) * 0.35;

        this.alpha = Math.random() * 0.45 + 0.35;

        this.angle = Math.random() * Math.PI * 2;

        this.spin = (Math.random() - 0.5) * 0.01;

    }

    update() {

        this.angle += this.spin;

        this.x += this.speedX + Math.sin(this.angle) * 0.2;

        this.y += this.speedY;

        if (
            this.y > height + 20 ||
            this.x < -30 ||
            this.x > width + 30
        ) {

            this.reset();

        }

    }

    draw() {

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,255,255,${this.alpha})`;

        ctx.arc(
            this.x,
            this.y,
            this.r,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}

for (let i = 0; i < TOTAL; i++) {

    flakes.push(new Snow());

}

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    flakes.forEach(flake => {

        flake.update();

        flake.draw();

    });

    requestAnimationFrame(animate);

}

animate();