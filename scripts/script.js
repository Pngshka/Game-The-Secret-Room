"use strict"
import bookshellCellsManager from "./bookshellCellsManager.js"
import Cell from "./Cell.js"
import Game from "./Game.js"

const _pixiApp = new PIXI.Application({ resizeTo: window, backgroundColor: 0x000000});

document.body.appendChild(_pixiApp.view);

const sprites = new PIXI.ParticleContainer(10000, {
    scale: true,
    position: true,
    rotation: true,
    uvs: true,
    alpha: true,
});
_pixiApp.stage.addChild(sprites);

const atlasData = {
	frames: {
		enemy1: {
			frame: { x: 0, y:0, w:1920, h:1280 },
			sourceSize: { w: 320, h: 320 },
			spriteSourceSize: { x: 0, y: 0, w: 320, h: 320 }
		},
		enemy2: {
			frame: { x: 979, y:1398, w:116, h:116 },
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		enemy3: {
			frame: { x: 1100, y:1398, w:116, h:116 },
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		enemy4: {
			frame: { x: 0, y:1398, w:116, h:116 },
			sourceSize: { w: 0, h: 0 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
	},
	meta: {
		image: '../images/image1.png',
		format: 'RGBA8888',
		size: { w: 1280, h: 320 },
		scale: 1
	}
}

const spritesheet = new PIXI.Spritesheet(
	PIXI.BaseTexture.from(atlasData.meta.image),
	atlasData
);
await spritesheet.parse();

//debugger;

const background = new PIXI.Sprite(spritesheet.textures.enemy1);
//const background = PIXI.Sprite.from('../images/image1.png');
let GamePerci = new Game(_pixiApp, spritesheet)
                    .setBackground(background);


GamePerci.startLevel();
