import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	}
}

export interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: string; //id
}

export interface InsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		//existing id where user wants to insert a cell before
		//when null, insert at the end of existing cells
		id: string | null;
		type: CellTypes;
	}
}

export interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	}
}

export type Action =
	MoveCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| UpdateCellAction