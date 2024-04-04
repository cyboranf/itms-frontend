import React, { useState } from 'react';
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
import { Breadcrumb, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom';

const initialRows: GridRowsProp = [
  {
    id: 1,
	name: "produkt",
    code: 123,
	height: 23,
	width: 23,
	lenght: 23
  },
  {
    id: 2,
	name: "produkt",
    code: 123,
	height: 23,
	width: 23,
	lenght: 23
  },
  {
    id: 3,
	name: "produkt",
    code: 123,
	height: 23,
	width: 23,
	lenght: 23
  },
];

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




export const AdminItems = () => {

		const navigate = useNavigate();
		const [rows, setRows] = React.useState(initialRows);
		const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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
			setRows(rows.filter((row) => row.id !== id));
		};

		const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
		
		const editedRow = rows.find((row) => row.id === id);
		if (editedRow!.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
		};

		const processRowUpdate = (newRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
			setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
			return updatedRow;
		};

		const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
			setRowModesModel(newRowModesModel);
		};

		const columns: GridColDef[] = [										// pobrac dane z api
		{
			field: 'name',
			headerName: 'Name',
			width: 180,
			editable: true,
		},
		{
			field: 'code',
			headerName: 'Code',
			width: 180,
			editable: true,
		},
		{
			field: 'width',
			headerName: 'Width',
			width: 180,
			editable: true,
		},
		{
			field: 'height',
			headerName: 'Height',
			width: 100,
			editable: true,			
		},
		{
			field: 'lenght',
			headerName: 'Lenght',
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
		<Box
			p={15}	
		>
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
            	<Breadcrumb.Item><Link to="/warehouses" style={{ textDecoration: 'none' }}>Warehouses</Link></Breadcrumb.Item>
				<Breadcrumb.Item>Items</Breadcrumb.Item>
          	</Breadcrumb>



			<Typography
				variant="h3"
				component="h3"
				sx={{
					textAlign: "center",
					p: 5,
					
				}}
			>
				Manage Items
			</Typography>
			
			<DataGrid
			rows={rows}
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
				toolbar: { setRows, setRowModesModel },
			}}
			sx={{
				boxShadow: 2,
				border: 1,
				'& .MuiDataGrid-cell:hover': {
					color: 'primary.main',
				  },
				'& .MuiDataGrid-footerContainer ': {
					bgcolor: '#EDF05E'
				  },
				'& .MuiDataGrid-toolbarContainer  ': {
					bgcolor: '#EDF05E',
					
				  },
				'& .MuiButtonBase-root  ': {
					
					
				  },
			}}
			/>
		</Box>
		</Box>
		);

};


export default AdminItems;