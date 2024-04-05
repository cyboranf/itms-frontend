import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { TaskValuesType } from "./types";

export const GetTasks = async ():Promise<TaskValuesType[]> => {
	const { data } = await instanceAxios.get<{ data: any }>(Paths.TASK_TYPE);
	const Tasks = data.data;
	return Tasks;
};

