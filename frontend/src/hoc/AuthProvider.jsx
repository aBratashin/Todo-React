import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('email'))?.email)

	const signIn = (newUser, cb) => {
		localStorage.setItem('email', JSON.stringify({ email: newUser }))
		setUser(newUser)
		cb()
	}

	const signOut = (cb) => {
		localStorage.removeItem('email')
		setUser(null)
		cb()
	}

	const value = { user, signIn, signOut }

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}