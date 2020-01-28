import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

import './App.css';
import './index.scss'

import CardList from './CardList'
import HomePage from './HomePage'
import NotFound from './notfound'

import { rootReducer } from './reducers/index'

// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(thunk));

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/cardlist" exact component={CardList} />
					<Route path="*" component={NotFound} />
				</Switch>
			</Router>
		</Provider>
	)
};

export default App;
