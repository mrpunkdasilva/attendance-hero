import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './styles.scss';

const SemesterTabs = ({ semesters, activeSemesterId, onSemesterChange, color }) => {
  const currentIndex = semesters.findIndex(s => s.id === activeSemesterId);
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSemesterChange(semesters[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < semesters.length - 1) {
      onSemesterChange(semesters[currentIndex + 1].id);
    }
  };

  const activeSemester = semesters[currentIndex];

  return (
    <div className="semester-selector">
      <button 
        className="nav-btn" 
        onClick={handlePrevious} 
        disabled={currentIndex === 0}
      >
        <ChevronLeft size={24} />
      </button>

      <motion.div 
        key={activeSemester.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="active-semester-display"
        style={{ borderColor: color, boxShadow: `0 0 15px ${color}44` }}
      >
        <span className="semester-name">{activeSemester.name}</span>
      </motion.div>

      <button 
        className="nav-btn" 
        onClick={handleNext} 
        disabled={currentIndex === semesters.length - 1}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default SemesterTabs;
