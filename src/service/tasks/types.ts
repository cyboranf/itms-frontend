import { UserWithoutTasks } from "../users/types";

export type Task = {
	id: number;
	name: string;
	description: string;
	state: number;
	priority: number;
	startDate: string;
	endDate: string;	
}

//TODO jak bedzie isntial warehouse i producst zdefiniowane to zaktualizowac
