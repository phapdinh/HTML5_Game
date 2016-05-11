var app = {}

function startApp() {
	app.canvas = document.getElementById('canvas');
	app.timer = document.getElementById('time');
	app.ctx = canvas.getContext('2d');
	
	app.width = app.canvas.width;
	app.height = app.canvas.height;
	
	app.shipImage = new Image();
	app.shipImage.src = "images/spaceship.png";
	
	app.rockImage = new Image();
	app.rockImage.src = "images/rock.png";
	
	app.explosionImage = new Image();
	app.explosionImage.src = "images/explosion.png";
	
	spawnHero();
	spawnRock();
	
	app.canvas.addEventListener('mousemove',myMouseMove,false);
	app.lastTime = window.performance.now();
	window.requestAnimationFrame(frameUpdate);
}

function frameUpdate(timestamp) {
	window.requestAnimationFrame(frameUpdate);
	var dt = (timestamp - app.lastTime)/1000;
	app.lastTime = timestamp;
	app.timer.innerHTML = "Time Counter " + Math.floor(timestamp / 1000) + ' seconds';
	
	var rock = app.rock;
	var rock2 = app.rock2;
	var rock3 = app.rock3;
	var rock4 = app.rock4;
	rock.pos.y += rock.speed * dt;
	rock2.pos.y += rock.speed * dt;
	rock3.pos.y += rock.speed * dt;
	rock4.pos.y += rock.speed * dt;
	rock.speed++;
	rock2.speed++;
	rock3.speed++;
	rock4.speed++;
	
	if(rock4.pos.y > app.height) {
		spawnRock();
	}
	
	rock.checkHitHero(app.hero);
	rock2.checkHitHero(app.hero);
	rock3.checkHitHero(app.hero);
	rock4.checkHitHero(app.hero);
	
	drawScene();
}

function drawScene() {
	var ctx = app.ctx;
	ctx.fillStyle = "#000020";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	ctx.save();
	
	drawObject(app.hero);
	
	drawObject(app.rock);
	drawObject(app.rock2);
	drawObject(app.rock3);
	drawObject(app.rock4);
}

function drawObject(obj) {
	var ctx = app.ctx;
	ctx.save();
	ctx.translate(obj.pos.x,obj.pos.y);
	ctx.drawImage(obj.image, -obj.size/2, -obj.size/2, obj.size, obj.size);
	ctx.restore();
}

function myMouseMove(event) {
	app.hero.pos.x = event.pageX - document.body.offsetWidth/5;
	app.hero.pos.y = event.pageY;
}

function spawnRock() {
	app.rock = {
		pos: {x:Math.floor(Math.random() * app.width), y: -100},
		size: 120,
		speed: 240,
		image: app.rockImage,
		checkHitHero: function(hero) {
			var dist = getDistance(hero, this);
			if(dist < 80) {
				hero.state = 'exploded';
				app.state = 'done';
				hero.image = app.explosionImage;
			}
		}
	}
	
	app.rock2 = {
		pos: {x:Math.floor(Math.random() * app.width), y:0},
		size: 120,
		speed: 240,
		image: app.rockImage,
		checkHitHero: function(hero) {
			var dist = getDistance(hero, this);
			if(dist < 80) {
				hero.state = 'exploded';
				app.state = 'done';
				hero.image = app.explosionImage;
			}
		}
	}
	
	app.rock3 = {
		pos: {x:Math.floor(Math.random() * app.width), y:-200},
		size: 120,
		speed: 240,
		image: app.rockImage,
		checkHitHero: function(hero) {
			var dist = getDistance(hero, this);
			if(dist < 80) {
				hero.state = 'exploded';
				app.state = 'done';
				hero.image = app.explosionImage;
			}
		}
	}
	
	app.rock4 = {
		pos: {x:Math.floor(Math.random() * app.width), y:-300},
		size: 120,
		speed: 240,
		image: app.rockImage,
		checkHitHero: function(hero) {
			var dist = getDistance(hero, this);
			if(dist < 80) {
				hero.state = 'exploded';
				app.state = 'done';
				hero.image = app.explosionImage;
			}
		}
	}
}

function getDistance(obj1, obj2) {
	var dx = obj1.pos.x - obj2.pos.x;
	var dy = obj1.pos.y - obj2.pos.y;
	return Math.sqrt(dx*dx + dy*dy);
}

function spawnHero() {
	app.hero = {
		pos: {x:400, y:400},
		size: 60,
		image: app.shipImage
	};
}