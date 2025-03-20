import React from "react";
import { useSynth } from "../context/SynthContext";

const Oscillator: React.FC<{ index: number }> = ({ index }) => {
  const { state, setState } = useSynth();
  const oscillator = state.oscillators[index];

  const handleChange = (param: string, value: any) => {
    setState((prevState) => {
      const newOscillators = [...prevState.oscillators];
      newOscillators[index] = { ...newOscillators[index], [param]: value };
      return { ...prevState, oscillators: newOscillators };
    });
  };

  return (
    <div>
      <h2>Oscillator {index + 1}</h2>

      <label>Type: </label>
      <select
        value={oscillator.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        {[
          "sine",
          "saw",
          "triangle",
          "pulse",
          "analogSine",
          "analogSaw",
          "analogSquare",
        ].map((wave) => (
          <option key={wave} value={wave}>
            {wave}
          </option>
        ))}
      </select>

      <label> Unison: </label>
      <input
        type="range"
        min="1"
        max="12"
        value={oscillator.unison}
        onChange={(e) => handleChange("unison", Number(e.target.value))}
      />
      <span>{oscillator.unison}</span>

      <label> Unison Detune (cents): </label>
      <input
        type="range"
        min="0"
        max="100"
        value={oscillator.unisonDetune}
        onChange={(e) => handleChange("unisonDetune", Number(e.target.value))}
      />
      <span>{oscillator.unisonDetune}</span>

      <label> Velocity Sensitivity: </label>
      <input
        type="range"
        min="0"
        max="100"
        value={oscillator.velocitySensitivity}
        onChange={(e) =>
          handleChange("velocitySensitivity", Number(e.target.value))
        }
      />
      <span>{oscillator.velocitySensitivity}</span>
    </div>
  );
};

export default Oscillator;
