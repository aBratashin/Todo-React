import React, { useEffect, useState } from 'react'
import { PiNotepadBold } from 'react-icons/pi'
import { RiDeleteBinLine, RiEdit2Line } from 'react-icons/ri'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios'
import { useAuth } from '../../../hook/useAuth.js'

const TodoList = ({ handleUpdate, editTodo, editCompletedTodo }) => {
	const [todos, setTodos] = useState([])
	const [completedTodos, setCompletedTodos] = useState([])
	const [loading, setLoading] = useState(false)

	const { user } = useAuth()

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true)
				const response = await axios.get('http://localhost:3001/get_todos')
				const filteredData = response.data.filter(data => data.author === user)
				setTodos(filteredData)
			} catch (error) {
				console.error('Error fetching todos:', error)
			} finally {
				setLoading(false)
			}
		}

		const getCompletedData = async () => {
			try {
				setLoading(true)
				const response = await axios.get('http://localhost:3001/get_completed_todos')
				const filteredCompletedData = response.data.filter(data => data.author === user)
				setCompletedTodos(filteredCompletedData)
			} catch (error) {
				console.error('Error fetching completed todos:', error)
			} finally {
				setLoading(false)
			}
		}

		getData()
		getCompletedData()
	}, [handleUpdate, user])

	const deleteTodo = async (id) => {
		try {
			await axios.delete('http://localhost:3001/delete_todo', { data: { id } })
			handleUpdate()
		} catch (error) {
			console.error('Ошибка при удалении задачи', error)
		}
	}

	const completedTodo = async (todo) => {
		try {
			await axios.post('http://localhost:3001/completed_todo', todo)
			await deleteTodo(todo.id)
		} catch (error) {
			console.error('Ошибка при выполнении задачи', error)
		}
	}

	const deleteCompletedTodo = async (id) => {
		try {
			await axios.delete('http://localhost:3001/delete_completed_todo', { data: { id } })
			handleUpdate()
		} catch (error) {
			console.error('Ошибка при удалении выполненной задачи', error)
		}
	}

	const commonTodo = async (todo) => {
		try {
			await axios.post('http://localhost:3001/common_todo', todo)
			await deleteCompletedTodo(todo.id)
		} catch (error) {
			console.error('Ошибка при отмене выполнения задачи', error)
		}
	}

	return (
		<div
			className="bg-gray-800 border-2 rounded-2xl py-4 px-8 text-white flex flex-col items-center justify-center min-w-xl max-w-2xl lg:w-1/2 overflow-auto">
			<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Список задач</h2>
			{loading ? (
				<div>Loading...</div>
			) : todos.length ? (
				todos.map(todo => (
					<div
						className="border rounded-lg flex-col gap-4 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 flex focus:ring-blue-500 focus:border-blue-500 mb-2"
						key={todo.id}
					>
						<div className="flex items-center justify-between flex-col lg:flex-row">
							<div className="flex gap-4 items-center">
								<PiNotepadBold color={'#fde047'} size={30} />
								<h3 className="font-bold">{todo.name}</h3>
							</div>
							<div className="flex items-center gap-4">
								<IoMdCheckmarkCircleOutline onClick={() => completedTodo(todo)} color={'#90EE90'} size={30}
																						className="cursor-pointer" title="Выполнить задачу" />
								<RiEdit2Line onClick={() => editTodo(todo.id)} color={'#60a5fa'} size={30} className="cursor-pointer"
														 title="Редактировать задачу" />
								<RiDeleteBinLine onClick={() => deleteTodo(todo.id)} color={'#F08080'} size={30}
																 className="cursor-pointer" title="Удалить задачу" />
							</div>
						</div>
						<div className="text-justify break-words">{todo.description}</div>
						<div className="flex justify-between flex-col lg:flex-row">
							<div>Категория: {todo.category}</div>
							<div>Автор: {todo.author}</div>
						</div>
					</div>
				))
			) : (
				<h3 className="font-bold text-red-400 my-2 text-center">Список задач пуст!</h3>
			)}

			{completedTodos.length > 0 && (
				<h2 className="font-semibold text-3xl lg:text-4xl py-8 text-center">Выполнено</h2>
			)}
			{completedTodos.length ? (
				completedTodos.map(todo => (
					<div
						className="border rounded-lg flex-col gap-4 w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 flex focus:ring-blue-500 focus:border-blue-500 mb-2"
						key={todo.id}
					>
						<div className="flex items-center justify-between flex-col lg:flex-row">
							<div className="flex gap-4 items-center">
								<PiNotepadBold color={'#fde047'} size={30} />
								<h3 className="font-bold">{todo.name}</h3>
							</div>
							<div className="flex items-center gap-4">
								<MdOutlineCancel onClick={() => commonTodo(todo)} color={'#90EE90'} size={30} className="cursor-pointer"
																 title="Отменить выполнение задачи" />
								<RiEdit2Line onClick={() => editCompletedTodo(todo.id)} color={'#60a5fa'} size={30}
														 className="cursor-pointer" title="Редактировать выполненную задачу" />
								<RiDeleteBinLine onClick={() => deleteCompletedTodo(todo.id)} color={'#F08080'} size={30}
																 className="cursor-pointer" title="Удалить выполненную задачу" />
							</div>
						</div>
						<div className="text-justify break-words">{todo.description}</div>
						<div className="flex justify-between flex-col lg:flex-row">
							<div>Категория: {todo.category}</div>
							<div>Автор: {todo.author}</div>
						</div>
					</div>
				))
			) : (
				<h3 className="font-bold text-red-400 my-2 text-center">Список выполненных задач пуст!</h3>
			)}
		</div>
	)
}

export default TodoList