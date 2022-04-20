import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";

export default class MenuButton extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Sprite;
    text: GuiText;

    callback: Function;
    isPressed: boolean;
    frameOriginal: number;
    textOriginalY: number;

    constructor(scene: Phaser.Scene, text: string = '', callback: Function) {
        super(scene, 0, 0);
        this.callback = callback;
        this.isPressed = false;
        this.frameOriginal = 0;

        this.background = scene.add.sprite(0, 0, "menuButtons");
        this.background.setOrigin(0);
        this.background.setScale(GameOptions.menuButtonBackgroundScale);
        
        this.background.setInteractive();
        this.background.on('pointerdown', this.onPointerDown, this);
        this.background.on('pointerout', this.onPointerOut, this);
        this.background.on('pointerup', this.onPointerUp, this);
        this.add(this.background);

        this.text = new GuiText(
            scene,
            GameOptions.menuButtonTextX,
            this.background.getBounds().height / 2 - 5,
            text
        );
        this.text.setScale(GameOptions.menuButtonTextScale);
        this.textOriginalY = this.text.y;
        this.add(this.text);

        scene.add.existing(this);
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
        this.text.y = this.textOriginalY + GameOptions.menuButtonTextDownMovement;
    }
}