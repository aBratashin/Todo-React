import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import { AuthProvider } from './hoc/AuthProvider.jsx'
import RequireAuth from './hoc/RequireAuth.jsx'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
					{/*<Route path="/" element={<Home />} />*/}
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
