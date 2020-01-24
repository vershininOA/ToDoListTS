import { createSelector } from "reselect";
import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE
} from "../constants/types"

import IAppState from '../interfaces/IAppState'
import ICard from '../interfaces/ICard'

const Cards = (state: IAppState): ICard[] => state.data;

export const showCardsState = (state: IAppState): string => state.showCardsState;

export const FilterDeletedState = (state: IAppState): boolean => state.filterDeleted;

export const FilterDoneState = (state: IAppState): boolean => state.filterDone;

export const FilterNeedDoneState = (state: IAppState): boolean => state.filterNeedDone;

export const getMarkFlag = (state: IAppState): boolean => {
	let markFlag: boolean = false;

	let tmpData: ICard[] = state.data.filter((item: ICard) => { return !item.deleted });
	markFlag = tmpData.reduce(
		(currentDoneFlag: boolean, item: ICard) => (item.done && currentDoneFlag),
		true
	);

	return markFlag
};

export const VisibleCards = createSelector(
	[showCardsState, Cards, FilterDeletedState, FilterDoneState, FilterNeedDoneState],
	(_showCardsState, _Cards, _FilterDeletedState, _FilterDoneState, _FilterNeedDoneState) => {
		switch (_showCardsState) {
			case SHOW_ALL: {
				return _Cards.filter((item: ICard) => (item.deleted === _FilterDeletedState));
			}

			case SHOW_DONE: {
				return _Cards.filter((item: ICard) => (item.deleted === _FilterDeletedState && item.done === _FilterDoneState));
			}

			case SHOW_NEED_DONE: {
				return _Cards.filter((item: ICard) => (item.deleted === _FilterDeletedState && item.done === !_FilterNeedDoneState));
			}

			default:
				return _Cards;
		}
	}
);