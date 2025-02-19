'use server'
import {cookies} from "next/headers";
import {decryptData, encryptData} from "./utils";

export async function setToken(token){
    try {
        const storeCookie = await cookies()
        token = encryptData(token)
        await storeCookie.set('token', token)
    } catch (error) {
        console.error('Error setting token:', error)
    }
}

export async function getToken(){
    try {
        const storeCookie = await cookies()
        const token = storeCookie.get('token')?.value;
        if(token){
            return decryptData(token)
        }
        return null;
    } catch (error) {
        console.error('Error getting token:', error)
        return null;
    }
}

export async function deleteToken(){
    try {
        const storeCookie = await cookies()
        storeCookie.delete('token');
    } catch (error) {
        console.error('Error deleting token:', error)
    }
}
