import React from "react";
import { useSynth } from "../context/SynthContext";
import EnvelopeType from "../models/EnvelopeModel";

interface EnvelopeProps {
  index: number;
  label: string;
}

const Envelope: React.FC<EnvelopeProps> = ({ index, label }) => {
  const { state, updateEnvelope } = useSynth();
  const envelope = state.envelopes[index];

  const handleChange = (param: keyof EnvelopeType, value: number) => {
    updateEnvelope(index, { [param]: value });
  };

  return (
    <div className="envelope">
      <h3>{label}</h3>
      <label>
        Delay:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.delay}
          onChange={(e) => handleChange("delay", parseFloat(e.target.value))}
        />
      </label>
      <label>
        Attack:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.attack}
          onChange={(e) => handleChange("attack", parseFloat(e.target.value))}
        />
      </label>
      <label>
        Hold:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.hold}
          onChange={(e) => handleChange("hold", parseFloat(e.target.value))}
        />
      </label>
      <label>
        Decay:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.decay}
          onChange={(e) => handleChange("decay", parseFloat(e.target.value))}
        />
      </label>
      <label>
        Sustain:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.sustain}
          onChange={(e) => handleChange("sustain", parseFloat(e.target.value))}
        />
      </label>
      <label>
        Release:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={envelope.release}
          onChange={(e) => handleChange("release", parseFloat(e.target.value))}
        />
      </label>
    </div>
  );
};

export default Envelope;
