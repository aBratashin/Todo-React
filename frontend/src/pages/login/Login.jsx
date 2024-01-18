import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../hook/useAuth.js'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEXP } from '../../constants/Constants.js'

const Login = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { signIn } = useAuth()

	const fromPage = location.state?.from?.pathname || '/'

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		mode: 'onChange'
	})

	const loginUser = (data) => {

		const requestData = {
			email: data.email,
			password: data.password
		}

		axios.post('http://localhost:3001/login', requestData)
			.then(res => {
				if (res.data.Status === 'Success') {
					signIn(data.email, () => navigate(fromPage, { replace: true }))
				} else {
					alert(res.data.Error)
				}
			})

		reset(data)
	}

	return (
		<div className="bg-gray-900 w-full h-screen flex flex-col items-center justify-center">
			<div className='flex items-center justify-center gap-4 mb-4'>
				<div className=' flex items-center justify-center rounded-full bg-white p-2'>
					<img src="./favicon.svg" alt="" width={50} height={50} />
				</div>
				<h1 className='font-semibold text-3xl lg:text-4xl py-8 text-green-400'>Todo List</h1>
			</div>
			<form
				className="border-2 rounded-2xl py-4 px-8 mx-2 text-white flex flex-col items-center justify-center max-w-xl lg:w-1/2"
				onSubmit={handleSubmit(loginUser)}>
				<h2 className="font-semibold text-3xl lg:text-4xl py-8">Авторизация</h2>
				<div className="py-2 w-full">
					<label htmlFor="email" className="block mb-2 font-semibold cursor-pointer">Почта: </label>
					<input
						id="email"
						className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2"
						type="email"
						placeholder="Введите почту"
						{...register('email', {
							required: 'Поле обязательно для заполнения!',
							minLength: {
								value: 4,
								message: 'Минимальная длина имени 4 символа!'
							},
							pattern: {
								value: EMAIL_REGEXP,
								message: 'Введите правильный адрес почты!'
							}
						})}
					/>
					<div
						className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">{errors?.email?.message}</div>
				</div>
				<div className="py-2 w-full">
					<label htmlFor="password" className="block mb-2 font-semibold cursor-pointer">Пароль: </label>
					<input
						id="password"
						className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2"
						type="password"
						placeholder="Введите пароль"
						{...register('password', {
							required: 'Поле обязательно для заполнения!',
							minLength: {
								value: 4,
								message: 'Минимальная длина имени 4 символа!'
							}
						})}
					/>
					<div
						className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">{errors?.password?.message}</div>
				</div>
				<div className="py-2 w-full text-center">
					<button
						className="focus:ring-4 focus:outline-none font-semibold rounded-lg w-full text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mb-8 py-2">Войти
					</button>
					<div className='text-lg'>Нет аккаунта? <Link to="/register" className="hover:underline text-blue-500">Зарегистрироваться</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Login