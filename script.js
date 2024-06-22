document.addEventListener("DOMContentLoaded", function() {
    const butterflyCanvas = document.getElementById('butterflyCanvas');
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const btx = butterflyCanvas.getContext('2d');
    const ftx = fireworksCanvas.getContext('2d');
    butterflyCanvas.width = fireworksCanvas.width = window.innerWidth;
    butterflyCanvas.height = fireworksCanvas.height = window.innerHeight;

    const butterflies = [];
    const fireworks = [];

    class Butterfly {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.angle += Math.random() * 0.1 - 0.05;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            if (this.x < 0 || this.x > butterflyCanvas.width || this.y < 0 || this.y > butterflyCanvas.height) {
                this.x = Math.random() * butterflyCanvas.width;
                this.y = Math.random() * butterflyCanvas.height;
            }
        }

        draw() {
            btx.beginPath();
            btx.moveTo(this.x, this.y);
            btx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size / 2, this.y + this.size / 2, this.x, this.y);
            btx.bezierCurveTo(this.x + this.size / 2, this.y - this.size / 2, this.x + this.size / 2, this.y + this.size / 2, this.x, this.y);
            btx.fillStyle = 'rgba(0, 0, 255, 0.6)';
            btx.fill();
            btx.closePath();
        }
    }

    class Firework {
        constructor(x, y, size, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.sparks = [];
            for (let i = 0; i < 100; i++) {
                this.sparks.push({
                    x: this.x,
                    y: this.y,
                    angle: Math.random() * 2 * Math.PI,
                    speed: Math.random() * 5 + 1,
                    radius: Math.random() * 3 + 1,
                    alpha: 1
                });
            }
        }

        update() {
            this.sparks.forEach(spark => {
                spark.x += Math.cos(spark.angle) * spark.speed;
                spark.y += Math.sin(spark.angle) * spark.speed;
                spark.alpha -= 0.02;
                if (spark.alpha <= 0) {
                    spark.alpha = 0;
                }
            });
        }

        draw() {
            ftx.save();
            this.sparks.forEach(spark => {
                ftx.globalAlpha = spark.alpha;
                ftx.beginPath();
                ftx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2, false);
                ftx.fillStyle = this.color;
                ftx.fill();
                ftx.closePath();
            });
            ftx.restore();
        }
    }

 

    function animate() {
        btx.clearRect(0, 0, butterflyCanvas.width, butterflyCanvas.height);
        ftx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

        butterflies.forEach(butterfly => {
            butterfly.update();
            butterfly.draw();
        });

        if (Math.random() < 0.05) {
            const x = Math.random() * fireworksCanvas.width;
            const y = Math.random() * fireworksCanvas.height;
            const size = Math.random() * 2 + 2;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            fireworks.push(new Firework(x, y, size, color));
        }

        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.sparks.every(spark => spark.alpha <= 0)) {
                fireworks.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function() {
        butterflyCanvas.width = fireworksCanvas.width = window.innerWidth;
        butterflyCanvas.height = fireworksCanvas.height = window.innerHeight;
    });

    init();
});






