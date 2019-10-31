

var myGamePiece = ["", "", ""];
var myPlayer;
var remaining;
var rats = 0;
var round=1;

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[3]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.type = type;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;

    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    colide();
    myGameArea.clear();
    npcMovement();
    changePosition();
    myPlayer.newPos();
    myPlayer.update();
    remaining.text = "Remaining rats:" + rats;
    remaining.update();



}

function colide() {
    for (var i = 0; i < 3; i++) {
        if (myPlayer.crashWith(myGamePiece[i])) {
            myGamePiece[i].x= -50;
            if (rats == round) {
                myGameArea.stop();
                round++;
            }
            rats=rats+1;
        }
    }
}

function npcMovement() {
    for (var i = 0; i < myGamePiece.length; i++) {
        var change = Math.random() * 1;
        if (myGamePiece[i].x <= 480) {
            myGamePiece[i].x += change;
        } else {
            myGamePiece[i].x = -change;
        }
        if (myGamePiece[i].y <= 280) {
            myGamePiece[i].y += change;
        } else {
            myGamePiece[i].y = -change;
        }
        myGamePiece[i].update();
    }
}

function changePosition() {
    myPlayer.speedX = 0;
    myPlayer.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) { myPlayer.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) { myPlayer.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) { myPlayer.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) { myPlayer.speedY = 1; }
}


function startGame() {
    //debugger;
    myGameArea.start();
    //window.alert("loaded the game");
    myGamePiece[0] = new component(10, 10, "red", 10, 0);
    myGamePiece[1] = new component(10, 10, "red", 10, 50);
    myGamePiece[2] = new component(10, 10, "red", 10, 130);
    myPlayer = new component(15, 15, "blue", 400, 20);
    remaining = new component("15px", "Consolas", "black", 340, 10, "text");

}