// HamburgerMenu.js
import React, { useState } from 'react';
import MenuItem from './menuItem';
import './hamburger.css'; // Import your CSS for styling

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            {isOpen && <MenuItem />}
        </div>
    );
};

export default HamburgerMenu;
