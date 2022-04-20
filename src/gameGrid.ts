import BigLetterBox from './bigLetterBox';
import { GameOptions } from './gameOptions';

export class GameGrid extends Phaser.GameObjects.Container {
    currentRow: number;
    currentColumn: number;
    
    letterBox: BigLetterBox[][];

    constructor(scene: Phaser.Scene, rows: number) {
        super(scene, 0, 0);

        scene.add.existing(this);

        let background = scene.add.image(0, 0, "background");
        background.setOrigin(0);
        background.setScale(GameOptions.gameGridScale);
        this.add(background);

        this.currentRow = 0;
        this.currentColumn = 0;

        this.letterBox = [];

        for (let i: number = 0; i < 5; i++) {
            this.letterBox[i] = [];

            for (let j: number = 0; j < rows; j++) {
                this.letterBox[i][j] = new BigLetterBox(
                    scene,
                    GameOptions.tileStartAt + i * ((GameOptions.tileScale * GameOptions.tileWidth) + GameOptions.tileSpacing),
                    GameOptions.tileStartAt + j * ((GameOptions.tileScale * GameOptions.tileWidth) + GameOptions.tileSpacing)
                );

                this.add(this.letterBox[i][j]);
            }
        }
    }

    addLetter(letter: string): void {
        this.letterBox[this.currentColumn][this.currentRow].setLetter(letter);

        this.currentColumn++;
    }

    removeLetter(): void {
        this.currentColumn--;
        this.letterBox[this.currentColumn][this.currentRow].setLetter('');
    }

    showResult(result: number[]): void {
        result.forEach((element: number, index: number) => {
            this.letterBox[index][this.currentRow].setResult(element);
        });

        this.currentRow++;
        this.currentColumn = 0;
    }
}