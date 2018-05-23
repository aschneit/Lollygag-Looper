# Lollygag Looper

Lollygag Looper is an audio app written in JavaScript that allows the user to click elements on a canvas and create overlapping loops from synthesized sound sources. The Tone.js library is employed to create the custom synths and schedule the loops. Click events targeted on the canvas add elements to the loops and trigger corresponding animations. Loops can be muted and the tempo adjusted through sliders and check boxes on the interface.

[Live Site](http://aschneit.com/Lollygag-Looper/)

## Technologies

The project uses JavaScript, HTML, CSS, and the Tone.js library.



## Canvas Targeting for Loops


![Alt Text](http://media.giphy.com/media/30pThBT0y2UayfnUb9/giphy.gif)

One challenge to using Canvas for this project was accurately targeting user clicks on the various elements that trigger the audio loops.

I found the x and y coordinates for a click on the canvas by subtracting the canvas's left and top offsets from the x and y click coordinates on the client area.

```JavaScript
this.canvas.addEventListener('click', (e) => {
  const pos = {
    x: (e.clientX - this.left),
    y: (e.clientY - this.top)
  };
```

For the bass "strings", I defined their individual clickable boundaries and only triggered an action if a click occurred within these boundaries. If it did, a new Tone.Loop would be created at the pitch level corresponding to the "string" clicked, along with its accompanying animation.

```JavaScript
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
    if (!this.bassMute.prop("checked")) {
      bassSound.triggerAttackRelease(string.note, '8n');
      this.animateBass(string);
    }
    const bassLoop = new Tone.Loop ((time) => {
      bassSound.triggerAttackRelease(string.note, '8n', time);
      this.animateBass(string);
    }, '1n');
```

There was a challenge in that Tone.js's Tone.Transport for timing musical events seemed to always sync new bass or keyboard loops at the very start of the existing drum loop sequence. In order to fix this, I defined a 'displace' variable which used the elapsed time and beats-per-minute value of the Tone.Transport to determine the position in the existing drum loop where the new bass loop should begin.

```JavaScript
    const displace = Tone.Transport.seconds % (60 / Tone.Transport.bpm.value * 4);
    if (this.looping === true && !this.bassMute.prop("checked")) bassLoop.start(displace);

```

## Animation

I wanted to create an animation for each instrument and key/string to indicate when it was first played and every subsequent time it recurred in the loop sequence.

Doing this for the bass "strings" was particularly challenging since I wanted each string to oscillate. I created a setInterval to update every millisecond, and in the callback "erased" the given string at its current position (by changing its color to the background color) and redrew it based on a displacement determined by a standard oscillation equation.  

```JavaScript
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
```

Then I created a setTimeout to stop the vibration:  after 500 ms, clear the setInterval, "erase" the string at its current displaced position, and redraw it at the original position.

```JavaScript
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
```
