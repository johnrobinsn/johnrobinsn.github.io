// TODO add support for relative urls
//var baseURL = "http://johnrobinsn.github.io/pxScene2d/";
var baseURL = "http://localhost/~johnrobinson/johnrobinsn.github.io/pxScene2d/";

var root = scene.root;
//scene.showOutlines = true;

var appURLs = ["picturepile.js", "hello.js", "mousetest2.js", "fancy.js", 
               "cliptest.js", "masktest.js", "mousetest.js"];
var url;
url = baseURL+"images/skulls.png";
// TODO not loving autosize... any ideas??
// because image download is async... if we want to manually
// control size for stretchy backgrounds... the size being auto set
// based on image dimensions doesn't really work out
var bg = scene.createImage({url:url,xStretch:2,yStretch:2,parent:root,
                            autoSize:false});

url = baseURL+"images/radial_gradient.png";
var bgShade = scene.createImage({url:url,xStretch:1,yStretch:1,parent:root,
                                autoSize:false});

var childPad = 32;
var childAppWidth = 1280;
var childAppHeight = 720;
var childAcross = 2;

var apps = scene.createImage({parent:root, sx:0.25, sy:0.25, w:1280, h:720});

for (var i = 0; i < appURLs.length; i++) {
    scene.createScene({url:baseURL+appURLs[i], parent:apps, 
                       w:childAppWidth, h:childAppHeight, clip:true,
                       x:((i%childAcross)*(childAppWidth+childPad))+childPad, 
                       y:(Math.floor(i/childAcross)*(childAppHeight+childPad))+
                       childPad});
}


//apps.painting=false;

scene.on('onKeyDown', function(e) {
  console.log("keydown:" + e.keyCode);
});

/*
scene.on("mousemove", function(x, y) {
    txt1.text = "" + x+ ", " + y;
});
*/

function updateSize(w, h) {
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.w, scene.h);
