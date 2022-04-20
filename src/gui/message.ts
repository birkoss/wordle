import { GameOptions } from "../gameOptions";
import GuiText from "../guiText";
import Button from "./button";

export class Message extends Phaser.GameObjects.Container {
    overlay: Phaser.GameObjects.Image;

    container: Phaser.GameObjects.Container;

    background: Phaser.GameObjects.Image;
    textTitle: GuiText;
    textDescription: GuiText;

    constructor(scene: Phaser.Scene, title: string, message: string, callback: Function) {
        super(scene, 0, 0);

        scene.add.existing(this);

        this.overlay = scene.add.image(0, 0, "blank");
        this.overlay.setDisplaySize(scene.game.config.width as number, scene.game.config.height as number);
        this.overlay.setTint(0x000000);
        this.overlay.setAlpha(0.8);
        this.overlay.setInteractive();
        this.add(this.overlay);

        this.container = scene.add.container();
        this.add(this.container);

        this.background = scene.add.image(0, 0, "message");
        this.background.setScale(GameOptions.messageBackgroundScale);
        this.container.add(this.background);

        this.textTitle = new GuiText(
            scene,
            0,
            this.background.y + GameOptions.messageTitleY,
            title
        );
        this.textTitle.setScale(GameOptions.messageTitleScale);
        this.container.add(this.textTitle);

        this.textDescription = new GuiText(
            scene,
            0,
            GameOptions.messageDescriptionY,
            message
        );
        this.textDescription.setCenterAlign();
        this.textDescription.setScale(GameOptions.messageDescriptionScale);
        this.textDescription.setTint(0x000000);
        this.container.add(this.textDescription);

        let button = new Button(scene, "Rejouer", () => 
            this.animateOut(() => callback())
        );
        button.y = GameOptions.messageButtonY;
        this.container.add(button);
    }

    changeBackground(newFrame: number): void {
        this.background.setFrame(newFrame);
    }

    animateIn(): void {
        this.setAlpha(1);

        let timeline = this.scene.tweens.createTimeline();

        this.overlay.setAlpha(0);
        timeline.add({
            targets: this.overlay,
            alpha: 0.8,
            duration: 250,
            ease: 'Power1'
        });

        this.container.y = -this.scene.game.config.height as number;
        timeline.add({
            targets: this.container,
            y: 0,
            duration: 250,
            ease: 'Power1'
        });

        timeline.play();
    }

    animateOut(callback: Function): void {
        let timeline = this.scene.tweens.createTimeline();

        timeline.add({
            targets: this.container,
            y: -this.scene.game.config.height as number,
            duration: 250,
            ease: 'Power1'
        });

        timeline.add({
            targets: this.overlay,
            alpha: 0,
            duration: 250,
            ease: 'Power1'
        });

        timeline.setCallback("onComplete", () => {
            this.setAlpha(0);
            callback();
        });

        timeline.play();
    }
}