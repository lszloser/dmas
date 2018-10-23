
var graphCanvas = document.getElementById('graphCanvas');
var gctx = graphCanvas.getContext('2d');
var resetButton = document.getElementById("resetButton");
var cities = [];
var G = new Simulation(graphCanvas);


document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    cities = JSON.parse(e.target.result);
    G.updateCitiesList(cities.stops);
  };
  reader.readAsText(file);
}

function clearGraph() {
  gctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  gctx.fillRect(0,0,graphCanvas.width,graphCanvas.height);
}

resetButton.addEventListener('click', function(e) {
  //selectedCity = City.select(e);
  G.clear();
});

graphCanvas.addEventListener('keydown', function(e) {
  var code = e.key;
  switch (code) {
      case "z": G.edges.pop(); break; //Left key
      case "d": G.debug = !G.debug; break; //Up key
      case 39: alert("Right"); break; //Right key
      case 40: alert("Down"); break; //Down key
  }
}, false);


function draw() {
  G.draw();
}

function update() {
  G.update();
}

var fps, fpsInterval, startTime, now, then, elapsed;

startAnimating(30);

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  gctx.canvas.width  = window.innerWidth;
  animate();
}


function animate(newtime) {

  if (G.stop) {
    return;
  }
  clearGraph();
  update();
  draw();

  window.requestAnimationFrame(animate);

  now = newtime;
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
  }
}
