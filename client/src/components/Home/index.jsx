import React , { useState , useMemo , useEffect } from "react";
import { motion , AnimatePresence }               from "framer-motion";
import Tilt                                       from "react-parallax-tilt";
import { AlertTriangle, CheckCircle2, ShieldCheck, Activity, Zap } from "lucide-react";
import { semestersData }                          from "../../utils/mockData.js";
import SwalFire                                   from "../../utils/SwalFire.js";
import { db }                                     from "../../services/firebase.js";
import { doc , getDoc , setDoc }                  from "firebase/firestore";
import { useAuth }                                from "../../contexts/AuthContext.jsx";
import { logoutUser }                             from "../../services/authService.js";
import { useNavigate }                            from "react-router-dom";
import Header                                     from "../Header/index.jsx";
import Sidebar                                    from "../Sidebar/index.jsx";
import SemesterTabs                               from "../SemesterTabs/index.jsx";
import "./styles.scss";

const Home = () => {
	const { currentUser } = useAuth();
	const [ data , setData ] = useState( semestersData );
	const [ activeSemesterId , setActiveSemesterId ] = useState( 4 );
	const [ isLoading , setIsLoading ] = useState( true );
	const [ isSidebarOpen , setIsSidebarOpen ] = useState( false );
	const navigate = useNavigate();

	useEffect( () => {
		const loadData = async () => {
			if ( ! currentUser ) {
				setIsLoading( false );
				return;
			}

			try {
				const docRef = doc( db , "userAttendance" , currentUser.uid );
				const docSnap = await getDoc( docRef );

				if ( docSnap.exists() ) {
					const savedData = docSnap.data().semesters;
					const mergedData = semestersData.map( mockSemester => {
						const savedSemester = savedData.find( s => s.id === mockSemester.id );
						return savedSemester ? { ... mockSemester , ... savedSemester } : mockSemester;
					} );
					setData( mergedData );
				}
				else {
					await saveToFirestore( semestersData , currentUser.uid );
				}
			}
			catch ( error ) {
				console.error( error );
			}
			finally {
				setIsLoading( false );
			}
		};

		loadData();
	} , [ currentUser ] );

	const saveToFirestore = async ( newData , uid ) => {
		if ( ! uid ) return;
		try {
			const docRef = doc( db , "userAttendance" , uid );
			await setDoc( docRef , { semesters : newData } , { merge : true } );
		}
		catch ( error ) {
			console.error( error );
		}
	};

	const handleLogout = async () => {
		try {
			await logoutUser();
			navigate( "/auth/login" );
			SwalFire.success( "Logout" , "Você foi desconectado com sucesso!" );
		}
		catch ( error ) {
			console.error( error );
			SwalFire.error( "Erro" , "Não foi possível desconectar." );
		}
	};

	const activeSemester = data.find( s => s.id === activeSemesterId );

	const getRiskLevel = ( percentage ) => {
		if ( percentage >= 35 ) return "wf";
		if ( percentage >= 29 ) return "high";
		if ( percentage >= 21 ) return "medium";
		if ( percentage >= 4 ) return "low";
		return "none";
	};

	const toggleAbsence = async ( semesterId , disciplineName , absenceIndex ) => {
		if ( ! currentUser ) {
			SwalFire.error( "Erro" , "Você precisa estar logado para registrar faltas." );
			return;
		}

		let alerted = false;
		const newData = data.map( semester => {
			if ( semester.id === semesterId ) {
				return {
					... semester ,
					disciplines : semester.disciplines.map( discipline => {
						if ( discipline.name === disciplineName ) {
							const newAbsences = [ ... discipline.absences ];
							const wasAbsent = newAbsences[ absenceIndex ];
							newAbsences[ absenceIndex ] = ! newAbsences[ absenceIndex ];

							const currentAbsences = newAbsences.filter( Boolean ).length;
							const percentage = (
																	 currentAbsences / discipline.totalClasses
																 ) * 100;
							const risk = getRiskLevel( percentage );

							if ( ! wasAbsent && (
								risk === "high" || risk === "wf"
							) && ! alerted ) {
								const message = risk === "wf"
																? `Você atingiu o limite de 35% de faltas em ${ disciplineName }. Risco de reprovação imediata!`
																: `Atenção! Você está com risco ALTO em ${ disciplineName }. Faltas restantes: ${ discipline.maxAbsences - currentAbsences }.`;
								SwalFire.error( "Alerta de Frequência" , message );
								alerted = true;
							}

							return { ... discipline , absences : newAbsences };
						}
						return discipline;
					} )
				};
			}
			return semester;
		} );

		setData( newData );
		await saveToFirestore( newData , currentUser.uid );
	};

	const globalStats = useMemo( () => {
		if ( ! activeSemester ) return {
			rank : "-" ,
			percentage : "0" ,
			color : "#fff" ,
			totalAbsences : 0 ,
			totalClasses : 0,
			alertCount: 0,
			safetyMargin: 0,
			attendanceScore: 0
		};

		let totalClasses = 0;
		let totalAbsences = 0;
		let totalLimit = 0;
		let alertCount = 0;

		activeSemester.disciplines.forEach( d => {
			const absences = d.absences.filter( Boolean ).length;
			totalClasses += d.totalClasses;
			totalAbsences += absences;
			totalLimit += d.maxAbsences;
			const percentage = (absences / d.totalClasses) * 100;
			if (percentage >= 21) alertCount++;
		} );

		const percentage = totalClasses > 0 ? (totalAbsences / totalClasses) * 100 : 0;
		const attendanceScore = totalLimit > 0 ? Math.max(0, 100 - (totalAbsences / totalLimit * 100)) : 100;

		let rank = "S";
		let color = "#44D62C";
		if ( percentage >= 35 ) {
			rank = "F";
			color = "#9C27B0";
		}
		else if ( percentage >= 29 ) {
			rank = "D";
			color = "#FF5252";
		}
		else if ( percentage >= 21 ) {
			rank = "C";
			color = "#FFB74D";
		}
		else if ( percentage >= 11 ) {
			rank = "B";
			color = "#FFEB3B";
		}
		else if ( percentage >= 5 ) {
			rank = "A";
			color = "#64FFDA";
		}

		return { 
			rank , 
			percentage : percentage.toFixed( 1 ) , 
			color , 
			totalAbsences , 
			totalClasses,
			alertCount,
			safetyMargin: Math.max(0, totalLimit - totalAbsences),
			attendanceScore: Math.round(attendanceScore)
		};
	} , [ activeSemester ] );

	const badgeInfo = useMemo(() => {
		const score = globalStats.attendanceScore;
		if (score > 90) return { label: 'CYBER SENTINEL', color: '#44D62C' };
		if (score >= 70) return { label: 'CORE RUNNER', color: '#FFEB3B' };
		return { label: 'SYSTEM OVERLOAD', color: '#FF5252' };
	}, [globalStats.attendanceScore]);

	if ( isLoading ) {
		return (
			<div className="loading-screen">
				<motion.div
					animate={ { rotate : 360 } }
					transition={ { repeat : Infinity , duration : 1 , ease : "linear" } }
					className="loader"
				/>
			</div>
		);
	}

	return (
		<div className="home-container">
			<Header
				isSidebarOpen={ isSidebarOpen }
				toggleSidebar={ () => setIsSidebarOpen( ! isSidebarOpen ) }
			/>

			<div className="app-layout">
				<Sidebar
					onLogout={ handleLogout }
					className={ isSidebarOpen ? "open" : "" }
				/>

				<main className="main-content">
					<div className="dashboard-grid">
						<Tilt
							className="hero-card-tilt"
							perspective={ 1000 }
							glareEnable={ true }
							glareMaxOpacity={ 0.45 }
							scale={ 1.05 }
						>
							<div className="hero-card" style={ { "--rank-color" : globalStats.color } }>
								<div className="card-header">
									<span className="card-label">STUDENT ID</span>
									<span className="card-semester">{ activeSemester.name }</span>
								</div>
								<div className="rank-display">
									<span className="rank-label">CLASS RANK</span>
									<span className="rank-value" style={ { color : globalStats.color } }>{ globalStats.rank }</span>
								</div>
								<div className="stats-row">
									<div className="stat">
										<span>ABSENCES</span>
										<strong>{ globalStats.totalAbsences }</strong>
									</div>
									<div className="stat">
										<span>GLOBAL %</span>
										<strong>{ globalStats.percentage }%</strong>
									</div>
								</div>
							</div>
						</Tilt>

						<SemesterTabs
							semesters={ data }
							activeSemesterId={ activeSemesterId }
							onSemesterChange={ setActiveSemesterId }
							color={ globalStats.color }
						/>
					</div>

					<div className="kpi-grid">
						<div className="kpi-card">
							<Activity size={20} className="icon" />
							<div className="info">
								<span className="label">Total de Faltas</span>
								<strong className="value">{globalStats.totalAbsences}</strong>
							</div>
						</div>
						<div className="kpi-card alert">
							<AlertTriangle size={20} className="icon" />
							<div className="info">
								<span className="label">Disciplinas em Alerta</span>
								<strong className="value">{globalStats.alertCount}</strong>
							</div>
						</div>
						<div className="kpi-card safety">
							<ShieldCheck size={20} className="icon" />
							<div className="info">
								<span className="label">Saldo de Segurança</span>
								<strong className="value">{globalStats.safetyMargin}</strong>
							</div>
						</div>
						<div className="kpi-card score" style={{ borderLeft: `4px solid ${badgeInfo.color}`, '--badge-color': badgeInfo.color }}>
							<Zap size={20} className="icon" style={{ color: badgeInfo.color }} />
							<div className="info">
								<div className="badge" style={{ backgroundColor: `${badgeInfo.color}22`, color: badgeInfo.color }}>{badgeInfo.label}</div>
								<span className="label">Score Hero</span>
								<strong className="value">{globalStats.attendanceScore}</strong>
							</div>
						</div>
					</div>

					<motion.section
						className="attendance-content"
						initial={ { opacity : 0 , y : 20 } }
						animate={ { opacity : 1 , y : 0 } }
						transition={ { delay : 0.2 , duration : 0.5 } }
					>
						<div className="table-wrapper glass-panel">
							<table className="attendance-table">
								<thead>
								<tr>
									<th>Disciplina</th>
									<th className="meta-col">Aulas</th>
									<th className="meta-col">Limite</th>
									{ [ ... Array( 10 ) ].map( ( _ , i ) => (
										<th key={ i } className="absence-header">F{ i + 1 }</th>
									) ) }
									<th>Total</th>
									<th>Status</th>
								</tr>
								</thead>
								<tbody>
								<AnimatePresence mode="popLayout">
									{ activeSemester.disciplines.map( ( discipline , idx ) => {
										const currentAbsences = discipline.absences.filter( Boolean ).length;
										const percentage = (
											(
												currentAbsences / discipline.totalClasses
											) * 100
										);
										const risk = getRiskLevel( percentage );
										const remaining = discipline.maxAbsences - currentAbsences;

										return (
											<motion.tr
												key={ `${ activeSemesterId }-${ discipline.name }` }
												initial={ { opacity : 0 , x : - 20 } }
												animate={ { opacity : 1 , x : 0 } }
												transition={ { delay : idx * 0.05 } }
												className={ `row-risk-${ risk }` }
											>
												<td className="discipline-name">{ discipline.name }</td>
												<td className="meta-cell">{ discipline.totalClasses }</td>
												<td className="meta-cell">{ discipline.maxAbsences }</td>
												{ [ ... Array( 10 ) ].map( ( _ , i ) => {
													const isAvailable = i < discipline.maxAbsences;
													const isAbsent = discipline.absences[ i ];
													return (
														<td
															key={ i }
															className={ `absence-cell ${ isAbsent ? "is-absent" : "" } ${ ! isAvailable ? "is-locked" : "" }` }
															onClick={ () => isAvailable && toggleAbsence( activeSemesterId , discipline.name , i ) }
														>
															<motion.div
																className="status-indicator"
																whileHover={ isAvailable ? { scale : 1.2 } : {} }
																whileTap={ isAvailable ? { scale : 0.8 } : {} }
															>
																{ ! isAvailable ? "—" : (
																	isAbsent ? "●" : "○"
																) }
															</motion.div>
														</td>
													);
												} ) }
												<td className="total-cell">{ currentAbsences }</td>
												<td className={ `status-cell risk-${ risk }` }>
													<div className="status-info">
														{ risk === "wf" ? "FAIL (WF)" : (
															remaining > 0 ? `${ remaining } LEFT` : "LIMIT!"
														) }
													</div>
													<div className="progress-mini">
														<motion.div
															className="progress-bar"
															initial={ { width : 0 } }
															animate={ {
																width : `${ Math.min( (
																												currentAbsences / discipline.maxAbsences
																											) * 100 , 100 ) }%`
															} }
															transition={ { type : "spring" , stiffness : 50 } }
														></motion.div>
													</div>
												</td>
											</motion.tr>
										);
									} ) }
								</AnimatePresence>
								</tbody>
							</table>
						</div>
					</motion.section>
				</main>
			</div>
		</div>
	);
};

export default Home;
