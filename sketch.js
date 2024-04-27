let speech = new p5.Speech();
let speechRec = new p5.SpeechRec('en-US', gotSpeech);
let inputText = '';
let outputText = '';

let continuous = true; 
let interim = false; 
speechRec.start(continuous, interim);

let mobileWidth = 300; 
let mobileHeight = 535; 
let padding = 20; 

let messageY = 0; 
let check = true;
let phoneImg;
function preload() {
  phoneImg = loadImage('mobile.png'); 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill(255);
  image(phoneImg, (windowWidth - 1.3*mobileWidth) / 2 , (windowHeight - 1.25*mobileHeight) / 2, 1.3*mobileWidth, 1.25*mobileHeight);
  fill(0);
  textSize(15.5);
  textAlign(CENTER); 
  fill(0); 
  text("Ask Siri to set a reminder for tomorrow's work call", windowWidth / 2, (windowHeight - mobileHeight) / 2 - 4*padding); 
  textAlign(LEFT); 
  if (inputText !== '') {
    let y = drawText(inputText, (windowWidth - mobileWidth) / 2 + padding, messageY, LEFT, color(0, 0, 255));
    if (outputText !== '') {
      drawText(outputText, (windowWidth + mobileWidth) / 2 - padding, y + 50, RIGHT, color(0, 255, 0));
    }
  }

  if (messageY < (windowHeight - mobileHeight) / 2 + padding + 50) {
    messageY += 5; 
  }
}

function gotSpeech() {
  if (speechRec.resultValue) {
    let resultText = 'Hey Siri , Set a reminder tomorrow for work call';
    if (!resultText.startsWith('You') && check) {
      inputText = resultText;
      setTimeout(function(){ 
        outputText = "Sorry I don’t understand. Could you repeat what you just said?";
        speech.speak(outputText);
        check = false;
        setTimeout(function(){ location.reload(); }, 15000);
      }, 2000);
    }
  }
}

function drawText(txt, x, y, align, col) {
  textAlign(align);
  let words = txt.split(' ');
  let line = '';
  let startY = y;
  let lines = [];
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > mobileWidth - 2 * padding && i > 0) {
      lines.push(line);
      line = words[i] + ' ';
      y += textAscent() + textDescent();
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  fill(255); 
  let rectWidth = min(textWidth(txt) + padding, mobileWidth - 2 * padding);
  let rectX = align === LEFT ? x - padding / 2 : x - rectWidth + padding / 2;
  rect(rectX, startY - textAscent() - padding / 2, rectWidth, y - startY + textAscent() + textDescent() + padding, 10); 
  fill(col);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], x, startY + i * (textAscent() + textDescent())); 
  }
  return y;
}

