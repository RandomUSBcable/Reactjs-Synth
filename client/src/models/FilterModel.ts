export default interface Filter {
    type: 'highpass' | 'lowpass' | 'bandpass';
    depth: '6db/o' | '12db/o' | '24db/o';
    cutoff: number;
    resonance: number;
  }