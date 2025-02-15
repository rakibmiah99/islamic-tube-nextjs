// const BASE_URL = 'http://test1.nexerb.xyz/public/api';
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000/api';

export default async function requestData(endpoint, options = {}){
    try {
        if (!options.method){
            options.method = 'GET';
        }
        const res = await axios.request(BASE_URL + endpoint, options);

        if(!res.status > 299){
            throw new Error(`API Error: ${res.status}`)
        }

        return await res.data;
    }
    catch (error) {
        console.error('API Fetch Error:', error.message);
        return null; // Error হলে null return করবে
    }
}
