import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import CustomButton from "./customButton";

export default class Button extends CustomButton {
    constructor(scene: Phaser.Scene, text: string = '', callback: Function, frame: number = 0) {
        super(scene, text, callback, frame);

        this.background = scene.add.sprite(0, 0, "buttons", frame);
        this.background.setScale(GameOptions.customButtonBackgroundScale);
        
        this.text = new GuiText(
            scene,
            0,
            GameOptions.buttonTextY,
            text
        );
        this.text.setScale(GameOptions.buttonTextScale);

        this.init();
    }
}