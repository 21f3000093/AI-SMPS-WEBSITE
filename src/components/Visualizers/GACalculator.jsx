import React, { useState } from 'react';
import { Cpu, ArrowRight, Check, AlertTriangle, Layers, RotateCcw } from 'lucide-react';

export default function GACalculator() {
  const [activeTool, setActiveTool] = useState('ordinal'); // 'ordinal' or 'cx' or 'pmx'

  // Ordinal Tool State
  const [refString, setRefString] = useState('A,B,C,D,E,F,G,H,I,J,K,L');
  const [tourString, setTourString] = useState('E,A,D,C,J,L,K,F,G,I,H,B');

  // CX Tool State
  const [cxP1, setCxP1] = useState('J,F,K,H,E,L,D,I,M,G');
  const [cxP2, setCxP2] = useState('E,J,L,K,F,H,I,M,G,D');

  // Compute Path to Ordinal step-by-step
  const computeOrdinal = () => {
    let R = refString.split(',').map(s => s.trim()).filter(Boolean);
    let tour = tourString.split(',').map(s => s.trim()).filter(Boolean);

    let steps = [];
    let ordinalResult = [];

    for (let i = 0; i < tour.length; i++) {
      let city = tour[i];
      let idx = R.indexOf(city);
      if (idx === -1) {
        return { error: `City '${city}' not found in current reference list! Make sure no city is repeated.` };
      }
      let oneBasedIdx = idx + 1;
      ordinalResult.push(oneBasedIdx);

      let prevR = [...R];
      R.splice(idx, 1); // remove city

      steps.push({
        city,
        prevR: prevR.join(', '),
        index: oneBasedIdx,
        nextR: R.join(', ')
      });
    }

    return { steps, result: ordinalResult.join(', ') };
  };

  // Compute Cycle Crossover (Multi-Cycle)
  const computeCX = () => {
    let p1 = cxP1.split(',').map(s => s.trim()).filter(Boolean);
    let p2 = cxP2.split(',').map(s => s.trim()).filter(Boolean);

    if (p1.length !== p2.length) {
      return { error: 'Both parents must have the exact same number of cities!' };
    }

    let n = p1.length;
    let visited = new Array(n).fill(false);
    let cycles = [];

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        let cycle = [];
        let curr = i;
        while (!visited[curr]) {
          visited[curr] = true;
          cycle.push(curr);
          // Look at p2[curr], find where it appears in p1
          let city = p2[curr];
          curr = p1.indexOf(city);
        }
        cycles.push(cycle);
      }
    }

    // Build Child 1: Odd cycles (0, 2...) from P1, Even cycles (1, 3...) from P2
    let c1 = new Array(n);
    let c2 = new Array(n);

    cycles.forEach((cycle, cycIdx) => {
      let fromP1 = (cycIdx % 2 === 0);
      cycle.forEach(pos => {
        c1[pos] = fromP1 ? p1[pos] : p2[pos];
        c2[pos] = fromP1 ? p2[pos] : p1[pos];
      });
    });

    return {
      p1,
      p2,
      cycles,
      child1: c1.join(', '),
      child2: c2.join(', ')
    };
  };

  const ordinalData = computeOrdinal();
  const cxData = computeCX();

  const cycleColors = [
    'rgba(6, 182, 212, 0.25)', // Cyan
    'rgba(168, 85, 247, 0.25)', // Purple
    'rgba(245, 158, 11, 0.25)', // Amber
    'rgba(16, 185, 129, 0.25)' // Emerald
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <h2 style={{ fontSize: '20px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={22} style={{ color: 'var(--accent-purple)' }} />
          Genetic Algorithm: Representations & Crossover Workbench
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          High-yield exam tools: Instant step-by-step <strong>Path-to-Ordinal Converter</strong> and the correct <strong>Multi-Cycle Crossover (CX)</strong> solver.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
          <button
            className={`btn-secondary ${activeTool === 'ordinal' ? 'active' : ''}`}
            onClick={() => setActiveTool('ordinal')}
            style={{ borderColor: activeTool === 'ordinal' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
          >
            1. Path → Ordinal Converter
          </button>
          <button
            className={`btn-secondary ${activeTool === 'cx' ? 'active' : ''}`}
            onClick={() => setActiveTool('cx')}
            style={{ borderColor: activeTool === 'cx' ? 'var(--accent-purple)' : 'var(--border-subtle)' }}
          >
            2. Cycle Crossover (CX Multi-Cycle)
          </button>
        </div>
      </div>

      {activeTool === 'ordinal' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {/* Preset Buttons */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '12px' }}>
              Load Exam Presets:
            </span>
            <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setRefString('A,B,C,D,E,F,G,H,I,J,K,L');
                  setTourString('E,A,D,C,J,L,K,F,G,I,H,B');
                }}
              >
                2024 T1 Q35 (12 cities)
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setRefString('K,L,M,N,O,P,Q,R,S,T,U,V');
                  setTourString('O,T,M,L,U,P,K,N,R,V,S,Q');
                }}
              >
                2024 T2 Q35 (K..V)
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setRefString('A,B,C,D,E,F');
                  setTourString('E,F,A,C,D,B');
                }}
              >
                2025 T2 Q81 (6 cities)
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setRefString('D,E,F,G,H,I,J,K,L,M');
                  setTourString('E,J,L,K,F,H,I,M,G,D');
                }}
              >
                2025 T3 Q35 (D..M)
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="card">
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Reference Order List (Comma-separated)
              </label>
              <input
                type="text"
                value={refString}
                onChange={(e) => setRefString(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13.5px'
                }}
              />
            </div>

            <div className="card">
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Tour Path (Open List of Cities)
              </label>
              <input
                type="text"
                value={tourString}
                onChange={(e) => setTourString(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          {/* Results Table */}
          {ordinalData.error ? (
            <div className="callout callout-trap">
              <div className="callout-header"><AlertTriangle size={16} /> Error</div>
              <div className="callout-body">{ordinalData.error}</div>
            </div>
          ) : (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700 }}>
                  Step-by-Step Ordinal Computation
                </span>
                <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', padding: '4px 12px', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  Result: {ordinalData.result}
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                      <th style={{ padding: '10px 14px' }}>Step</th>
                      <th style={{ padding: '10px 14px' }}>City</th>
                      <th style={{ padding: '10px 14px' }}>Current Reference List R</th>
                      <th style={{ padding: '10px 14px' }}>1-Based Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ordinalData.steps.map((st, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '8px 14px', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>#{i + 1}</td>
                        <td style={{ padding: '8px 14px', fontWeight: 700, color: 'var(--accent-cyan)' }}>{st.city}</td>
                        <td style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>({st.prevR})</td>
                        <td style={{ padding: '8px 14px', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{st.index}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTool === 'cx' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {/* Preset Buttons */}
          <div className="card" style={{ padding: '16px 20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '12px' }}>
              Load Exam CX Presets:
            </span>
            <div style={{ display: 'inline-flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setCxP1('J,F,K,H,E,L,D,I,M,G');
                  setCxP2('E,J,L,K,F,H,I,M,G,D');
                }}
              >
                2024 T3 Q36 (10 cities, 3 cycles)
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setCxP1('J,G,F,I,L,M,E,D,H,K');
                  setCxP2('I,L,G,D,F,H,J,E,K,M');
                }}
              >
                2025 T1 Q17 (10 cities, 3 cycles)
              </button>
              <button
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '4px 10px' }}
                onClick={() => {
                  setCxP1('I,D,L,E,J,A,C,K,F,B,H,G');
                  setCxP2('C,K,I,D,B,E,J,A,H,L,G,F');
                }}
              >
                2025 T3 Q131 (12 cities, 3 cycles)
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="card">
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)', display: 'block', marginBottom: '8px' }}>
                Parent 1 (P1)
              </label>
              <input
                type="text"
                value={cxP1}
                onChange={(e) => setCxP1(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13.5px'
                }}
              />
            </div>

            <div className="card">
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-purple)', display: 'block', marginBottom: '8px' }}>
                Parent 2 (P2)
              </label>
              <input
                type="text"
                value={cxP2}
                onChange={(e) => setCxP2(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13.5px'
                }}
              />
            </div>
          </div>

          {cxData.error ? (
            <div className="callout callout-trap">
              <div className="callout-header"><AlertTriangle size={16} /> Error</div>
              <div className="callout-body">{cxData.error}</div>
            </div>
          ) : (
            <div className="card">
              <h3 style={{ fontSize: '15px', marginBottom: '14px' }}>
                Discovered Cycles (Index Partitions)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {cxData.cycles.map((cyc, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: cycleColors[idx % cycleColors.length],
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '13px' }}>Cycle {idx + 1}:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      Positions: &#123;{cyc.map(p => p + 1).join(', ')}&#125;
                    </span>
                    <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--text-muted)' }}>
                      Used in Child 1 from: <strong>{idx % 2 === 0 ? 'P1' : 'P2'}</strong>
                    </span>
                  </div>
                ))}
              </div>

              {/* Children Display */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: 'var(--bg-base)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-emerald)', marginBottom: '6px' }}>
                    Child 1 (Cycles 1 & 3 from P1, Cycle 2 from P2)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
                    {cxData.child1}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-base)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-cyan)', marginBottom: '6px' }}>
                    Child 2 (Cycles 1 & 3 from P2, Cycle 2 from P1)
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
                    {cxData.child2}
                  </div>
                </div>
              </div>

              {/* Exam Trap Warning */}
              <div className="callout callout-trap" style={{ marginTop: '18px', marginBottom: 0 }}>
                <div className="callout-header">
                  <AlertTriangle size={16} /> Common Exam Trap in CX
                </div>
                <div className="callout-body">
                  Kabhi bhi pehla cycle nikaalne ke baad baki positions ko P2 se order me mat bharo! Standard exam convention me <strong>SAARE cycles nikaal kar alternate</strong> parents assign kiye jaate hain.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
