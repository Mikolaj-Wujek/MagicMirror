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

function addClockNumbers() {
    const clock = document.getElementById('clock');
    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30 * (Math.PI / 180);
        const radius = clock.offsetWidth / 2 - 22;
        const x = (clock.offsetWidth / 2) + radius * Math.cos(angle);
        const y = (clock.offsetHeight / 2) + radius * Math.sin(angle);

        const num = document.createElement('span');
        num.className = 'clock-number';
        num.textContent = i;
        num.style.position = 'absolute';
        num.style.left = `${x - 10}px`;
        num.style.top = `${y - 12}px`;
        num.style.color = '#b3e5fc';
        num.style.fontSize = '1rem';
        num.style.fontWeight = '700';
        num.style.userSelect = 'none';
        clock.appendChild(num);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    addClockNumbers();
    updateClockHands();
    setInterval(updateClockHands, 1000);
});