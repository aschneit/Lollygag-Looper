
class AppView {
  constructor(ctx, canvas)  {
    this.ctx = ctx;
    this.canvas = canvas;

  }

  addClicks() {
    const drums = {
    name: 'drums',
    x: 100,
    y: 300,
    radius: 50
    };
    const bass = {
      name: 'bass',
      x: 500,
      y: 300,
      radius: 50
    };
    const keyboard = {
      name: 'keyboard',
      x: 900,
      y: 300,
      radius: 50
    };
    const circles = [drums, bass, keyboard];

    this.canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    circles.forEach((circle, idx) => {
      if (this.isIntersection(pos, circle)) {
        alert(circle.name);
      }
    });
  });

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

  isIntersection(point, circle) {
    return Math.sqrt(Math.pow(point.x-circle.x, 2) + Math.pow(point.y-circle.y, 2)) < circle.radius;
}




  start() {
    this.drawCanvas(this.ctx);
    this.drawKeyboard(this.ctx);
    this.drawDrums(this.ctx);
    this.drawBass(this.ctx);
    this.addClicks();

  }

}

module.exports = AppView;
