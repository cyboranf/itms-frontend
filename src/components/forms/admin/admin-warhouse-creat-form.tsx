import React from "react";
import { Form, Input, Row } from "antd";
import { FormInstance } from "antd/es/form";

interface CreateWarehouseFormProps {
  form: FormInstance;
}

const CreateWarehouseForm: React.FC<CreateWarehouseFormProps> = ({ form }) => {
  return (
    <Form layout="vertical" hideRequiredMark form={form}>
      <Row>
        <Form.Item
          name="BuildingName"
          label="Building Name"
          rules={[{ required: true, message: "Please enter building name" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter building name" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="ZoneName"
          label="Zone Name"
          rules={[{ required: true, message: "Please enter zone name" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter zone name" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="SpaceId"
          label="Space Id"
          rules={[{ required: true, message: "Please enter spaceId" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter spaceId" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="SpaceHeight"
          label="Space Height"
          rules={[{ required: true, message: "Please enter Space Height" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter Space Height" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="spaceWidth"
          label="Space Width"
          rules={[{ required: true, message: "Please enter Space Width" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter Space Width" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="spaceLength"
          label="Space Length"
          rules={[{ required: true, message: "Please enter space Length" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter space Length" />
        </Form.Item>
      </Row>
      <Row>
        <Form.Item
          name="productId"
          label="Product Id"
          rules={[{ required: true, message: "Please enter product Id" }]}
          style={{ flex: 1 }}
        >
          <Input placeholder="Please enter product Id" />
        </Form.Item>
      </Row>
    </Form>
  );
};

export default CreateWarehouseForm;
