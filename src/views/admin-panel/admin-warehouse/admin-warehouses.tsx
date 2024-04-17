import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
} from '@mui/x-data-grid';
import {
	randomId,
} from '@mui/x-data-grid-generator';
import { Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Breadcrumb, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Warehouse } from '../../../service/warehouses/types';
import { getAllWarehouses } from '../../../service/warehouses';

type RowWarehouse = Warehouse & {
	isNew?: boolean;
};

interface EditToolbarProps {
	setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
	setRowModesModel: (
		newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
	) => void;
}

function EditToolbar(props: EditToolbarProps) {
	const { setRows, setRowModesModel } = props;

	const handleClick = () => {
		const id = randomId();
		setRows((oldRows) => [...oldRows, { id, name: '', last_name: '', isNew: true }]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
		}));
	};



	return (
		<GridToolbarContainer>
			<Button color="primary" icon={<PlusOutlined />} onClick={handleClick} style={{
				margin: 5,

			}}>
				Add record
			</Button>
			<Button size="small" >
				Update a row
			</Button>
		</GridToolbarContainer>
	);
}




export const AdminWarehouse = () => {

	const navigate = useNavigate();
	const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

	const [warehouse, setWarehouses] = useState<RowWarehouse[]>([]);

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

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
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
		setWarehouses(warehouse.filter((row) => row.id !== id));
	};

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = warehouse.find((row) => row.id === id);
		if (editedRow!.isNew) {
			setWarehouses(warehouse.filter((row) => row.id !== id));
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

	const columns: GridColDef[] = [										// pobrac dane z api
		{
			field: 'building',
			headerName: 'Building',
			width: 180,
			editable: true,
		},
		{
			field: 'zone',
			headerName: 'Zone',
			width: 180,
			editable: true,
		},
		{
			field: 'spaceId',
			headerName: 'Space id',
			width: 180,
			editable: true,
		},
		{
			field: 'spaceHeight',
			headerName: 'Space Height',
			width: 100,
			editable: true,
		},
		{
			field: 'spaceWidth',
			headerName: 'Space Width',
			width: 220,
			editable: true,
		},
		{
			field: 'spaceLength',
			headerName: 'Space Width',
			width: 220,
			editable: true,
			flex: 1
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			width: 100,
			cellClassName: 'actions',
			align: "right",
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: 'primary.main',
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<SearchIcon />}
						label='Show Products'
						onClick={() => navigate("/items")}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box>
			<Box
				sx={{
					height: "60vh",
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
					<Breadcrumb.Item>Warehouses</Breadcrumb.Item>
				</Breadcrumb>



				<Typography
					variant="h3"
					component="h3"
					sx={{
						textAlign: "center",
						p: 5,

					}}
				>
					Manage Warehouses
				</Typography>

				<DataGrid
					rows={warehouse}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
					slots={{
						toolbar: EditToolbar as GridSlots['toolbar'],
					}}
					slotProps={{
						toolbar: { setWarehouses, setRowModesModel },
					}}
					sx={{
						boxShadow: 2,
						border: 1,
						'& .MuiDataGrid-cell:hover': {
							color: 'primary.main',
						},
						'& .MuiDataGrid-footerContainer ': {
							bgcolor: '#F1BCD9'
						},
						'& .MuiDataGrid-toolbarContainer  ': {
							bgcolor: '#F1BCD9',

						},
						'& .MuiButtonBase-root  ': {


						},
					}}
				/>
			</Box>
		</Box>
	);

};


export default AdminWarehouse;