import axios from '../config/axios';
import { useState } from 'react';
import { createContext } from 'react'
import { addAccessToken, getAccessToken, removeAccessToken } from '../utils/local-storage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const AuthContext = createContext()

//เอาไปครอบ <App/>
export default function AuthContextProvider({ children }) {


    const [authUser, setAuthUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        if (getAccessToken()) {
            getMe();
        } else {
            setInitialLoading(false);
        }
    }, []);

    


    const getMe = async () => {
        try {
            const response = await axios.get('/auth/me')
            setAuthUser(response.data.user);

        } catch (err) {
            console.log(err)
        } finally {
            setInitialLoading(false);
        }
    }


    const login = async (input, onCloseModal) => {
        try {
            // axios post ไม่ได้ (500) => catch
            const response = await axios.post('/auth/login', input);

            const token = response.data.accessToken;

            addAccessToken(token);
            setAuthUser(response.data.user);
            // authUser: {'2','john','doe','john@gmail.com','0899999999','$2a$10$TLyBSSrUHMVQlsCzHecJqe6JU7kFxnCsNRWFeuRXGEQNOrX0Ce.9O',NULL,'USER'}

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
        <AuthContext.Provider value={{ authUser, setAuthUser, login, register, logout, isOpen, setIsOpen, initialLoading, setInitialLoading }}> {children}</AuthContext.Provider>
    )
}

