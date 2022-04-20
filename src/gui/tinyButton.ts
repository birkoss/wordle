import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import CustomButton from "./customButton";

export default class TinyButton extends CustomButton {
    constructor(scene: Phaser.Scene, text: string = '', callback: Function, frame: number = 0) {
        super(scene, text, callback, frame);

        this.background = scene.add.sprite(0, 0, "tile", frame);
        this.background.setScale(GameOptions.tinyButtonBackgroundScale);
        
        this.text = new GuiText(
            scene,
            -1,
            -2,
            text
        );
        this.text.setTint(0xfa3c52);
        this.text.setScale(GameOptions.buttonTextScale);

        console.log(text);

        this.init();
    }
}