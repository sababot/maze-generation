var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = Math.round((window.innerHeight - 100) / 100) * 100;
canvas.height = Math.round((window.innerHeight - 100) / 100) * 100;

document.addEventListener("keydown", doKeyDown, true);

function Cell(x, y, fixed, visited, main){
    this.x = x;
    this.y = y;
    this.fixed = fixed;
    this.visited = visited;
    this.main = main;

    this.draw = function(){
        c.rect(this.x, this.y, 50, 50);

        if (this.fixed){
            c.fillStyle = "#ff6063";
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


// Init
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

function return_neighbours(k){
    var neighbours = [];

    if ((k + 1) % boxHeight != 0){
        if (boxArray.length - 1 >= (k + 1) && (k + 1) >= 0){
            if (boxArray[k + 1].visited == false && boxArray[k + 1].fixed == false){
                neighbours.push(k + 1);
            }
        }
    }

    if (k % boxHeight != 0){
        if(boxArray.length - 1 >= (k - 1) && (k - 1) >= 0){
            if (boxArray[k - 1].visited == false && boxArray[k - 1].fixed == false){
            neighbours.push(k - 1);
             }
        }
    }

    if(boxArray.length - 1 >= (k + boxHeight) && (k + boxHeight) >= 0){
        if (boxArray[k + boxHeight].visited == false && boxArray[k + boxHeight].fixed == false){
            neighbours.push(k + boxHeight);
        }
    }

    if(boxArray.length - 1 >= (k - boxHeight) && (k - boxHeight) >= 0){
        if (boxArray[k - boxHeight].visited == false && boxArray[k - boxHeight].fixed == false){
            neighbours.push(k - boxHeight);
        }
    }

    return neighbours;
}

var trail = [];
var fixed = [];

function generate_maze(){
    boxArray[main].visited = true;
    var neighbours = return_neighbours(main);

    if (neighbours.length != 0){
        var direction = Math.floor((Math.random() * neighbours.length) + 1);

        trail.push(main);
        main = neighbours[direction - 1];
        boxArray[main].main = true;

        if (trail[trail.length - 1] == main - 1){
            linesX[main].show = false;
        }

        else if (trail[trail.length - 1] == main + 1){
            linesX[main + 1].show = false;
        }

        else if (trail[trail.length - 1] == main - boxHeight){
            linesY[main].show = false;
        }

        else if (trail[trail.length - 1] == main + boxHeight){
            linesY[main + 14].show = false;
        }
    }

    else{
        boxArray[main].fixed = true;
        main = trail[trail.length - 1];
        boxArray[main].main = false;
        boxArray[main].fixed = true;
        trail.pop();
       }

    for (var i = 0; i < boxArray.length; i++){
        if (i != main){
            boxArray[i].main = false;
        }
    }

    console.log(trail);
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

function doKeyDown(e) {
    requestAnimationFrame(animate);
}

// change it so that in the current iteration, main is not set to visited, the last main is set to visited