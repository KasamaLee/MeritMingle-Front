import axios from 'axios'
import { useState } from 'react';
import { createContext } from 'react'
import { addAccessToken, removeAccessToken } from '../utils/local-storage';
import { toast } from 'react-toastify';

export const AuthContext = createContext()

//เอาไปครอบ <App/>
export default function AuthContextProvider({ children }) {

    const [authUser, setAuthUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false)

    // const { setAuthUser } = useContext(AuthContext)

    const login = async (input,onCloseModal) => {
        try {
            // axios post ไม่ได้ (500) => catch
            const response = await axios.post('http://localhost:8888/auth/login', input);

            const token = response.data.accessToken;

            addAccessToken(token);
            setAuthUser(response.data.user);
            onCloseModal();

        } catch (err) {
            console.log(err)
            toast.error('email or password incorrect!')
        }
    }

    const logout = () => {
        removeAccessToken();
        setAuthUser(null)
    }

    const register = async (input, onCloseModal) => {
        const response = await axios.post('http://localhost:8888/auth/register', input);

        const token = response.data.accessToken;
        addAccessToken(token);
        setAuthUser(response.data.user);
        onCloseModal();
    }

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, login, register, logout, isOpen, setIsOpen }}> {children}</AuthContext.Provider>
    )
}

