import { GameOptions } from './gameOptions';
import Button from './gui/button';
import KeyboardKey from './keyboardKey';
import { PlayScene } from './scenes/play';

const keyboardLayout: string[] = ['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];

export class Keyboard extends Phaser.GameObjects.Container {
    virtualKeyboard: KeyboardKey[][];
    
    callbackBackspace: Function;
    callbackEnter: Function;

    constructor(scene: PlayScene, callbackBackspace: Function, callbackEnter: Function) {
        super(scene, 0, 0);
        this.callbackBackspace = callbackBackspace;
        this.callbackEnter = callbackEnter;

        scene.add.existing(this);

        this.virtualKeyboard = [];
      
        // Get the maximum keyboard row length
        let maxRowLength: number = 0;
        keyboardLayout.forEach((row: string, index: number) => {
            if (row.length > maxRowLength) {
                maxRowLength = row.length;
            }
        });

        keyboardLayout.forEach((row: string, index: number) => {

            this.virtualKeyboard[index] = [];
            let leftPadding: number = ((maxRowLength - row.length) * (GameOptions.keyboardScale * GameOptions.tileWidth) / 2);
 
            for (let i: number = 0; i < row.length; i++) {
                this.virtualKeyboard[index][i] = new KeyboardKey(
                    scene,
                    leftPadding + i * ((GameOptions.keyboardScale * GameOptions.tileWidth) + GameOptions.keyboardScale * 2),
                    index * ((GameOptions.keyboardScale * GameOptions.tileWidth) + GameOptions.keyboardScale * 2),
                    row.charAt(i)
                );

                this.add(this.virtualKeyboard[index][i]);
            }
        });

        let enter = new Button(
            scene,
            "Valider",
            function() {
                this.callbackEnter();
            }.bind(this),
            2
        );
        enter.x = this.getBounds().width - enter.getBounds().width - 50;
        
        enter.y = this.getBounds().height + 50;
        this.add(enter);

        let backspace = new Button(
            scene,
            "Effacer",
            function() {
                this.callbackBackspace();
            }.bind(this),
            4
        );
        backspace.x = 50;
        backspace.y = enter.y;
        this.add(backspace);
    }

    showResult(currentWord: string, result: number[]): void {
        result.forEach((element: number, index: number) => {
            let position: Phaser.Math.Vector2 = this.getLetterPosition(currentWord.charAt(index));

            if (parseInt(this.virtualKeyboard[position.x][position.y].tile.frame.name) < element) {
                this.virtualKeyboard[position.x][position.y].tile.setFrame(element);
            }
        });
    }

    getLetterPosition(letter: string): Phaser.Math.Vector2 {
        let row: number = 0;
        let column: number = 0;

        keyboardLayout.forEach((currentRow: string, index: number) => {
            if (currentRow.includes(letter)) {
                row = index;
                column = currentRow.indexOf(letter);
            }
        });

        return new Phaser.Math.Vector2(row, column);
    }

}