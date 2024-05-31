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
	GridRowModel,
	GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Form, Input, Button, Select, Row, Col, Breadcrumb, Drawer, Space, Table, DatePicker, Switch } from "antd";
import { DeleteTasks, PostTask, getAllTasks, requestTaskReport } from "../../../service/tasks";
import { Task } from "../../../service/tasks/types";
import { PlusOutlined } from "@ant-design/icons";
import TaskForm from '../../../components/forms/admin/admin-taks-form';
import TaskReportForm from "../../../components/forms/admin/admin-taks-form-raport";


export const AdminTask = () => {
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [includeUsers, setIncludeUsers] = useState(false);
    const [includeProducts, setIncludeProducts] = useState(false);
    const [includeWarehouses, setIncludeWarehouses] = useState(false);
    const [includePieChart, setIncludePieChart] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
	const [selectedUser, setSelectedUser] = useState<string[]>([]);
	const [selectState, setSelectState] = useState<string[]>([]);
	const [selectPriority, setSelectPriority] = useState<string[]>([]);
	

	const getReports = async () => {
		console.log(selectPriority);
		requestTaskReport(includeUsers, includeProducts, includeWarehouses, includePieChart, selectedTasks, selectedUser, selectPriority, selectState);
	}

	const getTasks = async () => {
		try {
			const res = await getAllTasks();
			setTasks(res);
		} catch (err: unknown) {
			console.log(err);
		}
	};

	React.useEffect(() => {
		getTasks();
	}, []);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		DeleteTasks(id.toString());
		setTasks(tasks.filter((row) => row.id !== id));
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		return newRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const showDrawer = () => {
		setOpen(true);
	};
	const showDrawer1 = () => {
		setOpen1(true);
	}

	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);


	const [form] = Form.useForm();

	const onClose = () => {
		setOpen(false);
	};

	const onClose1 = () => {
		setOpen1(false);
	}

	const handleCreateTask = () => {
		try {
			form
				.validateFields()
				.then(async (values) => {
					const newTaskt = {
						users: null,
						description: values.description,
						endDate: values.endDate,
						id: values.idd,
						name: values.name,
						priority: values.priority,
						startDate: values.startDate,
						state: values.state,
						type_id: values.type_id,
					};

					const success = await PostTask(newTaskt);
					if (success) {
						getAllTasks();
						onClose();
					} else {
						console.error("Error while adding the task.");
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
		{ field: "priority", headerName: "Priority", width: 180, align: "left", headerAlign: "left", editable: false },
		{ field: "creationDate", headerName: "Creation Date", width: 180, editable: false },
		{ field: "endDate", headerName: "End Date", width: 180, editable: false },
		{ field: "state", headerName: "Status", width: 60, editable: false, flex: 1 },
		{
			field: "warehouses",
			headerName: "Warehouse Details",
			width: 300,
			renderCell: (params) => (
				<span>{params.value.map((warehouse: any) => `${warehouse.building}-${warehouse.zone}`).join(", ")}</span>
			),
		},
		{
			field: "users",
			headerName: "Workers Details",
			width: 300,
			renderCell: (params) => (
				<span>{params.value.map((users: any) => `${users.name} ${users.lastname}`).join(", ")}</span>
			),
		},
		{
			field: "products",
			headerName: "Products Details",
			width: 300,
			renderCell: (params) => (
				<span>{params.value.map((products: any) => `${products.name}-${products.code}`).join(", ")}</span>
			),
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
					<GridActionsCellItem icon={<EditIcon />} label='Edit' onClick={handleEditClick(id)} />,
					<GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} />,
				];
			},
		},
	];



	return (
		<Box>
			<Box
				sx={{
					height: 500,
					width: '100%',
					'& .actions': {
						color: 'text.secondary',
					},
					'& .textPrimary': {
						color: 'text.primary',
					},
				}}
			>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
					<Breadcrumb.Item>Task</Breadcrumb.Item>
				</Breadcrumb>

				<Drawer
					title='Create a new Task'
					width={720}
					onClose={onClose}
					open={open}
					bodyStyle={{ paddingBottom: 80 }}
					extra={
						<Space>
							<Button onClick={onClose}>Cancel</Button>
							<Button onClick={handleCreateTask} type='primary'>
								Submit
							</Button>
						</Space>
					}
				>
					<TaskForm form={form} onClose={onClose} handleCreateTask={handleCreateTask} />
				</Drawer>

				<Drawer
					title="Create a Report"
					width={720}
					onClose={onClose1}
					open={open1}
					bodyStyle={{ paddingBottom: 80 }}
					extra={
						<Space>
							<Button onClick={onClose1}>Cancel</Button>
							<Button onClick={getReports} type="primary">
								Submit
							</Button>
						</Space>
					}
				>
					<Form layout="vertical">
						<Form.Item label="Include Users" name="includeUsers" valuePropName="checked">
							<Switch checked={includeUsers} onChange={setIncludeUsers} />
						</Form.Item>
						<Form.Item label="Include Products" name="includeProducts" valuePropName="checked">
							<Switch checked={includeProducts} onChange={setIncludeProducts} />
						</Form.Item>
						<Form.Item label="Include Warehouses" name="includeWarehouses" valuePropName="checked">
							<Switch checked={includeWarehouses} onChange={setIncludeWarehouses} />
						</Form.Item>
						<Form.Item label="Include Pie Chart" name="includePieChart" valuePropName="checked">
							<Switch checked={includePieChart} onChange={setIncludePieChart} />
						</Form.Item>
						<Form.Item label="Tasks" name="tasks" rules={[{ required: false, message: "Please select task" }]}>
							<Select  value={selectedTasks} onChange={setSelectedTasks}>
								{tasks.map(task => (
									<Select.Option key={task.id} value={task.id}>
										{task.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label="Users" name="users" rules={[{ required: false, message: "Please select users" }]}>
						<Select  value={selectedUser} onChange={setSelectedUser}>
							{tasks.map(task => (
								task.users.map((user: any) => (
									<Select.Option key={user.id} value={user.id}>
										{user.name} {user.lastname}
									</Select.Option>
								))
							))}
						</Select>
						</Form.Item>
						<Form.Item label="State" name="state" rules={[{ required: false, message: "Please select state" }]}>
						<Select  value={selectState} onChange={setSelectState}>
								{tasks.map(task => (
									<Select.Option key={task.state} value={task.state}>
										{task.state}
									</Select.Option>
								))}
						</Select>
						</Form.Item>
						<Form.Item label="Priority" name="priority" rules={[{ required: false, message: "Please select priority" }]}>
						<Select  value={selectPriority} onChange={setSelectPriority}>
								{tasks.map(task => (
									<Select.Option key={task.priority} value={task.priority}>
										{task.priority}
									</Select.Option>
								))}
						</Select>
						</Form.Item>
					</Form>
				</Drawer>

				<Typography
					variant='h3'
					component='h3'
					sx={{
						textAlign: 'center',
						p: 5,
					}}
				>
					Manage Tasks
				</Typography>
				<div style={{ margin: 10 }}>
					<Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
						Add Task
					</Button>
				</div>
				<div style={{ margin: 10 }}>
					<Button type='primary' onClick={showDrawer1} icon={<PlusOutlined />}>
						Creat Raport
					</Button>
				</div>
				<DataGrid
					rows={tasks}
					columns={columns}
					editMode='row'
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slotProps={{
						toolbar: { setRows: setTasks, setRowModesModel },
					}}
					sx={{
						boxShadow: 2,
						border: 1,
						'& .MuiDataGrid-cell:hover': {
							color: 'primary.main',
						},
						'& .MuiDataGrid-footerContainer ': {
							bgcolor: '#F1BCD9',
						},
						'& .MuiDataGrid-toolbarContainer  ': {
							bgcolor: '#F1BCD9',
						},
						'& .MuiButtonBase-root  ': {},
					}}
				/>
			</Box>
		</Box>
	);
};

export default AdminTask;
