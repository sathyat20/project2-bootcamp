// Make a provider file 
import {useState, createContext } from "react";

export const TripContext = createContext();

export default function TripProvider({children}) {

  const [title, setTitle] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  return (
      <TripContext.Provider value={{title, setTitle, date, setDate}}>
        {children}
      </TripContext.Provider>
  );

}