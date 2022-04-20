import 'phaser';

import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";

export default class CustomButton extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Sprite;
    text: GuiText;
    textOriginalY: number;
    frameOriginal: number;

    isPressed: boolean;
    callback: Function;

    constructor(scene: Phaser.Scene, text: string = '', callback: Function, frame: number = 0) {
        super(scene, 0, 0);

        this.isPressed = false;

        this.callback = callback;
        this.frameOriginal = frame;

        scene.add.existing(this);
    }

    init(): void {
        this.add(this.background);

        this.background.setInteractive();
        this.background.on('pointerdown', this.onPointerDown, this);
        this.background.on('pointerout', this.onPointerOut, this);
        this.background.on('pointerup', this.onPointerUp, this);

        this.textOriginalY = this.text.y;

        this.add(this.text);
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
        this.text.y = this.textOriginalY + GameOptions.customButtonTextDownMovement;
    }
}