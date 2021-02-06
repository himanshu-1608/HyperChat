import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage , ChatPage , LoginPage} from './index';
import useApp from './components/logic/useApp';
import Menu from './components/organisms/menu';

function App() {
	const {
		isLoggedIn,
		setIsLoggedIn
	} = useApp();
	if(!isLoggedIn){
		return (
			<div className="app">
				<LoginPage setIsLoggedIn={setIsLoggedIn}/>
			</div>
		);
	}else {
		return (
			<div className="app">
				<Router>
					<Menu />
					<Switch>
						<Route path="/" exact component={() => <HomePage />} />
						<Route
							path="/chat/:chatId"
							exact
							component={() => <ChatPage />}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
