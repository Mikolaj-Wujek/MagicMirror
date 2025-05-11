function updateClockHands() {
    const now = luxon.DateTime.now().setZone('Europe/Dublin');

    const h = now.hour % 12;
    const m = now.minute;
    const s = Math.floor(now.second);

    const hourDeg = ((h + m / 60) * 30) - 90;
    const minDeg = ((m + s / 60) * 6) - 90;
    const secDeg = (s * 6) - 90;

    document.getElementById('hour-hand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minute-hand').style.transform = `rotate(${minDeg}deg)`;
    document.getElementById('second-hand').style.transform = `rotate(${secDeg}deg)`;
}

function createClockFace() {
    const clock = document.getElementById('clock');
    
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30 * (Math.PI / 180);
        const radius = clock.offsetWidth / 2 - 25;
        const x = (clock.offsetWidth / 2) + radius * Math.cos(angle);
        const y = (clock.offsetHeight / 2) + radius * Math.sin(angle);

        const num = document.createElement('span');
        num.className = 'clock-number';
        num.textContent = i;
        num.style.position = 'absolute';
        num.style.left = `${x}px`;
        num.style.top = `${y}px`;
        num.style.transform = 'translate(-50%, -50%)';
        clock.appendChild(num);
    }
    
    for (let i = 0; i < 12; i++) {
        const mark = document.createElement('div');
        mark.className = 'hour-mark';
        mark.style.transform = `rotate(${i * 30}deg)`;
        clock.appendChild(mark);
    }
    
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            const mark = document.createElement('div');
            mark.className = 'minute-mark';
            mark.style.transform = `rotate(${i * 6}deg)`;
            clock.appendChild(mark);
        }
    }
}

function initClock() {
    const clock = document.getElementById('clock');
    const handElements = Array.from(document.querySelectorAll('.hand, .center-dot'));
    const childrenToKeep = new Set(handElements);
    
    Array.from(clock.children).forEach(child => {
        if (!childrenToKeep.has(child)) {
            clock.removeChild(child);
        }
    });
    
    createClockFace();
    updateClockHands();
    setInterval(updateClockHands, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    initClock();
    
    window.addEventListener('resize', function() {
        setTimeout(initClock, 100);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progress = document.getElementById('progress');
    const timeCurrent = document.querySelector('.time-current');
    const timeTotal = document.querySelector('.time-total');
    
    let isPlaying = false;
    let currentTime = 0;
    let duration = 225;
    let progressInterval;
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    function updateProgress() {
        currentTime += 1;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        timeCurrent.textContent = formatTime(currentTime);
        
        if (currentTime >= duration) {
            togglePlay();
        }
    }
    
    function togglePlay() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            document.getElementById('music').classList.add('playing');
            progressInterval = setInterval(updateProgress, 1000);
        } else {
            document.getElementById('music').classList.remove('playing');
            clearInterval(progressInterval);
        }
    }
    
    function nextTrack() {
        currentTime = 0;
        progress.style.width = '0%';
        timeCurrent.textContent = '0:00';
        document.querySelector('.track-title strong').textContent = 'New Track';
        document.querySelector('.track-artist').textContent = 'New Artist';
        timeTotal.textContent = '4:20';
        duration = 260;
        
        if (isPlaying) {
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, 1000);
        }
    }
    
    function prevTrack() {
        currentTime = 0;
        progress.style.width = '0%';
        timeCurrent.textContent = '0:00';
        document.querySelector('.track-title strong').textContent = 'Previous Track';
        document.querySelector('.track-artist').textContent = 'Previous Artist';
        timeTotal.textContent = '2:30';
        duration = 150;
        
        if (isPlaying) {
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, 1000);
        }
    }
    
    document.querySelector('.progress-bar').addEventListener('click', function(e) {
        const progressBar = this;
        const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
        const progressBarWidth = progressBar.clientWidth;
        const seekPercentage = clickPosition / progressBarWidth;
        currentTime = duration * seekPercentage;
        
        if (isPlaying) {
            clearInterval(progressInterval);
            progressInterval = setInterval(updateProgress, 1000);
        }
    });
    
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextTrack);
    prevBtn.addEventListener('click', prevTrack);
    
    timeTotal.textContent = formatTime(duration);
    timeCurrent.textContent = '0:00';
});