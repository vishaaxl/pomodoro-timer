import React, { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext<any | null>(null);

export const ContextProvider = ({ children }: any) => {
  const [data, setData] = useState({
    ad: true,
    rest: 5,
    session: 3,
    work: 25,
    tasks: ["Don't Lose Focus"],
    ambience: {
      id: 1,
      name: "waves",
      imagePath: "https://media.tenor.com/nrxsL7xAR6IAAAAM/ghibli-sea.gif",
      soundPath: "/audio/ocean.mp3",
    },
  });

  const updateTimerData = (values: typeof data) => {
    setData(values);
  };

  return (
    <TimerContext.Provider value={{ ...data, updateTimerData }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimerData = () => {
  return useContext(TimerContext);
};
