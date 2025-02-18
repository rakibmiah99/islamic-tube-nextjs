import { createContext, useContext, useEffect, useState } from "react";
import requestData from "@/lib/api";
import { getToken } from "@/lib/utils";
// create context
const AppContext = createContext();

//create use app hooks
export const useAppContext = () => useContext(AppContext);
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  console.log("Use Context");
  return (
    <AppContext.Provider value={{ loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
