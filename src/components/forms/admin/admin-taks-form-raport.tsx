import React, { useState } from 'react';
import { Drawer, Form, Input, Button, Space } from 'antd';
import { FormInstance } from "antd/es/form";

interface TaskReportFormProps {
    form: FormInstance;
  }

  const TaskReportForm: React.FC<TaskReportFormProps> = ({ form }) =>  {
  const [includeUsers, setIncludeUsers] = useState(false);
  const [includeProducts, setIncludeProducts] = useState(false);
  const [includeWarehouses, setIncludeWarehouses] = useState(false);
  const [includePieChart, setIncludePieChart] = useState(false);


  return (
      <Form layout='vertical'>
        <Form.Item label='Include Users'>
          <input type='checkbox' checked={includeUsers} onChange={(e) => setIncludeUsers(e.target.checked)} />
        </Form.Item>
        <Form.Item label='Include Products'>
          <input type='checkbox' checked={includeProducts} onChange={(e) => setIncludeProducts(e.target.checked)} />
        </Form.Item>
        <Form.Item label='Include Warehouses'>
          <input
            type='checkbox'
            checked={includeWarehouses}
            onChange={(e) => setIncludeWarehouses(e.target.checked)}
          />
        </Form.Item>
        <Form.Item label='Include Pie Chart'>
          <input
            type='checkbox'
            checked={includePieChart}
            onChange={(e) => setIncludePieChart(e.target.checked)}
          />
        </Form.Item>
      </Form>
  );
};

export default TaskReportForm;
