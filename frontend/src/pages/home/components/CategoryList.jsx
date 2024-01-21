import React from 'react'
import { useForm } from 'react-hook-form'

const CategoryList = ({ setCategoryOption }) => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		mode: 'onChange'
	})

	const addCategory = (data) => {
		setCategoryOption(prev => [...prev, { value: data.name, text: data.name, id: prev.id + 1 }])
		reset()
	}

	return (
		<form onSubmit={handleSubmit(addCategory)}
					className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl lg:w-1/2 р-96">
			<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Список категорий</h2>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Название категории: </label>
				<input
					{...register('name', {
						required: 'Поле обязательно для заполнения!'
					})}
					id="name"
					type="text"
					placeholder="Введите название категории"
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2" />
				<div
					className="text-red-400 max-w-2xl min-h-6 flex items-center justify-center text-center">
					{errors?.name?.message}
				</div>
				<button
					className="border w-full rounded-lg block p-2.5 bg-blue-600 border-gray-600 placeholder-gray-400 font-semibold focus:ring-blue-500 focus:border-blue-500 mb-2">Добавить
				</button>
			</div>
		</form>
	)
}

export default CategoryList