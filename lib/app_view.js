const Tone = require("tone");
const { Instrument } = require("./instruments.js");

class AppView {
  constructor(ctx, canvas)  {
    this.ctx = ctx;
    this.canvas = canvas;
    this.left = canvas.offsetLeft;
    this.top = canvas.offsetTop;
    this.drums = new Instrument();
    this.bass = new Instrument();
    this.keyboard = new Instrument();
    Tone.Transport.bpm.value = 150;
    this.animateBass = this.animateBass.bind(this);
    this.looping = false;
    this.preRecorded = this.preRecorded.bind(this);
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
        x: (e.clientX - this.left),
        y: (e.clientY - this.top)
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
        Tone.Transport.start('+0.1');
        this.looping = true;
        const drumsMute = $('.drums-mute');
        drumsMute.on('change', (event) =>{
          if (drumsMute.prop("checked")) {
            drumLoop.mute = true;
          } else {
            drumLoop.mute = false;
          }
        });
        this.stopLoop(drumLoop);
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
    ctx.fillRect(key.xStart, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
    setTimeout(function(){
      ctx.fillStyle = 'yellow';
      ctx.fillRect(key.xStart, key.yStart, key.xEnd-key.xStart, key.yEnd-key.yStart);
    }, 200);
  }


  loopBass () {
    this.canvas.addEventListener('click', (e) => {
      const pos = {
        x: (e.clientX - this.left),
        y: (e.clientY - this.top)
      };
      const firstString = {
        xStart: 400, xEnd: 600, yStart: 265, yEnd: 275, y: 270, note: 'C2'
      };
      const secondString = {
        xStart: 400, xEnd: 600, yStart: 285, yEnd: 295, y: 290, note: 'Eb2'
      };
      const thirdString =  {
        xStart: 400, xEnd: 600, yStart: 305, yEnd: 315, y: 310, note: 'F2'
      };
      const fourthString =  {
        xStart: 400, xEnd: 600, yStart: 325, yEnd: 335, y: 330, note: 'G2'
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
          const bassMute = $('.bass-mute');
          bassMute.on('change', (event) =>{
            if (bassMute.prop("checked")) {
              bassLoop.mute = true;
            } else {
              bassLoop.mute = false;
            }
          }
        );

          const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
          if (this.looping === true) bassLoop.start(displace);
          this.stopLoop(bassLoop);

        }
      });
    });
  }

  loopKeyboard() {

    this.canvas.addEventListener('click', (e) => {
    const pos = {
      x: (e.clientX - this.left),
      y: (e.clientY - this.top)
    };
    const firstKey = {
      xStart: 750, xEnd: 787, yStart: 250, yEnd: 350, note: 'C3', color: 'red'
    };
    const secondKey = {
      xStart: 792.5, xEnd: 827.5, yStart: 250, yEnd: 350, note: 'Eb3', color: 'blue'
    };
    const thirdKey =  {
      xStart: 833, xEnd: 867, yStart: 250, yEnd: 350, note: 'F3', color:'orange'
    };
    const fourthKey =  {
      xStart: 873, xEnd: 907, yStart: 250, yEnd: 350, note: 'G3', color:'green'
    };
    const fifthKey =  {
      xStart: 913, xEnd: 950, yStart: 250, yEnd: 350, note: 'Bb3', color:'purple'
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
        this.stopLoop(keyboardLoop);
        const keysMute = $('.keys-mute');
        keysMute.on('change', (event) =>{
          if (keysMute.prop("checked")) {
            keyboardLoop.mute = true;
          } else {
            keyboardLoop.mute = false;
          }
        });
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

  stopLoop (loop) {
    const stopButton = $('.stop');
    stopButton.on('click', (e) => {
      Tone.Transport.stop();
      this.looping = false;
      loop.cancel();
    });
  }

  demo () {
    const demoButton = $('.demo');
    demoButton.on('click', (e) => {
      this.preRecorded();
    });
  }


  preRecorded () {
    const e = new Event("click");
    e.clientX = this.left + 100;
    e.clientY = this.top + 300;
    this.canvas.dispatchEvent(e);
    setTimeout(() => {
      e.clientX = 500 + this.left;
      e.clientY = 270 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 5000);
    setTimeout(() => {
      e.clientX = 810 + this.left;
      e.clientY = 300 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 10060);
    setTimeout(() => {
      e.clientX = 890 + this.left;
      e.clientY = 300 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 14240);
    setTimeout(() => {
      e.clientX = 930 + this.left;
      e.clientY = 300 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 17850);
    setTimeout(() => {
      e.clientX = 500 + this.left;
      e.clientY = 310 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 20000);
    setTimeout(() => {
      e.clientX = 500 + this.left;
      e.clientY = 290 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 23000);
    setTimeout(() => {
      e.clientX = 770 + this.left;
      e.clientY = 300 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    },  (150/Tone.Transport.bpm.value) * 25000);
    setTimeout(() => {
      e.clientX = 840 + this.left;
      e.clientY = 300 + this.top;
      if (this.looping)
      this.canvas.dispatchEvent(e);
    }, (150/Tone.Transport.bpm.value) * 29050);
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
    this.demo();
  }

}

module.exports = AppView;
