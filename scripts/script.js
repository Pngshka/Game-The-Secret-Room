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
		good: {
			frame: { x: 0, y:2004, w:141, h:114 },
			sourceSize: { w: 141, h: 114 },
			spriteSourceSize: { x: 0, y: 0, w: 141, h: 114 }
		},
		bad: {
			frame: { x: 141, y:2004, w:114, h:114 },
			sourceSize: { w: 114, h: 114 },
			spriteSourceSize: { x: 0, y: 0, w: 114, h: 114 }
		},
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
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		enemy5: {
			frame: { x: 1131, y:1519, w:116, h:116 },
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		enemy6: {
			frame: { x: 492, y:1398, w:116, h:116 },
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		enemy7: {
			frame: { x: 1075, y:1638, w:116, h:116 },
			sourceSize: { w: 116, h: 116 },
			spriteSourceSize: { x: 0, y: 0, w: 116, h: 116 }
		},
		animations1: {
			frame: { x: 1443, y:1863, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations2: {
			frame: { x: 1593, y:1854, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations3: {
			frame: { x: 1518, y:1863, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations4: {
			frame: { x: 1906, y:1807, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations5: {
			frame: { x: 1906, y:1741, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations6: {
			frame: { x: 1443, y:1929, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations7: {
			frame: { x: 1893, y:1873, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations8: {
			frame: { x: 1818, y:1895, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
		animations9: {
			frame: { x: 1743, y:1895, w:73, h:64 },
			sourceSize: { w: 73, h: 64 },
			spriteSourceSize: { x: 0, y: 0, w: 73, h: 64 }
		},
	},
	meta: {
		image: '../images/image1.png',
		format: 'RGBA8888',
		size: { w: 1280, h: 320 },
		scale: 1
	},
	animations: {
        enemy: ['animations1','animations2','animations3','animations4','animations5','animations4','animations3','animations2',
				'animations1', 'animations6','animations7','animations8','animations9','animations8','animations7','animations6','animations1'] //array of frames by name
    }
}

const spritesheet = new PIXI.Spritesheet(
	PIXI.BaseTexture.from(atlasData.meta.image),
	atlasData
);
await spritesheet.parse();

/*const anim = new PIXI.AnimatedSprite(spritesheet.animations.enemy);

// set the animation speed
anim.animationSpeed = 0.1666;
// play the animation on a loop
anim.play();
// add it to the stage to render
_pixiApp.stage.addChild(anim);*/



const background = new PIXI.Sprite(spritesheet.textures.enemy1);
let GamePerci = new Game(_pixiApp, spritesheet)
                    .setBackground(background);


GamePerci.startLevel();
