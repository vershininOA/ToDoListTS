import React from 'react'

import './index.scss'

const HomePage = () => (
	<div className="HomePage">
		<div className="HomePageBlock">
			<h1>Список дел</h1>
			<hr />
			
			<button
				className="btnToMainPage" 
				onClick={() => window.location.href='/CardList'}
			>
				Заняться делами!
			</button>
		</div>
	</div>
);

export default HomePage;