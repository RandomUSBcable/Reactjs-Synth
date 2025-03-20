import React, { useState } from "react";
import { useSynth } from "../context/SynthContext";

interface KeyboardProps {
  octaves?: number;
}

interface Key {
  note: string;
  octave: number;
}

const Keyboard: React.FC<KeyboardProps> = ({ octaves = 2 }) => {
  const { state, triggerNote, releaseNote, setState } = useSynth();
  const [hold, setHold] = useState(false);

  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  const generateKeys = (): Key[] => {
    const keys: Key[] = [];
    for (let octave = 0; octave < octaves; octave++) {
      notes.forEach((note) => {
        keys.push({ note, octave });
      });
    }
    return keys;
  };

  const handleNotePress = (note: string, octave: number) => {
    triggerNote(`${note}${octave}`);
  };

  const handleNoteRelease = (note: string, octave: number) => {
    if (!hold) {
      releaseNote(`${note}${octave}`);
    }
  };

  return (
    <div className="keyboard">
      <button
        onClick={() => setState((prev) => ({ ...prev, mode: "monophonic" }))}
      >
        Monophonic
      </button>
      <button
        onClick={() => setState((prev) => ({ ...prev, mode: "polyphonic" }))}
      >
        Polyphonic
      </button>
      <button onClick={() => setHold(!hold)}>
        {hold ? "Release Hold" : "Hold"}
      </button>
      <div className="keys">
        {generateKeys().map(({ note, octave }, index) => (
          <button
            key={index}
            className={`key ${note.includes("#") ? "black-key" : "white-key"}`}
            onMouseDown={() => handleNotePress(note, octave)}
            onMouseUp={() => handleNoteRelease(note, octave)}
          >
            {note}
            {octave}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
