import Header from './components/Header.jsx'
import Main from './components/Main.jsx'

const Home = () => {
	return (
		<div className="bg-gray-900 w-full h-full flex flex-col lg:h-screen">
			<Header />
			<Main />
		</div>
	)
}

export default Home