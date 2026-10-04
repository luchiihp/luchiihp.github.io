import React, { useState, useEffect, useRef } from 'react';
import batmanLogo from './assets/batman.png'

const CITIES = {
  'Madrid': {
    villain: 'Harley Quinn',
    hideout: 'Fnac Callao',
    m2Answers: ['psicóloga', 'joker', 'rosa', 'azul', 'béisbol'],
  },
  'Barcelona': {
    villain: 'Enigma',
    hideout: 'Fnac Triangle',
    m2Answers: ['edward', 'acertijos', 'verde', 'interrogación', 'superioridad'],
  },
  'Bilbao': {
    villain: 'El Pingüino',
    hideout: 'Fnac Bilbao',
    m2Answers: ['oswald', 'iceberg', 'paraguas', 'aves', 'crimen'],
  },
  'Sevilla': {
    villain: 'El Espantapájaros',
    hideout: 'Fnac Torre Sevilla',
    m2Answers: ['jonathan', 'miedo', 'máscara', 'gas', 'experimentos'],
  }
};

const BADGES = [
  { id: 1, name: 'Red Blindada', icon: 'shield', secret: false },
  { id: 2, name: 'Expediente Restaurado', icon: 'folder', secret: false },
  { id: 3, name: 'Sin Escapatoria', icon: 'camera', secret: false },
  { id: 4, name: 'Caza Rastros', icon: 'search', secret: false },
  { id: 5, name: 'Todos Somos Batman', icon: 'batman', secret: false },
  { id: 6, name: 'Respuesta Inmediata', icon: 'clock', secret: true },
  { id: 7, name: 'Relámpago', icon: 'zap', secret: true },
  { id: 8, name: 'Ojo de Halcón', icon: 'eye', secret: true },
  { id: 9, name: 'Archivo Perfecto', icon: 'fileCheck', secret: true },
  { id: 10, name: 'Vigilante Nocturno', icon: 'moon', secret: true },
  { id: 11, name: 'Super Bat-Vigilante', icon: 'star', special: true },
  { id: 12, name: 'Ciudad Vigilante', icon: 'city', special: true },
];

const Icon = ({ name, className }) => {
  if (name === 'batman') {
    return <img src={batmanLogo} alt="Batman" className={`${className} object-contain`} />;
  }
  const icons = {
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    camera: (
      <g>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </g>
    ),
    search: (
      <g>
        <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </g>
    ),
    check: <polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    lock: (
      <g>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" strokeWidth="2"/>
      </g>
    ),
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    x: <path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    edit: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    board: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    user: (
      <g>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
    ),
    clock: <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    eye: <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    fileCheck: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    city: <path d="M3 21h18M5 21V7l8-4v18M13 21v-8l6-3v11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
    batman: (
      <g>
        <path d="M23.6 11.2c-.2-.1-1.3-.6-3.2-1.3-.2-.1-.5-.2-.7-.3l-1.3-.5c-1.3-.5-1.9-.7-2.1-.8-.4-.2-1.1-.4-1.6-.4-.3 0-.6 0-.8.1-.1 0-.3.1-.3.1l-.1-.1c-.1-.1-.3-.4-.5-1-.2-.7-.5-1.4-.8-2.3-.2-.5-.5-1.1-.6-1.3 0-.1-.1-.2-.1-.3v-.1l-.1.1c-.1.2-.4.6-1.1 1.6-.3.4-.6.8-.9 1.1l-.7.8c-.3.4-.6.6-.7.7l-.4.3c-.2.2-.4.3-.5.3h-.1s-.1-.1-.2-.4c-.1-.2-.2-.5-.2-.8v-.6l-.1-1.2c0-.4 0-.8 0-1-.1-.2-.2-.3-.3-.3-.1 0-.2.1-.3.3 0 .1-.1.5-.1 1l-.1 1.2v.6c0 .3-.1.6-.2.8 0 .2-.1.4-.2.4h-.1c-.1 0-.3-.1-.5-.3l-.4-.3c-.2-.1-.4-.3-.7-.7l-.7-.8c-.3-.3-.6-.7-.9-1.1-.7-1-1-1.4-1.1-1.6l-.1-.1v.1c0 .1-.1.2-.1.3-.1.2-.4.8-.6 1.3-.3.9-.6 1.6-.8 2.3-.2.6-.4.9-.5 1l-.1.1s-.2-.1-.3-.1c-.2-.1-.5-.1-.8-.1-.5 0-1.2.2-1.6.4-.2.1-.8.3-2.1.8l-1.3.5c-.2.1-.5.2-.7.3-1.9.7-3 1.2-3.2 1.3-.3.1-.4.3-.4.5v.1c.1.3.4.6.8.8l2.2 1c.5.2 1.1.4 1.8.6.6.2 1 .3 1.1.3l.2.1c.1.1.1.2 0 .4l-.3.8c-.2.4-.4.8-.5 1.1l-.3.6c-.1.2-.2.3-.3.4l-.5.2-.6.1c-.6.1-1.6.2-2.5.2-.4 0-.9 0-1.1-.1l-.3-.1c-.1 0-.2.1-.2.2v.1c.1.3.5.7 1.1 1.1.3.2.7.4 1.2.6.4.2.8.3 1.1.4l.7.1h1.3l.9-.1c.4-.1.8-.1 1.1-.2.2-.1.3-.1.4-.1l.2-.2c.1-.1.2-.3.4-.7l.3-.6c.1-.3.3-.6.4-.8.1-.2.1-.3.2-.3s.1 0 .2.1c.1.2.4.6.8 1.1.3.4.6.8.9 1.1l.6.6c.3.3.5.5.7.5s.4-.2.7-.5l.6-.6c.3-.3.6-.7.9-1.1.4-.5.7-.9.8-1.1.1-.1.2-.1.2-.1s.1.1.2.3c.1.2.3.5.4.8l.3.6c.2.4.3.6.4.7l.2.2c.1 0 .2.1.4.1.3.1.7.1 1.1.2l.9.1h1.3l.7-.1c.3-.1.7-.2 1.1-.4.5-.2.9-.4 1.2-.6.6-.4 1-.8 1.1-1.1v-.1c0-.1-.1-.2-.2-.2l-.3.1c-.2.1-.7.1-1.1.1-.9 0-1.9-.1-2.5-.2l-.6-.1-.5-.2c-.1-.1-.2-.2-.3-.4l-.3-.6c-.1-.3-.3-.7-.5-1.1l-.3-.8c-.1-.2 0-.3 0-.4l.2-.1c.1 0 .5-.1 1.1-.3.7-.2 1.3-.4 1.8-.6l2.2-1c.4-.2.7-.5.8-.8v-.1c0-.2-.1-.4-.4-.5z" fill="currentColor" />
        <path d="M12.4 8.7c-.1.3-.2.6-.4.6s-.3-.3-.4-.6c-.2-.7-.4-1.3-.5-2.2-.1-.5-.2-1.1-.3-1.6 0-.3.1-.4.2-.4.2 0 .4.2.5.5.1.4.2.8.3 1.2l.1.4.1-.3c.1-.4.3-.8.4-1.3.1-.3.3-.5.4-.5.2 0 .3.2.4.5.1.5.3 1 .4 1.3l.1.3.1-.4c.1-.4.2-.8.3-1.2.1-.3.3-.5.5-.5.1 0 .2.1.2.4-.1.5-.2 1.1-.3 1.6-.1.9-.3 1.5-.5 2.2z" fill="none" stroke="#242424" strokeWidth="0.5"/>
      </g>
    ),
  };
  return <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">{icons[name]}</svg>;
};

const MessageBox = ({ title, message, onClose, type = 'info' }) => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div className={`w-full max-w-sm rounded-lg p-6 border-2 shadow-2xl ${type === 'error' ? 'border-red-500 bg-red-900/20' : 'border-[#FEE202] bg-[#242424]'}`}>
      <h3 className={`text-xl font-bold mb-2 ${type === 'error' ? 'text-red-500' : 'text-[#FEE202]'}`}>{title}</h3>
      <p className="text-gray-200 mb-6 font-mono text-sm leading-relaxed">{message}</p>
      <button onClick={onClose} className="w-full py-3 font-bold uppercase tracking-wider bg-[#FEE202] text-[#242424] hover:bg-yellow-400 rounded transition-colors">
        Entendido
      </button>
    </div>
  </div>
);

const STORAGE_KEY = 'bat-vigilantes-save';

const loadSave = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default function BatmanApp() {
  const [saved] = useState(loadSave);

  const [view, setView] = useState(() =>
    saved?.user ? ((saved.progress ?? 0) >= 1 ? 'dashboard' : 'm1') : 'register'
  );
  const [user, setUser] = useState(saved?.user ?? null);
  const [progress, setProgress] = useState(saved?.progress ?? 0);
  const [score, setScore] = useState(saved?.score ?? 0);
  const [scoreLog, setScoreLog] = useState(saved?.scoreLog ?? []);
  const [scoreModal, setScoreModal] = useState(null);
  const [msg, setMsg] = useState(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [tempAlias, setTempAlias] = useState('');

  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, progress, score, scoreLog }));
    } catch {}
  }, [user, progress, score, scoreLog]);

  const baseCityScores = {
    'Madrid': 125430,
    'Barcelona': 118900,
    'Bilbao': 115200,
    'Sevilla': 112100
  };

  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Rubik:wght@400;600;800&display=swap');
    
    body { margin: 0; padding: 0; overflow: hidden; background-color: #1a1a1a; }
    .font-sans { font-family: 'Rubik', sans-serif; }
    .font-terminal { font-family: 'Anonymous Pro', monospace; }
    
    .bg-scanlines { 
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                  linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); 
      background-size: 100% 2px, 3px 100%; 
    }
    
    .clip-hexagon { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
    .clip-octagon { clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
    
    @keyframes fillUp {
      0% { clip-path: inset(100% 0 0 0); }
      100% { clip-path: inset(0 0 0 0); }
    }
    
    .fill-up-animation {
      animation: fillUp 3.5s ease-in-out forwards;
    }
  `;

  useEffect(() => {
    // Tras registrarse, la pantalla de carga se muestra por 3.5s y salta a la Misión 1.
    if (view === 'loading') {
      const timer = setTimeout(() => {
        if (progress === 0) setView('m1');
        else setView('dashboard');
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [view, progress]);

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if(!data.name || !data.city) {
      setMsg({ title: 'Acceso Denegado', message: 'Faltan datos de registro.', type: 'error' });
      return;
    }
    
    // Se guarda el usuario sin alias (se le pedirá a Oráculo tras el hackeo)
    setUser({ ...data });
    setView('loading');
  };

  const completeMission = (missionIndex, points) => {
    if (progress >= missionIndex) return; // Ya completada
    
    setScore(s => s + points);
    setProgress(p => Math.max(p, missionIndex));
    setScoreLog(log => [...log, { 
      mission: missionIndex, 
      title: ['Alerta en la red', 'Informes Incompletos', 'Sin Escapatoria', 'Caza Rastros', 'La Guarida'][missionIndex-1],
      points: points, 
      badge: BADGES[missionIndex-1] 
    }]);
    setMsg({ 
      title: 'Misión Completada', 
      message: `Has obtenido la insignia: ${BADGES[missionIndex-1].name}. Puntuación actual: ${score + points} pts.` 
    });
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full bg-[#1C1B20] relative overflow-hidden">
      <div className="relative w-64 h-48 mb-8">
        {/* Murciélago fondo oscuro */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-2xl">
            <path fill="#2c3545" d="M50 25 L47 25 L44 10 L41 25 L10 15 C10 15 0 35 5 50 C5 50 20 40 30 50 C40 60 45 75 50 80 C55 75 60 60 70 50 C80 40 95 50 95 50 C100 35 90 15 90 15 L59 25 L56 10 L53 25 Z" />
          </svg>
        </div>
        {/* Murciélago amarillo que se llena de abajo arriba */}
        <div className="absolute inset-0 fill-up-animation">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            <path fill="#FEE202" d="M50 25 L47 25 L44 10 L41 25 L10 15 C10 15 0 35 5 50 C5 50 20 40 30 50 C40 60 45 75 50 80 C55 75 60 60 70 50 C80 40 95 50 95 50 C100 35 90 15 90 15 L59 25 L56 10 L53 25 Z" />
          </svg>
        </div>
      </div>
      <p className="mt-8 text-[#FEE202] font-mono text-sm uppercase tracking-widest text-center">Conectando con el servidor<br/>central de Oráculo...</p>
    </div>
  );

  const Mission1 = () => {
    // Si ya completó esto y está visitándolo desde el menú, isCompleted será true
    const isCompleted = progress >= 1; 
    const [timeLeft, setTimeLeft] = useState(isCompleted ? 0 : 300);
    const [inputVal, setInputVal] = useState(isCompleted ? 'BATMAN CAERA' : '');
    const [localSolved, setLocalSolved] = useState(isCompleted);
    const [localAlias, setLocalAlias] = useState('');

    useEffect(() => {
      if (localSolved) return;
      const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
      return () => clearInterval(timer);
    }, [localSolved]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const cleaned = inputVal.toUpperCase().trim().replace(/\s+/g, ' ');
      if (cleaned === 'BATMAN CAERA' || cleaned === 'BATMAN CAERÁ') {
        if (!isCompleted) {
            setLocalSolved(true);
        }
      } else {
        setMsg({ title: 'Error', message: 'Clave incorrecta. El cifrado continúa.', type: 'error'});
        setInputVal('');
      }
    };

    const handleAliasSubmit = (e) => {
      e.preventDefault();
      if (localAlias.trim()) {
        setUser(prev => ({ ...prev, alias: localAlias.trim().toUpperCase() }));
        completeMission(1, 100 + timeLeft);
        setView('dashboard');
      }
    };

    return (
      <div className="flex flex-col h-full bg-[#1C1B20] text-[#36D837] font-terminal p-4 bg-scanlines relative overflow-y-auto">
        <div className="border-b border-[#36D837]/50 pb-2 mb-4 mt-4">
          <h2 className="uppercase font-bold text-xl leading-tight">ALERTA DE SEGURIDAD:<br/>SERVIDOR COMPROMETIDO</h2>
        </div>
        
        <div className="mb-4 text-sm space-y-6">
          <div>
             <p>{localSolved ? 'Error en el cifrado de datos maliciosos.' : 'Cifrado de datos maliciosos en curso...'}</p>
             <div className="w-full bg-[#004D1E] h-4 mt-1 border border-[#36D837]">
               <div className="h-full bg-[#36D837]" style={{width: localSolved ? '100%' : '93%'}}></div>
             </div>
             <p className="mt-1">{localSolved ? '100%' : '93%'} completado</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon name="clock" className="w-5 h-5" />
            <span className="text-xl font-bold">
              {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>

          <div className="border border-[#36D837] p-4 relative">
            <h3 className="absolute -top-3 left-4 bg-[#1C1B20] px-2 font-bold text-xs">ORÁCULO</h3>
            {localSolved ? (
               <div className="space-y-4">
                 <p>* Buen trabajo. Has contenido el ataque y hemos blindado tu conexión.</p>
                 {!isCompleted && (
                   <>
                     <p>Has superado tu primera misión. A partir de ahora, formas parte de la red de Bat-Vigilantes.</p>
                   <p>Necesito identificarte en el sistema.<br/>¿Cuál es tu alias?</p>
                   <form onSubmit={handleAliasSubmit} className="mt-4">
                      <input 
                        type="text" 
                        autoFocus
                        required
                        value={localAlias}
                        onChange={(e) => setLocalAlias(e.target.value)}
                        className="w-full bg-[#004D1E] border-2 border-[#36D837] text-white p-3 focus:outline-none uppercase font-bold text-center"
                        placeholder="Tu alias"
                      />
                   </form>
                 </>
               )}
             </div>
            ) : (
               <p>"El caos comienza y... <br/><br/> A=1, B=2, C=3... Código corrupto: <br/><br/> <span className="text-white bg-[#36D837]/20 p-1">2 - 1 - 20 - 13 - 1 - 14</span> <br/> <span className="text-white bg-[#36D837]/20 p-1">3 - 1 - 5 - 18 - 1</span>"</p>
            )}
          </div>
        </div>

        {!localSolved && (
          <form onSubmit={handleSubmit} className="mt-auto pb-6">
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                autoFocus
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="w-full bg-[#004D1E] border-2 border-[#36D837] text-white p-3 focus:outline-none uppercase font-terminal text-center font-bold text-lg tracking-widest"
                placeholder="Introduce la clave"
              />
              <button type="submit" className="hidden">Submit</button> 
            </div>
          </form>
        )}
      </div>
    );
  };

  const renderRegister = () => (
    <div className="flex flex-col h-full bg-[#242424] text-white p-6 overflow-y-auto pb-10">
      <div className="text-center mb-8 mt-4">
        {/* Imagen proporcionada por el usuario */}
        <img src={batmanLogo} alt="Bat-Vigilantes Logo" className="w-full max-w-[280px] mx-auto drop-shadow-2xl" />
      </div>
      
      <form onSubmit={handleRegister} className="space-y-4 max-w-sm mx-auto w-full font-sans">
        <div className="space-y-1">
          <input name="name" type="text" placeholder="Nombre" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        </div>
        <div className="space-y-1">
          <input name="surname" type="text" placeholder="Primer apellido" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-gray-400 ml-1">Fecha de nacimiento</label>
          <input name="dob" type="date" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202] text-sm" />
        </div>
        <div className="space-y-1">
          <input name="email" type="email" placeholder="Email" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        </div>
        <div className="space-y-1">
          <input name="password" type="password" placeholder="Contraseña" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        </div>
        <div className="space-y-1 relative">
          <select name="city" required className="w-full bg-[#242424] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202] appearance-none">
            <option value="" disabled hidden>Ciudad seleccionada</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Bilbao">Bilbao</option>
            <option value="Sevilla">Sevilla</option>
          </select>
          <Icon name="check" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#FEE202] pointer-events-none" />
        </div>
        
        <button type="submit" className="w-full bg-[#FEE202] text-[#242424] font-bold uppercase tracking-wider py-4 rounded shadow-[0_4px_0_#b39d00] hover:translate-y-1 hover:shadow-none transition-all mt-4">
          Registrarse
        </button>
        
        <p className="text-center text-xs text-gray-400 mt-4 cursor-pointer hover:text-[#FEE202]">
          ¿Ya eres un Bat-Vigilante? Iniciar sesión
        </p>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-[#272E3C] relative pb-20">
      <div className="bg-[#FEE202] py-2 px-4 text-center text-black font-bold flex justify-between items-center mx-2 mt-2 shadow-lg">
         <span className="text-xl w-full text-center tracking-widest">{progress + 5} DE 12 DESBLOQUEADAS</span>
      </div>
      <div className="text-center text-xs text-[#FEE202] mt-1 mb-4 font-bold">Continúa para desbloquear todas las insignias</div>
      
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        <div className="grid gap-4 mt-2">
          {[
            { id: 1, title: 'Alerta en la red', desc: 'Restablece los servidores de Oráculo.', view: 'm1' },
            { id: 2, title: 'Informes Incompletos', desc: 'Restaura el perfil del fugitivo.', view: 'm2' },
            { id: 3, title: 'Sin Escapatoria', desc: 'Analiza las cámaras de seguridad.', view: 'm3' },
            { id: 4, title: 'Caza Rastros', desc: 'Localiza anomalías en la zona.', view: 'm4' },
          ].map((mission, idx) => {
            const isUnlocked = progress >= idx;
            const isCompleted = progress > idx;
            return (
              <button 
                key={mission.id}
                onClick={() => isUnlocked && setView(mission.view)}
                className={`relative overflow-hidden text-left p-4 rounded-lg border transition-all 
                  ${isCompleted ? 'border-[#36D837] bg-[#242424]' : isUnlocked ? 'border-[#FEE202] bg-[#242424] hover:bg-[#272E3C]' : 'border-[#4F5C7C] bg-[#1C1B20] opacity-60 cursor-not-allowed'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold uppercase ${isCompleted ? 'text-[#36D837]' : isUnlocked ? 'text-[#FEE202]' : 'text-gray-500'}`}>Misión {mission.id}</h4>
                  {isCompleted && <Icon name="check" className="w-5 h-5 text-[#36D837]" />}
                  {!isUnlocked && <Icon name="lock" className="w-5 h-5 text-gray-500" />}
                </div>
                <h5 className="font-bold text-white mb-1 text-lg">{mission.title}</h5>
                <p className="text-sm text-gray-300">{mission.desc}</p>
              </button>
            )
          })}
        </div>

        {/* Sección de Insignias */}
        <div className="mt-8 mb-8">
          <div className="grid grid-cols-3 gap-y-6 gap-x-2">
            {BADGES.map((badge, idx) => {
              const unlocked = (progress + 5) > idx; 
              return (
              <div key={badge.id} className={`flex flex-col items-center text-center transition-all ${unlocked ? 'opacity-100' : 'opacity-30'}`}>
                <div className={`relative w-16 h-18 flex items-center justify-center mb-2 ${badge.special ? 'clip-octagon bg-gradient-to-br from-yellow-700 to-yellow-900 border-2 border-yellow-400' : 'clip-hexagon bg-[#242424] border-2 border-gray-500'}`}>
                   <div className={`w-14 h-16 flex items-center justify-center ${badge.special ? 'clip-octagon bg-black/60' : 'clip-hexagon bg-[#1C1B20]'}`}>
                      <Icon name={badge.icon} className={`w-6 h-6 ${unlocked ? (badge.special ? 'text-yellow-400' : 'text-gray-300') : 'text-gray-600'}`} />
                   </div>
                   {unlocked && !badge.special && (
                      <div className="absolute -bottom-1 w-6 h-1 bg-[#FEE202]"></div>
                   )}
                </div>
                <span className="text-[10px] leading-tight text-gray-300 w-20">{badge.name}</span>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvidences = () => (
    <div className="flex flex-col h-full bg-[#1a1a1a] pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#2b2b2b] opacity-90"></div>
      
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4">
        {/* Mapa central de España */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-80 h-80 opacity-10">
           <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
             <path d="M 15 20 L 25 15 L 45 15 L 60 17 L 85 25 L 90 35 L 85 45 L 80 60 L 75 70 L 60 85 L 45 90 L 30 85 L 25 75 L 28 60 L 32 45 L 25 30 L 15 25 Z" />
           </svg>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <line x1="20%" y1="15%" x2="50%" y2="45%" stroke="#d32f2f" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="80%" y1="15%" x2="50%" y2="45%" stroke="#d32f2f" strokeWidth="2" />
          <line x1="20%" y1="35%" x2="50%" y2="45%" stroke="#d32f2f" strokeWidth="2" />
          {progress >= 3 && (
            <line x1="80%" y1="75%" x2="50%" y2="45%" stroke="#d32f2f" strokeWidth="2" strokeDasharray="4,4" />
          )}
        </svg>

        <div className="relative z-20 w-full min-h-[800px]">
           {/* Recortes y notas en el tablón imitando el Anexo 6 */}
           <div className="absolute top-[5%] left-[5%] bg-white p-2 shadow-xl transform -rotate-3 w-32 hover:scale-105 transition-transform">
              <div className="w-full h-24 bg-gray-300 flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                <img src="https://placehold.co/150x150/111/fff?text=Penguin" alt="Pingüino" className="opacity-60" />
              </div>
              <p className="text-[10px] text-black mt-1 font-mono font-bold text-center">FUGADO - Pingüino</p>
              <div className="absolute -top-2 left-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md"></div>
           </div>

           <div className="absolute top-[10%] left-[45%] bg-[#FEE202] p-2 shadow-lg transform rotate-2 w-28 text-black font-sans text-xs">
              <p className="font-bold border-b border-black/20 pb-1 mb-1">03-09-26</p>
              <p>¿Qué ha pasado con el servidor?</p>
              <p className="text-right mt-2 font-bold text-[10px]">MISIÓN 1</p>
           </div>

           <div className="absolute top-[5%] right-[5%] bg-white p-2 shadow-xl transform rotate-3 w-32 hover:scale-105 transition-transform">
              <div className="w-full h-24 bg-gray-300 flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                <img src="https://placehold.co/150x150/111/fff?text=Riddler" alt="Enigma" className="opacity-60" />
              </div>
              <p className="text-[10px] text-black mt-1 font-mono font-bold text-center">FUGADO - Enigma</p>
              <div className="absolute -top-2 left-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md"></div>
           </div>

           <div className="absolute top-[25%] left-[2%] bg-white p-2 shadow-xl transform -rotate-2 w-40">
              <h3 className="font-black text-sm text-black border-b-2 border-black uppercase text-center leading-tight">FUGA MASIVA<br/>EN ARKHAM</h3>
              <p className="text-[8px] text-gray-600 mt-1 leading-tight text-justify">Cuatro criminales escapan sin dejar rastro aparente...</p>
           </div>

           {progress >= 2 && (
             <div className="absolute top-[35%] left-[5%] bg-gray-100 p-2 shadow-xl transform rotate-1 w-40">
                <h4 className="text-[10px] font-bold text-red-600 uppercase mb-1">CIUDAD ASIGNADA</h4>
                <div className="w-full h-20 bg-gray-300 border border-gray-400">
                  <img src="https://placehold.co/150x100/999/333?text=Map+Sector" alt="Map" />
                </div>
             </div>
           )}

           {/* Tarjeta del cómplice centrada donde acaban las líneas */}
           <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 p-3 shadow-2xl transform rotate-2 w-32 z-30 hover:scale-110 transition-transform">
              <Icon name="user" className="w-12 h-12 text-black mx-auto mb-2 opacity-50" />
              <p className="text-xl text-black font-bold text-center">?</p>
              <p className="text-[10px] text-red-600 font-bold uppercase text-center mt-1 border-t border-gray-400 pt-1">CÓMPLICE</p>
           </div>

           {progress >= 3 && (
             <div className="absolute top-[65%] right-[15%] bg-white p-2 shadow-xl transform -rotate-2 w-36 hover:scale-105 transition-transform">
                <div className="w-full h-24 bg-gray-300 flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                  <img src="https://placehold.co/150x150/111/fff?text=Harley" alt="Harley" className="opacity-60" />
                </div>
                <p className="text-[10px] text-black mt-1 font-mono font-bold text-center">FUGADA - Harley Q.</p>
                <div className="absolute -top-2 left-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md"></div>
             </div>
           )}

        </div>
      </div>
    </div>
  );

  const Mission2 = () => {
    const isCompleted = progress >= 2;
    const currentAnswers = user.city === 'Madrid' ? ['psicóloga', 'joker', 'rosa', 'azul', 'béisbol'] : CITIES[user.city].m2Answers;
    const [inputs, setInputs] = useState(isCompleted ? currentAnswers : ['', '', '', '', '']);
    const [inputStatus, setInputStatus] = useState(isCompleted ? ['correct', 'correct', 'correct', 'correct', 'correct'] : [null, null, null, null, null]);
    
    const handleInputChange = (index, value) => {
      if (isCompleted) return;
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
      
      if (inputStatus[index] !== null) {
        const newStatus = [...inputStatus];
        newStatus[index] = null;
        setInputStatus(newStatus);
      }
    };

    const checkAnswers = () => {
      let correctCount = 0;
      const newStatus = [...inputStatus];
      
      if (user.city === 'Madrid') {
        const checkWord = (input, target) => input.toLowerCase().trim() === target.toLowerCase();
        const checkWordNoAccent = (input, target) => input.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === target.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (checkWordNoAccent(inputs[0], 'psicóloga')) { newStatus[0] = 'correct'; correctCount++; } else newStatus[0] = 'incorrect';
        if (checkWord(inputs[1], 'joker')) { newStatus[1] = 'correct'; correctCount++; } else newStatus[1] = 'incorrect';
        
        const val3 = inputs[2].toLowerCase().trim();
        const val4 = inputs[3].toLowerCase().trim();
        const colors = ['rosa', 'azul'];
        
        let foundColors = [];
        if (colors.includes(val3)) {
           newStatus[2] = 'correct'; foundColors.push(val3); correctCount++;
        } else newStatus[2] = 'incorrect';

        if (colors.includes(val4) && !foundColors.includes(val4)) {
           newStatus[3] = 'correct'; correctCount++;
        } else newStatus[3] = 'incorrect';

        if (checkWordNoAccent(inputs[4], 'béisbol')) { newStatus[4] = 'correct'; correctCount++; } else newStatus[4] = 'incorrect';

      } else {
        inputs.forEach((val, i) => {
          if(val.toLowerCase().trim() === currentAnswers[i].toLowerCase()) {
            newStatus[i] = 'correct'; correctCount++;
          } else {
            newStatus[i] = 'incorrect';
          }
        });
      }
      
      setInputStatus(newStatus);

      if(correctCount >= 5) {
        completeMission(2, 250);
      } else {
        setMsg({ title: 'Datos Insuficientes', message: `Has acertado ${correctCount}/5. Corrige los recuadros en rojo.`, type: 'error'});
      }
    };

    const getInputClass = (index, width) => {
      let base = `inline-block font-mono text-center font-bold px-1 py-0.5 border-2 rounded mx-1 focus:outline-none transition-colors ${width}`;
      if (inputStatus[index] === 'correct') return `${base} border-green-500 bg-green-100 text-green-900 shadow-[0_0_8px_rgba(34,197,94,0.5)]`;
      if (inputStatus[index] === 'incorrect') return `${base} border-red-500 bg-red-100 text-red-900 shadow-[0_0_8px_rgba(239,68,68,0.5)]`;
      return `${base} border-gray-400 bg-gray-200 text-black focus:border-[#FEE202]`;
    };

    return (
      <div className="flex flex-col h-full bg-[#d8c37d] p-4 pb-24 relative overflow-y-auto">
        <div className="bg-[#242424] text-[#FEE202] -mx-4 -mt-4 p-4 shadow-lg z-10 shrink-0">
          <h2 className="text-xl font-bold uppercase text-center tracking-wider">Misión 2:<br/>Informes Incompletos</h2>
        </div>

        <div className="bg-[#FEE202] border-2 border-black p-4 mt-4 shadow-[4px_4px_0_#242424] text-black font-sans text-sm relative shrink-0">
           <Icon name="user" className="absolute top-2 left-2 w-8 h-8 opacity-20" />
           {isCompleted ? (
             <p className="font-bold relative z-10">Buen trabajo, Bat-Vigilante. Hemos conseguido recuperar los archivos o más bien casi todos... Durante el ataque se ha eliminado un único archivo de vídeo que no consigo restaurar. Mantente alerta.</p>
           ) : (
             <p className="font-bold relative z-10">¡Enhorabuena! Sin embargo... han conseguido borrar algunos datos de los perfiles. Necesito tu ayuda para completar el siguiente informe. ¿Serás capaz?</p>
           )}
        </div>

        <div className="mt-6 bg-[#e2e8f0] border border-gray-400 shadow-2xl p-6 relative rounded-tr-xl shrink-0">
           <div className="absolute -top-6 left-0 flex gap-1">
              <div className="bg-[#FEE202] px-3 py-1 font-bold rounded-t text-sm border-x border-t border-gray-400">1</div>
           </div>

           <h3 className="text-2xl font-mono font-black mb-4 uppercase text-black border-b-2 border-black pb-1">
             {user.city === 'Madrid' ? 'HARLEY QUINN' : CITIES[user.city].villain}
           </h3>
           
           <div className="text-sm font-sans leading-relaxed text-justify text-black">
             {user.city === 'Madrid' ? (
                <>
                  La paciente trabajó como <input type="text" value={inputs[0]} disabled={isCompleted} onChange={e => handleInputChange(0, e.target.value)} className={getInputClass(0, "w-28")} /> en Arkham Asylum. Durante su estancia estableció una relación con el paciente conocido como <input type="text" value={inputs[1]} disabled={isCompleted} onChange={e => handleInputChange(1, e.target.value)} className={getInputClass(1, "w-24")} />, cuya influencia provocó una transformación progresiva de su identidad.
                  <br/><br/>
                  <span className="font-bold">RASGOS Y HABILIDADES</span><br/>
                  Es reconocible por su pelo rubio con las puntas teñidas de <input type="text" value={inputs[2]} disabled={isCompleted} onChange={e => handleInputChange(2, e.target.value)} className={getInputClass(2, "w-20")} /> y <input type="text" value={inputs[3]} disabled={isCompleted} onChange={e => handleInputChange(3, e.target.value)} className={getInputClass(3, "w-20")} /> así como por el uso frecuente de un bate de <input type="text" value={inputs[4]} disabled={isCompleted} onChange={e => handleInputChange(4, e.target.value)} className={getInputClass(4, "w-24")} /> como arma. Presenta una personalidad marcada por la manipulación.
                </>
             ) : (
                <>
                  {CITIES[user.city].m2Text[0]} <input type="text" value={inputs[0]} disabled={isCompleted} onChange={e => handleInputChange(0, e.target.value)} className={getInputClass(0, "w-28")} /> 
                  {CITIES[user.city].m2Text[1]} <input type="text" value={inputs[1]} disabled={isCompleted} onChange={e => handleInputChange(1, e.target.value)} className={getInputClass(1, "w-24")} /> 
                  {CITIES[user.city].m2Text[2]} <input type="text" value={inputs[2]} disabled={isCompleted} onChange={e => handleInputChange(2, e.target.value)} className={getInputClass(2, "w-20")} /> 
                  {CITIES[user.city].m2Text[3]} <input type="text" value={inputs[3]} disabled={isCompleted} onChange={e => handleInputChange(3, e.target.value)} className={getInputClass(3, "w-20")} /> 
                  {CITIES[user.city].m2Text[4]} <input type="text" value={inputs[4]} disabled={isCompleted} onChange={e => handleInputChange(4, e.target.value)} className={getInputClass(4, "w-28")} /> 
                  {CITIES[user.city].m2Text[5]}
                </>
             )}
           </div>

           {!isCompleted && (
             <div className="mt-8 flex justify-end">
               <button onClick={checkAnswers} className="bg-[#242424] text-[#FEE202] py-2 px-6 rounded font-bold uppercase hover:bg-black transition-colors">
                 Validar
               </button>
             </div>
           )}
        </div>
      </div>
    );
  };

  const Mission3 = () => {
    const isCompleted = progress >= 3;
    const [stage, setStage] = useState(isCompleted ? 3 : 1);
    const [timeLeft, setTimeLeft] = useState(isCompleted ? 0 : 180);

    useEffect(() => {
      if (isCompleted) return;
      if(timeLeft <= 0) {
        setMsg({ title: 'El fugitivo escapó', message: 'No fuiste lo suficientemente rápido. Volviendo a intentar...', type: 'error'});
        setStage(1);
        setTimeLeft(180);
      }
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }, [timeLeft, isCompleted]);

    const handleFound = () => {
      if(stage < 3) {
        setStage(s => s + 1);
        setTimeLeft(180); 
      } else {
        completeMission(3, 300);
      }
    };

    const positions = [
      { top: '60%', left: '85%' },
      { top: '35%', left: '15%' },
      { top: '25%', left: '25%' },
    ];

    return (
      <div className="flex flex-col h-full bg-[#242424] text-white relative pb-20 overflow-hidden">
        <div className="bg-[#FEE202] text-black p-4 shadow-lg z-10 flex gap-4 items-center shrink-0">
           <div className="bg-[#242424] text-[#FEE202] p-2 rounded-full font-bold w-10 h-10 flex items-center justify-center shrink-0">
             0{stage}
           </div>
           <div>
             <h2 className="font-bold text-lg uppercase leading-tight">Identifica al villano<br/>oculto en la multitud.</h2>
           </div>
        </div>

        <div className="flex-1 relative overflow-hidden bg-gray-200">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1000x800/d8ebd8/333?text=Parque+Ilustrado')] bg-cover" style={{transform: `scale(${1 + (stage * 0.2)})`, transition: 'transform 1s'}}>
             {!isCompleted && (
               <button 
                 onClick={handleFound}
                 className="absolute w-12 h-12 flex items-center justify-center bg-transparent border-2 border-transparent hover:border-[#FEE202] border-dashed rounded z-20"
                 style={positions[stage-1]}
               >
                 <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-50"></span>
               </button>
             )}
          </div>
          
          <div className="absolute top-4 left-4 bg-[#FEE202] text-black font-bold py-1 px-3 rounded-full flex items-center gap-2 shadow-lg">
             <Icon name="search" className="w-4 h-4" /> ZOOM
          </div>

          <div className="absolute top-4 right-4 bg-black/80 text-red-500 font-mono text-xl font-bold py-1 px-3 rounded shadow-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    );
  };

  const Mission4 = () => {
    const isCompleted = progress >= 4;
    const [found, setFound] = useState(isCompleted ? [true, true] : [false, false]);

    const handleFind = (index) => {
      if (isCompleted) return;
      const newFound = [...found];
      newFound[index] = true;
      setFound(newFound);
      
      if(newFound[0] && newFound[1]) {
        setTimeout(() => completeMission(4, 350), 1000);
      }
    };

    return (
      <div className="flex flex-col h-full bg-[#FEE202] p-4 relative pb-20 overflow-hidden">
        <h2 className="text-black font-bold uppercase text-2xl mb-4 text-center shrink-0">Misión 4:<br/>Caza Rastros</h2>

        <div className="flex gap-2 justify-center mb-4 shrink-0">
           <div className={`flex-1 text-center py-2 font-bold uppercase rounded ${found[0] ? 'bg-black text-[#FEE202]' : 'border-2 border-black text-black'}`}>Anomalía 01</div>
           <div className={`flex-1 text-center py-2 font-bold uppercase rounded ${found[1] ? 'bg-black text-[#FEE202]' : 'border-2 border-black text-black'}`}>Anomalía 02</div>
        </div>

        <div className="flex-1 bg-[#242424] rounded-xl relative overflow-hidden border-4 border-[#242424] shadow-2xl">
           <div className="absolute inset-0 bg-[url('https://placehold.co/600x800/87ceeb/333?text=Plaza+de+España')] bg-cover bg-center opacity-80"></div>
           
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-1/3 border-4 border-dashed border-white/50 relative">
                 <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white"></div>
                 <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white"></div>
                 <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white"></div>
                 <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white"></div>
              </div>
           </div>

           {!isCompleted && (
             <>
               <button onClick={() => handleFind(0)} className={`absolute top-[30%] left-[20%] w-16 h-48 border-4 border-pink-500/50 rounded-full border-dashed transition-all ${found[0] ? 'opacity-0 scale-150 pointer-events-none' : 'animate-pulse hover:border-white'}`}></button>
               <button onClick={() => handleFind(1)} className={`absolute top-[20%] right-[10%] w-12 h-64 border-4 border-pink-500/50 rounded-full border-dashed transition-all ${found[1] ? 'opacity-0 scale-150 pointer-events-none' : 'animate-pulse delay-300 hover:border-white'}`}></button>
             </>
           )}

           <div className="absolute bottom-4 left-4 right-4 bg-[#FEE202] text-black font-bold py-3 text-center rounded-lg shadow-lg flex items-center justify-center gap-2">
             <Icon name="batman" className="w-6 h-6" /> Plaza de España (Madrid)
           </div>
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    if (!user || view === 'loading' || view === 'login' || view === 'register' || view === 'm1') return null;
    return (
      <div className="absolute bottom-0 w-full bg-[#1C1B20] border-t-2 border-[#FEE202] flex justify-around items-center z-50 h-16">
        <button 
          onClick={() => setView('dashboard')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${view === 'dashboard' || view.startsWith('m') ? 'bg-[#242424] text-[#FEE202]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Icon name="home" className="w-6 h-6 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Misiones</span>
        </button>
        <div className="w-0.5 h-8 bg-gray-700"></div>
        <button 
          onClick={() => setView('evidences')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${view === 'evidences' ? 'bg-[#242424] text-[#FEE202]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Icon name="board" className="w-6 h-6 mb-1" />
          <span className="text-[10px] uppercase font-bold tracking-wider">Tablón</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex justify-center font-sans">
      <style dangerouslySetInnerHTML={{__html: fontStyles}} />

      <main className="w-full max-w-md h-[100dvh] bg-[#242424] text-white relative shadow-2xl flex flex-col overflow-hidden">
        
        {user && view !== 'loading' && view !== 'register' && view !== 'm1' && (
          <header className="bg-[#242424] p-4 border-b border-[#4F5C7C] flex items-center justify-between shadow-lg z-10 shrink-0">
            <button 
              onClick={() => setShowProfileEdit(true)}
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity group"
            >
              <div className="w-10 h-10 bg-[#FEE202] rounded-full flex items-center justify-center">
                 <Icon name="user" className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="font-bold text-white leading-tight text-sm uppercase">{user.alias}</h2>
                  <Icon name="edit" className="w-3 h-3 text-gray-500 group-hover:text-[#FEE202] transition-colors" />
                </div>
                <p className="text-xs text-[#FEE202]">{user.city}</p>
              </div>
            </button>
            <div className="flex flex-col gap-1 items-end min-w-[120px]">
              <button 
                onClick={() => setScoreModal('individual')}
                className="flex justify-between items-center w-full bg-[#1C1B20] hover:bg-[#272E3C] border border-[#4F5C7C] rounded px-2 py-1 transition-colors"
              >
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">Personal</span>
                <span className="font-bold text-[#FEE202] font-terminal text-sm ml-2">{score}</span>
              </button>
              <button 
                onClick={() => setScoreModal('collective')}
                className="flex justify-between items-center w-full bg-[#1C1B20] hover:bg-[#272E3C] border border-[#4F5C7C] rounded px-2 py-1 transition-colors"
              >
                <span className="text-[10px] text-gray-400 uppercase tracking-wider truncate max-w-[50px] text-left">{user.city}</span>
                <span className="font-bold text-[#36D837] font-terminal text-sm ml-2">
                  {(baseCityScores[user.city] + score).toLocaleString()}
                </span>
              </button>
            </div>
          </header>
        )}

        {view === 'loading' && renderLoading()}
        {view === 'm1' && <Mission1 />}
        {view === 'register' && renderRegister()}
        {view === 'dashboard' && renderDashboard()}
        {view === 'm2' && <Mission2 />}
        {view === 'm3' && <Mission3 />}
        {view === 'm4' && <Mission4 />}
        {view === 'evidences' && renderEvidences()}

        {renderFooter()}

        {/* Modal: Edición de Perfil */}
        {showProfileEdit && (
          <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm bg-[#242424] rounded-lg border border-[#FEE202] p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-6 border-b border-[#FEE202] pb-4">
                <h2 className="text-xl font-bold text-[#FEE202] uppercase tracking-widest">Editar Perfil</h2>
                <button onClick={() => setShowProfileEdit(false)} className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full">
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const newAlias = e.target.newAlias.value.trim().toUpperCase();
                if (newAlias) {
                  setUser({ ...user, alias: newAlias });
                  setShowProfileEdit(false);
                  setMsg({ title: 'Perfil Actualizado', message: `Alias actualizado a ${newAlias}.`, type: 'info' });
                }
              }} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">NUEVO ALIAS</label>
                  <input name="newAlias" type="text" defaultValue={user.alias} autoFocus required className="w-full bg-[#1C1B20] border border-[#4F5C7C] rounded p-3 text-white focus:outline-none focus:border-[#FEE202] uppercase" />
                </div>
                <button type="submit" className="w-full bg-[#FEE202] text-[#242424] font-bold uppercase tracking-wider py-3 rounded hover:bg-yellow-400 transition-colors mt-2">Guardar Cambios</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Puntuación Individual */}
        {scoreModal === 'individual' && (
          <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col p-6">
            <div className="flex justify-between items-center mb-6 border-b border-[#FEE202] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#FEE202] uppercase tracking-widest">Puntuación Personal</h2>
                <p className="text-gray-400 font-mono text-sm">Agente: {user.alias}</p>
              </div>
              <button onClick={() => setScoreModal(null)} className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full">
                <Icon name="x" className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              {scoreLog.length === 0 ? (
                <p className="text-gray-500 font-mono text-center mt-10">No hay registros de misiones completadas aún.</p>
              ) : (
                scoreLog.map((log, i) => (
                  <div key={i} className="bg-[#242424] border border-[#4F5C7C] p-4 rounded flex items-center gap-4">
                    <div className="w-12 h-12 clip-hexagon flex items-center justify-center bg-[#1C1B20] border-2 border-[#FEE202] text-[#FEE202] shrink-0">
                      <Icon name={log.badge.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Misión {log.mission}</p>
                      <p className="font-bold text-white text-sm leading-tight">{log.title}</p>
                    </div>
                    <div className="font-terminal font-bold text-[#FEE202] text-lg">
                      +{log.points}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 bg-[#FEE202] border border-[#FEE202] p-4 flex justify-between items-center rounded text-[#242424]">
              <span className="font-bold uppercase">Total Acumulado</span>
              <span className="font-terminal text-2xl font-bold">{score} pts</span>
            </div>
          </div>
        )}

        {/* Modal: Puntuación Colectiva (Ranking) */}
        {scoreModal === 'collective' && (() => {
          const rankings = Object.keys(baseCityScores).map(city => ({
            city,
            total: baseCityScores[city] + (user.city === city ? score : 0)
          })).sort((a, b) => b.total - a.total);

          return (
            <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col p-6">
              <div className="flex justify-between items-center mb-6 border-b border-[#36D837] pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#36D837] uppercase tracking-widest">Ranking Global</h2>
                  <p className="text-gray-400 font-mono text-sm">Estado de la red</p>
                </div>
                <button onClick={() => setScoreModal(null)} className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full">
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                {rankings.map((r, i) => (
                  <div key={r.city} className={`border p-4 rounded flex items-center gap-4 ${r.city === user.city ? 'bg-[#36D837]/20 border-[#36D837]' : 'bg-[#242424] border-[#4F5C7C]'}`}>
                    <div className="font-terminal text-2xl font-bold text-gray-500 w-8 text-center">{i + 1}º</div>
                    <div className="flex-1">
                      <p className={`font-bold text-lg uppercase tracking-wider ${r.city === user.city ? 'text-[#36D837]' : 'text-white'}`}>{r.city}</p>
                    </div>
                    <div className={`font-terminal font-bold text-xl ${r.city === user.city ? 'text-[#36D837]' : 'text-gray-400'}`}>
                      {r.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center p-4 bg-[#242424] border border-[#36D837] rounded">
                <p className="text-sm text-gray-300">Compite junto a los Bat-Vigilantes de tu ciudad por el primer puesto. Tu participación es clave para la investigación en Gotham.</p>
              </div>
            </div>
          );
        })()}

        {msg && <MessageBox {...msg} onClose={() => setMsg(null)} />}

      </main>
    </div>
  );
}