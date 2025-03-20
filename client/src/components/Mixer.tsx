import React from "react";
import { useSynth } from "../context/SynthContext";
import MixerType from "../models/MixerModel";

interface MixerProps {
  index: number;
  label: string;
}

const Mixer: React.FC<MixerProps> = ({ index, label }) => {
  const { state, updateMixer } = useSynth();
  const mixer = state.mixer[index];

  const handleChange = (param: keyof MixerType, value: number | boolean) => {
    updateMixer(index, { [param]: value });
  };

  return (
    <div className="mixer">
      <h3>{label}</h3>
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={mixer.volume}
          onChange={(e) => handleChange("volume", parseFloat(e.target.value))}
        />
      </label>
      <button onClick={() => handleChange("mute", !mixer.mute)}>
        {mixer.mute ? "Unmute" : "Mute"}
      </button>
      <button onClick={() => handleChange("solo", !mixer.solo)}>
        {mixer.solo ? "Unsolo" : "Solo"}
      </button>
    </div>
  );
};

export default Mixer;
