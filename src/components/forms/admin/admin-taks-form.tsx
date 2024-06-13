import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Table, DatePicker } from 'antd';
import { FormInstance } from 'antd/es/form';
import {getAllUsers } from '../../../service/users';
import {getAllWarehouses } from '../../../service/warehouses';
import {getAllItems} from '../../../service/items';
import {getAllTasksTypes, PostTaskUsers, PostTask, PostTaskProduct } from '../../../service/tasks';
import { useAxios } from "../../../helpers/axios/useAxios";
import products from '../../home/products';
import { toast } from "react-toastify";

const { Option } = Select;


interface TaskFormProps {
	form: FormInstance;
	onClose: () => void;
	handleCreateTask: () => void;
}



const TaskForm: React.FC<TaskFormProps> = ({ form, onClose, handleCreateTask }) => {

	const axios = useAxios();

	const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
	const [warehouses, setWarhouse] = useState<{id: number; building: string}[]>([]);
	const [products, setProduct] = useState<{id: number, name: string}[]>([]);
	const [tasksTypes, setTasksTypes] = useState<{id: number, name: string}[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers(axios);

                setUsers(response.map(user => ({
                    id: user.id,
                    name: `${user.name} ${user.lastname}`,
                })));

            } catch (error) {
                console.error('Błąd podczas pobierania użytkowników:', error);
            }
        };

		const fetchedWarhouse = async () => {
			try {
				const response = await getAllWarehouses(axios);

				setWarhouse(response.map(warehouse => ({
					id: warehouse.id,
					building: warehouse.building
				})));

			} catch (error){
				console.error('Błąd podczas pobierania użytkowników:', error);
			}
		};

		const fetchedProduct = async () => {
			try {
				const response = await getAllItems(axios);

				setProduct(response.map(products => ({
					id: products.id,
					name: products.name
				})));

			} catch (error){
				console.error('Błąd podczas pobierania użytkowników:', error);
			}
		};

		const fetchedTaskTypes = async () => {
			try {
				const response = await getAllTasksTypes(axios);

				setTasksTypes(response.map(products => ({
					id: products.id,
					name: products.name
				})));

			} catch (error){
				console.error('Błąd podczas pobierania użytkowników:', error);
			}
		};
		fetchedTaskTypes();
		fetchedProduct();
		fetchUsers();
        fetchedWarhouse();
    }, []);

	const onFinish = async (values: any) => {
		const taskParams = {
			users: values.assignee, // assuming `users` field takes an array of user IDs
			id: 0, // Assuming ID is auto-generated
			name: values.name,
			description: values.description,
			state: values.state,
			priority: values.priority,
			startDate: values.startDate,
			endDate: values.endDate,
			type_id: values.taskType,
		};
		

		try {
			
			const taskCreated = await PostTask(taskParams, axios);
			
			if (taskCreated) {
				console.log(taskCreated.id + " " + " " + values.assignee); 
				await PostTaskProduct(taskCreated.id, values.assignee, axios);
				await PostTaskUsers(values.assignee, taskCreated.id, axios)
				toast.success("Stworzona tasks");
				
			} else {
				toast.error("Bład przy tworzeniu taska")
			}
		} catch (error) {
			console.error('Error while creating task');
		}
	};


	return (
		<Form layout='vertical' hideRequiredMark form={form} onFinish={onFinish}>
			<Form.Item label="Task Name" name="name" rules={[{ required: true, message: 'Please enter the task name' }]}>
				<Input placeholder="Enter task name" />
			</Form.Item>
			<Form.Item label="Priority" name="priority" rules={[{ required: true, message: 'Please select the priority' }]}>
				<Select placeholder="Select priority">
					<Option value={1}>Low</Option>
					<Option value={2}>Medium</Option>
					<Option value={3}>High</Option>
				</Select>
			</Form.Item>
			<Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter the task description' }]}>
				<Input placeholder="Enter task description" />
			</Form.Item>
			<Form.Item label="Creation Date" name="startDate" rules={[{ required: true, message: 'Please select the creation date' }]}>
				<DatePicker style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item label="End Date" name="endDate" rules={[{ required: true, message: 'Please select the end date' }]}>
				<DatePicker style={{ width: '100%' }} />
			</Form.Item>
			<Form.Item label="Status" name="state" rules={[{ required: true, message: 'Please select the status' }]}>
				<Select placeholder="Select status">
					<Option value={1}>Not Started</Option>
					<Option value={2}>In Progress</Option>
					<Option value={3}>Completed</Option>
				</Select>
			</Form.Item>
			<Form.Item label="Assignee" name="assignee" rules={[{ required: true, message: 'Please select a person' }]}>
				<Select
					showSearch
					placeholder="Select a person"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
					}
				>
					{users.map(user => (
						<Option key={user.id} value={user.id}>
							{user.name}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Warehouse" name="warehouse" rules={[{ required: true, message: 'Please select a warehouse' }]}>
				<Select
					showSearch
					placeholder="Select a warehouse"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
					}
				>
					{warehouses.map(warehouse => (
						<Option key={warehouse.id} value={warehouse.id}>
							{warehouse.building}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Product" name="product" rules={[{ required: true, message: 'Please select a product' }]}>
				<Select
					showSearch
					placeholder="Select a product"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
					}
				>
					{products.map(product => (
						<Option key={product.id} value={product.id}>
							{product.name}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Task Type" name="taskType" rules={[{ required: true, message: 'Please select a task type' }]}>
				<Select
					showSearch
					placeholder="Select a task type"
					optionFilterProp="children"
					filterOption={(input, option) =>
						(option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
					}
				>
					{tasksTypes.map(taskType => (
						<Option key={taskType.id} value={taskType.id}>
							{taskType.name}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Create Task
				</Button>
				<Button onClick={onClose} style={{ marginLeft: '8px' }}>
					Cancel
				</Button>
			</Form.Item>
		</Form>
	);
};

export default TaskForm;
