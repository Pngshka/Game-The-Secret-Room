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

    constructor(pixiApp, BookshellCellsManager, GroundCellsManager, levelNumber) {
        this.#pixiApp = pixiApp;
        this.#BookshellCellsManager = BookshellCellsManager;
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
    }

    badHover() {
        //alert("12");
        
    }

    goodClick() {
        this.goodClickCount++;
        if (this.goodClickCount < 3)
            this.startDay();

        console.log("good");
    }

    startLevel() {
        this.badClickCount = 0;
        this.goodClickCount = 0;
        this.#BookshellCellsManager.startNewGeneratedCell(3);
        this.#GroundCellsManager.startNewGeneratedCell();
        setTimeout(() => this.startNight(), 2000);
    }

    startDay() {
        
    }

    startNight() {
        const badCells = this.#GroundCellsManager.cellsWithSprite;
        for (let i=0;i<badCells.length;i++){
            const currentBadCell = badCells[i];
            const currentBadCellSprite = currentBadCell.getSprite();
            currentBadCellSprite.cursor = 'pointer';
            currentBadCellSprite.on('pointerdown', this.badClick.bind(this));
            currentBadCellSprite.eventMode = 'static';
            
        }
        const currentGoodSprite = this.#BookshellCellsManager.randTrueImg();
        currentGoodSprite.cursor = 'pointer';
        currentGoodSprite.on('pointerdown', this.goodClick.bind(this));
        currentGoodSprite.eventMode = 'static';
        this.#GroundCellsManager.addGoodSpriteToRandomCell(currentGoodSprite);
        //currentGoodSprite.width = 200;
        
    }

}