
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function Navigation() {

    const { isOpen, setIsOpen } = useAuth();

    return (
        <nav>
            <ul className='flex justify-center gap-4 hover items-baseline'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
                <li>
                    <button className="bg-orange-500 text-white px-4 py-1 rounded-2xl" onClick={() => setIsOpen(true)}>Login</button>
                </li>
            </ul>
        </nav>
    )
}
