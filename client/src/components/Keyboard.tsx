import React, { useState } from "react";
import { useSynth } from "../context/SynthContext";

const Keyboard: React.FC = () => {
  const { state, setState } = useSynth();
  const [heldNotes, setHeldNotes] = useState<number[]>([]);

  const handleNoteOn = (note: number) => {
    if (state.keyboard.mode === "monophonic") {
      setState((prevState) => ({ ...prevState, activeNotes: [note] }));
    } else if (state.keyboard.mode === "polyphonic") {
      setState((prevState) => ({
        ...prevState,
        activeNotes: [...prevState.activeNotes, note],
      }));
    }
    if (state.keyboard.hold) {
      setHeldNotes((prev) => [...prev, note]);
    }
  };

  const handleNoteOff = (note: number) => {
    if (!state.keyboard.hold) {
      setState((prevState) => ({
        ...prevState,
        activeNotes: prevState.activeNotes.filter((n) => n !== note),
      }));
    }
  };

  const clearHeldNotes = () => {
    setHeldNotes([]);
    setState((prevState) => ({ ...prevState, activeNotes: [] }));
  };

  const notes = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div>
      <h2>Keyboard</h2>
      <label>Mode: </label>
      <select
        value={state.keyboard.mode}
        onChange={(e) =>
          setState({
            ...state,
            keyboard: { ...state.keyboard, mode: e.target.value },
          })
        }
      >
        <option value="monophonic">Monophonic</option>
        <option value="polyphonic">Polyphonic</option>
      </select>

      <label> Hold: </label>
      <input
        type="checkbox"
        checked={state.keyboard.hold}
        onChange={() =>
          setState({
            ...state,
            keyboard: { ...state.keyboard, hold: !state.keyboard.hold },
          })
        }
      />
      <button onClick={clearHeldNotes}>Clear Hold</button>

      <div className="keyboard">
        {notes.map((note) => (
          <button
            key={note}
            className={state.activeNotes.includes(note) ? "active" : ""}
            onMouseDown={() => handleNoteOn(note)}
            onMouseUp={() => handleNoteOff(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
