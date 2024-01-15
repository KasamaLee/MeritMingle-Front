import { useState } from "react";
import { useAuth } from "../../hooks/use-auth"
import LoginInput from "./LoginInput";
import { GoogleLogin } from "react-google-login";
import googleLogo from '../../assets/images/google.png'


export default function LoginForm({ setIsRegister, onCloseModal }) {

    // const {login} = useContext(AuthContext)
    const { login, onGoogleSuccess, onGoogleFailure, clientId } = useAuth();

    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleLoginForm = (e) => {
        e.preventDefault();
        login(input, onCloseModal)

        // or check if have user(authUser in AuthContext.jsx) ?
        // if (authUser) {
        //     onCloseModal();
        // }
    }


    return (
        <>
            <form onSubmit={handleLoginForm} className="flex flex-col gap-4 m-auto w-[500px] min-w-[240px]">

                <h6 className="text-lg text-gray-600">Welcome back!</h6 >

                <LoginInput
                    type="email"
                    placeholder="Email address"
                    value={input.email}
                    onChange={e => setInput({ ...input, email: e.target.value })}
                />

                <LoginInput
                    type="password"
                    placeholder="password"
                    value={input.password}
                    onChange={e => setInput({ ...input, password: e.target.value })}
                />

                <button className="bg-orange-400 text-white w-full rounded-md text-lg font-bold py-2 px-4 hover:opacity-70">Login</button>
            </form >

            <div className="flex items-center justify-center w-full">
                <hr className="w-64 h-px my-8 bg-gray-300 border-0" />
                <span className="absolute px-3 text-gray-500 -translate-x-1/2 bg-white left-1/2">
                    or
                </span>
            </div>

            <GoogleLogin
                clientId={clientId}
                buttonText='Continue with Google'
                onSuccess={(res) => onGoogleSuccess(res, onCloseModal)}
                onFailure={onGoogleFailure}
                cookiePolicy="single_host_origin"
                isSignedIn={false}
                render={renderProps => (
                    <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="mx-auto mb-6 text-sm ring-2 ring-gray-500 hover:bg-orange-200 text-black font-bold py-3 px-6 rounded flex justify-center items-center gap-3">
                        <img className='w-6 h-6' src={googleLogo} alt='google-logo' />
                        Continue with Google
                    </button>
                )}
            />

            <div className="text-center">
                <span className="text-gray-500">Don’t have an account?</span>
                <span
                    className="cursor-pointer underline text-orange-500 ml-2"
                    onClick={() => setIsRegister(true)}
                >
                    Register
                </span>
            </div>
        </>



    )
}
