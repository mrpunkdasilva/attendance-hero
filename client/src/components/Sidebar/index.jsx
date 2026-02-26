import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Settings, LogOut, BarChart, ScrollText } from 'lucide-react';
import { FEATURES } from '../../config/features.js';
import './styles.scss';

const Sidebar = ({ onLogout, activeItem = 'dashboard', className = '' }) => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      enabled: true,
      path: '/'
    },
    { 
      id: 'stats', 
      icon: <BarChart size={20} />, 
      label: 'Stats', 
      enabled: FEATURES.ENABLE_STATS_PAGE,
      path: '/stats'
    },
    { 
      id: 'protocols', 
      icon: <ScrollText size={20} />, 
      label: 'Protocols', 
      enabled: FEATURES.ENABLE_PROTOCOLS_PAGE,
      path: '/protocols'
    },
    { 
      id: 'academic', 
      icon: <GraduationCap size={20} />, 
      label: 'Academic', 
      enabled: FEATURES.ENABLE_ACADEMIC_PAGE,
      path: '/academic'
    },
    { 
      id: 'settings', 
      icon: <Settings size={20} />, 
      label: 'Settings', 
      enabled: FEATURES.ENABLE_SETTINGS_PAGE,
      path: '/settings'
    },
  ].filter(item => item.enabled);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <button 
            key={item.id} 
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
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
    </aside>
  );
};

export default Sidebar;
