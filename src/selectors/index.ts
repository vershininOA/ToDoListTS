import { createSelector } from "reselect";
import {
	SHOW_ALL,
	SHOW_DONE,
	SHOW_NEED_DONE
} from "../constants/types"

import IAppState from '../interfaces/IAppState'
import ICard from '../interfaces/ICard'

const Cards = (state: IAppState): ICard[] => {
	return state.data;
};

export const showCardsState = (state: IAppState): string => {
	return state.showCardsState;
};

export const FilterDeletedState = (state: IAppState): boolean => {
	return state.filterDeleted;
};

export const FilterDoneState = (state: IAppState): boolean => {
	return state.filterDone;
};

export const FilterNeedDoneState = (state: IAppState): boolean => {
	return state.filterNeedDone;
};

export const getMarkFlag = (state: IAppState): boolean => {
	let flag: boolean = false;

	let tmpData: ICard[] = state.data.filter((item: ICard) => { return !item.deleted });
	flag = tmpData.reduce(
		(currentDoneFlag: boolean, item: ICard) => (item.done && currentDoneFlag),
		true
	);

	return flag
};

export const VisibleCards = createSelector(
	[showCardsState, Cards, FilterDeletedState, FilterDoneState, FilterNeedDoneState],
	(st, cds, fDel, fDone, fNeedDone) => {
		switch (st) {
			case SHOW_ALL: {
				return cds.filter((item: ICard) => (item.deleted === fDel));
			}

			case SHOW_DONE: {
				return cds.filter((item: ICard) => (item.deleted === fDel && item.done === fDone));
			}

			case SHOW_NEED_DONE: {
				return cds.filter((item: ICard) => (item.deleted === fDel && item.done === !fNeedDone));
			}

			default:
				return cds;
		}
	}
);