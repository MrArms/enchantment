
//===================================================
// Constructor
//===================================================

function Preloader() {
	
	console.log("Preloader");
	
	this._init();
}

Preloader.prototype.constructor = Preloader;

//===================================================
// Variables
//===================================================

Preloader.prototype._progressText = null;


//===================================================
// Constants
//===================================================

Preloader.MAP_SCROLL_THRESHOLD = 5;

//===================================================
// Private Methods
//===================================================

Preloader.prototype._init = function() {

	console.log("init");
	
	/*if(GameGlobals.SHOW_STATS === true){ 
	
		this._stats = new Stats();
		this._stats.showPanel(0);
		document.body.appendChild(this._stats.dom);
	}*/
	
	this._setUpPixiRenderer();

	this._progressText = new PIXI.Text('Hello pixi.js',{fill : '#555555', font : '48px Arial',wordWrap : true, wordWrapWidth : 700});
	this._progressText.x = 10;
	this._app.stage.addChild(this._progressText);
	
	this._animate();
	
	this._loadGraphics();
	
	//this._loadGraphics();

	//this._gameController = new GameController(this.stage);	
}


/*Preloader.prototype._graphicsLoadedCallback = function(){

	
	
	this._continueInit()
}


Preloader.prototype._continueInit = function(){

	

	
	
}*/


Preloader.prototype._addTestGraphics = function(){
	
	var test = new PIXI.Sprite(this._landTexture);
	test.position.x = 0;
	test.position.y = 0;
	test.scale.x = 2;
	test.scale.y = 2;
	
	this._app.stage.addChild(test)	
	
	var test2 = new PIXI.Sprite(this._castleTexture);
	test2.position.x = 0;
	test2.position.y = 0;
	test2.scale.x = 2;
	test2.scale.y = 2;
	
	this._app.stage.addChild(test2)
}

Preloader.prototype._preloaderCompleted = function(){

	this._progressText.text = "Everything is loaded! If it was too quick for you, use your network panel :)";
	
	this._addTestGraphics();
}

Preloader.prototype._setUpPixiRenderer = function(){
											
	var gameCanvas = document.getElementById('game-canvas');
	
	Preloader.SCREEN_WIDTH = gameCanvas.width;
	Preloader.SCREEN_HEIGHT = gameCanvas.height;
	
	this._app = new PIXI.Application(Preloader.SCREEN_WIDTH, Preloader.SCREEN_HEIGHT);
	//document.body.appendChild(this.renderer.view);
	
	this._renderer = new PIXI.autoDetectRenderer(Preloader.SCREEN_WIDTH, Preloader.SCREEN_HEIGHT, {view:gameCanvas});		
	this._renderer.backgroundColor = 0x000025;
	
	PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
}


Preloader.prototype._loadGraphics = function(){

	 var assets = [
							"../assets/graphics/land_tile.png",
							"../assets/graphics/sea_tile.png",
							"../assets/graphics/ship_tile.png",
							"../assets/graphics/castle_tile.png",
							"../assets/graphics/castle_site_tile.png",
							"../assets/graphics/skull_tile.png",
							//'../_assets/monsters.json', // you can add a json spritesheet directly
														// the loader will parse it and extract all the images for you
							"../assets/graphics/army_p1.png",
							"../assets/graphics/army_p2.png",
							"../assets/graphics/big-background.jpg",
							"../assets/graphics/big-background2.jpg",
							"../assets/graphics/big-background3.jpg",
							"../assets/graphics/composite1.png",
							"../assets/graphics/composite2.png",
							"../assets/graphics/composite3.png",
							
							
						];
						
						
	var loader = new PIXI.loaders.Loader();
	
	loader.add(assets);
	
	// listen to the progress event
	loader.on('progress',(function (loader,res) {
				// you can access the loader from the arguments
				// it has a progress variable that represents your progress
				// as a percentage
				this._progressText.text = loader.progress;
			}).bind(this))
			
			
	// listen to the complete event, it will be fired when everything is loaded
			loader.on('complete', (this._preloaderCompleted).bind(this));
			
			
			/*function (loader,res) {
				this._progressText.text = "Everything is loaded! If it was too quick for you, use your network panel :)";
				
			});*/
	
	// start loading
	loader.load();
}

//===================================================
// Events
//===================================================

Preloader.prototype._animate = function() {
    
	//if(GameGlobals.SHOW_STATS === true){ this._stats.begin(); }
			
	// start the timer for the next animation loop
    requestAnimationFrame((this._animate).bind(this));
    
    // this is the main render call that makes pixi draw your container and its children.
    this._renderer.render(this._app.stage);
	
	//this._update();
	
	//if(GameGlobals.SHOW_STATS === true){ this._stats.end(); }
}
