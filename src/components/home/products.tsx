import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'
import { Text } from '../text'
import {Area, AreaConfig} from '@ant-design/plots'
function products() {

  // Generate sample data
  const generateData = () => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        date: `2024-04-${i + 1}`, 
        value: Math.floor(Math.random() * 100) 
      });
    }
    return data;
  };


  const config: AreaConfig = {
    data: generateData(),
    xField: 'date', 
    yField: 'value', 
    xAxis: {
      tickCount: 5 
    },
    yAxis: {
      min: 0 
    }
  };


  return (
    <Card
      style={{
        height: "100%"
      }}
      headStyle={{padding: '8px 16px'}}
      bodyStyle={{padding: '24px 24px 0 24px'}}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}

        >
          <DollarOutlined />
          <Text size='sm' style={{marginLeft: '0.5rem'}}>
              Produckts
          </Text>

        </div>
      }
    >
      <Area
        {...config}
        height={325}
      />
    </Card>
  )
}

export default products