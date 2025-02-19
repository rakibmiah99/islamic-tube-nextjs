import {AuthProvider} from "../../providers/auth-provider";

export default function Page(){
    return <AuthProvider>
        <h1>My Playlist</h1>
    </AuthProvider>
}