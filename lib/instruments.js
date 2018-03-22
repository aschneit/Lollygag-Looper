const Tone = require("tone");

export class Instrument {
  constructor()  {


  }

  createDrums () {
    const drumSound = new Tone.MetalSynth (
        {
     frequency : 80 ,
     envelope : {
     attack : 0.001 ,
     decay : 1.2 ,
     release : 0.5
     }
     ,
     harmonicity : 5.1 ,
     modulationIndex : 10 ,
     resonance : 5000 ,
     octaves : 1.5
     }

    ).toMaster();

    return drumSound;
  }

  createKeyboard () {
    const keyboardSound = new Tone.FMSynth().toMaster();

    return keyboardSound;
  }

  createBass () {
    const bassSound = new Tone.PluckSynth({
    attackNoise : 1 ,
    dampening : 2000,
    resonance : .95
    }).toMaster();

    return bassSound;
  }

  

}
