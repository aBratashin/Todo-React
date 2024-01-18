import React from 'react'
import CreateTodo from './CreateTodo.jsx'
import TodoList from './TodoList.jsx'
import CategoryList from './CategoryList.jsx'

const Main = () => {
	return (
		<main className="text-white h-max flex-1 flex items-center justify-between px-8 py-20 flex-col gap-12 lg:flex-row lg:py-0">
			<CreateTodo />
			<TodoList />
			<CategoryList />
		</main>
	)
}

export default Main