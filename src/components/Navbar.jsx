import React, { useState } from 'react';
import { 
  BookOpen, 
  Cpu, 
  FileText, 
  HelpCircle, 
  Zap, 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X,
  BookmarkCheck,
  Compass,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  theme, 
  toggleTheme, 
  sidebarOpen, 
  setSidebarOpen,
  onSearch,
  searchQuery
}) {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const tabs = [
    { id: 'notes', label: 'Hinglish Notes', icon: BookOpen },
    { id: 'visualizers', label: 'Visualizers', icon: Cpu },
    { id: 'pyqs', label: 'PYQs (7 Terms)', icon: FileText },
    { id: 'practice', label: 'Practice Quiz', icon: HelpCircle },
    { id: 'revision', label: '4-Hr Revision', icon: Zap },
    { id: 'formulas', label: 'Cheat Sheet', icon: Compass }
  ];

  return (
    <header className="top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          className={`nav-icon-btn ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse Sidebar (Ctrl+B)" : "Expand Sidebar (Ctrl+B)"}
          aria-label="Toggle Sidebar"
          style={{ display: 'flex' }}
        >
          {sidebarOpen ? <PanelLeftClose size={19} /> : <PanelLeft size={19} />}
        </button>

        <div className="nav-brand" onClick={() => setCurrentTab('notes')} style={{ cursor: 'pointer' }}>
          <span className="brand-badge">IITM AI</span>
          <div className="brand-title">
            <span>Search Methods</span>
            <span className="brand-subtitle">Master Prep Portal</span>
          </div>
        </div>
      </div>

      {/* Center Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="desktop-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Search, Theme Toggle */}
      <div className="nav-actions">
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search topics, A*, TSP, GSP..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '7px 16px 7px 36px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              width: '240px',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent-cyan)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-subtle)'}
          />
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          {searchQuery && (
            <button 
              onClick={() => onSearch('')} 
              style={{ position: 'absolute', right: '10px', color: 'var(--text-dim)', fontSize: '13px', padding: '2px' }}
            >
              ×
            </button>
          )}
        </div>

        <button 
          className="nav-icon-btn" 
          onClick={toggleTheme} 
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} style={{ color: '#f59e0b' }} /> : <Moon size={18} style={{ color: '#6366f1' }} />}
        </button>
      </div>
    </header>
  );
}
