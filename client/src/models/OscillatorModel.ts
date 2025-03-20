export default interface OscillatorModel {
    type: 'sine' | 'saw' | 'triangle' | 'pulse' | 'analogSine' | 'analogSaw' | 'analogSquare';
    unison: number;
    unisonDetune: number;
    velocitySensitivity: number;
  }