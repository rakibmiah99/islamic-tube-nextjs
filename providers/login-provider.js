'use client'
import {Login} from "../components/auth/login";
import AppContext from "../context/AppContext";
import {useContext} from "react";
export default function LoginProvider({children}) {
    const {user} = useContext(AppContext);

    return user?  <>{children}</> : <Login/>
}