/* ==========================================================================
   MATRIX RAIN CANVAS ANIMATION MODULE
   ========================================================================== */

(function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Matrix Characters (Katakana + Hex + Latin + Cyber Symbols)
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF01<>{}[]/\\*&^%$#@!~';
    const charArray = chars.split('');

    let fontSize = 14;
    let columns = 0;
    let drops = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * -100);
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
        // Semi-transparent black background to leave a trail
        ctx.fillStyle = 'rgba(5, 7, 10, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + 'px "JetBrains Mono", monospace';

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Lead character is brighter white-green, tail is neon green
            if (Math.random() > 0.92) {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#00ff41';
                ctx.shadowBlur = 8;
            } else {
                ctx.fillStyle = '#00ff41';
                ctx.shadowBlur = 0;
            }

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Reset drop to top randomly after it moves off screen
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Run matrix loop at ~30 FPS for smooth cyber feel
    setInterval(draw, 33);
})();
