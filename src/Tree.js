import Context from './Context';
import noisyLine from './noisyLine';
import Flower from './Flower';

class Tree {
    constructor(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    }

    draw() {
	const { x, y, height } = this;
	const ctx = Context.get();

	let cx = x;
	let cy = y;

	const maxLevels = 4;

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

	const s = .45;

	const drawLimb = (x1, y1, x2, y2, level = 0) => {
	    const length = getLength(x1, y1, x2, y2);
	    const line = new noisyLine(x1, y1, x2, y2, 10, (length / 500));

	    const lineWidth = maxLevels - level;
	    
	    ctx.beginPath();
	    line.draw();
	    ctx.strokeStyle = '#3d3d3d';
	    ctx.lineWidth = lineWidth;
	    ctx.shadowColor = "rgba(0, 0, 0, .1)";
	    ctx.shadowBlur = lineWidth * 2;
	    ctx.stroke();	  
	    
	    if (level <= maxLevels) {
		const _draw = (aMod) => {
		    const cx = x2;
		    const cy = y2;
		    const length = getLength(x1, y1, x2, y2) * (s + randomRange(0, .2));
		    
		    const tx = x2;
		    const ty = y2 + (length * randomRange(1, .5));
		    const ca = getAngle(x1, y1, x2, y2);
		    const a = ((ca - 90) + aMod + randomRange(-15, 15)) * (Math.PI / 180);
		    const nx = Math.cos(a) * (tx - cx) - Math.sin(a) * (ty - cy) + cx;
		    const ny = Math.sin(a) * (tx - cx) - Math.cos(a) * (ty - cy) + cy;

		    drawLimb(cx, cy, nx, ny, level + 1);

		    if (level === maxLevels) {
			const flower = new Flower(nx, ny, randomRange(3, 6));
			flower.draw();
		    }
		};

		const m = .2;
		const minLimbs = 2;
		const maxLimbs = 5;

		const limbs = level === 0 ? maxLimbs : randomRange(minLimbs, maxLimbs);
		const diff = 90 / (limbs - 1);
		for (let i = 0 ; i < limbs ; i++) {
		    const a = -45 + (diff * i) * randomRange(1 + m, 1 - m);
		    _draw(a);
		}
	    }
	};

	const flowerOnly = false;
	if (flowerOnly) {
	    const f = new Flower(cx, cy / 2, height / 2);
	    f.draw();
	} else {
	    drawLimb(cx, cy, cx, cy - (height * s));
	}
    }    
}

export default Tree;
