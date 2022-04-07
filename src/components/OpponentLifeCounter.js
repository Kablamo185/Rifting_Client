import React, { useContext } from "react";

import { SocketContext } from "../SocketContext";

const OppLifeCounter = () => {
  const { oppLifeTotal } = useContext(SocketContext);

  return (
    <div className="btn__container">
      <span className="counter__output">{oppLifeTotal}</span>
    </div>
  );
};

export default OppLifeCounter;
