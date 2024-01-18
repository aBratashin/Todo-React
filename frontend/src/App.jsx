import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Register from './pages/register/Register.jsx'
import Login from './pages/login/Login.jsx'
import { AuthProvider } from './hoc/AuthProvider.jsx'
import RequireAuth from './hoc/RequireAuth.jsx'
import RequireLogout from './hoc/RequireLogout.jsx'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
					<Route path="/register" element={<RequireLogout><Register /></RequireLogout>} />
					<Route path="/login" element={<RequireLogout><Login /></RequireLogout>} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
