import ICard from './ICard'

export default interface IStateProps {
	FilterDeleted: boolean,
	FilterDone: boolean,
	FilterNeedDone: boolean,
	MarkFlag: boolean,
	VisibleCards: ICard[]
}