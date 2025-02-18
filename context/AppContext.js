import { createContext, useState, useEffect } from 'react';
import requestData from "@/lib/api";
import {getLocalUser, getToken} from "@/lib/utils";

// create context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const userInfo = getLocalUser()
    const [user, setUser] = useState(userInfo);

    useEffect(() => {
        // যদি user আগে থেকেই থাকে, তবে পুনরায় কল করার দরকার নেই
        if (user) return;
        alert(user)
        const checkUser = async () => {
            if (getToken() && !user) {
                const response = await requestData('/user/by-token/' + getToken(), { method: 'POST' });
                if (response) {
                    setUser(response?.figure); // user সেট করা
                }
            }
        };

        checkUser(); // `checkUser()` একবারই কল হবে

    }, [user]); // `user` ডিপেন্ডেন্সি যুক্ত করা, যাতে `user` সেট হলে পুনরায় কল না হয়

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
