import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {  Breadcrumb,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Button,
  Layout, } from "antd";
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

import { PlusOutlined } from "@ant-design/icons";
import { access } from "original-fs";
import axios from "axios";
import instanceAxios from "../../../helpers/axios/axios";
import { GetTasks, DeleteTasks, PostTask } from "../../../service/users";
import { TaskValuesType } from "../../../service/users/types";



export const AdminRole = () => {
  const [rows, setRows] = useState<TaskValuesType[]>([]); // Use local state instead of props
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const test = async () => {
    try {
      const res = await GetTasks();
      console.log(res);
      setRows(res); // Update local state with fetched data
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
  
  };

  const handleDeleteClick = (id: number) => async () => {
    const success = await DeleteTasks(id);
    if (success) {
      // Jeśli usunięto zadanie pomyślnie, odświeżamy listę zadań
      test();
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const [form] = Form.useForm();
  const formData = Form.useWatch('name', form);
  
  const handleSubmitClick = async () => {
    try {
      // Pobieramy dane z formularza
      
     
      console.log(formData)
      // Sprawdzamy, czy wszystkie wymagane pola zostały uzupełnione
   
  
      // Tworzymy obiekt zawierający dane nowego zadania
      const newTask: TaskValuesType = {
        id: 123, // Przykładowe generowanie identyfikatora, możesz dostosować to do swoich potrzeb
        name: formData,
      };
  
      // Dodajemy nowe zadanie za pomocą funkcji PutTask
      const success = await PostTask(newTask);
  
      if (success) {
        
        test();
        
        onClose();
      } else {
        // Wyświetl błąd użytkownikowi w przypadku niepowodzenia
        console.error("Błąd podczas dodawania zadania.");
      }
    } catch (error) {
      console.error("Błąd podczas przetwarzania formularza:", error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130, flex: 1 },
    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      align: "right",
      getActions: ({ id }) => {    
        return [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Save"
          sx={{
          color: 'primary.main',
          }}
          onClick={handleDeleteClick(id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        ];
      }
  
    
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          height: 500,
          width: '100%'
        }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
            	<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            	<Breadcrumb.Item>Task</Breadcrumb.Item>
        </Breadcrumb>
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
        <Button  type="primary" onClick={showDrawer}>Add Task</Button>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          
      />
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
                    <Button onClick={handleSubmitClick}  type="primary">
                      Submit
                    </Button>
                  </Space>
                }
              >
                <Form layout="vertical" hideRequiredMark form={form}>
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
                      <Input  placeholder="Please enter role name" />
                    </Form.Item>
                  </Row>
                </Form>
              </Drawer>
      </Box>
    </Box>
  );
};

export default AdminRole;
