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

export async function DeleteTasks(id:number) {
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