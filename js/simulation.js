
class Simulation {

  constructor(gctx) {
    this.gctx = gctx;
    this.cities = [];
    this.buses = [];
    this.debug = false;
    this.logs = [];
    this.globalLogs = [];
    this.stop = false;
    this.logOffsetY = 120;
    this.logOffsetX = 10;
    this.informationLabel = new Label(10, 10, this.cities.length, "rgba(192,192,192,0.8)");
  }

  updateCitiesList(citiesJSON) {
    var spacing = this.gctx.width / (citiesJSON.length);
    var x = 30;
    var i = 0;
    for (i = 0; i < citiesJSON.length; i++) {
      this.cities.push(new City(x, 50, citiesJSON[i].name, citiesJSON[i].population, this))
      x += spacing;
    };
    this.informationLabel.name = this.cities.length;
    this.buses = [new Bus(this.cities,this.gctx,0,50,true,this), new Bus(this.cities,this.gctx,this.gctx.width,50,false,this)];
  }

  drawCities() {
    this.cities.forEach(function(city) {
      city.draw();
      //ver.allowedRange.draw();
    });
  }

  drawBuses() {
    this.buses.forEach(function(bus) {
      bus.draw();
    });
  }

  drawLabels() {
    this.informationLabel.draw();
  }

  updateCities() {
    this.cities.forEach(function(city) {
      city.update();
    });
  }

  updateBuses() {
    this.buses.forEach(function(bus) {
      bus.update();
    });
  }

  drawDebug() {
    this.cities.forEach(function(city) {
      city.drawDebug();
    });
  }

  draw() {
    this.drawCities();
    this.drawBuses();
    this.drawLabels();
    this.drawLog();
    if (this.debug) {
      this.drawDebug();
    }
  }

  clear() {
    this.cities = [];
    this.buses = [];
    this.logs = [];
    this.stop = false;
    startAnimating();
  }
  
  update() {
    this.updateCities();
    this.updateBuses();
  }

  saveData() {
    return JSON.stringify(this.globalLogs);
  }

  log(message) {
    this.logs.push(new Label(this.logOffsetX, this.logOffsetY, message));
    this.logOffsetY = this.logOffsetY + 20;
  }

  finish() {
    this.cities.forEach(function(city) {
      city.saveLog();
    });
    this.stop = true;
  }

  drawLog() {
    this.logs.forEach(function(l) {
      l.draw();
    })
  }

}
