import React, { useState, useMemo } from 'react';
import { Compass, Copy, Check, Search, Layers, Zap, BookOpen } from 'lucide-react';
import { searchComplexityMatrix, essentialFormulas, tenRecurringThemes } from '../data/cheatsheetData.js';

export default function FormulaSheet() {
  const [activeTab, setActiveTab] = useState('formulas'); // 'formulas', 'matrix', 'themes'
  const [copiedName, setCopiedName] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const handleCopy = (formula, name) => {
    navigator.clipboard.writeText(formula);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const filteredFormulas = useMemo(() => {
    if (!filterQuery.trim()) return essentialFormulas;
    let q = filterQuery.toLowerCase();
    return essentialFormulas.filter(f => 
      f.name.toLowerCase().includes(q) || 
      f.formula.toLowerCase().includes(q) || 
      f.category.toLowerCase().includes(q) ||
      f.meaning.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  const filteredMatrix = useMemo(() => {
    if (!filterQuery.trim()) return searchComplexityMatrix;
    let q = filterQuery.toLowerCase();
    return searchComplexityMatrix.filter(m => 
      m.algorithm.toLowerCase().includes(q) || 
      m.dataStruct.toLowerCase().includes(q) ||
      m.notes.toLowerCase().includes(q)
    );
  }, [filterQuery]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Compass size={22} style={{ color: 'var(--accent-cyan)' }} />
              Formula & Algorithm Complexity Cheat Sheet
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Complete repository of formulas, time/space complexities, counting identities, and core theorems for AI: Search Methods.
            </p>
          </div>

          {/* Tab selector */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn-secondary ${activeTab === 'formulas' ? 'active' : ''}`}
              onClick={() => setActiveTab('formulas')}
              style={{ borderColor: activeTab === 'formulas' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
            >
              Essential Formulas ({essentialFormulas.length})
            </button>
            <button
              className={`btn-secondary ${activeTab === 'matrix' ? 'active' : ''}`}
              onClick={() => setActiveTab('matrix')}
              style={{ borderColor: activeTab === 'matrix' ? 'var(--accent-indigo)' : 'var(--border-subtle)' }}
            >
              Complexity Matrix ({searchComplexityMatrix.length})
            </button>
            <button
              className={`btn-secondary ${activeTab === 'themes' ? 'active' : ''}`}
              onClick={() => setActiveTab('themes')}
              style={{ borderColor: activeTab === 'themes' ? 'var(--accent-amber)' : 'var(--border-subtle)' }}
            >
              10 Course Themes
            </button>
          </div>
        </div>

        {/* Search inside cheat sheet */}
        <div style={{ position: 'relative', maxWidth: '360px' }}>
          <input
            type="text"
            placeholder="Filter formulas or algorithms..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 14px 8px 36px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: '13px'
            }}
          />
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* TAB 1: FORMULA CARDS */}
      {activeTab === 'formulas' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {filteredFormulas.map((f, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-term" style={{ fontSize: '10.5px', marginBottom: '4px', display: 'inline-block' }}>
                    {f.category}
                  </span>
                  <h3 style={{ fontSize: '15.5px', color: 'var(--text-primary)' }}>{f.name}</h3>
                </div>

                <button
                  className="nav-icon-btn"
                  onClick={() => handleCopy(f.formula, f.name)}
                  title="Copy Formula"
                >
                  {copiedName === f.name ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Formula Display Box */}
              <div style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                fontWeight: 700,
                color: 'var(--accent-cyan)'
              }}>
                {f.formula}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {f.meaning}
              </div>

              {f.mnemonic && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--accent-amber)',
                  background: 'rgba(245, 158, 11, 0.08)',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Zap size={13} />
                  <span><strong>Memory Trick: </strong>{f.mnemonic}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: COMPLEXITY MATRIX TABLE */}
      {activeTab === 'matrix' && (
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '10px 12px' }}>Algorithm</th>
                  <th style={{ padding: '10px 12px' }}>Data Structure (OPEN)</th>
                  <th style={{ padding: '10px 12px' }}>Time</th>
                  <th style={{ padding: '10px 12px' }}>Space</th>
                  <th style={{ padding: '10px 12px' }}>Optimal?</th>
                  <th style={{ padding: '10px 12px' }}>Complete?</th>
                  <th style={{ padding: '10px 12px' }}>Key Trait</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatrix.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.algorithm}
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>
                      {item.dataStruct}
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>
                      {item.timeComplexity}
                    </td>
                    <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)', color: item.spaceComplexity.includes('Linear') || item.spaceComplexity.includes('Constant') ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                      {item.spaceComplexity}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ color: item.optimal.startsWith('Yes') ? 'var(--accent-emerald)' : 'var(--text-dim)', fontWeight: 600 }}>
                        {item.optimal.split(' ')[0]}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ color: item.complete.startsWith('Yes') ? 'var(--accent-emerald)' : 'var(--text-dim)', fontWeight: 600 }}>
                        {item.complete.split(' ')[0]}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {item.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: 10 RECURRING THEMES */}
      {activeTab === 'themes' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
          {tenRecurringThemes.map((thm) => (
            <div key={thm.number} className="card" style={{ borderLeft: '4px solid var(--accent-indigo)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-rank">Theme #{thm.number}</span>
                <h3 style={{ fontSize: '16px' }}>{thm.title}</h3>
              </div>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {thm.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
