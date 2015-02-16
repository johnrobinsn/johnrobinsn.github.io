// TODO add support for relative urls
var baseURL = "http://johnrobinsn.github.io/pxScene2d/";

var root = scene.root;

function randomInt(from, to) {
	var range = to-from;
	return Math.round(Math.random()*range + from);
}

var bg = scene.createRectangle({fillColor:0xccccccff, parent:root});
var back = scene.createImage({parent:bg});
var front = scene.createImage({parent:bg});

function updateSize(w, h) {
  bg.w = w;
  bg.h = h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.w, scene.h);


function keyContent(e) {
  var b = e.target;
  b.a = 1;
  b.cx = b.w/2;
  b.cy = b.h/2;
  var t = b.children[0];
  t.x = (b.w-t.w)/2;
  t.y = (b.h-t.h)/2;
  t.cx = t.w/2;
  t.cy = t.h/2;
  b.animateTo({a:1,y:randomInt(20,200),r:randomInt(-30,30)},0.2,3,0,function(t) { 
    t.animateTo({r:randomInt(-15,15),y:t.y+50},0.6,0,0,function(t) {
      t.animateTo({sx:1, sy: 1}, 0.01, 0, 0, function(t) {
        t.animateTo({a:0,sx:0.25,sy:0.25}, 0.2, 0, 0, function(t) {
          t.remove();
        });
      });
    })
  });
}

scene.on("onKeyDown", function(e) {
    console.log("**onKeyDown");
  var keycode = e.keyCode;
  var keytext = ""+Math.floor(keycode);
  var textbg = scene.createImage({onReady:keyContent,
                                  a:0, x:randomInt(50,scene.w-150), 
                                  y:scene.h+50, 
                                  url:baseURL+"images/keybubble.png",
                                  parent:back,sx:0.6,sy:0.6});
  var text = scene.createText({text:keytext,pixelSize:64,parent:textbg});
});


function balloon(eventName, imageURL, textColor, offset, parent) {
  return function(e) {
    var x = e.x; var y = e.y;
    function balloonContent(e) {
      var b = e.target;
      b.x = b.x-b.w/2;
      b.y = b.y-b.h;
      b.cx = b.w/2;
      b.cy = b.h/2;
      var t = scene.createText({text:eventName, parent:b, 
                                   textColor:textColor});
      t.x = (b.w-t.w)/2;
      t.y = (b.h-t.h-10)/2;
      t.cx = t.w/2;
      t.cy = t.h/2;
      textbg.animateTo({y:textbg.y-10-offset},0.3,0,0,function(t) {
        t.animateTo({a:0},0.3,4,0,function(t) {
          t.remove();
        });
      });
    }

    var textbg = scene.createImage({x:x,y:y,onReady:balloonContent,
                                    url:imageURL,parent:parent,
                                    r:randomInt(-10,10)});
  }
}

scene.on("onMouseMove", balloon("mousemove", baseURL+
                              "images/textballoon_white.png", 0x000000ff,0,
                              back));
scene.on("onMouseDown", balloon("mousedown", baseURL+
                              "images/textballoon_blue.png", 0xffffffff,0,
                              front));
scene.on("onMouseUp",   balloon("mouseup",   baseURL+
                              "images/textballoon_red.png", 0xffffffff,25,
                              front));

