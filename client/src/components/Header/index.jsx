import React from 'react';
import { motion } from 'framer-motion';
import Logo from '../Logo/index.jsx';
import './styles.scss';

const Header = () => {
  return (
    <motion.header 
      className="home-header"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <Logo />
    </motion.header>
  );
};

export default Header;
