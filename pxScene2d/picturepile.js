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

// clean up these names and expose as properties off of some object
var pxInterpLinear = 0;
var easeOutElastic = 1;
var easeOutBounce  = 2;
var exp2 = 3;
var pxStop = 4;

function randomInt(from, to) {
	var range = to-from;
	return Math.round(Math.random()*range + from);
}

function getImageURL() {
    if (false) {
        var urls = [
	          "http://farm4.static.flickr.com/3307/5767175230_b5d2bf2312_z.jpg",
	          "http://farm6.static.flickr.com/5263/5793867021_3e1d5d3aae_z.jpg",
	          "http://farm3.static.flickr.com/2454/3594278573_500f415e39_z.jpg",
	          "http://farm3.static.flickr.com/2415/2087329111_dd29709847.jpg"
	      ];
        return urls[randomInt(0,urls.length-1)];
    }
    else {
        var urls = [
	          "images/flower1.jpg",
	          "images/flower2.jpg",
	          "images/flower3.jpg",
	          "images/dolphin.jpg",
	      ];
	      return baseURL + urls[randomInt(0,urls.length-1)];
    }
}

var numPictures = 0;

function doIt() {

    // create an object to group some other objects
    var pictures = scene.createImage();;
    pictures.parent = root;
    
    var urlIndex = 0;
    
    function newPicture() {
	
        var url = getImageURL();
	
        function animateIn(o) {
            o.animateTo({x:randomInt(100, 300),y:randomInt(0,100),
                         r:randomInt(-15,15),sx:0.75,sy:0.75}, 
                        1, pxStop, 0,
                        function() {
                            if (pictures.numChildren > 10) {
                                var f = pictures.getChild(0);
                                f.animateTo({a: 0}, 0.75, 0, 0, 
                                            function(f) {
                                                f.remove();
                                            });
                            }
                            newPicture();
                        });
        }


        var picture = scene.createImage({onReady:animateIn,
                                         parent: pictures, x: -1000, 
                                         y:randomInt(-200, 800), cx: 200, 
                                         cy: 200, sx: 2, sy: 2, 
                                         r: randomInt(-45,45), url:url,
					 onReady:function(e){animateIn(e.target);}
                                        });
    }

    newPicture();
}



scene.on('onKeyDown', function(e) {
  console.log("keydown:" + e.keyCode);
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


doIt();



