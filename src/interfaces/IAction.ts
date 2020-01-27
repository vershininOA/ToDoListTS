import ICardParams from './ICardParams'

export default interface IAction {
	type: string,
	id: number,
	todoText: string,
	target: any,
	markStatus: boolean,
	cardParams: ICardParams
}