export type User = {
	id: number;
	username: string;
	name: string;
	lastname: string;
	pesel: string;
	email: string;
	phoneNumber: string;
	tasks: any[];
};

export type UserWithoutTasks = {
	id: number;
	username: string;
	name: string;
	lastname: string;
	pesel: string;
	email: string;
	phoneNumber: string;
};
