import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


// hook
export function useAuth() {
    return useContext(AuthContext);
}
