'use client'
import AppContext from "../context/AppContext";
import {useContext} from "react";
import {Login} from "../components/auth/login";
import {usePathname} from "next/navigation";

export function AuthProvider({children, variant, icon, title, description}) {
    const {user, setRedirectPath} = useContext(AppContext);
    const pathname  = usePathname();
    setRedirectPath(pathname)
    if (user){
        return <>
            {children}
        </>
    }
    else{
        return <Login variant={variant} icon={icon} title={title} description={description}/>
    }
}