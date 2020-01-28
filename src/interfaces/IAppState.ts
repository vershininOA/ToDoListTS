import ICard from './ICard'

export default interface IAppState {
	data: ICard[],
	showCardsState: string,
	maxId: number,
	filterDone: boolean,
	filterNeedDone: boolean,
	filterDeleted: boolean,
	markFlag: boolean,
	addCardStarted: boolean
}