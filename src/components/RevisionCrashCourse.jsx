import React, { useState } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Compass, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';
import { 
  fourHourPlan, 
  examDayTactics, 
  commonMistakeChecklist, 
  conceptsMissingFromNotes 
} from '../data/revisionData.js';

export default function RevisionCrashCourse() {
  const [activeTab, setActiveTab] = useState('plan'); // 'plan', 'traps', 'tactics', 'checklist'
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
      <div className="card" style={{ borderLeft: '4px solid var(--accent-amber)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-rank" style={{ color: 'var(--accent-amber)' }}>
                NIGHT BEFORE EXAM
              </span>
              <span className="badge badge-marks">
                High-Yield Focus
              </span>
            </div>
            <h1 style={{ fontSize: '22px', marginBottom: '6px' }}>
              4-Hour Revision Crash Course & Examiner Traps
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Sized so that 4 hours of focused study covers 80%+ of the quiz syllabus. Drill the high-frequency patterns and avoid the 5 classic traps!
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              className={`btn-secondary ${activeTab === 'plan' ? 'active' : ''}`}
              onClick={() => setActiveTab('plan')}
              style={{ borderColor: activeTab === 'plan' ? 'var(--accent-amber)' : 'var(--border-subtle)' }}
            >
              <Clock size={16} />
              <span>4-Hour Plan</span>
            </button>
            <button
              className={`btn-secondary ${activeTab === 'traps' ? 'active' : ''}`}
              onClick={() => setActiveTab('traps')}
              style={{ borderColor: activeTab === 'traps' ? 'var(--accent-rose)' : 'var(--border-subtle)' }}
            >
              <AlertTriangle size={16} />
              <span>Examiner Traps (5 Gaps)</span>
            </button>
            <button
              className={`btn-secondary ${activeTab === 'tactics' ? 'active' : ''}`}
              onClick={() => setActiveTab('tactics')}
              style={{ borderColor: activeTab === 'tactics' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
            >
              <Zap size={16} />
              <span>Exam-Day Tactics</span>
            </button>
            <button
              className={`btn-secondary ${activeTab === 'checklist' ? 'active' : ''}`}
              onClick={() => setActiveTab('checklist')}
              style={{ borderColor: activeTab === 'checklist' ? 'var(--accent-emerald)' : 'var(--border-subtle)' }}
            >
              <ShieldCheck size={16} />
              <span>Pre-Submission Checklist ({checkedCount}/{commonMistakeChecklist.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: 4-HOUR CRASH PLAN */}
      {activeTab === 'plan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {fourHourPlan.map((h) => (
            <div key={h.hour} className="card" style={{ borderLeft: '4px solid var(--accent-indigo)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <h3 style={{ fontSize: '18px', color: 'var(--text-primary)' }}>
                  {h.title}
                </h3>
                <span className="badge badge-marks">
                  {h.timeAllocated}
                </span>
              </div>

              {/* Topics */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {h.targetTopics.map((top, idx) => (
                  <span key={idx} style={{ background: 'var(--bg-elevated)', padding: '3px 10px', borderRadius: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {top}
                  </span>
                ))}
              </div>

              {/* Core Facts to Memorise */}
              <div className="sim-state-box" style={{ marginBottom: '14px' }}>
                <div className="sim-state-label" style={{ color: 'var(--accent-cyan)' }}>
                  🧠 Facts to Memorise
                </div>
                <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {h.memorizeFacts.map((fact, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{fact}</li>
                  ))}
                </ul>
              </div>

              {/* Drill Action */}
              <div style={{
                background: 'rgba(99, 102, 241, 0.1)',
                borderLeft: '3px solid var(--accent-indigo)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                color: 'var(--text-primary)'
              }}>
                <strong style={{ color: 'var(--accent-indigo)' }}>⚡ Practical Drill: </strong>
                {h.drill}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: EXAMINER TRAPS & GAPS */}
      {activeTab === 'traps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="callout callout-trap" style={{ margin: 0 }}>
            <div className="callout-header">
              <AlertTriangle size={18} /> Why Standard Notes Fail on These 5 Topics
            </div>
            <div className="callout-body">
              Official textbook notes cover theoretical definitions, but past year exam papers (2024 to 2026) repeatedly tested subtle edge cases where mechanical execution fails. Study these 5 traps carefully!
            </div>
          </div>

          {conceptsMissingFromNotes.map((gap) => (
            <div key={gap.id} className="card" style={{ borderLeft: '4px solid var(--accent-rose)' }}>
              <h3 style={{ fontSize: '17px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {gap.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--accent-rose)' }}>The Trap: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{gap.trap}</span>
                </div>

                <div style={{ background: 'var(--bg-elevated)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--accent-cyan)' }}>Real Exam Example: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{gap.example}</span>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px' }}>
                  <strong style={{ color: 'var(--accent-emerald)' }}>The Fix & Proper Procedure: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>{gap.fix}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: EXAM-DAY TACTICS */}
      {activeTab === 'tactics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {examDayTactics.map((tac, idx) => (
            <div key={idx} className="card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>
                {tac.title}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {tac.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PRE-SUBMISSION CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} style={{ color: 'var(--accent-emerald)' }} />
              Pre-Submission Verification Checklist
            </h3>
            <span style={{ fontSize: '13px', fontWeight: 700, color: checkedCount === commonMistakeChecklist.length ? 'var(--accent-emerald)' : 'var(--accent-cyan)' }}>
              {checkedCount} of {commonMistakeChecklist.length} Checked
            </span>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Check each of these 9 questions before you submit your answers in the exam:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {commonMistakeChecklist.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: isChecked ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-elevated)',
                    border: `1px solid ${isChecked ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${isChecked ? 'var(--accent-emerald)' : 'var(--text-dim)'}`,
                    background: isChecked ? 'var(--accent-emerald)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isChecked && <CheckCircle2 size={15} style={{ color: '#fff' }} />}
                  </div>

                  <span style={{
                    fontSize: '14px',
                    color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: isChecked ? 'line-through' : 'none'
                  }}>
                    {item}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
