import React from 'react'

const CreateTodo = () => {
	return (
		<div
			className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl lg:w-1/2">
			<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Добавить задачу</h2>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="name" className="block mb-2 font-semibold cursor-pointer">Название: </label>
				<input
					id="name"
					type="text"
					placeholder="Добавьте задачу"
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2" />
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="description" className="block mb-2 font-semibold cursor-pointer">Описание: </label>
				<textarea
					id="description"
					placeholder="Добавьте описание задачи"
					className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2 min-h-80 resize-none" />
			</div>
			<div className="py-2 mb-8 w-full flex gap-4 flex-col">
				<label htmlFor="category" className="block mb-2 font-semibold cursor-pointer">Категория: </label>
				<select id="category"
								className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 mb-2">
					<option selected>Выберите категорию</option>
					<option value="US">Спорт</option>
					<option value="CA">Здоровье</option>
					<option value="FR">Еда</option>
					<option value="DE">Путешествия</option>
				</select>
			</div>
			<button
				className="border w-full rounded-lg block p-2.5 bg-blue-600 border-gray-600 placeholder-gray-400 font-semibold focus:ring-blue-500 focus:border-blue-500 mb-2">Добавить
			</button>
		</div>
	)
}

export default CreateTodo