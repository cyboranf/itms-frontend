import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./views/home";
import { SignIn } from "./views/sign-in";
import {AdminPanel} from "./views/admin-panel/admin-users"
import {AdminRole} from "./views/admin-panel/admin-roles"
import "./scss/index.scss";
import ScrollToTop from "./hooks/scroll-to-top";
import SignUp from "./views/sign-up-main/sign-up-main";
import { AdminTask } from "./views/admin-panel/admin-tasks";
import { AdminDoTask } from "./views/admin-panel/admin-add-task";

export const Layout = () => {
	return (
		<ScrollToTop>
			<div className='layout'>
				<Navbar />
				<Outlet />
				{/* <Footer /> */}
			</div>
		</ScrollToTop>
	);
};

const router = createHashRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
	{
		path: "/login",
		element: <SignIn />,
	},
	{
		path: "/register",
		element: <SignUp />,
	},
	{
		path: "/users",
		element: <AdminPanel />,
	},
	{
		path: "/roles",
		element: <AdminRole />,
	},
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/tasks",
				element: <AdminTask />,
			},
		],
	},
	{
		path: "/add-task",
		element: <AdminDoTask />,
	},
]);

function App() {
	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
