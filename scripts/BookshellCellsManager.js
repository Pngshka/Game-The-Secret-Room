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
        //Генерация клеток шкафа
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
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 5; j++) {
                const CellToSprite = this.getCell(i, j);
                CellToSprite.setSprite(new PIXI.Sprite(this.#spritesheet.textures.enemy4), false);
                CellToSprite.status = false;
                this.#cellsWithSprite.push(CellToSprite);
            }
        }

        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
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
    randomIndex = 0;
    randomImg(){
        // const spriteArray = [1, 2, 3, 4, 5];
        // spriteArray.sort(() => Math.random() - 0.5)
        // .sort(() => Math.random() - 0.5)
        // .sort(() => Math.random() - 0.5);
        this.randomIndex++;
        if (this.randomIndex % 2 == 0)
            return new PIXI.Sprite(this.#spritesheet.textures.enemy2);
        else return new PIXI.Sprite(this.#spritesheet.textures.enemy3);
    }

    randTrueImg() {
        let randTrueImgIndex = 0;
        while (this.#cellsWithSprite[randTrueImgIndex].status==false) {
            randTrueImgIndex = Math.floor(Math.random() * this.#cellsWithSprite.length);
        }
        const returnCell = this.#cellsWithSprite[randTrueImgIndex].popSprite();
        this.#cellsWithSprite.splice(randTrueImgIndex, 1);
        return returnCell;
    }
}