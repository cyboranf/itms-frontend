import { UserWithoutTasks } from "../users/types";

export type Task = {
	id: number;
	name: string;
	description: string;
	state: number;
	priority: number;
	creationDate: Date | null;
	startDate: Date | null;
	endDate: Date | null;
	users: UserWithoutTasks[];
	products: any[];
};

//TODO jak bedzie isntial warehouse i producst zdefiniowane to zaktualizowac
