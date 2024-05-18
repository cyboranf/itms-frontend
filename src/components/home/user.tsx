import { UnderlineOutlined } from '@ant-design/icons'
import { Card, List, Skeleton } from 'antd'
import { Text } from '../text'

const Dashboarduser = () => {

  const isLoading = false;

  // Example user data
  const userData = [
    { id: 1, name: 'John Doe', role: 'Shipment' },
    { id: 2, name: 'Jane Smith', role: 'Administrator Printer' },
    { id: 3, name: 'Michael Johnson', role: 'Warehousmen' },
    { id: 4, name: 'Emily Davis', role: 'Shipment' },
    { id: 5, name: 'David Wilson', role: 'Administrator Printer' },
    { id: 6, name: 'Sarah Brown', role: 'Warehousmen' },
    { id: 7, name: 'Christopher Lee', role: 'Shipment' },
    { id: 8, name: 'Amanda Martinez', role: 'Administrator Printer' },
    { id: 9, name: 'Daniel Taylor', role: 'Warehousmen' },
    { id: 10, name: 'Olivia Harris', role: 'Shipment' },
    // Add more employees and roles as needed
  ];

  return (
    <Card headStyle={{padding: '16px'}} bodyStyle={{padding: '0 1rem'}} title={(<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><UnderlineOutlined /> <Text size='sm' style={{marginLeft: '0.5rem'}}>Working Users</Text></div>)}>
        {isLoading ? (
            <List 
                itemLayout='horizontal'
                dataSource={Array.from({length: 4}).map((_, i) => ({id: i}))}
                renderItem={(_) => (
                    <Skeleton active/>
                )}  
            />
        ):(
            <List 
                itemLayout='horizontal'
                dataSource={userData}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            title={<Text>{user.name}</Text>}
                            
                        />
                        <List.Item.Meta
                            title={<Text>{user.role}</Text>}
                            
                        />
                    </List.Item>
                )}
           /> 
        )}
    </Card>
  )
}

export default Dashboarduser