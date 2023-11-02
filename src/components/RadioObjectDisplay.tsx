import Weapon from "../Weapon";

interface RadioObjectDisplayProps {
  data: Weapon[]; // Assuming the data is an object with keys and corresponding text
  selected?: number;
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

  console.log(selected, "RAH");

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
      {selected != undefined ? RenderWeapon(data[selected]) : null}
      <div></div>
    </div>
  );
};

function RenderWeapon(data: Weapon) {
  return (
    <div className="abilities">
      <div>Name: {data.name}</div>
      <div>Attacks: {data.attacks}</div>
      <div>Damage (Armor Pen):{data.damage_armor_pen}</div>
      <div>Splash damage: {data.splash_damage}</div>
      <div>Range (Optimal): {data.range_optimal}</div>
      <div>AP Cost: {data.ap_cost}</div>
      <div>Ammo: {data.ammo}</div>
      <div>Cooldown: {data.cooldown}</div>
    </div>
  );
}

/*
      "name": "Heavy Venom Cannon",
          "attacks": "1",
          "damage_armor_pen": "60-80 (5)",
          "splash_damage": "12-16 (x2)",
          "range_optimal": "1-6 (5)",
          "ap_cost": "1",
          "ammo": "X",
          "cooldown": "X"
*/
//<p>{data[selected].damage}</p>

export default RadioObjectDisplay;
