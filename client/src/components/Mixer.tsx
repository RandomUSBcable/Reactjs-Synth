import React from "react";
import { useSynth } from "../context/SynthContext";

const Mixer: React.FC = () => {
  const { mixer, setState } = useSynth();

  const handleVolumeChange = (index: number, value: number) => {
    setState((state) => {
      const newMixer = [...state.mixer];
      newMixer[index].volume = value;
      return { mixer: newMixer };
    });
  };

  const toggleMute = (index: number) => {
    setState((state) => {
      const newMixer = [...state.mixer];
      newMixer[index].mute = !newMixer[index].mute;
      return { mixer: newMixer };
    });
  };

  const toggleSolo = (index: number) => {
    setState((state) => {
      const newMixer = [...state.mixer];
      newMixer[index].solo = !newMixer[index].solo;
      return { mixer: newMixer };
    });
  };

  return (
    <div>
      <h2>Mixer</h2>
      {mixer.map((channel, index) => (
        <div key={index}>
          <h3>Oscillator {index + 1}</h3>
          <label>Volume: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={channel.volume}
            onChange={(e) => handleVolumeChange(index, Number(e.target.value))}
          />
          <button onClick={() => toggleMute(index)}>
            {channel.mute ? "Unmute" : "Mute"}
          </button>
          <button onClick={() => toggleSolo(index)}>
            {channel.solo ? "Unsolo" : "Solo"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Mixer;
