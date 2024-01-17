import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/use-auth';


export default function AdminHeader() {

    const { authUser, logout, isOpen, setIsOpen } = useAuth();

    // Navigate
    const navigate = useNavigate();

    return (
        <div className='shadow-md py-3 fixed w-full bg-white z-50'>
            <div className="container flex justify-between items-center m-auto">
                <Link to='/'>
                    <h4 className='logo'>MeritMingle</h4>
                </Link>

                <div className='flex justify-center items-center gap-4 font-medium'>

                    <nav>
                        <ul className='flex justify-center gap-4 hover items-baseline' >
                            <li className='hover:text-orange-400'>
                                <Link to='/'>รายการสั่งซื้อ</Link>
                            </li>
                            <li className='hover:text-orange-400'>
                                <Link to='/edit-product'>แก้ไขข้อมูลสินค้า</Link>
                            </li>

                        </ul>
                    </nav>


                    <button className="bg-orange-500 text-white rounded-3xl px-4 py-1"
                        onClick={() => {
                            logout()
                            navigate('/')
                        }}>
                        Logout
                    </button>


                </div>



            </div>
        </div>
    )
}
