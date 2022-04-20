import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import Button from "./button";

export class Message extends Phaser.GameObjects.Container {
    callback: Function;

    overlay: Phaser.GameObjects.Image;
    background: Phaser.GameObjects.Image;
    textTitle: GuiText;
    textDescription: GuiText;

    constructor(scene: Phaser.Scene, title: string, message: string, callback: Function) {
        super(scene, 0, 0);
        this.callback = callback;

        scene.add.existing(this);

        this.overlay = scene.add.image(0, 0, "blank");
        this.overlay.setDisplaySize(scene.game.config.width as number, scene.game.config.height as number);
        this.overlay.setTint(0x000000);
        this.overlay.setAlpha(0.8);
        this.overlay.setInteractive();
        this.add(this.overlay);

        this.background = scene.add.image(0, 0, "message");
        this.background.setScale(GameOptions.messageBackgroundScale);
        this.add(this.background);

        this.textTitle = new GuiText(
            scene,
            0,
            this.background.y + GameOptions.messageTitleY,
            title
        );
        this.textTitle.setScale(GameOptions.messageTitleScale);
        this.add(this.textTitle);

        this.textDescription = new GuiText(
            scene,
            0,
            GameOptions.messageDescriptionY,
            message
        );
        this.textDescription.setCenterAlign();
        this.textDescription.setScale(GameOptions.messageDescriptionScale);
        this.textDescription.setTint(0x000000);
        this.add(this.textDescription);

        let button = new Button(scene, "Rejouer", function() {
            this.callback();
        }.bind(this));
        button.y = GameOptions.messageButtonY;
        this.add(button);
    }

    changeBackground(newFrame: number): void {
        this.background.setFrame(newFrame);
    }
}