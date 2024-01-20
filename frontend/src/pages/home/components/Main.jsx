import React, { useState } from 'react'
import CreateTodo from './CreateTodo.jsx'
import TodoList from './TodoList.jsx'
import CategoryList from './CategoryList.jsx'

const Main = () => {
	const [updateData, setUpdateData] = useState(false)

	const handleUpdate = () => {
		setUpdateData(prev => !prev)
	}

	return (
		<main className="text-white bg-gray-900 h-max flex-1 items-center flex justify-between px-8 py-20 my-20 flex-col gap-12 lg:flex-row lg:py-0 lg:items-start">
			<CreateTodo handleUpdate={handleUpdate} />
			<TodoList handleUpdate={handleUpdate} />
			<CategoryList />
		</main>
	)
}

export default Main