import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Task } from "./types";

export const getAllTasks = async (): Promise<Task[]> => {
	const data = await instanceAxios.get<Task[]>(Paths.ALL_TASKS);
	return data.data;
};
