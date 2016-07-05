function getFormValues() {
	console.log(document.getElementById("first").value + " " + document.getElementById("last").value);
}

function changeColor() {
	var red = document.getElementById("color-div")
	red.classList.add('color-red');
}


var screen = document.getElementById("screen");
var image = document.getElementById("image");
var lightbox = document.getElementById("lightbox");

function toggleImage() {
	screen.classList.add("lightbox-bg");
	image.classList.add("lightbox-contents");
	lightbox.classList.remove("lightbox");
}

function disappear() {
	screen.classList.remove("lightbox-bg");
	image.classList.remove("lightbox-contents");
	lightbox.classList.add("lightbox");
}


document.getElementById("name-btn").onclick = function() {
	getFormValues();
};
document.getElementById("color-btn").onclick = function() {
	changeColor();
}
document.getElementById("image-btn").onclick = function() {
	toggleImage();
}
document.getElementById("screen").onclick = function() {
	disappear();
}
