class Bullet{
    constructor(x, y, width, height, angle, force){
        var bullet_options = {

        }

        this.body = Bodies.rectangle(x, y, width, height, bullet_options);
        this.width = width;
        this.height = height;
        this.image = loadImage("sprites/Shell.png");
        Matter.Body.setAngle(this.body, PI/360 * angle);
        Matter.Body.setVelocity(this.body,{x: force * -3, y: force * -1});
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
}