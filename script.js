var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = Math.round((window.innerHeight - 100) / 100) * 100;
canvas.height = Math.round((window.innerHeight - 100) / 100) * 100;

function Cell(x, y, barrier, visited, main){
    this.x = x;
    this.y = y;
    this.barrier = barrier;
    this.visited = visited;
    this.main = main;

    this.draw = function(){
        c.rect(this.x, this.y, 50, 50);

        if (this.barrier){
            c.fillStyle = "black";
        }

        else if (this.visited){
            c.fillStyle = "#72ff80";
        }

        else if (this.main){
            c.fillStyle = "#db72ff";
        }

        else{
            c.fillStyle = "#66a5ff";
        }

        c.fill();
    }
}

function lineX(x, y, show){
    this.x = x;
    this.y = y;
    this.show = show;

    this.draw = function(){
        if (this.show){
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x + 50, y);
            c.stroke();
        }
    }
}

function lineY(x, y, show){
    this.x = x;
    this.y = y;
    this.show = show;

    this.draw = function(){
        if (this.show){
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x, y + 50);
            c.strokeStyle = "black";
            c.stroke();
        }
    }
}

var boxHeight = canvas.height / 50;
var boxWidth = canvas.width / 50;

var linesX = [];
var linesY = [];

var boxArray = [];

for (var x = 0; x < boxWidth; x++){
    for (var y = 0; y < boxHeight; y++){
        boxArray.push(new Cell(x * 50, y * 50, false, false, false));
    }
}

for (var x = 0; x < boxWidth; x++){
    for (var y = 0; y < boxHeight; y++){
        linesX.push(new lineX(x * 50, y * 50, true));
    }
}

for (var x = 0; x < boxWidth; x++){
    for (var y = 0; y < boxHeight; y++){
        linesY.push(new lineY(x * 50, y * 50, true));
    }
}

var main = 0;

function generate_maze(){
    for (var i = 0; i < boxArray.length; i++){
        if (i == main){
            boxArray[i].main = true;
        }

        else{
            boxArray[i].main = false;
        }
    }

    if (main != boxArray.length){
        main++;
    }

    else{
        main = 0;
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < boxArray.length; i++){
        boxArray[i].draw();
        linesX[i].draw();
        linesY[i].draw();
    }
    generate_maze();
}

animate();