import { InputHandler } from "./inputHandler.js";
import { Player, Enemy } from "./fighter.js";
import { Background, Shop } from "./sprite.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 576;
    const enemyHealth = document.getElementById('enemyHealth');
    const playerHealth = document.getElementById('playerHealth');
    const timer = document.getElementById('timer');
    const message = document.getElementById('message');

    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this, {
                idle: {
                    imageSrc: './assets/samuraiMack/Idle.png',
                    maxFrame: 8,
                },
                run: {
                    imageSrc: './assets/samuraiMack/Run.png',
                    maxFrame: 8,
                },
                jump: {
                    imageSrc: './assets/samuraiMack/Jump.png',
                    maxFrame: 2,
                },
                fall: {
                    imageSrc: './assets/samuraiMack/Fall.png',
                    maxFrame: 2,
                },
                attack: {
                    imageSrc: './assets/samuraiMack/Attack1.png',
                    maxFrame: 6,
                },
                takeHit: {
                    imageSrc: './assets/samuraiMack/Take Hit.png',
                    maxFrame: 4,
                },
                death: {
                    imageSrc: './assets/samuraiMack/Death.png',
                    maxFrame: 6,
                },
            });
            this.enemy = new Enemy(this, {
                idle: {
                    imageSrc: './assets/kenji/Idle.png',
                    maxFrame: 4,
                },
                run: {
                    imageSrc: './assets/kenji/Run.png',
                    maxFrame: 8,
                },
                jump: {
                    imageSrc: './assets/kenji/Jump.png',
                    maxFrame: 2,
                },
                fall: {
                    imageSrc: './assets/kenji/Fall.png',
                    maxFrame: 2,
                },
                attack: {
                    imageSrc: './assets/kenji/Attack1.png',
                    maxFrame: 4,
                },
                takeHit: {
                    imageSrc: './assets/kenji/Take Hit.png',
                    maxFrame: 3,
                },
                death: {
                    imageSrc: './assets/kenji/Death.png',
                    maxFrame: 7,
                },
            });
            this.input = new InputHandler(this);
            this.background = new Background(this);
            this.shop = new Shop(this);
            this.timer = 60000;
            this.gameOver = false;
            this.bottomMargin = 95;
            this.debug = false;
        }

        render(deltaTime) {
            this.gameOverCounter(deltaTime);

            this.background.draw(ctx);
            this.background.update(deltaTime);

            this.shop.draw(ctx);
            this.shop.update(deltaTime);

            this.player.draw(ctx);
            this.player.update(this.input.keys, deltaTime);

            this.enemy.draw(ctx);
            this.enemy.update(this.input.keys, deltaTime);

            this.atacking();
            this.missesAttack();
        }

        atacking() {
            if (this.checkCollision(this.player.attackBox, this.enemy) && this.player.isAttacking && this.player.frame === 4) {
                this.player.isAttacking = false;
                if (!this.gameOver) {
                    this.enemy.health -= 20;
                    enemyHealth.style.width = `${this.enemy.health}%`;

                    if (this.enemy.health <= 0) {
                        this.gameOver = true;
                        this.enemy.setSprite('death');
                        message.style.display = 'flex';
                        message.innerHTML = 'Player 1 Wins';
                    } else {
                        this.enemy.setSprite('takeHit');
                    }
                }
            }
            if (this.checkCollision(this.enemy.attackBox, this.player) && this.enemy.isAttacking && this.enemy.frame === 2) {
                this.enemy.isAttacking = false;
                if (!this.gameOver) {
                    this.player.health -= 10;
                    playerHealth.style.width = `${this.player.health}%`;

                    if (this.player.health <= 0) {
                        this.gameOver = true;
                        this.player.setSprite('death');
                        message.style.display = 'flex';
                        message.innerHTML = 'Player 2 Wins';
                    } else {
                        this.player.setSprite('takeHit');
                    }
                }
            }
        }

        missesAttack() {
            if (this.player.isAttacking && this.player.frame === 4) {
                this.player.isAttacking = false;
            }

            if (this.enemy.isAttacking && this.enemy.frame === 2) {
                this.enemy.isAttacking = false;
            }
        }

        checkCollision(object1, object2) {
            return (object1.x <= object2.x + object2.width &&
                object1.x + object1.width >= object2.x &&
                object1.y <= object2.y + object2.height &&
                object1.y + object1.height >= object2.y)
        }

        gameOverCounter(deltaTime) {
            if (!this.gameOver) {
                if (this.timer <= 0) {
                    this.gameOver = true;
                    message.style.display = 'flex'
                    if (this.player.health === this.enemy.health) {
                        message.innerHTML = 'Tie';
                    }
                    else if (this.player.health > this.enemy.health) {
                        message.innerHTML = 'Player 1 Wins';
                    }
                    else if (this.enemy.health > this.player.health) {
                        message.innerHTML = 'Player 2 Wins';
                    }
                    this.timer = 0;
                } else {
                    timer.innerHTML = (this.timer * 0.001).toFixed(0);
                    this.timer -= deltaTime;
                }
            }
        }
    }

    const game = new Game(canvas);

    let lastTime = 0
    const animate = (timeStapm) => {
        const deltaTime = timeStapm - lastTime;
        lastTime = timeStapm;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    animate(0);
})