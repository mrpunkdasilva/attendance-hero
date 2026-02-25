import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, GraduationCap, Settings, LogOut } from 'lucide-react';
import './styles.scss';

const Sidebar = ({ onLogout, activeItem = 'dashboard' }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'academic', icon: <GraduationCap size={20} />, label: 'Academic' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button 
            key={item.id} 
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <button className="menu-item logout-item" onClick={onLogout}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </motion.aside>
  );
};

export default Sidebar;
