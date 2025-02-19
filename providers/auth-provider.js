'use client'
import AppContext from "../context/AppContext";
import {useContext} from "react";
import {Login} from "../components/auth/login";


export function AuthProvider({children}) {
    const {user} = useContext(AppContext);
    if (user){
        return <>
            <p>{user.name}</p>
            {children}
        </>
    }
    else{
        return <Login/>
    }
}