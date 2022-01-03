import React, { useEffect, useState } from "react";
import Example from ".../src/app";

export default function () {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const { graph } = PF;
  });
}
