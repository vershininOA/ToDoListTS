import {
	CARD_ADD,
	CARD_DELETE,
	CARD_DONE,
	CARD_CHANGE_TEXT,
	CARD_CLEAR_DELETED
} from '../constants/types';

import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE,
	SET_FILTER_DELETED,
	SET_FILTER_DONE,
	SET_FILTER_NEED_DONE, CARD_MARK_ALL, CARD_UNMARK_ALL
}
from "../constants/types";

import IAction from '../interfaces/IAction'
import IAppState from '../interfaces/IAppState'
import ICard from '../interfaces/ICard'

import Data from "../Data";

const getMaxCardId = () => {
	let maxId: number = Data.reduce(
		(currentMaxId: number, item: any) => (item.todoId > currentMaxId) ? item.todoId : currentMaxId,
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
	flag: false
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
			let fd: boolean = !state.filterDone;
			let newShowState: string;

			(fd) ? newShowState = SHOW_DONE : newShowState = SHOW_ALL;

			return {
				...state,
				showCardsState: newShowState,
				filterDone: fd,
				filterNeedDone: false
			}
		}

		case SET_FILTER_NEED_DONE: {
			let fd: boolean = !state.filterNeedDone;
			let newShowState: string;

			(fd) ? newShowState = SHOW_NEED_DONE : newShowState = SHOW_ALL;

			return {
				...state,
				showCardsState: newShowState,
				filterDone: false,
				filterNeedDone: fd
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
			let newData: ICard[] = state.data.map((item: ICard) => {
				if (item.todoId === action.id) item.deleted = !item.deleted;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_DONE: {
			let newData: ICard[] = state.data.map((item: ICard) => {
				if (item.todoId === action.id) item.done = !item.done;
				return item;
			});

			return {
				...state,
				data: newData
			};
		}

		case CARD_CHANGE_TEXT: {
			let newData: ICard[] = state.data.map((item: ICard) => {
				if (item.todoId.toString() === action.target.id.toString()) {
					item.todoText = action.target.value;
				}

				return item
			});

			return {
				...state,
				data: newData
			}
		}

		case CARD_CLEAR_DELETED: {
			let newData: ICard[] = state.data.filter((item: ICard) => { return !item.deleted });

			return {
				...state,
				data: newData
			}
		}

		case CARD_MARK_ALL: {
			let newData: ICard[] = state.data.map((item: ICard) => {
				if (!item.deleted) item.done = true;
				return item
			});

			return {
				...state,
				data: newData
			}
		}

		case CARD_UNMARK_ALL: {
			let newData: ICard[] = state.data.map((item: ICard) => {
				if (!item.deleted) item.done = false;
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