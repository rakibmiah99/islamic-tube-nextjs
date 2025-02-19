
import {AuthProvider} from "../../providers/auth-provider";

export default function Page(){
    return <AuthProvider>
        <h1>Hello</h1>
    </AuthProvider>
}