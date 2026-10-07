import React, { useState } from 'react';
import { Compass, Play, ChevronRight, RotateCcw, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export default function TspWorkbench() {
  const [heuristic, setHeuristic] = useState('nn'); // 'nn' or 'greedy' or 'savings'
  const [selectedPreset, setSelectedPreset] = useState('2026_t1');
  const [startCity, setStartCity] = useState('A');
  const [fulcrumCity, setFulcrumCity] = useState('A');

  // Presets from official PYQs
  const presets = {
    '2026_t1': {
      name: '2026 Term 1 (5 Cities — Saturation Trap)',
      cities: ['A', 'B', 'C', 'D', 'E'],
      matrix: {
        A: { B: 96, C: 78, D: 84, E: 66 },
        B: { A: 96, C: 42, D: 30, E: 54 },
        C: { A: 78, B: 42, D: 18, E: 24 },
        D: { A: 84, B: 30, C: 18, E: 12 },
        E: { A: 66, B: 54, C: 24, D: 12 }
      },
      sortedEdges: [
        { u: 'D', v: 'E', w: 12 },
        { u: 'C', v: 'D', w: 18 },
        { u: 'C', v: 'E', w: 24 },
        { u: 'B', v: 'D', w: 30 },
        { u: 'B', v: 'C', w: 42 },
        { u: 'B', v: 'E', w: 54 },
        { u: 'A', v: 'E', w: 66 },
        { u: 'A', v: 'C', w: 78 },
        { u: 'A', v: 'D', w: 84 },
        { u: 'A', v: 'B', w: 96 }
      ]
    },
    '2025_t1': {
      name: '2025 Term 1 (5 Cities)',
      cities: ['A', 'B', 'C', 'D', 'E'],
      matrix: {
        A: { B: 58, C: 92, D: 34, E: 81 },
        B: { A: 58, C: 20, D: 46, E: 70 },
        C: { A: 92, B: 20, D: 28, E: 53 },
        D: { A: 34, B: 46, C: 28, E: 12 },
        E: { A: 81, B: 70, C: 53, D: 12 }
      },
      sortedEdges: [
        { u: 'D', v: 'E', w: 12 },
        { u: 'B', v: 'C', w: 20 },
        { u: 'C', v: 'D', w: 28 },
        { u: 'A', v: 'D', w: 34 },
        { u: 'B', v: 'D', w: 46 },
        { u: 'C', v: 'E', w: 53 },
        { u: 'A', v: 'B', w: 58 },
        { u: 'B', v: 'E', w: 70 },
        { u: 'A', v: 'E', w: 81 },
        { u: 'A', v: 'C', w: 92 }
      ]
    }
  };

  const currData = presets[selectedPreset];
  const cities = currData.cities;
  const dist = (u, v) => (u === v ? 0 : currData.matrix[u]?.[v] || currData.matrix[v]?.[u] || 0);

  // Compute Nearest Neighbour
  const computeNN = () => {
    let visited = [startCity];
    let curr = startCity;
    let cost = 0;
    let steps = [];

    while (visited.length < cities.length) {
      let unvisited = cities.filter(c => !visited.includes(c));
      unvisited.sort((a, b) => dist(curr, a) - dist(curr, b) || a.localeCompare(b));
      let nextCity = unvisited[0];
      let stepCost = dist(curr, nextCity);
      cost += stepCost;

      steps.push({
        from: curr,
        to: nextCity,
        cost: stepCost,
        accum: cost,
        action: `From ${curr}, nearest unvisited is ${nextCity} (cost ${stepCost}).`
      });

      visited.push(nextCity);
      curr = nextCity;
    }

    // Return to start
    let returnCost = dist(curr, startCity);
    cost += returnCost;
    steps.push({
      from: curr,
      to: startCity,
      cost: returnCost,
      accum: cost,
      action: `Close tour by returning to start: ${curr} → ${startCity} (cost ${returnCost}).`
    });

    return {
      tour: visited,
      cost,
      steps
    };
  };

  // Compute Greedy Edges with Saturation Lookahead
  const computeGreedy = () => {
    let edges = currData.sortedEdges;
    let degrees = {};
    cities.forEach(c => degrees[c] = 0);
    let chosenEdges = [];
    let logs = [];
    let cost = 0;

    // Helper to check if adding edge creates cycle < N
    let adj = {};
    cities.forEach(c => adj[c] = []);

    const hasCycle = (u, v) => {
      let visited = {};
      let q = [u];
      visited[u] = true;
      while (q.length > 0) {
        let node = q.shift();
        if (node === v) return true;
        for (let nbr of adj[node]) {
          if (!visited[nbr]) {
            visited[nbr] = true;
            q.push(nbr);
          }
        }
      }
      return false;
    };

    for (let e of edges) {
      if (chosenEdges.length === cities.length) break;

      let { u, v, w } = e;

      // Rule 1: Degree <= 2
      if (degrees[u] >= 2 || degrees[v] >= 2) {
        logs.push({ edge: `${u}-${v}(${w})`, status: 'skipped', reason: `Degree limit: ${degrees[u] >= 2 ? u : v} already has degree 2.` });
        continue;
      }

      // Rule 2: No premature cycle
      if (chosenEdges.length < cities.length - 1 && hasCycle(u, v)) {
        logs.push({ edge: `${u}-${v}(${w})`, status: 'skipped', reason: `Premature cycle: closes sub-cycle before visiting all cities.` });
        continue;
      }

      // Accept edge
      chosenEdges.push(e);
      degrees[u]++;
      degrees[v]++;
      adj[u].push(v);
      adj[v].push(u);
      cost += w;
      logs.push({ edge: `${u}-${v}(${w})`, status: 'added', reason: `Added edge. Degrees: ${u}=${degrees[u]}, ${v}=${degrees[v]}. Total cost = ${cost}.` });
    }

    return {
      chosenEdges,
      cost,
      logs,
      degrees
    };
  };

  // Compute Clarke-Wright Savings
  const computeSavings = () => {
    let otherCities = cities.filter(c => c !== fulcrumCity);
    let savingsList = [];

    for (let i = 0; i < otherCities.length; i++) {
      for (let j = i + 1; j < otherCities.length; j++) {
        let u = otherCities[i];
        let v = otherCities[j];
        let sVal = dist(fulcrumCity, u) + dist(fulcrumCity, v) - dist(u, v);
        savingsList.push({ u, v, s: sVal });
      }
    }

    savingsList.sort((a, b) => b.s - a.s || a.u.localeCompare(b.u));

    // Number of merges is always N - 2
    let numMerges = cities.length - 2;

    return {
      savingsList,
      numMerges
    };
  };

  const nnRes = computeNN();
  const greedyRes = computeGreedy();
  const savingsRes = computeSavings();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <h2 style={{ fontSize: '20px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={22} style={{ color: 'var(--accent-cyan)' }} />
          TSP Heuristics Workbench (NN, Greedy, Savings)
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Run Nearest Neighbour, Greedy Edge Addition (with degree/saturation checks), and Clarke-Wright Savings on official exam distance matrices.
        </p>

        {/* Heuristic & Matrix Selectors */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              className={`btn-secondary ${heuristic === 'nn' ? 'active' : ''}`}
              onClick={() => setHeuristic('nn')}
              style={{ borderColor: heuristic === 'nn' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
            >
              Nearest Neighbour (NN)
            </button>
            <button
              className={`btn-secondary ${heuristic === 'greedy' ? 'active' : ''}`}
              onClick={() => setHeuristic('greedy')}
              style={{ borderColor: heuristic === 'greedy' ? 'var(--accent-indigo)' : 'var(--border-subtle)' }}
            >
              Greedy Edges
            </button>
            <button
              className={`btn-secondary ${heuristic === 'savings' ? 'active' : ''}`}
              onClick={() => setHeuristic('savings')}
              style={{ borderColor: heuristic === 'savings' ? 'var(--accent-amber)' : 'var(--border-subtle)' }}
            >
              Clarke-Wright Savings
            </button>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>Exam Preset:</span>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12.5px'
              }}
            >
              <option value="2026_t1">2026 Term 1 (5 cities - Saturation Trap)</option>
              <option value="2025_t1">2025 Term 1 (5 cities)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Distance Matrix Display */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Distance Matrix ({currData.name})
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', fontSize: '13px', textAlign: 'center', minWidth: '320px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)' }}>
                <th style={{ padding: '6px 14px', border: '1px solid var(--border-subtle)' }}>City</th>
                {cities.map(c => (
                  <th key={c} style={{ padding: '6px 14px', border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cities.map(r => (
                <tr key={r}>
                  <td style={{ padding: '6px 14px', fontWeight: 700, border: '1px solid var(--border-subtle)', color: 'var(--accent-cyan)' }}>{r}</td>
                  {cities.map(c => (
                    <td key={c} style={{ padding: '6px 14px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>
                      {r === c ? '—' : dist(r, c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Heuristic Specific Content */}
      {heuristic === 'nn' && (
        <div className="sim-container">
          <div className="sim-canvas-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Start City:</span>
              {cities.map(c => (
                <button
                  key={c}
                  className={`btn-secondary ${startCity === c ? 'active' : ''}`}
                  onClick={() => setStartCity(c)}
                  style={{
                    padding: '4px 12px',
                    borderColor: startCity === c ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                    background: startCity === c ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-elevated)',
                    fontWeight: 700
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {nnRes.steps.map((st, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'var(--bg-base)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 14px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    Step {idx + 1}: <strong>{st.from} → {st.to}</strong> (cost = {st.cost})
                  </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    Total: {st.accum}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="sim-state-panel">
            <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              NN Result Summary
            </h3>

            <div className="sim-state-box">
              <div className="sim-state-label">Constructed Tour Path</div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                {nnRes.tour.join(' → ')} → {startCity}
              </div>
            </div>

            <div className="sim-state-box">
              <div className="sim-state-label">Total Tour Cost</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                {nnRes.cost}
              </div>
            </div>

            <div className="callout callout-tip" style={{ margin: 0 }}>
              <div className="callout-header"><Zap size={15} /> Exam Rule</div>
              <div style={{ fontSize: '12.5px' }}>
                Hamesha last step me return-to-start edge (<code style={{ color: 'var(--accent-cyan)' }}>{nnRes.tour[nnRes.tour.length - 1]} → {startCity}</code>) ka cost add karna mat bhoolna!
              </div>
            </div>
          </div>
        </div>
      )}

      {heuristic === 'greedy' && (
        <div className="sim-container">
          <div className="sim-canvas-panel">
            <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>Sorted Edge Selection Trail</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto' }}>
              {greedyRes.logs.map((log, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: log.status === 'added' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-base)',
                    borderLeft: `4px solid ${log.status === 'added' ? 'var(--accent-emerald)' : 'var(--text-dim)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '8px 12px',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: log.status === 'added' ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                      Edge {log.edge}
                    </span>
                    <span style={{ textTransform: 'uppercase', fontSize: '11px', color: log.status === 'added' ? 'var(--accent-emerald)' : 'var(--text-dim)' }}>
                      {log.status === 'added' ? '✓ ADDED' : '✗ SKIPPED'}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>{log.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sim-state-panel">
            <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              Greedy Degree Counter & Cost
            </h3>

            <div className="sim-state-box">
              <div className="sim-state-label">Vertex Degrees (Must be ≤ 2)</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', textAlign: 'center' }}>
                {cities.map(c => (
                  <div key={c} style={{ background: 'var(--bg-elevated)', padding: '6px', borderRadius: '4px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c}</div>
                    <div style={{ fontWeight: 700, color: greedyRes.degrees[c] === 2 ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                      {greedyRes.degrees[c]} / 2
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sim-state-box">
              <div className="sim-state-label">Total Greedy Tour Cost</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                {greedyRes.cost}
              </div>
            </div>

            {selectedPreset === '2026_t1' && (
              <div className="callout callout-trap" style={{ margin: 0 }}>
                <div className="callout-header"><AlertTriangle size={15} /> Saturation Trap Alert!</div>
                <div style={{ fontSize: '12px' }}>
                  2026 T1 me blind greedy execution stall ho jaati hai! Edges DE(12), CD(18), BC(42), AE(66), AB(96) add hokar valid Hamiltonian cycle complete karte hain.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {heuristic === 'savings' && (
        <div className="sim-container">
          <div className="sim-canvas-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Fulcrum City F:</span>
              {cities.map(c => (
                <button
                  key={c}
                  className={`btn-secondary ${fulcrumCity === c ? 'active' : ''}`}
                  onClick={() => setFulcrumCity(c)}
                  style={{
                    padding: '4px 12px',
                    borderColor: fulcrumCity === c ? 'var(--accent-amber)' : 'var(--border-subtle)',
                    background: fulcrumCity === c ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-elevated)',
                    fontWeight: 700
                  }}
                >
                  {c}
                </button>
              ))}
            </div>

            <h3 style={{ fontSize: '14px', marginBottom: '10px' }}>Sorted Savings Table: s(i, j) = d(F, i) + d(F, j) - d(i, j)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {savingsRes.savingsList.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: idx < savingsRes.numMerges ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-base)',
                    borderLeft: `4px solid ${idx < savingsRes.numMerges ? 'var(--accent-amber)' : 'var(--border-subtle)'}`,
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '13px'
                  }}
                >
                  <span>#{idx + 1}. s({item.u}, {item.v}) = {item.s}</span>
                  {idx === 0 && (
                    <span style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>
                      First Merge Edge!
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sim-state-panel">
            <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              Savings Properties
            </h3>

            <div className="sim-state-box">
              <div className="sim-state-label">Formula for N cities</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent-amber)' }}>
                Total Merges = N - 2
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                For {cities.length} cities: exactly {cities.length - 2} merges.
              </div>
            </div>

            <div className="callout callout-theory" style={{ margin: 0 }}>
              <div className="callout-header"><CheckCircle2 size={15} /> Clarke-Wright Core Concept</div>
              <div style={{ fontSize: '12.5px', lineHeight: 1.5 }}>
                Shuru me fulcrum se N-1 individual loops hote hain (F-i-F). Do loops merge karne par do radial legs cut hoti hain aur ek direct edge judti hai.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
