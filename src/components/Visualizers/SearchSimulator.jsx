import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Info, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function SearchSimulator() {
  const [algorithm, setAlgorithm] = useState('DFS');
  const [preset, setPreset] = useState('grid9');
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);

  // 9-Node Grid Graph from PYQ (2024T1-2025T1)
  // S(0,3), A(3,5), B(2,4), C(4,4), D(3,3), E(4,2), F(6,3), G(6,1), H(1,2), I(2,1)
  const grid9Data = {
    nodes: {
      S: { x: 50, y: 180, h: 8, label: 'S (Start)' },
      A: { x: 180, y: 280, h: 7, label: 'A' },
      B: { x: 130, y: 230, h: 7, label: 'B' },
      C: { x: 230, y: 230, h: 5, label: 'C' },
      D: { x: 180, y: 170, h: 5, label: 'D' },
      E: { x: 240, y: 120, h: 3, label: 'E' },
      F: { x: 340, y: 170, h: 2, label: 'F' },
      G: { x: 350, y: 70, h: 0, label: 'G (Goal)' },
      H: { x: 90, y: 110, h: 6, label: 'H' },
      I: { x: 130, y: 60, h: 4, label: 'I' }
    },
    edges: [
      ['S', 'B'], ['S', 'H'],
      ['B', 'A'], ['B', 'D'],
      ['A', 'C'], ['A', 'D'],
      ['D', 'E'],
      ['H', 'I'], ['H', 'D'],
      ['I', 'D'], ['I', 'E'],
      ['E', 'F'], ['E', 'G'],
      ['F', 'G'],
      ['C', 'E'], ['C', 'F']
    ],
    start: 'S',
    goal: 'G',
    adjacency: {
      S: ['B', 'H'],
      A: ['B', 'C', 'D'],
      B: ['A', 'D', 'S'],
      C: ['A', 'E', 'F'],
      D: ['A', 'B', 'E', 'H', 'I'],
      E: ['C', 'D', 'F', 'G', 'I'],
      F: ['C', 'E', 'G'],
      G: ['E', 'F'],
      H: ['D', 'I', 'S'],
      I: ['D', 'E', 'H']
    }
  };

  // Precompute trace steps for chosen algorithm
  const generateSteps = () => {
    const g = grid9Data;
    const start = g.start;
    const goal = g.goal;
    const adj = g.adjacency;
    const h = (n) => g.nodes[n].h;

    const steps = [];

    if (algorithm === 'DFS') {
      // Stack LIFO
      let open = [start];
      let closed = [];
      let parents = { [start]: null };

      steps.push({
        currentNode: null,
        open: [...open],
        closed: [...closed],
        parents: { ...parents },
        action: `Start: OPEN = [${start}], CLOSED = []`,
        status: 'initial'
      });

      while (open.length > 0) {
        let curr = open.shift(); // pop top
        closed.push(curr);

        if (curr === goal) {
          // Reconstruct path
          let p = [];
          let temp = goal;
          while (temp) {
            p.unshift(temp);
            temp = parents[temp];
          }
          steps.push({
            currentNode: curr,
            open: [...open],
            closed: [...closed],
            parents: { ...parents },
            path: p,
            action: `GOAL REACHED! Reconstructed Path: ${p.join(' → ')}`,
            status: 'goal'
          });
          break;
        }

        // Neighbors alphabetically, remove seen (in open or closed)
        let neighbors = (adj[curr] || []).filter(n => !open.includes(n) && !closed.includes(n));
        // For stack push from right-to-left so alphabetical first is on top
        let toPrepend = [...neighbors].sort(); // alphabetical
        // Set parents for new nodes
        toPrepend.forEach(n => {
          if (!parents[n]) parents[n] = curr;
        });

        // Prepend so first in toPrepend is at head
        open = [...toPrepend, ...open];

        steps.push({
          currentNode: curr,
          open: [...open],
          closed: [...closed],
          parents: { ...parents },
          action: `Inspect ${curr}. Generated neighbors: [${toPrepend.join(', ')}]. Pushed to Stack front.`,
          status: 'exploring'
        });
      }
    } else if (algorithm === 'BFS') {
      // Queue FIFO
      let open = [start];
      let closed = [];
      let parents = { [start]: null };

      steps.push({
        currentNode: null,
        open: [...open],
        closed: [...closed],
        parents: { ...parents },
        action: `Start: OPEN = [${start}], CLOSED = []`,
        status: 'initial'
      });

      while (open.length > 0) {
        let curr = open.shift();
        closed.push(curr);

        if (curr === goal) {
          let p = [];
          let temp = goal;
          while (temp) {
            p.unshift(temp);
            temp = parents[temp];
          }
          steps.push({
            currentNode: curr,
            open: [...open],
            closed: [...closed],
            parents: { ...parents },
            path: p,
            action: `GOAL REACHED! Shortest Hop Path: ${p.join(' → ')} (Hops: ${p.length - 1})`,
            status: 'goal'
          });
          break;
        }

        let neighbors = (adj[curr] || []).filter(n => !open.includes(n) && !closed.includes(n)).sort();
        neighbors.forEach(n => {
          if (!parents[n]) parents[n] = curr;
        });
        open = [...open, ...neighbors];

        steps.push({
          currentNode: curr,
          open: [...open],
          closed: [...closed],
          parents: { ...parents },
          action: `Inspect ${curr}. Added [${neighbors.join(', ')}] to tail of Queue.`,
          status: 'exploring'
        });
      }
    } else if (algorithm === 'BestFirst') {
      // Priority Queue sorted by h(n)
      let open = [{ node: start, h: h(start) }];
      let closed = [];
      let parents = { [start]: null };

      steps.push({
        currentNode: null,
        open: open.map(x => `${x.node}(h=${x.h})`),
        closed: [...closed],
        parents: { ...parents },
        action: `Start: OPEN = [${start}(h=${h(start)})]`,
        status: 'initial'
      });

      while (open.length > 0) {
        open.sort((a, b) => a.h - b.h || a.node.localeCompare(b.node));
        let best = open.shift();
        let curr = best.node;
        closed.push(curr);

        if (curr === goal) {
          let p = [];
          let temp = goal;
          while (temp) {
            p.unshift(temp);
            temp = parents[temp];
          }
          steps.push({
            currentNode: curr,
            open: open.map(x => `${x.node}(h=${x.h})`),
            closed: [...closed],
            parents: { ...parents },
            path: p,
            action: `GOAL REACHED! Best-First Path: ${p.join(' → ')}`,
            status: 'goal'
          });
          break;
        }

        let openNodes = open.map(x => x.node);
        let neighbors = (adj[curr] || []).filter(n => !openNodes.includes(n) && !closed.includes(n)).sort();
        neighbors.forEach(n => {
          parents[n] = curr;
          open.push({ node: n, h: h(n) });
        });

        open.sort((a, b) => a.h - b.h || a.node.localeCompare(b.node));

        steps.push({
          currentNode: curr,
          open: open.map(x => `${x.node}(h=${x.h})`),
          closed: [...closed],
          parents: { ...parents },
          action: `Pop lowest-h node ${curr} (h=${best.h}). Inserted [${neighbors.map(n => `${n}(h=${h(n)})`).join(', ')}].`,
          status: 'exploring'
        });
      }
    } else if (algorithm === 'HillClimbing') {
      // Hill Climbing (strict minimization of h)
      let curr = start;
      let visited = [curr];

      steps.push({
        currentNode: curr,
        open: [`Current: ${curr} (h=${h(curr)})`],
        closed: [curr],
        action: `Start at ${curr} with h=${h(curr)}. Looking for strictly better neighbor (h < ${h(curr)}).`,
        status: 'exploring'
      });

      let trapped = false;
      while (curr !== goal) {
        let neighbors = (adj[curr] || []).filter(n => !visited.includes(n));
        if (neighbors.length === 0) {
          trapped = true;
          break;
        }

        // find best neighbor
        neighbors.sort((a, b) => h(a) - h(b) || a.localeCompare(b));
        let bestN = neighbors[0];

        if (h(bestN) < h(curr)) {
          curr = bestN;
          visited.push(curr);
          steps.push({
            currentNode: curr,
            open: [`Next: ${curr} (h=${h(curr)})`],
            closed: [...visited],
            action: `Move to strictly better neighbor ${curr} (h=${h(curr)} < previous).`,
            status: 'exploring'
          });
        } else {
          // Trap! No strictly better neighbor
          trapped = true;
          steps.push({
            currentNode: curr,
            open: ['No better neighbor'],
            closed: [...visited],
            action: `HALT! Best neighbor ${bestN} has h=${h(bestN)} which is NOT strictly less than h(${curr})=${h(curr)}. Trapped in Local Minimum / Plateau! Return NIL.`,
            status: 'trap'
          });
          break;
        }
      }

      if (curr === goal) {
        steps.push({
          currentNode: curr,
          open: [],
          closed: [...visited],
          path: visited,
          action: `Goal reached by Hill Climbing: ${visited.join(' → ')}`,
          status: 'goal'
        });
      }
    } else if (algorithm === 'AStar') {
      // A* Search: f = g + h
      let gVal = { [start]: 0 };
      let open = [{ node: start, g: 0, h: h(start), f: h(start) }];
      let closed = [];
      let parents = { [start]: null };

      steps.push({
        currentNode: null,
        open: open.map(x => `${x.node}(f=${x.f})`),
        closed: [...closed],
        parents: { ...parents },
        action: `Start A*: OPEN = [${start}(f=0+${h(start)}=${h(start)})]`,
        status: 'initial'
      });

      while (open.length > 0) {
        open.sort((a, b) => a.f - b.f || a.h - b.h || a.node.localeCompare(b.node));
        let best = open.shift();
        let curr = best.node;
        closed.push(curr);

        if (curr === goal) {
          let p = [];
          let temp = goal;
          while (temp) {
            p.unshift(temp);
            temp = parents[temp];
          }
          steps.push({
            currentNode: curr,
            open: open.map(x => `${x.node}(f=${x.f})`),
            closed: [...closed],
            parents: { ...parents },
            path: p,
            action: `GOAL REACHED! Optimal A* Path: ${p.join(' → ')} (Total Cost: ${best.g})`,
            status: 'goal'
          });
          break;
        }

        let neighbors = (adj[curr] || []);
        neighbors.forEach(n => {
          let edgeCost = 2; // uniform edge cost for demonstration
          let newG = best.g + edgeCost;
          let newF = newG + h(n);

          let inOpen = open.find(x => x.node === n);
          let inClosed = closed.includes(n);

          if (!inOpen && !inClosed) {
            parents[n] = curr;
            gVal[n] = newG;
            open.push({ node: n, g: newG, h: h(n), f: newF });
          } else if (inOpen && newG < inOpen.g) {
            parents[n] = curr;
            inOpen.g = newG;
            inOpen.f = newF;
          }
        });

        open.sort((a, b) => a.f - b.f || a.node.localeCompare(b.node));

        steps.push({
          currentNode: curr,
          open: open.map(x => `${x.node}(g=${x.g},f=${x.f})`),
          closed: [...closed],
          parents: { ...parents },
          action: `Pop lowest f-value node ${curr} (g=${best.g}, h=${best.h}, f=${best.f}). Evaluated successors.`,
          status: 'exploring'
        });
      }
    }

    return steps;
  };

  const steps = generateSteps();
  const stepData = steps[Math.min(currentStep, steps.length - 1)] || steps[0];

  // Auto-play timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length, speed]);

  // Reset step on algorithm change
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, preset]);

  const activePath = stepData.path || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Controls */}
      <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers style={{ color: 'var(--accent-cyan)' }} size={22} />
            Search Algorithm Simulator
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Interactive trace on the official 9-Node Grid Graph (PYQ 2024–2025). Watch how OPEN and CLOSED evolve step-by-step!
          </p>
        </div>

        {/* Algorithm Select Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'DFS', label: 'DFS (Stack)' },
            { id: 'BFS', label: 'BFS (Queue)' },
            { id: 'BestFirst', label: 'Best-First (h)' },
            { id: 'HillClimbing', label: 'Hill Climbing' },
            { id: 'AStar', label: 'A* (f = g + h)' }
          ].map(algo => (
            <button
              key={algo.id}
              onClick={() => setAlgorithm(algo.id)}
              className={`btn-secondary ${algorithm === algo.id ? 'active' : ''}`}
              style={{
                borderColor: algorithm === algo.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                background: algorithm === algo.id ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-elevated)',
                color: algorithm === algo.id ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '12.5px',
                padding: '6px 12px'
              }}
            >
              {algo.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Main Body */}
      <div className="sim-container">
        {/* Left: SVG Graph Canvas */}
        <div className="sim-canvas-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Graph Visualization: 9-Node Grid (Goal = G)
            </span>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6', display: 'inline-block' }}></span> Start (S)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span> Goal (G)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span> Current
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#06b6d4', display: 'inline-block' }}></span> In OPEN
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '360px', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 420 340">
              {/* Draw Edges */}
              {grid9Data.edges.map(([u, v], idx) => {
                const n1 = grid9Data.nodes[u];
                const n2 = grid9Data.nodes[v];
                const isOnPath = activePath.length > 1 && activePath.some((node, i) => 
                  (node === u && activePath[i+1] === v) || (node === v && activePath[i+1] === u)
                );

                return (
                  <line
                    key={idx}
                    x1={n1.x}
                    y1={n1.y}
                    x2={n2.x}
                    y2={n2.y}
                    stroke={isOnPath ? '#10b981' : 'var(--border-medium)'}
                    strokeWidth={isOnPath ? 3.5 : 1.5}
                    strokeDasharray={isOnPath ? 'none' : 'none'}
                  />
                );
              })}

              {/* Draw Nodes */}
              {Object.entries(grid9Data.nodes).map(([name, data]) => {
                const isStart = name === grid9Data.start;
                const isGoal = name === grid9Data.goal;
                const isCurrent = stepData.currentNode === name;
                const isClosed = stepData.closed?.includes(name);
                const isOpen = stepData.open?.some(o => typeof o === 'string' ? o.startsWith(name) : o === name);
                const isOnPath = activePath.includes(name);

                let fill = '#1e293b';
                if (isCurrent) fill = '#f59e0b';
                else if (isOnPath) fill = '#10b981';
                else if (isStart) fill = '#3b82f6';
                else if (isGoal) fill = '#059669';
                else if (isOpen) fill = '#0891b2';
                else if (isClosed) fill = '#475569';

                return (
                  <g key={name} transform={`translate(${data.x}, ${data.y})`}>
                    <circle
                      r={isCurrent ? 20 : 17}
                      fill={fill}
                      stroke={isCurrent ? '#ffffff' : 'var(--border-subtle)'}
                      strokeWidth={isCurrent ? 3 : 1.5}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffffff"
                      fontWeight="bold"
                      fontSize="12.5px"
                    >
                      {name}
                    </text>
                    {/* Heuristic label badge */}
                    <text
                      y={26}
                      textAnchor="middle"
                      fill="var(--text-muted)"
                      fontSize="10.5px"
                      fontFamily="var(--font-mono)"
                    >
                      h={data.h}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Player Controls */}
          <div className="sim-controls">
            <button 
              className="btn-primary" 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <ChevronLeft size={16} />
              <span>Step Back</span>
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStep >= steps.length - 1}
            >
              <span>Step Next</span>
              <ChevronRight size={16} />
            </button>

            <button 
              className="btn-secondary" 
              onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
              title="Reset"
            >
              <RotateCcw size={16} />
            </button>

            <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>

          {/* Current Step Action Commentary */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: stepData.status === 'goal' ? 'rgba(16, 185, 129, 0.12)' : stepData.status === 'trap' ? 'rgba(244, 63, 94, 0.12)' : 'var(--bg-elevated)',
            borderLeft: `4px solid ${stepData.status === 'goal' ? 'var(--accent-emerald)' : stepData.status === 'trap' ? 'var(--accent-rose)' : 'var(--accent-cyan)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {stepData.status === 'goal' ? (
              <CheckCircle2 size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
            ) : stepData.status === 'trap' ? (
              <AlertTriangle size={20} style={{ color: 'var(--accent-rose)', flexShrink: 0 }} />
            ) : (
              <Info size={20} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
            )}
            <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
              {stepData.action}
            </span>
          </div>
        </div>

        {/* Right: State Inspector Panel */}
        <div className="sim-state-panel">
          <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            Live Search Memory
          </h3>

          {/* OPEN List */}
          <div className="sim-state-box">
            <div className="sim-state-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>OPEN List ({algorithm === 'DFS' ? 'Stack / LIFO' : algorithm === 'BFS' ? 'Queue / FIFO' : 'Priority Queue'})</span>
              <span style={{ color: 'var(--accent-cyan)' }}>Size: {stepData.open?.length || 0}</span>
            </div>
            <div className="sim-state-content">
              {stepData.open && stepData.open.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {stepData.open.map((item, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        background: idx === 0 ? 'rgba(6, 182, 212, 0.25)' : 'var(--bg-elevated)', 
                        border: idx === 0 ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        fontWeight: idx === 0 ? 700 : 500,
                        color: idx === 0 ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ color: 'var(--text-dim)' }}>[Empty]</span>
              )}
            </div>
          </div>

          {/* CLOSED List */}
          <div className="sim-state-box">
            <div className="sim-state-label">
              <span>CLOSED List (Explored Set)</span>
            </div>
            <div className="sim-state-content">
              {stepData.closed && stepData.closed.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {stepData.closed.map((c, idx) => (
                    <span key={idx} style={{ background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ color: 'var(--text-dim)' }}>[Empty]</span>
              )}
            </div>
          </div>

          {/* Parent Pointers for Path Reconstruction */}
          <div className="sim-state-box">
            <div className="sim-state-label">
              <span>Parent Pointers (Backtracking Trail)</span>
            </div>
            <div className="sim-state-content" style={{ maxHeight: '110px', overflowY: 'auto' }}>
              {stepData.parents && Object.keys(stepData.parents).length > 0 ? (
                Object.entries(stepData.parents).map(([child, parent]) => (
                  <div key={child} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px dashed var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{child}</span>
                    <span style={{ color: 'var(--text-muted)' }}>parent: {parent || 'null (start)'}</span>
                  </div>
                ))
              ) : (
                <span style={{ color: 'var(--text-dim)' }}>None</span>
              )}
            </div>
          </div>

          {/* Final Result / Path */}
          {stepData.path && (
            <div className="callout callout-exam" style={{ margin: 0 }}>
              <div className="callout-header" style={{ fontSize: '13.5px' }}>
                <CheckCircle2 size={16} /> Final Path Output
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '14px' }}>
                {stepData.path.join(' → ')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
