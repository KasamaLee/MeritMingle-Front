import { Link } from 'react-router-dom';
import Navigation from "./Navigation";


export default function Header() {

    
    return (
        <div className='shadow-md py-2'>
            <div className="container flex justify-between items-center m-auto">
                <Link to='/'>
                    <h4 className='logo'>MeritMingle</h4>
                </Link>
                <Navigation />
            </div>
        </div>
    )
}
