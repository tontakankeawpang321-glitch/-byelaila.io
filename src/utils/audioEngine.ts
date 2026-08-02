import { SoundSettings, MalletType } from '../types';

let audioCtx: AudioContext | null = null;
let mainGainNode: GainNode | null = null;
let reverbNode: ConvolverNode | null = null;
let recordingDestination: MediaStreamAudioDestinationNode | null = null;
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];

export function getAudioContext(): AudioContext | null {
  return audioCtx;
}

export function initAudioEngine(settings: SoundSettings): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtxClass();

    mainGainNode = audioCtx.createGain();
    mainGainNode.gain.value = settings.volume;
    mainGainNode.connect(audioCtx.destination);

    reverbNode = createReverbConvolver(audioCtx);
    reverbNode.connect(mainGainNode);

    recordingDestination = audioCtx.createMediaStreamDestination();
    mainGainNode.connect(recordingDestination);
  }

  applyMonoSettings(settings);

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  return audioCtx;
}

function createReverbConvolver(ctx: AudioContext): ConvolverNode {
  const sampleRate = ctx.sampleRate;
  const duration = sampleRate * 3.5;
  const buffer = ctx.createBuffer(2, duration, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  for (let i = 0; i < duration; i++) {
    const decay = Math.exp(-i / (sampleRate * 1.1));
    left[i] = (Math.random() * 2 - 1) * decay;
    right[i] = (Math.random() * 2 - 1) * decay;
  }

  const convolver = ctx.createConvolver();
  convolver.buffer = buffer;
  return convolver;
}

export function applyMonoSettings(settings: SoundSettings) {
  if (audioCtx) {
    try {
      if (settings.isMono) {
        audioCtx.destination.channelCount = 1;
        audioCtx.destination.channelCountMode = 'explicit';
        audioCtx.destination.channelInterpretation = 'speakers';
        if (mainGainNode) {
          mainGainNode.channelCount = 1;
          mainGainNode.channelCountMode = 'explicit';
        }
      } else {
        const maxCh = Math.min(2, audioCtx.destination.maxChannelCount || 2);
        audioCtx.destination.channelCount = maxCh;
        audioCtx.destination.channelCountMode = 'max';
        audioCtx.destination.channelInterpretation = 'speakers';
        if (mainGainNode) {
          mainGainNode.channelCount = maxCh;
          mainGainNode.channelCountMode = 'max';
        }
      }
    } catch (e) {
      console.warn("Mono channel configuration warning:", e);
    }
  }
}

export function updateEngineSettings(settings: SoundSettings) {
  if (mainGainNode) {
    mainGainNode.gain.value = settings.volume;
  }
  applyMonoSettings(settings);
}

export function playNote(freq: number, settings: SoundSettings) {
  if (!audioCtx) {
    initAudioEngine(settings);
  }
  if (!audioCtx) return;

  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;

  // Voice Gain Envelope
  const voiceGain = audioCtx.createGain();
  voiceGain.gain.setValueAtTime(0, now);
  voiceGain.gain.linearRampToValueAtTime(1.0, now + 0.002);
  voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + settings.decay);

  // Dry / Wet Reverb Split
  const dryGain = audioCtx.createGain();
  dryGain.gain.setValueAtTime(1.0 - settings.reverbWet, now);

  const wetGain = audioCtx.createGain();
  wetGain.gain.setValueAtTime(settings.reverbWet, now);

  voiceGain.connect(dryGain);
  voiceGain.connect(wetGain);

  if (mainGainNode) dryGain.connect(mainGainNode);
  if (reverbNode) wetGain.connect(reverbNode);

  // Mallet material adjustments
  const malletMultipliers = getMalletParams(settings.malletType);

  // 1. Fundamental Pitch
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, now);
  osc1.connect(voiceGain);

  // 2. High Metallic Clink Overtone (2.76x)
  const osc2 = audioCtx.createOscillator();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2.76, now);
  const osc2Gain = audioCtx.createGain();
  osc2Gain.gain.setValueAtTime(0.55 * settings.brightness * malletMultipliers.overtoneGain, now);
  osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
  osc2.connect(osc2Gain);
  osc2Gain.connect(voiceGain);

  // 3. Perfect Octave Harmonic (4.0x)
  const osc3 = audioCtx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.setValueAtTime(freq * 4.0, now);
  const osc3Gain = audioCtx.createGain();
  osc3Gain.gain.setValueAtTime(0.25 * settings.brightness, now);
  osc3Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
  osc3.connect(osc3Gain);
  osc3Gain.connect(voiceGain);

  // 4. Sub-harmonic Warm Cabinet Resonance (0.5x)
  const osc4 = audioCtx.createOscillator();
  osc4.type = 'sine';
  osc4.frequency.setValueAtTime(freq * 0.5, now);
  const osc4Gain = audioCtx.createGain();
  osc4Gain.gain.setValueAtTime(0.04, now);
  osc4Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  osc4.connect(osc4Gain);
  osc4Gain.connect(voiceGain);

  // 5. Mallet Strike Noise Burst
  const bufferSize = audioCtx.sampleRate * 0.018;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const channelData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    channelData[i] = Math.random() * 2 - 1;
  }
  const noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;

  const clickFilter = audioCtx.createBiquadFilter();
  clickFilter.type = malletMultipliers.filterType;
  clickFilter.frequency.setValueAtTime(malletMultipliers.cutoffFreq, now);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(malletMultipliers.clickGain, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + malletMultipliers.clickDecay);

  noiseNode.connect(clickFilter);
  clickFilter.connect(noiseGain);
  noiseGain.connect(voiceGain);

  // Play
  osc1.start(now);
  osc2.start(now);
  osc3.start(now);
  osc4.start(now);
  noiseNode.start(now);

  const cleanupTime = settings.decay + 1;
  osc1.stop(now + cleanupTime);
  osc2.stop(now + cleanupTime);
  osc3.stop(now + cleanupTime);
  osc4.stop(now + cleanupTime);

  setTimeout(() => {
    osc1.disconnect();
    osc2.disconnect();
    osc3.disconnect();
    osc4.disconnect();
    noiseNode.disconnect();
    clickFilter.disconnect();
    noiseGain.disconnect();
    voiceGain.disconnect();
    dryGain.disconnect();
    wetGain.disconnect();
  }, (cleanupTime + 1) * 1000);
}

function getMalletParams(malletType: MalletType) {
  switch (malletType) {
    case 'brass':
      return { overtoneGain: 1.4, clickGain: 0.5, clickDecay: 0.02, cutoffFreq: 2500, filterType: 'highpass' as BiquadFilterType };
    case 'wood':
      return { overtoneGain: 1.0, clickGain: 0.3, clickDecay: 0.015, cutoffFreq: 1200, filterType: 'bandpass' as BiquadFilterType };
    case 'soft':
      return { overtoneGain: 0.5, clickGain: 0.15, clickDecay: 0.01, cutoffFreq: 800, filterType: 'lowpass' as BiquadFilterType };
    case 'hard':
    default:
      return { overtoneGain: 1.0, clickGain: 0.35, clickDecay: 0.012, cutoffFreq: 1500, filterType: 'highpass' as BiquadFilterType };
  }
}

// Recording helpers
export function startRecording(): boolean {
  if (!recordingDestination || !audioCtx) return false;

  try {
    recordedChunks = [];
    mediaRecorder = new MediaRecorder(recordingDestination.stream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.start();
    return true;
  } catch (e) {
    console.error("Failed to start MediaRecorder:", e);
    return false;
  }
}

export function stopRecording(): Promise<Blob | null> {
  return new Promise((resolve) => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      resolve(null);
      return;
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      recordedChunks = [];
      resolve(blob);
    };

    mediaRecorder.stop();
  });
}
