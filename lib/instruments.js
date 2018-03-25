const Tone = require("tone");

export class Instrument {
  constructor()  {


  }

  createDrums () {
    const drumSound = new Tone.MembraneSynth(
        {
     pitchDecay  : 0.09 ,
     octaves  : 4 ,
     oscillator  : {
     type  : 'sine'
     }  ,
     envelope  : {
     attack  : 0.001 ,
     decay  : 0.4 ,
     sustain  : 0.09 ,
     release  : 1.0 ,
     attackCurve  : 'exponential'
     }
     }

    ).toMaster();

    return drumSound;
  }

  createKeyboard () {
    const keyboardSound = new Tone.Synth({
      volume: +5,
      oscillator : {
  	     type : 'triangle8'
       },
       envelope : {
    	attack : .07,
      decay : .5,
      sustain: 0.1,
      release: 3
  }
    }).toMaster();

    return keyboardSound;
  }

  createBass () {
    const bassSound = new Tone.FMSynth({
    volume : +20,
    harmonicity  : 3,
    modulationIndex  : 3 ,
    detune  : 0 ,
    oscillator  : {
    type  : 'sine'
    }  ,
    envelope  : {
    attack  : 0.15 ,
    decay  : 0.01 ,
    sustain  : .2 ,
    release  : 0.01
    }  ,
    modulation  : {
    type  : 'sine'

    }  ,
    modulationEnvelope  : {
    attack  : 0.12 ,
    decay  : .01 ,
    sustain  : .02 ,
    release  : 0.01
    }

    }).toMaster();
    return bassSound;
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
    ctx.rect(750, 250, 200, 100);
    ctx.stroke();
    ctx.fill();
    ctx.lineWidth= 5;
    ctx.beginPath();
    ctx.moveTo(790, 250);
    ctx.lineTo(790, 350);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(830, 250);
    ctx.lineTo(830,350);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(870, 250);
    ctx.lineTo(870,350);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(910, 250);
    ctx.lineTo(910,350);
    ctx.stroke();


  }




}
