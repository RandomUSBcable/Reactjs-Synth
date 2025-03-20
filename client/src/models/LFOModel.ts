export default interface LFOState {
    type: 'sine' | 'triangle' | 'saw' | 'random';
    depth: number;
    mode: 'sync' | 'time';
    rate: number; // either musical interval or time in ms
  }
  