import React, { useState, useMemo } from 'react';
import { Star, ChevronDown, ChevronUp, Copy, Check, Flame, AlertCircle, Compass } from 'lucide-react';
import { top50Questions } from '../data/pyqData.js';

export default function Top50Viewer({ bookmarks = [], toggleBookmark }) {
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [expandedItems, setExpandedItems] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'ALL', label: 'All 50 Ranked' },
    { id: 'Search (DFS/BFS/Best-First/HC)', label: 'Search Traversals (1-18)' },
    { id: 'TSP Heuristics (NN/Greedy/Savings)', label: 'TSP Heuristics (19-30)' },
    { id: 'Genetic Algorithm & Representations', label: 'Genetic Algorithms (31-40)' },
    { id: 'State Space & Puzzles', label: 'Puzzles & State Space (41-46)' },
    { id: 'Algorithm Meta-Questions', label: 'Meta Questions (47-50)' }
  ];

  const filteredItems = useMemo(() => {
    if (categoryFilter === 'ALL') return top50Questions;
    return top50Questions.filter(item => item.category === categoryFilter);
  }, [categoryFilter]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(`${item.title}\n\n${item.content}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Star size={22} style={{ color: '#eab308' }} />
              Top 50 Most Frequently Asked Questions (Ranked & Categorised)
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Curated list of the most critical exam patterns across all 7 term papers. Drill these questions the night before the exam!
            </p>
          </div>

          <div style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 'var(--radius-md)', padding: '6px 14px', fontSize: '13px', fontWeight: 700 }}>
            {filteredItems.length} High-Yield Items
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              style={{
                fontSize: '12px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                background: categoryFilter === cat.id ? '#eab308' : 'var(--bg-elevated)',
                color: categoryFilter === cat.id ? '#0f172a' : 'var(--text-secondary)',
                fontWeight: 700,
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 50 Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredItems.map(item => {
          const isExpanded = !!expandedItems[item.id];
          const isBookmarked = bookmarks.includes(item.id);

          return (
            <div key={item.id} className="pyq-card" style={{ borderLeft: `4px solid ${item.importance?.toLowerCase().includes('crit') ? 'var(--accent-rose)' : 'var(--accent-amber)'}` }}>
              <div className="pyq-header" onClick={() => toggleExpand(item.id)}>
                <div style={{ flex: 1 }}>
                  <div className="pyq-badges">
                    <span className="badge badge-rank">Rank #{item.rank}</span>
                    <span className="badge" style={{ background: 'var(--bg-base)', color: 'var(--text-secondary)' }}>
                      {item.category}
                    </span>
                    {item.frequency && (
                      <span className="badge badge-marks">
                        Freq: {item.frequency}
                      </span>
                    )}
                    {item.importance && (
                      <span className={`badge ${item.importance.toLowerCase().includes('crit') ? 'badge-crit' : 'badge-rank'}`}>
                        {item.importance}
                      </span>
                    )}
                  </div>
                  <div className="pyq-title">{item.title}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={e => e.stopPropagation()}>
                  <button
                    className="nav-icon-btn"
                    onClick={() => toggleBookmark(item.id)}
                    title={isBookmarked ? 'Remove Star' : 'Star Question'}
                    style={{ color: isBookmarked ? '#eab308' : 'var(--text-muted)' }}
                  >
                    <Star size={16} fill={isBookmarked ? '#eab308' : 'none'} />
                  </button>

                  <button
                    className="nav-icon-btn"
                    onClick={() => handleCopy(item)}
                    title="Copy Strategy"
                  >
                    {copiedId === item.id ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
                  </button>

                  <button className="nav-icon-btn" onClick={() => toggleExpand(item.id)}>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="pyq-body">
                  <div className="callout callout-theory" style={{ margin: 0 }}>
                    <div className="callout-header" style={{ fontSize: '13.5px' }}>
                      <Compass size={15} /> Exam Strategy & Answer Key Insights
                    </div>
                    <div className="callout-body" style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                      {item.content || item.fullText}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
