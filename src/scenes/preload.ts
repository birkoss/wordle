export class PreloadScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PreloadScene'
        });
    }
 
    preload(): void {
        this.load.json('words', 'assets/words.json');

        this.load.image('panel', 'assets/panel.png');
        this.load.image('blank', 'assets/blank.png');

        this.load.image('background', 'assets/background.png');
        this.load.spritesheet('message', 'assets/message.png', {
            frameWidth: 91,
            frameHeight: 60,
        });

        this.load.spritesheet('menuButtons', 'assets/menuButtons.png', {
            frameWidth: 50,
            frameHeight: 15,
        });
        this.load.spritesheet('buttons', 'assets/buttons.png', {
            frameWidth: 35,
            frameHeight: 12,
        });
        this.load.spritesheet('smallButtons', 'assets/smallButtons.png', {
            frameWidth: 22,
            frameHeight: 12,
        });
        this.load.spritesheet('tile', 'assets/tiles.png', {
            frameWidth: 11,
            frameHeight: 11,
        });
        this.load.bitmapFont('font:gui', 'assets/fonts/gui.png', 'assets/fonts/gui.xml');
    }
 
    create(): void {
        this.scene.start('MenuScene');
    }
}