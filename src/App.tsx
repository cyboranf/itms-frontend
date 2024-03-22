import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Home } from "./views/home";
import { SignIn } from "./views/sign-in";
import "./scss/index.scss";
import ScrollToTop from "./hooks/scroll-to-top";
import { SignUp, SignUp2 } from "./views/sign-up";

export const Layout = () => {
	return (
		<ScrollToTop>
			<div className='layout'>
				<Navbar />
				<Outlet />
				<Footer />
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
		path: "/register2",
		element: <SignUp2 />,
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
