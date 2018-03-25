
const Tone = require("tone");
const { Instrument } = require("./instruments.js");

class AppView {
  constructor(ctx, canvas)  {
    this.ctx = ctx;
    this.canvas = canvas;
    this.drums = new Instrument();
    this.bass = new Instrument();
    this.keyboard = new Instrument();
    Tone.Transport.bpm.value = 150;
    this.animateBass = this.animateBass.bind(this);
    this.looping = false;
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

        const drumSound = this.drums.createDrums();
        const drumLoop = new Tone.Loop ((time) => {
          drumSound.triggerAttackRelease('A1', '4n', time);
          let ctx = this.ctx;
          ctx.fillStyle = 'red';
          ctx.beginPath();
          ctx.arc(
            100, 300, 50, 0, 2 * Math.PI, true
          );
          ctx.fill();
          setTimeout(function(){
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(
              100, 300, 50, 0, 2 * Math.PI, true
            );
            ctx.fill();
          }, 50);
        }, '4n');
        drumLoop.start(0);
        Tone.Transport.start('+0.4');
        this.looping = true;
      }
    });

  }

  animateBass (inputString){

      const string = Object.assign({}, inputString);
      const firstY = string.y;
      let time = 0;
      const set = setInterval (()=> {
        const amplitude = 4.5;
        const period = 2.5;
        const nextPos = amplitude * Math.sin(time * 2 * Math.PI / period) + string.y;
        this.ctx.strokeStyle = "orange";
        this.ctx.lineWidth= 7;
        this.ctx.beginPath();
        this.ctx.moveTo(string.xStart, string.y);
        this.ctx.lineTo(string.xEnd, string.y);
        this.ctx.stroke();
        string.y = nextPos;
        time += 1;
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth= 5;
        this.ctx.beginPath();
        this.ctx.moveTo(string.xStart, string.y);
        this.ctx.lineTo(string.xEnd, string.y);
        this.ctx.stroke();
        console.log(time);
      }, 1);

      setTimeout (() => {
        clearInterval(set);
        this.ctx.strokeStyle = "orange";
        this.ctx.lineWidth= 7;
        this.ctx.beginPath();
        this.ctx.moveTo(string.xStart, string.y);
        this.ctx.lineTo(string.xEnd, string.y);
        this.ctx.stroke();
        this.ctx.strokeStyle = "blue";
        this.ctx.lineWidth= 5;
        this.ctx.beginPath();
        this.ctx.moveTo(string.xStart, firstY);
        this.ctx.lineTo(string.xEnd, firstY);
        this.ctx.stroke();
      }, 500);

  }

  animateKeys (inputKey) {
    const key = Object.assign({}, inputKey);
    let ctx = this.ctx;
    ctx.fillStyle = key.color;
    ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
    setTimeout(function(){
      ctx.fillStyle = 'yellow';
      ctx.fillRect(key.xStart-7, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
    }, 200);
  }


  loopBass () {
    this.canvas.addEventListener('click', (e) => {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };
      const firstString = {
        xStart: 400, xEnd: 600, yStart: 275, yEnd: 280, y: 270, note: 'C2'
      };
      const secondString = {
        xStart: 400, xEnd: 600, yStart: 295, yEnd: 300, y: 290, note: 'Eb2'
      };
      const thirdString =  {
        xStart: 400, xEnd: 600, yStart: 315, yEnd: 320, y: 310, note: 'F2'
      };
      const fourthString =  {
        xStart: 400, xEnd: 600, yStart: 335, yEnd: 340, y: 330, note: 'G2'
      };

      const strings = [firstString, secondString, thirdString, fourthString];
      const bassSound = this.drums.createBass();
      strings.forEach((string) => {
        if (pos.x > string.xStart && pos.x < string.xEnd && pos.y > string.yStart && pos.y< string.yEnd) {
          bassSound.triggerAttackRelease(string.note, '8n');
          this.animateBass(string);
          const bassLoop = new Tone.Loop ((time) => {
            bassSound.triggerAttackRelease(string.note, '8n', time);
            this.animateBass(string);
          }, '1n');
          const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
          if (this.looping === true) bassLoop.start(displace);
        }
      });
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
        this.animateKeys(key);
        const keyboardLoop = new Tone.Loop ((time) => {
          keyboardSound.triggerAttackRelease(key.note, '8n', time);
          this.animateKeys(key);
        }, '1n');
        const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
        if (this.looping === true) keyboardLoop.start(displace);
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

  getTempo (){
    const range = document.getElementById('myRange');
    const tempo = range.value;
    $('.tempo-value').html(tempo);
    range.addEventListener('change', (e) =>{
      Tone.Transport.bpm.value = range.value;
      $('.tempo-value').html(range.value);
    });

  }


  start() {
    this.drawCanvas(this.ctx);
    this.drums.drawDrums(this.ctx);
    this.bass.drawBass(this.ctx);
    this.keyboard.drawKeyboard(this.ctx);
    this.loopDrums();
    this.loopBass();
    this.loopKeyboard();
    this.getTempo();

  }

}

module.exports = AppView;
