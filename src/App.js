import React, { Component } from 'react';
import './App.css';

import Noise from './Noise';
import Colour from './Colour';
import Tree from './Tree';

import Context from './Context';

class App extends Component {
    constructor(props) {
	super(props);

	this.state = {
	    pixelSize: 8,
	    height: 500,
	    width: 150,
	    lenth: 100,
	    range: 20,
	    yOffset: null	    
	};
	
	this.drawing = false;
	this.ctx = null;
	this.line = 

	this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	this.startts = this.getTS();
    }

    
    componentDidMount() {
	const canvas = this.refs.canvas;
	Context.set(canvas.getContext("2d", { alpha: false }));

	
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
	this.updateWindowDimensions();
	window.addEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
	const { innerWidth, innerHeight } = window;
	const { range } = this.state;

	const length = Math.floor(innerWidth / 2);
	const noise = new Noise(length, [-range, range]);

	this.setState({ width: innerWidth, height: innerHeight, noise: noise, length: length }, () => {
	    this.initObjects();
	    this.nextFrame();
	});
    }
    
    componentWillUnmount() {
	cancelAnimationFrame(this.rAF);
	window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateAnimationState() {
	this.ts = this.getTS();
	this.clearFrame();

	this.draw();
		
	//this.nextFrame();
    }

    nextFrame() {
	this.rAF = requestAnimationFrame(() => this.updateAnimationState());
    }

    clearFrame() {
	const { width, height } = this.state;
	const ctx = Context.get();

	const light = '#d1f2e8';
	const dark = '#6d7580';

	const _width = Math.max(750, width);
	const grd = ctx.createRadialGradient(0, 0, _width, width / 2, height / 2, 0);

	grd.addColorStop(1, light);
	grd.addColorStop(0, dark);
	
	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, width, height);
    }

    getTS() {
	const date = new Date();
	
	return date.getTime();
    }

    scale( value, r1, r2 ) { 
	return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
    }

    initObjects() {
	const { width, height } = this.state;

	const renderElements = [];

	const tree = new Tree(width / 2, height * .9, width * .8, height * .8);

	renderElements.push(tree);
	
	this.renderElements = renderElements;
    }

    draw() {
	this.renderElements.map(e => e.draw());
    }
        
    render() {
	const { width, height } = this.state;

        return (
	    <div>
              <div>
		<canvas ref="canvas" width={ width } height={ height } />
              </div>
            </div>
	);	
    }
}

export default App;
