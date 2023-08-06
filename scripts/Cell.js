"use strict"
export default class Cell{
    #pixiApp;
    x;
    y;
    #sprite;
    status;

    constructor(pixiApp, x, y) {
        this.#pixiApp=pixiApp;
        this.x=x;
        this.y=y;
        this.#sprite=null;
        this.status = true;
    }

    getSprite() {
        return this.#sprite;
    }

    setSprite(sprite, flag) {
        this.#sprite = sprite;
        sprite.x = this.x;
        sprite.y = this.y;
        if (flag) sprite.scale.set(0.5); else sprite.scale.set(0.35);
        this.#pixiApp.stage.addChild(sprite);
    }

    popSprite() {
        const thisSprite = this.#sprite;
        this.#sprite = null;
        this.#pixiApp.stage.removeChild(thisSprite);
        return thisSprite;
    }

    /*setOnClick(sprite) {
        this.#sprite = sprite.on('pointerdown', onClick.bind(this));

        function onClick()
        {
            this.#sprite[row][column].scale.x *= 1.25;
            this.#sprite[row][column].scale.y *= 1.25;
        }
    }*/
}


