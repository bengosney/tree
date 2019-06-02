import Context from './Context';

class Petal {
    constructor(x, y, radius, cx, cy) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.cx = cx;
	this.cy = cy;
    }

    draw() {
	const ctx = Context.get();
	const { x, y, radius, cx, cy } = this;

	const rot = (cx, cy, x, y, angle, degrees = true) => {
	    const radians = degrees ? (Math.PI / 180) * angle : angle;
	    const cos = Math.cos(radians);
	    const sin = Math.sin(radians);
	    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
	    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
	    
	    return [nx, ny];
	};

	const pointOnArc = (cx,cy,radius,radianAngle) => {
	    const x = cx + radius * Math.cos(radianAngle);
	    const y = cy + radius * Math.sin(radianAngle);

	    return [x, y];
	};

	const randomRange = (min, max) => {
	    return min + Math.random() * (max - min);
	};

	const a = Math.atan2(y - cy, x - cx);
	const m = 90 * (Math.PI / 180);

	const r = radius * 0.7; // * randomRange(0.65, 0.8);

	const p1 = pointOnArc(x, y, r, a - m);
	const p2 = pointOnArc(x, y, r, a + m);

	const mainColour = '#fedee2';
	const grd = ctx.createRadialGradient(cx, cy, r, cx, cy, 0);

	grd.addColorStop(0, mainColour);
	grd.addColorStop(1, '#fff');
	
	
	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.lineTo(p1[0], p1[1]);
	ctx.lineTo(p2[0], p2[1]);
	ctx.lineTo(cx, cy);
	ctx.arc(x, y, r, a - m, a + m);
	ctx.fillStyle = grd;
	ctx.shadowColor = "rgba(0, 0, 0, .05)";
	ctx.shadowBlur = radius * 3;
	ctx.fill();
    }
}

export default Petal;
