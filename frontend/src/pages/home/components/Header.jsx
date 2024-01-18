import { useAuth } from '../../../hook/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const { user, signOut } = useAuth()

	const navigate = useNavigate()

	return (
		<header
			className="w-full h-32 bg-gray-800 text-white flex items-center flex-col justify-between px-8 py-4 rounded-xl lg:flex-row lg:h-24">
			<div className="flex items-center justify-center gap-4">
				<div className="flex items-center justify-center rounded-full bg-white p-2">
					<img src="./favicon.svg" alt="" width={50} height={50} />
				</div>
				<h1 className="font-semibold text-4xl text-green-400">Todo List</h1>
			</div>
			<div className="flex gap-4 font-medium">
				<div>{user}</div>
				<div>|</div>
				<button onClick={() => signOut(() => navigate('/login', { replace: true }))}
								className="hover:underline hover:text-blue-500">Выйти
				</button>
			</div>
		</header>
	)
}

export default Header