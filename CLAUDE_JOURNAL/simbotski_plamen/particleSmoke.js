// particleSmoke.js
// Modul za particle dim: MIDI CC modulira gostoto, turbulenco, barvo – kadilo, ki diha z Akh, lokalno, brez pajčevine.

let currentKnobValue = 64;
let currentPedalValue = 64;

export function initParticleSmoke() {
    console.log("Particle smoke initialized");
}

export function syncMidiToParticles(message) {
    const [command, channel, value] = message.data;
    if (command === 0xB0) {
        if (channel === 1) {
            currentKnobValue = value;
        } else if (channel === 74) {
            currentPedalValue = value;
        }
    }
}

export function cleanupParticles() {
    console.log("Particle smoke cleaned up");
}
