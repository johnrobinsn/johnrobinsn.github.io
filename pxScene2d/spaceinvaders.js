var root = scene.root;
var score = 0;

function Invader(scene, image1, image2, padding) {
  this._scene = scene;
  this._image1 = this._scene.createImage();
  this._image1.url = image1;
  this._image1.visible = true;
  this._image1.parent = root;
  this._image1.x = -100;
  this._image1.y = -100;

  this._image2 = this._scene.createImage();
  this._image2.url = image2;
  this._image2.visible = false;
  this._image2.parent = root;
  this._image2.x = -100;
  this._image2.y = -100;

  this._padding = padding;
  this._visibleImage = this._image1;
}

Invader.prototype.setPosition = function(x, y) {
  this._visibleImage.x = x + this._padding;
  this._visibleImage.y = y;
}

Invader.prototype.moveDown = function(dist) {
  this._visibleImage.y += dist;
}

Invader.prototype.update = function(speed) {
  if (this._visibleImage == this._image1) {
    this._image2.x = this._image1.x;
    this._image2.y = this._image1.y;
    this._image1.x = this._image1.y = -100;
    this._visibleImage = this._image2;
  }
  else {
    this._image1.x = this._image2.x;
    this._image1.y = this._image2.y;
    this._image2.x = this._image2.y = -100;
    this._visibleImage = this._image1;
  }
  this._visibleImage.x += speed;
  return [ this._visibleImage.x, this._visibleImage.y ];
}

function Clan(scene) {
  this._scene = scene;
  this._invaders = new Array(55);
  this._speed = 5;
  this._restoreSpeed = this._speed;
  this._movingDown = false;
  this._movingDownIndex = this._invaders.length - 1;

  var i = 0;
  var y = 10;

  for (row = 0; row < 5; ++row) {
    var id = Math.floor((row / 2) + 1);
    var path = process.cwd() + "/../../images/invaders/Invader" + id;

    var padding = 0;
    if (id == 1) { padding = 6; }
    else if (id == 2) { padding = 2; }

    var x = 10;
    var stride = 52;
    for (col = 0; col < 11; ++col) {
      this._invaders[i] = new Invader(this._scene, path + "a.png", path + "b.png", padding);
      this._invaders[i].setPosition(x, y);

      i++;
      x += stride;
    }

    y += 40;
  }
}

Clan.prototype.update = function() {
  if (this._movingDown && this._speed != 0) {
    this._restoreSpeed = this._speed;
    this._speed = 0;
    this._movingDownIndex = this._invaders.length - 1;
  }

  if (this._movingDown) {
    var j = 0;
    var i = this._movingDownIndex;
    while (i >= 0 && j < 11) {
      this._invaders[i].moveDown(10);
      i--;
      j++;
    }
    this._movingDownIndex = i;
    if (i == -1) {
      this._movingDown = false;
      this._speed = this._restoreSpeed * -1;
    }
  }
  else {
    for (i = 0; i < 55; ++i) {
      var pos = this._invaders[i].update(this._speed);
      if (pos[0] > 590 || pos[0] < 5) {
        this._movingDown = true;
      }
    }
  }
}

function Player(scene, path) {
  this._image = scene.createImage();
  this._image.url = path;
  this._image.parent = scene.root;
  this._image.x = scene.w / 2;
  this._image.y = 430;
}

Player.prototype.moveBy = function(x, y) {
  if ((x < 0 && this._image.x > 10) || (x > 0 && this._image.x < scene.w - 70)) {
    this._image.x += x;
  }
  // this._image.y += y;
}

Player.prototype.fireShot = function() {
  console.log("TODO: fire shot");
}

var player = new Player(scene, process.cwd() + "/../../images/invaders/Playera.png");
var clan = new Clan(scene);

scene.on('keydown', function(code, flags) {
  if (code == 122) { player.moveBy(-5, 0); }
  if (code == 120) { player.moveBy(5, 0); }
  if (code == 109) { player.fireShot(); }
});

setInterval(function () { 
  clan.update(); 
}, 100); 

