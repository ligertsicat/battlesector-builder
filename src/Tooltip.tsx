import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface Props {
  text: string;
}

function CustomTooltip({ text }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const tooltip = (
    <Tooltip id="tooltip">
      <p>Damage: 1</p>
      <p>Shots: 2</p>
    </Tooltip>
  );

  return (
    <div>
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button onClick={() => setCount(count + 1)}>{text}</button>
      </OverlayTrigger>
    </div>
  );
}

export default CustomTooltip;
