import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/es/form";
import { User } from "../../../service/users/types";
import { PutUsers } from "../../../service/users";
import { useAxios } from "../../../helpers/axios/useAxios";

interface UserFormProps {
	form: FormInstance;
	initialValues?: User | null;
	refreshUsers: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ form, initialValues, refreshUsers }) => {
	const [user, setUser] = useState<User>({
		id: 0,
		username: "",
		name: "",
		lastname: "",
		pesel: "",
		email: "",
		phoneNumber: "",
		tasks: [],
	});

	const axios = useAxios();

	useEffect(() => {
		if (initialValues) {
			setUser(initialValues);
			form.setFieldsValue(initialValues);
		}
	}, [initialValues, form]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async () => {
		try {
			await form.validateFields();
			const succ = await PutUsers(user, axios);
			if (!succ) return;
			refreshUsers();
		} catch (err) {
			console.error("Error during form submission:", err);
		}
	};

	return (
		<Form layout='vertical' hideRequiredMark form={form}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name='email' label='Email' rules={[{ required: true, message: "Please enter email" }]}>
						<Input name='email' placeholder='Please enter email' value={user.email} onChange={handleInputChange} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='lastname' label='Last Name' rules={[{ required: true, message: "Please enter last name" }]}>
						<Input
							name='lastname'
							placeholder='Please enter last name'
							value={user.lastname}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='name' label='Name' rules={[{ required: true, message: "Please enter name" }]}>
						<Input name='name' placeholder='Please enter name' value={user.name} onChange={handleInputChange} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='pesel' label='Pesel' rules={[{ required: true, message: "Please enter pesel" }]}>
						<Input name='pesel' placeholder='Please enter pesel' value={user.pesel} onChange={handleInputChange} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item
						name='phoneNumber'
						label='Phone Number'
						rules={[{ required: true, message: "Please enter phone number" }]}
					>
						<Input
							name='phoneNumber'
							placeholder='Please enter phone number'
							value={user.phoneNumber}
							onChange={handleInputChange}
						/>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name='username' label='Username' rules={[{ required: true, message: "Please enter username" }]}>
						<Input
							name='username'
							placeholder='Please enter username'
							value={user.username}
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

export default UserForm;
