import "./settings-panel.scss";
import { FaUserCircle } from "react-icons/fa";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getSelf } from "../../service/users";
import { useAxios } from "../../helpers/axios/useAxios";
import { User } from "../../service/users/types";
import { toast } from "react-toastify";
import SettingsPanelForm from "./settings-panel-form";

const SettingsPanel = () => {
	const [user, setUser] = useState<User | null>(null);
	const axios = useAxios();

	const tasks = [
		{ id: 1, date: "2024-01-14", description: "Prepare products for shipment" },
		{ id: 2, date: "2024-01-10", description: "Move products" },
		{ id: 3, date: "2024-01-09", description: "Unload transport" },
		{ id: 4, date: "2024-01-01", description: "Print T-shirts pattern" },
	];

	const getUserData = async () => {
		try {
			const user = await getSelf(axios);
			setUser(user);
		} catch (error: unknown) {
			console.error("Error during getting user data:", error);
			toast.error("Error during getting user data");
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<div className='main-container'>
			<h2 className='main-title'>Settings</h2>
			<div className='grid-container'>
				<div className='section full-width'>
					<h3>Additional Information</h3>
					<table className='tasks-table'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Task</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task.id}>
									<td>{task.date}</td>
									<td>{task.description}</td>
									<td className='actions-cell'>
										<button className='icon-button confirm-button'>
											<CheckOutlined />
										</button>
										<button className='icon-button reject-button'>
											<CloseOutlined />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className='section'>
					<h3>User Information</h3>
					<div className='user-info'>
						<FaUserCircle className='user-icon' />
						<div className='user-details'>
							<p>
								<strong>Username:</strong> {user?.username}
							</p>
							<p>
								<strong>Email:</strong> {user?.email}
							</p>
							<p>
								<strong>First Name:</strong> {user?.name}
							</p>
							<p>
								<strong>Last Name:</strong> {user?.lastname}
							</p>
							<p>
								<strong>Phone Number:</strong> {user?.phoneNumber}
							</p>
						</div>
					</div>
				</div>
				<div className='section'>{user && <SettingsPanelForm user={user} setUser={setUser} />}</div>
			</div>
		</div>
	);
};

export default SettingsPanel;
