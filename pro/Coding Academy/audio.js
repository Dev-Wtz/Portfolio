/* ==========================================================================
   WEB AUDIO API RETRO SOUND SYNTHESIZER
   ========================================================================== */

const CyberAudio = (function() {
    let audioCtx = null;
    let enabled = true;

    function init() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                audioCtx = new AudioContext();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    function isMuted() {
        return !enabled;
    }

    function toggleMute() {
        enabled = !enabled;
        return enabled;
    }

    // Play subtle mechanical key click
    function playKeyClick() {
        if (!enabled) return;
        try {
            init();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400 + Math.random() * 300, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.04);
        } catch (e) {}
    }

    // Play command execution beep
    function playExecBeep() {
        if (!enabled) return;
        try {
            init();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.08);

            gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.08);
        } catch (e) {}
    }

    // Play success fanfare
    function playSuccess() {
        if (!enabled) return;
        try {
            init();
            if (!audioCtx) return;

            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * 0.08);

                gain.gain.setValueAtTime(0.03, audioCtx.currentTime + idx * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.08 + 0.12);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(audioCtx.currentTime + idx * 0.08);
                osc.stop(audioCtx.currentTime + idx * 0.08 + 0.12);
            });
        } catch (e) {}
    }

    // Play error buzzer
    function playError() {
        if (!enabled) return;
        try {
            init();
            if (!audioCtx) return;

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.setValueAtTime(110, audioCtx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.25);
        } catch (e) {}
    }

    return {
        init,
        toggleMute,
        isMuted,
        playKeyClick,
        playExecBeep,
        playSuccess,
        playError
    };
})();
