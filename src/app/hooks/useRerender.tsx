import { useState } from "react";

export const useRerender = () => {
  const [rerenderKey, triggerRerender] = useState(0);

  const rerenderAction = () => {
    triggerRerender(new Date().getUTCMilliseconds());
  };

  return { rerenderKey, rerenderAction };
};
