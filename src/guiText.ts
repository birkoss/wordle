export default class GuiText extends Phaser.GameObjects.BitmapText {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string = '') {
        super(scene, x, y, 'font:gui', text);

        this.setOrigin(0.5);

       scene.add.existing(this);
    }
}