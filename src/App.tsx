import React from 'react';
import { createStore } from 'redux';
// import logo from './logo.svg';

import  {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import { Provider } from 'react-redux'

import './App.css';
import './index.scss'

import CardList from './CardList'
import HomePage from './HomePage'
import NotFound from './notfound'

import { rootReducer } from './reducers/index'

const store = createStore(rootReducer);

const App: React.FC = () => {
		return (
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path="/" exact component={ HomePage } />
						<Route path="/cardlist" exact component={ CardList } />
						<Route path="*" component={ NotFound } />
					</Switch>
				</Router>
			</Provider>
		)
};

export default App;
