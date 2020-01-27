import React from 'react'
import { useHistory } from "react-router-dom"

import './index.scss'

function CardListButton() {
	const history = useHistory();

	function handleClick() {
		history.push("/CardList");
	}

	return (
		<button 
			className="toCardListButton"
			onClick={handleClick}
		>
			Заняться делами!
		</button>
	);
}

const HomePage = () => (
	<div className="HomePage">
		<div className="HomePageBlock">
			<h1>Список дел</h1>
			<hr />

			{ CardListButton() }
		</div>
	</div>
);

export default HomePage;