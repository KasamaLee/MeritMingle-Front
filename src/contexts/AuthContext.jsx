import axios from '../config/axios';
import { useState } from 'react';
import { createContext } from 'react'
import { addAccessToken, getAccessToken, removeAccessToken } from '../utils/local-storage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { gapi } from "gapi-script";


export const AuthContext = createContext()

//เอาไปครอบ <App/>
export default function AuthContextProvider({ children }) {


    const [authUser, setAuthUser] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false)

    const clientId = "213199379663-dd1gl68k2j606ss5vrpgia0m6pu41q7r.apps.googleusercontent.com"


    useEffect(() => {
        if (getAccessToken()) {
            getMe();
        } else {
            setInitialLoading(false);
        }

        // initialize Google API client
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            })
        }
        // load Google API client for auth service
        gapi.load("client:auth2", initClient)
    }, []);


    const getMe = async () => {
        try {
            const response = await axios.get('/auth/me')
            // console.log(authUser, '------------')
            setAuthUser(response.data.user);

        } catch (err) {
            console.log(err)
        } finally {
            setInitialLoading(false);
        }
    }

    const onGoogleSuccess = async (res, onCloseModal) => {
        // console.log(res)
        try {
            const data = {
                firstName: res.profileObj.givenName,
                lastName: res.profileObj.familyName,
                email: res.profileObj.email,
                googleId: res.profileObj.googleId,
            }
            const response = await axios.post('/auth/google', data)
            // console.log(response)

            const token = response.data.accessToken;

            // เอา token ไปแปะใส่ localStorage
            addAccessToken(token);
            setAuthUser(response.data.user)
            onCloseModal();

        } catch (err) {
            console.log(err)
        }
    }

    const onGoogleFailure = (res) => {
        alert('Log in with Google Failed')
        console.log('failed', res)
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

    const register = async (input) => {
        const response = await axios.post('/auth/register', input);

        const token = response.data.accessToken;
        addAccessToken(token);
        setAuthUser(response.data.user);
    }

    const updateProfileInfo = async (input) => {
        try {
            const response = await axios.patch('/auth/update', input)
            // console.log(response)
            getMe();
        } catch (err) {
            console.log(err)
        }
    }

    const updatePassword = async (input) => {

    }

    return (
        <AuthContext.Provider value={{
            authUser, setAuthUser,
            onGoogleSuccess, onGoogleFailure, clientId,
            login,
            register,
            logout,
            isOpen, setIsOpen,
            updateProfileInfo,
            updatePassword,
            initialLoading, setInitialLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

