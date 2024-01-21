import React, { useState } from 'react'
import CreateTodo from './CreateTodo.jsx'
import TodoList from './TodoList.jsx'
import CategoryList from './CategoryList.jsx'
import axios from 'axios'

const Main = () => {
	const [updateData, setUpdateData] = useState(false)
	const [todoData, setTodoData] = useState([])
	const [isEditable, setIsEditable] = useState(JSON.parse(localStorage.getItem('isEdit'))?.isEdit || false)
	const [categoryOptions, setCategoryOption] = useState([
		{ id: 1, value: 'Спорт', text: 'Спорт' },
		{ id: 2, value: 'Здоровье', text: 'Здоровье' },
		{ id: 3, value: 'Еда', text: 'Еда' },
		{ id: 4, value: 'Путешествия', text: 'Путешествия' }
	])

	console.log(categoryOptions)
	
	const handleUpdate = () => {
		setUpdateData(prev => !prev)
	}

	const checkIsEdit = (id) => {
		if (id === JSON.parse(localStorage.getItem('isEdit'))?.id) {
			setIsEditable(prev => !prev)
			localStorage.setItem('isEdit', JSON.stringify({ isEdit: !isEditable, id }))
		} else {
			setIsEditable(true)
			localStorage.setItem('isEdit', JSON.stringify({ isEdit: isEditable, id }))
		}
	}

	const editTodo = async (id) => {
		await checkIsEdit(id)
		const response = await axios.post('http://localhost:3001/get_todo', { id })
		setTodoData(response.data[0])
		return response
	}

	const editCompletedTodo = async (id) => {
		await checkIsEdit(id)
		const response = await axios.post('http://localhost:3001/get_completed_todo', { id })
		setTodoData(response.data[0])
		return response
	}

	return (
		<main
			className="text-white bg-gray-900 h-max flex-1 items-center flex justify-between px-8 py-20 my-20 flex-col gap-12 lg:flex-row lg:py-0 lg:items-start">
			<CreateTodo handleUpdate={handleUpdate} todoData={todoData} isEditable={isEditable}
									setIsEditable={setIsEditable} categoryOptions={categoryOptions} />
			<TodoList handleUpdate={handleUpdate} editTodo={editTodo} editCompletedTodo={editCompletedTodo} />
			<CategoryList setCategoryOption={setCategoryOption}  />
		</main>
	)
}

export default Main