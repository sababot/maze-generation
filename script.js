var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, barrier){
    this.x = x;
    this.y = y;
    this.barrier = barrier;

    this.draw = function(){
        c.beginPath();
        c.rect(this.x, this.y, 50, 50);
        if (this.barrier){
            c.fillStyle = "black";
        }
        else{
            c.fillStyle = "white";
        }
        c.fill();
        c.stroke();
    }
}

var boxArray = [];
for (var y = (canvas.height - 100) / 50; y > 0; y--){
    for (var x = (canvas.width - 100) / 50; x > 0; x--){
        boxArray.push(new Particle(x * 50, y * 50, false));
    }
}

function generate_maze(){
    // Code
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < boxArray.length; i++){
        boxArray[i].draw();
    }
}

animate();