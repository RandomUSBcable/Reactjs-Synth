import React from "react";
import { useSynth } from "../context/SynthContext";

const LFO: React.FC<{ index: number }> = ({ index }) => {
  const { state, setState } = useSynth();
  const lfo = state.lfos[index];

  const handleChange = (param: string, value: any) => {
    setState((prevState) => {
      const newLFOs = [...prevState.lfos];
      newLFOs[index] = { ...newLFOs[index], [param]: value };
      return { ...prevState, lfos: newLFOs };
    });
  };

  return (
    <div>
      <h2>LFO {index + 1}</h2>

      <label>Type: </label>
      <select
        value={lfo.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        {["sine", "triangle", "saw", "random"].map((wave) => (
          <option key={wave} value={wave}>
            {wave}
          </option>
        ))}
      </select>

      <label> Depth: </label>
      <input
        type="range"
        min="0"
        max="100"
        value={lfo.depth}
        onChange={(e) => handleChange("depth", Number(e.target.value))}
      />
      <span>{lfo.depth}</span>

      <label> Mode: </label>
      <select
        value={lfo.mode}
        onChange={(e) => handleChange("mode", e.target.value)}
      >
        {["sync", "time"].map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>

      {lfo.mode === "sync" ? (
        <div>
          <label> Sync Interval: </label>
          <select
            value={lfo.syncInterval}
            onChange={(e) => handleChange("syncInterval", e.target.value)}
          >
            {["1/16", "1/16.", "1/8", "1/8.", "1/4", "1/4."].map((interval) => (
              <option key={interval} value={interval}>
                {interval}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div>
          <label> Time (ms): </label>
          <input
            type="range"
            min="10"
            max="10000"
            value={lfo.time}
            onChange={(e) => handleChange("time", Number(e.target.value))}
          />
          <span>{lfo.time} ms</span>
        </div>
      )}
    </div>
  );
};

export default LFO;
