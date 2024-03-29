import { useAuth } from '../../hooks/use-auth';
import { useState } from 'react';
import RegisterInput from './RegisterInput';
import { validateRegister } from './auth-validator'
import InputErrorMessage from './RegisterErrorMessage';
import { GoogleLogin } from "react-google-login";
import googleLogo from '../../assets/images/google.png'


export default function RegisterForm({ setIsRegister, onCloseModal }) {


    const { register, onGoogleSuccess, onGoogleFailure, clientId } = useAuth();

    const [input, setInput] = useState({
        email: '',
        mobile: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    })

    const [error, setError] = useState({})


    const handleRegisterForm = (e) => {
        e.preventDefault();

        const validationError = validateRegister(input);

        // ถ้า validationError มีค่าให้ setError()
        if (validationError) {
            return setError(validationError);
        }
        setError({});
        register(input, onCloseModal)
    }


    return (
        <>
            <form onSubmit={handleRegisterForm} className="flex flex-col gap-4 w-[500px]">
                <h6 className="text-lg text-gray-600">Register</h6 >
                <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                        <RegisterInput
                            placeholder="Email address"
                            value={input.email}
                            onChange={e => setInput({ ...input, email: e.target.value })}
                            hasError={error.email}
                        />
                        {error.email && <InputErrorMessage message={error.email} />}
                    </div>

                    <div className='w-full'>
                        <RegisterInput
                            placeholder="Mobile"
                            value={input.mobile}
                            maxlength={10}
                            onChange={e => setInput({ ...input, mobile: e.target.value })}
                            hasError={error.mobile}
                        />
                        {error.mobile && <InputErrorMessage message={error.mobile} />}

                    </div>
                </div>

                <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                        <RegisterInput
                            placeholder="first name"
                            value={input.firstName}
                            onChange={e => setInput({ ...input, firstName: e.target.value })}
                            hasError={error.firstName}
                        />
                        {error.firstName && <InputErrorMessage message={error.firstName} />}
                    </div>
                    <div className='w-full'>
                        <RegisterInput
                            placeholder="last name"
                            value={input.lastName}
                            onChange={e => setInput({ ...input, lastName: e.target.value })}
                            hasError={error.lastName}
                        />
                        {error.lastName && <InputErrorMessage message={error.lastName} />}
                    </div>
                </div>

                <div className="flex gap-2 justify-between">
                    <div className='w-full'>
                        <RegisterInput
                            type="password"
                            placeholder="password"
                            value={input.password}
                            onChange={e => setInput({ ...input, password: e.target.value })}
                            hasError={error.password}
                        />
                        {error.password && <InputErrorMessage message={error.password} />}
                    </div>

                    <div className='w-full'>
                        <RegisterInput
                            type="confirmPassword"
                            placeholder="confirm password"
                            value={input.confirmPassword}
                            onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
                            hasError={error.confirmPassword}
                        />
                        {error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
                    </div>

                </div>

                <button className="bg-orange-400 text-white w-full rounded-md text-lg font-bold py-2 px-4 hover:opacity-70">Register</button>
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
                <span className="text-gray-500">Already have an account?</span>
                <span
                    className="cursor-pointer underline text-orange-500 ml-2"
                    onClick={() => setIsRegister(false)}
                >
                    Login
                </span>
            </div>

        </>


    )
}
