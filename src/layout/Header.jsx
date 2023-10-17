import { Link } from 'react-router-dom';
import Navigation from "./Navigation";
import { useAuth } from '../hooks/use-auth';
import Modal from '../components/Modal';
import LoginAndRegister from '../features/auth/LoginAndRegister';


export default function Header() {

    const { authUser, logout,  isOpen, setIsOpen } = useAuth();


    return (
        <div className='shadow-md py-2'>
            <div className="container flex justify-between items-center m-auto">
                <Link to='/'>
                    <h4 className='logo'>MeritMingle</h4>
                </Link>

                <div className='flex justify-center items-center gap-4'>
                    <Navigation />

                    {authUser ? (
                        <button className="bg-orange-500 text-white px-4 py-1 rounded-3xl" onClick={() => logout()}>Logout</button>

                    ) : (
                        <button className="bg-orange-500 text-white px-4 py-1 rounded-3xl" onClick={() => setIsOpen(true)}>Login</button>

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
