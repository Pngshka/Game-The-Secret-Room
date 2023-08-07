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
        if (this.badClickCount > 3)
            throw Error("Уже были сделани 3 плохие попытки");
        if (this.goodClickCount > 3)
            throw Error("Уже были сделаны 3 удачные попытки");
    }

    badClick() {
        this.#checkClickCount();
        this.badClickCount++;
        this.startDay();

        console.log("bad");
        //this.#GroundCellsManager.popSprites();
    }

    badHover() {
        alert("12");
        
    }

    goodClick() {
        this.goodClickCount++;
        if (this.goodClickCount < 3)
            this.startDay();

        console.log("good");

        const succses = new PIXI.Sprite(this.#spritesheet.textures.enemy3);
        this.#pixiApp.stage.addChild(succses);
        setTimeout(() => {this.#pixiApp.stage.removeChild(succses)}, 400);

        //const succses = new PIXI.Sprite(this.#spritesheet.textures.enemy3);
        //this.#pixiApp.stage.addChild(succses);
        //setTimeout(() => {this.#pixiApp.stage.removeChild(succses)}, 6000);
        //this.#currentGoodSprite[2].popSprite();

        this.#GroundCellsManager.cellsWithSprite[2].popSprite();
        this.startLevel();
        //this.#GroundCellsManager.popSprites();
    }

    startDay() {
        
    }

    startNight() {
        this.#buttonImage.eventMode = 'none';

        const badCells = this.#GroundCellsManager.cellsWithSprite;
        for (let i=0;i<badCells.length;i++){
            const currentBadCell = badCells[i];
            const currentBadCellSprite = currentBadCell.getSprite();
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
        //currentGoodSprite.width = 200;
        //this.#GroundCellsManager.alphaNotNull();
        
    }

    startLevel() {
        this.badClickCount = 0;
        this.goodClickCount = 0;
        this.#BookshellCellsManager.startNewGeneratedCell(3);
        this.#GroundCellsManager.startNewGeneratedCell();

        //debugger;
        this.buttonClick();

        //00const fishAnimation = setInterval(this.fishAnimate, 50);
        //krista-123456: Описание
        //Реализована
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

        //for (let i =0; i<3;i++) this.#GroundCellsManager.getSprite(i).sprite.alpha=0;
        //this.#GroundCellsManager.alphaNotNull();
    }
}