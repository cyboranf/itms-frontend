import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
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
import { Breadcrumb } from "antd";
import { getAllTasks } from "../../../service/tasks";
import { Task } from "../../../service/tasks/types";


export const PrinterDashboard = () => {
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

	const columns: GridColDef[] = [
		// pobrac dane z api
		{ field: "name", headerName: "Name", width: 180, editable: true },
		{
			field: "priority",
			headerName: "priority",
			width: 180,
			align: "left",
			headerAlign: "left",
			editable: true,
		},
		{
			field: "creationDate",
			headerName: "Creation Date",
			width: 180,
			editable: true,
		},
		{
			field: "endDate",
			headerName: "End Date",
			width: 180,
			editable: true,
		},
		{
			field: "type",
			headerName: "Type",
			width: 100,
			editable: true,
			type: "singleSelect",
			valueOptions: ["Import", "Shipment", "Move"],
		},
		{
			field: "state",
			headerName: "Status",
			width: 220,
			editable: true,
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
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label='Save'
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label='Cancel'
							className='textPrimary'
							color='inherit'
						/>,
					];
				}

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
				</Breadcrumb>
				<Typography
					variant='h3'
					component='h3'
					sx={{
						textAlign: "center",
						p: 5,
					}}
				>
					Dashboard
				</Typography>
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

export default PrinterDashboard;
