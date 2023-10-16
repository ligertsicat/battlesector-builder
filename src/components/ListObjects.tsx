import { useState } from "react";
import Unit from "../Unit";
import UnitButton2 from "../UnitButton2";

interface Props {
  items: Unit[];
  heading: string;

  onSelectItem: (item: string) => void;
}

function ListObjects({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <h1> {heading} </h1>
      {items.length === 0 ? <p>no item found</p> : null}
      <ul className="list-group">
        {items.map((item, index) => (
          <UnitButton2 text={item.name} onClick={() => {}} />
        ))}
      </ul>
    </>
  );
}

export default ListObjects;
