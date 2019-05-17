import Context from './Context';
import noisyLine from './noisyLine';

class Tree {
    constructor(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    }

    draw() {
	const { x, y, width, height } = this;
	const ctx = Context.get();

	const s = .5;

	let cx = x;
	let cy = y;

	const maxLevels = 10;

	const getLength = (x1, y1, x2, y2) => {
	    const x = x1 - x2;
	    const y = y1 - y2;
	    
	    return Math.abs(Math.sqrt( x*x + y*y ));
	};

	const randomRange = (min, max) => {
	    return min + Math.random() * (max - min);
	};

	const getAngle = (x1, y1, x2, y2) => {
	    const y = y1 - y2;
	    const x = x1 - x2;
	    const theta = Math.atan2(x, y) * (180 / Math.PI);
	    
	    return theta + 90;
	};
	
	const drawLimb = (x1, y1, x2, y2, level = 0) => {
	    const line = new noisyLine(x1, y1, x2, y2, 10, .1);
	    
	    line.draw();	  

	    if (level !== maxLevels) {
		const _draw = (aMod) => {
		    const cx = x2;
		    const cy = y2;
		    const length = getLength(x1, y1, x2, y2) * s;
		    
		    const tx = x2;
		    const ty = y2 + length;
		    const ca = getAngle(x1, y1, x2, y2);
		    const a = ((ca - 90) + aMod + randomRange(-15, 15)) * (Math.PI / 180);
		    const nx = Math.cos(a) * (tx - cx) - Math.sin(a) * (ty - cy) + cx;
		    const ny = Math.sin(a) * (tx - cx) - Math.cos(a) * (ty - cy) + cy;

		    drawLimb(cx, cy, nx, ny, level + 1);
		};

		_draw(-45);
		_draw(45);
	    }
	};

	ctx.beginPath();
	
	drawLimb(cx, cy, cx, cy - (height * s));

	ctx.strokeStyle = '#3d3d3d';
	ctx.stroke();
    }    
}

export default Tree;
