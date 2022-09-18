const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [{
        name: "kk1",
        displayName: 'Pal',
        artist: 'Krishnakumar Kunnath(KK)'
    },
    {
        name: "kk2",
        displayName: 'khuda jane',
        artist: 'Krishnakumar Kunnath(KK)'
    },
    {
        name: "kk3",
        displayName: 'thadap thadap',
        artist: 'Krishnakumar Kunnath(KK)'
    },
    {
        name: "kk4",
        displayName: 'tum kyu ajate ho',
        artist: 'Krishnakumar Kunnath(KK)'
    }
]

//play and pause


let isPlaying = false

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "pause")
    music.play()
}

function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "play")
    music.pause()
}


playBtn.addEventListener("click", () => {
    (isPlaying ? pauseSong() : playSong())
})

//upload dom
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist

    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}
let songIndex = 0
    //previous
    //3
    //2
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])
    playSong()


}
//next
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex])
    playSong()

}
//load
loadSong(songs[songIndex])
    //

function updateProgressBar(e) { //
    if (isPlaying) {
        // console.log(e)
        const { currentTime, duration } = e.srcElement;
        //change width of progress bar
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`


        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
            // seconds = seconds > 9 ? seconds : `0${seconds}`
        if (durationSeconds < 10) {
            return `0${durationSeconds}`

        }
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        currentSeconds = currentSeconds > 9 ? currentSeconds : `0${currentSeconds}`
            // if (currentSeconds < 10) {
            //     return `0${currentSeconds}`

        // }
        return `${currentMinutes}:${currentSeconds}`

        durationE1.textContent = `${durationMinutes}:${durationSeconds}`;

        currentTimeE1.textContent = `${currentMinutes }: ${currentSeconds}`;

    }
}

function setProgressBar() {
    const width = this.clientWidth;
    const progresswidth = e.offsetX;
    const { duration } = music;

    music.currentTime = (progresswidth / width) * duration
}



prevBtn.addEventListener("click", previousSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("ended", nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener("click", setProgressBar)