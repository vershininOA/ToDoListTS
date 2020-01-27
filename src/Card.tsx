import React from 'react';
import { connect } from 'react-redux';
import {
	doneCard,
	deleteCard,
	changeCardText
} from './actions/card'

import ICard from './interfaces/ICard';

const mapDispatchToProps = {
	doneCard,
	deleteCard,
	changeCardText
}

type ICardProps = typeof mapDispatchToProps & ICard;

const ConnectedCard: React.FC<ICardProps> = (props: ICardProps) => {
	let cardStyle: string = "";
	let bgItemColor: string = "";

	if (props.deleted) {
		if (props.done) {
			cardStyle = "cardItemDeletedDone";
			bgItemColor = "#CCC"
		} else {
			cardStyle = "cardItemDeleted";
			bgItemColor = "#fc6"
		}
	} else if (props.done) {
		cardStyle = "cardItemDone";
		bgItemColor = "MediumSeaGreen";
	}

	return (
		<div className="cardBox">
			<div className="cardItem" style={{ 'backgroundColor': bgItemColor }}>
				<div className={cardStyle}>
					<p className="cardTextBox">
						<textarea
							id={props.todoId.toString()}
							className="cardTextarea"
							rows={3}
							disabled={props.deleted}
							value={props.todoText}
							onChange={(event) => props.changeCardText({id: Number.parseInt(event.target.id), cardText: event.target.value})}
						/>
					</p>

					<div className="cardBottomArea">
						<div className="cardBottomCheckboxArea">
							<label>
								<input
									type="checkbox"
									disabled={props.deleted}
									checked={props.done}
									onChange={() => props.doneCard(props.todoId)}
								/>
								Готово
								</label>
						</div>

						<div className="cardButtonDeleteArea">
							<button
								className="cardButton"
								onClick={() => props.deleteCard(props.todoId)}
							>
								{props.deleted
									? "Восстановить"
									: "Удалить"
								}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const Card = connect(null, mapDispatchToProps)(ConnectedCard);

export default Card;