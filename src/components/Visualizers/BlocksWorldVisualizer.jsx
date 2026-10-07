import React, { useState } from 'react';
import { Layers, ChevronRight, ChevronLeft, RotateCcw, AlertTriangle, CheckCircle2, Box } from 'lucide-react';

export default function BlocksWorldVisualizer() {
  const [scenario, setScenario] = useState('sussman');
  const [step, setStep] = useState(0);

  // Sussman's Anomaly Step-by-Step Simulation
  // Start: C on A, A on Table, B on Table, armEmpty
  // Goal: On(A, B) and On(B, C)
  const sussmanSteps = [
    {
      step: 0,
      title: "Initial State & Goal Stack Push",
      state: { onTable: ['A', 'B'], on: [['C', 'A']], clear: ['B', 'C'], holding: null, armEmpty: true },
      stack: ['On(A,B)', 'On(B,C)', '{On(A,B), On(B,C)}'],
      action: "Start state: C is on A, B is on Table, A is on Table. Push compound goal {On(A,B), On(B,C)}, then individual subgoals. Top of stack = On(A, B).",
      trap: null
    },
    {
      step: 1,
      title: "Attempting Subgoal 1: On(A, B)",
      state: { onTable: ['A', 'B'], on: [['C', 'A']], clear: ['B', 'C'], holding: null, armEmpty: true },
      stack: ['holding(A)', 'clear(B)', 'Stack(A,B)', 'On(B,C)', '...'],
      action: "To achieve On(A,B), action is Stack(A,B). Push preconditions: holding(A) and clear(B).",
      trap: null
    },
    {
      step: 2,
      title: "Precondition holding(A) requires Unstack(C, A)",
      state: { onTable: ['A', 'B'], on: [], clear: ['A', 'B'], holding: 'C', armEmpty: false },
      stack: ['clear(A)', 'Pickup(A)', 'clear(B)', 'Stack(A,B)', 'On(B,C)', '...'],
      action: "A is NOT clear (C is on A!). Must Unstack(C, A). Arm picks up C.",
      plan: ['Unstack(C, A)', 'Putdown(C)'],
      trap: null
    },
    {
      step: 3,
      title: "Putdown C and Pickup A",
      state: { onTable: ['A', 'B', 'C'], on: [], clear: ['B', 'C'], holding: 'A', armEmpty: false },
      stack: ['clear(B)', 'Stack(A,B)', 'On(B,C)', '...'],
      action: "Putdown(C) on table. Now A is clear! Execute Pickup(A). Arm now holds A.",
      plan: ['Unstack(C, A)', 'Putdown(C)', 'Pickup(A)'],
      trap: null
    },
    {
      step: 4,
      title: "Execute Stack(A, B) -> Goal 1 Achieved!",
      state: { onTable: ['B', 'C'], on: [['A', 'B']], clear: ['A', 'C'], holding: null, armEmpty: true },
      stack: ['On(B,C)', '{On(A,B), On(B,C)}'],
      action: "Stack(A, B) succeeds! A is now on B. Subgoal On(A, B) is TRUE. Plan so far has 4 actions.",
      plan: ['Unstack(C, A)', 'Putdown(C)', 'Pickup(A)', 'Stack(A, B)'],
      trap: null
    },
    {
      step: 5,
      title: "Now Pop Subgoal 2: On(B, C) -> THE TRAP!",
      state: { onTable: ['B', 'C'], on: [['A', 'B']], clear: ['A', 'C'], holding: null, armEmpty: true },
      stack: ['holding(B)', 'clear(C)', 'Stack(B,C)', '...'],
      action: "To achieve On(B, C), need Stack(B, C). Preconditions: holding(B) and clear(C). BUT B is under A! To hold B, we MUST UNSTACK A!",
      plan: ['Unstack(C, A)', 'Putdown(C)', 'Pickup(A)', 'Stack(A, B)'],
      trap: "SUSSMAN'S ANOMALY TRAP: Achieving On(B,C) directly CLOBBERS / UNDOES the previously achieved goal On(A,B)! Goal Stack Planning fails to find the optimal plan because goals are non-serializable."
    },
    {
      step: 6,
      title: "Optimal Interleaved Plan (Partial Order Planning)",
      state: { onTable: ['C'], on: [['B', 'C'], ['A', 'B']], clear: ['A'], holding: null, armEmpty: true },
      stack: ['[Plan Complete]'],
      action: "Optimal 6-step solution interleaves subgoals: (1) Unstack(C,A), (2) Putdown(C), (3) Pickup(B), (4) Stack(B,C), (5) Pickup(A), (6) Stack(A,B). Final state: A on B on C on Table!",
      plan: ['Unstack(C, A)', 'Putdown(C)', 'Pickup(B)', 'Stack(B, C)', 'Pickup(A)', 'Stack(A, B)'],
      trap: null,
      isGoal: true
    }
  ];

  const currentStepData = sussmanSteps[Math.min(step, sussmanSteps.length - 1)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <h2 style={{ fontSize: '20px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box size={22} style={{ color: 'var(--accent-amber)' }} />
          Blocks World & Goal Stack Planning (GSP) Visualizer
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Trace how the 4 Blocks World operators (<code style={{ color: 'var(--accent-cyan)' }}>Pickup</code>, <code style={{ color: 'var(--accent-cyan)' }}>Putdown</code>, <code style={{ color: 'var(--accent-cyan)' }}>Stack</code>, <code style={{ color: 'var(--accent-cyan)' }}>Unstack</code>) modify state, and why <strong>Sussman's Anomaly</strong> breaks linear goal ordering!
        </p>
      </div>

      <div className="sim-container">
        {/* Left: Graphic Blocks World Canvas */}
        <div className="sim-canvas-panel">
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Table State: Step {step + 1} of {sussmanSteps.length}
          </div>

          <div style={{ width: '100%', height: '280px', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
            <svg width="100%" height="100%" viewBox="0 0 460 260">
              {/* Table Surface */}
              <line x1="20" y1="220" x2="440" y2="220" stroke="var(--border-medium)" strokeWidth="4" />
              <text x="230" y="242" textAnchor="middle" fill="var(--text-dim)" fontSize="11px" fontWeight="bold">
                ══════ TABLE ══════
              </text>

              {/* Robot Arm */}
              <g transform="translate(230, 20)">
                <line x1="0" y1="0" x2="0" y2="35" stroke="#94a3b8" strokeWidth="4" />
                <path d="M -15 35 L 15 35 L 15 45 L -15 45 Z" fill="#64748b" />
                {currentStepData.state.holding ? (
                  <g transform="translate(0, 48)">
                    <rect x="-22" y="0" width="44" height="38" rx="4" fill="#3b82f6" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="23" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="16px">
                      {currentStepData.state.holding}
                    </text>
                  </g>
                ) : (
                  <text x="0" y="58" textAnchor="middle" fill="var(--accent-emerald)" fontSize="11px" fontWeight="bold">
                    armEmpty: TRUE
                  </text>
                )}
              </g>

              {/* Render Blocks on Table or Stacked */}
              {/* Slot 1: x = 90 */}
              {/* Slot 2: x = 230 */}
              {/* Slot 3: x = 360 */}
              {step < 4 ? (
                <>
                  {/* Slot 1: A on table, C on A */}
                  {currentStepData.state.onTable.includes('A') && (
                    <g transform="translate(90, 180)">
                      <rect x="-24" y="0" width="48" height="40" rx="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">A</text>
                    </g>
                  )}
                  {currentStepData.state.on.some(([top, bot]) => top === 'C' && bot === 'A') && (
                    <g transform="translate(90, 140)">
                      <rect x="-24" y="0" width="48" height="40" rx="4" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">C</text>
                    </g>
                  )}

                  {/* Slot 2: B on table */}
                  {currentStepData.state.onTable.includes('B') && (
                    <g transform="translate(230, 180)">
                      <rect x="-24" y="0" width="48" height="40" rx="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">B</text>
                    </g>
                  )}

                  {/* Slot 3: C on table if putdown */}
                  {currentStepData.state.onTable.includes('C') && (
                    <g transform="translate(360, 180)">
                      <rect x="-24" y="0" width="48" height="40" rx="4" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                      <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">C</text>
                    </g>
                  )}
                </>
              ) : step < 6 ? (
                <>
                  {/* A on B on table, C on table */}
                  <g transform="translate(180, 180)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">B</text>
                  </g>
                  <g transform="translate(180, 140)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">A</text>
                  </g>
                  <g transform="translate(320, 180)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">C</text>
                  </g>
                </>
              ) : (
                <>
                  {/* Final Goal: A on B on C on table! */}
                  <g transform="translate(230, 180)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#06b6d4" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">C</text>
                  </g>
                  <g transform="translate(230, 140)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">B</text>
                  </g>
                  <g transform="translate(230, 100)">
                    <rect x="-24" y="0" width="48" height="40" rx="4" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />
                    <text x="0" y="24" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="15px">A</text>
                  </g>
                </>
              )}
            </svg>
          </div>

          {/* Stepper Controls */}
          <div className="sim-controls">
            <button 
              className="btn-secondary" 
              onClick={() => setStep(prev => Math.max(0, prev - 1))}
              disabled={step === 0}
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            <button 
              className="btn-primary" 
              onClick={() => setStep(prev => Math.min(sussmanSteps.length - 1, prev + 1))}
              disabled={step >= sussmanSteps.length - 1}
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => setStep(0)}
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Trap Alert if any */}
          {currentStepData.trap && (
            <div className="callout callout-trap" style={{ marginTop: '16px', marginBottom: 0 }}>
              <div className="callout-header">
                <AlertTriangle size={18} /> {currentStepData.trap.split(':')[0]}
              </div>
              <div className="callout-body">
                {currentStepData.trap.split(':')[1]}
              </div>
            </div>
          )}

          {/* Commentary */}
          <div style={{
            marginTop: currentStepData.trap ? '12px' : '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: currentStepData.isGoal ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-elevated)',
            borderLeft: `4px solid ${currentStepData.isGoal ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}`
          }}>
            <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
              {currentStepData.action}
            </p>
          </div>
        </div>

        {/* Right: Live Stack and Operator Rules */}
        <div className="sim-state-panel">
          <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Live Goal Stack (LIFO)
          </h3>

          <div className="sim-state-box">
            <div className="sim-state-label">Top of Stack (Next to Solve / Execute)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {currentStepData.stack.map((item, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: idx === 0 ? 'rgba(6, 182, 212, 0.2)' : 'var(--bg-elevated)',
                    border: idx === 0 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px',
                    fontWeight: idx === 0 ? 700 : 500,
                    color: idx === 0 ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                  }}
                >
                  {idx === 0 ? '👉 TOP: ' : ''}{item}
                </div>
              ))}
            </div>
          </div>

          {/* Plan Constructed So Far */}
          {currentStepData.plan && (
            <div className="sim-state-box">
              <div className="sim-state-label">Plan Generated So Far</div>
              <ol style={{ paddingLeft: '18px', fontSize: '12.5px', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                {currentStepData.plan.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Memory Trick Callout */}
          <div className="callout callout-mnemonic" style={{ margin: 0 }}>
            <div className="callout-header" style={{ fontSize: '13px' }}>
              🧠 4 Operators Memory Rule
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.5 }}>
              • <strong>Rakhne</strong> (Putdown, Stack) me <code style={{ color: 'var(--accent-cyan)' }}>armEmpty</code> <strong>ADD</strong> hota hai.<br />
              • <strong>Uthane</strong> (Pickup, Unstack) me <code style={{ color: 'var(--accent-rose)' }}>armEmpty</code> <strong>DELETE</strong> hota hai.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
