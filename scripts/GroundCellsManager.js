"use strict"
import Cell from "./Cell.js";
import Constants from "./GameConstants.js"

export default class BookshellCellsManager {

    #pixiApp;
    #cells;
    #spritesheet;
    cellsWithSprite;

    get cellsWithSprite(){
        return this.cellsWithSprite;
    }

    constructor(pixiApp, spritesheet) {
        this.#pixiApp = pixiApp;
        this.#spritesheet = spritesheet;
        this.#init();
    }

    #init() {
        this.#cells = [];
        for (let i = 0; i < 2; i++) {
            let current_x = Constants.GROUND_CELLS_X + Constants.GROUND_CELLS_X_MARGIN * i;
            let current_y = Constants.GROUND_CELLS_Y;
            this.#cells.push(new Cell(this.#pixiApp, current_x, current_y));
        }
    }

    randTrueImgSprite;
    startNewGeneratedCell(randTrueImgSprite){
        this.randTrueImgSprite = randTrueImgSprite;
        this.clearOldCells();
        this.#init();
        this.randomCell();
    }

    clearOldCells(){
        for (let i = 0; i < 2; i++) {
            const currentCell = this.getCell(i);
                if (currentCell.getSprite() != null)
                    currentCell.popSprite();
        } 
    }

    getCell(index) {
        return this.#cells[index];
    }

    randomCell(){
        this.cellsWithSprite = [];
        for (let i = 0; i < 2; i++) {
            let randRow = i;
            const randSprite = this.randomImg();

            randSprite.alpha = 0;

            randSprite.anchor.set(Constants.ANCHOR, Constants.ANCHOR);
            randSprite.cursor = 'pointer';
            randSprite.canRotate = false;
            randSprite.on('mouseover', function() {
                                    this.canRotate = true;
                                })
                                .on('mouseout', function() {
                                    this.canRotate = false;
                                });
            randSprite.eventMode = 'static';

            this.#pixiApp.ticker.add((delta) => {
                if(randSprite.canRotate){
                    if (randSprite.rotation < 2) randSprite.rotation += Constants.ANGLE * delta;
                }
                else {
                    if (randSprite.rotation > 0) randSprite.rotation -= Constants.ANGLE * delta;
                }
            });

            const CellToSprite = this.getCell(randRow);
            CellToSprite.setSprite(randSprite, true);
            this.cellsWithSprite.push(CellToSprite);

        }
    }
    randomIndex = -1;
    flag = true;
    spriteArray = [1, 2, 3, 4, 5];
    randomImg(){
        if (this.flag) {
            this.spriteArray.sort(() => Math.random() - 0.5)
            .sort(() => Math.random() - 0.5)
            .sort(() => Math.random() - 0.5);
            this.flag = false;
        }
        this.randomIndex++;
        if (this.randTrueImgSprite!=this.spriteArray[this.randomIndex]){
            if (this.spriteArray[this.randomIndex]==1)
                return new PIXI.Sprite(this.#spritesheet.textures.enemy3);                
            if (this.spriteArray[this.randomIndex]==2)
                return new PIXI.Sprite(this.#spritesheet.textures.enemy2);
            if (this.spriteArray[this.randomIndex]==3)
                return new PIXI.Sprite(this.#spritesheet.textures.enemy7);                
            if (this.spriteArray[this.randomIndex]==4)
                return new PIXI.Sprite(this.#spritesheet.textures.enemy6);
            if (this.spriteArray[this.randomIndex]==5)
                return new PIXI.Sprite(this.#spritesheet.textures.enemy5);
        } else 
        {
                this.randomIndex++;
                this.randomImg();
        }
    }

    addGoodSpriteToRandomCell(sprite){
        let cellsArraylength = this.cellsWithSprite.length;
        let current_x = Constants.GROUND_CELLS_X + Constants.GROUND_CELLS_X_MARGIN * cellsArraylength;
        let current_y = Constants.GROUND_CELLS_Y;
        let lastCellsWithSprite = new Cell(this.#pixiApp, current_x, current_y);
        lastCellsWithSprite.setSprite(sprite, true);

        sprite.anchor.set(Constants.ANCHOR, Constants.ANCHOR);
        sprite.cursor = 'pointer';
        sprite.canRotate = false;
        sprite.on('mouseover', function() {
                                this.canRotate = true;
                            })
                            .on('mouseout', function() {
                                this.canRotate = false;
                            });
        sprite.eventMode = 'static';

        this.#pixiApp.ticker.add((delta) => {
            if(sprite.canRotate){
                if (sprite.rotation < 2) sprite.rotation += Constants.ANGLE * delta;
            }
            else {
                if (sprite.rotation > 0) sprite.rotation -= Constants.ANGLE * delta;
            }
        });

        this.cellsWithSprite.push(lastCellsWithSprite);
        cellsArraylength++;
        const randIndex = Math.floor(Math.random() * cellsArraylength);
        
        this.swapCellSprites(randIndex, cellsArraylength - 1);
    }

    swapCellSprites(index1, index2) {
        if (index1 == index2)
            return;
        //debugger;
        const sprite1 = this.cellsWithSprite[index1].popSprite();
        const sprite2 = this.cellsWithSprite[index2].popSprite();
        this.cellsWithSprite[index1].setSprite(sprite2, true);
        this.cellsWithSprite[index2].setSprite(sprite1, true);
        
    }
}