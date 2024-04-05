import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./views/home";
import { SignIn } from "./views/sign-in";
import {AdminPanel} from "./views/admin-panel/admin-users"
import {AdminRole} from "./views/admin-panel/admin-roles"
import {AdminWarehouse} from "./views/admin-panel/admin-warehouse"
import {AdminItems} from "./views/admin-panel/admin-items"
import "./scss/index.scss";
import ScrollToTop from "./hooks/scroll-to-top";
import SignUp from "./views/sign-up-main/sign-up-main";
import { AdminTask } from "./views/admin-panel/admin-tasks";
import { AdminDoTask } from "./views/admin-panel/admin-add-task";
import { Layout } from 'antd';

const { Header, Content, Sider } = Layout;

export const Layout1 = () => {
	return (
		<ScrollToTop>
			<Layout style={{minHeight: "100vh"}}>
				<Navbar />
				<Layout>
				<Content style={{ margin: '0 16px' }}>
					<Outlet />
				</Content>
				</Layout>
				{/* <Footer /> */}
			</Layout>
		</ScrollToTop>
	);
};

const router = createHashRouter([
	{
		path: "/",
		element: <Layout1 />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/roles",
				element: <AdminRole />,
			},
			
			
			{
				path: "/warehouses",
				element: <AdminWarehouse />,
			},
			{
				path: "/items",
				element: <AdminItems />,
			},
			{
				path: "/add-task",
				element: <AdminDoTask />,
			},
			{
				path: "/tasks",
				element: <AdminTask />,
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

]);

function App() {
	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
