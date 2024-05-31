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

export const requestTaskReport = async (includeUsers: boolean, includeProducts: boolean, includeWarehouses: boolean, includePieChart: boolean, taskId: string[]) => {
    try {
		
        const response = await instanceAxios.get(Paths.RAPORT, {
            responseType: 'blob', // Ustawienie responseType na blob, aby uzyskać zawartość jako Blob
            params: {
                includeUsers,
                includeProducts,
                includeWarehouses,
                includePieChart,
                taskId
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