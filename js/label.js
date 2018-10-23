
class Label {

  constructor(x, y, text, color) {
    this.x = x;
    this.y = y;
    this.color = color || "black";
    this.text = text;
  }

  draw() {
    gctx.fillStyle = this.color;
    gctx.font="12px Georgia";
    gctx.fillText(this.text,this.x,this.y);
  }

  update(x,y,text) {
    this.x = x;
    this.y = y;
    this.text = text;
  }
}
