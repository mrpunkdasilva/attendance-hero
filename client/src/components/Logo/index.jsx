import React from 'react';
import logo from '../../assets/logos/main/AttendaceHero.svg';
import './styles.scss';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Attendance Hero" className="main-logo" />
      <p className="subtitle">Your attendance, your control.</p>
    </div>
  );
};

export default Logo;
