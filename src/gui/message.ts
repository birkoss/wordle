import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import Button from "./button";

export class Message extends Phaser.GameObjects.Container {
    callback: Function;

    background: Phaser.GameObjects.Image;
    textTitle: GuiText;
    textDescription: GuiText;

    constructor(scene: Phaser.Scene, title: string, message: string, callback: Function) {
        super(scene, 0, 0);
        this.callback = callback;

        scene.add.existing(this);

        this.background = scene.add.image(0, 0, "message");
        this.background.setOrigin(0);
        this.background.setScale(GameOptions.messageBackgroundScale);
        this.add(this.background);

        this.textTitle = new GuiText(
            scene,
            this.background.getBounds().width / 2 - GameOptions.messageTitleX,
            GameOptions.messageTitleY,
            title
        );
        this.textTitle.setScale(GameOptions.messageTitleScale);
        this.textTitle.setOrigin(0.5);
        this.add(this.textTitle);

        this.textDescription = new GuiText(
            scene,
            this.background.getBounds().width / 2,
            GameOptions.messageDescriptionY,
            message
        );
        this.textDescription.setCenterAlign();
        this.textDescription.setScale(GameOptions.messageDescriptionScale);
        this.textDescription.setTint(0x000000);
        this.textDescription.setOrigin(0.5);
        this.add(this.textDescription);

        let button = new Button(scene, "Rejouer", function() {
            this.callback();
        }.bind(this));
        button.x = (this.background.getBounds().width - button.getBounds().width) / 2;
        button.y = GameOptions.messageButtonY;
        this.add(button);
    }

    changeBackground(newFrame: number): void {
        this.background.setFrame(newFrame);
    }
}