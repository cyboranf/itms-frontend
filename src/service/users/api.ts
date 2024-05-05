import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { TaskValuesType } from "./types";

export async function GetTasks(): Promise<TaskValuesType > {
    try {
        const response = await instanceAxios.get(Paths.TASK_TYPE);

        return response.data as TaskValuesType;
    } catch (error) {
        
        console.error('Błąd podczas pobierania zadania:', error);
        return error as TaskValuesType;
    }
}

export async function DeleteTasks(id:string) {
    await instanceAxios.delete(Paths.TASK_TYPE_ID.replace('{id}', id.toString()));
    return true;
}

export async function PostTask(params:TaskValuesType) {
    try {
        await instanceAxios.post(Paths.TASK_TYPE, params);
        return true;

      } catch (error) {
        console.error("Błąd podczas aktualizacji zadania:", error);
        return false;
      }
}

export async function PutTask(params:TaskValuesType) {
    try {
        await instanceAxios.put(Paths.TASK_TYPE_ID.replace('{id}', params.id.toString()), params);
        return true;
    } catch (error){
        console.error("Błąd podczas aktualizacji zadania:", error);
        return false;
    }
}

import { User } from "./types";

export const getAllUsers = async (): Promise<User[]> => {
	const data = await instanceAxios.get<User[]>(Paths.ALL_USERS);
	return data.data;
};

export async function PutUsers(params:User) {
    try {
        await instanceAxios.put(Paths.USERS_EDIT.replace('{id}', params.id.toString()), params);
        return true;
    } catch (error){
        console.error("Błąd podczas aktualizacji zadania:", error);
        return false;
    }
}

export async function DeleteUsers(id:string) {
    await instanceAxios.delete(Paths.USERS_ID.replace('{id}', id.toString()));
    return true;
}