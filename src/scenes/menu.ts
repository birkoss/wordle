import { GameOptions } from "../gameOptions";
import MenuButton from "../gui/menuButton";
import GuiText from "../guiText";

export class MenuScene extends Phaser.Scene {
 
    container: Phaser.GameObjects.Container;

    constructor() {
        super({
            key: 'MenuScene'
        });
    }
 
    create(): void {

        this.container = new Phaser.GameObjects.Container(
            this,
            this.game.config.width as number / 2,
            this.game.config.height as number / 2
        );
        this.add.existing(this.container);

        let background = this.add.image(0, 0, "message");
        background.setScale(GameOptions.menuSceneBackgroundScale);
        this.container.add(background);
        
        let title = new GuiText(this, 0, GameOptions.menuSceneTitleY, "Wordle");
        title.setScale(GameOptions.menuSceneTitleScale);
        this.container.add(title);

        let buttonPlay = new MenuButton(this, "Jouer", () =>
            this.animateOut(() => this.scene.start('PlayScene'))
        );
        this.container.add(buttonPlay);

        let buttonHelp = new MenuButton(
            this,
            "Aide",
            function() {
                // this.scene.start('PlayScene');
            }.bind(this),
            2
        );
        buttonHelp.y = GameOptions.menuSceneButtonHelpY;
        this.container.add(buttonHelp);

        this.animateIn();
    }

    animateIn(): void {
        let timeline = this.tweens.createTimeline();

        this.container.y = -this.container.getBounds().height;
        timeline.add({
            targets: this.container,
            y: this.game.config.height as number / 2,
            duration: 250,
            ease: 'Power1'
        });

        timeline.play();
    }

    animateOut(callback: Function): void {
        let timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.container,
            y: -this.container.getBounds().height,
            duration: 250,
            ease: 'Power1'
        });

        timeline.setCallback("onComplete", () => callback());

        timeline.play();
    }
}