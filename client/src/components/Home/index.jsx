import React, { useState } from 'react';
import { semestersData } from '../../utils/mockData.js';
import logo from '../../assets/logos/main/AttendaceHero.svg';
import './styles.scss';

const Home = () => {
  const [data, setData] = useState(semestersData);
  const [activeSemesterId, setActiveSemesterId] = useState(4);

  const activeSemester = data.find(s => s.id === activeSemesterId);

  const getRiskLevel = (percentage) => {
    if (percentage >= 35) return 'wf';
    if (percentage >= 29) return 'high';
    if (percentage >= 21) return 'medium';
    if (percentage >= 4) return 'low';
    return 'none';
  };

  const toggleAbsence = (semesterId, disciplineName, absenceIndex) => {
    const newData = data.map(semester => {
      if (semester.id === semesterId) {
        return {
          ...semester,
          disciplines: semester.disciplines.map(discipline => {
            if (discipline.name === disciplineName) {
              const newAbsences = [...discipline.absences];
              newAbsences[absenceIndex] = !newAbsences[absenceIndex];
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

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={logo} alt="Attendance Hero" className="main-logo" />
        <p className="subtitle">Gestão de Presença Acadêmica - Jala U</p>
      </header>

      <nav className="semester-tabs">
        {data.map(semester => (
          <button
            key={semester.id}
            className={`tab-btn ${activeSemesterId === semester.id ? 'active' : ''}`}
            onClick={() => setActiveSemesterId(semester.id)}
          >
            {semester.name}
          </button>
        ))}
      </nav>

      <main className="attendance-content">
        <div className="table-wrapper">
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
              {activeSemester.disciplines.map((discipline, idx) => {
                const currentAbsences = discipline.absences.filter(Boolean).length;
                const percentage = ((currentAbsences / discipline.totalClasses) * 100);
                const risk = getRiskLevel(percentage);
                const remaining = discipline.maxAbsences - currentAbsences;

                return (
                  <tr key={idx} className={`row-risk-${risk}`}>
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
                          <div className="status-indicator">
                            {!isAvailable ? '—' : (isAbsent ? '●' : '○')}
                          </div>
                        </td>
                      );
                    })}
                    <td className="total-cell">{currentAbsences}</td>
                    <td className={`status-cell risk-${risk}`}>
                      <div className="status-info">
                        {risk === 'wf' ? 'REPROVADO (WF)' : (remaining > 0 ? `${remaining} rest.` : 'LIMITE!')}
                      </div>
                      <div className="progress-mini">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${Math.min((currentAbsences / discipline.maxAbsences) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
