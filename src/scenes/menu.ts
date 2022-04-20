import { GameOptions } from "../gameOptions";
import MenuButton from "../gui/menuButton";
import GuiText from "../guiText";

export class MenuScene extends Phaser.Scene {
 
    constructor() {
        super({
            key: 'MenuScene'
        });
    }
 
    create(): void {
        let background = this.add.image(0, 0, "message");
        background.setOrigin(0);
        background.setScale(GameOptions.menuBackgroundScale);
        
        let logo = new GuiText(this, 0, 0, "Wordle");
        logo.x = 500;
        logo.y = 110;
        logo.setScale(GameOptions.menuTitleScale);

        let button = new MenuButton(this, "Jouer", function() {
            this.scene.start('PlayScene');
        }.bind(this));
        button.x = 240;
        button.y = 300;
    }
}