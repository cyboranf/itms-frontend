import React from 'react';
import './settings-panel.scss';
import { FaUserCircle } from 'react-icons/fa';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'; 

const SettingsPanel = () => {
    const userInfo = {
        username: 'xd',
        email: 'xd@xd.com',
        firstName: 'Dupa',
        lastName: 'Dupa',
        phoneNumber: '123456789'
    };

    const tasks = [
        { id: 1, date: '2024-01-14', description: 'Prepare products for shipment' },
        { id: 2, date: '2024-01-10', description: 'Move products' },
        { id: 3, date: '2024-01-09', description: 'Unload transport' },
        { id: 4, date: '2024-01-01', description: 'Print T-shirts pattern' }
    ];

    return (
        <div className="main-container">
            <h2 className="main-title">Settings</h2>
            <div className="grid-container">
                <div className="section full-width">
                    <h3>Additional Information</h3>
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Task</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.date}</td>
                                    <td>{task.description}</td>
                                    <td className="actions-cell">
                                        <button className="icon-button confirm-button"><CheckOutlined /></button>
                                        <button className="icon-button reject-button"><CloseOutlined /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="section">
                    <h3>User Information</h3>
                    <div className="user-info">
                        <FaUserCircle className="user-icon" />
                        <div className="user-details">
                            <p><strong>Username:</strong> {userInfo.username}</p>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>First Name:</strong> {userInfo.firstName}</p>
                            <p><strong>Last Name:</strong> {userInfo.lastName}</p>
                            <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <h3>Edit User Information</h3>
                    <form className="form">
                        <input className="input" placeholder="Email" />
                        <input className="input" placeholder="Last Name" />
                        <input className="input" placeholder="First Name" />
                        <input className="input" placeholder="Phone Number" />
                        <input className="input" placeholder="Username" />
                        <button type="button" className="button">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
