import { GameGrid } from "../gameGrid";
import { Message } from "../gui/message";
import { GameOptions } from "../gameOptions";
import { Keyboard } from "../keyboard";
import { Panel } from "../gui/panel";

export enum letterState {
    WRONG = 2,  
    CORRECT = 4,
    PERFECT = 8,
}
 
export class PlayScene extends Phaser.Scene {
    words: string[];

    currentWord: string;

    wordToGuess: string;
 
    gameWidth: number;
    gameGrid: GameGrid;

    keyboard: Keyboard;

    message: Message;

    panel: Panel;
 
    constructor() {
        super({
            key: 'PlayScene'
        });
    }
 
    create(): void {
        this.gameWidth = this.game.config.width as number;

        this.words = this.cache.json.get('words');
        
        this.currentWord = '';

        this.wordToGuess = this.words[Phaser.Math.Between(0, this.words.length - 1)].toUpperCase();

        console.log(this.wordToGuess);

        this.panel = new Panel(this);
        this.panel.x = this.gameWidth / 2;
        //this.panel.y = this.panel.getBounds().height / 2;

        this.gameGrid = new GameGrid(this, GameOptions.rows);

        this.gameGrid.x = (this.gameWidth - this.gameGrid.getBounds().width) / 2;
        this.gameGrid.y = -this.gameGrid.getBounds().height;

        this.keyboard = new Keyboard(this, function() {
            this.updateWord('<');
        }.bind(this), function() {
            this.updateWord('>');
        }.bind(this));
        this.keyboard.x = (this.gameWidth - this.keyboard.getBounds().width) / 2;
        this.keyboard.y = this.game.config.height as number;

        this.input.keyboard.on('keydown', this.onKeyDown, this);

        let timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.gameGrid,
            y: (this.panel.getBounds().height / 2) + GameOptions.playScenePadding,
            duration: 250,
            ease: 'Power1'
        });
        timeline.add({
            targets: this.keyboard,
            y: (this.panel.getBounds().height / 2) + (GameOptions.playScenePadding * 2) + this.gameGrid.getBounds().height,
            duration: 250,
            ease: 'Power1'
        });

        timeline.play();

        this.message = new Message(
            this,
            "Message",
            "Content",
            function() {
                this.scene.start('PlayScene');
            }.bind(this)
        );
        this.message.x = (this.gameWidth - this.message.getBounds().width) / 2;
        this.message.y = this.game.config.height as number;
    }

    onKeyDown(e: KeyboardEvent): void {
        var key: string = e.key;

        if (key == ' ') {
            this.scene.start('PlayScene');
            return;
        }

        if (key == 'Backspace') {
            this.updateWord('<');
            return;
        }

        const regex = /^[a-zA-Z]{1}$/;

        if (regex.test(key)) {
            this.updateWord(key);
            return;
        }

        if (key == 'Enter') {
            this.updateWord('>');
            return;
        }
    }
     
    updateWord(s: string): void {
        switch (s) {
            case '<':
                if (this.currentWord.length > 0) {
                    this.currentWord = this.currentWord.slice(0, -1);
                    
                    this.gameGrid.removeLetter();
                }
                break;
            case '>':
                if (this.currentWord.length == this.wordToGuess.length) {
                    if (this.words.includes(this.currentWord.toUpperCase())) {
                        // Create default letter status to WRONG
                        let result: number[] = Array(this.wordToGuess.length).fill(letterState.WRONG);

                        let tempWord: string = this.wordToGuess;

                        for (let i: number = 0; i < this.wordToGuess.length; i++) {
                            if (this.currentWord.charAt(i) == tempWord.charAt(i)) {
                                result[i] = letterState.PERFECT;
                                tempWord = this.removeChar(tempWord, i);
                            } else {
                                for (let j: number = 0; j < this.wordToGuess.length; j++) {
                                    if (this.currentWord.charAt(i) == this.wordToGuess.charAt(j) && this.currentWord.charAt(j) != this.wordToGuess.charAt(j)) {
                                        result[i] = letterState.CORRECT;
                                        tempWord = this.removeChar(tempWord, j);
                                        break;
                                    }
                                }
                            }
                        }

                        this.keyboard.showResult(this.currentWord, result);

                        this.gameGrid.showResult(result);

                        let win: boolean = true;
                        result.forEach((element: number) => {
                            if (element != letterState.PERFECT) {
                                win = false;
                            }
                        });

                        if (!win) {
                            if (this.gameGrid.currentRow >= 6) {
                                this.showMessage("Échec!", "Le mot était:\n" + this.wordToGuess + "!", true);
                            }
                        } else {
                            this.showMessage("Victoire!", "Vous avez gagné en\n" + this.gameGrid.currentRow + " essai(s)!");
                        }

                        this.currentWord = '';
                    }
                }
                break;
            default:
                // Add a letter to the current word
                if (this.currentWord.length < this.wordToGuess.length) {
                    this.currentWord += s.toUpperCase();

                    this.gameGrid.addLetter(s.toUpperCase());
                }

        }

        if (this.currentWord.length <= 0) {
            this.keyboard.btnBackspace.disable();
        } else {
            this.keyboard.btnBackspace.enable();
        }
        if (this.currentWord.length == this.wordToGuess.length) {
            this.keyboard.btnEnter.enable();
        } else {
            this.keyboard.btnEnter.disable();
        }
    }

    removeChar(initialString: string, index: number): string {
        return initialString.substring(0, index) + '_' + initialString.substring(index + 1);
    }

    showMessage(title: string, description: string, isError: boolean = false) {
        this.message.textTitle.setText(title);
        this.message.changeBackground(isError ? 1 : 0);
        this.message.textDescription.setText(description);

        let timeline = this.tweens.createTimeline();

        timeline.add({
            targets: this.keyboard,
            y: this.game.config.height as number,
            duration: 250,
            ease: 'Power1'
        });
       
        timeline.add({
            targets: this.message,
            y: this.gameGrid.y + this.gameGrid.getBounds().height + 50,
            duration: 250,
            ease: 'Power1'
        });

        timeline.play();
    }
}