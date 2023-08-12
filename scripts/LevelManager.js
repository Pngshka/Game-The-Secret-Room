"use strict"
import Cell from "./Cell.js";
import Constants from "./GameConstants.js"

export default class LevelManager {

    #pixiApp;
    #cells;
    #BookshellCellsManager;
    #GroundCellsManager;
    badClickCount;
    goodClickCount;
    #spritesheet;
    #buttonImage;
    #currentGoodSprite;

    constructor(pixiApp, BookshellCellsManager, GroundCellsManager, levelNumber, spritesheet) {
        this.#pixiApp = pixiApp;
        this.#BookshellCellsManager = BookshellCellsManager;
        this.#spritesheet = spritesheet;
        this.#GroundCellsManager = GroundCellsManager;
    }

    #checkClickCount() {
        if (this.badClickCount > 2)
            throw Error("Уже были сделани 3 плохие попытки");
        if (this.goodClickCount > 3)
            throw Error("Уже были сделаны 3 удачные попытки");
    }

    badClick() {
        this.badClickCount++;
        this.#checkClickCount();
        //this.#buttonImage.eventMode = 'static';
        //this.#buttonImage.alpha = 1;
        //this.startDay();

        const error = new PIXI.Sprite(this.#spritesheet.textures.bad);
        error.x = Constants.RESULT_X;
        error.y = Constants.RESULT_Y;
        this.#pixiApp.stage.addChild(error);
        setTimeout(() => {this.#pixiApp.stage.removeChild(error)}, 400);

        //this.#GroundCellsManager.cellsWithSprite[2].popSprite();
        //this.startLevel();
    }

    goodClick() {
        //this.#buttonImage.eventMode = 'static';
        this.goodClickCount++;
        
        const succses = new PIXI.Sprite(this.#spritesheet.textures.good);
        succses.x = Constants.RESULT_X;
        succses.y = Constants.RESULT_Y;
        this.#pixiApp.stage.addChild(succses);
        setTimeout(() => {this.#pixiApp.stage.removeChild(succses)}, 400);

        //this.#GroundCellsManager.cellsWithSprite[2].popSprite();
        //this.startLevel();
    }

    //startDay() {
        
    //}

    startNight() {
        this.#buttonImage.eventMode = 'none';
        this.#buttonImage.alpha = 0;

        let badCells = this.#GroundCellsManager.cellsWithSprite;
        let currentBadCellSprite = badCells[0].getSprite();
        for (let i=0;i<badCells.length;i++){
            let currentBadCell = badCells[i];
            currentBadCellSprite = currentBadCell.getSprite();
            currentBadCellSprite.alpha = 1;
            currentBadCellSprite.cursor = 'pointer';
            currentBadCellSprite.on('pointerdown', this.badClick.bind(this));
            currentBadCellSprite.eventMode = 'static';
        
        }
        this.#currentGoodSprite = this.#BookshellCellsManager.randTrueImg();
        this.#currentGoodSprite.cursor = 'pointer';
        this.#currentGoodSprite.on('pointerdown', this.goodClick.bind(this));
        this.#currentGoodSprite.eventMode = 'static';
        this.#GroundCellsManager.addGoodSpriteToRandomCell(this.#currentGoodSprite);
    }
    

    startLevel() {
        this.badClickCount = 0;
        this.goodClickCount = 0;
        this.#BookshellCellsManager.startNewGeneratedCell(3);
        this.#GroundCellsManager.startNewGeneratedCell(this.#BookshellCellsManager.randTrueImgSprite);

        this.buttonClick();

        //00const fishAnimation = setInterval(this.fishAnimate, 50);
        //setTimeout(() => this.startNight(), 2000);

    }

    buttonClick(){
        this.#buttonImage = PIXI.Sprite.from('../images/button.png');
        this.#buttonImage.scale.set(0.25);
        this.#buttonImage.x = 415;
        this.#buttonImage.y = 530;
        this.#buttonImage.cursor = 'pointer';
        this.#buttonImage.on('pointerdown', this.startNight.bind(this));
        this.#buttonImage.eventMode = 'static';
        this.#pixiApp.stage.addChild(this.#buttonImage);
    }
}