import logo from './logo.svg';
import './App.css';
import AppRoutes from './Routes';
import NavBar from './components/navBar';

function App() {
	return (
		<>
			<NavBar />
			<div>
				<AppRoutes />
			</div>
		</>
	);
}

export default App;
