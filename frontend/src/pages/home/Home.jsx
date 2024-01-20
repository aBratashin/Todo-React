import Header from './components/Header.jsx'
import Main from './components/Main.jsx'

const Home = () => {
	return (
		<div className="bg-gray-900 w-screen h-screen flex flex-col">
			<Header />
			<Main />
		</div>
	)
}

export default Home