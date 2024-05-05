import "./admin-users.scss";
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
import { Link } from "react-router-dom";
import { Breadcrumb, Drawer, Form, Input, Row, Space, Button, Layout } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Navbar } from "../../../components/navbar";
import { User } from "../../../service/users/types";
import { getAllUsers } from "../../../service/users";
const roles = ["Market", "Finance", "Development"]; // pobrac role z api

//const { Option } = Select;

const { Header, Content, Footer, Sider } = Layout;


export const AdminPanel = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [rows, setRows] = React.useState<User[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const getUsers = async () => {
    try{
      const res = await getAllUsers()
      setRows(res);
    } catch (err: unknown){
      console.error(err);
    }
  }

  React.useEffect(() => {
		getUsers();
	}, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
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

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "pesel",
      headerName: "Pesel",
      width: 180,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      flex: 1,
      editable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 180,
      editable: true,
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
              label="Save"
              sx={{
                color: "primary.main",
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
                title="Create a new Role"
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
                    <Button onClick={onClose} type="primary">
                      Submit
                    </Button>
                  </Space>
                }
              >
                <Form layout="vertical" hideRequiredMark>
                  <Row>
                    <Form.Item
                      name="name"
                      label="Role Name"
                      rules={[
                        { required: true, message: "Please enter role name" },
                      ]}
                      style={{
                        flex: 1,
                      }}
                    >
                      <Input placeholder="Please enter role name" />
                    </Form.Item>
                  </Row>
                </Form>
              </Drawer>

              <Typography
                variant="h3"
                component="h3"
                sx={{
                  textAlign: "center",
                  p: 5,
                }}
              >
                Manage Users
              </Typography>
              <div style={{ margin: 10 }}>
                <Button type="primary" style={{ marginRight: 5 }}>
                  <Link to="/roles" style={{ textDecoration: "none" }}>
                    Show Tasks
                  </Link>
                </Button>
              </div>
              <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
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
            </Box>
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
}