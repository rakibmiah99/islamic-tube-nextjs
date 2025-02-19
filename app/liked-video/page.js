import {AuthProvider} from "../../providers/auth-provider";

export default function Page(){
    return <>
       <AuthProvider>
           <h1>Liked Video</h1>
       </AuthProvider>
    </>
}