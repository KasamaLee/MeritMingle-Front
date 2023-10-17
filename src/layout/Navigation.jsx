
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export default function Navigation() {



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
            </ul>
        </nav>
    )
}
