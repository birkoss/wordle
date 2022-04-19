import GuiText from "../guiText";

export default class MenuButton extends Phaser.GameObjects.Container {
    background: Phaser.GameObjects.Sprite;
    text: GuiText;

    callback: Function;

    constructor(scene: Phaser.Scene, text: string = '', callback: Function) {
        super(scene, 0, 0);
        this.callback = callback;

        this.background = scene.add.sprite(0, 0, "menuButtons");
        this.background.setOrigin(0);
        this.background.setScale(5);
        
        this.background.setInteractive();
        this.background.on('pointerdown', this.onPointerDown, this);
        this.add(this.background);

        this.text = new GuiText(scene, 210, 66, text);
        this.text.setScale(5);
        this.add(this.text);

        scene.add.existing(this);
    }

    onPointerDown(): void {
        console.log("DOWN");
        this.callback();
    }
}