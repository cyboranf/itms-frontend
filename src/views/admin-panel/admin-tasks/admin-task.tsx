import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
import { blue, green } from "@mui/material/colors";
import { Link } from 'react-router-dom';

const initialRows: GridRowsProp = [
	{
	  id: 1,
	  name: "Import something",
    priority:"Wh",
    creation_date:"05.10.2022",
    end_date:"10.10.2022",
    type:"Import",
    status:"Very important"

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
	  setRows((oldRows) => [...oldRows, { id, name: '', isNew: true }]);
	  setRowModesModel((oldModel) => ({
		...oldModel,
		[id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
	  }));
	};
  
	return (
	  <GridToolbarContainer>
		<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
		  Add record
		</Button>
	  </GridToolbarContainer>
	);
  }
  

export const AdminTask = () => {
  
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
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  {
    field: 'priority',
    headerName: 'priority',
    width: 180,
    align: 'left',
    headerAlign: 'left',
    editable: true,
  },
  {
    field: 'creation_date',
    headerName: 'Creation Date',
    width: 180,
    editable: true,
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    width: 180,
    editable: true,
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 100,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['Import', 'Shipment', 'Move'],
    
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 220,
    editable: true,
    flex: 1,
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
    <Typography
      variant="h3"
      component="h3"
      sx={{
        textAlign: "center",
        p: 5,
        
      }}
    >
      Manage Tasks
    </Typography>
    <Link to="/add-task" style={{ textDecoration: 'none' }}>
      <Button
        sx={[
        {
          bgcolor: green[400],
          mb: 1,
          color: "white"
        },
        (theme) => ({
          '&:hover': {
          bgcolor: green[800],
          },
        }),
        ]}
      >
        Add Task
      </Button>
         </Link>
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


export default AdminTask;