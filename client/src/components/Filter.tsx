import React from "react";
import { useSynth } from "../context/SynthContext";

const Filter: React.FC = () => {
  const { state, setState } = useSynth();

  const handleCutoffChange = (index: number, value: number) => {
    setState((prevState) => {
      const newFilters = [...prevState.filters];
      newFilters[index].cutoff = value;
      return { ...prevState, filters: newFilters };
    });
  };

  const handleResonanceChange = (index: number, value: number) => {
    setState((prevState) => {
      const newFilters = [...prevState.filters];
      newFilters[index].resonance = value;
      return { ...prevState, filters: newFilters };
    });
  };

  const handleTypeChange = (
    index: number,
    value: "lowpass" | "highpass" | "bandpass"
  ) => {
    setState((prevState) => {
      const newFilters = [...prevState.filters];
      newFilters[index].type = value;
      return { ...prevState, filters: newFilters };
    });
  };

  return (
    <div>
      <h2>Filters</h2>
      {state.filters.map((filter, index) => (
        <div key={index}>
          <h3>Filter {index + 1}</h3>
          <label>Type: </label>
          <select
            value={filter.type}
            onChange={(e) =>
              handleTypeChange(
                index,
                e.target.value as "lowpass" | "highpass" | "bandpass"
              )
            }
          >
            <option value="lowpass">Lowpass</option>
            <option value="highpass">Highpass</option>
            <option value="bandpass">Bandpass</option>
          </select>

          <label> Cutoff Frequency: </label>
          <input
            type="range"
            min="0"
            max="20000"
            value={filter.cutoff}
            onChange={(e) => handleCutoffChange(index, Number(e.target.value))}
          />
          <span>{filter.cutoff} Hz</span>

          <label> Resonance: </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={filter.resonance}
            onChange={(e) =>
              handleResonanceChange(index, Number(e.target.value))
            }
          />
          <span>{filter.resonance}</span>
        </div>
      ))}
    </div>
  );
};

export default Filter;
