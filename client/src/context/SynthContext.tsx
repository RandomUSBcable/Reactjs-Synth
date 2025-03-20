import React, { createContext, useState, useContext } from "react";

// === Import Models ===
import { SynthState, SynthContextType } from "../models/SynthStateModel";

// === Initial State ===
export const initialState: SynthState = {
  bpm: 120,
  oscillators: Array.from({ length: 4 }, () => ({
    type: "sine",
    unison: 1,
    unisonDetune: 0,
    velocitySensitivity: 100,
  })),
  mixer: {
    volumes: Array(4).fill(100),
    mutes: Array(4).fill(false),
    solos: Array(4).fill(false),
  },
  filters: Array.from({ length: 3 }, () => ({
    type: "lowpass",
    depth: 12,
    cutoff: 1000,
    resonance: 1.0,
  })),
  envelopes: Array.from({ length: 3 }, () => ({
    delay: 0,
    attack: 0.1,
    hold: 0.1,
    decay: 0.4,
    sustain: 0.8,
    release: 0.5,
  })),
  lfos: Array(2).fill({
    type: "sine",
    depth: 50,
    mode: "sync",
    rate: 1 / 4,
  }),
  activeNotes: new Set<string>(),
};

// === Create Context ===
export const SynthContext = createContext<SynthContextType | undefined>(
  undefined
);

// === Provider Component ===
export const SynthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<SynthState>(initialState);

  // === Update BPM ===
  const updateBPM = (bpm: number) => {
    setState((prevState) => ({ ...prevState, bpm }));
  };

  // === Update Oscillator ===
  const updateOscillator = (
    index: number,
    updates: Partial<SynthState["oscillators"][number]>
  ) => {
    setState((prevState) => {
      const newOscillators = [...prevState.oscillators];
      newOscillators[index] = { ...newOscillators[index], ...updates };
      return { ...prevState, oscillators: newOscillators };
    });
  };

  // === Update Mixer Channel ===
  const updateMixer = (
    index: number,
    updates: Partial<SynthState["mixer"][number]>
  ) => {
    setState((prevState) => {
      const newMixer = [...prevState.mixer];
      newMixer[index] = { ...newMixer[index], ...updates };
      return { ...prevState, mixer: newMixer };
    });
  };

  // === Update Filter ===
  const updateFilter = (
    index: number,
    updates: Partial<SynthState["filters"][number]>
  ) => {
    setState((prevState) => {
      const newFilters = [...prevState.filters];
      newFilters[index] = { ...newFilters[index], ...updates };
      return { ...prevState, filters: newFilters };
    });
  };

  // === Update Envelope ===
  const updateEnvelope = (
    index: number,
    updates: Partial<SynthState["envelopes"][number]>
  ) => {
    setState((prevState) => {
      const newEnvelopes = [...prevState.envelopes];
      newEnvelopes[index] = { ...newEnvelopes[index], ...updates };
      return { ...prevState, envelopes: newEnvelopes };
    });
  };

  // === Update LFO ===
  const updateLFO = (
    index: number,
    updates: Partial<SynthState["lfos"][number]>
  ) => {
    setState((prevState) => {
      const newLFOs = [...prevState.lfos];
      newLFOs[index] = { ...newLFOs[index], ...updates };
      return { ...prevState, lfos: newLFOs };
    });
  };

  // === Update Keyboard Mode ===
  const updateKeyboard = (updates: Partial<SynthState["keyboard"]>) => {
    setState((prevState) => ({
      ...prevState,
      keyboard: { ...prevState.keyboard, ...updates },
    }));
  };

  // === Update Active Notes ===
  const setActiveNotes = (notes: number[]) => {
    setState((prevState) => ({ ...prevState, activeNotes: notes }));
  };

  const triggerNote = (note: string) => {
    setState((prev) => {
      const updatedNotes = new Set(prev.activeNotes);
      updatedNotes.add(note);
      return { ...prev, activeNotes: updatedNotes };
    });
  };

  const releaseNote = (note: string) => {
    setState((prev) => {
      const updatedNotes = new Set(prev.activeNotes);
      updatedNotes.delete(note);
      return { ...prev, activeNotes: updatedNotes };
    });
  };

  return (
    <SynthContext.Provider
      value={{
        state,
        setState,
        updateBPM,
        updateOscillator,
        updateMixer,
        updateFilter,
        updateEnvelope,
        updateLFO,
        updateKeyboard,
        setActiveNotes,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};

// === Custom Hook to Use Synth Context ===
export const useSynth = () => {
  const context = useContext(SynthContext);
  if (!context) {
    throw new Error("useSynth must be used within a SynthProvider");
  }
  return context;
};
