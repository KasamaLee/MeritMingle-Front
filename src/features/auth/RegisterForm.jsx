import Joi from 'joi';
import { useAuth } from '../../hooks/use-auth';
import { useState } from 'react';
import RegisterInput from './RegisterInput';
import InputErrorMessage from './RegisterErrorMessage';


const registerSchema = Joi.object(
    {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),

        password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/)
            .trim()
            .required(),
        confirmPassword: Joi.string().valid(Joi.ref('password'))
            .trim()
            .required()
            .strip(),
        email: Joi.string()
            .trim()
            .email({
                tlds: { allow: ['com', 'net'] }
            }),
        mobile: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .required(),
    }
)

const validateRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false });

    if (error) {
        const result = error.details.reduce((acc, elem) => {
            const { message, path } = elem;
            acc[path[0]] = message;
            return acc;
        }, {});
        return result;
    }
}

export default function RegisterForm({ setIsRegister, onCloseModal }) {


    const { register } = useAuth();

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
