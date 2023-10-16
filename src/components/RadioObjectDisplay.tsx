import Weapon from "../Weapon";

interface RadioObjectDisplayProps {
  data: Weapon[]; // Assuming the data is an object with keys and corresponding text
  selected: number;
  onDataEmit: (data: number) => void;
}

const RadioObjectDisplay: React.FC<RadioObjectDisplayProps> = ({
  data,
  selected,
  onDataEmit,
}) => {
  const handleEmitData = (data: number) => {
    onDataEmit(data);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div key={item.name}>
          <input
            type="radio"
            id={item.name}
            value={item.name}
            checked={selected === index}
            onChange={() => {
              handleEmitData(index);
            }}
          />
          <label htmlFor={item.name}>{item.name}</label>
        </div>
      ))}
      <div>
        <p>{data[selected].damage}</p>
      </div>
    </div>
  );
};

export default RadioObjectDisplay;
