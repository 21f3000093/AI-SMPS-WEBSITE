import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronLeft, Scissors, Eye, Zap, RefreshCw } from 'lucide-react';

export default function GameTreeVisualizer() {
  const [mode, setMode] = useState('alphabeta'); // 'minimax' or 'alphabeta'
  const [step, setStep] = useState(0);

  // Initial leaf values from classic PYQ 8-leaf example
  // Depth 0: Root (MAX)
  // Depth 1: Node A (MIN), Node B (MIN)
  // Depth 2: Node A1 (MAX), A2 (MAX), B1 (MAX), B2 (MAX)
  // Depth 3: Leaves
  const [leaves, setLeaves] = useState([3, 5, 2, 9, 1, 4, 8, 2]);

  // Alpha-Beta trace steps on this tree
  // Tree Structure:
  // Root MAX
  //   A (MIN)
  //     A1 (MAX): [3, 5]
  //     A2 (MAX): [2, 9]
  //   B (MIN)
  //     B1 (MAX): [1, 4]
  //     B2 (MAX): [8, 2]
  
  const generateAlphaBetaSteps = () => {
    return [
      {
        step: 0,
        focus: 'Root',
        alpha: -Infinity,
        beta: Infinity,
        action: 'Pass α = -∞, β = +∞ to Root (MAX). Explore left child A (MIN).',
        nodeValues: {},
        pruned: []
      },
      {
        step: 1,
        focus: 'A1',
        alpha: -Infinity,
        beta: Infinity,
        action: 'At A (MIN), explore A1 (MAX). Leaf 1 = 3 -> A1 value becomes 3. Leaf 2 = 5 -> max(3, 5) = 5.',
        nodeValues: { A1: 5 },
        pruned: []
      },
      {
        step: 2,
        focus: 'A',
        alpha: -Infinity,
        beta: 5,
        action: 'A (MIN) receives 5 from A1. Updates β = min(+∞, 5) = 5. α still -∞. Explore A2.',
        nodeValues: { A1: 5, A: 5 },
        pruned: []
      },
      {
        step: 3,
        focus: 'A2',
        alpha: -Infinity,
        beta: 5,
        action: 'At A2 (MAX), leaf 3 = 2. A2 becomes at least 2. Leaf 4 = 9 -> max(2, 9) = 9.',
        nodeValues: { A1: 5, A2: 9, A: 5 },
        pruned: []
      },
      {
        step: 4,
        focus: 'A',
        alpha: -Infinity,
        beta: 5,
        action: 'A (MIN) evaluates min(5, 9) = 5. A returns 5 to Root (MAX).',
        nodeValues: { A1: 5, A2: 9, A: 5 },
        pruned: []
      },
      {
        step: 5,
        focus: 'Root',
        alpha: 5,
        beta: Infinity,
        action: 'Root (MAX) updates α = max(-∞, 5) = 5. Now explores right child B (MIN) with α = 5, β = +∞.',
        nodeValues: { A1: 5, A2: 9, A: 5, Root: 5 },
        pruned: []
      },
      {
        step: 6,
        focus: 'B1',
        alpha: 5,
        beta: Infinity,
        action: 'At B (MIN), explore B1 (MAX). Leaf 5 = 1, Leaf 6 = 4 -> B1 value = max(1, 4) = 4.',
        nodeValues: { A1: 5, A2: 9, A: 5, Root: 5, B1: 4 },
        pruned: []
      },
      {
        step: 7,
        focus: 'B',
        alpha: 5,
        beta: 4,
        action: 'B (MIN) updates β = min(+∞, 4) = 4. NOW: α = 5, β = 4. Condition α ≥ β triggered!',
        nodeValues: { A1: 5, A2: 9, A: 5, Root: 5, B1: 4, B: 4 },
        pruned: []
      },
      {
        step: 8,
        focus: 'B',
        alpha: 5,
        beta: 4,
        action: 'ALPHA CUTOFF at B (MIN)! Because α (5) ≥ β (4), Root will never choose B. Prune entire B2 subtree (Leaves 7 and 8)!',
        nodeValues: { A1: 5, A2: 9, A: 5, Root: 5, B1: 4, B: 4 },
        pruned: ['B2', 'Leaf7', 'Leaf8']
      },
      {
        step: 9,
        focus: 'Root',
        alpha: 5,
        beta: Infinity,
        action: 'Root (MAX) selects Left branch A. Final Game Value = 5! Pruned 2 leaves without calculating them.',
        nodeValues: { A1: 5, A2: 9, A: 5, Root: 5, B: 4 },
        pruned: ['B2', 'Leaf7', 'Leaf8']
      }
    ];
  };

  const steps = generateAlphaBetaSteps();
  const currentStepData = steps[Math.min(step, steps.length - 1)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <h2 style={{ fontSize: '20px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Scissors size={22} style={{ color: 'var(--accent-indigo)' }} />
          Game Tree & Alpha-Beta Pruner
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Step through Minimax and Alpha-Beta pruning on a 2-player zero-sum game tree. Watch how <strong style={{ color: 'var(--accent-cyan)' }}>α (Max lower bound)</strong> and <strong style={{ color: 'var(--accent-rose)' }}>β (Min upper bound)</strong> trigger cutoffs!
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className={`btn-secondary ${mode === 'alphabeta' ? 'active' : ''}`}
            onClick={() => { setMode('alphabeta'); setStep(0); }}
            style={{ borderColor: mode === 'alphabeta' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
          >
            Alpha-Beta Pruning (With Cutoffs)
          </button>
          <button
            className={`btn-secondary ${mode === 'minimax' ? 'active' : ''}`}
            onClick={() => { setMode('minimax'); setStep(0); }}
            style={{ borderColor: mode === 'minimax' ? 'var(--accent-indigo)' : 'var(--border-subtle)' }}
          >
            Plain Minimax (Full Tree)
          </button>

          <span style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-muted)' }}>
            Step {step + 1} of {steps.length}
          </span>
        </div>
      </div>

      <div className="sim-container">
        {/* Left: Interactive Tree Canvas */}
        <div className="sim-canvas-panel">
          <div style={{ width: '100%', height: '360px', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 540 320">
              {/* Lines from Root to A & B */}
              <line x1="270" y1="40" x2="140" y2="100" stroke="var(--border-medium)" strokeWidth="2" />
              <line x1="270" y1="40" x2="400" y2="100" stroke={currentStepData.pruned.includes('B') ? '#f43f5e' : 'var(--border-medium)'} strokeWidth="2" strokeDasharray={currentStepData.pruned.includes('B') ? '4 4' : 'none'} />

              {/* Lines from A to A1 & A2 */}
              <line x1="140" y1="100" x2="80" y2="170" stroke="var(--border-medium)" strokeWidth="2" />
              <line x1="140" y1="100" x2="200" y2="170" stroke="var(--border-medium)" strokeWidth="2" />

              {/* Lines from B to B1 & B2 */}
              <line x1="400" y1="100" x2="340" y2="170" stroke="var(--border-medium)" strokeWidth="2" />
              <line x1="400" y1="100" x2="460" y2="170" stroke={currentStepData.pruned.includes('B2') ? '#f43f5e' : 'var(--border-medium)'} strokeWidth="2" strokeDasharray={currentStepData.pruned.includes('B2') ? '4 4' : 'none'} />

              {/* Lines from Leaves to parents */}
              <line x1="80" y1="170" x2="50" y2="240" stroke="var(--border-subtle)" />
              <line x1="80" y1="170" x2="110" y2="240" stroke="var(--border-subtle)" />
              <line x1="200" y1="170" x2="170" y2="240" stroke="var(--border-subtle)" />
              <line x1="200" y1="170" x2="230" y2="240" stroke="var(--border-subtle)" />
              <line x1="340" y1="170" x2="310" y2="240" stroke="var(--border-subtle)" />
              <line x1="340" y1="170" x2="370" y2="240" stroke="var(--border-subtle)" />
              <line x1="460" y1="170" x2="430" y2="240" stroke={currentStepData.pruned.includes('Leaf7') ? '#f43f5e' : 'var(--border-subtle)'} strokeDasharray={currentStepData.pruned.includes('Leaf7') ? '4 4' : 'none'} />
              <line x1="460" y1="170" x2="490" y2="240" stroke={currentStepData.pruned.includes('Leaf8') ? '#f43f5e' : 'var(--border-subtle)'} strokeDasharray={currentStepData.pruned.includes('Leaf8') ? '4 4' : 'none'} />

              {/* ROOT (MAX) */}
              <g transform="translate(270, 40)">
                <polygon points="0,-18 16,14 -16,14" fill={currentStepData.focus === 'Root' ? '#f59e0b' : '#3b82f6'} stroke="#fff" strokeWidth="1.5" />
                <text y="3" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="bold">
                  {currentStepData.nodeValues['Root'] ?? 'MAX'}
                </text>
              </g>

              {/* LEVEL 1: A (MIN) and B (MIN) */}
              <g transform="translate(140, 100)">
                <polygon points="0,18 16,-14 -16,-14" fill={currentStepData.focus === 'A' ? '#f59e0b' : '#6366f1'} stroke="#fff" strokeWidth="1.5" />
                <text y="-2" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="bold">
                  {currentStepData.nodeValues['A'] ?? 'MIN'}
                </text>
              </g>

              <g transform="translate(400, 100)">
                <polygon points="0,18 16,-14 -16,-14" fill={currentStepData.focus === 'B' ? '#f59e0b' : '#6366f1'} stroke="#fff" strokeWidth="1.5" />
                <text y="-2" textAnchor="middle" fill="#fff" fontSize="11px" fontWeight="bold">
                  {currentStepData.nodeValues['B'] ?? 'MIN'}
                </text>
              </g>

              {/* LEVEL 2: A1, A2, B1, B2 (MAX) */}
              {[
                { name: 'A1', x: 80, y: 170 },
                { name: 'A2', x: 200, y: 170 },
                { name: 'B1', x: 340, y: 170 },
                { name: 'B2', x: 460, y: 170, isPruned: currentStepData.pruned.includes('B2') }
              ].map(n => (
                <g key={n.name} transform={`translate(${n.x}, ${n.y})`}>
                  <polygon 
                    points="0,-15 13,11 -13,11" 
                    fill={n.isPruned ? '#334155' : currentStepData.focus === n.name ? '#f59e0b' : '#3b82f6'} 
                    stroke={n.isPruned ? '#f43f5e' : '#fff'} 
                    strokeWidth="1.5"
                    strokeDasharray={n.isPruned ? '3 3' : 'none'}
                  />
                  <text y="2" textAnchor="middle" fill="#fff" fontSize="10px" fontWeight="bold">
                    {n.isPruned ? 'X' : (currentStepData.nodeValues[n.name] ?? n.name)}
                  </text>
                </g>
              ))}

              {/* LEAF NODES (Editable Scores) */}
              {[
                { idx: 0, x: 50, y: 240, id: 'Leaf1' },
                { idx: 1, x: 110, y: 240, id: 'Leaf2' },
                { idx: 2, x: 170, y: 240, id: 'Leaf3' },
                { idx: 3, x: 230, y: 240, id: 'Leaf4' },
                { idx: 4, x: 310, y: 240, id: 'Leaf5' },
                { idx: 5, x: 370, y: 240, id: 'Leaf6' },
                { idx: 6, x: 430, y: 240, id: 'Leaf7' },
                { idx: 7, x: 490, y: 240, id: 'Leaf8' }
              ].map(l => {
                const isPruned = currentStepData.pruned.includes(l.id);
                return (
                  <g key={l.idx} transform={`translate(${l.x}, ${l.y})`}>
                    <rect
                      x="-14"
                      y="-12"
                      width="28"
                      height="24"
                      rx="4"
                      fill={isPruned ? '#1e293b' : '#10b981'}
                      stroke={isPruned ? '#f43f5e' : 'var(--border-subtle)'}
                      strokeWidth={isPruned ? 1.5 : 1}
                      strokeDasharray={isPruned ? '3 3' : 'none'}
                    />
                    <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="11px" fontWeight="bold">
                      {isPruned ? 'CUT' : leaves[l.idx]}
                    </text>
                  </g>
                );
              })}

              {/* Alpha Cut Marker Highlight */}
              {currentStepData.pruned.length > 0 && (
                <g transform="translate(460, 200)">
                  <rect x="-40" y="-12" width="80" height="24" rx="4" fill="rgba(244, 63, 94, 0.2)" stroke="#f43f5e" strokeWidth="1" />
                  <text textAnchor="middle" dominantBaseline="central" fill="#f43f5e" fontSize="10.5px" fontWeight="bold">
                    ✂️ ALPHA CUT
                  </text>
                </g>
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
              <span>Step Back</span>
            </button>

            <button 
              className="btn-primary" 
              onClick={() => setStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={step >= steps.length - 1}
            >
              <span>Step Next</span>
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

          {/* Action Callout */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: currentStepData.pruned.length > 0 ? 'rgba(244, 63, 94, 0.12)' : 'var(--bg-elevated)',
            borderLeft: `4px solid ${currentStepData.pruned.length > 0 ? 'var(--accent-rose)' : 'var(--accent-cyan)'}`
          }}>
            <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
              {currentStepData.action}
            </p>
          </div>
        </div>

        {/* Right: Alpha-Beta Bounds & Theory */}
        <div className="sim-state-panel">
          <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Alpha / Beta Tracking
          </h3>

          <div className="sim-state-box">
            <div className="sim-state-label">Current Alpha (α) — Max Lower Bound</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
              {currentStepData.alpha === -Infinity ? '-∞' : currentStepData.alpha}
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Max player ki guaranteed minimum value. Sirf UPWARD badhti hai!
            </p>
          </div>

          <div className="sim-state-box">
            <div className="sim-state-label">Current Beta (β) — Min Upper Bound</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-rose)', fontFamily: 'var(--font-mono)' }}>
              {currentStepData.beta === Infinity ? '+∞' : currentStepData.beta}
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Min player ki allowed maximum value. Sirf DOWNWARD girti hai!
            </p>
          </div>

          <div className="callout callout-tip" style={{ margin: 0 }}>
            <div className="callout-header" style={{ fontSize: '13px' }}>
              <Zap size={15} /> Exam Golden Rule
            </div>
            <div style={{ fontSize: '12.5px', lineHeight: 1.5 }}>
              Jab bhi <strong style={{ color: 'var(--accent-amber)' }}>α ≥ β</strong> ho, wahi par <strong>STOP</strong> karo! Baki saare siblings prune ho jaate hain.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
