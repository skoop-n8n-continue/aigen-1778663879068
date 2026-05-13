document.addEventListener('DOMContentLoaded', () => {
    const face = document.getElementById('face');
    const hourHand = document.getElementById('hour');
    const minuteHand = document.getElementById('minute');

    // Create 60 tick marks (12 major, 48 minor)
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.className = `tick ${i % 5 === 0 ? 'major' : 'minor'}`;
        tick.style.transform = `rotate(${i * 6}deg)`;
        face.appendChild(tick);
    }

    // Create the 12 numbers
    for (let i = 1; i <= 12; i++) {
        const num = document.createElement('div');
        num.className = 'number';
        num.textContent = i;

        // Position using trigonometry. 0 degrees is 12 o'clock, which is -90 in standard trig
        const angle = (i * 30 - 90) * (Math.PI / 180);
        // Radius of placement (percent of the face size)
        // 50% is the edge, we want it inside the ticks
        const radius = 38;

        num.style.left = `calc(50% + ${radius * Math.cos(angle)}%)`;
        num.style.top = `calc(50% + ${radius * Math.sin(angle)}%)`;
        face.appendChild(num);
    }

    function updateClock() {
        const now = new Date();

        const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        // Calculate degrees (360 degrees in a full circle)
        // Minutes: 60 minutes = 360deg -> 6deg/min
        // Hours: 12 hours = 360deg -> 30deg/hour
        const minuteDeg = minutes * 6;
        const hourDeg = hours * 30;

        // Apply rotation
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `rotate(${hourDeg}deg)`;

        // Request next frame for smooth animation
        requestAnimationFrame(updateClock);
    }

    // Start the clock
    requestAnimationFrame(updateClock);
});