
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useProduct } from '../hooks/use-product';

export default function Navigation() {

    const { authUser } = useAuth();
    const { carts } = useProduct();

    return (

        <>
            {!authUser ? (
                <nav>
                    <ul className='flex justify-center gap-4 hover items-baseline '>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>

                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul className='flex justify-center gap-4 hover items-baseline '>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <li className='relative'>
                            <Link to='/cart'>
                                <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                            </Link>
                            {carts.length > 0 && <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-sm flex justify-center items-center'>
                                {carts.length}
                            </div>}
                        </li>

                    </ul>
                </nav>
            )}
        </>

    )
}
