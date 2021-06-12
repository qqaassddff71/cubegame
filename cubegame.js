var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");


var span = document.getElementsByClassName("close")[0];



//modal.style.display = "block";



span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
const board_border = 'black';
let dx = 0;
let dy = 0;
const board_background = "white";
const cube_col = 'lightblue';
const cube_border = 'darkblue';
const cubeBoard = document.getElementById("cubeBoard");
var can_teleport = true;

let changing_direction = false;

const keys = [
    { x: 10, y: 10, id: 1 }
]

let portes = [
    { x: 20, y: 10, nb: 1, open: false }
]


const cube_ctx = cubeBoard.getContext("2d");
let tick = 0;
document.addEventListener("keydown", change_direction);
main();

function main() {
    clear_board();
    teleport();
    drawCube();

}

function drawCube() {
    cube_ctx.fillStyle = cube_col;

    cube_ctx.strokestyle = cube_border;

    cube_ctx.fillRect(cubePerso.x, cubePerso.y, 10, 10)

    cube_ctx.strokeRect(cubePerso.x, cubePerso.y, 10, 10)

}

function draw_final() {
    cube_ctx.fillStyle = 'green';

    cube_ctx.strokestyle = 'black';

    cube_ctx.fillRect(finalZone.x, finalZone.y, 10, 10)

    cube_ctx.strokeRect(finalZone.x, finalZone.y, 10, 10)
}

function draw_walls() {
    for (var i = 0; i < mur.length; i++) {
        cube_ctx.fillStyle = '#808080';

        cube_ctx.strokestyle = 'black';

        cube_ctx.fillRect(mur[i].x, mur[i].y, 10, 10)

        cube_ctx.strokeRect(mur[i].x, mur[i].y, 10, 10)
    }
}

function draw_keys() {
    for (var i = 0; i < keys.length; i++) {
        cube_ctx.fillStyle = '#FFD700';

        cube_ctx.strokestyle = 'black';

        cube_ctx.fillRect(keys[i].x, keys[i].y, 10, 10)

        cube_ctx.strokeRect(keys[i].x, keys[i].y, 10, 10)
    }
}

function draw_doors() {
    for (var i = 0; i < portes.length; i++) {
        if (portes[i].open) {
            console.log("2")
            cube_ctx.fillStyle = 'white';

            cube_ctx.strokestyle = 'black';

            cube_ctx.fillRect(portes[i].x, portes[i].y, 10, 10)

            cube_ctx.strokeRect(portes[i].x, portes[i].y, 10, 10)
        } else {
            console.log("1")
            cube_ctx.fillStyle = 'red';

            cube_ctx.strokestyle = 'black';

            cube_ctx.fillRect(portes[i].x, portes[i].y, 10, 10)

            cube_ctx.strokeRect(portes[i].x, portes[i].y, 10, 10)
        }
    }
}

function draw_tp() {
    for (var i = 0; i < teleporteur.length; i++) {
        cube_ctx.fillStyle = 'purple';

        cube_ctx.strokestyle = 'black';

        cube_ctx.fillRect(teleporteur[i].x, teleporteur[i].y, 10, 10)

        cube_ctx.strokeRect(teleporteur[i].x, teleporteur[i].y, 10, 10)
    }
}

function clear_board() {

    cube_ctx.fillStyle = board_background;

    cube_ctx.strokestyle = board_border;

    cube_ctx.fillRect(0, 0, cubeBoard.width, cubeBoard.height);

    cube_ctx.strokeRect(0, 0, cubeBoard.width, cubeBoard.height);

    draw_walls();
    draw_final();
    draw_tp();
    draw_doors();
    draw_keys();
}

function change_direction(event) {
    const LEFT_KEY = 81;
    const RIGHT_KEY = 68;
    const UP_KEY = 90;
    const DOWN_KEY = 83;
    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;
    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY && cubePerso.x > 0 || keyPressed === LEFT_ARROW && cubePerso.x > 0) {
        dx = -10;
        dy = 0;
    } else if (keyPressed === UP_KEY && cubePerso.y > 0 || keyPressed === UP_ARROW && cubePerso.y > 0) {
        dx = 0;
        dy = -10;
    } else if (keyPressed === RIGHT_KEY && cubePerso.x < 790 || keyPressed === RIGHT_ARROW && cubePerso.x < 790) {
        dx = 10;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && cubePerso.y < 590 || keyPressed === DOWN_ARROW && cubePerso.y < 590) {
        dx = 0;
        dy = 10;
    } else {
        dy = 0;
        dx = 0;
    }

    if (!wall_touched() && !door_touched()) {
        cubePerso.x = cubePerso.x + dx;
        cubePerso.y = cubePerso.y + dy;
    }

    if (win()) {
        alert("tu as fini le niveau !")
    }
    DoorsOpenning();
    main();
}

function wall_touched() {
    for (var i = 0; i < mur.length; i++) {
        if (cubePerso.x + dx == mur[i].x && cubePerso.y + dy == mur[i].y) return true
    }
}

function door_touched() {
    for (var i = 0; i < portes.length; i++) {
        if (cubePerso.x + dx == portes[i].x && cubePerso.y + dy == portes[i].y && !portes[i].open) return true
    }
}


function DoorsOpenning() {
    for (var i = 0; i < keys.length; i++) {
        if (cubePerso.x == keys[i].x && cubePerso.y == keys[i].y) {
            portes[portes.findIndex(portes => portes.nb == keys[i].id)].open = true;
            console.log(`openning ${portes.findIndex(portes => portes.nb == keys[i].id)+1} door`)
        }
    }
}

function teleport() {
    for (var i = 0; i < teleporteur.length; i++) {
        if (cubePerso.x == teleporteur[i].x && cubePerso.y == teleporteur[i].y && can_teleport == true) {
            can_teleport = false;
            if (i % 2 == 0) {
                cubePerso.x = teleporteur[i + 1].x;
                cubePerso.y = teleporteur[i + 1].y;
            } else {
                cubePerso.x = teleporteur[i - 1].x;
                cubePerso.y = teleporteur[i - 1].y;
            }
        } else {
            can_teleport = true;
        }
    }
}

function win() {
    if (cubePerso.x == finalZone.x && cubePerso.y == finalZone.y) return true
}