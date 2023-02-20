export class Sprite {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.frame = 0;
        this.maxFrame = 0;
        this.spriteWidth = 0;
        this.spriteHeight = 0;
        this.spriteX = this.frame * this.spriteWidth;
        this.spriteY = 0;
        this.frameTimer = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.offset = {
            x: 0,
            y: 0
        }
        this.scale = 1;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x - this.offset.x, this.y - this.offset.y, this.spriteWidth * this.scale, this.spriteHeight * this.scale)
    }

    update(deltaTime) {
        this.spriteX = this.frame * this.spriteWidth;
        if (this.frameTimer > this.frameInterval) {
            if (this.frame >= this.maxFrame - 1) this.frame = 0;
            else this.frame++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}

export class Background extends Sprite {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = './assets/background.png';
        this.width = this.game.width;
        this.height = this.game.height;
        this.spriteWidth = this.width;
        this.spriteHeight = this.height;
    }
}

export class Shop extends Sprite {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = './assets/shop.png';
        this.maxFrame = 6;
        this.scale = 2.75;
        this.image.onload = () => {
            this.spriteWidth = (this.image.width / this.maxFrame);
            this.spriteHeight = this.image.height;
        }
        this.x = 600;
        this.y = 128
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
    }
}
