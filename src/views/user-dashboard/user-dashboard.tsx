import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Breadcrumb, Typography, Layout, Descriptions } from "antd";
import { Pie } from '@ant-design/plots';
import { useAxios } from "../../helpers/axios/useAxios";
import { User } from "../../service/users/types";
import { getSelf } from "../../service/users";
import { getAllTasksSelf } from "../../service/tasks"; 
import type { DescriptionsProps } from 'antd';
import type { Task } from "../../service/tasks/types"; 

export const UserDashboard = () => {
    const { Content } = Layout;
    const axios = useAxios();
    const [user, setUser] = useState<User | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskStatus, setTaskStatus] = useState<{ status: string, count: number }[]>([]);

    const getUser = async () => {
        try {
            const res = await getSelf(axios);
            
            setUser(res);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    const getTasks = async () => {
        try {
            const res = await getAllTasksSelf(axios);
            console.log(res);
            setTasks(res.tasks);
        } catch (err: unknown) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
        getTasks();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) {
            const statusCounts: { [key: string]: number } = {
                'Import': 0,
                'Shipment': 0,
                'Move': 0,
                'Print': 0,
            };

            tasks.forEach(task => {
                if (task.type_id === 0) statusCounts['Import']++;
                if (task.type_id === 1) statusCounts['Shipment']++;
                if (task.type_id === 3) statusCounts['Move']++;
                if (task.type_id === 4) statusCounts['Print']++;
            });

            const statusData = Object.keys(statusCounts).map(status => ({
                status,
                count: statusCounts[status],
            }));

            setTaskStatus(statusData);
        }
    }, [tasks]);

    const items: DescriptionsProps['items'] = user ? [
        {
            key: '1',
            label: 'UserName',
            children: user.username,
        },
        {
            key: '2',
            label: 'Telephone',
            children: user.phoneNumber,
        },
        {
            key: '3',
            label: 'Email',
            children: user.email,
        },
        {
            key: '4',
            label: 'First Name',
            children: user.name,
        },
        {
            key: '5',
            label: 'Last Name',
            children: user.lastname,
        },
    ] : [];

    const config = {
        appendPadding: 10,
        data: taskStatus,
        angleField: 'count',
        colorField: 'status',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <Box>
            <Box
                sx={{
                    height: 500,
                    width: "100%",
                    "& .actions": {
                        color: "text.secondary",
                    },
                    "& .textPrimary": {
                        color: "text.primary",
                    },
                }}
            >
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 180,
                        background: "white",
                        borderRadius: "10px",
                    }}
                >
                    <Descriptions title="User Info" items={items} />
                </Content>
                <Content
                    style={{
                        padding: 24,
                        marginTop: 10,
                        minHeight: 450,
                        background: "white",
                        borderRadius: "10px",
                    }}
                >
                    <Typography>Task Status</Typography>
                    <Pie {...config} />
                </Content>
            </Box>
        </Box>
    );
};

export default UserDashboard;
