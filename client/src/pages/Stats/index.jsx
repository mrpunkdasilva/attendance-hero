import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { AlertTriangle, CheckCircle2, ShieldCheck, Activity, Zap, Download, BrainCircuit, Shield, X, Flame } from 'lucide-react';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SemesterTabs from '../../components/SemesterTabs';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import { semestersData } from '../../utils/mockData.js';
import { FEATURES } from '../../config/features.js';
import SwalFire from '../../utils/SwalFire';
import './styles.scss';

const TerminalTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="terminal-tooltip">
        <div className="terminal-header">
          <div className="dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">DATA_NODE_ANALYSIS</span>
        </div>
        <div className="terminal-body">
          <p className="label">{`> ENTITY: ${label || payload[0].name}`}</p>
          {payload.map((pld, index) => (
            <p key={index} className="value" style={{ color: pld.color || pld.fill }}>
              {`> ${pld.name.toUpperCase()}: ${pld.value}`}
            </p>
          ))}
          <p className="cursor">_</p>
        </div>
      </div>
    );
  }
  return null;
};

const Stats = () => {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProjectionVisible, setIsProjectionVisible] = useState(true);
  const [data, setData] = useState(semestersData);
  const [activeSemesterId, setActiveSemesterId] = useState(4);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser) return;
      try {
        const docRef = doc(db, "userAttendance", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().semesters);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/auth/login');
      SwalFire.success("Logout", "Você foi desconectado com sucesso!");
    } catch (error) {
      console.error(error);
      SwalFire.error("Erro", "Não foi possível desconectar.");
    }
  };

  const activeSemester = useMemo(() => 
    data.find(s => s.id === activeSemesterId) || data[0]
  , [data, activeSemesterId]);

  const kpis = useMemo(() => {
    let totalAbsences = 0;
    let totalLimit = 0;
    let alertCount = 0;
    let totalClasses = 0;

    activeSemester.disciplines.forEach(d => {
      const absences = d.absences.filter(Boolean).length;
      totalAbsences += absences;
      totalLimit += d.maxAbsences;
      totalClasses += d.totalClasses;
      const percentage = (absences / d.totalClasses) * 100;
      if (percentage >= 21) alertCount++;
    });

    const attendanceScore = totalClasses > 0 ? Math.max(0, 100 - (totalAbsences / totalLimit * 100)) : 100;
    return {
      totalAbsences,
      alertCount,
      safetyMargin: Math.max(0, totalLimit - totalAbsences),
      attendanceScore: Math.round(attendanceScore)
    };
  }, [activeSemester]);

  const heatmapData = useMemo(() => {
    const weekDays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];
    return weekDays.map((day, idx) => {
      const discipline = activeSemester.disciplines[idx] || null;
      const absences = discipline ? discipline.absences.filter(Boolean).length : 0;
      return {
        day,
        discipline: discipline ? discipline.name : 'VAGO',
        value: absences,
        intensity: absences > 0 ? Math.min(absences / 5, 1) : 0
      };
    });
  }, [activeSemester]);

  const riskProjection = useMemo(() => {
    const criticalDiscipline = [...activeSemester.disciplines]
      .map(d => ({
        name: d.name,
        remaining: d.maxAbsences - d.absences.filter(Boolean).length,
      }))
      .sort((a, b) => a.remaining - b.remaining)[0];

    if (!criticalDiscipline) return null;

    if (criticalDiscipline.remaining <= 0) {
      return {
        discipline: criticalDiscipline.name,
        message: `Limite de faltas atingido ou excedido. Risco de reprovação imediata.`,
        level: 'CRITICAL',
        icon: <AlertTriangle size={32} />
      };
    }

    const estimatedDays = Math.ceil(criticalDiscipline.remaining * 7);
    
    if (estimatedDays > 60) {
      return {
        discipline: 'Todas',
        message: 'Sistema operando em condições ideais. Nenhuma ameaça detectada no curto prazo.',
        level: 'SAFE',
        icon: <Shield size={32} />
      };
    }

    return {
      discipline: criticalDiscipline.name,
      message: `No ritmo atual, você atingirá o limite crítico de faltas em ${estimatedDays} dias.`,
      level: estimatedDays < 15 ? 'CRITICAL' : 'WARNING',
      icon: <BrainCircuit size={32} />
    };
  }, [activeSemester]);

  const badgeInfo = useMemo(() => {
    const score = kpis.attendanceScore;
    if (score > 90) return { label: 'CYBER SENTINEL', color: '#44D62C' };
    if (score >= 70) return { label: 'CORE RUNNER', color: '#FFEB3B' };
    return { label: 'SYSTEM OVERLOAD', color: '#FF5252' };
  }, [kpis.attendanceScore]);

  const evolutionData = useMemo(() => {
    return data.map(s => ({
      name: s.name,
      faltas: s.disciplines.reduce((acc, d) => acc + d.absences.filter(Boolean).length, 0)
    }));
  }, [data]);

  const dangerRanking = useMemo(() => {
    return [...activeSemester.disciplines]
      .map(d => ({
        name: d.name,
        remaining: d.maxAbsences - d.absences.filter(Boolean).length,
        percentage: (d.absences.filter(Boolean).length / d.maxAbsences) * 100
      }))
      .sort((a, b) => a.remaining - b.remaining)
      .slice(0, 3);
  }, [activeSemester]);

  const chartData = useMemo(() => {
    return activeSemester.disciplines.map(d => ({
      name: d.name,
      faltas: d.absences.filter(Boolean).length,
      limite: d.maxAbsences
    }));
  }, [activeSemester]);

  const pieData = useMemo(() => [
    { name: 'Faltas Realizadas', value: kpis.totalAbsences },
    { name: 'Margem de Segurança', value: kpis.safetyMargin }
  ], [kpis]);

  const COLORS = ['#44D62C', 'rgba(68, 214, 44, 0.1)'];

  const globalStats = useMemo(() => {
    const percentage = (kpis.totalAbsences / (kpis.totalAbsences + kpis.safetyMargin)) * 100;
    let color = '#44D62C';
    if (percentage >= 35) color = '#9C27B0';
    else if (percentage >= 29) color = '#FF5252';
    else if (percentage >= 21) color = '#FFB74D';
    else if (percentage >= 11) color = '#FFEB3B';
    else if (percentage >= 5) color = '#64FFDA';
    return { color };
  }, [kpis]);

  return (
    <div className="home-container">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="app-layout">
        <Sidebar onLogout={handleLogout} activeItem="stats" className={isSidebarOpen ? 'open' : ''} />
        <main className="main-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="stats-container">
            <div className="header-actions">
              <h1 className="stats-title">CENTRAL DE ANÁLISE</h1>
              {FEATURES.ENABLE_EXPORT_REPORT && (
                <button className="export-btn">
                  <Download size={18} />
                  Tactical Report
                </button>
              )}
            </div>
            
            <div className="semester-selector-wrapper">
              <SemesterTabs semesters={data} activeSemesterId={activeSemesterId} onSemesterChange={(id) => setActiveSemesterId(id)} color={globalStats.color} />
            </div>

            <AnimatePresence>
              {isProjectionVisible && riskProjection && (
                <motion.div 
                  key="risk-panel"
                  initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginBottom: '2rem' }}
                  exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                  className={`risk-projection-panel ${riskProjection.level.toLowerCase()}`}
                >
                  <div className="scanner-line"></div>
                  <button className="close-btn" onClick={() => setIsProjectionVisible(false)}>
                    <X size={18} />
                  </button>
                  <div className="icon-wrapper">
                    {riskProjection.icon}
                  </div>
                  <div className="projection-content">
                    <h3>{riskProjection.level === 'SAFE' ? 'STATUS DO SISTEMA' : 'PREVISÃO DE RISCO DE IA'}</h3>
                    <p>
                      {riskProjection.message}
                      {riskProjection.level !== 'SAFE' && <span> Disciplina: <strong>{riskProjection.discipline}</strong></span>}
                    </p>
                  </div>
                  <div className="status-tag">{riskProjection.level}</div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="kpi-grid">
              <div className="kpi-card">
                <Activity size={20} className="icon" />
                <div className="info">
                  <span className="label">Total de Faltas</span>
                  <strong className="value">{kpis.totalAbsences}</strong>
                </div>
              </div>
              <div className="kpi-card alert">
                <AlertTriangle size={20} className="icon" />
                <div className="info">
                  <span className="label">Disciplinas em Alerta</span>
                  <strong className="value">{kpis.alertCount}</strong>
                </div>
              </div>
              <div className="kpi-card safety">
                <ShieldCheck size={20} className="icon" />
                <div className="info">
                  <span className="label">Saldo de Segurança</span>
                  <strong className="value">{kpis.safetyMargin}</strong>
                </div>
              </div>
              <div className="kpi-card score" style={{ borderLeft: `4px solid ${badgeInfo.color}`, '--badge-color': badgeInfo.color }}>
                <Zap size={20} className="icon" style={{ color: badgeInfo.color }} />
                <div className="info">
                  <div className="badge" style={{ backgroundColor: `${badgeInfo.color}22`, color: badgeInfo.color }}>{badgeInfo.label}</div>
                  <span className="label">Score Hero</span>
                  <strong className="value">{kpis.attendanceScore}</strong>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              {FEATURES.ENABLE_WEEKLY_HEATMAP && (
                <div className="chart-card heatmap-card">
                  <div className="card-title-wrapper">
                    <Flame size={18} color="#44D62C" />
                    <h3>MAPA DE CALOR SEMANAL</h3>
                  </div>
                  <div className="heatmap-grid">
                    {heatmapData.map((item, index) => (
                      <div key={index} className="heatmap-cell-wrapper">
                        <div 
                          className="heatmap-cell" 
                          style={{ 
                            backgroundColor: `rgba(68, 214, 44, ${item.intensity === 0 ? 0.05 : 0.2 + (item.intensity * 0.8)})`,
                            borderColor: item.intensity > 0 ? '#44D62C' : 'rgba(255,255,255,0.05)'
                          }}
                        >
                          <span className="value">{item.value}</span>
                        </div>
                        <span className="day-label">{item.day}</span>
                        <span className="discipline-label">{item.discipline}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="chart-card">
                <h3>EVOLUÇÃO HISTÓRICA (FALTAS)</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolutionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip content={<TerminalTooltip />} />
                      <Line type="monotone" dataKey="faltas" stroke="#44D62C" strokeWidth={3} dot={{ fill: '#44D62C', r: 6 }} activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card">
                <h3>DISTRIBUIÇÃO GLOBAL</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={10} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<TerminalTooltip />} />
                      <Legend verticalAlign="bottom" height={36} formatter={(value) => <span style={{ color: '#888', fontSize: '12px', fontFamily: 'Lexend' }}>{value}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="chart-card danger-ranking">
                <h3>RANKING DE PERIGO (TOP 3)</h3>
                <div className="ranking-list">
                  {dangerRanking.map((item, index) => (
                    <div key={index} className="ranking-item">
                      <span className="discipline">{item.name}</span>
                      <div className="status">
                        <span className="remaining">{item.remaining} restantes</span>
                        <div className="progress-mini">
                          <div className="bar" style={{ width: `${Math.min(item.percentage, 100)}%`, background: item.remaining <= 2 ? '#FF5252' : '#FFB74D' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card full-width">
                <h3>FALTAS POR DISCIPLINA</h3>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: isMobile ? -20 : 40, right: isMobile ? 10 : 30, top: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
                      <XAxis type="number" stroke="#888" fontSize={12} tickLine={false} />
                      <YAxis dataKey="name" type="category" stroke="#eee" fontSize={isMobile ? 10 : 11} tickLine={false} width={isMobile ? 100 : 150} />
                      <Tooltip content={<TerminalTooltip />} cursor={{ fill: 'rgba(68, 214, 44, 0.05)' }} />
                      <Bar dataKey="faltas" fill="#44D62C" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
