'use server'

import {getToken} from "@/lib/server-utils";

const BASE_URL = 'http://test1.nexerb.xyz/public/api';
import axios from "axios";
// const BASE_URL = 'http://127.0.0.1:8000/api';

export default async function requestData(endpoint, options = {}){
    const token = await getToken();

    try {
        if (!options.method){
            options.method = 'GET';
        }

        if (token){
            options.headers = {
                Authorization: `Bearer ${token}`
            };
        }

        const res = await axios.request(BASE_URL + endpoint, options);

        if(!res.status > 299){
            throw new Error(`API Error: ${res.status}`)
        }

        return await res.data;
    }
    catch (error) {
        // Check if error has response and access the response message
        if (error.response) {
            console.error('API Fetch Error:', error.response.data?.message || error.response.statusText);
        } else if (error.request) {
            // This means the request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // For any other errors (e.g., setup or network issues)
            console.error('Error during request setup:', error.message);
        }
        return null; // Return null in case of any error
    }
}
