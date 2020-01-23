import React, { Component } from 'react'
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
			buttonMark = <button className="navButton" onClick={ this.props.cardUnMarkAll }> Всё отменить </button>
		} else {
			buttonMark = <button className="navButton" onClick={ this.props.cardMarkAll }> Всё готово </button>
		}		
		return(
			<section style={{height: '100%', width: '100%'}}>
				{
					(!cardSet) ? <label>Список пуст!</label> :
						<div style = {{ 'marginTop': '150px' }}>
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
						{/* <div className="navPanelCheckBoxArea" style={{backgroundColor:"red"}}> */}
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
							// <div className="navPanelBtnArea" style={{backgroundColor:"blue"}}>
							<div className="navPanelBtnArea">
								{
									(!this.props.FilterDeleted) ? <div style={{'marginRight': '5px', 'float': 'left'}}> {buttonMark} </div> : null
								}

								{
									(this.props.FilterDeleted) ?
										<div>
											<button className="navButton"
												onClick={() => this.props.clearDeletedCards()}
												style = {{'float': 'left'}}
											>
												Очистить
											</button>
										</div>
										: <span></span>
								}

								{/* <a
									className="btnToMainPage"
									style = {{ 'float': 'right' }}
									role="button"
									href="/"
								>
									На главную
								</a> */}
								<div style={{'marginRight': '0px', 'float': 'right'}}>
								<span style={{	'color': 'yellow', 
												'float': 'left', 
												'height': '40px', 
												'width': '2px', 
												'backgroundColor': 'red',
												'marginRight': '5px'
												
											}}>
								</span>
								<button onClick={() => window.location.href='/'} className="navButton" >
									На главную
								</button>
								</div>
							</div>
						}
					</div>

					{/* <div className="navPanelBottom" style={{backgroundColor:"green"}}> */}
					<div className="navPanelBottom">
						<div style={{'width': '27.5%', 'marginRight': '5px'}}>
						<input
							name="cardText"
							type="text"
							style={{ 'width': '100%',
									'height': '25px', 
									'marginRight': '5px',
									'border': '1px solid red',
									'borderRadius': '5px',
									'fontSize': '11pt' 
								}}
							value={ this.state.cardText }
							onChange={ this.cardNewChangeText }
							placeholder={"введите текст здесь"}
						/>
						</div>

						<div style={{'marginLeft': '5px'}}>
						<button
							className="navButton"
							// Style={"float:right;"}
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