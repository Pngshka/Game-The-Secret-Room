"use strict"
import Cell from "./Cell.js"
import BookshellCellsManager from "./bookshellCellsManager.js";
import GroundCellsManager from "./GroundCellsManager.js";
import Constants from "./GameConstants.js"
import LevelManager from "./LevelManager.js"

export default class Game{

    #pixiApp;
    #bookshellManager;
    #GroundCellsManager;
    #backgroungImage;
    #spritesheet;
    #LevelManager;

    constructor(pixiApp, spritesheet){
        this.#pixiApp = pixiApp;
        this.#spritesheet = spritesheet;
        this.#bookshellManager=new BookshellCellsManager(this.#pixiApp, this.#spritesheet);
        this.#GroundCellsManager=new GroundCellsManager(this.#pixiApp, this.#spritesheet);
    }

    setBackground(backgroungImage) {
        if (this.#backgroungImage != null)
            this.#pixiApp.stage.removeChild(this.#backgroungImage);
        this.#backgroungImage = backgroungImage

        this.#backgroungImage.scale.set(0.5);
        this.#pixiApp.stage.addChild(this.#backgroungImage);
        return this;
    }

    /*drawCletka() {
        for (let i=0; i<Constants.BOOKSHELLF_ROWS; i++) {
            for (let j=0; j<Constants.BOOKSHELLF_COLUMNS;j++) { 
                const sprite = new PIXI.Sprite(this.#spritesheet.textures.enemy2);
                this.#bookshellManager.getCell(i, j).setSprite(sprite);
            }
        }
        for (let i=0; i<3; i++) {
            const sprite = new PIXI.Sprite(this.#spritesheet.textures.enemy2);
            this.#GroundCellsManager.getCell(i).setSprite(sprite);
        } 
    }*/

    startLevel(){
        this.#LevelManager=new LevelManager(this.#pixiApp, this.#bookshellManager,
                                            this.#GroundCellsManager, 1, this.#spritesheet);
        this.#LevelManager.startLevel();
    }

}
