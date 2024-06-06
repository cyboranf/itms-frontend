import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import { Warehouse, RequestWarehouse } from "../../../service/warehouses/types";

interface CreateWarehouseFormProps {
	form: FormInstance;
	onClose: () => void;
	handleCreateWarehouse: (warehouseData: RequestWarehouse) => void;
	initialValues?: Warehouse | null;
}

const CreateWarehouseForm: React.FC<CreateWarehouseFormProps> = ({
	form,
	onClose,
	handleCreateWarehouse,
	initialValues,
}) => {
	const [warehouse, setWarehouse] = useState<RequestWarehouse>({
		building: "",
		zone: "",
		spaceId: 0,
		spaceHeight: 0,
		spaceWidth: 0,
		spaceLength: 0,
		productId: 0,
		productCode: "",
		productName: "",
	});

	useEffect(() => {
		if (initialValues) {
			setWarehouse(initialValues);
			form.setFieldsValue(initialValues);
		}
	}, [initialValues, form]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWarehouse({ ...warehouse, [name]: value });
	};

	const handleSubmit = () => {
		form
			.validateFields()
			.then(() => {
				handleCreateWarehouse(warehouse);
				form.resetFields();
				setWarehouse({
					building: "",
					zone: "",
					spaceId: 0,
					spaceHeight: 0,
					spaceWidth: 0,
					spaceLength: 0,
					productId: 0,
					productCode: "",
					productName: "",
				});
				onClose();
			})
			.catch((errorInfo) => {
				console.log("Validate Failed:", errorInfo);
			});
	};

	return (
		<Form layout='vertical' hideRequiredMark form={form}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item
						name='building'
						label='Building Name'
						rules={[{ required: true, message: "Please enter building name" }]}
					>
						<Input
							name='building'
							placeholder='Please enter building name'
							value={warehouse.building}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='zone' label='Zone Name' rules={[{ required: true, message: "Please enter zone name" }]}>
						<Input
							name='zone'
							placeholder='Please enter zone name'
							value={warehouse.zone}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='spaceId' label='Space Id' rules={[{ required: true, message: "Please enter space Id" }]}>
						<Input
							name='spaceId'
							placeholder='Please enter space Id'
							value={warehouse.spaceId}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='spaceHeight'
						label='Space Height'
						rules={[{ required: true, message: "Please enter space height" }]}
					>
						<Input
							name='spaceHeight'
							type='number'
							placeholder='Please enter space height'
							value={warehouse.spaceHeight}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='spaceWidth'
						label='Space Width'
						rules={[{ required: true, message: "Please enter space width" }]}
					>
						<Input
							name='spaceWidth'
							type='number'
							placeholder='Please enter space width'
							value={warehouse.spaceWidth}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='spaceLength'
						label='Space Length'
						rules={[{ required: true, message: "Please enter space length" }]}
					>
						<Input
							name='spaceLength'
							type='number'
							placeholder='Please enter space length'
							value={warehouse.spaceLength}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='productId'
						label='Product Id'
						rules={[{ required: true, message: "Please enter product Id" }]}
					>
						<Input
							name='productId'
							placeholder='Please enter product Id'
							value={warehouse.productId}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item>
						<Button type='primary' onClick={handleSubmit} block>
							Submit
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default CreateWarehouseForm;
