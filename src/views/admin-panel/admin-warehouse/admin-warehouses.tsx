import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
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
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { deleteWarehous, getAllWarehouses, PostWarehouse, PutWarehouse, requestWarehouseReport } from "../../../service/warehouses";
import { Breadcrumb, Drawer, Form, Input, Row, Space, Button,Switch, Select } from "antd";
import { Warehouse } from "../../../service/warehouses/types";
import CreateWarehouseForm from '../../../components/forms/admin/admin-warhouse-creat-form';
import EditWarehouseForm from "../../../components/forms/admin/admin-warhouse-update-form";

export const AdminWarehouse = () => {
	const navigate = useNavigate();
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [warehouse, setWarehouses] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [open1, setOpen1] = useState(false);
	const [open2, setOpen2] = useState(false);
	const [id, setId] = useState<GridRowId>(0);
	const [selectBultind, setSelectedBulidn] = useState<string[]>([]);
	const [selectZone, setSelectedZone] = useState<string[]>([]);
	const [selectspaceId, setSelectedspaceId] = useState<string[]>([]);

	const showDrawer = () => {
		setOpen(true);
	};

	const showDrawer1 = () => {
		setOpen2(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onClose1 = () => {
		setOpen1(false);
	};

	const onClose2 = () => {
		setOpen2(false);
	};

	const getWarehousesData = async () => {
		try {
			const res = await getAllWarehouses();
			console.log(res);
			setWarehouses(res);
		} catch (err: unknown) {
			console.error(err);
		}
	};

	useEffect(() => {
		getWarehousesData();
	}, []);

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setId(id);
		setOpen1(true);
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		deleteWarehous(id.toString());
		setWarehouses(warehouse.filter((row) => row.id !== id));
	};

	const [form] = Form.useForm();
	const handleSubmitClick = async () => {
		try {
			form
				.validateFields()
				.then(async (values) => {
					const newWarehouse: Warehouse = {
						id: 0,
						building: values.BuildingName,
						zone: values.ZoneName,
						spaceId: values.SpaceId,
						spaceHeight: values.SpaceHeight,
						spaceWidth: values.spaceWidth,
						spaceLength: values.spaceLength,
						productId: values.productId,
						productName: "",
						productCode: "",
					};

					const success = await PostWarehouse(newWarehouse);
					if (success) {
						getWarehousesData();
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

	const [form1] = Form.useForm();

	const handleEditSubmitClick = async () => {
		console.log("Current Form Values:", form1.getFieldsValue());

		try {
			form1
				.validateFields()
				.then(async (values) => {
					const updatedWarehouse: Warehouse = {
						id: Number(id),
						building: values.BuildingName,
						zone: values.ZoneName,
						spaceId: values.SpaceId,
						spaceHeight: values.SpaceHeight,
						spaceWidth: values.spaceWidth,
						spaceLength: values.spaceLength,
						productId: values.productId,
						productCode: "",
						productName: "",
					};

					const success = await PutWarehouse(updatedWarehouse);
					if (success) {
						getWarehousesData(); // Refresh the data grid with updated data
						onClose1(); // Close the form drawer
					} else {
						console.error("Error while updating the warehouse.");
					}
				})
				.catch((error) => {
					console.error("Form processing error:", error);
				});
		} catch (error) {
			console.error("Error during form submission:", error);
		}
	};

	const processRowUpdate = (newRow: GridRowModel) => {
		// const updatedRow = { ...newRow, isNew: false };
		// setWarehouses(warehouse.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return newRow;
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns: GridColDef[] = [
		{
			field: "building",
			headerName: "Building",
			width: 180,
			editable: false,
		},
		{
			field: "zone",
			headerName: "Zone",
			width: 180,
			editable: false,
		},
		{
			field: "spaceId",
			headerName: "Space id",
			width: 180,
			editable: false,
		},
		{
			field: "spaceHeight",
			headerName: "Space Height",
			width: 100,
			editable: false,
		},
		{
			field: "spaceWidth",
			headerName: "Space Width",
			width: 220,
			editable: false,
		},
		{
			field: "spaceLength",
			headerName: "Space Width",
			width: 220,
			editable: false,
			flex: 1,
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
						icon={<SearchIcon />}
						label='Show Products'
						onClick={() => navigate("/items")}
						color='inherit'
					/>,
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

	const getReports = async () => {
		requestWarehouseReport(selectBultind, selectZone, selectspaceId);
	}

	return (
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
					<Breadcrumb.Item>Warehouses</Breadcrumb.Item>
				</Breadcrumb>

				<Typography
					variant='h3'
					component='h3'
					sx={{
						textAlign: "center",
						p: 5,
					}}
				>
					Manage Warehouses
				</Typography>
				<Button type='primary' onClick={showDrawer}>
					Add Warehouse
				</Button>
				<div style={{ margin: 10 }}>
					<Button type='primary' onClick={showDrawer1}>
						Create Raport
					</Button>	
				</div>
				<DataGrid
					rows={warehouse}
					columns={columns}
					editMode='row'
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slotProps={{
						toolbar: { setWarehouses, setRowModesModel },
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
					title='Create a new Warhouse'
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
							<Button onClick={handleSubmitClick} type='primary'>
								Submit
							</Button>
						</Space>
					}
				>
					<CreateWarehouseForm form={form}/>
				</Drawer>

				<Drawer
					title='Edit a new Warhouse'
					width={720}
					onClose={onClose1}
					open={open1}
					styles={{
						body: {
							paddingBottom: 80,
						},
					}}
					extra={
						<Space>
							<Button onClick={onClose1}>Cancel</Button>
							<Button onClick={handleEditSubmitClick} type='primary'>
								Submit
							</Button>
						</Space>
					}
				>
					<EditWarehouseForm form={form}/>
				</Drawer>

				<Drawer
					title='Create Raport'
					width={720}
					onClose={onClose2}
					open={open2}
					styles={{
						body: {
							paddingBottom: 80,
						},
					}}
					extra={
						<Space>
							<Button onClick={onClose2}>Cancel</Button>
							<Button onClick={getReports} type='primary'>
								Submit
							</Button>
						</Space>
					}
				>
					<Form layout="vertical">
				
						<Form.Item label="Building" name="building" rules={[{ required: false, message: "Please select building" }]}>
							<Select value={selectBultind} onChange={setSelectedBulidn}>
							{warehouse.map((row) => (
								<Select.Option key={row.building} value={row.building}>
								{row.building}
								</Select.Option>
							))}
							</Select>
						</Form.Item>

						<Form.Item label="Zone" name="zone" rules={[{ required: false, message: "Please select zone" }]}>
							<Select value={selectZone} onChange={setSelectedZone}>
							{warehouse.map((row) => (
								<Select.Option key={row.zone} value={row.zone}>
								{row.zone}
								</Select.Option>
							))}
							</Select>
						</Form.Item>

						<Form.Item label="SpaceId" name="spaceId" rules={[{ required: false, message: "Please select spaceId" }]}>
							<Select value={selectspaceId} onChange={setSelectedspaceId}>
							{warehouse.map((row) => (
								<Select.Option key={row.spaceId} value={row.spaceId}>
								{row.spaceId}
								</Select.Option>
							))}
							</Select>
						</Form.Item>
					</Form>
				</Drawer>

			</Box>
		</Box>
	);
};

export default AdminWarehouse;
