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

	const pointOnArc = (cx,cy,radius,radianAngle) => {
	    const x = cx + radius * Math.cos(radianAngle);
	    const y = cy + radius * Math.sin(radianAngle);

	    return [x, y];
	};

	const pointOn = (x1, y1, x2, y2, per) => {
	    return [x1 + (x2 - x1) * per, y1 + (y2 - y1) * per];
	};

	const a = Math.atan2(y - cy, x - cx);
	const m = 90 * (Math.PI / 180);

	const r = radius; // * randomRange(0.65, 0.8);

	const p1 = pointOnArc(x, y, r, a - m);
	const p2 = pointOnArc(x, y, r, a + m);

	const ep = 5;
	const e1 = pointOn(cx, cy, p1[0], p1[1], ep);
	const e2 = pointOn(cx, cy, p2[0], p2[1], ep);

	const mainColour = '#fedee2';
	const fadeColour = '#fff7f8';
	const centerColour = '#ffff30';
	const grd = ctx.createRadialGradient(cx, cy, r * 2, cx, cy, 0);

	grd.addColorStop(0, mainColour);
	grd.addColorStop(0.75, fadeColour);
	grd.addColorStop(1, centerColour);
	
	
	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.lineTo(p1[0], p1[1]);
	ctx.bezierCurveTo(e1[0], e1[1], e2[0], e2[1], p2[0], p2[1]);
	ctx.lineTo(cx, cy);
	
	ctx.fillStyle = grd;
	ctx.shadowColor = "rgba(0, 0, 0, .05)";
	ctx.shadowBlur = radius * 3;
	ctx.fill();
    }
}

export default Petal;
