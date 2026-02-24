import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { semestersData } from '../../utils/mockData.js';
import logo from '../../assets/logos/main/AttendaceHero.svg';
import SwalFire from '../../utils/SwalFire.js';
import './styles.scss';

const Home = () => {
  // Initialize state from localStorage or default mock data
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('attendance-hero-data');
    if (!savedData) return semestersData;
    
    const parsedSaved = JSON.parse(savedData);
    // Merge logic: ensure all semesters from mockData are present
    const mergedData = semestersData.map(mockSemester => {
      const savedSemester = parsedSaved.find(s => s.id === mockSemester.id);
      return savedSemester || mockSemester;
    });
    return mergedData;
  });
  
  const [activeSemesterId, setActiveSemesterId] = useState(4);

  // Persistence: Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('attendance-hero-data', JSON.stringify(data));
  }, [data]);

  const activeSemester = data.find(s => s.id === activeSemesterId);

  const getRiskLevel = (percentage) => {
    if (percentage >= 35) return 'wf';
    if (percentage >= 29) return 'high';
    if (percentage >= 21) return 'medium';
    if (percentage >= 4) return 'low';
    return 'none';
  };

  const toggleAbsence = (semesterId, disciplineName, absenceIndex) => {
    let alerted = false;
    const newData = data.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          disciplines: semester.disciplines.map(discipline => {
            if (discipline.name === disciplineName) {
              const newAbsences = [...discipline.absences];
              const wasAbsent = newAbsences[absenceIndex];
              newAbsences[absenceIndex] = !newAbsences[absenceIndex];
              
              // Check risk after change
              const currentAbsences = newAbsences.filter(Boolean).length;
              const percentage = (currentAbsences / discipline.totalClasses) * 100;
              const risk = getRiskLevel(percentage);

              if (!wasAbsent && (risk === 'high' || risk === 'wf') && !alerted) {
                const message = risk === 'wf' 
                  ? `Você atingiu o limite de 35% de faltas em ${disciplineName}. Risco de reprovação imediata!` 
                  : `Atenção! Você está com risco ALTO em ${disciplineName}. Faltas restantes: ${discipline.maxAbsences - currentAbsences}.`;
                SwalFire.error("Alerta de Frequência", message);
                alerted = true;
              }

              return { ...discipline, absences: newAbsences };
            }
            return discipline;
          })
        };
      }
      return semester;
    });
    setData(newData);
  };

  // Gamification Logic: Calculate Global Rank
  const globalStats = useMemo(() => {
    let totalClasses = 0;
    let totalAbsences = 0;
    
    activeSemester.disciplines.forEach(d => {
      totalClasses += d.totalClasses;
      totalAbsences += d.absences.filter(Boolean).length;
    });

    const percentage = totalClasses > 0 ? (totalAbsences / totalClasses) * 100 : 0;
    
    let rank = 'S';
    let color = '#44D62C';
    if (percentage >= 35) { rank = 'F'; color = '#9C27B0'; }
    else if (percentage >= 29) { rank = 'D'; color = '#FF5252'; }
    else if (percentage >= 21) { rank = 'C'; color = '#FFB74D'; }
    else if (percentage >= 11) { rank = 'B'; color = '#FFEB3B'; }
    else if (percentage >= 5) { rank = 'A'; color = '#64FFDA'; }

    return { rank, percentage: percentage.toFixed(1), color, totalAbsences, totalClasses };
  }, [activeSemester]);

  return (
    <div className="home-container">
      <motion.header 
        className="home-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <img src={logo} alt="Attendance Hero" className="main-logo" />
        <p className="subtitle">Your attendance, your control.</p>
      </motion.header>

      <div className="dashboard-grid">
        <Tilt 
          className="hero-card-tilt" 
          perspective={1000} 
          glareEnable={true} 
          glareMaxOpacity={0.45} 
          scale={1.05}
        >
          <div className="hero-card" style={{ '--rank-color': globalStats.color }}>
            <div className="card-header">
              <span className="card-label">STUDENT ID</span>
              <span className="card-semester">{activeSemester.name}</span>
            </div>
            <div className="rank-display">
              <span className="rank-label">CLASS RANK</span>
              <span className="rank-value" style={{ color: globalStats.color }}>{globalStats.rank}</span>
            </div>
            <div className="stats-row">
              <div className="stat">
                <span>ABSENCES</span>
                <strong>{globalStats.totalAbsences}</strong>
              </div>
              <div className="stat">
                <span>GLOBAL %</span>
                <strong>{globalStats.percentage}%</strong>
              </div>
            </div>
          </div>
        </Tilt>

        <nav className="semester-tabs">
          {data.map(semester => (
            <motion.button
              key={semester.id}
              whileHover={{ scale: 1.05, boxShadow: `0px 0px 8px ${globalStats.color}` }}
              whileTap={{ scale: 0.95 }}
              className={`tab-btn ${activeSemesterId === semester.id ? 'active' : ''}`}
              onClick={() => setActiveSemesterId(semester.id)}
            >
              {semester.name}
            </motion.button>
          ))}
        </nav>
      </div>

      <motion.main 
        className="attendance-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="table-wrapper glass-panel">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Disciplina</th>
                <th className="meta-col">Aulas</th>
                <th className="meta-col">Limite</th>
                {[...Array(10)].map((_, i) => (
                  <th key={i} className="absence-header">F{i + 1}</th>
                ))}
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode='wait'>
                {activeSemester.disciplines.map((discipline, idx) => {
                  const currentAbsences = discipline.absences.filter(Boolean).length;
                  const percentage = ((currentAbsences / discipline.totalClasses) * 100);
                  const risk = getRiskLevel(percentage);
                  const remaining = discipline.maxAbsences - currentAbsences;

                  return (
                    <motion.tr 
                      key={`${activeSemesterId}-${discipline.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`row-risk-${risk}`}
                    >
                      <td className="discipline-name">{discipline.name}</td>
                      <td className="meta-cell">{discipline.totalClasses}</td>
                      <td className="meta-cell">{discipline.maxAbsences}</td>
                      {[...Array(10)].map((_, i) => {
                        const isAvailable = i < discipline.maxAbsences;
                        const isAbsent = discipline.absences[i];
                        return (
                          <td 
                            key={i} 
                            className={`absence-cell ${isAbsent ? 'is-absent' : ''} ${!isAvailable ? 'is-locked' : ''}`}
                            onClick={() => isAvailable && toggleAbsence(activeSemesterId, discipline.name, i)}
                          >
                            <motion.div 
                              className="status-indicator"
                              whileHover={isAvailable ? { scale: 1.2 } : {}}
                              whileTap={isAvailable ? { scale: 0.8 } : {}}
                            >
                              {!isAvailable ? '—' : (isAbsent ? '●' : '○')}
                            </motion.div>
                          </td>
                        );
                      })}
                      <td className="total-cell">{currentAbsences}</td>
                      <td className={`status-cell risk-${risk}`}>
                        <div className="status-info">
                          {risk === 'wf' ? 'FAIL (WF)' : (remaining > 0 ? `${remaining} LEFT` : 'LIMIT!')}
                        </div>
                        <div className="progress-mini">
                          <motion.div 
                            className="progress-bar" 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((currentAbsences / discipline.maxAbsences) * 100, 100)}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                          ></motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.main>
    </div>
  );
};

export default Home;
