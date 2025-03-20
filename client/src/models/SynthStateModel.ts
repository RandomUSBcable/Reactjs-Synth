import Oscillator from './OscillatorModel';
import MixerChannel from './MixerModel';
import Filter from './FilterModel';
import Envelope from './EnvelopeModel';
import LFO from './LFOModel';
// import KeyboardState from './KeyboardModel'

export interface SynthState {
    mode: 'monophonic' | 'polyphonic';
    bpm: number;
    oscillators: Oscillator[];
    mixer: MixerChannel[];
    filters: Filter[];
    envelopes: Envelope[];
    lfos: LFO[];
    activeNotes: Set<string>;
  }
  
export interface SynthContextType {
    state: SynthState;
    setState: React.Dispatch<React.SetStateAction<SynthState>>;
    triggerNote: (note: string) => void;
    releaseNote: (note: string) => void;
    updateBPM: (bpm: number) => void;
    updateOscillator: (index: number, updates: Partial<SynthState['oscillators'][number]>) => void;
    updateMixer: (index: number, updates: Partial<SynthState['mixer'][number]>) => void;
    updateFilter: (index: number, updates: Partial<SynthState['filters'][number]>) => void;
    updateEnvelope: (index: number, updates: Partial<SynthState['envelopes'][number]>) => void;
    updateLFO: (index: number, updates: Partial<SynthState['lfos'][number]>) => void;
    // updateKeyboard: (updates: Partial<SynthState['keyboard']>) => void;
    // setActiveNotes: (notes: number[]) => void;
  }
  