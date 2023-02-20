export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];

        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'ArrowUp' ||
                e.key === '5' ||
                e.key === 'd' ||
                e.key === 'a' ||
                e.key === 'w' ||
                e.key === ' ') &&
                this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            if (e.key === '5') {
                this.game.player.attack();
            }
            if (e.key === ' ') {
                this.game.enemy.attack();
            }
            if (e.key === 'i') this.game.debug = !this.game.debug;
        });

        window.addEventListener('keyup', (e) => {
            this.keys.splice(this.keys.indexOf(e.key), 1);
        });
    }
}