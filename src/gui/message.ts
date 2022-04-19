import GuiText from "../guiText";
import Button from "./button";

export class Message extends Phaser.GameObjects.Container {
    callback: Function;

    textTitle: GuiText;
    textDescription: GuiText;

    constructor(scene: Phaser.Scene, title: string, message: string, callback: Function) {
        super(scene, 0, 0);
        this.callback = callback;

        scene.add.existing(this);

        let background = scene.add.image(0, 0, "message");
        background.setOrigin(0);
        background.setScale(11);
        this.add(background);

        this.textTitle = new GuiText(scene, background.getBounds().width / 2 - 10, 112, title);
        this.textTitle.setScale(5);
        this.textTitle.setOrigin(0.5);
        this.add(this.textTitle);

        this.textDescription = new GuiText(scene, background.getBounds().width / 2 - 10, 310, message);
        this.textDescription.setCenterAlign();
        this.textDescription.setScale(4);
        this.textDescription.setTint(0x000000);
        this.textDescription.setOrigin(0.5);
        this.add(this.textDescription);

        let button = new Button(scene, "Rejouer", function() {
            this.callback();
        }.bind(this));
        button.x = 280;
        button.y = 420;
        this.add(button);
    }
}