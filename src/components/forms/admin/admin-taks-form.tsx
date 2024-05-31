// TaskForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button, Select, Row, Col, Table, DatePicker } from 'antd';
import { FormInstance } from 'antd/es/form';

const { Option } = Select;

interface TaskFormProps {
	form: FormInstance;
	onClose: () => void;
	handleCreateTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ form, onClose, handleCreateTask }) => {
	const [product, setProduct] = useState<string>("");
	const [warehouseSpace, setWarehouseSpace] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [selectedOptions, setSelectedOptions] = useState<{ product: string, warehouseSpace: string, description: string }[]>([]);
	const [employeeGroup, setEmployeeGroup] = useState<string>("");

	const handleAddOption = () => {
		if (product && warehouseSpace) {
			setSelectedOptions([...selectedOptions, { product, warehouseSpace, description }]);
			setProduct("");
			setWarehouseSpace("");
			setDescription("");
		}
	};

	const handleDeleteOption = (index: number) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions.splice(index, 1);
		setSelectedOptions(updatedOptions);
	};

	const antColumns = [
		{ title: "Product", dataIndex: "product", key: "product" },
		{ title: "Warehouse-space", dataIndex: "warehouseSpace", key: "warehouseSpace" },
		{ title: "Description", dataIndex: "description", key: "description" },
		{
			title: "Action",
			key: "action",
			render: (_: unknown, __: unknown, index: number) => <Button onClick={() => handleDeleteOption(index)}>Delete</Button>,
		},
	];

	return (
		<Form layout='vertical' hideRequiredMark form={form}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='name' label='Task Name' rules={[{ required: true, message: 'Please enter task name' }]}>
						<Input placeholder='Please enter task name' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please select a category' }]}>
						<Select placeholder='Select a category'>
							<Option value='category1'>Category 1</Option>
							<Option value='category2'>Category 2</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please enter a description' }]}>
						<Input.TextArea rows={4} placeholder='Enter description' />
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item name='product' label='Product'>
						<Select placeholder='Select a product' value={product} onChange={(value) => setProduct(value)}>
							<Option value='product1'>Product 1</Option>
							<Option value='product2'>Product 2</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item name='warehouseSpace' label='Warehouse-space'>
						<Select placeholder='Select warehouse space' value={warehouseSpace} onChange={(value) => setWarehouseSpace(value)}>
							<Option value='space1'>Warehouse-space 1</Option>
							<Option value='space2'>Warehouse-space 2</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={8}>
					<Form.Item>
						<Button type='primary' onClick={handleAddOption} block>
							Add
						</Button>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Table dataSource={selectedOptions} columns={antColumns} rowKey={(record) => `${record.product}-${record.warehouseSpace}`} />
				</Col>
				<Col span={24}>
					<Form.Item name='employeeGroup' label='Employee Group'>
						<Select placeholder='Select an employee group' value={employeeGroup} onChange={(value) => setEmployeeGroup(value)}>
							<Option value='group1'>Group 1</Option>
							<Option value='group2'>Group 2</Option>
						</Select>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='startDate' label='Start Date' rules={[{ required: true, message: 'Please enter start date' }]}>
						<DatePicker />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='endDate' label='End Date' rules={[{ required: true, message: 'Please enter end date' }]}>
						<DatePicker />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='idd' label='Task id' rules={[{ required: true, message: 'Please enter Task id' }]}>
						<Input placeholder='Please enter Task id' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='priority' label='Priority' rules={[{ required: true, message: 'Please enter Priority' }]}>
						<Input placeholder='Please enter Priority' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='state' label='State' rules={[{ required: true, message: 'Please enter state' }]}>
						<Input placeholder='Please enter state' />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='type_id' label='Type ID' rules={[{ required: true, message: 'Please enter type id' }]}>
						<Input placeholder='Please enter type id' />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default TaskForm;
