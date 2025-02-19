import {createContext, useCallback, useEffect, useState} from "react";
import requestData from "@/lib/api";
import {getToken} from "@/lib/server-utils";
// create context
const AppContext = createContext();


export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [redirectPath, setRedirectPath] = useState(null)
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    const token = await getToken();
    if (token && !user){
      const result = await requestData('/user/by-token/'+token, {method: 'POST'});
      if (result){
        const data = result.figure;
        setUser(() => data)
      }
    }
  }, [])

  useEffect(() => {
    checkUser()
  }, [checkUser]);



  return (
    <AppContext.Provider value={{ loading, setLoading, user, setUser, redirectPath, setRedirectPath }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
