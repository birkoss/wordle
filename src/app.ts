import 'phaser';

import { PreloadScene } from './scenes/preload';
import { PlayScene } from './scenes/play';
import { MenuScene } from './scenes/menu';
 
const scaleObject: Phaser.Types.Core.ScaleConfig = {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'game',
    width: window.innerWidth,
    height: window.innerHeight,
    min: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      max: {
        width: window.innerWidth,
        height: window.innerHeight
      }
}
 
const configObject: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x042428,
    scale: scaleObject,
    pixelArt: true,
    zoom: 1,
    scene: [PreloadScene, MenuScene, PlayScene]
}
 
new Phaser.Game(configObject);