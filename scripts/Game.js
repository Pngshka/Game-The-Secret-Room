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

    startLevel(){
        this.#LevelManager=new LevelManager(this.#pixiApp, this.#bookshellManager,
                                            this.#GroundCellsManager, 1, this.#spritesheet);
        this.#LevelManager.startLevel();
    }

}
