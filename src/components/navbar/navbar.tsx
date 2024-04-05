import "./navbar.scss";
import React, { useState } from 'react';
import {
  UserOutlined,
  TableOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Link} from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    route?: string,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

const items: MenuItem[] = [
    getItem('Home', '1', <HomeOutlined />),
    getItem('Users', '2', <UserOutlined />),
    getItem('Tasks', '3', <TableOutlined />),
    getItem('Warehouses', '4', <ShopOutlined />),
    getItem('Seting', '5', <SettingOutlined />),
    getItem('Logout', '6',   <LogoutOutlined />),
  ];


export const Navbar = () => {
	const [collapsed, setCollapsed] = useState(true);
    

	return (
        
        
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
                <div className="demo-logo-vertical" style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <img src="src\assets\human-logo.webp" style={{ width: "50px", }} />
              </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="home" icon={<HomeOutlined />} >
                  <Link to="/home">
                    <span className="nav-text">Home</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="Users" icon={<UserOutlined />}>
                  <Link to="/users">
                    <span className="nav-text">Users</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="Tasks" icon={<TableOutlined />}>
                  <Link to="/tasks">
                    <span className="nav-text">Tasks</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="Warehouses" icon={ <ShopOutlined />}>
                  <Link to="/warehouses">
                    <span className="nav-text">Warehouses</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="Seting" icon={<SettingOutlined />}>
                  <Link to="/seting">
                    <span className="nav-text">seting</span>
                  </Link>
                </Menu.Item>

                <Menu.Item key="Logout" icon={ <LogoutOutlined />}>
                  <Link to="/logout">
                    <span className="nav-text">Logout</span>
                  </Link>
                </Menu.Item>
                </Menu>
            </Sider>
      
	);
};
