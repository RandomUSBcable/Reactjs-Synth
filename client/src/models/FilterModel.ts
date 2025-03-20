export default interface Filter {
    type: 'highpass' | 'lowpass' | 'bandpass';
    depth: 6 | 12 | 24;
    cutoff: number;
    resonance: number;
  }