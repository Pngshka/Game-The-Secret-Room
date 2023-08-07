"use strict"
import Cell from "./Cell.js";
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
        //Генерация клеток под шкафом
        this.#cells = [];
        for (let i = 0; i < 2; i++) {
            let current_x = 400 + 80 * i;
            let current_y = 450;
            this.#cells.push(new Cell(this.#pixiApp, current_x, current_y));
        }
    }


    startNewGeneratedCell(){
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

            const CellToSprite = this.getCell(randRow);
            CellToSprite.setSprite(randSprite, true);
            this.cellsWithSprite.push(CellToSprite);

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

    addGoodSpriteToRandomCell(sprite){
        let cellsArraylength = this.cellsWithSprite.length;
        let current_x = 400 + 80 * cellsArraylength;
        let current_y = 450;
        const lastCellsWithSprite = new Cell(this.#pixiApp, current_x, current_y);
        lastCellsWithSprite.setSprite(sprite, true);
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

    /*alphaNull(){
        for (let i = 0; i < 2; i++)
            this.#cellsWithSprite[i].getSprite().alpha = 0;
    }*/

    /*popSprites(){
        for (let i = 0; i < 3; i++)
            this.#cellsWithSprite[i].popSprite();
    }*/
}