import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
	GridRowModesModel,
	DataGrid,
	GridColDef,
	GridEventListener,
	GridRowId,
	GridRowEditStopReasons,
	GridActionsCellItem,
	GridRowModes,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Breadcrumb, Button,Drawer, Space, Form, Select, Row } from "antd";
import { Link } from "react-router-dom";
import { getAllItems, requestItemsReport } from "../../../service/items";
import { Items } from "../../../service/items/types";

export const AdminItems = () => {
	const [rows, setRows] = useState<Items[]>([]);
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
	const [open1, setOpen1] = useState(false);
	const [selectName, setSelectName] = useState<string[]>([]);
	const [selectCode, setSelectCode] = useState<string[]>([]);

	const GetItems = async () => {
		try {
			const res = await getAllItems();
			console.log(res);
			setRows(res); // Update local state with fetched data
		} catch (error) {
			console.error("Error fetching items:", error);
		}
	};

	useEffect(() => {
		GetItems();
	}, []);

	const getReports = async () => {
		requestItemsReport(selectName, selectCode)
	  };

	const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const showDrawer1 = () => {
		setOpen1(true);
	}

	const onClose1 = () => {
		setOpen1(false);
	  };

	const columns: GridColDef[] = [
		// pobrac dane z api
		{
			field: "name",
			headerName: "Name",
			width: 180,
			editable: false,
		},
		{
			field: "code",
			headerName: "Code",
			width: 180,
			editable: false,
		},
		{
			field: "width",
			headerName: "Width",
			width: 180,
			editable: false,
		},
		{
			field: "height",
			headerName: "Height",
			width: 100,
			editable: false,
		},
		{
			field: "length",
			headerName: "Lenght",
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
					<Breadcrumb.Item>
						<Link to='/warehouses' style={{ textDecoration: "none" }}>
							Warehouses
						</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>Items</Breadcrumb.Item>
				</Breadcrumb>
				<Typography
					variant='h3'
					component='h3'
					sx={{
						textAlign: "center",
						p: 5,
					}}
				>
					Manage Items
				</Typography>
				
				<div style={{ margin: 10 }}>
              <Button type='primary' onClick={showDrawer1}>
                  Creat Raport
                </Button>
              </div>

				<Drawer
                title='Create a new Raport'
                width={720}
                onClose={onClose1}
                open={open1}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                  <Space>
                    <Button onClick={onClose1}>Cancel</Button>
                    <Button onClick={getReports} type='primary'>
                      Submit
                    </Button>
                  </Space>
                }
              >
                   <Form layout="vertical">
				
						<Form.Item label="Name" name="name" rules={[{ required: false, message: "Please select name" }]}>
							<Select value={selectName} onChange={setSelectName}>
							{rows.map((row) => (
								<Select.Option key={row.name} value={row.name}>
								{row.name}
								</Select.Option>
							))}
							</Select>
						</Form.Item>

						<Form.Item label="Code" name="code" rules={[{ required: false, message: "Please select code" }]}>
							<Select value={selectCode} onChange={setSelectCode}>
							{rows.map((row) => (
								<Select.Option key={row.code} value={row.code}>
								{row.code}
								</Select.Option>
							))}
							</Select>
						</Form.Item>
						</Form>
              </Drawer>

				<DataGrid
					rows={rows}
					columns={columns}
					editMode='row'
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
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
							bgcolor: "#EDF05E",
						},
						"& .MuiDataGrid-toolbarContainer  ": {
							bgcolor: "#EDF05E",
						},
						"& .MuiButtonBase-root  ": {},
					}}
				/>
			</Box>
		</Box>
	);
};

export default AdminItems;
