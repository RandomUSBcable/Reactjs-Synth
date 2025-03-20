import React from "react";
import { useSynth } from "../context/SynthContext";

const Envelope: React.FC = () => {
  const { state, setState } = useSynth();

  const handleChange = (param: string, value: number) => {
    setState((prevState) => ({
      ...prevState,
      envelope: {
        ...prevState.envelope,
        [param]: value,
      },
    }));
  };

  return (
    <div>
      <h2>Envelope (ADSR)</h2>
      {[
        "delay",
        "attack",
        "hold",
        "decay",
        "sustain",
        "sustainSlope",
        "release",
        "releaseSlope",
      ].map((param) => (
        <div key={param}>
          <label>{param.charAt(0).toUpperCase() + param.slice(1)}: </label>
          <input
            type="range"
            min={0}
            max={param === "sustain" ? 1 : 10}
            step={0.01}
            value={state.envelope[param as keyof typeof state.envelope]}
            onChange={(e) => handleChange(param, Number(e.target.value))}
          />
          <span>{state.envelope[param as keyof typeof state.envelope]}</span>
        </div>
      ))}
    </div>
  );
};

export default Envelope;
