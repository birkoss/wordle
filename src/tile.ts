export default class Tile extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, frame: number) {
        super(scene, x, y, 'tile', frame);

        this.setOrigin(0);

        scene.add.existing(this);
    }
}