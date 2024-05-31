import React from 'react';
import { Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/es/form';

interface UserFormProps {
  form: FormInstance;
}

const UserForm: React.FC<UserFormProps> = ({ form }) => {
  return (
    <Form layout='vertical' hideRequiredMark form={form}>
      <Row>
        <Form.Item
          name='email'
          label='Email'
          rules={[{ required: true, message: 'Please enter email' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter email' />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='lastname'
          label='Last Name'
          rules={[{ required: true, message: 'Please enter last name' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter last name' />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='name'
          label='Name'
          rules={[{ required: true, message: 'Please enter name' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter name' />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='pesel'
          label='Pesel'
          rules={[{ required: true, message: 'Please enter pesel' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter pesel' />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='phoneNumber'
          label='Phone Number'
          rules={[{ required: true, message: 'Please enter phone number' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter phone number' />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name='username'
          label='Username'
          rules={[{ required: true, message: 'Please enter username' }]}
          style={{ flex: 1 }}
        >
          <Input placeholder='Please enter username' />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default UserForm;
