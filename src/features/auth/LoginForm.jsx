import { useState } from "react";
import { useAuth } from "../../hooks/use-auth"
import LoginInput from "./LoginInput";



export default function LoginForm({ setIsRegister, onCloseModal }) {

    // const {login} = useContext(AuthContext)
    const { login} = useAuth();

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
            <form onSubmit={handleLoginForm} className="flex flex-col gap-4">
                <p>Welcome back!</p >
                <LoginInput
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
                <button className="bg-orange-400 text-white w-full rounded-md text-xl font-bold py-2.5">Login</button>

            </form >
            <div className="flex flex-col gap-4">
                <p>Don't have an account?</p>
                <button
                    onClick={() => setIsRegister(true)}
                    className="bg-green-400 text-white w-full rounded-md text-xl font-bold py-2.5"
                >
                    Register
                </button>
            </div>
        </>



    )
}
