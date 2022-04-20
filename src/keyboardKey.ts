import { PlayScene } from "./scenes/play";
import { GameOptions } from "./gameOptions";
import Tile from "./tile";
import GuiText from "./guiText";

export default class KeyboardKey extends Phaser.GameObjects.Container {
    boundLetter: string;
    parentScene: PlayScene;
    tile: Tile;
    keyboardLetter: GuiText;

    isPressed: boolean;
    currentFrame: number;
    textOriginalY: number;

    constructor(scene: PlayScene, x: number, y: number, letter: string) {
        super(scene, x, y);
        this.isPressed = false;
        this.currentFrame = 0;

        scene.add.existing(this);

        this.tile = new Tile(scene, 0, 0, 0);
        this.tile.setScale(GameOptions.keyboardScale);
        this.add(this.tile);

        this.parentScene = scene;

        this.boundLetter = letter;

        scene.add.existing(this);

        this.tile.setInteractive();

        this.tile.on('pointerdown', this.onPointerDown, this);
        this.tile.on('pointerup', this.onPointerUp, this);
        this.tile.on('pointerout', this.onPointerOut, this);

        this.keyboardLetter = new GuiText(
            scene,
            this.tile.getBounds().width / 2 - GameOptions.keyboardLetterScale + 1,
            this.tile.getBounds().height / 2 - GameOptions.keyboardLetterScale - 1,
            letter
        );
        this.keyboardLetter.setScale(GameOptions.keyboardLetterScale);
        this.keyboardLetter.setTint(0x000000);
        this.textOriginalY = this.keyboardLetter.y;
        this.add(this.keyboardLetter);
        
    }

    changeFrame(newFrame: number): void {
        this.currentFrame = newFrame;
        this.tile.setFrame(this.currentFrame);
    }

    onPointerUp(): void {
        if (this.isPressed) {
            this.onPointerOut();
            this.parentScene.updateWord(this.boundLetter);
        }
    }
    onPointerOut(): void {
        this.isPressed = false;
        this.tile.setFrame(this.currentFrame);
        this.keyboardLetter.y = this.textOriginalY;
    }

    onPointerDown(): void {
        if (this.isPressed) {
            return;
        }

        this.isPressed = true;
        this.tile.setFrame(this.currentFrame + 1);
        this.keyboardLetter.y = this.textOriginalY + GameOptions.keyboardTextDownMovement;
    }
}