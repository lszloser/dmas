
class Bus {

  constructor(stops,gctx,x,y,goesRight,simulation) {
    this.stops = stops;
    this.simulation = simulation;
    this.currentStop = null;
    this.stopsVisited = 0;
    this.currentSpeed = 0;
    this.goesRight = goesRight;
    this.maxSpeed = goesRight ? 1 : -1;
    this.acceleration = 0.001;
    this.size = 50;
    this.people = 0;
    this.leaving = 0;
    this.logData = { stopName : "", passengersBefore : 0, peopleWaiting : 0, peopleLeft : 0, PeopleEntered : 0, PeopleNotEntered : 0 };
    this.x = x;
    this.y = y;
    this.ctx = gctx.getContext('2d');
    this.img = new Image();
    this.img.src = "assets/bus2.png";
    this.label = new Label(this.x+10, this.y+20, this.people);
    this.state = "GO";
  }

  updateParams() {
    if (this.goesRight) {
      this.currentSpeed = this.currentSpeed < (this.maxSpeed - 0.01*this.people) ? this.currentSpeed += this.acceleration : this.currentSpeed;
    }
    else {
      this.currentSpeed = this.currentSpeed > (this.maxSpeed + 0.01*this.people) ? this.currentSpeed -= this.acceleration : this.currentSpeed;
    } 
  }

  isFinished() {
    return (this.x < 0 || this.x > this.ctx.width)
  }

  draw() {
    this.label.draw();
    this.drawImage();
  }

  spaceLeft() {
    return this.size - this.people;
  }

  closestStop() {
    return this.stops.length > 0 ? this.stops.map(stop => [Math.abs(stop.x-this.x), stop]).sort((a, b) => { return a[0] - b[0]; })[0] : null;
  }

  drawImage() {
    this.ctx.drawImage(this.img,this.x,this.y, 26, 10);
  }

  update() {
    if (this.state == "GO") {
      this.x += this.currentSpeed;
      this.checkCity();
    }
    if (this.state == "LOAD") {
      this.loadPeople();
    }
    if (this.state == "UNLOAD") {
      this.unloadPeople();
    }
    this.label.update(this.x+10,this.y+20,this.people);
    this.updateParams();
    if (this.isFinished()) {
      this.simulation.finish();
      this.stop();
    }
    this.draw();
  }

  checkCity() {
    let distance, city;
    [ distance, city ] = this.closestStop() || [];
    if (distance < 3 && this.currentStop != city) {
      this.currentSpeed = 0;
      this.currentStop = city;
      this.logData.stopName = this.currentStop.name;
      this.logData.passengersBefore = this.people;
      this.leaving = Math.round(this.people * Math.random());
      this.logData.peopleLeft = this.leaving;
      this.logData.peopleWaiting = this.currentStop.waitingCount;
      this.state = "UNLOAD";
    }
  }

  unloadPeople() {
    this.logData.PeopleEntered = 0;
    if (this.leaving > 0) {
      this.people--;
      this.leaving--;
      this.currentStop.updatePopulation(-1);
    }
    else {
      this.state = "LOAD";
    }
  }

  loadPeople() {
    if ((this.spaceLeft() <= 0 ) || (this.currentStop.waitingCount <= 0)) {
      this.logData.PeopleNotEntered = this.currentStop.waitingCount;
      this.currentStop.updateBikersCount();
      this.state = "GO";
      this.log();
      this.currentStop.log();
    }
    else {
      this.logData.PeopleEntered++;
      this.people++;
      this.currentStop.waitingCount--;
      this.currentStop.updatePopulation(1);
    }
  }

  log() {
    this.simulation.log(JSON.stringify(this.logData));
  }

  stop() {
    this.currentSpeed = 0;
  }

}
