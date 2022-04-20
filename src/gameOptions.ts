let gameDevicePixelRatio: number = window.devicePixelRatio;

export const GameOptions = {
    gameDevicePixelRatio: gameDevicePixelRatio,
    tileSize: 11,
    rows : 6,

    // CustomButton()
    customButtonBackgroundScale: 3 * gameDevicePixelRatio,
    customButtonTextScale: 1 * gameDevicePixelRatio,
    customButtonTextX: 290 / gameDevicePixelRatio,
    customButtonTextDownMovement: 2 * gameDevicePixelRatio,

    // Button()
    buttonTextY: -6 / gameDevicePixelRatio,
    buttonTextScale: 1 * gameDevicePixelRatio,

    // MenuButton()
    menuButtonBackgroundScale: 2.5 * gameDevicePixelRatio,
    menuButtonTextX: 2 * gameDevicePixelRatio,
    menuButtonTextY: -1 * gameDevicePixelRatio,

    // Keyboard()
    keyboardMainButtonY: 100 * gameDevicePixelRatio,
    keyboardScale: 2 * gameDevicePixelRatio,
    keyboardLetterScale: 1 * gameDevicePixelRatio,
    keyboardTextDownMovement: 2 * gameDevicePixelRatio,
    keyboardButtonSpacing: 25 * gameDevicePixelRatio,
    
    // TinyButton
    tinyButtonBackgroundScale: 2 * gameDevicePixelRatio,

    // Panel()
    panelBackgroundScale: 3 * gameDevicePixelRatio,
    panelButtonX: 10 * gameDevicePixelRatio,
    panelButtonY: -1 * gameDevicePixelRatio,

    // MenuScene()
    menuSceneBackgroundScale: 2.5 * gameDevicePixelRatio,
    menuSceneTitleScale: 2 * gameDevicePixelRatio,
    menuSceneTitleY: -48 * gameDevicePixelRatio,
    menuSceneButtonHelpY: 45 * gameDevicePixelRatio,

    // PlayScene()
    playScenePadding: 10 * gameDevicePixelRatio,

    // Message()
    messageBackgroundScale: 2.5 * gameDevicePixelRatio,
    messageTitleScale: 1.5 * gameDevicePixelRatio,
    messageTitleY: 26 * gameDevicePixelRatio,
    messageTitleX: 2 * gameDevicePixelRatio,
    messageDescriptionScale: 1 * gameDevicePixelRatio,
    messageDescriptionY: 66 * gameDevicePixelRatio,
    messageButtonY: 110 * gameDevicePixelRatio,

    // BigLetterBox
    tileStartAt: 18 * gameDevicePixelRatio,
    tileScale: 3 * gameDevicePixelRatio,
    tileSpacing: 10 * gameDevicePixelRatio,
    tileLetterScale: 2 * gameDevicePixelRatio,

    // GameGrid()
    gameGridScale: 3 * gameDevicePixelRatio,
}