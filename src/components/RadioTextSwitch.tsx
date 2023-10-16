import React, { useState } from "react";

interface RadioTextSwitchProps {
  data: Record<string, string>; // Assuming the data is an object with keys and corresponding text
}

const RadioTextSwitch: React.FC<RadioTextSwitchProps> = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    Object.keys(data)[0]
  );

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      {Object.keys(data).map((key) => (
        <div key={key}>
          <input
            type="radio"
            id={key}
            value={key}
            checked={selectedOption === key}
            onChange={handleRadioChange}
          />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}
      <div>
        <p>{data[selectedOption]}</p>
      </div>
    </div>
  );
};

export default RadioTextSwitch;
