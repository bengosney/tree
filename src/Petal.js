import Context from './Context';

class Petal {
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
	ctx.shadowColor = "rgba(0, 0, 0, .05)";
	ctx.shadowBlur = radius * 3;
	ctx.fill();
    }
}

export default Petal;
