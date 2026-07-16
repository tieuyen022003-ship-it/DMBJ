const audio=document.getElementById("audio");

const subtitle=document.getElementById("subtitle");

const play=document.getElementById("playButton");

const replay=document.getElementById("replayButton");

let subtitles=[];

fetch("subtitle.lrc")

.then(r=>r.text())

.then(text=>{

const lines=text.split("\n");

lines.forEach(line=>{

const match=line.match(/\[(\d+):(\d+\.\d+)\](.*)/);

if(match){

subtitles.push({

time:Number(match[1])*60+Number(match[2]),

text:match[3].trim()

});

}

});

});

play.onclick=()=>{

play.style.display="none";

subtitle.innerHTML="";

audio.currentTime=0;

audio.play();

}

replay.onclick=()=>{

replay.style.display="none";

subtitle.innerHTML="";

audio.currentTime=0;

audio.play();

}

audio.addEventListener("timeupdate",()=>{

const t=audio.currentTime;

for(let i=subtitles.length-1;i>=0;i--){

if(t>=subtitles[i].time){

subtitle.innerHTML=subtitles[i].text;

break;

}

}

});

audio.onended=()=>{

replay.style.display="block";

}