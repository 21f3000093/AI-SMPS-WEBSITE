import React from 'react';
import { 
  BookOpen, 
  Cpu, 
  FileText, 
  HelpCircle, 
  Zap, 
  CheckCircle2, 
  Flame, 
  Star, 
  Compass, 
  Layers, 
  AlertTriangle,
  PlayCircle
} from 'lucide-react';
import { courseModules } from '../data/notesData.js';
import { pyqPapers } from '../data/pyqData.js';

export default function Sidebar({
  currentTab,
  setCurrentTab,
  selectedModuleId,
  setSelectedModuleId,
  selectedVisualizer,
  setSelectedVisualizer,
  selectedPaperId,
  setSelectedPaperId,
  mobileOpen,
  closeMobileSidebar,
  completedModules = []
}) {
  return (
    <aside className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* SECTION 1: HINGLISH STUDY NOTES */}
      <div className="sidebar-section-title">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BookOpen size={13} style={{ color: 'var(--accent-cyan)' }} />
          Hinglish Notes (Weeks 0-12)
        </span>
      </div>
      {courseModules.map((m) => {
        const isActive = currentTab === 'notes' && selectedModuleId === m.id;
        const isDone = completedModules.includes(m.id);
        const isHighYield = m.examWeight.includes('Highest') || m.examWeight.includes('35%');

        return (
          <button
            key={m.id}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('notes');
              setSelectedModuleId(m.id);
              closeMobileSidebar();
            }}
          >
            {isDone ? (
              <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
            ) : isHighYield ? (
              <Flame size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
            ) : (
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                margin: '0 4px',
                flexShrink: 0
              }} />
            )}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {m.week === 0 ? "Ch 0: Foundation" : `Week ${m.week}: ${m.title.split(':')[1]?.trim() || m.title}`}
            </span>
            {isHighYield && (
              <span className="sidebar-item-badge" style={{ color: 'var(--accent-amber)', background: 'rgba(245, 158, 11, 0.15)' }}>
                HOT
              </span>
            )}
          </button>
        );
      })}

      {/* SECTION 2: INTERACTIVE VISUALIZERS */}
      <div className="sidebar-section-title" style={{ marginTop: '20px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Cpu size={13} style={{ color: 'var(--accent-indigo)' }} />
          Interactive Simulators
        </span>
      </div>
      {[
        { id: 'search', label: '1. Search Traversal (Grid/Graph)', icon: PlayCircle },
        { id: 'gametree', label: '2. Game Tree & Alpha-Beta', icon: PlayCircle },
        { id: 'blocksworld', label: '3. Blocks World & GSP', icon: PlayCircle },
        { id: 'crossover', label: '4. GA Crossover & Ordinal', icon: PlayCircle },
        { id: 'tsp', label: '5. TSP Heuristics (NN/Greedy)', icon: PlayCircle },
      ].map((vis) => {
        const isActive = currentTab === 'visualizers' && selectedVisualizer === vis.id;
        const Icon = vis.icon;
        return (
          <button
            key={vis.id}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('visualizers');
              setSelectedVisualizer(vis.id);
              closeMobileSidebar();
            }}
          >
            <Icon size={16} style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)', flexShrink: 0 }} />
            <span>{vis.label}</span>
          </button>
        );
      })}

      {/* SECTION 3: SOLVED PYQ PAPERS */}
      <div className="sidebar-section-title" style={{ marginTop: '20px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={13} style={{ color: 'var(--accent-purple)' }} />
          Solved PYQs (7 Terms)
        </span>
      </div>
      {pyqPapers.map((paper) => {
        const isActive = currentTab === 'pyqs' && selectedPaperId === paper.id;
        return (
          <button
            key={paper.id}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setCurrentTab('pyqs');
              setSelectedPaperId(paper.id);
              closeMobileSidebar();
            }}
          >
            <FileText size={15} style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)', flexShrink: 0 }} />
            <span>{paper.title}</span>
            <span className="sidebar-item-badge">
              {paper.questions.length}Q
            </span>
          </button>
        );
      })}

      {/* SECTION 4: EXAM DRILL & CRASH REVISION */}
      <div className="sidebar-section-title" style={{ marginTop: '20px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={13} style={{ color: 'var(--accent-amber)' }} />
          Exam Toolkit
        </span>
      </div>
      <button
        className={`sidebar-item ${currentTab === 'revision' ? 'active' : ''}`}
        onClick={() => {
          setCurrentTab('revision');
          closeMobileSidebar();
        }}
      >
        <Zap size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
        <span>4-Hour Crash Revision</span>
        <span className="sidebar-item-badge" style={{ color: 'var(--accent-amber)' }}>NIGHT</span>
      </button>

      <button
        className={`sidebar-item ${currentTab === 'top50' ? 'active' : ''}`}
        onClick={() => {
          setCurrentTab('top50');
          closeMobileSidebar();
        }}
      >
        <Star size={16} style={{ color: '#eab308', flexShrink: 0 }} />
        <span>Top 50 Most Asked</span>
        <span className="sidebar-item-badge" style={{ color: '#eab308' }}>CRIT</span>
      </button>

      <button
        className={`sidebar-item ${currentTab === 'formulas' ? 'active' : ''}`}
        onClick={() => {
          setCurrentTab('formulas');
          closeMobileSidebar();
        }}
      >
        <Compass size={16} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        <span>Formula & Cheat Sheet</span>
      </button>
    </aside>
  );
}
