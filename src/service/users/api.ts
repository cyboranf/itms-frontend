import { AxiosInstance } from "axios";
import { Paths } from "./path";
import { TaskValuesType, User } from "./types";
import { toast } from "react-toastify";

export async function GetTasks(axios: AxiosInstance): Promise<TaskValuesType[]> {
	const response = await axios.get(Paths.TASK_TYPE);
	return response.data;
}

export async function DeleteTasks(id: string, axios: AxiosInstance) {
	await axios.delete(Paths.TASK_TYPE_ID.replace("{id}", id.toString()));
	return true;
}

export async function PostTask(params: TaskValuesType, axios: AxiosInstance) {
	try {
		await axios.post(Paths.TASK_TYPE, params);
		return true;
	} catch (error) {
		console.error("Błąd podczas aktualizacji zadania:", error);
		return false;
	}
}

export async function PutTask(params: TaskValuesType, axios: AxiosInstance) {
	try {
		await axios.put(Paths.TASK_TYPE_ID.replace("{id}", params.id.toString()), params);
		return true;
	} catch (error) {
		console.error("Błąd podczas aktualizacji zadania:", error);
		return false;
	}
}

export const getAllUsers = async (axios: AxiosInstance): Promise<User[]> => {
	try {
		const data = await axios.get<User[]>(Paths.ALL_USERS);
		return data.data;
	} catch (error) {
		console.error("Błąd podczas pobierania użytkowników:", error);
		toast.error("Błąd podczas pobierania użytkowników");
		return [];
	}
};

export async function PutUsers(params: User, axios: AxiosInstance) {
	try {
		console.log("sdadas");
		await axios.put(Paths.USERS_EDIT.replace("{id}", params.id.toString()), params);
		toast.success("Zaktualizowano użytkownika");
		return true;
	} catch (error) {
		console.error("Błąd podczas aktualizacji użytkownika:", error);
		toast.error("Błąd podczas aktualizacji użytkownika");
		return false;
	}
}

export async function DeleteUsers(id: number, axios: AxiosInstance) {
	try {
		await axios.delete(Paths.USERS_ID.replace("{id}", id.toString()));
		toast.success("Usunięto użytkownika");
		return true;
	} catch (error) {
		console.error("Błąd podczas usuwania użytkownika:", error);
		toast.error("Błąd podczas usuwania użytkownika");
		return false;
	}
}

export const requestUsersReport = async (
	includeTasks: boolean,
	username: string[],
	email: string[],
	phoneNumber: string[],
	axios: AxiosInstance
) => {
	try {
		const response = await axios.get(Paths.RAPORT, {
			responseType: "blob",
			params: {
				includeTasks,
				username,
				email,
				phoneNumber,
			},
		});

		if (response.status === 200) {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "user-report.pdf");
			document.body.appendChild(link);
			link.click();
			window.URL.revokeObjectURL(url);
		} else {
			console.error("Błąd podczas pobierania raportu:", response);
			toast.error("Błąd podczas pobierania raportu");
		}
	} catch (error) {
		console.error("Błąd sieci:", error);
		toast.error("Błąd sieci");
	}
};
