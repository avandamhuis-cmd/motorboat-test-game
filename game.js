const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
let money = 1000;
const boatCost = 700;
let onBoat = false;

// Player
let player = { x: 400, y: 500, width: 30, height: 30, speed: 3 };

// Island (organic polygon)
const island = {
    points: [
        {x:220,y:200},{x:300,y:160},{x:400,y:150},{x:500,y:180},
        {x:550,y:250},{x:500,y:320},{x:400,y:350},{x:300,y:300},
        {x:250,y:250},{x:230,y:220}
    ]
};

// Dock (stone dock polygon)
const dock = {
    points: [
        {x:370,y:300},{x:430,y:300},{x:430,y:320},{x:370,y:320}
    ]
};

// Motorboat
let boat = {
    x: 400,
    y: 320,
    width: 60,
    height: 30,
    angle: 0,
    speed: 0,
    maxSpeed: 3,
    turnSpeed: 0.03,
    gunAngle: 0,
    ammo: 30
};

let bullets = [];
let mouse = { x: 0, y: 0 };
const keys = {};

// Event listeners
window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// Fire gun
window.addEventListener("keydown", e => {
    if(e.key === " " && onBoat && boat.ammo > 0){
        bullets.push({
            x: boat.x + Math.cos(boat.angle) * boat.width/2,
            y: boat.y + Math.sin(boat.angle) * boat.width/2,
            angle: boat.gunAngle,
            speed: 7
        });
        boat.ammo--;
        if(boat.ammo === 0) boat.ammo = 30; // infinite resupply
    }
});

// Enter boat
window.addEventListener("keydown", e => {
    if(e.key.toLowerCase() === "e" && !onBoat){
        // Check if player near dock
        const px = player.x + player.width/2;
        const py = player.y + player.height/2;
        const inDock = px > 370 && px < 430 && py > 300 && py < 320;
        if(inDock && money >= boatCost){
            money -= boatCost;
            onBoat = true;
            player.x = boat.x;
            player.y = boat.y;
        }
    }
});

// Helper: point-in-polygon collision
function pointInPolygon(x, y, polygon){
    let inside = false;
    for(let i=0,j=polygon.points.length-1;i<polygon.points.length;j=i++){
        const xi = polygon.points[i].x, yi = polygon.points[i].y;
        const xj = polygon.points[j].x, yj = polygon.points[j].y;
        const intersect = ((yi>y)!=(yj>y)) && (x < (xj-xi)*(y-yi)/(yj-yi)+xi);
        if(intersect) inside = !inside;
    }
    return inside;
}

// Game loop
function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Water
    ctx.fillStyle = "#1e90ff";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Island
    ctx.fillStyle = "#228B22";
    ctx.beginPath();
    island.points.forEach((p,i)=>{
        if(i===0) ctx.moveTo(p.x,p.y);
        else ctx.lineTo(p.x,p.y);
    });
    ctx.closePath();
    ctx.fill();

    // Dock
    ctx.fillStyle = "#808080";
    ctx.beginPath();
    dock.points.forEach((p,i)=>{
        if(i===0) ctx.moveTo(p.x,p.y);
        else ctx.lineTo(p.x,p.y);
    });
    ctx.closePath();
    ctx.fill();

    // Player
    if(!onBoat){
        if(keys["arrowup"]) player.y -= player.speed;
        if(keys["arrowdown"]) player.y += player.speed;
        if(keys["arrowleft"]) player.x -= player.speed;
        if(keys["arrowright"]) player.x += player.speed;
        ctx.fillStyle = "red";
        ctx.fillRect(player.x,player.y,player.width,player.height);
    }

    // Boat physics
    if(onBoat){
        // Acceleration
        if(keys["w"]) boat.speed += 0.05;
        if(keys["s"]) boat.speed -= 0.05;

        // Limit speed
        if(boat.speed > boat.maxSpeed) boat.speed = boat.maxSpeed;
        if(boat.speed < -boat.maxSpeed/2) boat.speed = -boat.maxSpeed/2;

        // Turning
        if(keys["a"]) boat.angle -= boat.turnSpeed * boat.speed/boat.maxSpeed;
        if(keys["d"]) boat.angle += boat.turnSpeed * boat.speed/boat.maxSpeed;

        // Drag
        boat.speed *= 0.98;

        // Predict new position
        let newX = boat.x + Math.cos(boat.angle) * boat.speed;
        let newY = boat.y + Math.sin(boat.angle) * boat.speed;

        // Collision with island
        if(!pointInPolygon(newX, newY, island)){
            boat.x = newX;
            boat.y = newY;
        } else {
            boat.speed = 0; // stop boat when hitting island
        }
    }

    // Draw boat
    ctx.save();
    ctx.translate(boat.x, boat.y);
    ctx.rotate(boat.angle);
    ctx.fillStyle = "#888888"; // modern grey
    ctx.fillRect(-boat.width/2, -boat.height/2, boat.width, boat.height);
    ctx.restore();

    // Gun rotation (slow follow)
    const dx = mouse.x - boat.x;
    const dy = mouse.y - boat.y;
    const targetAngle = Math.atan2(dy, dx);
    boat.gunAngle += (targetAngle - boat.gunAngle) * 0.05;

    // Draw gun
    ctx.save();
    ctx.translate(boat.x, boat.y);
    ctx.rotate(boat.gunAngle);
    ctx.fillStyle = "black";
    ctx.fillRect(0, -5, 40, 10);
    ctx.restore();

    // Update bullets
    bullets.forEach((b,i)=>{
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(b.x,b.y,3,0,Math.PI*2);
        ctx.fill();
        if(b.x<0||b.x>canvas.width||b.y<0||b.y>canvas.height) bullets.splice(i,1);
    });

    // Display money and ammo
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Money: $" + money, 10, 25);
    if(onBoat) ctx.fillText("Ammo: " + boat.ammo, 10, 50);

    requestAnimationFrame(gameLoop);
}

gameLoop();
