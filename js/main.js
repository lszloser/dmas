
var graphCanvas = document.getElementById('graphCanvas');
var gctx = graphCanvas.getContext('2d');
var resetButton = document.getElementById("resetButton");
var saveButton = document.getElementById("saveButton");
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
    console.log(cities);
    G.updateCitiesList(cities.stops);
  };
  reader.readAsText(file);
  this.value = null;
}

function clearGraph() {
  gctx.fillStyle = 'rgba(255, 255, 255, 1)';
  gctx.fillRect(0,0,graphCanvas.width,graphCanvas.height);
}

resetButton.addEventListener('click', function(e) {
  //selectedCity = City.select(e);
  console.log("CLEAR");
  G.clear();
});

saveButton.addEventListener('click', function(e) {
  download(G.saveData(), 'json.txt', 'text/plain');
});

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

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
