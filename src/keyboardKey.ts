import { PlayScene } from "./scenes/play";
import { GameOptions } from "./gameOptions";
import Tile from "./tile";
import GuiText from "./guiText";

export default class KeyboardKey extends Phaser.GameObjects.Container {
    boundLetter: string;
    parentScene: PlayScene;
    tile: Tile;
    keyboardLetter: GuiText;

    constructor(scene: PlayScene, x: number, y: number, letter: string) {
        super(scene, x, y);

        scene.add.existing(this);

        this.tile = new Tile(scene, 0, 0, 0);
        this.tile.setScale(GameOptions.keyboardScale);
        this.add(this.tile);

        this.parentScene = scene;

        this.boundLetter = letter;

        scene.add.existing(this);

        this.tile.setInteractive();

        this.tile.on('pointerdown', this.handlePointer, this);

        switch(letter) {
            case '<':
                this.tile.setFrame(0);
                break;
            case '>':
                this.tile.setFrame(1);
                break;
            default:
                this.keyboardLetter = new GuiText(
                    scene,
                    this.tile.getBounds().width / 2 - 3,
                    this.tile.getBounds().height / 2 - 4,
                    letter
                );
                this.keyboardLetter.setScale(4);
                this.keyboardLetter.setTint(0x000000);
                this.add(this.keyboardLetter);
        }
    }

    handlePointer(): void {
        this.parentScene.updateWord(this.boundLetter);
    }
}