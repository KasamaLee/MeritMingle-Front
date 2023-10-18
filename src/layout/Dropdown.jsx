import { useRef } from 'react';
import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


export default function Dropdown() {

    // Navigate
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const dropDownEl = useRef(null); //{ current: null }
    //  dropDownEl { current: object <div class='relative'></div> }

    const { logout, authUser } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            // console.log(e)
            if (!dropDownEl.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside);
    }, [])

    return (
        <div className='relative' ref={dropDownEl}>
            <button className='bg-orange-500 text-white rounded-3xl px-4 py-1' onClick={() => setIsOpen(!isOpen)}>
                <span className='mr-1'>{authUser.firstName}</span>
                <FontAwesomeIcon icon={faChevronDown} size="md" color="white" />
            </button>

            {isOpen && (
                <div className='w-64 absolute bg-white right-0 translate-y-1 border rounded-lg shadow-xl p-2'>
                    <div onClick={() => setIsOpen(false)} >

                        <div
                            className='flex gap-4 p-2 items-center rounded-xl hover:bg-gray-100 cursor-pointer'
                            onClick={() => navigate('/profile')}
                        >

                            <div>
                                <div className='font-semibold'>{authUser.firstName} {authUser.lastName}</div>
                                <div className='text-sm text-gray-500' >See your profile</div>
                            </div>
                        </div>
                        <hr className='m-2 border' />

                        <div
                            className='flex gap-4 p-2 items-center cursor-pointer hover:bg-gray-100 rounded-xl'
                            onClick={() => logout()}
                        >
                            <div className='bg-gray-300 h-9 aspect-square rounded-full flex justify-center items-center'>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                            <div className='font-semibold text-sm'>Log out</div>

                        </div>
                    </div>


                </div >
            )
            }

        </ div>
    )
}
