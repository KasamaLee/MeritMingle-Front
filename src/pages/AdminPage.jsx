import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';


export default function AdminPage() {
	return (
		<div className="container flex justify-center gap-10 p-10">

			<div className="bg-gray-300 p-10 rounded-xl" >
				<FontAwesomeIcon icon={faPlusSquare} />
				<span className="ml-2">
					Add new product
				</span>
			</div>
			
			<div className="bg-gray-300 p-10 rounded-xl" >
				<FontAwesomeIcon icon={faPlusSquare} />
				<span className="ml-2">
					Add new product
				</span>
			</div>


		</div>
	)
}
