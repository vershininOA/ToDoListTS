import React, { Component } from 'react'
import { connect } from "react-redux"

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
	cardMarkAll,
	cardUnMarkAll
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
	setFilterDeletedState: () => void ,
	setFilterDoneState: () => void,
	setFilterNeedDoneState: () => void,
	addCard: (cardText: string) => void,
	clearDeletedCards: () => void,
	cardMarkAll: () => void,
	cardUnMarkAll: () => void
}

interface IStateDispatchProps extends IStateProps, IDispatchProps {};

const mapStateToProps = (state: IAppState):IStateProps => {
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
		cardMarkAll,
		cardUnMarkAll
};

class ConnectedCardList extends React.Component<IStateDispatchProps> {
		state = {
			cardText: ""
		};

	cardNewChangeText = (event: any) => {
		const { name, value } = event.target;

		this.setState({
			[name]: value
		})
	};

	render () {
		let cardSet: ICard[] = this.props.VisibleCards;
		const markFlag: boolean = this.props.MarkFlag;

		let buttonMark: any;
		if (markFlag) {
			buttonMark = <button className="btnList" onClick={ this.props.cardUnMarkAll }> Всё отменить </button>
		} else {
			buttonMark = <button className="btnList" onClick={ this.props.cardMarkAll }> Всё готово </button>
		}		
		return(
			<section style={{height: '100%', width: '100%'}}>
				{
					(!cardSet) ? <label>Список пуст!</label> :
						<div style = {{ 'marginTop': '11%' }}>
							{
								cardSet.map(item => {
									return (
										<Card key={ item.todoId }
											todoId={ item.todoId }
											todoText={ item.todoText }
											done={ item.done }
											deleted={ item.deleted }
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
								checked={ this.props.FilterDeleted }
								onChange={() => this.props.setFilterDeletedState()}
							/>

							<label className="lblCheckbox"> Сделано </label>
							<input
								type="checkbox"
								checked={this.props.FilterDone}
								onChange={() => this.props.setFilterDoneState()}
							/>

							<label className="lblCheckbox"> Нужно сделать </label>
							<input
								type="checkbox"
								checked={this.props.FilterNeedDone}
								onChange={() => this.props.setFilterNeedDoneState()}
							/>
						</div>

						{
							<div className="navPanelBtnArea">
								{
									(!this.props.FilterDeleted) ? <div style={{'marginRight': '5px', 'float': 'left'}}> {buttonMark} </div> : <span></span>
								}

								{
									(this.props.FilterDeleted) ?
										<div>
											<button className="btn btn-danger btnList"
												onClick={() => this.props.clearDeletedCards()}
												style = {{'float': 'left'}}
											>
												Очистить
											</button>
										</div>
										: <span></span>
								}

								<a
									className="btn btn-warning btnList"
									style = {{ 'float': 'right' }}
									role="button"
									href="/"
								>
									На главную
								</a>
							</div>
						}
					</div>

					<div className="navPanelBottom">
						<input
							name="cardText"
							className="form-control"
							type="text"
							style={{ 'width': '18%', 'marginRight': '5px' }}
							value={ this.state.cardText }
							onChange={ this.cardNewChangeText }
							placeholder={"введите текст здесь"}
						/>

						<button
							className="btn btn-primary btnList"
							// Style={"float:right;"}
							onClick={() => this.props.addCard(this.state.cardText)}
						>
							Добавить
						</button>
					</div>
				</div>
			</section>
		)
	}
}

const CardList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCardList);
export default CardList;