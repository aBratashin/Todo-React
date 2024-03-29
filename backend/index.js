import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import bcrypt from 'bcrypt'

const salt = 10

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'todo'
})

app.post('/register', (req, res) => {
	const checkUserSql = 'SELECT * FROM users WHERE email = ?'
	const insertUserSql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)'

	db.query(checkUserSql, [req.body.email], (err, existingUser) => {
		if (existingUser.length > 0) {
			return res.json({ Error: 'Пользователь с такой почтой уже существует!' })
		}

		bcrypt.hash(req.body.password.toString(), salt, (hashErr, hash) => {
			if (hashErr) {
				return res.json({ Error: 'Ошибка при хэшировании пароля!' })
			}

			const values = [
				req.body.name,
				req.body.email,
				hash
			]

			db.query(insertUserSql, [values], (insertErr, result) => {
				if (insertErr) {
					return res.json({ Error: 'Ошибка при регистрации пользователя!' })
				}
				return res.json({ Status: 'Success' })
			})
		})
	})
})

app.post('/login', (req, res) => {
	const sql = 'SELECT * FROM users WHERE email = ?'

	db.query(sql, [req.body.email], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при авторизации пользователя!' })

		if (data.length > 0) {
			bcrypt.compare(req.body.password.toString(), data[0].password, (error, response) => {
				if (!response) return res.json({ Error: 'Неправильный пароль!' })
				if (response) return res.json({ Status: 'Success' })
			})
		} else {
			return res.json({ Error: 'Пользователь не найден!' })
		}
	})
})

app.post('/add_todo', (req, res) => {
	const sql = 'INSERT INTO todos (`name`, `description`, `category`, `author`) VALUES (?)'

	const values = [
		req.body.name,
		req.body.description,
		req.body.category,
		req.body.author
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при добавлении задачи!' })
		return res.json({ Status: 'Success' })
	})
})

app.get('/get_todos', (req, res) => {
	const sql = 'SELECT * FROM todos'

	db.query(sql, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при получении задач!' })
		return res.json(data)
	})
})

app.delete('/delete_todo', (req, res) => {
	const sql = 'DELETE FROM todos WHERE id = ?'

	const values = [
		req.body.id
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при удалении задач!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/completed_todo', (req, res) => {
	const sql = 'INSERT INTO completed_todos (`id`, `name`, `description`, `category`, `author`) VALUES (?)'

	const values = [
		req.body.id,
		req.body.name,
		req.body.description,
		req.body.category,
		req.body.author
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при выполнении задачи!' })
		return res.json({ Status: 'Success' })
	})
})

app.get('/get_completed_todos', (req, res) => {
	const sql = 'SELECT * FROM completed_todos'

	db.query(sql, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при получении выполненных задач!' })
		return res.json(data)
	})
})

app.delete('/delete_completed_todo', (req, res) => {
	const sql = 'DELETE FROM completed_todos WHERE id = ?'

	const values = [
		req.body.id
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при удалении задач!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/common_todo', (req, res) => {
	const sql = 'INSERT INTO todos (`id`, `name`, `description`, `category`, `author`) VALUES (?)'

	const values = [
		req.body.id,
		req.body.name,
		req.body.description,
		req.body.category,
		req.body.author
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при выполнении задачи!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/get_todo', (req, res) => {
	const sql = 'SELECT * FROM todos WHERE id = ?'

	const values = [
		req.body.id
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при получении задачи!' })
		return res.json(data)
	})
})

app.post('/get_completed_todo', (req, res) => {
	const sql = 'SELECT * FROM todos WHERE id = ?'

	const values = [
		req.body.id
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при получении выполненной задачи!' })
		return res.json(data)
	})
})

app.post('/update_todo', (req, res) => {
	const sql = 'UPDATE todos SET name = ?, description = ?, category = ? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.description,
		req.body.category,
		req.body.id
	]

	db.query(sql, values, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при обновлении задачи!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/update_completed_todo', (req, res) => {
	const sql = 'UPDATE completed_todos SET name = ?, description = ?, category = ? WHERE id = ?'

	const values = [
		req.body.name,
		req.body.description,
		req.body.category,
		req.body.id
	]

	db.query(sql, values, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при обновлении задачи!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/add_category', (req, res) => {
	const sql = 'INSERT INTO category (`value`) VALUES (?)'

	const values = [
		req.body.value
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при добавлении категории!' })
		return res.json({ Status: 'Success' })
	})
})

app.get('/get_category', (req, res) => {
	const sql = 'SELECT * FROM category'

	db.query(sql, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при получении категорий!' })
		return res.json(data)
	})
})

app.delete('/delete_category', (req, res) => {
	const sql = 'DELETE FROM category WHERE id = ?'

	const values = [
		req.body.id
	]

	db.query(sql, [values], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при удалении категории!' })
		return res.json({ Status: 'Success' })
	})
})

app.post('/delete_tasks_in_category', (req, res) => {
	const sqlTodos = 'DELETE FROM todos WHERE category = ?'
	const sqlCompleted = 'DELETE FROM completed_todos WHERE category = ?'

	const values = [
		req.body.category.value
	]

	db.query(sqlTodos, values, (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при удалении задач по категории!' })
		db.query(sqlCompleted, values, (err, data) => {
			if (err) return res.json({ Error: 'Ошибка при удалении выполненных задач по категории!' })
			return res.json({ Status: 'Success' })
		})
	})
})

app.listen(3001, () => {
	console.log('Подключено!')
})
