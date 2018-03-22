
const Tone = require("tone");
const { Instrument } = require("./instruments.js");

class AppView {
  constructor(ctx, canvas)  {
    this.ctx = ctx;
    this.canvas = canvas;

  }

  loopDrums () {
    const drums = {
    name: 'drums',
    x: 100,
    y: 300,
    radius: 50
    };
    const drumSynth = new Instrument();
    this.canvas.addEventListener('click', (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      if (this.isIntersection(pos, drums)) {
        Tone.Transport.bpm.value = 100;
        const drumSound = drumSynth.createDrums();
        const drumLoop = new Tone.Loop ((time) => {
          drumSound.triggerAttackRelease('8n', time);
        }, '4n');
        drumLoop.start(0);
        Tone.Transport.start('+0.4');
      }
    });
  }

  loopBass () {
    const bassSynth = new Instrument();
    this.canvas.addEventListener('click', (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      let note;
      let target;
      if (pos.x > 400 && pos.x < 600) {
        if (pos.y > 275 && pos.y < 280) {
          target = true;
          note = 'C2';
        } else if (pos.y > 295 && pos.y < 300) {
          target = true;
          note = 'E2';
        } else if  (pos.y > 315 && pos.y < 320) {
          target = true;
          note = 'F#2';
        } else if (pos.y > 335 && pos.y < 340) {
          target = true;
          note = 'A2';
        }
      }
      if (target === true) {
        const bassSound = bassSynth.createBass();
        const bassLoop = new Tone.Loop ((time) => {
          bassSound.triggerAttackRelease(note, '8n', time);
        }, '1n');
        const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
        bassLoop.start(displace);
      }
    });

  }

  addClicks() {


    const keyboard = {
      name: 'keyboard',
      x: 900,
      y: 300,
      radius: 50
    };
    const bassSynth = new Instrument();
    const keyboardSynth = new Instrument();

    this.canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    if (this.isIntersection(pos, keyboard)) {
      const keyboardSound = keyboardSynth.createKeyboard();
      const keyboardLoop = new Tone.Loop ((time) => {
        keyboardSound.triggerAttackRelease('C4', '8n', time);
      }, '1n');
      const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
      keyboardLoop.start(displace);

    }
    // if (this.isIntersection(pos, bass)) {
    //   const bassSound = bassSynth.createBass();
    //   const bassLoop = new Tone.Loop ((time) => {
    //     bassSound.triggerAttackRelease('C2', '8n', time);
    //   }, '1n');
    //   const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
    //   bassLoop.start(displace);

    // }
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
    ctx.fillStyle = 'orange';
    ctx.lineWidth= 10;
    ctx.beginPath();
    ctx.rect(400, 250, 200, 100);
    ctx.stroke();
    ctx.fill();
    ctx.lineWidth= 5;
    ctx.beginPath();
    ctx.moveTo(400, 270);
    ctx.lineTo(600,270);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(400, 290);
    ctx.lineTo(600,290);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(400, 310);
    ctx.lineTo(600,310);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(400, 330);
    ctx.lineTo(600,330);
    ctx.stroke();

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
    this.drawDrums(this.ctx);
    this.drawBass(this.ctx);
    this.drawKeyboard(this.ctx);
    this.loopDrums();
    this.loopBass();
    this.addClicks();

  }

}

module.exports = AppView;
