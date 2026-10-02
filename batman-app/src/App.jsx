import React, { useState, useEffect, useRef } from 'react';

// Campaign Data based on TFM_MADCOM_BATMAN.pdf
const CITIES = {
  'Madrid': {
    villain: 'Harley Quinn',
    hideout: 'Fnac Callao',
    m2Answers: ['psicóloga', 'joker', 'rosa', 'azul', 'béisbol'],
    m2Text: [
      "La paciente trabajó como ", " en Arkham Asylum. Estableció una relación con el paciente conocido como ",
      ". Pelo rubio con puntas teñidas de ", " y ", ". Arma frecuente: bate de ", "."
    ]
  },
  'Barcelona': {
    villain: 'Enigma',
    hideout: 'Fnac Triangle',
    m2Answers: ['edward', 'acertijos', 'verde', 'interrogación', 'superioridad'],
    m2Text: [
      "Nombre real: ", " Nygma. Presenta una profunda obsesión con la creación de ",
      ". Vestimenta habitual de color ", " y uso constante del símbolo de ", 
      ". Posee un marcado complejo de ", " intelectual."
    ]
  },
  'Bilbao': {
    villain: 'El Pingüino',
    hideout: 'Fnac Bilbao',
    m2Answers: ['oswald', 'iceberg', 'paraguas', 'aves', 'crimen'],
    m2Text: [
      "Nombre: ", " Cobblepot. Opera sus negocios desde el club ", 
      " Lounge. Oculta armamento avanzado en su ", ". Presenta una fijación patológica con las ", 
      " y domina gran parte del ", " organizado."
    ]
  },
  'Sevilla': {
    villain: 'El Espantapájaros',
    hideout: 'Fnac Torre Sevilla',
    m2Answers: ['jonathan', 'miedo', 'máscara', 'gas', 'experimentos'],
    m2Text: [
      "Nombre: ", " Crane. Desarrolló una toxina basada en el ", 
      " humano. Oculta su identidad bajo una ", " de tela. Utiliza un ", 
      " alucinógeno para llevar a cabo sus ", " psicológicos."
    ]
  }
};

const BADGES = [
  { id: 1, name: 'Red Blindada', icon: 'shield' },
  { id: 2, name: 'Expediente Restaurado', icon: 'folder' },
  { id: 3, name: 'Sin Escapatoria', icon: 'camera' },
  { id: 4, name: 'Caza Rastros', icon: 'search' },
];

const Icon = ({ name, className }) => {
  const icons = {
    batman: <path d="M12 2C8 2 4 4 2 8c0 3 2 6 5 8-1-2-1-4 0-5 1 0 2 1 2 3 1-1 2-2 3-2 1 0 2 1 3 2 0-2 1-3 2-3 1 1 1 3 0 5 3-2 5-5 5-8 0-4-4-6-10-6z" fill="currentColor"/>,
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
    board: <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  };
  return <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">{icons[name]}</svg>;
};

const MessageBox = ({ title, message, onClose, type = 'info' }) => (
  <div className="absolute inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div className={`w-full max-w-sm rounded-lg p-6 border-2 shadow-2xl ${type === 'error' ? 'border-red-500 bg-red-900/20' : 'border-[#FEE202] bg-[#242424]'}`}>
      <h3 className={`text-xl font-bold mb-2 ${type === 'error' ? 'text-red-500' : 'text-[#FEE202]'}`}>{title}</h3>
      <p className="text-gray-200 mb-6 font-mono text-sm">{message}</p>
      <button onClick={onClose} className="w-full py-3 font-bold uppercase tracking-wider bg-[#FEE202] text-[#242424] hover:bg-yellow-400 rounded transition-colors">
        Entendido
      </button>
    </div>
  </div>
);

export default function BatmanApp() {
  const [view, setView] = useState('login'); // login, dashboard, m1, m2, m3, m4, evidences
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); 
  const [score, setScore] = useState(0);
  const [scoreLog, setScoreLog] = useState([]); 
  const [scoreModal, setScoreModal] = useState(null); 
  const [msg, setMsg] = useState(null);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  // Base scores para la simulación del ranking colectivo
  const baseCityScores = {
    'Madrid': 12500,
    'Barcelona': 11800,
    'Bilbao': 10500,
    'Sevilla': 11200
  };

  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Rubik:wght@400;600;800&display=swap');
    .font-sans { font-family: 'Rubik', sans-serif; }
    .font-terminal { font-family: 'Anonymous Pro', monospace; }
    .bg-scanlines { background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06)); background-size: 100% 2px, 3px 100%; }
  `;

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if(!data.name || !data.city) {
      setMsg({ title: 'Acceso Denegado', message: 'Faltan datos de registro.', type: 'error' });
      return;
    }
    
    setUser({ ...data, alias: data.name.toUpperCase() });
    setView('loading');
    
    setTimeout(() => {
      setView('dashboard');
      setMsg({ title: 'Oráculo', message: `Conexión establecida. Bienvenido a la red, ${data.name}. Gotham y tu ciudad te necesitan.`});
    }, 2000);
  };

  const completeMission = (missionIndex, points) => {
    setScore(s => s + points);
    setProgress(p => Math.max(p, missionIndex));
    setScoreLog(log => [...log, { 
      mission: missionIndex, 
      title: ['Alerta en la red', 'Informes Incompletos', 'Sin Escapatoria', 'Caza Rastros', 'La Guarida'][missionIndex-1],
      points: points, 
      badge: BADGES[missionIndex-1] 
    }]);
    setView('dashboard');
    setMsg({ 
      title: 'Misión Completada', 
      message: `Has obtenido la insignia: ${BADGES[missionIndex-1].name}. Puntuación actual: ${score + points} pts.` 
    });
  };

  const renderLogin = () => (
    <div className="flex flex-col h-full p-6 bg-[#242424] text-white justify-center">
      <div className="text-center mb-10">
        <Icon name="batman" className="w-24 h-24 mx-auto text-[#FEE202] mb-4 drop-shadow-[0_0_15px_rgba(254,226,2,0.5)]" />
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-[#FEE202] border-y-2 border-[#FEE202] py-2">
          Bat-Vigilantes
        </h1>
        <p className="mt-4 text-sm text-gray-400">Todos Somos Batman</p>
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="name" type="text" placeholder="Nombre / Alias" required className="w-full bg-[#272E3C] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        <input name="email" type="email" placeholder="Email" required className="w-full bg-[#272E3C] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#FEE202]" />
        <select name="city" required className="w-full bg-[#272E3C] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#FEE202]">
          <option value="">Selecciona tu ciudad...</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Bilbao">Bilbao</option>
          <option value="Sevilla">Sevilla</option>
        </select>
        <button type="submit" className="w-full bg-[#FEE202] text-[#242424] font-bold uppercase tracking-wider py-4 rounded shadow-[0_0_15px_rgba(254,226,2,0.3)] hover:bg-yellow-400 hover:shadow-[0_0_25px_rgba(254,226,2,0.6)] transition-all mt-4">
          Unirse a la Red
        </button>
      </form>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-[#272E3C]">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold mb-2">Estado de Investigación</h3>
          <p className="text-sm text-gray-300">Los fugitivos de Arkham están ocultos. Completa las misiones para localizarlos.</p>
        </div>

        <div className="grid gap-4">
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
                className={`relative overflow-hidden text-left p-4 rounded-lg border-2 transition-all ${isCompleted ? 'border-[#36D837] bg-[#36D837]/10' : isUnlocked ? 'border-[#FEE202] bg-[#FEE202]/10 hover:bg-[#FEE202]/20' : 'border-gray-600 bg-gray-800 opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold uppercase ${isCompleted ? 'text-[#36D837]' : isUnlocked ? 'text-[#FEE202]' : 'text-gray-500'}`}>Misión {mission.id}</h4>
                  {isCompleted && <Icon name="check" className="w-5 h-5 text-[#36D837]" />}
                  {!isUnlocked && <Icon name="lock" className="w-5 h-5 text-gray-500" />}
                </div>
                <h5 className="font-semibold text-white mb-1">{mission.title}</h5>
                <p className="text-xs text-gray-300">{mission.desc}</p>
              </button>
            )
          })}
        </div>

        <div className="mt-8">
          <h3 className="text-center text-[#FEE202] font-bold uppercase mb-4 border-t border-[#FEE202]/30 pt-4">Insignias</h3>
          <div className="grid grid-cols-4 gap-2">
            {BADGES.map((badge, idx) => (
              <div key={badge.id} className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 clip-hexagon flex items-center justify-center border-2 mb-2 transition-all ${progress > idx ? 'border-[#FEE202] bg-[#242424] shadow-[0_0_10px_rgba(254,226,2,0.5)] text-[#FEE202]' : 'border-gray-700 bg-gray-800 text-gray-600'}`}>
                   <Icon name={badge.icon} className="w-6 h-6" />
                </div>
                <span className="text-[10px] leading-tight text-gray-400 h-6">{badge.name}</span>
              </div>
            ))}
          </div>
          {progress === 4 && (
            <div className="mt-6 text-center p-4 border border-[#FEE202] bg-[#FEE202]/10 rounded">
              <p className="text-sm font-bold text-[#FEE202]">¡Has completado la investigación preliminar!</p>
              <p className="text-xs mt-2">Dirígete a {CITIES[user.city].hideout} en el Batman Day para la Misión Final: La Guarida.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderEvidences = () => (
    <div className="flex flex-col h-full bg-[#1a1a1a] p-4 pb-24 overflow-y-auto">
      <h2 className="text-xl font-bold text-[#FEE202] mb-4 uppercase border-b border-[#FEE202] pb-2">Tablón de Evidencias</h2>
      <div className="space-y-4">
         <div className="bg-[#242424] p-4 rounded border border-gray-600 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-xs text-gray-500 font-mono">ID: 07-991-28</div>
            <h3 className="font-bold text-white mb-2">Fuga de Arkham</h3>
            <p className="text-sm text-gray-400 font-mono">El protocolo de emergencia nivel 3 ha sido activado. 4 internos de máxima peligrosidad han escapado coordinadamente.</p>
         </div>
         {progress >= 1 && (
           <div className="bg-[#242424] p-4 rounded border border-[#36D837] relative overflow-hidden">
              <h3 className="font-bold text-[#36D837] mb-2 uppercase">Servidores Recuperados</h3>
              <p className="text-sm text-gray-300 font-mono">La red de Oráculo ha sido estabilizada. El ataque fue un intento de distracción.</p>
           </div>
         )}
         {progress >= 2 && (
           <div className="bg-[#242424] p-4 rounded border border-[#FEE202] relative overflow-hidden">
              <h3 className="font-bold text-[#FEE202] mb-2 uppercase">Expediente Restaurado</h3>
              <p className="text-sm text-gray-300 font-mono">Se han recuperado datos vitales del fugitivo asignado al sector {user.city}. Se sospecha complicidad interna en Arkham.</p>
           </div>
         )}
         {progress < 2 && (
           <div className="bg-[#242424] p-4 rounded border border-dashed border-gray-700 flex items-center justify-center opacity-50 h-24">
              <span className="font-mono text-sm text-gray-500">EVIDENCIA BLOQUEADA</span>
           </div>
         )}
      </div>
    </div>
  );

  const Mission1 = () => {
    const isCompleted = progress >= 1;
    const [timeLeft, setTimeLeft] = useState(isCompleted ? 0 : 300);
    const [inputVal, setInputVal] = useState(isCompleted ? 'BATMAN CAERA' : '');
    const codeHint = "2-1-20-13-1-14 3-1-5-18-1"; // BATMAN CAERA

    useEffect(() => {
      if (isCompleted) return;
      const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
      return () => clearInterval(timer);
    }, [isCompleted]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const cleaned = inputVal.toUpperCase().trim().replace(/\s+/g, ' ');
      if (cleaned === 'BATMAN CAERA' || cleaned === 'BATMAN CAERÁ') {
        completeMission(1, 100 + timeLeft); 
      } else {
        setMsg({ title: 'Error', message: 'Clave incorrecta. El cifrado continúa.', type: 'error'});
        setInputVal('');
      }
    };

    return (
      <div className="flex flex-col flex-1 bg-[#1C1B20] text-[#36D837] font-terminal p-4 bg-scanlines pb-20 relative">
        <div className="border-b border-[#36D837]/30 pb-2 mb-4 flex justify-between items-center">
          <h2 className="uppercase">Alerta de Seguridad</h2>
          <span className="text-red-500 font-bold bg-red-500/20 px-2 py-1 rounded animate-pulse">
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto mb-4 text-sm space-y-4">
          <p>{">"} CONECTANDO CON SERVIDOR CENTRAL...</p>
          <p className="text-red-500">{">"} ADVERTENCIA: INTERFERENCIA DETECTADA.</p>
          <p>{">"} CIFRADO DE DATOS MALICIOSOS EN CURSO...</p>
          
          <div className="border border-[#36D837] p-4 bg-[#36D837]/5 mt-6">
            <p className="mb-2">Oráculo:</p>
            <p className="text-gray-300">El servidor está sufriendo un ataque. Los villanos han dejado un mensaje oculto. Descifra el código sustituyendo cada número por su posición en el alfabeto (A=1, B=2...) para detener el cifrado.</p>
            <p className="mt-4 text-xl tracking-widest text-center text-[#FEE202] bg-black p-2">{codeHint}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-[#36D837]/30 pt-4 mt-auto">
          <p className="mb-2 text-xs">INTRODUCE LA CLAVE DESCIFRADA:</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              autoFocus={!isCompleted}
              value={inputVal}
              disabled={isCompleted}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 w-full bg-black border border-[#36D837] text-[#36D837] p-3 focus:outline-none focus:ring-1 focus:ring-[#36D837] uppercase font-terminal disabled:opacity-70 disabled:cursor-not-allowed"
              placeholder="Escribe aquí..."
            />
            {isCompleted ? (
              <div className="bg-[#36D837]/20 text-[#36D837] border border-[#36D837] px-4 flex items-center font-bold">
                COMPLETADA
              </div>
            ) : (
              <button type="submit" className="bg-[#36D837] text-black px-6 font-bold hover:bg-green-400 transition-colors">
                ENTRAR
              </button>
            )}
          </div>
        </form>
      </div>
    );
  };

  const Mission2 = () => {
    const cityData = CITIES[user.city];
    const isCompleted = progress >= 2;
    
    const initialInputs = isCompleted 
      ? (user.city === 'Madrid' ? ['psicóloga', 'joker', 'rosa', 'azul', 'béisbol'] : cityData.m2Answers)
      : ['', '', '', '', ''];
    const initialStatus = isCompleted ? ['correct', 'correct', 'correct', 'correct', 'correct'] : [null, null, null, null, null];

    const [inputs, setInputs] = useState(initialInputs);
    const [inputStatus, setInputStatus] = useState(initialStatus);
    
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
        if (['psicóloga', 'psicologa'].includes(inputs[0].toLowerCase().trim())) {
          newStatus[0] = 'correct'; correctCount++;
        } else newStatus[0] = 'incorrect';
        
        if (inputs[1].toLowerCase().trim() === 'joker') {
          newStatus[1] = 'correct'; correctCount++;
        } else newStatus[1] = 'incorrect';
        
        const validColors = ['rosa', 'azul'];
        let usedColors = [];
        
        const val2 = inputs[2].toLowerCase().trim();
        if (validColors.includes(val2)) {
          newStatus[2] = 'correct';
          usedColors.push(val2);
          correctCount++;
        } else newStatus[2] = 'incorrect';
        
        const val3 = inputs[3].toLowerCase().trim();
        if (validColors.includes(val3) && !usedColors.includes(val3)) {
          newStatus[3] = 'correct';
          correctCount++;
        } else newStatus[3] = 'incorrect';

        if (['béisbol', 'beisbol'].includes(inputs[4].toLowerCase().trim())) {
          newStatus[4] = 'correct'; correctCount++;
        } else newStatus[4] = 'incorrect';

      } else {
        inputs.forEach((val, i) => {
          if(val.toLowerCase().trim() === cityData.m2Answers[i].toLowerCase()) {
            newStatus[i] = 'correct';
            correctCount++;
          } else {
            newStatus[i] = 'incorrect';
          }
        });
      }
      
      setInputStatus(newStatus);

      if(correctCount >= 5) {
        completeMission(2, correctCount * 50);
      } else {
        setMsg({ title: 'Datos Insuficientes', message: `Has acertado ${correctCount}/5. Corrige las cajas en rojo.`, type: 'error'});
      }
    };

    const getInputClass = (index, widthClass) => {
      let baseClass = `inline-block border-2 rounded px-2 py-1 mx-1 mb-1 text-center font-bold focus:outline-none transition-colors ${widthClass}`;
      if (inputStatus[index] === 'correct') {
        return `${baseClass} border-green-500 bg-green-100 text-green-900`;
      } else if (inputStatus[index] === 'incorrect') {
        return `${baseClass} border-red-500 bg-red-100 text-red-900`;
      }
      return `${baseClass} border-gray-400 bg-gray-50 text-gray-900 focus:border-[#FEE202]`;
    };

    return (
      <div className="flex flex-col flex-1 bg-[#E5D7B6] text-gray-800 p-4 pb-24">
        <header className="mb-4 border-b-2 border-gray-800 pb-2 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-bold uppercase tracking-wider text-xl">DOCUMENTO CLASIFICADO</h2>
            <p className="text-xs">ARKHAM ASYLUM - DPTO. DE SEGURIDAD</p>
          </div>
          <Icon name="batman" className="w-8 h-8 opacity-50" />
        </header>

        <div className="bg-white p-6 shadow-md rounded border border-gray-300 relative flex-1 overflow-y-auto">
          <div className="absolute top-4 right-4 border-4 border-red-600 text-red-600 font-bold uppercase tracking-widest p-1 transform rotate-12 opacity-80 text-lg pointer-events-none">
            CONFIDENTIAL
          </div>
          
          <h3 className="text-2xl font-black mb-6 uppercase text-gray-900 border-b-2 border-black inline-block pr-8">
            {cityData.villain}
          </h3>
          
          <div className="text-sm font-mono leading-relaxed text-justify">
            <p className="bg-yellow-200/50 p-2 text-xs text-gray-600 mb-6 border border-yellow-400">
              [NOTA DE ORÁCULO]: El ciberataque corrompió este expediente. Rellena los huecos con la información correcta.
            </p>
            
            <p className="mb-4 inline-block">
              {cityData.m2Text[0]}
              <input type="text" value={inputs[0]} disabled={isCompleted} onChange={e => handleInputChange(0, e.target.value)} className={getInputClass(0, "w-28")} />
              {cityData.m2Text[1]}
              <input type="text" value={inputs[1]} disabled={isCompleted} onChange={e => handleInputChange(1, e.target.value)} className={getInputClass(1, "w-28")} />
              {cityData.m2Text[2]}
              <input type="text" value={inputs[2]} disabled={isCompleted} onChange={e => handleInputChange(2, e.target.value)} className={getInputClass(2, "w-20")} />
              {cityData.m2Text[3]}
              <input type="text" value={inputs[3]} disabled={isCompleted} onChange={e => handleInputChange(3, e.target.value)} className={getInputClass(3, "w-20")} />
              {cityData.m2Text[4]}
              <input type="text" value={inputs[4]} disabled={isCompleted} onChange={e => handleInputChange(4, e.target.value)} className={getInputClass(4, "w-28")} />
              {cityData.m2Text[5]}
            </p>
          </div>
        </div>
        
        {isCompleted ? (
          <div className="mt-4 w-full bg-[#36D837]/20 text-[#36D837] border-2 border-[#36D837] py-4 rounded font-bold uppercase tracking-wider text-center shrink-0">
            Misión Completada
          </div>
        ) : (
          <button onClick={checkAnswers} className="mt-4 w-full bg-[#242424] text-[#FEE202] py-4 rounded font-bold uppercase tracking-wider shadow-lg hover:bg-black transition-colors shrink-0">
            Validar Expediente
          </button>
        )}
      </div>
    );
  };

  const Mission3 = () => {
    const isCompleted = progress >= 3;
    const [stage, setStage] = useState(isCompleted ? 3 : 1);
    const [timeLeft, setTimeLeft] = useState(isCompleted ? 0 : 30);

    useEffect(() => {
      if (isCompleted) return;
      if(timeLeft <= 0) {
        setMsg({ title: 'El fugitivo escapó', message: 'No fuiste lo suficientemente rápido. Volviendo a intentar...', type: 'error'});
        setStage(1);
        setTimeLeft(30);
      }
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }, [timeLeft, isCompleted]);

    const handleFound = () => {
      if(stage < 3) {
        setStage(s => s + 1);
        setTimeLeft(30 - (stage * 5)); // Gets faster
      } else {
        completeMission(3, 200 + timeLeft*10);
      }
    };

    const positions = [
      { top: '20%', left: '70%' },
      { top: '65%', left: '15%' },
      { top: '80%', left: '80%' },
    ];

    return (
      <div className="flex flex-col flex-1 bg-black text-white relative pb-20">
        {isCompleted ? (
          <div className="absolute inset-0 z-40 bg-[#242424] flex flex-col items-center justify-center p-6 text-center">
            <Icon name="check" className="w-24 h-24 text-[#36D837] mb-6" />
            <h2 className="text-3xl font-bold text-[#36D837] mb-2 uppercase tracking-widest">Objetivo Localizado</h2>
            <p className="text-gray-300 font-mono text-sm">Transmisiones interceptadas con éxito. Las autoridades están en camino.</p>
          </div>
        ) : null}

        <div className="absolute top-4 left-4 z-10 bg-black/60 p-2 border border-red-500 rounded text-red-500 font-mono text-sm animate-pulse flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          REC {timeLeft}s
        </div>
        
        <div className="absolute top-4 right-4 z-10 bg-black/60 p-2 border border-[#FEE202] rounded text-[#FEE202] font-mono text-sm">
          Sector {stage}/3
        </div>

        <div className="flex-1 relative overflow-hidden bg-[#242424]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://placehold.co/800x800/242424/4F5C7C?text=CCTV+Feed+Noise')] bg-cover mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg, #272E3C 25%, transparent 25%, transparent 75%, #272E3C 75%, #272E3C), repeating-linear-gradient(45deg, #272E3C 25%, #242424 25%, #242424 75%, #272E3C 75%, #272E3C)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}></div>
          
          <button 
            onClick={handleFound}
            className="absolute w-8 h-8 flex items-center justify-center bg-[#FEE202] text-black rounded-full shadow-[0_0_15px_rgba(254,226,2,1)] z-20 hover:scale-110 transition-transform"
            style={positions[stage-1]}
          >
             <Icon name="batman" className="w-5 h-5" />
          </button>
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500/50 shadow-[0_0_10px_#36D837] animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>
        </div>

        <div className="bg-[#1C1B20] p-4 text-center font-mono text-xs text-gray-400">
          Oráculo: "Localiza la firma térmica del villano en el área (Círculo amarillo). Sé rápido."
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes scan { 0% { top: 0%; } 50% { top: 100%; } 100% { top: 0%; } }`}} />
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
        setTimeout(() => completeMission(4, 300), 1000);
      }
    };

    return (
      <div className="flex flex-col flex-1 bg-[#272E3C] relative overflow-hidden pb-20">
        {isCompleted ? (
          <div className="absolute inset-0 z-40 bg-[#242424] flex flex-col items-center justify-center p-6 text-center">
             <Icon name="check" className="w-24 h-24 text-[#36D837] mb-6" />
             <h2 className="text-3xl font-bold text-[#36D837] mb-2 uppercase tracking-widest">Anomalías Registradas</h2>
             <p className="text-gray-300 font-mono text-sm">Has encontrado la ubicación de la guarida. Prepárate para el Batman Day.</p>
          </div>
        ) : null}

        <div className="absolute inset-0 border-12 border-[#FEE202]/30 pointer-events-none z-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-[#36D837]/50 rounded-full flex items-center justify-center pointer-events-none z-20">
          <div className="w-1 h-4 bg-[#36D837]/50 absolute top-0"></div>
          <div className="w-1 h-4 bg-[#36D837]/50 absolute bottom-0"></div>
          <div className="w-4 h-1 bg-[#36D837]/50 absolute left-0"></div>
          <div className="w-4 h-1 bg-[#36D837]/50 absolute right-0"></div>
        </div>

        <header className="bg-black/80 text-white p-4 z-30 absolute top-0 w-full flex justify-between">
          <span className="font-mono text-sm text-[#FEE202]">SCANNER AR ACTIVO</span>
          <span className="font-mono text-sm">Anomalías: {found.filter(Boolean).length}/2</span>
        </header>

        <div className="absolute inset-0 bg-gray-800 bg-[url('https://placehold.co/600x800/1a1a1a/333333?text=Urban+Environment')] bg-cover bg-center">
           <button 
             onClick={() => handleFind(0)}
             className={`absolute top-[30%] left-[20%] w-16 h-16 rounded-full border-2 transition-all duration-500 z-10 ${found[0] ? 'border-[#36D837] bg-[#36D837]/40 scale-100' : 'border-[#FEE202] bg-[#FEE202]/10 scale-110 animate-pulse'}`}
           >
             {found[0] && <Icon name="check" className="w-8 h-8 text-white mx-auto" />}
           </button>
           <button 
             onClick={() => handleFind(1)}
             className={`absolute bottom-[25%] right-[15%] w-12 h-12 rounded-full border-2 transition-all duration-500 z-10 ${found[1] ? 'border-[#36D837] bg-[#36D837]/40 scale-100' : 'border-[#FEE202] bg-[#FEE202]/10 scale-110 animate-pulse delay-300'}`}
           >
             {found[1] && <Icon name="check" className="w-6 h-6 text-white mx-auto" />}
           </button>
        </div>

        <div className="absolute bottom-24 w-full px-6 z-30">
           <div className="bg-black/80 p-4 border border-[#FEE202] rounded text-sm text-center text-white">
             Busca rastros en el mobiliario urbano de tu sector. Pulsa sobre las distorsiones visuales.
           </div>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center h-full bg-[#1C1B20]">
      <Icon name="batman" className="w-16 h-16 text-[#FEE202] animate-bounce mb-4" />
      <div className="w-48 h-2 bg-gray-700 rounded overflow-hidden">
        <div className="h-full bg-[#FEE202] animate-[load_2s_ease-in-out_forwards]"></div>
      </div>
      <p className="mt-4 text-[#FEE202] font-mono text-sm uppercase tracking-widest">Estableciendo red...</p>
      <style dangerouslySetInnerHTML={{__html: `@keyframes load { 0% { width: 0%; } 100% { width: 100%; } }`}} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex justify-center font-sans">
      <style dangerouslySetInnerHTML={{__html: fontStyles}} />
      <style dangerouslySetInnerHTML={{__html: `
        .clip-hexagon { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
      `}} />

      <main className="w-full max-w-md h-dvh bg-[#242424] text-white relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* App Header (Only visible if logged in and not loading) */}
        {user && view !== 'loading' && (
          <header className="bg-[#242424] p-4 border-b border-[#FEE202] flex items-center justify-between shadow-lg z-10 shrink-0">
            <button 
              onClick={() => setShowProfileEdit(true)}
              className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity relative group"
            >
              <Icon name="batman" className="w-8 h-8 text-[#FEE202]" />
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="font-bold text-[#FEE202] leading-tight text-sm uppercase">{user.alias}</h2>
                  <Icon name="edit" className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-gray-400">Sector: {user.city}</p>
              </div>
            </button>
            <div className="flex flex-col gap-1 items-end min-w-30">
              <button 
                onClick={() => setScoreModal('individual')}
                className="flex justify-between items-center w-full bg-[#36D837]/10 hover:bg-[#36D837]/20 border border-[#36D837]/30 rounded px-2 py-1 transition-colors group"
              >
                <span className="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-gray-200">Personal</span>
                <span className="font-bold text-[#36D837] font-terminal text-sm ml-2">{score}</span>
              </button>
              <button 
                onClick={() => setScoreModal('collective')}
                className="flex justify-between items-center w-full bg-[#FEE202]/10 hover:bg-[#FEE202]/20 border border-[#FEE202]/30 rounded px-2 py-1 transition-colors group"
              >
                <span className="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-gray-200 truncate max-w-15 text-left">{user.city}</span>
                <span className="font-bold text-[#FEE202] font-terminal text-sm ml-2">
                  {(baseCityScores[user.city] + score).toLocaleString()}
                </span>
              </button>
            </div>
          </header>
        )}

        {/* Views */}
        {view === 'login' && renderLogin()}
        {view === 'loading' && renderLoading()}
        {view === 'dashboard' && renderDashboard()}
        {view === 'm1' && <Mission1 />}
        {view === 'm2' && <Mission2 />}
        {view === 'm3' && <Mission3 />}
        {view === 'm4' && <Mission4 />}
        {view === 'evidences' && renderEvidences()}

        {/* Global Navigation Footer */}
        {user && view !== 'loading' && (
          <div className="absolute bottom-0 w-full bg-[#1C1B20] border-t-2 border-[#FEE202] p-2 flex justify-around items-center z-50 shrink-0">
            <button 
              onClick={() => setView('dashboard')}
              className={`flex flex-col items-center p-2 rounded transition-colors ${view === 'dashboard' || view.startsWith('m') ? 'text-[#FEE202]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Icon name="home" className="w-6 h-6 mb-1" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Misiones</span>
            </button>
            <button 
              onClick={() => setView('evidences')}
              className={`flex flex-col items-center p-2 rounded transition-colors ${view === 'evidences' ? 'text-[#FEE202]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              <Icon name="board" className="w-6 h-6 mb-1" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Tablón</span>
            </button>
          </div>
        )}

        {/* Score Modals */}
        {scoreModal === 'individual' && (
          <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-[#36D837] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#36D837] uppercase tracking-widest">Desglose Personal</h2>
                <p className="text-gray-400 font-mono text-sm">Agente: {user.alias}</p>
              </div>
              <button onClick={() => setScoreModal(null)} className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full">
                <Icon name="x" className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4">
              {scoreLog.length === 0 ? (
                <p className="text-gray-500 font-mono text-center mt-10">No hay registros de puntuación aún.</p>
              ) : (
                scoreLog.map((log, i) => (
                  <div key={i} className="bg-[#242424] border border-gray-700 p-4 rounded flex items-center gap-4">
                    <div className="w-12 h-12 clip-hexagon flex items-center justify-center bg-gray-800 border-2 border-[#FEE202] text-[#FEE202] shrink-0">
                      <Icon name={log.badge.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Misión {log.mission}</p>
                      <p className="font-bold text-white text-sm leading-tight">{log.title}</p>
                      <p className="text-xs text-[#FEE202] mt-1">Insignia: {log.badge.name}</p>
                    </div>
                    <div className="font-terminal font-bold text-[#36D837] text-lg">
                      +{log.points}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 bg-[#36D837]/10 border border-[#36D837] p-4 flex justify-between items-center rounded">
              <span className="font-bold text-gray-300 uppercase">Puntuación Total</span>
              <span className="font-terminal text-2xl font-bold text-[#36D837]">{score}</span>
            </div>
          </div>
        )}

        {scoreModal === 'collective' && (() => {
          const rankings = Object.keys(baseCityScores).map(city => ({
            city,
            total: baseCityScores[city] + (user.city === city ? score : 0)
          })).sort((a, b) => b.total - a.total);

          return (
            <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6 border-b border-[#FEE202] pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#FEE202] uppercase tracking-widest">Ranking Global</h2>
                  <p className="text-gray-400 font-mono text-sm">Estado de la red</p>
                </div>
                <button onClick={() => setScoreModal(null)} className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-full">
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                {rankings.map((r, i) => (
                  <div key={r.city} className={`border p-4 rounded flex items-center gap-4 ${r.city === user.city ? 'bg-[#FEE202]/20 border-[#FEE202]' : 'bg-[#242424] border-gray-700'}`}>
                    <div className="font-terminal text-2xl font-bold text-gray-500 w-8 text-center">{i + 1}º</div>
                    <div className="flex-1">
                      <p className={`font-bold text-lg uppercase tracking-wider ${r.city === user.city ? 'text-[#FEE202]' : 'text-white'}`}>{r.city}</p>
                    </div>
                    <div className={`font-terminal font-bold text-xl ${r.city === user.city ? 'text-[#FEE202]' : 'text-gray-400'}`}>
                      {r.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center p-4 bg-[#242424] border border-[#FEE202] rounded">
                <p className="text-sm text-gray-300">Compite junto a los Bat-Vigilantes de tu ciudad por el primer puesto. Tu participación es clave.</p>
              </div>
            </div>
          );
        })()}

        {/* Profile Edit Modal */}
        {showProfileEdit && (
          <div className="absolute inset-0 z-50 bg-[#1C1B20]/95 backdrop-blur flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
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
                  <input 
                    name="newAlias" 
                    type="text" 
                    defaultValue={user.alias}
                    autoFocus
                    required 
                    className="w-full bg-[#272E3C] border border-gray-600 rounded p-3 text-white focus:outline-none focus:border-[#FEE202] uppercase" 
                  />
                </div>
                <button type="submit" className="w-full bg-[#FEE202] text-[#242424] font-bold uppercase tracking-wider py-3 rounded shadow-[0_0_15px_rgba(254,226,2,0.3)] hover:bg-yellow-400 transition-colors mt-2">
                  Guardar Cambios
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Global Message Box */}
        {msg && <MessageBox {...msg} onClose={() => setMsg(null)} />}

      </main>
    </div>
  );
}