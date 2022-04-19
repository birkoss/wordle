import GuiText from "../guiText";

export default class Button extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Sprite;
    text: GuiText;
    textOriginalY: number;
    frameOriginal: number;

    callback: Function;

    constructor(scene: Phaser.Scene, text: string = '', callback: Function, frame: number = 0) {
        super(scene, 0, 0);
        this.callback = callback;
        this.frameOriginal = frame;

        this.background = scene.add.sprite(0, 0, "buttons", frame);
        this.background.setOrigin(0);
        this.background.setScale(5);
        
        this.background.setInteractive();
        this.background.on('pointerdown', this.onPointerDown, this);
        this.background.on('pointerout', this.onPointerUp, this);
        
        scene.input.on('pointeroutoutside', this.onPointerUp, this);

        this.add(this.background);

        this.text = new GuiText(scene, this.background.getBounds().width / 2 - 2, this.background.getBounds().height / 2 - 7, text);
        this.text.setOrigin(0.5);
        this.text.setScale(4);
        this.add(this.text);

        this.textOriginalY = this.text.y;

        scene.add.existing(this);
    }

    onPointerUp(ev: PointerEvent): void {
        this.background.setFrame(this.frameOriginal);
        this.text.y = this.textOriginalY;
        
        this.callback();
    }

    onPointerDown(): void {
        this.background.setFrame(this.frameOriginal + 1);
        this.text.y = this.textOriginalY + 8;
    }
}