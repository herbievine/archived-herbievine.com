<template>
    <div id="canvas" :class="getAnimationStatus ? '' : 'hide'"></div>
</template>

<script>
import P5 from 'p5';
import { mapGetters } from 'vuex';

export default {
    name: 'Canvas',
    computed: mapGetters(['getAnimationStatus']),
    mounted() {
        if (!this.$parent.isSafari) this.p5();
    },
    methods: {
        p5() {
            const sketch = p5 => {
                let x = 0;
                let y = 0;
                let easing = 0.18;
                let scale = 0;
                let width = window.innerWidth;

                let isHovered = false;

                const particles = [];
                const limit = Math.ceil(window.innerWidth / 60);

                p5.setup = () => {
                    p5.createCanvas(window.innerWidth, window.innerHeight);
                    p5.frameRate(144);

                    for (let i = 0; i < limit; i++) {
                        particles.push(new Particle());
                    }

                    // Change Stroke on Hover
                    const nav = document.querySelector('#hover');
                    if (nav) {
                        nav.addEventListener('mouseenter', () => {
                            isHovered = true;
                        });
                        nav.addEventListener('mouseout', () => {
                            isHovered = false;
                        });
                    }

                    // Change Stroke on Logo Hover
                    const logo = this.$refs.logo;
                    if (logo) {
                        logo.addEventListener('mouseenter', () => {
                            isHovered = true;
                        });
                        logo.addEventListener('mouseout', () => {
                            isHovered = false;
                        });
                    }
                };

                p5.draw = () => {
                    p5.clear();

                    p5.background('#080811');

                    // My Methods
                    if (width > 1200 && p5.mouseX + p5.mouseY !== 0)
                        p5.followAnimation();

                    // Classes
                    particles.forEach((particle, index) => {
                        particle.draw();
                        particle.update();
                        particle.connect(particles.slice(index));
                    });
                };

                p5.windowResized = () => {
                    width = window.innerWidth;
                    p5.resizeCanvas(window.innerWidth, window.innerHeight);
                };

                p5.followAnimation = () => {
                    // Ring Offset X
                    let targetX = p5.mouseX;
                    let dx = targetX - x;
                    x += dx * easing;

                    // Ring Offset Y
                    let targetY = p5.mouseY;
                    let dy = targetY - y;
                    y += dy * easing;

                    // Animate Clicking Scale
                    let targetScale = p5.mouseIsPressed ? 40 : 60;
                    scale += (targetScale - scale) * easing;

                    // Change Fill when Clicked
                    if (p5.mouseIsPressed) {
                        p5.fill('#0e2928');
                    } else {
                        p5.noFill();
                    }

                    // Draw Ring
                    p5.strokeWeight(p5.mouseIsPressed ? 2 : 3);
                    p5.stroke(
                        isHovered ? '#254e61' : 'rgba(204, 204, 204, 40)'
                    );
                    p5.ellipse(x, y, scale, scale);

                    // Draw Cursor
                    p5.noStroke();
                    p5.fill(isHovered ? '#254e61' : '#cccccc');
                    p5.ellipse(p5.mouseX, p5.mouseY, 10, 10);
                };

                class Particle {
                    constructor() {
                        this.pos = p5.createVector(
                            p5.random(window.innerWidth),
                            p5.random(window.innerHeight)
                        );
                        this.velocity = p5.createVector(
                            p5.random(-1, 1),
                            p5.random(-1, 1)
                        );
                        this.size = 8;
                    }

                    update() {
                        this.pos.add(this.velocity);
                        this.bounce();
                    }

                    draw() {
                        p5.strokeWeight(1);
                        p5.noStroke();
                        p5.fill('#333333');
                        p5.ellipse(
                            this.pos.x,
                            this.pos.y,
                            this.size,
                            this.size
                        );
                    }

                    connect(particles) {
                        particles.forEach(particle => {
                            const distance = p5.dist(
                                this.pos.x,
                                this.pos.y,
                                particle.pos.x,
                                particle.pos.y
                            );

                            if (distance < 300) {
                                p5.stroke('#333333');
                                p5.line(
                                    this.pos.x,
                                    this.pos.y,
                                    particle.pos.x,
                                    particle.pos.y
                                );
                            }
                        });
                    }

                    bounce() {
                        if (this.pos.x < 0 || this.pos.x > window.innerWidth)
                            this.velocity.x *= -1;
                        else if (
                            this.pos.y < 0 ||
                            this.pos.y > window.innerHeight
                        )
                            this.velocity.y *= -1;
                    }
                }
            };

            // eslint-disable-next-line no-unused-vars
            let myp5 = new P5(sketch, 'canvas');
        },
    },
};
</script>

<style scoped>
.hide {
    display: none;
}
</style>
