import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export enum ROLES {
	ADMIN = "Admin",
	MANAGER = "Manager",
	WAREHOUSEMAN = "Warehouseman",
	PRINTER = "Printer",
}

export type CurrentUser = {
	userName: string;
	accessToken: string;
	role: ROLES;
};

type Props = {
	children: ReactNode;
};

interface DataContext {
	currentUser: CurrentUser | null;
	setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
}

export const DataContext = createContext<DataContext>({
	currentUser: null,
	setCurrentUser: () => {},
});

export const DataProvider = ({ children }: Props) => {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

	return <DataContext.Provider value={{ currentUser, setCurrentUser }}>{children}</DataContext.Provider>;
};