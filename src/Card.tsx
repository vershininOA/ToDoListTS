import React, { Dispatch } from 'react';
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

	if (props.deleted) {
		if (props.done) {
			cardStyle = "cardItemDeletedDone"
		} else cardStyle = "cardItemDeleted"
	} else if (props.done) cardStyle = "cardItemDone";

	return(
			<div className="cardBox">
				<div className="cardItem">
					<div className={cardStyle}>
						<div className="card-body">
							<p className="card-text">
								<textarea 
									id={props.todoId.toString()}
									className="cardTextarea"
									rows={3}
									disabled={props.deleted}
									value={props.todoText}
									onChange={(event) => props.changeCardText(event.target)}
								/>
							</p>
						</div>

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
									style={{ "float": "right" }}
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