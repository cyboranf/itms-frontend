import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Task } from "./types";

export const getAllTasks = async (): Promise<Task[]> => {
	const data = await instanceAxios.get<Task[]>(Paths.TASKS);
	return data.data;
};

export const PostTask = async (params: Task) => {
	try {
		await instanceAxios.post(Paths.TASKS, params);
		return true;
	}
	catch (error){
		console.error("Błąd podczas aktualizacji zadania:", error);
        return false;
	}
} 

export const DeleteTasks = async (id:string) => {
	const url = Paths.TASKS_ID.replace('{id}', id);
    await instanceAxios.delete(url);
    return true;
}