import { Link } from 'react-router-dom';
import Navigation from "./Navigation";
import { useAuth } from '../hooks/use-auth';
import Modal from '../components/Modal';
import LoginAndRegister from '../features/auth/LoginAndRegister';
import Dropdown from './Dropdown';


export default function Header() {

    const { authUser, logout, isOpen, setIsOpen } = useAuth();


    return (
        <div className='shadow-md py-3'>
            <div className="container flex justify-between items-center m-auto">
                <Link to='/'>
                    <h4 className='logo'>MeritMingle</h4>
                </Link>

                <div className='flex justify-center items-center gap-4 font-medium'>
                    <Navigation />

                    {authUser ? (
                        <Dropdown />
                    ) : (
                        <button className="bg-orange-500 text-white rounded-3xl px-4 py-1" onClick={() => setIsOpen(true)}>
                            Login
                        </button>

                    )}
                </div>

                {/* ---- LOGIN MODAL ---- */}
                <Modal open={isOpen} onCloseModal={() => setIsOpen(false)}>
                    <LoginAndRegister onCloseModal={() => setIsOpen(false)} />
                </Modal>

            </div>
        </div>
    )
}
