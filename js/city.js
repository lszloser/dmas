class City {

  constructor(x, y, name, population, simulation) {
    this.x = x;
    this.y = y;
    this.populationCount = population;
    this.waitingCount = Math.round(population * 0.1*Math.random());
    this.timer = 0;
    //this.waitingPeople = new Array(this.waitingCount);
    this.name = name;
    this.radius = 3;
    this.color = "blue";
    this.simulation = simulation;
    this.bikersCount = 0;
    //this.allowedRange = new Range(this.x, this.y, range, true);
    this.nameLabel = new Label(this.x - 10, this.y - 15, this.name);
    this.populationLabel = new Label(this.x - 20, this.y + 15, this.populationCount, "rgba(192,192,192,0.5)");
    this.waitingLabel = new Label(this.x - 20, this.y + 30, this.waitingCount, "rgba(255,0,0,0.9)");
    this.bikersLabel = new Label(this.x - 20, this.y + 45, this.bikersCount, "rgba(255,0,255,0.9)");
    //this.draged = false;
    //this.SelectedRange = new Range(this.x, this.y, 20, false);
  }

  update() {
    this.timer++;
    this.updateLabel();
    this.verifyTimer();
  }

  verifyTimer() {
    if (this.timer % 100 == 0) {
      this.updateWaitingCount();
    }
  }


  updateLabel() {
    this.waitingLabel.update(this.x - 20, this.y + 30, this.waitingCount);
    this.bikersLabel.update(this.x - 20, this.y + 45, this.bikersCount);
  }

  updateWaitingCount() {
    if (Math.random() < 0.1) {
      this.waitingCount++;
    }
    if (Math.random() > 0.9 && this.waitingCount > 0) {
      this.waitingCount--;
    }
  }

  updateBikersCount() {
    this.bikersCount += Math.round(0.5 * this.waitingCount);
    this.waitingCount -= this.bikersCount;
  }

  drawVisual() {
    gctx.beginPath();
    gctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    gctx.closePath();
    gctx.fillStyle = this.color;
    gctx.fill();
  }

  drawDebug() {
    gctx.font="12px Georgia";
    gctx.fillStyle="black";
    gctx.fillText("x:" + this.x + ", y:" + this.y,this.x + 5,this.y + 10);

  }

  drawLabel() {
    this.nameLabel.draw();
    this.populationLabel.draw();
    this.waitingLabel.draw();
    this.bikersLabel.draw();
    this.updateLabel();
  }

  draw() {
    this.drawVisual();
    this.drawLabel();
  }
}
