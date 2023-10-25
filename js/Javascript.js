const navigation = document.getElementById("nav")

function popmenue(){
    navigation.style.right = "0";
}
function hidemenue(){
    navigation.style.right = "-300px";
}

function popup(){
    alert("Site under construction");
}

var slides = document.getElementById("slide");

var images = new Array(
    "art/er3.png",
    "art/er4.png",
    "art/guw1.png",
    "art/sam3.png",
    "art/sam5.png",
    "art/ross-rani.png",
    "art/dv1.png",
    "art/dv2.png"
);

var len = images.length;
var i =0;

function slideimg(){
    if (i == len){
        i=0;
    }
    slides.src = images[i];
    i++
    setTimeout('slideimg()', 2000);
}

