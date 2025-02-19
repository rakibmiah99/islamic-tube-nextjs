'use server'
import {cookies} from "next/headers";
import {decryptData, encryptData} from "./utils";

export async function setToken(token){
    const storeCookie = await cookies()
    token = encryptData(token)
    storeCookie.set('token', token)
}

export async function getToken(){
    const storeCookie = await cookies()
    const token = storeCookie.get('token')?.value;
    if(token){
        return decryptData(token)
    }

    return null;
}