import {
	CARD_ADD,
	CARD_DONE,
	CARD_DELETE,
	CARD_CHANGE_TEXT,
	CARD_ADD_STARTED,
	CARD_ADD_SUCCESS,
	CARD_ADD_FAILURE
} from "../constants/types";

import { Dispatch } from 'redux'
import axios from 'axios'
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import IAppState  from '../interfaces/IAppState'

import ICard from '../interfaces/ICard'

import ICardParams from "../interfaces/ICardParams";

export const addCardAsync = (todoText: string): ThunkAction<any, IAppState, undefined, Action> => dispatch => {
	dispatch(addCardStarted());

	axios
		.post('10.0.1.13:8080/tasks/add', {
			"userId": 35,
			"text": todoText,
			"done": false,
			"deleted": false
		})
		.then(res => {
			dispatch(addCardSuccess(res.data))
		})
		.catch(err => {
			dispatch(addCardFailure(err))
		})
}

export const addCardStarted = () => ({
	type: CARD_ADD_STARTED
});

export const addCardSuccess = (cards: ICard[]) => ({
	type: CARD_ADD_SUCCESS,
	payload: { ...cards }
});

export const addCardFailure = (error: any) => ({
	type: CARD_ADD_FAILURE,
	payload: { error }
});

export const addCard = (todoText: string) => ({
	type: CARD_ADD,
	todoText
});

export const deleteCard = (id: number) => ({
	type: CARD_DELETE,
	id
});

export const doneCard = (id: number) => ({
	type: CARD_DONE,
	id
});

export const changeCardText = (cardParams: ICardParams) => ({
	type: CARD_CHANGE_TEXT,
	cardParams
});
