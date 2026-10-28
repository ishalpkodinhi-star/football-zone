/**
 * Student Productivity Hub - Web Audio Synthesis Engine
 * Provides offline procedural ambient sounds (Rain, White Noise, Binaural Beats)
 * and harmonic chimes without requiring external MP3 files.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.currentAmbient = null;
    this.ambientGainNode = null;
    this.ambientNodes = [];
    this.ambientVolume = 0.35;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pleasant notification bell / chime for Pomodoro finish
  playChime(type = 'success') {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = type === 'success' ? [523.25, 659.25, 783.99, 1046.50] : [659.25, 523.25]; // C5, E5, G5, C6 or Descending

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0, now + idx * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 1.3);
    });
  }

  // Soft click / tick sound
  playTick() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Ambient sound synthesizer
  startAmbient(soundType) {
    this.stopAmbient();
    if (!soundType || soundType === 'none') return;

    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, now);
    masterGain.gain.linearRampToValueAtTime(this.ambientVolume, now + 0.5);
    masterGain.connect(this.ctx.destination);
    this.ambientGainNode = masterGain;

    if (soundType === 'rain') {
      this.createRainSound(masterGain);
    } else if (soundType === 'whitenoise') {
      this.createWhiteNoise(masterGain);
    } else if (soundType === 'binaural') {
      this.createBinauralBeats(masterGain);
    } else if (soundType === 'cafe') {
      this.createWarmCafeDrone(masterGain);
    }

    this.currentAmbient = soundType;
  }

  stopAmbient() {
    if (this.ambientGainNode && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGainNode.gain.linearRampToValueAtTime(0.0001, now + 0.3);
        setTimeout(() => {
          this.ambientNodes.forEach(node => {
            try {
              if (node.stop) node.stop();
              node.disconnect();
            } catch (e) {}
          });
          this.ambientNodes = [];
          if (this.ambientGainNode) {
            this.ambientGainNode.disconnect();
            this.ambientGainNode = null;
          }
        }, 350);
      } catch (e) {
        this.ambientNodes = [];
      }
    }
    this.currentAmbient = null;
  }

  // Rain: Filtered Pink Noise with low-pass fluctuations
  createRainSound(destination) {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate raindrops hitting surfaces
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);

    // Highpass to eliminate excessive low rumble
    const hpFilter = this.ctx.createBiquadFilter();
    hpFilter.type = 'highpass';
    hpFilter.frequency.setValueAtTime(200, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(hpFilter);
    hpFilter.connect(destination);

    whiteNoise.start(0);
    this.ambientNodes.push(whiteNoise, filter, hpFilter);
  }

  // White / Brown Noise for blocking distractions
  createWhiteNoise(destination) {
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    // Brown noise integration
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(destination);
    noiseSource.start(0);

    this.ambientNodes.push(noiseSource, filter);
  }

  // Binaural Focus Alpha Beats (432Hz carrier + 10Hz alpha difference)
  createBinauralBeats(destination) {
    const merger = this.ctx.createChannelMerger(2);

    const oscLeft = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(432, this.ctx.currentTime);

    const oscRight = this.ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(442, this.ctx.currentTime); // 10Hz Alpha difference

    const gainL = this.ctx.createGain();
    gainL.gain.setValueAtTime(0.08, this.ctx.currentTime);
    const gainR = this.ctx.createGain();
    gainR.gain.setValueAtTime(0.08, this.ctx.currentTime);

    oscLeft.connect(gainL);
    gainL.connect(merger, 0, 0); // Left channel

    oscRight.connect(gainR);
    gainR.connect(merger, 0, 1); // Right channel

    merger.connect(destination);

    oscLeft.start();
    oscRight.start();

    this.ambientNodes.push(oscLeft, oscRight, gainL, gainR, merger);
  }

  // Warm Cafe Drone
  createWarmCafeDrone(destination) {
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(180, this.ctx.currentTime);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc1.start();
    osc2.start();

    this.ambientNodes.push(osc1, osc2, filter, gain);
  }
}

export const sound = new SoundEngine();
