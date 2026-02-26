import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, Clock, Info, CheckCircle2, XCircle, FileText, Percent, Search, Calendar } from 'lucide-react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { semestersData } from '../../utils/mockData.js';
import SwalFire from '../../utils/SwalFire';
import './styles.scss';

const Protocols = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/auth/login');
      SwalFire.success("Logout", "Desconectado com sucesso!");
    } catch (error) {
      console.error(error);
      SwalFire.error("Erro", "Não foi possível desconectar.");
    }
  };

  const allCourses = useMemo(() => {
    return semestersData.flatMap(term => 
      term.disciplines.map(d => ({ ...d, termName: term.name }))
    );
  }, []);

  const filteredCourses = useMemo(() => {
    return allCourses.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.termName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allCourses]);

  return (
    <div className="home-container">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="app-layout">
        <Sidebar onLogout={handleLogout} activeItem="protocols" className={isSidebarOpen ? 'open' : ''} />
        <main className="main-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="protocols-container">
            <h1 className="protocols-title">PROTOCOLOS DE PRESENÇA</h1>

            <div className="official-alert">
              <Calendar size={18} />
              <span>Esta política entra em vigor a partir do Módulo 2, com início em <strong>3 de março</strong>.</span>
            </div>

            <section className="protocol-section">
              <div className="section-header">
                <Clock size={24} className="icon" />
                <h2>REGISTRO E PARTICIPAÇÃO</h2>
              </div>
              <div className="protocol-card">
                <p>Frequentar as aulas regularmente é essencial para o desenvolvimento de competências e aproveitamento do feedback docente.</p>
                <ul>
                  <li><strong>Registro Automático:</strong> Realizado em todas as aulas síncronas via Teams e Meetpoint.</li>
                  <li><strong>Duração e Requisito:</strong> Cada aula possui 120 minutos. Para ser considerado presente, é obrigatória a participação em pelo menos <strong>70% da sessão</strong>.</li>
                  <li><strong>Impacto na Nota:</strong> A pontualidade e a participação correspondem a <strong>5% da nota final</strong>, dentro do critério de profissionalismo e assiduidade.</li>
                </ul>
              </div>
            </section>

            <section className="protocol-section">
              <div className="section-header">
                <AlertCircle size={24} className="icon critical" />
                <h2>REGRAS CRÍTICAS DE BLOQUEIO</h2>
              </div>
              <div className="protocol-card critical">
                <div className="danger-zone">
                  <ul>
                    <li><strong>Nota WF:</strong> Atingir 35% ou mais de faltas em uma disciplina resulta no cancelamento da mesma com nota <strong>WF</strong>.</li>
                    <li><strong>Exclusão por Ausência:</strong> Não assistir a uma disciplina por 14 dias consecutivos implica a exclusão dessa disciplina.</li>
                    <li><strong>Desligamento (14 dias):</strong> Não assistir a nenhuma aula por 14 dias consecutivos, sem aviso prévio, pode resultar no desligamento da Universidade.</li>
                    <li><strong>Desligamento (Início):</strong> Não assistir a nenhuma aula nos primeiros 7 dias do semestre implica o desligamento da Universidade.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="protocol-section">
              <div className="section-header">
                <Percent size={24} className="icon" />
                <h2>CÁLCULO E SEMÁFORO DE RISCO</h2>
              </div>
              <div className="protocol-card">
                <p><strong>Fórmula:</strong> (Nº de aulas ausentes / Total de aulas da disciplina) × 100.</p>
                <div className="risk-grid">
                  <div className="risk-item low">
                    <div className="indicator"></div>
                    <div className="desc">
                      <strong>RISCO BAIXO (4% a 20%)</strong>
                      <span>Você está longe de reprovar por faltas.</span>
                    </div>
                  </div>
                  <div className="risk-item medium">
                    <div className="indicator"></div>
                    <div className="desc">
                      <strong>RISCO MÉDIO (21% a 28%)</strong>
                      <span>Você está próximo de atingir o limite máximo.</span>
                    </div>
                  </div>
                  <div className="risk-item high">
                    <div className="indicator"></div>
                    <div className="desc">
                      <strong>RISCO ALTO (29% a 34%)</strong>
                      <span>Muito próximo do limite. Risco iminente de WF.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="protocol-section">
              <div className="section-header">
                <FileText size={24} className="icon" />
                <h2>JUSTIFICATIVAS E PROCEDIMENTOS</h2>
              </div>
              <div className="protocol-grid">
                <div className="protocol-card valid">
                  <h3><CheckCircle2 size={18} /> CASOS EXCEPCIONAIS (VÁLIDOS)</h3>
                  <ul>
                    <li>Problemas graves de saúde ou hospitalização.</li>
                    <li>Interrupção comprovada de internet.</li>
                    <li>Falecimento de familiar direto.</li>
                    <li>Obrigações legais ou governamentais.</li>
                    <li>Emergências extremas ou atividades autorizadas.</li>
                    <li>Observância religiosa.</li>
                  </ul>
                </div>
                <div className="protocol-card invalid">
                  <h3><XCircle size={18} /> NÃO SÃO CONSIDERADOS</h3>
                  <ul>
                    <li>Doença leve (2 dias ou menos).</li>
                    <li>Compromissos pessoais ou consultas médicas.</li>
                    <li>Viagens ou conflitos trabalhistas.</li>
                  </ul>
                </div>
              </div>
              
              <div className="emergency-note">
                <Info size={20} />
                <div className="note-content">
                  <p><strong>Faltas de 2 a 5 dias:</strong> Envie o Formulário de Alteração e comprovantes ao Student Services em até <strong>5 dias após a falta</strong>.</p>
                  <p><strong>Faltas acima de 10 dias:</strong> Entre em contato imediato com o Student Services para orientações específicas.</p>
                </div>
              </div>
            </section>

            <section className="protocol-section">
              <div className="section-header">
                <Search size={24} className="icon" />
                <h2>CONSULTA DE LIMITES POR DISCIPLINA</h2>
              </div>
              <div className="protocol-card table-card">
                <div className="search-bar">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar disciplina ou semestre..." 
                    value={searchTerm}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Ciclo</th>
                        <th>Disciplina</th>
                        <th className="center">Total Aulas</th>
                        <th className="center">Limite (35%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCourses.map((course, idx) => (
                        <tr key={idx}>
                          <td>{course.termName}</td>
                          <td className="course-name">{course.name}</td>
                          <td className="center">{course.totalClasses}</td>
                          <td className="center highlight">{course.maxAbsences}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Protocols;
