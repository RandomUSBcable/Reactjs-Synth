export default interface LFO {
    type: 'sine' | 'triangle' | 'saw' | 'random';
    depth: number;
    mode: 'sync' | 'time';
    syncInterval: string;
    time: number;
  }