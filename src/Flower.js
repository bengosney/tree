import Petal from './Petal';

class Flower {
    constructor(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
    }

    draw() {
	const { x, y, radius } = this;	

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
	const petalRadius = radius / 4;
	const petalRot = 360 / petalCount;


	let point = rot(x, y, x, y + petalRadius, randomRange(0, 360));
	
	for (let i = 0; i < petalCount; i++) {
	    const petal = new Petal(point[0], point[1], petalRadius, x, y);
	    petal.draw();
	    
	    point = rot(x, y, point[0], point[1], petalRot);
	}
    }
}

export default Flower;
