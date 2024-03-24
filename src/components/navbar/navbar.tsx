import "./navbar.scss";
import React, { useState } from 'react';

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

	return (
		<div id="navbar" className={isMenuOpen ? 'open' : ''}>
		<div className="hamburder-menu" onClick={toggleMenu}>
			<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
			<path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
			</svg>
		</div>
		<a href="#" className="navbar-logo">
			<img src="src\assets\human-logo.webp"></img>
		</a>
		<p className={`name ${isMenuOpen ? 'visible' : ''}`}>Damian Bernat</p>
		<p className={`name ${isMenuOpen ? 'visible' : ''}`}>Job srobssssssssxzs</p>
		<hr></hr>
		<a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-home-50.png"></img>
                <div className="navbar-item">Home</div>
            </a>
            <a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-admin-panel-50.png"></img>
                <div className="navbar-item">Admin Panel</div>
            </a>
            <a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-warehouse-50.png"></img>
                <div className="navbar-item">Warehouse</div>
            </a>
            <a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-task-50.png"></img>
                <div className="navbar-item">Task</div>
            </a>
            <a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-reports-50.png"></img>
                <div className="navbar-item">Reports</div>
            </a>
            <a href="#" className={`navbar-link ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-settings-50.png"></img>
                <div className="navbar-item">Settings</div>
            </a>
            <hr></hr>
            <a href="#" className={`navbar-link logout ${isMenuOpen ? 'visible' : ''}`}>
                <img src="src\assets\icons8-logout-50.png"></img>
                <div className="navbar-item">Logout</div>
            </a>
		</div>
	);
};
