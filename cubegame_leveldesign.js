const board_border = 'black';
let dx = 0;
let dy = 0;
const board_background = "white";
const cube_col = 'lightblue';
const cube_border = 'darkblue';
const cubeBoard = document.getElementById("cubeBoard");

let start = {
    x: 0,
    y: 0
}

const keys = [{
    id: 1,
    x: 0,
    y: 0
}]

const doors = [{
    nb: 1,
    x: 20,
    y: 20,
    open: false
}]

const boost = []

const finalZone = {
    x: 0,
    y: 0
}

const mur = [{
    x: 0,
    y: 10
}]

const teleporteur = [{
    x: 0,
    y: 20
}]

var cubePerso = {
    x: 100,
    y: 210
}

let changing_direction = false;

const cube_ctx = cubeBoard.getContext("2d");
let tick = 0;
document.addEventListener("keydown", change_direction);
main();

function main() {
    clear_board();
    draw_cube();
    setTimeout("main", 100)

}

function draw_cube() {
    cube_ctx.fillStyle = '#0000ff';

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
        cube_ctx.fillStyle = 'red';

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
    for (var i = 0; i < doors.length; i++) {
        if (doors[i].open) {
            console.log("2")
            cube_ctx.fillStyle = 'white';

            cube_ctx.strokestyle = 'black';

            cube_ctx.fillRect(doors[i].x, doors[i].y, 10, 10)

            cube_ctx.strokeRect(doors[i].x, doors[i].y, 10, 10)
        } else {
            console.log("1")
            cube_ctx.fillStyle = 'red';

            cube_ctx.strokestyle = 'black';

            cube_ctx.fillRect(doors[i].x, doors[i].y, 10, 10)

            cube_ctx.strokeRect(doors[i].x, doors[i].y, 10, 10)
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
    draw_quadrillage()
    draw_doors();
    draw_keys();
}

function draw_quadrillage() {

    cube_ctx.strokestyle = board_border;
    for (var i = 0; i < cubeBoard.width; i = i + 10) {
        cube_ctx.strokeRect(i, 0, cubeBoard.width, cubeBoard.height)
    }
    for (var i = 0; i < cubeBoard.height; i = i + 10) {
        cube_ctx.strokeRect(0, i, cubeBoard.width, cubeBoard.height)
    }

}

function change_direction(event) {
    const LEFT_KEY = 81;
    const RIGHT_KEY = 68;
    const UP_KEY = 90;
    const DOWN_KEY = 83;
    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY && cubePerso.x > 0) {
        dx = -10;
        dy = 0;
    } else if (keyPressed === UP_KEY && cubePerso.y > 0) {
        dx = 0;
        dy = -10;
    } else if (keyPressed === RIGHT_KEY && cubePerso.x < 800) {
        dx = 10;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && cubePerso.y < 600) {
        dx = 0;
        dy = 10;
    } else {
        dy = 0;
        dx = 0;
    }
    /* TOUCHES ET EFFETS 
        t => teleporteur
        b => spawn
        del => mur
        suppr => reset le bloc
        f => zone d'arrivée       
        
    */
    if (keyPressed === 8) { // backspace
        for (var i = 0; i < mur.length; i++) {
            if (mur[i].x == cubePerso.x && mur[i].y === cubePerso.y) {} else {
                mur.push({
                    x: cubePerso.x,
                    y: cubePerso.y
                })
                break;
            }
        }
    }
    if (keyPressed === 84) { // t
        for (var i = 0; i < teleporteur.length; i++) {
            if (teleporteur[i].x == cubePerso.x && teleporteur[i].y === cubePerso.y) {} else {
                teleporteur.push({
                    x: cubePerso.x,
                    y: cubePerso.y
                })
                break;
            }
        }
    }
    if (keyPressed === 70) { // f
        finalZone.x = cubePerso.x;
        finalZone.y = cubePerso.y;
    }
    if (keyPressed === 66) { // b
        start.x = cubePerso.x;
        start.y = cubePerso.y
    }
    if (keyPressed === 13) { // enter
        display_level()
    }
    if (keyPressed === 80) { // p 
        for (var i = 0; i < doors.length; i++) {
            if (doors[i].x == cubePerso.x && doors[i].y === cubePerso.y) {} else {
                var id_porte = prompt("Quelle est le numéro de la porte ?", doors.length + 1)
                doors.push({
                    nb: id_porte,
                    x: cubePerso.x,
                    y: cubePerso.y,
                    open: false
                })
                break;
            }
        }
    }
    if (keyPressed === 75) { // k
        for (var i = 0; i < mur.length; i++) {
            if (mur[i].x == cubePerso.x && mur[i].y === cubePerso.y) {
                mur.splice(i, 1)
                break;
            }
        }
        for (var i = 0; i < teleporteur.length; i++) {
            if (teleporteur[i].x == cubePerso.x && teleporteur[i].y === cubePerso.y) {
                teleporteur.splice(i, 1)
                break;
            }
        }
    }
    if (keyPressed === 46) { // delete
        for (var i = 0; i < mur.length; i++) {
            if (mur[i].x == cubePerso.x && mur[i].y === cubePerso.y) {
                mur.splice(i, 1)
                break;
            }
        }
        for (var i = 0; i < teleporteur.length; i++) {
            if (teleporteur[i].x == cubePerso.x && teleporteur[i].y === cubePerso.y) {
                teleporteur.splice(i, 1)
                break;
            }
        }
    }
    cubePerso.x = cubePerso.x + dx;
    cubePerso.y = cubePerso.y + dy;

    main();
}

function wall_touched() {
    for (var i = 0; i < mur.length; i++) {
        if (cubePerso.x + dx == mur[i].x && cubePerso.y + dy == mur[i].y) return true
    }
}

function teleport() {
    for (var i = 0; i < teleporteur.length; i++) {
        if (cubePerso.x == teleporteur[i].x && cubePerso.y == teleporteur[i].y) {
            if (i == 0) {
                cubePerso.x = teleporteur[1].x;
                cubePerso.y = teleporteur[1].y;
            } else {
                cubePerso.x = teleporteur[0].x;
                cubePerso.y = teleporteur[0].y;
            }
        }
    }
}

function door_touched() {
    for (var i = 0; i < doors.length; i++) {
        if (cubePerso.x + dx == doors[i].x && cubePerso.y + dy == doors[i].y && !doors[i].open) return true
    }
}


function DoorsOpenning() {
    for (var i = 0; i < keys.length; i++) {
        if (cubePerso.x == keys[i].x && cubePerso.y == keys[i].y) {
            doors[doors.findIndex(doors => doors.nb == keys[i].id)].open = true;
            console.log(`openning ${doors.findIndex(doors => doors.nb == keys[i].id)+1} door`)
        }
    }
}

function win() {
    if (cubePerso.x == finalZone.x && cubePerso.y == finalZone.y) return true
}

function put_Key() {

}

function display_level() {
    let murs = "murs:\n";
    let teleporteurs = "teleporteurs:\n ";
    let portes = "portes \n ";
    for (var i = 1; i < mur.length; i++) {
        murs += `   {x: ${mur[i].x},y: ${mur[i].y} }, \n`
    }
    for (var i = 0; i < teleporteur.length; i++) {
        teleporteurs = teleporteurs + `{x: ${teleporteur[i].x},y: ${teleporteur[i].y} }, \n`
    }
    for (var i = 0; i < doors.length; i++) {
        portes = portes + `{c: ${doors[i].x}}`
    }

    console.log(murs)
    console.log(teleporteurs)
    console.log(`start:\n {x: ${start.x},y: ${start.y} }`)
    console.log(`zone finale:\n {x: ${finalZone.x},y: ${finalZone.y} }`)
}