var app = {}

function startApp() {
	app.canvas = document.getElementById('canvas');
	app.ctx = canvas.getContext('2d');
	
	app.width = app.canvas.width;
	app.height = app.canvas.height;
	
	app.shipImage = new Image();
	app.shipImage.src = "Penguins.jpg";
	
	app.rockImage = new Image();
	app.rockImage.src = "Koala.jpg";
	
	app.explosionImage = new Image();
	app.explosionImage.src = "Chrysanthemum.jpg";
	
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
	
	var rock = app.rock;
	rock.pos.y += rock.speed * dt;
	if(rock.pos.y - rock.size > app.height) {
		spawnRock();
	}
	
	rock.checkHitHero(app.hero);
	
	drawScene();
}

function drawScene() {
	var ctx = app.ctx;
	ctx.fillStyle = "#000020";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	ctx.save();
	
	drawObject(app.hero);
	
	drawObject(app.rock);
}

function drawObject(obj) {
	var ctx = app.ctx;
	ctx.save();
	ctx.translate(obj.pos.x,obj.pos.y);
	ctx.drawImage(obj.image, -obj.size/2, -obj.size/2, obj.size, obj.size);
	ctx.restore();
}

function myMouseMove(event) {
	app.hero.pos.x = event.pageX;
	app.hero.pos.y = event.pageY;
}

function spawnRock() {
	app.rock = {
		pos: {x:Math.random() * app.width, y:Math.random() * -app.height},
		size: 120,
		speed: 150,
		color: "#FFFFFF",
		image: app.shipImage,
		checkHitHero: function(hero) {
			var dist = getDistance(hero, this);
			if(dist < 50) {
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
		color: "#FFFF00",
		image: app.rockImage
	};
}