import { Sprite } from "./Sprite.js";

class Fighter extends Sprite {
    constructor(game, sprites) {
        super(game);
        this.game = game;
        this.image = new Image();
        this.x = 0;
        this.y = 0;
        this.width = 50;
        this.height = 150;
        this.gravity = .7;
        this.speedY = 0;
        this.speedX = 0;
        this.attackBox = {
            x: this.x,
            y: this.y,
            width: 100,
            height: 50,
        }
        this.isAttacking = false;
        this.health = 100;
        this.scale = 2.5
        this.sprites = sprites;
        for (let key in this.sprites) {
            const image = new Image();
            image.src = this.sprites[key].imageSrc;
            this.sprites[key].image = image;
        }
        this.dead = false;
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.game.debug) {
            ctx.fillStyle = 'rgba(0,0,255,.5)';
            ctx.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width, this.attackBox.height);
            ctx.fillStyle = 'rgba(255,0,0,.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    update(input, deltaTime) {
        if (!this.dead) super.update(deltaTime);

        this.updateAttackBox();

        this.y += this.speedY;
        if (!this.onGround()) this.speedY += this.gravity;
        else {
            this.speedY = 0;
            this.y = 331;
        }

        this.speedX = 0
        if (input.includes(this.keys.right) && !this.dead) {
            this.speedX = 5;
            this.x += this.speedX;
            this.setSprite('run');
        }
        else if (input.includes(this.keys.left) && !this.dead) {
            this.speedX = -5;
            this.x += this.speedX;
            this.setSprite('run');
        } else {
            this.setSprite('idle');
        };
        if (input.includes(this.keys.up) && this.onGround() && !this.dead) this.speedY += -20;
        if (this.speedY < 0) {
            this.setSprite('jump');
        } else if (this.speedY > 0) {
            this.setSprite('fall');
        }
    }

    updateAttackBox() {
        this.attackBox = {
            x: this.x + this.attackBxoOffset.x,
            y: this.y + this.attackBxoOffset.y,
            width: 160,
            height: 50,
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height - this.game.bottomMargin - this.speedY;
    }

    attack() {
        this.setSprite('attack');
        this.isAttacking = true;
    }

    setSprite(sprite) {
        if (this.image === this.sprites.attack.image && this.frame < this.sprites.attack.maxFrame - 1) return;
        if (this.image === this.sprites.takeHit.image && this.frame < this.sprites.takeHit.maxFrame - 1) return;
        if (this.image === this.sprites.death.image) {
            if (this.frame === this.sprites.death.maxFrame - 1) this.dead = true;
            return;
        }
        if (this.image === this.sprites[sprite].image) return;
        this.image = this.sprites[sprite].image;
        this.maxFrame = this.sprites[sprite].maxFrame;
        this.frame = 0;
    }
}

export class Player extends Fighter {
    constructor(game, sprites) {
        super(game, sprites);
        this.x = 200;
        this.y = -100;
        this.image.src = './assets/samuraiMack/Idle.png';
        this.maxFrame = 8;
        this.image.onload = () => {
            this.spriteWidth = this.image.width / this.maxFrame;
            this.spriteHeight = this.image.height;
        };
        this.keys = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            up: 'ArrowUp',
            attack: '5'
        };
        this.color = 'green';
        this.attackBxoOffset = {
            x: 90,
            y: 50
        };
        this.offset = {
            x: 225,
            y: 157
        };
    }
}

export class Enemy extends Fighter {
    constructor(game, sprites) {
        super(game, sprites);
        this.x = 400;
        this.y = -100;
        this.image.src = './assets/kenji/Idle.png';
        this.maxFrame = 4;
        this.image.onload = () => {
            this.spriteWidth = (this.image.width / this.maxFrame);
            this.spriteHeight = this.image.height;
        }
        this.keys = {
            left: 'a',
            right: 'd',
            up: 'w',
            attack: ' '
        }
        this.color = 'red';
        this.attackBxoOffset = {
            x: -180,
            y: 50
        }
        this.offset = {
            x: 225,
            y: 170
        }
    }
}