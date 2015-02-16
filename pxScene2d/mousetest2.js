
console.log("In mousetest2");
var root = scene.root;

var url;
url = process.cwd() + "/../../images/skulls.png";
var bg = scene.createImage({id:"bg2",url:url,xStretch:2,yStretch:2,parent:root,autoSize:false});

url = process.cwd() + "/../../images/radial_gradient.png";
var bgShade = scene.createImage({id:"bg", url:url,xStretch:1,yStretch:1,parent:root,autoSize:false});

var txt1 = scene.createText({x:10,text:"",parent:root});

url = process.cwd() + "/../../images/ball.png"
var ball = scene.createImage({id:"ball",url:url,x:450, y:150,parent:root});
ball.cx = ball.w/2;
ball.cy = ball.h/2;

var childText = scene.createText({id:"text", text:"CLICK ME!!!",parent:ball,textColor:0xff0000ff, r:60, pixelSize:64});
childText.y = ball.h/2-childText.h/2;
childText.x = ball.w/2-childText.w/2;
childText.cx = childText.w/2;
childText.cy = childText.h/2;
var rTarget = 0;
childText.on("onMouseDown", function(e) {
    // TODO is there a better way to do this??
    rTarget += 360;
    childText.animateTo({r:rTarget}, 1.0, 4, 0); 
});

scene.on('onKeyDown', function(e) {
  console.log("onKeyDown:" + e.keyCode);
});

scene.on("onMouseMove", function(e) {
    txt1.text = "" + e.x+ ", " + e.y;
});

function updateSize(w, h) {
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
    txt1.y = h-txt1.h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.w, scene.h);
