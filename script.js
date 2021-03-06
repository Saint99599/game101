const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 736,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } } },
  scene: {
    preload: preload,
    create: create,
    update: update 
  } 
};

const game = new Phaser.Game(config);
let cursors;
let player;
let Merchant;
let showDebug = false;

let tomatoLayer;
let tomatos;
let tomatoScore = 0;
let vegetable01Layer;
let vegetables01;
let vegetable01Score = 0;
let vegetable02Layer;
let vegetables02;
let vegetable02Score = 0;
let vegetable03Layer;
let vegetables03;
let vegetable03Score = 0;
let vegetable04Layer;
let vegetables04;
let vegetable04Score = 0;
let vegetable05Layer;
let vegetables05;
let vegetable05Score = 0;

function preload() {
  this.load.image("tiles", "assets/map/map101.png");
  this.load.image("tomato", "assets/vegetable/tomato.png");
  this.load.image("vegetable01", "assets/vegetable/vegetable01.png");
  this.load.image("vegetable02", "assets/vegetable/vegetable02.png");
  this.load.image("vegetable03", "assets/vegetable/vegetable03.png");
  this.load.image("vegetable04", "assets/vegetable/vegetable04.png");
  this.load.image("vegetable05", "assets/vegetable/vegetable05.png");
  
  this.load.tilemapTiledJSON("map", "assets/map/map101.json");
  
  this.load.atlas("atlas", "assets/player/atlas.png", "assets/player/atlas.json");
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("map101", "tiles");
  
  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const forest = map.createStaticLayer("forest", tileset, 0, 0);
  const home01 = map.createStaticLayer("home01", tileset, 0, 0);
  const home02 = map.createStaticLayer("home02", tileset, 0, 0);
  const plot01 = map.createStaticLayer("plot01", tileset, 0, 0);
  const plot02 = map.createStaticLayer("plot02", tileset, 0, 0);
  const plot03 = map.createStaticLayer("plot03", tileset, 0, 0);
  const plot04 = map.createStaticLayer("plot04", tileset, 0, 0);
  const plot05 = map.createStaticLayer("plot05", tileset, 0, 0);
  const plot06 = map.createStaticLayer("plot06", tileset, 0, 0);
  const plot07 = map.createStaticLayer("plot07", tileset, 0, 0);
  const plot08 = map.createStaticLayer("plot08", tileset, 0, 0);
  const plot09 = map.createStaticLayer("plot09", tileset, 0, 0);
  const plot10 = map.createStaticLayer("plot10", tileset, 0, 0);
  const plot11 = map.createStaticLayer("plot11", tileset, 0, 0);
  const plot12 = map.createStaticLayer("plot12", tileset, 0, 0);
  tomatoLayer = map.getObjectLayer('tomatoLayer')['objects'];
  vegetable01Layer = map.getObjectLayer('vegetable01Layer')['objects'];
  vegetable02Layer = map.getObjectLayer('vegetable02Layer')['objects'];
  vegetable03Layer = map.getObjectLayer('vegetable03Layer')['objects'];
  vegetable04Layer = map.getObjectLayer('vegetable04Layer')['objects'];
  vegetable05Layer = map.getObjectLayer('vegetable05Layer')['objects'];

  forest.setCollisionByProperty({ collides: true });
  home01.setCollisionByProperty({ collides: true });
  home02.setCollisionByProperty({ collides: true });

  const spawnPoint = map.findObject("player", obj => obj.name === "Spawn Point");
  player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas","misa-front").setSize(30, 40).setOffset(0, 24);
  this.physics.add.collider(player, forest);
  this.physics.add.collider(player, home01);
  this.physics.add.collider(player, home02);

  const spawnMerchant = map.findObject("merchant", obj => obj.name === "Spawn Merchant");
  Merchant = this.physics.add.sprite(spawnMerchant.x, spawnMerchant.y, "atlas","misa-right").setSize(30, 40).setOffset(0, 24).setImmovable();
  this.physics.add.collider(player, Merchant).enable

  tomatos = this.physics.add.staticGroup()
  tomatoLayer.forEach(object => {
    let obj = tomatos.create(object.x, object.y, "tomato"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });
  vegetables01 = this.physics.add.staticGroup()
  vegetable01Layer.forEach(object => {
    let obj = vegetables01.create(object.x, object.y, "vegetable01"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });
  vegetables02 = this.physics.add.staticGroup()
  vegetable02Layer.forEach(object => {
    let obj = vegetables02.create(object.x, object.y, "vegetable02"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });
  
  vegetables03 = this.physics.add.staticGroup()
  vegetable03Layer.forEach(object => {
    let obj = vegetables03.create(object.x, object.y, "vegetable03"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });

  vegetables04 = this.physics.add.staticGroup()
  vegetable04Layer.forEach(object => {
    let obj = vegetables04.create(object.x, object.y, "vegetable04"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });
  vegetables05 = this.physics.add.staticGroup()
  vegetable05Layer.forEach(object => {
    let obj = vegetables05.create(object.x, object.y, "vegetable05"); 
       obj.setScale(object.width/32, object.height/32); 
       obj.setOrigin(0,1); 
       obj.body.width = object.width; 
       obj.body.height = object.height; 
  });

  //collisons
  map.setCollisionBetween(0, 923, true, 'ground');
  player.setCollideWorldBounds(true);
  this.physics.add.overlap(player, tomatos,  collecttomato, null, this);
  this.physics.add.overlap(player, vegetables01,  collectvegetable01, null, this);
  this.physics.add.overlap(player, vegetables02,  collectvegetable02, null, this);
  this.physics.add.overlap(player, vegetables03,  collectvegetable03, null, this);
  this.physics.add.overlap(player, vegetables04,  collectvegetable04, null, this);
  this.physics.add.overlap(player, vegetables05,  collectvegetable05, null, this);

  //score
  text = this.add.text(610, 0, `tomato: ${tomatoScore}x`, {
    fontSize: '20px',
    fill: '#ffffff'
  });
  
  const anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1 });

  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1 });

  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1 });

  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1 });

  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  cursors = this.input.keyboard.addKeys({//?????????????????????????????????????????????????????????keyboard
    up : Phaser.Input.Keyboard.KeyCodes.W,
    down : Phaser.Input.Keyboard.KeyCodes.S,
    left : Phaser.Input.Keyboard.KeyCodes.A,
    right : Phaser.Input.Keyboard.KeyCodes.D,
    F : Phaser.Input.Keyboard.KeyCodes.F,
  })

   // Debug graphics
   this.input.keyboard.once("keydown_C", event => {
    // Turn on physics debugging to show player's hitbox
    this.physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = this.add.
    graphics().
    setAlpha(0.75).
    setDepth(0);
    forest.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  });
}

function update(time, delta) {
  const speed = 200;
  const prevVelocity = player.body.velocity.clone();

  player.body.setVelocity(0);

  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  player.body.velocity.normalize().scale(speed);

  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();

    // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");else
    if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");else
    if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");else
    if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
  }

}

function collecttomato(player, tomato) {
  tomato.destroy(tomato.x, tomato.y); // remove the tile/coin
  tomatoScore ++; // increment the score
  text.setText(`tomato: ${tomatoScore}x`); // set the text to show the current score
  return false;
}
function collectvegetable01(player, vegetable01) {
  vegetable01.destroy(vegetable01.x, vegetable01.y); // remove the tile/coin
  vegetable01Score ++; // increment the score
  text.setText(`vegetable01: ${vegetable01Score}x`); // set the text to show the current score
  return false;
}
function collectvegetable02(player, vegetable02) {
  vegetable02.destroy(vegetable02.x, vegetable02.y); // remove the tile/coin
  vegetable02Score ++; // increment the score
  text.setText(`vegetable02: ${vegetable02Score}x`); // set the text to show the current score
  return false;
}
function collectvegetable03(player, vegetable03) {
  vegetable03.destroy(vegetable03.x, vegetable03.y); // remove the tile/coin
  vegetable03Score ++; // increment the score
  text.setText(`vegetable03: ${vegetable03Score}x`); // set the text to show the current score
  return false;
}
function collectvegetable04(player, vegetable04) {
  vegetable04.destroy(vegetable04.x, vegetable04.y); // remove the tile/coin
  vegetable04Score ++; // increment the score
  text.setText(`vegetable04: ${vegetable04Score}x`); // set the text to show the current score
  return false;
}
function collectvegetable05(player, vegetable05) {
  vegetable05.destroy(vegetable05.x, vegetable05.y); // remove the tile/coin
  vegetable05Score ++; // increment the score
  text.setText(`vegetable05: ${vegetable05Score}x`); // set the text to show the current score
  return false;
}

function interactive(){
  if((Math.abs(Merchant.x - player.x) <= 10) & ((Math.abs(Merchant.y - player.y) <= 10))){
      if(player.inputKeys.F.isDown){
          console.log("Complete Interactive")
      }
  }
}