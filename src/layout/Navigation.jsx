
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {

    return (
        <nav>
            <ul className='flex justify-center gap-4 hover items-baseline '>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                <li>
                    <Link to='/cart'>
                        <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
