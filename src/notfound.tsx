import React from 'react'

const NotFound = () => (
	<div className="ErrorPage">
		<div className="ErrorPageBlock">
			<h1>Ошибка в адресе</h1>
			<hr />
			{/* <a
				className="btn btn-warning btn-lg"
				href="/"
				role="button"
			>
				Войти в приложение
            </a> */}

			<button
				className="btnToMainPage" 
				onClick={() => window.location.href='/'}
			>
				Войти в приложение
			</button>
		</div>
	</div>
);

export default NotFound;