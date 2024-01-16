import { useState } from 'react'
import RegisterInput from './RegisterInput'
import { validateRegister, validateProfile } from './auth-validator'
import { useAuth } from '../../hooks/use-auth'
import InputErrorMessage from './RegisterErrorMessage'


export default function ProfileInfoForm({ setIsOpenEditModal }) {

    const { authUser, updateProfileInfo } = useAuth()
    const [error, setError] = useState({})

    const [input, setInput] = useState({
        email: authUser.email,
        mobile: authUser.mobile || '',
        firstName: authUser.firstName,
        lastName: authUser.lastName,
    })


    const handleEditProfile = (e) => {
        e.preventDefault();
        const validationError = validateProfile(input);

        if (validationError) {
            return setError(validationError);
        }
        setError({});
        updateProfileInfo(input)
        setIsOpenEditModal(false)
    }

    return (
        <form onSubmit={handleEditProfile} className="flex flex-col gap-4 w-[500px]" >
            <div className='flex gap-2 justify-between'>
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

            <button className="bg-orange-400 text-white w-full rounded-md text-lg font-bold py-2 px-4 hover:opacity-70">
                Update
            </button>
        </form>
    )
}
