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

	const petalColour = '#fedee2';
	const centerColour = '#e72262';

	const rot = (cx, cy, x, y, angle) => {
	    const radians = (Math.PI / 180) * angle;
	    const cos = Math.cos(radians);
	    const sin = Math.sin(radians);
	    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
	    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
	    
	    return [nx, ny];
	};

	const randomRange = (min, max) => {
	    return min + Math.random() * (max - min);
	};

	const petalCount = 5;
	const petalRadius = radius / 2;
	const petalRot = 360 / petalCount;


	let point = rot(x, y, x, y + petalRadius, randomRange(0, 360));
	
	for (let i = 0; i < petalCount; i++) {
	    ctx.beginPath();
	    ctx.arc(point[0], point[1], petalRadius, 0, 2 * Math.PI);
	    ctx.fillStyle = petalColour;
	    ctx.shadowColor = "rgba(0, 0, 0, .05)";
	    ctx.shadowBlur = 6;
	    ctx.fill();
	    
	    point = rot(x, y, point[0], point[1], petalRot);
	}
    }
}

export default Flower;
