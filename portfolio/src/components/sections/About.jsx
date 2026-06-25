import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, MapPin } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../ui/SectionWrapper';
import Tilt from '../ui/Tilt';

const STATS = [
  { value: '10+', label: 'Projects Completed', icon: '🚀' },
  { value: '15+', label: 'Technologies Used', icon: '⚡' },
  { value: '3+', label: 'Years Learning', icon: '📚' },
  { value: '100%', label: 'Passion for Code', icon: '❤️' },
];

const INFO_ITEMS = [
  {
    icon: GraduationCap,
    label: 'Degree',
    value: 'Computer Engineering',
    sub: 'Canadian Institute of Technology, 2025–Present',
    color: '#6366f1',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide',
    sub: 'Open to remote & hybrid roles',
    color: '#06b6d4',
  },
  {
    icon: Target,
    label: 'Goal',
    value: 'Software Engineer @ Top Tech',
    sub: 'Focused on impactful, scalable products',
    color: '#8b5cf6',
  },
];

/**
 * About section — professional summary, education info, career goals, and stats.
 * Features an interactive terminal CLI emulator.
 */
export default function About() {
  const [isTerminal, setIsTerminal] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "Bjorni's Terminal [Version 1.0.0]", type: 'info' },
    { text: "Type 'help' to view all available commands.", type: 'info' },
    { text: "", type: 'info' },
  ]);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTerminal]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const promptStr = window.innerWidth < 640 ? 'visitor:~$' : 'visitor@bjornitare:~$';
    const newHistory = [...terminalHistory, { text: `${promptStr} ${terminalInput}`, type: 'input' }];

    switch (cmd) {
      case 'help':
        newHistory.push(
          { text: "Available commands:", type: 'output' },
          { text: "  about      - Brief introduction about Bjorni Tare", type: 'output' },
          { text: "  skills     - Technical stack overview", type: 'output' },
          { text: "  experience - Work timeline milestones", type: 'output' },
          { text: "  contact    - Email, GitHub, and LinkedIn links", type: 'output' },
          { text: "  clear      - Clear terminal history", type: 'output' },
          { text: "  exit       - Return to visual code window", type: 'output' },
        );
        break;
      case 'about':
        newHistory.push(
          { text: "Bjorni Tare — Computer Engineering Student & Full Stack Developer.", type: 'output' },
          { text: "Enjoys solving complex problems, building scalable web systems, and crafting responsive visual code.", type: 'output' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: "Frontend:  React.js, Tailwind CSS, Responsive Web Design", type: 'output' },
          { text: "Backend:   Node.js, MongoDB, Firebase, WebSockets, JWT Auth", type: 'output' },
          { text: "Tools:     Git, GitHub, Cisco CCNA Networking, IntelliJ IDEA", type: 'output' }
        );
        break;
      case 'experience':
        newHistory.push(
          { text: "• Front-end Web Developer @ Nebula LTD (04/2025 - Present)", type: 'output' },
          { text: "• Web Developer Intern @ Nebula LTD (08/2024 - 04/2025)", type: 'output' },
          { text: "• Customer Service Representative @ Hertz Albania (01/2024 - 08/2024)", type: 'output' }
        );
        break;
      case 'contact':
        newHistory.push(
          { text: "Email:    btare99@gmail.com", type: 'output' },
          { text: "GitHub:   https://github.com/btare99", type: 'output' },
          { text: "LinkedIn: https://linkedin.com/in/bjornitare", type: 'output' }
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'exit':
        setIsTerminal(false);
        setTerminalInput('');
        return;
      default:
        newHistory.push({ text: `shell: command not found: ${cmd}. Type 'help' for options.`, type: 'error' });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <SectionWrapper id="about" className="bg-transparent">
      <SectionHeader
        tag="About Me"
        title={<>Who I <span className="gradient-text">Am</span></>}
        subtitle="A passionate Computer Engineering student building the future, one line of code at a time."
      />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Text content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              I'm a <span className="text-white font-medium">Computer Engineering student</span> with a
              deep passion for building robust, scalable software. I thrive at the intersection of{' '}
              <span className="text-indigo-400">clean architecture</span> and{' '}
              <span className="text-cyan-400">delightful user experience</span>.
            </p>
            <p>
              My journey started with curiosity — debugging my first "Hello World" and never stopping.
              Since then, I've built full-stack web platforms, mobile applications, and backend APIs
              that solve real-world problems. I'm driven by impact: software that makes people's
              lives measurably better.
            </p>
            <p>
              Beyond the keyboard, I'm an avid learner who stays ahead of industry trends, contributes
              to open-source projects, and mentors peers in my university's tech community.
            </p>
          </div>

          {/* Info cards */}
          <div className="space-y-3 pt-2">
            {INFO_ITEMS.map(({ icon: Icon, label, value, sub, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 card glass-hover rounded-xl"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                  <p className="text-slate-500 text-xs">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Stats + visual */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map(({ value, label, icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="card glass-hover p-6 rounded-2xl text-center group"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-xs text-slate-500 leading-tight">{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Code snippet visual wrapped in Tilt */}
          <Tilt>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden border border-indigo-500/15"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/3 border-b border-white/5 relative z-20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  <span className="font-mono text-xs text-slate-500 ml-2">
                    {isTerminal ? 'terminal.sh' : 'developer.js'}
                  </span>
                </div>
                <button
                  onClick={() => setIsTerminal(!isTerminal)}
                  className="text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-500/15 border border-indigo-500/35 hover:bg-indigo-500/30 transition-all duration-300 text-indigo-300 px-2 py-0.5 rounded cursor-pointer"
                >
                  {isTerminal ? 'Show Code' : 'Try Terminal'}
                </button>
              </div>

              {/* Terminal / Code Body */}
              <div 
                className="p-5 font-mono text-xs sm:text-sm leading-6 sm:leading-7 min-h-[220px] max-h-[300px] overflow-y-auto overflow-x-auto cursor-text bg-black/40 relative z-10"
                onClick={handleTerminalClick}
              >
                {isTerminal ? (
                  <div className="space-y-1.5 text-slate-300">
                    {terminalHistory.map((line, idx) => (
                      <div key={idx} className={
                        line.type === 'error' ? 'text-red-400' :
                        line.type === 'input' ? 'text-white' :
                        line.type === 'info' ? 'text-slate-500 text-xs' : 'text-slate-300'
                      }>
                        {line.text}
                      </div>
                    ))}
                    
                    <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 pt-1 text-white">
                      <span className="text-emerald-400 select-none text-xs sm:text-sm hidden sm:inline">visitor@bjornitare:~$</span>
                      <span className="text-emerald-400 select-none text-xs sm:text-sm inline sm:hidden">visitor:~$</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={terminalInput}
                        onChange={e => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 font-mono text-xs sm:text-sm caret-indigo-400 focus:outline-none"
                        autoFocus
                      />
                    </form>
                    <div ref={terminalEndRef} />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p><span className="text-purple-400">const</span> <span className="text-cyan-300">developer</span> <span className="text-white">= {'{'}</span></p>
                    <p className="pl-4"><span className="text-slate-400">name</span><span className="text-white">: </span><span className="text-green-400">"Bjorni Tare"</span><span className="text-white">,</span></p>
                    <p className="pl-4"><span className="text-slate-400">role</span><span className="text-white">: </span><span className="text-green-400">"Full Stack Developer"</span><span className="text-white">,</span></p>
                    <p className="pl-4"><span className="text-slate-400">stack</span><span className="text-white">: [</span><span className="text-yellow-300">"React"</span><span className="text-white">, </span><span className="text-yellow-300">"Node.js"</span><span className="text-white">, </span><span className="text-yellow-300">"..."</span><span className="text-white">],</span></p>
                    <p className="pl-4"><span className="text-slate-400">available</span><span className="text-white">: </span><span className="text-orange-400">true</span><span className="text-white">,</span></p>
                    <p className="pl-4"><span className="text-slate-400">passion</span><span className="text-white">: </span><span className="text-green-400">"Building great products"</span></p>
                    <p><span className="text-white">{'}'}</span><span className="text-slate-500">;</span></p>
                  </div>
                )}
              </div>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
