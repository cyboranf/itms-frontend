import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import {
	GridRowModesModel,
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowId,
	GridRowEditStopReasons,
	GridActionsCellItem,
} from "@mui/x-data-grid";
import { Typography, Modal, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Breadcrumb, Button, Drawer, Space, Form, Select } from "antd";
import {
	deleteWarehouse,
	getAllWarehouses,
	requestWarehouseReport,
	PostWarehouse,
	updateWarehouse,
} from "../../../service/warehouses";
import { Warehouse, RequestWarehouse } from "../../../service/warehouses/types";
import CreateWarehouseForm from "../../../components/forms/admin/admin-warhouse-creat-form";
import { useAxios } from "../../../helpers/axios/useAxios";

export const AdminWarehouse = () => {
	const navigate = useNavigate();
	const [rows, setRows] = useState<Warehouse[]>([]);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [openDrawer, setOpenDrawer] = useState(false);
	const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
	const [selectBuilding, setSelectBuilding] = useState<string[]>([]);
	const [selectZone, setSelectZone] = useState<string[]>([]);
	const [selectSpaceId, setSelectSpaceId] = useState<string[]>([]);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [warehouseToDelete, setWarehouseToDelete] = useState<Warehouse | null>(null);

	const axios = useAxios();

	const getWarehousesData = async () => {
		try {
			const res = await getAllWarehouses(axios);
			setRows(res);
		} catch (err: unknown) {
			console.error(err);
		}
	};

	useEffect(() => {
		getWarehousesData();
	}, []);

	const handleAddNewWarehouse = async (warehouse: RequestWarehouse) => {
		await PostWarehouse(warehouse, axios);
		await getWarehousesData();
	};

	const handleEditWarehouse = async (warehouse: RequestWarehouse) => {
		if (selectedWarehouse) {
			await updateWarehouse(selectedWarehouse.id, warehouse, axios);
			await getWarehousesData();
		}
	};

	const getReports = async () => {
		requestWarehouseReport(selectBuilding, selectZone, selectSpaceId, axios);
	};

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		const warehouse = rows.find((row) => row.id === id);
		if (warehouse) {
			setSelectedWarehouse(warehouse);
			setOpenDrawer(true);
		}
	};

	const handleDeleteClick = (id: number) => () => {
		const warehouse = rows.find((row) => row.id === id);
		if (warehouse) {
			setWarehouseToDelete(warehouse);
			setIsDeleteModalVisible(true);
		}
	};

	const confirmDelete = async () => {
		if (warehouseToDelete) {
			await deleteWarehouse(warehouseToDelete.id, axios);
			getWarehousesData();
			setIsDeleteModalVisible(false);
		}
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const showDrawer = () => {
		setSelectedWarehouse(null);
		setOpenDrawer(true);
	};

	const onCloseDrawer = () => {
		setOpenDrawer(false);
	};

	const [form] = Form.useForm();

	const columns: GridColDef[] = [
		{
			field: "id",
			headerName: "ID",
			width: 100,
			editable: false,
		},
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
			headerName: "Space Id",
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
			headerName: "Space Length",
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
			getActions: ({ id }) => [
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
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label='Delete'
					onClick={handleDeleteClick(Number(id))}
					color='inherit'
				/>,
			],
		},
	];

	return (
		<>
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
					<div style={{ margin: 10 }}>
						<Button type='primary' onClick={showDrawer}>
							Add Warehouse
						</Button>
					</div>
					<Drawer
						title={selectedWarehouse ? "Edit Warehouse" : "Create a new Warehouse"}
						width={720}
						onClose={onCloseDrawer}
						open={openDrawer}
						bodyStyle={{ paddingBottom: 80 }}
						extra={
							<Space>
								<Button onClick={onCloseDrawer}>Cancel</Button>
								<Button onClick={form.submit} type='primary'>
									Submit
								</Button>
							</Space>
						}
					>
						<CreateWarehouseForm form={form} onClose={onCloseDrawer} handleCreateWarehouse={handleAddNewWarehouse} />
					</Drawer>

					<DataGrid
						rows={rows}
						columns={columns}
						editMode='row'
						rowModesModel={rowModesModel}
						onRowModesModelChange={handleRowModesModelChange}
						onRowEditStop={handleRowEditStop}
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
			<Modal open={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						boxShadow: 24,
						p: 4,
					}}
				>
					<DialogTitle>
						<Typography variant='h4' component='div' sx={{ color: "red", fontWeight: "bold" }}>
							Delete Warehouse
						</Typography>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>Are you sure you want to delete this warehouse?</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => setIsDeleteModalVisible(false)}>Cancel</Button>
						<Button onClick={confirmDelete}>Delete</Button>
					</DialogActions>
				</Box>
			</Modal>
		</>
	);
};

export default AdminWarehouse;
