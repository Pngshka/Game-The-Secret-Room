"use strict"
import Cell from "./Cell.js";
import Constants from "./GameConstants.js"

export default class BookshellCellsManager {

    #pixiApp;
    #cells;
    #cellsWithSprite;
    #spritesheet;

    constructor(pixiApp, spritesheet) {
        this.#pixiApp=pixiApp;
        this.#spritesheet = spritesheet;
        this.#init();
    }

    #init() {
        this.#cells = [];
        for (let i = 0; i < Constants.BOOKSHELLF_ROWS; i++) {
            this.#cells[i] = [];
            for (let j = 0; j < Constants.BOOKSHELLF_COLUMNS; j++) {
                let current_x = 385 + 55 * j
                let current_y = 110 + 53.5 * i
                this.#cells[i][j] = new Cell(this.#pixiApp, current_x, current_y);
            }
        }
    }

    startNewGeneratedCell(spriteCount){
        this.clearOldCells();
        this.#init();
        this.randomCell(spriteCount);
    }

    clearOldCells(){
        for (let i = 0; i < Constants.BOOKSHELLF_ROWS; i++) {
            for (let j = 0; j < Constants.BOOKSHELLF_COLUMNS; j++) {
                const currentCell = this.getCell(i, j);
                if (currentCell.getSprite() != null)
                    currentCell.popSprite();
            }
        } 
    }

    getCell(row, column) {
        //debugger;
        return this.#cells[row][column];
    }

    randomCell(spriteCount){
        this.#cellsWithSprite = [];
        for (let i = 0; i < Constants.BOOKSHELLF_ROWS-4; i++) {
            for (let j = 0; j < Constants.BOOKSHELLF_COLUMNS; j++) {
                const CellToSprite = this.getCell(i, j);
                CellToSprite.setSprite(new PIXI.Sprite(this.#spritesheet.textures.enemy4), false);
                CellToSprite.status = false;
                this.#cellsWithSprite.push(CellToSprite);
            }
        }

        for (let i = Constants.BOOKSHELLF_ROWS-3; i < Constants.BOOKSHELLF_ROWS; i++) {
            for (let j = 0; j < Constants.BOOKSHELLF_COLUMNS; j++) {
                const CellToSprite = this.getCell(i, j);
                CellToSprite.setSprite(new PIXI.Sprite(this.#spritesheet.textures.enemy4), false);
                CellToSprite.status = false;
                this.#cellsWithSprite.push(CellToSprite);
            }
        }

        for (let i = 0; i < spriteCount; i++) {
            let randColumn = 0;
            let randRow = 0;
            while (this.getCell(randRow, randColumn).getSprite()!=null) {
                randColumn = Math.floor(Math.random() * Constants.BOOKSHELLF_COLUMNS);
                randRow = Math.floor(Math.random() * Constants.BOOKSHELLF_ROWS);
            }
            const randSprite = this.randomImg();
            const CellToSprite = this.getCell(randRow, randColumn);
            CellToSprite.setSprite(randSprite, false);
            this.#cellsWithSprite.push(CellToSprite);
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
    }

    randTrueImgIndex;
    randTrueImgSprite;
    randTrueImg() {
        this.randTrueImgIndex = 0;
        while (this.#cellsWithSprite[this.randTrueImgIndex].status==false) {
            this.randTrueImgIndex = Math.floor(Math.random() * this.#cellsWithSprite.length);
        }
        this.randTrueImgSprite = this.#cellsWithSprite[this.randTrueImgIndex];
        
        const returnCell = this.#cellsWithSprite[this.randTrueImgIndex].popSprite();
        this.#cellsWithSprite.splice(this.randTrueImgIndex, 1);
        return returnCell;
    }
}