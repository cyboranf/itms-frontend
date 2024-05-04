import React, { useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
	GridRowsProp,
	GridRowModesModel,
	GridRowModes,
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridActionsCellItem,
	GridEventListener,
	GridRowId,
	GridRowModel,
	GridRowEditStopReasons,
	GridSlots,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { Typography } from "@mui/material";
import { Form, Input, Button, Select, Row, Col, Breadcrumb, Drawer, Space, Table } from 'antd'; import { getAllTasks } from "../../../service/tasks";
import { Task } from "../../../service/tasks/types";
import { PlusOutlined } from "@ant-design/icons";

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
}

function EditToolbar(props: EditToolbarProps) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [...oldRows, { id, name: "", isNew: true }]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
		}));
	};

	return (
		<GridToolbarContainer>
			<Button
				color='primary'
				icon={<PlusOutlined />}
				onClick={handleClick}
				style={{
					margin: 5,
				}}
			>
				Add record
			</Button>
		</GridToolbarContainer>
	);
}

export const AdminTask = () => {
	const [tasks, setTasks] = React.useState<Task[]>([]);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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

	const handleSaveClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
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

	const { Option } = Select;

	const [open, setOpen] = useState(false);
	const [taskName, setTaskName] = useState('');
	const [category, setCategory] = useState('');
	const [description, setDescription] = useState('');
	const [product, setProduct] = useState('');
	const [warehouseSpace, setWarehouseSpace] = useState('');
	const [employeeGroup, setEmployeeGroup] = useState('');
	const [selectedOptions, setSelectedOptions] = useState([]);

	const onClose = () => {
		setOpen(false);
	};

	const handleAddOption = () => {
		if (product && warehouseSpace) {
			setSelectedOptions([...selectedOptions, { product, warehouseSpace, description }]);
			setProduct('');
			setWarehouseSpace('');
			setDescription('');
		}
	};

	const handleDeleteOption = (index) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions.splice(index, 1);
		setSelectedOptions(updatedOptions);
	};

	const handleCreateTask = () => {
		// Add your logic for creating a task here
	};

	const columns: GridColDef[] = [
		{ field: "name", headerName: "Name", width: 180, editable: true },
		{ field: "priority", headerName: "Priority", width: 180, align: "left", headerAlign: "left", editable: true },
		{ field: "creationDate", headerName: "Creation Date", width: 180, editable: true },
		{ field: "endDate", headerName: "End Date", width: 180, editable: true },
		{ field: "type", headerName: "Type", width: 100, editable: true, type: "singleSelect", valueOptions: ["Import", "Shipment", "Move"] },
		{ field: "state", headerName: "Status", width: 220, editable: true, flex: 1 },
		{
			field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions", align: "right",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
				return isInEditMode ? [
					<GridActionsCellItem icon={<SaveIcon />} label='Save' onClick={handleSaveClick(id)} />,
					<GridActionsCellItem icon={<CancelIcon />} label='Cancel' onClick={() => setRowModesModel((oldModel) => ({ ...oldModel, [id]: { mode: GridRowModes.View } }))} />
				] : [
					<GridActionsCellItem icon={<EditIcon />} label='Edit' onClick={handleEditClick(id)} />,
					<GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} />,
				];
			},
		},
	];

	const antColumns = [
		{ title: 'Product', dataIndex: 'product', key: 'product' },
		{ title: 'Warehouse-space', dataIndex: 'warehouseSpace', key: 'warehouseSpace' },
		{ title: 'Description', dataIndex: 'description', key: 'description' },
		{
			title: 'Action', key: 'action', render: (_, record, index) => (
				<Button onClick={() => handleDeleteOption(index)}>Delete</Button>
			),
		},
	];


	return (
		<Box>
			<Box
				sx={{
					height: 500,
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
					<Breadcrumb.Item>Task</Breadcrumb.Item>
				</Breadcrumb>

				<Drawer
					title="Create a new Task"
					width={720}
					onClose={onClose}
					open={open}
					bodyStyle={{ paddingBottom: 80 }}
					extra={
						<Space>
							<Button onClick={onClose}>Cancel</Button>
							<Button onClick={onClose} type="primary">Submit</Button>
						</Space>
					}
				>
					<Form layout="vertical" hideRequiredMark>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									name="taskName"
									label="Task Name"
									rules={[{ required: true, message: 'Please enter task name' }]}
								>
									<Input placeholder="Please enter task name" value={taskName} onChange={e => setTaskName(e.target.value)} />
								</Form.Item>
							</Col>
							<Col span={12}>
								<Form.Item
									name="category"
									label="Category"
									rules={[{ required: true, message: 'Please select a category' }]}
								>
									<Select placeholder="Select a category" value={category} onChange={value => setCategory(value)}>
										<Option value="category1">Category 1</Option>
										<Option value="category2">Category 2</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Form.Item
									name="description"
									label="Description"
								>
									<Input.TextArea rows={4} placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)} />
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name="product"
									label="Product"
								>
									<Select placeholder="Select a product" value={product} onChange={value => setProduct(value)}>
										<Option value="product1">Product 1</Option>
										<Option value="product2">Product 2</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item
									name="warehouseSpace"
									label="Warehouse-space"
								>
									<Select placeholder="Select warehouse space" value={warehouseSpace} onChange={value => setWarehouseSpace(value)}>
										<Option value="space1">Warehouse-space 1</Option>
										<Option value="space2">Warehouse-space 2</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item>
									<Button type="primary" onClick={handleAddOption} block>Add</Button>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Table dataSource={selectedOptions} columns={antColumns} rowKey="id" />
							</Col>
							<Col span={24}>
								<Form.Item
									name="employeeGroup"
									label="Employee Group"
								>
									<Select placeholder="Select an employee group" value={employeeGroup} onChange={value => setEmployeeGroup(value)}>
										<Option value="group1">Group 1</Option>
										<Option value="group2">Group 2</Option>
									</Select>
								</Form.Item>
							</Col>
							<Col span={24}>
								<Button type="primary" onClick={handleCreateTask} block>Create Task</Button>
							</Col>
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
					Manage Tasks
				</Typography>
				<div style={{ margin: 10 }}>
					<Button type='primary' onClick={showDrawer} icon={<PlusOutlined />}>
						Add Task
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
					slots={{
						toolbar: EditToolbar as GridSlots["toolbar"],
					}}
					slotProps={{
						toolbar: { setRows: setTasks, setRowModesModel },
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
			</Box>
		</Box>
	);
};

export default AdminTask;
