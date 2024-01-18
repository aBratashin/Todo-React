import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEXP } from '../../constants/Constants.js'

const Register = () => {
	const navigate = useNavigate()

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		mode: 'onChange'
	})

	const registerUser = (data) => {
		axios.post('http://localhost:3001/register', data)
			.then(res => {
				if (res.data.Status === 'Success') {
					navigate('/login')
				} else {
					alert(res.data.Error)
				}
			})

		reset(data)
	}

	return (
		<div className="bg-gray-900 w-full h-screen flex flex-col items-center justify-center">
			<div className="flex items-center justify-center gap-4 mb-4">
				<div className=" flex items-center justify-center rounded-full bg-white p-2">
					<img src="./favicon.svg" alt="logo" width={50} height={50} />
				</div>
				<h1 className="font-semibold text-3xl lg:text-4xl py-8 text-green-400">Todo List</h1>
			</div>
			<form
				className="bg-gray-800 border-2 rounded-2xl py-4 px-8 mx-2 text-white flex flex-col items-center justify-center max-w-xl lg:w-1/2"
				onSubmit={handleSubmit(registerUser)}>
				<h2 className="font-semibold text-3xl lg:text-4xl py-8">Регистрация</h2>
				<div className="py-2 w-full">
					<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Имя: </label>
					<input
						id="name"
						className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2"
						type="text"
						placeholder="Введите имя"
						{...register('name', {
							required: 'Поле обязательно для заполнения!',
							minLength: {
								value: 4,
								message: 'Минимальная длина имени 4 символа!'
							}
						})}
					/>
					<div
						className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">{errors?.name?.message}</div>
				</div>
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
								message: 'Минимальная длина почты 4 символа!'
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
								value: 8,
								message: 'Минимальная длина пароля 8 символов!'
							}
						})}
					/>
					<div
						className="text-red-400 max-w-2xl min-h-8 flex items-center justify-center text-center">{errors?.password?.message}</div>
				</div>
				<div className="py-2 w-full text-center">
					<button
						className="focus:ring-4 focus:outline-none font-semibold rounded-lg w-full text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 mb-8 py-2">Зарегистрироваться
					</button>
					<div className="text-lg">Уже есть аккаунт? <Link to="/login"
																													 className="hover:underline text-blue-500">Войти</Link>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Register