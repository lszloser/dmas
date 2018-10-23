
class Range {

  constructor(x, y, radius, disap) {
    this.lifeTime = 0;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "rgba(255, 0, 0, 1)";
    this.disap = disap;
  }

  draw() {
    if (this.lifeTime < 20) {
      gctx.beginPath();
      gctx.setLineDash([5]);
      gctx.lineWidth = 2;
      gctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      gctx.closePath();
      gctx.strokeStyle = "rgba(255, 0, 0," + 1/this.lifeTime + ")";
      gctx.stroke();
      gctx.restore(); 
    }
  }

  update(x,y) {
    if (this.disap == true) {
      this.lifeTime++;
    }
    this.x = x;
    this.y = y;
  }

}
