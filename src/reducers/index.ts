import {
	CARD_ADD,
	CARD_DELETE,
	CARD_DONE,
	CARD_CHANGE_TEXT,
	CARD_CLEAR_DELETED,
	CARD_HANDLE_MARK
} from '../constants/types';

import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE,
	SET_FILTER_DELETED,
	SET_FILTER_DONE,
	SET_FILTER_NEED_DONE
} from "../constants/types";

import IAction from '../interfaces/IAction'
import IAppState from '../interfaces/IAppState'
import ICard from '../interfaces/ICard'

import Data from "../Data";

const getMaxCardId = () => {
	const maxId: number = Data.reduce(
		(currentMaxId: number, item: ICard) => (item.todoId > currentMaxId) ? item.todoId : currentMaxId,
		0
	);
	return maxId;
};

const initialState: IAppState = {
	data: Data,
	showCardsState: SHOW_ALL,
	maxId: getMaxCardId(),
	filterDone: false,
	filterNeedDone: false,
	filterDeleted: false,
	markFlag: false
};

export const rootReducer = (state: IAppState = initialState, action: IAction) => {
	switch (action.type) {
		case SET_FILTER_DELETED: {
			return {
				...state,
				filterDeleted: !state.filterDeleted
			}
		}

		case SET_FILTER_DONE: {
			return {
				...state,
				showCardsState: (!state.filterDone) ? SHOW_DONE : SHOW_ALL,
				filterDone: !state.filterDone,
				filterNeedDone: false
			}
		}

		case SET_FILTER_NEED_DONE: {
			return {
				...state,
				showCardsState: (!state.filterNeedDone) ? SHOW_NEED_DONE : SHOW_ALL,
				filterDone: false,
				filterNeedDone: !state.filterNeedDone
			}
		}

		case CARD_ADD: {
			return {
				...state,
				maxId: state.maxId + 1,
				data: state.data.concat([{
					"todoId": state.maxId + 1,
					"todoText": action.todoText,
					"done": false,
					"deleted": false
				}])
			};
		}

		case CARD_DELETE: {
			const newData = state.data.map((item: ICard) => {
				if (item.todoId === action.id) item.deleted = !item.deleted;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_DONE: {
			const newData = state.data.map((item: ICard) => {
				if (item.todoId === action.id) item.done = !item.done;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_CHANGE_TEXT: {
			const newData = state.data.map((item: ICard) => {
				if (item.todoId === action.cardParams.id) {
					item.todoText = action.cardParams.cardText;
				}
				return item
			});

			return {
				...state,
				data: newData
			}
		}

		case CARD_CLEAR_DELETED: {
			return {
				...state,
				data: state.data.filter((item: ICard) => { return !item.deleted })
			}
		}

		case CARD_HANDLE_MARK: {
			const newData = state.data.map((item: ICard) => {
				if (!item.deleted) item.done = action.markStatus;
				return item
			});

			return {
				...state,
				data: newData
			}
		}

		default: return state;
	}
};

export default rootReducer;