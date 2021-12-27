/* Music Player */

const playerListContainerTag = document.getElementsByClassName("playListContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const currentSongNameTag = document.getElementsByClassName("currentSongName")[0];
const progressBarTag = document.getElementById("progressBar");
let progressBarWidth;
let progressBarValue;
let progressBarValueInteger;



const tracks = [
    {trackId: "songs/track1.mp3", title: "Bink's Sake (Spicy Violin Remix)"},
    {trackId: "songs/track2.mp3", title: "Inferno - Mrs. Green Apple"},
    {trackId: "songs/track3.mp3", title: "Yuke - Lisa"},
    {trackId: "songs/track7.mp3", title: "Four seconds track"},
    {trackId: "songs/track4.mp3", title: "Racing into the Night - Yoasobi"},
    {trackId: "songs/track5.mp3", title: "Jujustu Kaisen Opening - Eve"},
    {trackId: "songs/track6.mp3", title: "Tiger and Fish - Eve"},
    {trackId: "songs/track7.mp3", title: "Four seconds track"},
];

//  Creating track element and playing song
for (let i = 0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackItem");
    trackTag.id = i;
    const title = (i + 1).toString() +". " + tracks[i].title;
    trackTag.textContent = title;
    playerListContainerTag.append(trackTag);
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        playSong();
    })
}

//  Adding event listeners to track tag and audio tag
let duration;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration); // changing seconds to minutes and seconds
})

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeAndDuration = currentTimeText + " / " + durationText;
    currentAndTotalTimeTag.textContent = currentTimeAndDuration;
    updateCurrentProgress(currentTime);
    if (currentTime === duration) {
        currentPlayingIndex += 1;
        if (currentPlayingIndex === tracks.length){
            currentPlayingIndex = 0;
        }
        const songIdToPlay = tracks[currentPlayingIndex].trackId;
        currentSongNameTag.textContent = (currentPlayingIndex + 1).toString() +". " + tracks[currentPlayingIndex].title;
        audioTag.src = songIdToPlay;
        audioTag.play();
    }
    progressBarWidth = getComputedStyle(progressBarTag).width;
    progressBarValue = progressBarWidth.slice(0, 3);
    progressBarValueInteger = parseInt(progressBarValue);
})

const updateCurrentProgress = (currentTime)  => {
    const currentProgressWidth = (progressBarValueInteger / duration) * currentTime;
    currentProgressTag.style.width = currentProgressWidth.toString() + "px";
}

const createMinuteAndSecondText = (totalSecond) => {
    const minutes = Math.floor(totalSecond / 60);
    const seconds = totalSecond % 60;
    
    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
}

/* Adding event listener to Buttons */
let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    if (currentTime === 0) {
        playSong();
    }else {
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
    }
})

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
})

previousButtonTag.addEventListener("click", () => {
    currentPlayingIndex -= 1;
    if (currentPlayingIndex === -1) {
        currentPlayingIndex = tracks.length - 1;    // 7
        console.log(currentPlayingIndex)
    }
    playSong();
})

nextButtonTag.addEventListener("click", () => {
    currentPlayingIndex += 1;
    if (currentPlayingIndex === tracks.length) {
        currentPlayingIndex = 0;
    }
    playSong();
})

const updatePlayAndPauseButton = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}

const playSong = () => {
    currentSongNameTag.textContent = (currentPlayingIndex + 1).toString() +". " + tracks[currentPlayingIndex].title;
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
}
/*
song's duration = progress bar's width
100s = 500px
1s = ?
1s = 500px / 100s
1s = 5px
2s = 10px
1s + 1s = 5px + 5px
1.5s = 7.5px
1s + 0.5s = 5px + 2.5px

1s * 2 = 5px * 2
2s = 10px
1s * 1.5 = 5px * 1.5
1.5s = 7.5px
*/