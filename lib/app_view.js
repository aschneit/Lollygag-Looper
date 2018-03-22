
const Tone = require("tone");
const { Instrument } = require("./instruments.js");

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
    const drumSynth = new Instrument();
    const bassSynth = new Instrument();
    const keyboardSynth = new Instrument();
    this.canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };

    if (this.isIntersection(pos, drums)) {
      drumSynth.createDrums().triggerAttackRelease( '8n');
    }
    if (this.isIntersection(pos, keyboard)) {
      keyboardSynth.createKeyboard().triggerAttackRelease('C4', '8n');
    }
    if (this.isIntersection(pos, bass)) {
      bassSynth.createBass().triggerAttackRelease('C2', '4n');
    }

  });

  }

  drawDrums(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'orange';
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
    ctx.fillStyle = 'yellow';
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
