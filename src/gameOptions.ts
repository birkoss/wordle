let gameDevicePixelRatio: number = window.devicePixelRatio;
if (gameDevicePixelRatio < 2) {
    gameDevicePixelRatio = 2;
}

export const GameOptions = {
    gameDevicePixelRatio: gameDevicePixelRatio,
    gameLayout: (window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'),
    tileSize: 11,   // 11x11
    rows : 6,       // 6 tries max @TODO: Rename to tries

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
    messageTitleY: -49 * gameDevicePixelRatio,
    messageTitleX: 2 * gameDevicePixelRatio,
    messageDescriptionScale: 1 * gameDevicePixelRatio,
    messageDescriptionY: -14 * gameDevicePixelRatio,
    messageButtonY: 40 * gameDevicePixelRatio,

    // Popup()
    popupButtonY: 44 * gameDevicePixelRatio,
    popupButtonX: 40 * gameDevicePixelRatio,
    popupDescriptionY: -4 * gameDevicePixelRatio,

    // BigLetterBox
    tileStartAt: 18 * gameDevicePixelRatio,
    tileScale: 3 * gameDevicePixelRatio,
    tileSpacing: 10 * gameDevicePixelRatio,
    tileLetterScale: 2 * gameDevicePixelRatio,

    // GameGrid()
    gameGridScale: 3 * gameDevicePixelRatio,
}