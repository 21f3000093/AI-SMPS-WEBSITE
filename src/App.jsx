import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import NotesViewer from './components/NotesViewer.jsx';
import PYQViewer from './components/PYQViewer.jsx';
import PracticeQuiz from './components/PracticeQuiz.jsx';
import RevisionCrashCourse from './components/RevisionCrashCourse.jsx';
import FormulaSheet from './components/FormulaSheet.jsx';
import Top50Viewer from './components/Top50Viewer.jsx';

// Interactive Visualizers
import SearchSimulator from './components/Visualizers/SearchSimulator.jsx';
import GameTreeVisualizer from './components/Visualizers/GameTreeVisualizer.jsx';
import BlocksWorldVisualizer from './components/Visualizers/BlocksWorldVisualizer.jsx';
import GACalculator from './components/Visualizers/GACalculator.jsx';
import TspWorkbench from './components/Visualizers/TspWorkbench.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('ai_smps_theme') || 'dark');
  const [currentTab, setCurrentTab] = useState('notes');
  const [selectedModuleId, setSelectedModuleId] = useState('week-1');
  const [selectedVisualizer, setSelectedVisualizer] = useState('search');
  const [selectedPaperId, setSelectedPaperId] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Bookmarks & Completed tracking
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ai_smps_bookmarks')) || [];
    } catch {
      return [];
    }
  });

  const [completedModules, setCompletedModules] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ai_smps_completed')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ai_smps_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ai_smps_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('ai_smps_completed', JSON.stringify(completedModules));
  }, [completedModules]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleModuleComplete = (id) => {
    setCompletedModules(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          selectedModuleId={selectedModuleId}
          setSelectedModuleId={setSelectedModuleId}
          selectedVisualizer={selectedVisualizer}
          setSelectedVisualizer={setSelectedVisualizer}
          selectedPaperId={selectedPaperId}
          setSelectedPaperId={setSelectedPaperId}
          mobileOpen={sidebarOpen}
          closeMobileSidebar={() => setSidebarOpen(false)}
          completedModules={completedModules}
        />

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              top: 'var(--header-height)',
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 80
            }}
          />
        )}

        {/* Dynamic Main Content Area */}
        <main className="content-area">
          {currentTab === 'notes' && (
            <NotesViewer
              selectedModuleId={selectedModuleId}
              setSelectedModuleId={setSelectedModuleId}
              completedModules={completedModules}
              toggleModuleComplete={toggleModuleComplete}
            />
          )}

          {currentTab === 'visualizers' && (
            <div>
              {/* Visualizer selector tab */}
              <div className="card" style={{ marginBottom: '18px', padding: '12px 18px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Simulators:
                </span>
                {[
                  { id: 'search', label: '1. Search Traversal (Grid/Graph)' },
                  { id: 'gametree', label: '2. Game Tree & Alpha-Beta' },
                  { id: 'blocksworld', label: '3. Blocks World & GSP' },
                  { id: 'crossover', label: '4. GA Crossover & Ordinal' },
                  { id: 'tsp', label: '5. TSP Heuristics (NN/Greedy)' },
                ].map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVisualizer(v.id)}
                    className={`btn-secondary ${selectedVisualizer === v.id ? 'active' : ''}`}
                    style={{
                      fontSize: '12.5px',
                      padding: '5px 12px',
                      borderColor: selectedVisualizer === v.id ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                      background: selectedVisualizer === v.id ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-elevated)',
                      color: selectedVisualizer === v.id ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              {selectedVisualizer === 'search' && <SearchSimulator />}
              {selectedVisualizer === 'gametree' && <GameTreeVisualizer />}
              {selectedVisualizer === 'blocksworld' && <BlocksWorldVisualizer />}
              {selectedVisualizer === 'crossover' && <GACalculator />}
              {selectedVisualizer === 'tsp' && <TspWorkbench />}
            </div>
          )}

          {currentTab === 'pyqs' && (
            <PYQViewer
              selectedPaperId={selectedPaperId}
              setSelectedPaperId={setSelectedPaperId}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              searchQuery={searchQuery}
            />
          )}

          {currentTab === 'practice' && (
            <PracticeQuiz
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          )}

          {currentTab === 'revision' && (
            <RevisionCrashCourse />
          )}

          {currentTab === 'formulas' && (
            <FormulaSheet />
          )}

          {currentTab === 'top50' && (
            <Top50Viewer
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
            />
          )}
        </main>
      </div>
    </div>
  );
}
