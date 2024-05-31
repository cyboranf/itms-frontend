import "./admin-users.scss";
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
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Breadcrumb, Drawer, Form, Space, Button, Layout } from "antd";
import { Navbar } from "../../../components/navbar";
import { User } from "../../../service/users/types";
import { DeleteUsers, PutUsers, getAllUsers } from "../../../service/users";
import UserForm from "../../../components/forms/admin/admin-users-form";

const { Content } = Layout;

export const AdminPanel = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const [rows, setRows] = useState<User[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [id, setId] = useState<GridRowId>("");

  const getUsers = async () => {
    try {
      const res = await getAllUsers();
      setRows(res);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setId(id);
    setOpen(true);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    DeleteUsers(id.toString());
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const [form] = Form.useForm();

  const handleEditSubmitClick = () => async () => {
    try {
      form
        .validateFields()
        .then(async (values) => {
          const editUser: User = {
            id: Number(id),
            email: values.email,
            lastname: values.lastname,
            name: values.name,
            pesel: values.pesel,
            phoneNumber: values.phoneNumber,
            username: values.username,
            tasks: [],
          };

          const success = await PutUsers(editUser);
          if (success) {
            getAllUsers();
            onClose();
          } else {
            console.error("Error while updating the user.");
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
    { field: "lastname", headerName: "Last Name", width: 180, editable: false },
    { field: "pesel", headerName: "Pesel", width: 180, editable: false },
    { field: "email", headerName: "Email", width: 180, flex: 1, editable: false },
    { field: "phoneNumber", headerName: "Phone Number", width: 180, editable: false },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      align: "right",
      getActions: ({ id }) => [
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
      ],
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
                title="Edit a User"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={handleEditSubmitClick()} type="primary">
                      Submit
                    </Button>
                  </Space>
                }
              >
                <UserForm form={form} />
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
              <div style={{ margin: 10 }}>
                <Button type="primary" style={{ marginRight: 5 }}>
                  <Link to="http://127.0.0.1:8080/generate-user-report" style={{ textDecoration: "none" }}>
                    Report
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
                }}
              />
            </Box>
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};
