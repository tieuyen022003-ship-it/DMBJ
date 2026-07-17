const audio = document.getElementById("audio");
const subtitle = document.getElementById("subtitle");
const overlay = document.getElementById("overlay");

const playButton = document.getElementById("playButton");
const replayButton = document.getElementById("replayButton");

let subtitles = [];
let currentIndex = -1;


/* ===========================
   ĐỌC FILE LRC
=========================== */

fetch("subtitle.lrc")

.then(res => res.text())

.then(text => {

    const lines = text.split(/\r?\n/);

    lines.forEach(line => {

        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);

        if(match){

            subtitles.push({

                time:
                Number(match[1])*60 +
                Number(match[2]),

                text:
                match[3].trim()

            });

        }

    });

});


/* ===========================
   PLAY
=========================== */

playButton.onclick = () => {

    playButton.classList.add("hide");

    setTimeout(()=>{

        playButton.style.display="none";

    },350);

    replayButton.style.display="none";

    overlay.style.opacity=".15";

    subtitle.textContent="";

    subtitle.classList.remove("subtitle-show");

    audio.currentTime=0;

    currentIndex=-1;

    audio.play();

};


/* ===========================
   REPLAY
=========================== */

replayButton.onclick = () => {

    replayButton.classList.remove("show");

    replayButton.style.display="none";

    subtitle.textContent="";

    currentIndex=-1;

    audio.currentTime=0;

    audio.play();

};


/* ===========================
   UPDATE SUBTITLE
=========================== */

audio.addEventListener("timeupdate",()=>{

    const current = audio.currentTime;

    for(let i=subtitles.length-1;i>=0;i--){

        if(current>=subtitles[i].time){

            if(currentIndex!==i){

                currentIndex=i;

                subtitle.classList.remove("subtitle-show");

                setTimeout(()=>{

                    subtitle.textContent=subtitles[i].text;

                    subtitle.classList.add("subtitle-show");

                },180);

            }

            break;

        }

    }

});


/* ===========================
   KẾT THÚC
=========================== */

audio.addEventListener("ended", () => {

    // Ẩn phụ đề
    subtitle.classList.remove("subtitle-show");

    setTimeout(() => {
        subtitle.textContent = "";
    }, 300);

    // Hiện nút Replay
    replayButton.style.display = "flex";

    // Đợi trình duyệt render rồi thêm hiệu ứng
    requestAnimationFrame(() => {
        replayButton.classList.add("show");
    });

});


/* ===========================
   PAUSE
=========================== */

audio.addEventListener("pause",()=>{

    if(audio.ended) return;

});


/* ===========================
   PLAY EVENT
=========================== */

audio.addEventListener("play",()=>{

    overlay.style.opacity=".15";

});