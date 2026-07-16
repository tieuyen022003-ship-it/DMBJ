const audio = document.getElementById("audio");
const subtitle = document.getElementById("subtitle");

let subtitles = [];

// Phát nhạc khi mở trang (nếu trình duyệt cho phép)
window.addEventListener("load", () => {
    audio.play().catch(() => {
        document.body.addEventListener("click", () => {
            audio.play();
        }, { once: true });
    });

    loadLRC();
});

// Đọc file .lrc
function loadLRC() {
    fetch("subtitle.lrc")
        .then(response => response.text())
        .then(text => {
            parseLRC(text);
        });
}

// Chuyển đổi thời gian
function parseTime(timeString) {
    const parts = timeString.split(":");
    return parseFloat(parts[0]) * 60 + parseFloat(parts[1]);
}

// Phân tích file LRC
function parseLRC(text) {

    const lines = text.split("\n");

    lines.forEach(line => {

        const match = line.match(/\[(\d+:\d+\.\d+)\](.*)/);

        if (match) {

            subtitles.push({
                time: parseTime(match[1]),
                text: match[2].trim()
            });

        }

    });

}

// Hiển thị phụ đề theo thời gian
audio.addEventListener("timeupdate", () => {

    const current = audio.currentTime;

    for (let i = subtitles.length - 1; i >= 0; i--) {

        if (current >= subtitles[i].time) {

            subtitle.textContent = subtitles[i].text;
            break;

        }

    }

});