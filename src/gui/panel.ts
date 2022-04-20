import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import TinyButton from "./tinyButton";

export class Panel extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, callback: Function) {
        super(scene, 0, 0);

        scene.add.existing(this);

        let background = scene.add.sprite(0, 0, "panel");
        background.setScale(GameOptions.panelBackgroundScale);
        this.add(background);

        let button = new TinyButton(scene, "X", function() {
            callback();
        }.bind(this), 0);
        button.y = GameOptions.panelButtonY;
        button.x = ((background.getBounds().width - button.getBounds().width) / 2) - GameOptions.panelButtonX;
        this.add(button);
    }

}