const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 600 }, debug: false }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player, cursors;

function preload() {
  this.load.spritesheet('otello', 'assets/otello16.png', { frameWidth: 32, frameHeight: 48 });
  this.load.image('tiles', 'assets/tiles_school.png');
  this.load.tilemapTiledJSON('map', 'assets/school_map.json');
}

function create() {
  const map = this.make.tilemap({ key: 'map' });
  const tiles = map.addTilesetImage('school_tiles', 'tiles');
  const layer = map.createLayer('Background', tiles);
  layer.setCollisionByProperty({ collides: true });

  player = this.physics.add.sprite(100, 200, 'otello');
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, layer);

  this.anims.create({ key: 'walk', frames: this.anims.generateFrameNumbers('otello', { start:4, end:7 }), frameRate: 8, repeat: -1 });
  this.anims.create({ key: 'idle', frames: [{ key:'otello', frame:0 }], frameRate: 1 });
  this.anims.create({ key: 'kick', frames: this.anims.generateFrameNumbers('otello', { start:8, end:11 }), frameRate: 12 });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  player.body.velocity.x = 0;
  if (cursors.left.isDown) {
    player.body.velocity.x = -160;
    player.anims.play('walk', true);
    player.flipX = true;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 160;
    player.anims.play('walk', true);
    player.flipX = false;
  }
  else {
    player.anims.play('idle', true);
  }
  if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
    player.anims.play('kick', true);
  }
}
