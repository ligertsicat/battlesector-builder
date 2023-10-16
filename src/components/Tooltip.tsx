import { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function CustomTooltip() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const tooltip = (
    <Tooltip id="tooltip">Click me to increase the count</Tooltip>
  );

  return (
    <div>
      <p>You clicked {count} times</p>
      <OverlayTrigger placement="top" overlay={tooltip}>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </OverlayTrigger>
    </div>
  );
}

export default CustomTooltip;
