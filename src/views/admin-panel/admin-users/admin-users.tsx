import "./admin-users.scss";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	// GridRowModel,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumb, Drawer, Form, Input, Row, Space, Button, Layout } from "antd";
import { Navbar } from "../../../components/navbar";
import { User } from "../../../service/users/types";
import { DeleteUsers, PutUsers, getAllUsers } from "../../../service/users";

const { Content } = Layout;

export const AdminPanel = () => {
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};

	const [rows, setRows] = React.useState<User[]>([]);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [id, setId] = useState<GridRowId>(String);

	const getUsers = async () => {
		try {
			const res = await getAllUsers();
			setRows(res);
		} catch (err: unknown) {
			console.error(err);
		}
	};

	React.useEffect(() => {
		getUsers();
	}, []);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setId(id);
		setOpen(true);
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		DeleteUsers(id.toString());
		setRows(rows.filter((row) => row.id !== id));
	};

	// const processRowUpdate = (newRow: GridRowModel) => {
	// 	const updatedRow = { ...newRow, isNew: false };
	// 	setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
	// 	return updatedRow;
	// };

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const [form] = Form.useForm();

	const handleEditSubmitClick = () => async () => {
		try {
			form
				.validateFields()
				.then(async (values) => {
					const editUser: User = {
						id: Number(id),
						email: values.email,
						lastname: values.lastname,
						name: values.name,
						pesel: values.pesel,
						phoneNumber: values.phoneNumber,
						username: values.username,
            tasks: [],
					};

					const success = await PutUsers(editUser);
					if (success) {
						getAllUsers();
						onClose();
					} else {
						console.error("Error while adding the warehouse.");
					}
				})
				.catch((error) => {
					console.error("Form processing error:", error);
				});
		} catch (error) {
			console.error("Error during form submission:", error);
		}
	};

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", width: 180, editable: false },
		{
			field: "lastname",
			headerName: "Last Name",
			width: 180,
			align: "left",
			headerAlign: "left",
			editable: false,
		},
		{
			field: "pesel",
			headerName: "Pesel",
			width: 180,
			editable: false,
		},
		{
			field: "email",
			headerName: "Email",
			width: 180,
			flex: 1,
			editable: false,
		},
		{
			field: "phoneNumber",
			headerName: "Phone Number",
			width: 180,
			editable: false,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			align: "right",
			getActions: ({ id }) => {
				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label='Edit'
						className='textPrimary'
						onClick={handleEditClick(id)}
						color='inherit'
					/>,
					<GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />,
				];
			},
		},
	];

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Navbar />
			<Layout>
				<Content style={{ margin: "0 16px" }}>
					<Box>
						<Box
							sx={{
								height: "60vh",
								width: "100%",
								"& .actions": {
									color: "text.secondary",
								},
								"& .textPrimary": {
									color: "text.primary",
								},
							}}
						>
							<Breadcrumb style={{ margin: "16px 0" }}>
								<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item>Users</Breadcrumb.Item>
							</Breadcrumb>

							<Drawer
								title='Create a new Role'
								width={720}
								onClose={onClose}
								open={open}
								styles={{
									body: {
										paddingBottom: 80,
									},
								}}
								extra={
									<Space>
										<Button onClick={onClose}>Cancel</Button>
										<Button onClick={onClose} type='primary'>
											Submit
										</Button>
									</Space>
								}
							>
								<Form layout='vertical' hideRequiredMark>
									<Row>
										<Form.Item
											name='name'
											label='Role Name'
											rules={[{ required: true, message: "Please enter role name" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter role name' />
										</Form.Item>
									</Row>
								</Form>
							</Drawer>

							<Typography
								variant='h3'
								component='h3'
								sx={{
									textAlign: "center",
									p: 5,
								}}
							>
								Manage Users
							</Typography>
							<div style={{ margin: 10 }}>
								<Button type='primary' style={{ marginRight: 5 }}>
									<Link to='/roles' style={{ textDecoration: "none" }}>
										Show Tasks
									</Link>
								</Button>
							</div>
							<DataGrid
								rows={rows}
								columns={columns}
								editMode='row'
								rowModesModel={rowModesModel}
								onRowModesModelChange={handleRowModesModelChange}
								onRowEditStop={handleRowEditStop}
								// processRowUpdate={processRowUpdate}
								slotProps={{
									toolbar: { setRows, setRowModesModel },
								}}
								sx={{
									boxShadow: 2,
									border: 1,
									"& .MuiDataGrid-cell:hover": {
										color: "primary.main",
									},
									"& .MuiDataGrid-footerContainer ": {
										bgcolor: "#F1BCD9",
									},
									"& .MuiDataGrid-toolbarContainer  ": {
										bgcolor: "#F1BCD9",
									},
									"& .MuiButtonBase-root  ": {},
								}}
							/>
							<Drawer
								title='Edit a User'
								width={720}
								onClose={onClose}
								open={open}
								styles={{
									body: {
										paddingBottom: 80,
									},
								}}
								extra={
									<Space>
										<Button onClick={onClose}>Cancel</Button>
										<Button onClick={handleEditSubmitClick()} type='primary'>
											Submit
										</Button>
									</Space>
								}
							>
								<Form layout='vertical' hideRequiredMark form={form}>
									<Row>
										<Form.Item
											name='email'
											label='email'
											rules={[{ required: true, message: "Please enter email" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter email' />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name='lastname'
											label='last name'
											rules={[{ required: true, message: "Please enter last name" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter last name' />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name='name'
											label='Name'
											rules={[{ required: true, message: "Please enter name" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter  name' />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name='pesel'
											label='pesel'
											rules={[{ required: true, message: "Please enter pesel" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter pesel' />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name='phoneNumber'
											label='phone Number'
											rules={[{ required: true, message: "Please phone Number" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter phone Number' />
										</Form.Item>
									</Row>
									<Row>
										<Form.Item
											name='username'
											label='username'
											rules={[{ required: true, message: "Please username" }]}
											style={{
												flex: 1,
											}}
										>
											<Input placeholder='Please enter username' />
										</Form.Item>
									</Row>
								</Form>
							</Drawer>
						</Box>
					</Box>
				</Content>
			</Layout>
		</Layout>
	);
};
