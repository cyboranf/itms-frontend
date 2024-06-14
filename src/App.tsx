import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { NavbarWarhouseman } from "./components/navbar-warehouseman";
import { Home } from "./views/home";
import { SignIn } from "./views/sign-in";
import { AdminPanel } from "./views/admin-panel/admin-users";
import { AdminRole } from "./views/admin-panel/admin-roles";
import { AdminWarehouse } from "./views/admin-panel/admin-warehouse";
import "./scss/index.scss";
import ScrollToTop from "./hooks/scroll-to-top";
import SignUp from "./views/sign-up-main/sign-up-main";
import { AdminTask } from "./views/admin-panel/admin-tasks";
import { Admindashboard } from "./views/admin-panel/admin-dashboard";
import { Layout } from "antd";
import { WarehouseManDashboard } from "./views/warehouseman-panel/warehouseman-dashboard";
import { PrinterDashboard } from "./views/printer-panel/printer-dashboard";
import AdminProducts from "./views/admin-panel/admin-products/admin-products";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataProvider, ROLES } from "./context/data-context";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Logout from "./components/auth/Logout";

const { Content } = Layout;

export const Layout1 = () => {
	return (
		<ScrollToTop>
			<Layout style={{ minHeight: "100vh" }}>
				<Navbar />
				<Layout>
					<Content style={{ margin: "0 10px" }}>
						<Outlet />
					</Content>
				</Layout>
				{/* <Footer /> */}
			</Layout>
		</ScrollToTop>
	);
};

export const Layout2 = () => {
	return (
		<ScrollToTop>
			<Layout style={{ minHeight: "100vh" }}>
				<NavbarWarhouseman />
				<Layout>
					<Content style={{ margin: "0 10px" }}>
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
		element: (
			<ProtectedRoute>
				<Layout1 />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/roles",
				element: (
					<ProtectedRoute requiredRoles={[ROLES.ADMIN, ROLES.MANAGER]}>
						<AdminRole />
					</ProtectedRoute>
				),
			},
			{
				path: "/warehouses",
				element: (
					<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
						<AdminWarehouse />
					</ProtectedRoute>
				),
			},
			{
				path: "/products",
				element: (
					<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
						<AdminProducts />
					</ProtectedRoute>
				),
			},
			{
				path: "/tasks",
				element: (
					<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
						<AdminTask />
					</ProtectedRoute>
				),
			},
			{
				path: "/home",
				element: (
					<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
						<Admindashboard />
					</ProtectedRoute>
				),
			},
			{
				path: "/users",
			element: (
				<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
					<AdminPanel />
				</ProtectedRoute>
		),
			},
		],
	},
	{
		path: "/login",
		element: <SignIn />,
	},
	{
		path: "/logout",
		element: <Logout />,
	},
	{
		path: "/register",
		element: <SignUp />,
	},

	{
		path: "/warehouseman",
		element: (
			<ProtectedRoute>
				<Layout2 />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/warehouseman/home",
			element:(
				<ProtectedRoute requiredRoles={[ROLES.WAREHOUSEMAN]}>
					<WarehouseManDashboard />
				</ProtectedRoute>
			)
			}
		],
	},
	{
		path: "/printer/home",
		element: (
			<ProtectedRoute requiredRoles={[ROLES.PRINTER]}>
				<PrinterDashboard />
			</ProtectedRoute>
		),
	},
]);

function App() {
	return (
		<DataProvider>
			<div className="App">
				<RouterProvider router={router} />
				<ToastContainer autoClose={3000} position="top-center" />
			</div>
		</DataProvider>
	);
}

export default App;
