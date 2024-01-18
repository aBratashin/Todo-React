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
	const sql = 'INSERT INTO users (`name`, `email`, `password`) VALUES (?)'

	bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
		if (err) return res.json({ Error: 'Ошибка при хэшировании пароля!' })

		const values = [
			req.body.name,
			req.body.email,
			hash
		]

		db.query(sql, [values], (err, result) => {
			if (err) return res.json({ Error: 'Ошибка при регистрации пользователя!' })
			return res.json({ Status: 'Success' })
		})
	})
})

app.post('/login', (req, res) => {
	const sql = 'SELECT * FROM users WHERE email = ?'

	db.query(sql, [req.body.email], (err, data) => {
		if (err) return res.json({ Error: 'Ошибка при авторизации пользователя!' })

		if (data.length > 0) {
			bcrypt.compare(req.body.password.toString(), data[0].password, (error, response) => {
				if (error) return res.json({ Error: 'Неправильный пароль!' })
				if (response) return res.json({ Status: 'Success' })
			})
		} else {
			return res.json({ Error: 'Пользователь не найден!' })
		}
	})
})

app.listen(3001, () => {
	console.log('Подключено!')
})
