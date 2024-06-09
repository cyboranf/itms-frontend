import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Task, TaskType, TaskProduct } from "./types";

export const getAllTasks = async (): Promise<Task[]> => {
	const data = await instanceAxios.get<Task[]>(Paths.TASKS);
	return data.data;
};

export const getAllTasksTypes = async (): Promise<TaskType[]> => {
	const data = await instanceAxios.get<TaskType[]>(Paths.TASK_TYPE);
	return data.data;
};

export const PostTask = async (params: Task) => {
	try {
		const task = await instanceAxios.post(Paths.TASKS, params);
		return task.data;
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

export const requestTaskReport = async (includeUsers: boolean, includeProducts: boolean, includeWarehouses: boolean, includePieChart: boolean, taskId: string[], userId: string[], priority: string[], state: string[]) => {
    try {
		
        const response = await instanceAxios.get(Paths.RAPORT, {
            responseType: 'blob', // Ustawienie responseType na blob, aby uzyskać zawartość jako Blob
            params: {
                includeUsers,
                includeProducts,
                includeWarehouses,
                includePieChart,
                taskId,
				userId,
				priority,
				state

            }
        });
        
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'task-report.pdf');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Błąd podczas pobierania raportu:', response);
        }
    } catch (error) {
        console.error('Błąd sieci:', error);
    }
};

export const PostTaskProduct = async (taskId: number, productId: number) => {
	try {
		const url = `http://127.0.0.1:8080/api/tasks/${taskId}/join/products/${productId}`;
		await instanceAxios.post(url);
		return true;
	} catch (error) {
		console.error("Błąd podczas PostTaskProduct:", error);
		return false;
	}
};

export const PostTaskUsers = async (userId: number, taskId: number) => {
		try {
		const url = `http://127.0.0.1:8080/api/users/${userId}/join/tasks/${taskId}`;
		await instanceAxios.post(url);
		return true;
	} catch (error) {
		console.error("Błąd podczas PostTaskProduct:", error);
		return false;
	}
} 
