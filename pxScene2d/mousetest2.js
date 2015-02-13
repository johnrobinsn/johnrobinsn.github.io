var root = scene.root;

var url;
url = process.cwd() + "/../../images/skulls.png";
var bg = scene.createImage({id:"bg2",url:url,xStretch:2,yStretch:2,parent:root});

url = process.cwd() + "/../../images/radial_gradient.png";
var bgShade = scene.createImage({id:"bg", url:url,xStretch:1,yStretch:1,parent:root});

var txt1 = scene.createText({x:10,text:"",parent:root});

url = process.cwd() + "/../../images/ball.png"
var ball = scene.createImage({id:"ball",url:url,x:450, y:150,parent:root});
ball.cx = ball.w/2;
ball.cy = ball.h/2;

var childText = scene.createText({id:"text", text:"CLICK ME!!!",parent:ball,textColor:0xff0000ff, r:30, pixelSize:64});
childText.y = ball.h/2-childText.h/2;
childText.x = ball.w/2-childText.w/2;
childText.cx = childText.w/2;
childText.cy = childText.h/2;
//childText.animateTo({"r":360}, 1, 0, 2);
var rTarget = 0;
childText.on("mousedown", function() {
    // TODO is there a better way to do this??
    rTarget += 360;
    childText.animateTo({r:rTarget}, 1.0, 4, 0); 
//    childText.animateTo({r:360}, 5.0, 4, 0, function(o) { o.r = 0; }); 
});

// clean up these names and expose as properties off of some object
var pxInterpLinear = 0;
var easeOutElastic = 1;
var easeOutBounce  = 2;
var pxExp = 3;
var pxStop = 4;

function fancy(p) {
  x1(p);
  y1(p);
  rotate1(p);
  scale1(p);
}

function x1(p) {
    p.animateTo({x:50}, 1.0, pxInterpLinear, 0, x2);
}

function x2(p) {
    p.animateTo({x:450}, 3.0, easeOutElastic, 0, fancy);
}

function y1(p) {
    p.y = 100;
    p.animateTo({y:350}, 1.0, easeOutBounce, 0, y2);
}

function y2(p) {
    p.animateTo({y:150}, 1.0, easeOutElastic, 0);
}

function rotate1(p) {
    p.r = 0;
    p.animateTo({r:-360}, 2.5, easeOutElastic, 0);
}

function scale1(p) {
    p.animateTo({sx:0.2,sy:0.2}, 1, pxInterpLinear, 0, scale2);
}

function scale2(p) {
    p.animateTo({sx:2.0,sy:2.0}, 1.0, pxExp, 0, scale3);
}

function scale3(p) {
    p.animateTo({sx:1.0,sy:1.0}, 1.0, easeOutElastic, 0);
}

//1fancy(ball);

scene.on('keydown', function(code, flags) {
  console.log("keydown:" + code);
});

scene.on("mousemove", function(x, y) {
    txt1.text = "" + x+ ", " + y;
});

function updateSize(w, h) {
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
    txt1.y = h-txt1.h;
}

scene.on("resize", updateSize);
updateSize(scene.w, scene.h);
