import Context from './Context';

class Flower {
    constructor(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
    }

    draw() {
	const ctx = Context.get();
	const { x, y, radius } = this;

	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = '#fedee2';
	ctx.fill();
    }
}

export default Flower;
