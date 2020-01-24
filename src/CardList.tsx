import React from 'react'
import { connect } from "react-redux"

import './index.scss'

import {
	FilterDeletedState,
	FilterDoneState,
	FilterNeedDoneState,
	getMarkFlag,
	VisibleCards
} from "../src/selectors/index";

import {
	setFilterDeletedState,
	setFilterDoneState,
	setFilterNeedDoneState,
	clearDeletedCards,
	cardHandleMark
} from "./actions/cardList"

import Card from './Card'
import ICard from './interfaces/ICard'
import { addCard } from "./actions/card";

import IAppState from './interfaces/IAppState'

interface IStateProps {
	FilterDeleted: boolean,
	FilterDone: boolean,
	FilterNeedDone: boolean,
	MarkFlag: boolean,
	VisibleCards: ICard[]
}

interface IDispatchProps {
	setFilterDeletedState: () => void,
	setFilterDoneState: () => void,
	setFilterNeedDoneState: () => void,
	addCard: (cardText: string) => void,
	clearDeletedCards: () => void,
	cardHandleMark: (markStatus: boolean) => void
}

interface IStateDispatchProps extends IStateProps, IDispatchProps { };

const mapStateToProps = (state: IAppState): IStateProps => {
	return {
		FilterDeleted: FilterDeletedState(state),
		FilterDone: FilterDoneState(state),
		FilterNeedDone: FilterNeedDoneState(state),
		MarkFlag: getMarkFlag(state),
		VisibleCards: VisibleCards(state)
	}
};

const mapDispatchToProps = {
	setFilterDeletedState,
	setFilterDoneState,
	setFilterNeedDoneState,
	addCard,
	clearDeletedCards,
	cardHandleMark
};

class ConnectedCardList extends React.Component<IStateDispatchProps> {
	state = {
		cardText: ""
	};

	cardNewChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		})
	};

	render() {
		const cardSet: ICard[] = this.props.VisibleCards;
		const markFlag: boolean = this.props.MarkFlag;

		let buttonMark: object;
		if (markFlag) {
			buttonMark = <button
				className="navButton"
				onClick={() => this.props.cardHandleMark(false)}
			>
				Всё отменить
						</button>
		} else {
			buttonMark = <button
				className="navButton"
				onClick={() => this.props.cardHandleMark(true)}
			>
				Всё готово
						</button>
		}

		buttonMark = buttonMark as React.HTMLFactory<HTMLButtonElement>

		return (
			<section className="sectionFullSize">
				{
					(!cardSet) ? <label>Список пуст!</label> :
						<div className="marginTop150px">
							{
								cardSet.map(item => {
									return (
										<Card key={item.todoId}
											todoId={item.todoId}
											todoText={item.todoText}
											done={item.done}
											deleted={item.deleted}
										/>
									);
								})
							}
						</div>
				}

				<div className="navPanel">
					<div className="navPanelTop">
						<div className="navPanelCheckBoxArea">
							<label className="lblCheckbox"> Удалённые </label>
							<input
								type="checkbox"
								checked={this.props.FilterDeleted}
								onChange={() => this.props.setFilterDeletedState()}
							/>

							<label
								className="lblCheckbox"
							>
								Сделано
							</label>

							<input
								type="checkbox"
								checked={this.props.FilterDone}
								onChange={() => this.props.setFilterDoneState()}
							/>

							<label
								className="lblCheckbox"
							>
								Нужно сделать
							</label>

							<input
								type="checkbox"
								checked={this.props.FilterNeedDone}
								onChange={() => this.props.setFilterNeedDoneState()}
							/>
						</div>

						<div className="navPanelBtnArea">
							{
								(!this.props.FilterDeleted) ? <div className="HandleMarkWrapperBtn"> {buttonMark} </div> : null
							}

							{
								(this.props.FilterDeleted) ?
									<div className="ClearDeletedWrapperBtn">
										<button
											className="navButton"
											onClick={() => this.props.clearDeletedCards()}
										>
											Очистить
										</button>
									</div>
									: null
							}

							<div className="ToMainPageWrapperBtn">
								<button
									className="navButton"
									onClick={() => window.location.href = '/'}
								>
									На главную
								</button>
							</div>
						</div>
					</div>

					<div className="navPanelBottom">
						<div className="navPanelInputNewCard">
							<input
								name="cardText"
								type="text"
								className="navPanelInputNewCardText"
								value={this.state.cardText}
								onChange={this.cardNewChangeText}
								placeholder={"введите текст здесь"}
							/>
						</div>

						<div className="marginLeft5px">
							<button
								className="navButton"
								onClick={() => this.props.addCard(this.state.cardText)}
							>
								Добавить
						</button>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

const CardList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardList);
export default CardList;