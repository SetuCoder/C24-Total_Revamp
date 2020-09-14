class TankTurret{
    constructor(x, y, width, height){
        var turret_options = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, width, height, turret_options);
        this.width = width;
        this.height = height;
        this.image = loadImage("sprites/Turret.png");
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        fill(180, 0, 250);
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);  
        pop();
    }

    rotateUp(){
        Matter.Body.setAngle(this.body, this.body.angle + PI/360);
        Matter.Body.translate(this.body, {x: 0.25, y: -0.35});
    }

    rotateDown(){
        Matter.Body.setAngle(this.body, this.body.angle - PI/360);
        Matter.Body.translate(this.body, {x: -0.25, y: 0.35});
    }
}