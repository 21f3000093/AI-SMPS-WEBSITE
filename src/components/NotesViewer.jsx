import React, { useState } from 'react';
import { 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  AlertTriangle, 
  Brain, 
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
  Scissors,
  Box,
  Cpu,
  Compass,
  Quote
} from 'lucide-react';
import { courseModules } from '../data/notesData.js';

export default function NotesViewer({ 
  selectedModuleId, 
  setSelectedModuleId, 
  completedModules = [], 
  toggleModuleComplete 
}) {
  const currentModule = courseModules.find(m => m.id === selectedModuleId) || courseModules[0];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState({});

  const currentIndex = courseModules.findIndex(m => m.id === currentModule.id);
  const prevModule = currentIndex > 0 ? courseModules[currentIndex - 1] : null;
  const nextModule = currentIndex < courseModules.length - 1 ? courseModules[currentIndex + 1] : null;

  const isCompleted = completedModules.includes(currentModule.id);

  const handleSelectAnswer = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleQuizSubmit = (qId) => {
    setQuizSubmitted(prev => ({
      ...prev,
      [qId]: true
    }));
  };

  // Render SVG diagram based on module
  const renderDiagram = (week) => {
    if (week === 1) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '24px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Diagram 1.1: 3 Concentric Layers of an Autonomous Agent (Khemani)
          </h4>
          <svg viewBox="0 0 520 250" style={{ maxWidth: '100%', height: 'auto' }}>
            {/* Outer Layer: Signal Processing */}
            <rect x="20" y="20" width="480" height="210" rx="16" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="40" y="46" fill="#f43f5e" fontWeight="bold" fontSize="12.5px">OUTER LAYER: Signal Processing (Sensors & Effectors)</text>
            <text x="40" y="66" fill="var(--text-muted)" fontSize="11px">Raw Signals: Photons, Sound Waves, Motor Currents (Vision, Audio, Robot Control)</text>

            {/* Middle Layer: Neuro-Fuzzy */}
            <rect x="70" y="85" width="380" height="125" rx="12" fill="rgba(99, 102, 241, 0.1)" stroke="#6366f1" strokeWidth="1.5" />
            <text x="90" y="110" fill="#6366f1" fontWeight="bold" fontSize="12.5px">MIDDLE LAYER: Neuro-Fuzzy (Signal ↔ Symbol Mapping)</text>
            <text x="90" y="128" fill="var(--text-muted)" fontSize="11px">Deep Neural Nets, Classifiers: Raw Image → Symbol "Cat"</text>

            {/* Inner Layer: Symbolic Reasoning / GOFAI */}
            <rect x="120" y="140" width="280" height="52" rx="8" fill="rgba(6, 182, 212, 0.2)" stroke="#06b6d4" strokeWidth="2" />
            <text x="260" y="165" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="13px">
              INNER LAYER: Symbolic Reasoning (GOFAI)
            </text>
            <text x="260" y="181" textAnchor="middle" fill="var(--text-primary)" fontSize="11px">
              Search, A*, Minimax, Planning & CSPs live HERE!
            </text>
          </svg>
        </div>
      );
    } else if (week === 2) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 2.1: Memory Footprint — DFS Linear Stack vs BFS Exponential Queue
          </h4>
          <svg viewBox="0 0 500 160" style={{ maxWidth: '100%', height: 'auto' }}>
            {/* DFS Stack */}
            <rect x="30" y="30" width="200" height="100" rx="8" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1.5" />
            <text x="130" y="55" textAnchor="middle" fill="#10b981" fontWeight="bold" fontSize="13px">DFS: Linear Space O(b * m)</text>
            <text x="130" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="11.5px">Stores only Current Path + Siblings</text>
            <text x="130" y="98" textAnchor="middle" fill="var(--accent-emerald)" fontFamily="var(--font-mono)" fontSize="12px">Memory: ~ O(bm) bytes</text>

            {/* BFS Queue */}
            <rect x="270" y="30" width="200" height="100" rx="8" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="370" y="55" textAnchor="middle" fill="#f43f5e" fontWeight="bold" fontSize="13px">BFS: Exponential Space O(b^d)</text>
            <text x="370" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="11.5px">Must hold Entire Frontier in OPEN</text>
            <text x="370" y="98" textAnchor="middle" fill="var(--accent-rose)" fontFamily="var(--font-mono)" fontSize="12px">Memory: ~ b^d nodes!</text>
          </svg>
        </div>
      );
    } else if (week === 5) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 5.1: A* Cost Decomposition f(n) = g(n) + h(n)
          </h4>
          <svg viewBox="0 0 460 140" style={{ maxWidth: '100%', height: 'auto' }}>
            <line x1="60" y1="65" x2="230" y2="65" stroke="#3b82f6" strokeWidth="3" />
            <line x1="230" y1="65" x2="400" y2="65" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 4" />
            
            <circle cx="60" cy="65" r="18" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <text x="60" y="69" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13px">S</text>
            <text x="60" y="98" textAnchor="middle" fill="var(--text-muted)" fontSize="11px">Start</text>

            <circle cx="230" cy="65" r="18" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
            <text x="230" y="69" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13px">n</text>
            <text x="230" y="98" textAnchor="middle" fill="#f59e0b" fontSize="11px" fontWeight="bold">Current Node</text>

            <circle cx="400" cy="65" r="18" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text x="400" y="69" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13px">G</text>
            <text x="400" y="98" textAnchor="middle" fill="var(--text-muted)" fontSize="11px">Goal</text>

            <text x="145" y="48" textAnchor="middle" fill="#3b82f6" fontWeight="bold" fontSize="12.5px">g(n) = Exact Cost from Start</text>
            <text x="315" y="48" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="12.5px">h(n) = Heuristic Estimate</text>
            <text x="230" y="125" textAnchor="middle" fill="var(--text-primary)" fontWeight="bold" fontSize="12px">Total Estimated Cost f(n) = g(n) + h(n)</text>
          </svg>
        </div>
      );
    } else if (week === 6) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 6.1: Monotone / Consistent Heuristic — Triangle Inequality
          </h4>
          <svg viewBox="0 0 440 160" style={{ maxWidth: '100%', height: 'auto' }}>
            <line x1="80" y1="110" x2="220" y2="40" stroke="#3b82f6" strokeWidth="2" />
            <line x1="220" y1="40" x2="360" y2="110" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="80" y1="110" x2="360" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />

            <circle cx="80" cy="110" r="16" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <text x="80" y="114" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">m</text>

            <circle cx="220" cy="40" r="16" fill="#6366f1" stroke="#fff" strokeWidth="2" />
            <text x="220" y="44" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">n</text>

            <circle cx="360" cy="110" r="16" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text x="360" y="114" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">G</text>

            <text x="140" y="65" fill="#3b82f6" fontWeight="bold" fontSize="11.5px">Edge Cost k(m,n)</text>
            <text x="305" y="65" fill="#10b981" fontWeight="bold" fontSize="11.5px">h(n)</text>
            <text x="220" y="132" fill="#f59e0b" fontWeight="bold" fontSize="12px">h(m) ≤ k(m,n) + h(n)</text>
          </svg>
        </div>
      );
    } else if (week === 7) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 7.1: Alpha-Beta Pruning Rules (Trigger: α ≥ β)
          </h4>
          <svg viewBox="0 0 460 150" style={{ maxWidth: '100%', height: 'auto' }}>
            <rect x="30" y="25" width="190" height="100" rx="8" fill="rgba(6, 182, 212, 0.08)" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="125" y="50" textAnchor="middle" fill="#06b6d4" fontWeight="bold" fontSize="13px">ALPHA CUT (β-Pruning)</text>
            <text x="125" y="72" textAnchor="middle" fill="var(--text-secondary)" fontSize="11.5px">Occurs at: <strong>MIN Node</strong></text>
            <text x="125" y="92" textAnchor="middle" fill="var(--text-muted)" fontSize="11px">When: α ≥ β</text>
            <text x="125" y="112" textAnchor="middle" fill="var(--accent-cyan)" fontSize="11px">Prunes: Remaining MIN children</text>

            <rect x="240" y="25" width="190" height="100" rx="8" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="335" y="50" textAnchor="middle" fill="#f43f5e" fontWeight="bold" fontSize="13px">BETA CUT (α-Pruning)</text>
            <text x="335" y="72" textAnchor="middle" fill="var(--text-secondary)" fontSize="11.5px">Occurs at: <strong>MAX Node</strong></text>
            <text x="335" y="92" textAnchor="middle" fill="var(--text-muted)" fontSize="11px">When: α ≥ β</text>
            <text x="335" y="112" textAnchor="middle" fill="var(--accent-rose)" fontSize="11px">Prunes: Remaining MAX children</text>
          </svg>
        </div>
      );
    } else if (week === 9) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 9.1: AND-OR Goal Tree Architecture
          </h4>
          <svg viewBox="0 0 460 160" style={{ maxWidth: '100%', height: 'auto' }}>
            <line x1="230" y1="35" x2="130" y2="105" stroke="var(--border-medium)" strokeWidth="2" />
            <line x1="230" y1="35" x2="330" y2="105" stroke="var(--border-medium)" strokeWidth="2" />

            <circle cx="230" cy="35" r="18" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <text x="230" y="39" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11px">OR</text>
            <text x="230" y="15" textAnchor="middle" fill="var(--text-muted)" fontSize="10.5px">Choose Any 1 Alternative</text>

            <circle cx="130" cy="105" r="18" fill="#6366f1" stroke="#fff" strokeWidth="2" />
            <text x="130" y="109" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11px">AND</text>
            <path d="M 118 120 A 16 16 0 0 0 142 120" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
            <text x="130" y="142" textAnchor="middle" fill="var(--accent-amber)" fontSize="10.5px">Must Solve ALL</text>

            <circle cx="330" cy="105" r="18" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text x="330" y="109" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="11px">SOLV</text>
            <text x="330" y="142" textAnchor="middle" fill="var(--accent-emerald)" fontSize="10.5px">Primitive Goal</text>
          </svg>
        </div>
      );
    } else if (week === 11) {
      return (
        <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
          <h4 style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '14px', textTransform: 'uppercase' }}>
            Diagram 11.1: Binary Constraint Network (Map Colouring CSP)
          </h4>
          <svg viewBox="0 0 460 160" style={{ maxWidth: '100%', height: 'auto' }}>
            <line x1="120" y1="80" x2="230" y2="35" stroke="var(--border-medium)" strokeWidth="2" />
            <line x1="230" y1="35" x2="340" y2="80" stroke="var(--border-medium)" strokeWidth="2" />
            <line x1="120" y1="80" x2="230" y2="125" stroke="var(--border-medium)" strokeWidth="2" />
            <line x1="340" y1="80" x2="230" y2="125" stroke="var(--border-medium)" strokeWidth="2" />
            <line x1="230" y1="35" x2="230" y2="125" stroke="var(--border-medium)" strokeWidth="2" />

            <circle cx="120" cy="80" r="18" fill="#06b6d4" stroke="#fff" strokeWidth="2" />
            <text x="120" y="84" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">A</text>

            <circle cx="230" cy="35" r="18" fill="#6366f1" stroke="#fff" strokeWidth="2" />
            <text x="230" y="39" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">B</text>

            <circle cx="340" cy="80" r="18" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
            <text x="340" y="84" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">C</text>

            <circle cx="230" cy="125" r="18" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text x="230" y="129" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12px">D</text>

            <text x="175" y="50" fill="#f43f5e" fontWeight="bold" fontSize="12px">≠</text>
            <text x="285" y="50" fill="#f43f5e" fontWeight="bold" fontSize="12px">≠</text>
            <text x="175" y="110" fill="#f43f5e" fontWeight="bold" fontSize="12px">≠</text>
            <text x="285" y="110" fill="#f43f5e" fontWeight="bold" fontSize="12px">≠</text>
            <text x="236" y="85" fill="#f43f5e" fontWeight="bold" fontSize="12px">≠</text>
          </svg>
        </div>
      );
    }
    return null;
  };

  // Helper to render structured content blocks
  const renderBlocks = (blocks) => {
    if (!blocks || blocks.length === 0) {
      return (
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75, fontSize: '15px', color: 'var(--text-secondary)' }}>
          {currentModule.rawText}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {blocks.map((block, idx) => {
          if (block.type === 'heading') {
            const isH2 = block.level === 2;
            return isH2 ? (
              <h2 key={idx} style={{
                fontSize: '20px',
                marginTop: idx === 0 ? '0' : '24px',
                marginBottom: '4px',
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '8px'
              }}>
                {block.text}
              </h2>
            ) : (
              <h3 key={idx} style={{
                fontSize: '16.5px',
                marginTop: '16px',
                marginBottom: '2px',
                color: 'var(--accent-cyan)'
              }}>
                {block.text}
              </h3>
            );
          }

          if (block.type === 'callout') {
            const cType = block.calloutType || 'theory';
            let icon = <Brain size={18} />;
            if (cType === 'intuition') icon = <Sparkles size={18} />;
            if (cType === 'trap') icon = <AlertTriangle size={18} />;
            if (cType === 'tip') icon = <Flame size={18} />;
            if (cType === 'exam') icon = <CheckCircle2 size={18} />;
            if (cType === 'quote') icon = <Quote size={18} />;

            return (
              <div key={idx} className={`callout callout-${cType}`} style={{ margin: '8px 0' }}>
                <div className="callout-header">
                  {icon}
                  <span>{block.title}</span>
                </div>
                <div className="callout-body" style={{ whiteSpace: 'pre-wrap' }}>
                  {block.content}
                </div>
              </div>
            );
          }

          if (block.type === 'bullet_list') {
            return (
              <ul key={idx} style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === 'numbered_list') {
            return (
              <ol key={idx} style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '6px', margin: '4px 0' }}>
                {block.items.map((item, iIdx) => (
                  <li key={iIdx} style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item}
                  </li>
                ))}
              </ol>
            );
          }

          if (block.type === 'table') {
            return (
              <div key={idx} className="notes-table-container">
                <table className="notes-table">
                  {block.headers && block.headers.length > 0 && (
                    <thead>
                      <tr>
                        {block.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {block.rows && block.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          // Default paragraph
          return (
            <p key={idx} style={{ fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: '2px 0' }}>
              {block.text}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Chapter Banner */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-term">
                {currentModule.week === 0 ? "FOUNDATION" : `WEEK ${currentModule.week}`}
              </span>
              <span className="badge badge-marks">
                {currentModule.examWeight}
              </span>
            </div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
              {currentModule.title}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              {currentModule.subtitle}
            </p>
          </div>

          <button
            onClick={() => toggleModuleComplete(currentModule.id)}
            className={`btn-secondary ${isCompleted ? 'active' : ''}`}
            style={{
              borderColor: isCompleted ? 'var(--accent-emerald)' : 'var(--border-subtle)',
              color: isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{isCompleted ? 'Module Completed' : 'Mark as Read'}</span>
          </button>
        </div>

        {/* Summary Card */}
        <div style={{
          marginTop: '18px',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.6
        }}>
          <strong style={{ color: 'var(--accent-cyan)' }}>Module Summary: </strong>
          {currentModule.summary}
        </div>
      </div>

      {/* Embedded Architectural Diagram */}
      {renderDiagram(currentModule.week)}

      {/* Structured Content Card */}
      <div className="card" style={{ padding: '28px' }}>
        {renderBlocks(currentModule.blocks)}
      </div>

      {/* Interactive Checkpoint Quiz */}
      {currentModule.checkpointQuiz && currentModule.checkpointQuiz.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid var(--accent-indigo)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} style={{ color: 'var(--accent-indigo)' }} />
            Quick Checkpoint Quiz (Test Your Understanding)
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Solve these instant questions to ensure you have mastered the core concepts of this week.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentModule.checkpointQuiz.map((q, idx) => {
              const selected = selectedAnswers[q.id];
              const submitted = quizSubmitted[q.id];
              const isCorrect = selected === q.answer;

              return (
                <div key={q.id} style={{ background: 'var(--bg-base)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                    Q{idx + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      let optBg = 'var(--bg-elevated)';
                      let optBorder = 'var(--border-subtle)';

                      if (submitted) {
                        if (optIdx === q.answer) {
                          optBg = 'rgba(16, 185, 129, 0.15)';
                          optBorder = 'var(--accent-emerald)';
                        } else if (selected === optIdx) {
                          optBg = 'rgba(244, 63, 94, 0.15)';
                          optBorder = 'var(--accent-rose)';
                        }
                      } else if (selected === optIdx) {
                        optBg = 'rgba(6, 182, 212, 0.15)';
                        optBorder = 'var(--accent-cyan)';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => !submitted && handleSelectAnswer(q.id, optIdx)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            background: optBg,
                            border: `1px solid ${optBorder}`,
                            cursor: submitted ? 'default' : 'pointer',
                            fontSize: '13.5px',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            border: `2px solid ${selected === optIdx ? 'var(--accent-cyan)' : 'var(--text-dim)'}`,
                            background: selected === optIdx ? 'var(--accent-cyan)' : 'transparent',
                            flexShrink: 0
                          }} />
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  {!submitted ? (
                    <button
                      className="btn-primary"
                      onClick={() => handleQuizSubmit(q.id)}
                      disabled={selected === undefined}
                      style={{ marginTop: '12px', opacity: selected === undefined ? 0.5 : 1 }}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <div style={{
                      marginTop: '14px',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                      borderLeft: `3px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
                    }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)', marginBottom: '4px' }}>
                        {isCorrect ? '✓ Sahi Jawab! (Correct)' : '✗ Galat Jawab!'}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
        {prevModule ? (
          <button
            className="btn-secondary"
            onClick={() => {
              setSelectedModuleId(prevModule.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <ChevronLeft size={16} />
            <span>Previous: {prevModule.title.split(':')[0]}</span>
          </button>
        ) : <div />}

        {nextModule && (
          <button
            className="btn-primary"
            onClick={() => {
              setSelectedModuleId(nextModule.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Next: {nextModule.title.split(':')[0]}</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
