import { GameOptions } from './gameOptions';
import GuiText from './guiText';
import Tile from './tile';

export default class BigLetterBox extends Phaser.GameObjects.Container {
    tile: Tile;
    letterToShow: GuiText;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        scene.add.existing(this);
        
        this.tile = new Tile(scene, 0, 0, 0);
        this.tile.setScale(GameOptions.tileScale);
        this.add(this.tile);

        let bounds: Phaser.Geom.Rectangle = this.tile.getBounds();

        this.letterToShow = new GuiText(
            scene,
            bounds.width / 2 - GameOptions.tileLetterScale - 1,
            bounds.height / 2 - GameOptions.tileLetterScale - 1
        );
        this.letterToShow.setScale(GameOptions.tileLetterScale);
        this.add(this.letterToShow);
    }

    setResult(result: number): void {
        this.tile.setFrame(result);
        this.letterToShow.setTint(0xffffff);
    }

    setLetter(letter: string): void {
        this.letterToShow.setTint(0);

        this.letterToShow.setText(letter.toUpperCase());
    }
}