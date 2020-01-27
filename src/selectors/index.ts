import { createSelector } from "reselect";
import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE
} from "../constants/types"

import IAppState from '../interfaces/IAppState'
import ICard from '../interfaces/ICard'

const getCards = (state: IAppState): ICard[] => state.data;

export const getShowCardsState = (state: IAppState): string => state.showCardsState;

export const getIsFilterDeletedActive = (state: IAppState): boolean => state.filterDeleted;

export const getIsFilterDoneActive = (state: IAppState): boolean => state.filterDone;

export const getIsFilterNeedDoneActive = (state: IAppState): boolean => state.filterNeedDone;

export const getMarkFlag = (state: IAppState): boolean => (
	state.data
		.filter((item: ICard) => !item.deleted)
		.reduce((currentDoneFlag: boolean, item: ICard) => (item.done && currentDoneFlag), true)
);

export const VisibleCards = createSelector(
	[getShowCardsState, getCards, getIsFilterDeletedActive, getIsFilterDoneActive, getIsFilterNeedDoneActive],
	(showCardsState, cards, isFilterDeletedActive, isFilterDoneActive, isFilterNeedDoneActive) => {
		switch (showCardsState) {
			case SHOW_ALL: {
				return cards.filter((item: ICard) => (item.deleted === isFilterDeletedActive));
			}

			case SHOW_DONE: {
				return cards.filter((item: ICard) => (item.deleted === isFilterDeletedActive && item.done === isFilterDoneActive));
			}

			case SHOW_NEED_DONE: {
				return cards.filter((item: ICard) => (item.deleted === isFilterDeletedActive && item.done === !isFilterNeedDoneActive));
			}

			default:
				return cards;
		}
	}
);