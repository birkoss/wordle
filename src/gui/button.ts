import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";

export default class Button extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Sprite;
    text: GuiText;
    textOriginalY: number;
    frameOriginal: number;

    isPressed: boolean;
    callback: Function;

    constructor(scene: Phaser.Scene, text: string = '', callback: Function, frame: number = 0) {
        super(scene, 0, 0);
        this.callback = callback;
        this.frameOriginal = frame;
        this.isPressed = false;

        this.background = scene.add.sprite(0, 0, "buttons", frame);
        this.background.setOrigin(0);
        this.background.setScale(GameOptions.buttonBackgroundScale);
        
        this.background.setInteractive();
        this.background.on('pointerdown', this.onPointerDown, this);
        this.background.on('pointerout', this.onPointerOut, this);
        this.background.on('pointerup', this.onPointerUp, this);

        this.add(this.background);

        this.text = new GuiText(scene, this.background.getBounds().width / 2 - 2, this.background.getBounds().height / 2 - GameOptions.buttonTextScale - 2, text);
        this.text.setOrigin(0.5);
        this.text.setScale(GameOptions.buttonTextScale);
        this.add(this.text);

        this.textOriginalY = this.text.y;

        scene.add.existing(this);
    }

    disable(): void {
        this.background.disableInteractive();
        this.setAlpha(0.6);
    }

    enable(): void {
        this.background.setInteractive();
        this.setAlpha(1);
    }

    onPointerUp(): void {
        if (this.isPressed) {     
            this.onPointerOut();   
            this.callback();
        }
    }

    onPointerOut(): void {
        this.isPressed = false;
        this.background.setFrame(this.frameOriginal);
        this.text.y = this.textOriginalY;
    }

    onPointerDown(): void {
        if (this.isPressed) {
            return;
        }

        this.isPressed = true;
        this.background.setFrame(this.frameOriginal + 1);
        this.text.y = this.textOriginalY + 8;
    }
}