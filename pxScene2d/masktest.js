// TODO add support for relative urls
var baseURL = "http://johnrobinsn.github.io/pxScene2d/";

var root = scene.root;

var url;
url = baseURL + "images/skulls.png";
var bg = scene.createImage({url:url,xStretch:2,yStretch:2,parent:root,
                            autoSize:false});

url = baseURL + "images/radial_gradient.png";
var bgShade = scene.createImage({url:url,xStretch:1,yStretch:1,parent:root,
                                autoSize:false});

var txt1 = scene.createText({x:10,text:"",parent:root});

url = baseURL + "images/ball.png"
// TODO clip:true and mask:url seem to be broken when async loading images and or masks
var ball = scene.createImage({x:450,y:350,parent:root,/*clip:true,*/
                              onReady:function(e) {
				  var ball = e.target;
                                ball.cx = ball.w/2;
                                ball.cy = ball.h/2;
                                var t = scene.createText({text:"Hello There!!!",parent:ball,textColor:0xff0000ff,pixelSize:64});
                                t.y = ball.h/2-t.h/2;
                                t.x = ball.w/2-t.w/2;
                                t.cx = t.w/2;
                                t.cy = t.h/2;
                                t.animateTo({"r":360}, 1, 0, 2);
                              },url:url/*,mask:url*/});


// TODO clean up these names and expose as properties off of some object
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

fancy(ball);

scene.on('onKeyDown', function(e) {
  console.log("onKeyDown:" + e.keyCode);
});

scene.on("mousemove", function(e) {
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
