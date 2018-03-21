

class AppView {
  constructor(ctx)  {
    this.ctx = ctx;
  }

  drawDrums(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'green';
    ctx.lineWidth= 10;
    ctx.beginPath();
    ctx.arc(
      100, 300, 50, 0, 2 * Math.PI, true
    );
    ctx.stroke();
    ctx.fill();
}



  drawBass(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'green';
    ctx.lineWidth= 10;
    ctx.beginPath();
    ctx.arc(
      500, 300, 50, 0, 2 * Math.PI, true
    );
    ctx.stroke();
    ctx.fill();
  }



  drawKeyboard(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'green';
    ctx.lineWidth= 10;
    ctx.beginPath();
    ctx.arc(
      900, 300, 50, 0, 2 * Math.PI, true
    );
    ctx.stroke();
    ctx.fill();
}

  drawCanvas(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, 1000, 600);

  }


  start() {
    this.drawCanvas(this.ctx);
    this.drawKeyboard(this.ctx);
    this.drawDrums(this.ctx);
    this.drawBass(this.ctx);

  }

}

module.exports = AppView;
