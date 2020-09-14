class Ball{
    constructor(x, y, width){
        var ground_options = {
            restitution: 1,
            mass: 0.1
        }

        this.body = Bodies.circle(x, y, width, ground_options);
        this.width = width;
        World.add(world, this.body);
    }

    display(){
        var pos = this.body.position;
        fill(247,231,51);
        circle(pos.x, pos.y, this.width * 2, this.width * 2);
    }
}