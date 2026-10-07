import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  Bookmark, 
  Copy, 
  Check, 
  BookOpen,
  Filter
} from 'lucide-react';
import { pyqPapers } from '../data/pyqData.js';

export default function PYQViewer({ 
  selectedPaperId, 
  setSelectedPaperId,
  bookmarks = [],
  toggleBookmark,
  searchQuery = ''
}) {
  const [topicFilter, setTopicFilter] = useState('ALL');
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Flatten all questions with paper metadata
  const allQuestions = useMemo(() => {
    let list = [];
    pyqPapers.forEach(paper => {
      paper.questions.forEach(q => {
        list.push({
          ...q,
          paperTitle: paper.title,
          paperId: paper.id
        });
      });
    });
    return list;
  }, []);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      // Paper filter
      if (selectedPaperId !== 'ALL' && q.paperId !== selectedPaperId) {
        return false;
      }
      // Topic filter
      if (topicFilter !== 'ALL') {
        let textToMatch = `${q.title} ${q.boxes?.['Topic Identification'] || ''}`.toLowerCase();
        if (topicFilter === 'SEARCH' && !textToMatch.includes('search') && !textToMatch.includes('dfs') && !textToMatch.includes('bfs')) return false;
        if (topicFilter === 'TSP' && !textToMatch.includes('tsp') && !textToMatch.includes('greedy') && !textToMatch.includes('nearest') && !textToMatch.includes('savings')) return false;
        if (topicFilter === 'GA' && !textToMatch.includes('genetic') && !textToMatch.includes('crossover') && !textToMatch.includes('ordinal') && !textToMatch.includes('representation')) return false;
        if (topicFilter === 'STATE' && !textToMatch.includes('state') && !textToMatch.includes('space') && !textToMatch.includes('puzzle') && !textToMatch.includes('knight') && !textToMatch.includes('jug')) return false;
        if (topicFilter === 'BOOKMARKED' && !bookmarks.includes(q.id)) return false;
      }
      // Search text filter
      if (searchQuery.trim()) {
        let query = searchQuery.toLowerCase();
        let fullSearchText = `${q.title} ${q.raw} ${q.qNum}`.toLowerCase();
        if (!fullSearchText.includes(query)) return false;
      }
      return true;
    });
  }, [allQuestions, selectedPaperId, topicFilter, searchQuery, bookmarks]);

  const toggleExpand = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (q) => {
    let text = `${q.fullHeader}\n\nQuestion:\n${q.boxes?.Question || q.title}\n\nFinal Answer: ${q.boxes?.['Final Answer'] || ''}\n\nStep-by-Step:\n${q.boxes?.['Step-by-Step Solution'] || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header and Filter Bar */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FileText size={22} style={{ color: 'var(--accent-cyan)' }} />
              Complete Solved PYQs (7 Term Papers)
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Fully worked solutions with the comprehensive 9-part template for all official released papers (2024 T1 to 2026 T1).
            </p>
          </div>

          <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-md)', padding: '6px 14px', fontSize: '13px', fontWeight: 600, color: 'var(--accent-cyan)' }}>
            Showing {filteredQuestions.length} Questions
          </div>
        </div>

        {/* Paper Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <button
            className={`btn-secondary ${selectedPaperId === 'ALL' ? 'active' : ''}`}
            onClick={() => setSelectedPaperId('ALL')}
            style={{ fontSize: '12px', padding: '5px 12px', borderColor: selectedPaperId === 'ALL' ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
          >
            All 7 Terms
          </button>
          {pyqPapers.map(p => (
            <button
              key={p.id}
              className={`btn-secondary ${selectedPaperId === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPaperId(p.id)}
              style={{ fontSize: '12px', padding: '5px 12px', borderColor: selectedPaperId === p.id ? 'var(--accent-cyan)' : 'var(--border-subtle)' }}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Topic Filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          {[
            { id: 'ALL', label: 'All Topics' },
            { id: 'SEARCH', label: 'Search (DFS/BFS/HC/BestFirst)' },
            { id: 'TSP', label: 'TSP Heuristics (NN/Greedy/Savings)' },
            { id: 'GA', label: 'Genetic Algorithms & Ordinal' },
            { id: 'STATE', label: 'State Space & Puzzles' },
            { id: 'BOOKMARKED', label: `Starred (${bookmarks.length})` }
          ].map(tf => (
            <button
              key={tf.id}
              onClick={() => setTopicFilter(tf.id)}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: topicFilter === tf.id ? 'var(--accent-indigo)' : 'var(--bg-elevated)',
                color: topicFilter === tf.id ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: topicFilter === tf.id ? 700 : 500,
                border: '1px solid var(--border-subtle)',
                transition: 'all 0.15s ease'
              }}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredQuestions.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
              No questions matched your search criteria. Try clearing the search query or selecting "All Topics".
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = !!expandedQuestions[q.id];
            const isBookmarked = bookmarks.includes(q.id);
            const b = q.boxes || {};

            return (
              <div key={q.id} className={`pyq-card ${isExpanded ? 'expanded' : ''}`}>
                {/* Header */}
                <div className="pyq-header" onClick={() => toggleExpand(q.id)}>
                  <div style={{ flex: 1 }}>
                    <div className="pyq-badges">
                      <span className="badge badge-term">{q.paperTitle}</span>
                      <span className="badge badge-marks">{q.marks} Mark{q.marks > 1 ? 's' : ''}</span>
                      {q.qNum && <span className="badge badge-rank">{q.qNum}</span>}
                      {b['Topic Identification'] && (
                        <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-purple)' }}>
                          {b['Topic Identification'].split('.')[0]}
                        </span>
                      )}
                    </div>
                    <div className="pyq-title">{q.title}</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={(e) => e.stopPropagation()}>
                    <button
                      className="nav-icon-btn"
                      onClick={() => toggleBookmark(q.id)}
                      title={isBookmarked ? 'Remove Star' : 'Star Question'}
                      style={{ color: isBookmarked ? '#eab308' : 'var(--text-muted)' }}
                    >
                      <Star size={16} fill={isBookmarked ? '#eab308' : 'none'} />
                    </button>

                    <button
                      className="nav-icon-btn"
                      onClick={() => handleCopy(q)}
                      title="Copy Question & Answer"
                    >
                      {copiedId === q.id ? <Check size={16} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={16} />}
                    </button>

                    <button className="nav-icon-btn" onClick={() => toggleExpand(q.id)}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Solution Accordion */}
                {isExpanded && (
                  <div className="pyq-body">
                    {/* Setup / Graph Preamble if present */}
                    {b.Setup && (
                      <div className="pyq-step-box" style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent-cyan)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-cyan)' }}>
                          <BookOpen size={14} /> Comprehension Context & Setup
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>{b.Setup}</div>
                      </div>
                    )}

                    {b.Graph && (
                      <div className="pyq-step-box" style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent-cyan)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-cyan)' }}>
                          <BookOpen size={14} /> Graph Definition
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{b.Graph}</div>
                      </div>
                    )}

                    {b['Distance matrix'] && (
                      <div className="pyq-step-box" style={{ background: 'var(--bg-elevated)', borderLeft: '3px solid var(--accent-cyan)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-cyan)' }}>
                          <BookOpen size={14} /> Distance Matrix
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>{b['Distance matrix']}</div>
                      </div>
                    )}

                    {/* Question Body */}
                    {b.Question && (
                      <div className="pyq-step-box">
                        <div className="pyq-step-title" style={{ color: 'var(--text-primary)' }}>
                          Question
                        </div>
                        <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {b.Question}
                        </div>
                      </div>
                    )}

                    {/* What You Should Notice First */}
                    {b['What You Should Notice First'] && (
                      <div className="callout callout-tip" style={{ margin: '12px 0' }}>
                        <div className="callout-header" style={{ fontSize: '13px' }}>
                          <Zap size={15} /> What You Should Notice First
                        </div>
                        <div className="callout-body" style={{ fontSize: '13px' }}>
                          {b['What You Should Notice First']}
                        </div>
                      </div>
                    )}

                    {/* Thought Process */}
                    {b['Thought Process'] && (
                      <div className="pyq-step-box" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-purple)' }}>
                          Thought Process & Intuition
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>
                          {b['Thought Process']}
                        </div>
                      </div>
                    )}

                    {/* Relevant Theory */}
                    {b['Relevant Theory'] && (
                      <div className="pyq-step-box" style={{ borderLeft: '3px solid var(--accent-indigo)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-indigo)' }}>
                          Relevant Theory
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>
                          {b['Relevant Theory']}
                        </div>
                      </div>
                    )}

                    {/* Step-by-Step Solution */}
                    {b['Step-by-Step Solution'] && (
                      <div className="pyq-step-box">
                        <div className="pyq-step-title" style={{ color: 'var(--text-primary)' }}>
                          Step-by-Step Derivation
                        </div>
                        <div style={{ fontSize: '13.5px', whiteSpace: 'pre-wrap', lineHeight: 1.65, fontFamily: 'var(--font-mono)' }}>
                          {b['Step-by-Step Solution']}
                        </div>
                      </div>
                    )}

                    {/* FINAL ANSWER HIGHLIGHT */}
                    {b['Final Answer'] && (
                      <div className="callout callout-exam" style={{ margin: '14px 0' }}>
                        <div className="callout-header" style={{ fontSize: '14px' }}>
                          <CheckCircle2 size={18} /> Final Answer
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                          {b['Final Answer']}
                        </div>
                      </div>
                    )}

                    {/* Why This Answer Makes Sense */}
                    {b['Why This Answer Makes Sense'] && (
                      <div className="pyq-step-box" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                        <div className="pyq-step-title" style={{ color: 'var(--accent-cyan)' }}>
                          Why This Answer Makes Sense
                        </div>
                        <div style={{ fontSize: '13px', whiteSpace: 'pre-wrap' }}>
                          {b['Why This Answer Makes Sense']}
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes / Traps */}
                    {b['Common Mistakes'] && (
                      <div className="callout callout-trap" style={{ margin: '12px 0' }}>
                        <div className="callout-header" style={{ fontSize: '13px' }}>
                          <AlertTriangle size={15} /> Common Mistakes & Traps to Avoid
                        </div>
                        <div className="callout-body" style={{ fontSize: '13px' }}>
                          {b['Common Mistakes']}
                        </div>
                      </div>
                    )}

                    {/* Exam Trick / Shortcut */}
                    {b['Exam Trick / Shortcut'] && (
                      <div className="callout callout-tip" style={{ margin: '12px 0' }}>
                        <div className="callout-header" style={{ fontSize: '13px' }}>
                          <Zap size={15} /> Exam Trick / 30-Second Shortcut
                        </div>
                        <div className="callout-body" style={{ fontSize: '13px' }}>
                          {b['Exam Trick / Shortcut']}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
