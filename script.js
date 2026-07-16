const audio = document.getElementById("audio");

const intro = document.getElementById("intro");
const player = document.getElementById("player");

const playBtn = document.getElementById("playBtn");
const replayBtn = document.getElementById("replayBtn");

const subtitle = document.getElementById("subtitle");

const progress = document.getElementById("progress");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

let subtitles = [];

/* ==========================
   LOAD LRC
========================== */

fetch("subtitle.lrc")
.then(res => res.text())
.then(text => {

    subtitles = parseLRC(text);

});

/* ==========================
   PARSE LRC
========================== */

function parseLRC(text){

    const lines = text.split("\n");

    const result = [];

    for(const line of lines){

        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);

        if(!match) continue;

        const min = parseInt(match[1]);

        const sec = parseFloat(match[2]);

        result.push({

            time:min*60+sec,

            text:match[3].trim()

        });

    }

    return result;

}

/* ==========================
   PLAY
========================== */

playBtn.onclick = ()=>{

    intro.style.opacity="0";

    intro.style.pointerEvents="none";

    player.style.opacity="1";

    player.style.pointerEvents="auto";

    audio.play();

};

/* ==========================
   AUDIO READY
========================== */

audio.onloadedmetadata=()=>{

    progress.max=Math.floor(audio.duration);

    duration.innerText=format(audio.duration);

};

/* ==========================
   UPDATE
========================== */

audio.ontimeupdate=()=>{

    progress.value=audio.currentTime;

    current.innerText=format(audio.currentTime);

    updateSubtitle(audio.currentTime);

};

/* ==========================
   SEEK
========================== */

progress.oninput=()=>{

    audio.currentTime=progress.value;

    updateSubtitle(audio.currentTime);

};

/* ==========================
   SUBTITLE
========================== */

function updateSubtitle(time){

    for(let i=subtitles.length-1;i>=0;i--){

        if(time>=subtitles[i].time){

            subtitle.innerText=subtitles[i].text;

            return;

        }

    }

    subtitle.innerText="";

}

/* ==========================
   FORMAT
========================== */

function format(sec){

    sec=Math.floor(sec);

    const m=Math.floor(sec/60);

    const s=sec%60;

    return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");

}

/* ==========================
   END
========================== */

audio.onended=()=>{

    replayBtn.style.display="block";

};

/* ==========================
   REPLAY
========================== */

replayBtn.onclick=()=>{

    replayBtn.style.display="none";

    audio.currentTime=0;

    audio.play();

};