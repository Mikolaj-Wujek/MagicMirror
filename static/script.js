function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const timeElem = document.getElementById('current-time');
    timeElem.textContent = `${h}:${m}:${s}`;
    timeElem.style.visibility = 'visible';
}

document.addEventListener('DOMContentLoaded', function() {
    const timeElem = document.getElementById('current-time');
    if (timeElem) timeElem.style.visibility = 'hidden';
    updateTime();
    setInterval(updateTime, 1000);
});