import {AuthProvider} from "../../providers/auth-provider";

export default function Page(){
    return <>
        <AuthProvider>
            <h1>Account Page</h1>
        </AuthProvider>
    </>
}