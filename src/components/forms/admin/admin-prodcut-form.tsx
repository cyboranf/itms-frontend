import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import { Items, RequestItem } from "../../../service/items/types";

interface ProductFormProps {
	form: FormInstance;
	onClose: () => void;
	handleCreateProduct: (productData: RequestItem) => void;
	initialValues?: Items | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ form, onClose, handleCreateProduct, initialValues }) => {
	const [product, setProduct] = useState<RequestItem>({
		name: "",
		code: "",
		width: 0,
		height: 0,
		length: 0,
		weight: 0,
	});

	useEffect(() => {
		if (initialValues) {
			setProduct(initialValues);
			form.setFieldsValue(initialValues);
		}
	}, [initialValues, form]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleSubmit = () => {
		form
			.validateFields()
			.then(() => {
				handleCreateProduct(product);
				form.resetFields();
				setProduct({ name: "", code: "", width: 0, height: 0, length: 0, weight: 0 });
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
						name='name'
						label='Product Name'
						rules={[{ required: true, message: "Please enter product name" }]}
					>
						<Input
							name='name'
							placeholder='Please enter product name'
							value={product.name}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='code'
						label='Product Code'
						rules={[{ required: true, message: "Please enter product code" }]}
					>
						<Input
							name='code'
							placeholder='Please enter product code'
							value={product.code}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='width' label='Width' rules={[{ required: true, message: "Please enter width" }]}>
						<Input
							name='width'
							type='number'
							placeholder='Please enter width'
							value={product.width}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='height' label='Height' rules={[{ required: true, message: "Please enter height" }]}>
						<Input
							name='height'
							type='number'
							placeholder='Please enter height'
							value={product.height}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='length' label='Length' rules={[{ required: true, message: "Please enter length" }]}>
						<Input
							name='length'
							type='number'
							placeholder='Please enter length'
							value={product.length}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='weight' label='Weight' rules={[{ required: true, message: "Please enter weight" }]}>
						<Input
							name='weight'
							type='number'
							placeholder='Please enter weight'
							value={product.weight}
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

export default ProductForm;
