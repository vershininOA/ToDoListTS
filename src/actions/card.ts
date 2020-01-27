import {
	CARD_ADD,
	CARD_DONE,
	CARD_DELETE,
	CARD_CHANGE_TEXT
} from "../constants/types";

import ICardParams from "../interfaces/ICardParams";

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
