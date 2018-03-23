
const Tone = require("tone");
const { Instrument } = require("./instruments.js");

class AppView {
  constructor(ctx, canvas)  {
    this.ctx = ctx;
    this.canvas = canvas;
    this.drums = new Instrument();
    this.bass = new Instrument();
    this.keyboard = new Instrument();

  }

  loopDrums () {
    const drums = {
    name: 'drums',
    x: 100,
    y: 300,
    radius: 50
    };
    this.canvas.addEventListener('click', (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      if (this.isIntersection(pos, drums)) {
        Tone.Transport.bpm.value = 100;
        const drumSound = this.drums.createDrums();
        const drumLoop = new Tone.Loop ((time) => {
          drumSound.triggerAttackRelease('8n', time);
        }, '4n');
        drumLoop.start(0);
        Tone.Transport.start('+0.5');

      }
    });

  }

  loopBass () {
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
          note = 'Eb2';
        } else if  (pos.y > 315 && pos.y < 320) {
          target = true;
          note = 'F2';
        } else if (pos.y > 335 && pos.y < 340) {
          target = true;
          note = 'G2';
        }
      }
      if (target === true) {
        const bassSound = this.drums.createBass();
        bassSound.triggerAttackRelease(note, '8n');
        const bassLoop = new Tone.Loop ((time) => {
          bassSound.triggerAttackRelease(note, '8n', time);
        }, '1n');
        const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
        bassLoop.start(displace);
      }
    });

  }

  loopKeyboard() {

    this.canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    const firstKey = {
      xStart: 757, xEnd: 794, yStart: 250, yEnd: 350, note: 'C3', color: 'red'
    };
    const secondKey = {
      xStart: 799, xEnd: 835, yStart: 250, yEnd: 350, note: 'Eb3', color: 'blue'
    };
    const thirdKey =  {
      xStart: 840, xEnd: 874, yStart: 250, yEnd: 350, note: 'F3', color:'orange'
    };
    const fourthKey =  {
      xStart: 880, xEnd: 914, yStart: 250, yEnd: 350, note: 'G3', color:'green'
    };
    const fifthKey =  {
      xStart: 920, xEnd: 957, yStart: 250, yEnd: 350, note: 'Bb3', color:'purple'
    };

    const keys = [firstKey, secondKey, thirdKey, fourthKey, fifthKey];

    const keyboardSound = this.keyboard.createKeyboard();
    keys.forEach((key) => {
      if (pos.x > key.xStart && pos.x < key.xEnd && pos.y > key.yStart && pos.y< key.yEnd) {
        keyboardSound.triggerAttackRelease(key.note, '8n');
        const keyboardLoop = new Tone.Loop ((time) => {
          keyboardSound.triggerAttackRelease(key.note, '8n', time);
        }, '1n');
        const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
        keyboardLoop.start(displace);
        const loopTime = (60 / Tone.Transport.bpm.value * 4);
        let ctx = this.ctx;
        ctx.fillStyle = key.color;
        ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
        setTimeout(function(){
          ctx.fillStyle = 'yellow';
          ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
        }, 200);
        const keyVisual = setInterval(function(){
          ctx.fillStyle = key.color;
          ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
          setTimeout(function(){
            ctx.fillStyle = 'yellow';
            ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
          }, 200);
        }, loopTime * 1000);
      }
    });

  });

  }


  isIntersection(point, circle) {
    return Math.sqrt(Math.pow(point.x-circle.x, 2) + Math.pow(point.y-circle.y, 2)) < circle.radius;
}

  drawCanvas(ctx) {
    ctx.fillStyle = "beige";
    ctx.fillRect(0, 0, 1000, 600);

  }


  start() {
    this.drawCanvas(this.ctx);
    this.drums.drawDrums(this.ctx);
    this.bass.drawBass(this.ctx);
    this.keyboard.drawKeyboard(this.ctx);
    this.loopDrums();
    this.loopBass();
    this.loopKeyboard();

  }

}

module.exports = AppView;
