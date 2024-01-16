import React from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useState } from 'react'
import { validatePassword } from './auth-validator'
import RegisterInput from './RegisterInput'
import InputErrorMessage from './RegisterErrorMessage'

export default function PasswordForm({setIsOpenPasswordModal}) {

    const { authUser, updatePassword } = useAuth()
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const handleEditPassword = (e) => {
        e.preventDefault();
        const validationError = validatePassword(input);

        if (validationError) {
            return setError(validationError);
        }
        setError({});
        updatePassword(input)
        setIsOpenPasswordModal(false)
    }

    return (
        <form onSubmit={handleEditPassword} className="flex flex-col gap-4 w-[500px]" >
            <div className="flex gap-2 justify-between">
                <div className='w-full'>
                    <RegisterInput
                        type="text"
                        placeholder="old password"
                        value={input.password}
                        onChange={e => setInput({ ...input, oldPassword: e.target.value })}
                        hasError={error.password}
                    />
                    {error.password && <InputErrorMessage message={error.oldPassword} />}
                </div>
            </div>

            <div className="flex gap-2 justify-between">
                <div className='w-full'>
                    <RegisterInput
                        type="text"
                        placeholder="new password"
                        value={input.password}
                        onChange={e => setInput({ ...input, newPassword: e.target.value })}
                        hasError={error.password}
                    />
                    {error.password && <InputErrorMessage message={error.newPassword} />}
                </div>

                <div className='w-full'>
                    <RegisterInput
                        type="text"
                        placeholder="confirm new password"
                        value={input.confirmPassword}
                        onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
                        hasError={error.confirmPassword}
                    />
                    {error.confirmPassword && <InputErrorMessage message={error.confirmPassword} />}
                </div>
            </div>

            <button className="bg-orange-400 text-white w-full rounded-md text-lg font-bold py-2 px-4 hover:opacity-70">
                Update
            </button>
        </form>
    )
}
