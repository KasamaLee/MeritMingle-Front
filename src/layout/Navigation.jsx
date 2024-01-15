
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
                    <ul className='flex justify-center gap-4 items-baseline '>
                        <li className='hover:text-orange-400'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='hover:text-orange-400'>
                            <Link to='/contact'>Contact</Link>
                        </li>

                    </ul>
                </nav>
            ) : (
                <nav>
                    <ul className='flex justify-center gap-4 items-baseline '>
                        <li className='hover:text-orange-400'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li className='hover:text-orange-400'>
                            <Link to='/contact'>Contact</Link>
                        </li>
                        <Link to='/cart'>
                            <li className='relative hover:text-orange-400'>
                                <FontAwesomeIcon icon={faShoppingBag} size='xl' />
                                {carts.length > 0 && <div className='absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-sm flex justify-center items-center'>
                                    {carts.length}
                                </div>}
                            </li>
                        </Link>

                    </ul>
                </nav >
            )
            }
        </>

    )
}
