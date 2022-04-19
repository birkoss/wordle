export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreloadScene'
        });
    }
 
    preload(): void {
        this.load.json('words', 'assets/words.json');

        this.load.image('background', 'assets/background.png');
        this.load.image('message', 'assets/message.png');

        this.load.spritesheet('menuButtons', 'assets/menuButtons.png', {
            frameWidth: 100,
            frameHeight: 30,
        });
        this.load.spritesheet('buttons', 'assets/buttons.png', {
            frameWidth: 70,
            frameHeight: 24,
        });
        this.load.spritesheet('tile', 'assets/tiles.png', {
            frameWidth: 22,
            frameHeight: 22,
        });
        this.load.bitmapFont('font:gui', 'assets/fonts/gui.png', 'assets/fonts/gui.xml');
    }
 
    create(): void {
        this.scene.start('PlayScene');
    }
}