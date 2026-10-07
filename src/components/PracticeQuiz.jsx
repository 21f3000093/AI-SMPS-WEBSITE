import React, { useState, useMemo } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, RotateCcw, Award, Clock, ArrowRight, Star, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { courseModules } from '../data/notesData.js';

export default function PracticeQuiz({ bookmarks = [], toggleBookmark }) {
  const [selectedWeek, setSelectedWeek] = useState('ALL');
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Pool all checkpoint questions from all modules
  const allQuizQuestions = useMemo(() => {
    let pool = [];
    courseModules.forEach(m => {
      (m.checkpointQuiz || []).forEach(q => {
        pool.push({
          ...q,
          weekNum: m.week,
          weekTitle: m.title
        });
      });
    });
    return pool;
  }, []);

  const filteredQuestions = useMemo(() => {
    if (selectedWeek === 'ALL') return allQuizQuestions;
    return allQuizQuestions.filter(q => q.weekNum === parseInt(selectedWeek));
  }, [allQuizQuestions, selectedWeek]);

  const handleSelect = (qId, optIdx) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    filteredQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount / filteredQuestions.length >= 0.7) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScore(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <HelpCircle size={22} style={{ color: 'var(--accent-indigo)' }} />
              Interactive Practice Test & Quiz Simulator
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Test your understanding across all course weeks with instant answer checking, score analysis, and deep explanations.
            </p>
          </div>

          {submitted && score !== null && (
            <div style={{
              background: score / filteredQuestions.length >= 0.7 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
              border: `1px solid ${score / filteredQuestions.length >= 0.7 ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`,
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Award size={20} style={{ color: score / filteredQuestions.length >= 0.7 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }} />
              <span style={{ fontSize: '15px', fontWeight: 800 }}>
                Score: {score} / {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
              </span>
            </div>
          )}
        </div>

        {/* Filter by Week */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Filter:</span>
          <button
            className={`btn-secondary ${selectedWeek === 'ALL' ? 'active' : ''}`}
            onClick={() => { setSelectedWeek('ALL'); handleReset(); }}
            style={{ fontSize: '12px', padding: '4px 10px', borderColor: selectedWeek === 'ALL' ? 'var(--accent-indigo)' : 'var(--border-subtle)' }}
          >
            All Weeks ({allQuizQuestions.length}Q)
          </button>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(w => (
            <button
              key={w}
              className={`btn-secondary ${selectedWeek === String(w) ? 'active' : ''}`}
              onClick={() => { setSelectedWeek(String(w)); handleReset(); }}
              style={{ fontSize: '12px', padding: '4px 10px', borderColor: selectedWeek === String(w) ? 'var(--accent-indigo)' : 'var(--border-subtle)' }}
            >
              {w === 0 ? 'Foundation' : `W${w}`}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredQuestions.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = selected === q.answer;

          return (
            <div key={q.id} className="card" style={{ background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <span className="badge badge-term" style={{ fontSize: '11px' }}>
                  {q.weekTitle.split(':')[0]}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Question {idx + 1} of {filteredQuestions.length}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '14px' }}>
                {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, optIdx) => {
                  let optBg = 'var(--bg-base)';
                  let optBorder = 'var(--border-subtle)';

                  if (submitted) {
                    if (optIdx === q.answer) {
                      optBg = 'rgba(16, 185, 129, 0.15)';
                      optBorder = 'var(--accent-emerald)';
                    } else if (selected === optIdx) {
                      optBg = 'rgba(244, 63, 94, 0.15)';
                      optBorder = 'var(--accent-rose)';
                    }
                  } else if (selected === optIdx) {
                    optBg = 'rgba(99, 102, 241, 0.15)';
                    optBorder = 'var(--accent-indigo)';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: optBg,
                        border: `1px solid ${optBorder}`,
                        cursor: submitted ? 'default' : 'pointer',
                        fontSize: '13.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        border: `2px solid ${selected === optIdx ? 'var(--accent-indigo)' : 'var(--text-dim)'}`,
                        background: selected === optIdx ? 'var(--accent-indigo)' : 'transparent',
                        flexShrink: 0
                      }} />
                      <span style={{ color: 'var(--text-primary)' }}>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Feedback when submitted */}
              {submitted && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                  borderLeft: `4px solid ${isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)'}`
                }}>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)', marginBottom: '4px' }}>
                    {isCorrect ? '✓ Sahi Jawab! (Correct)' : '✗ Galat Jawab!'}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submission Footer */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px' }}>
        <button className="btn-secondary" onClick={handleReset}>
          <RotateCcw size={16} />
          <span>Reset Test</span>
        </button>

        {!submitted ? (
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length === 0}
            style={{ opacity: Object.keys(userAnswers).length === 0 ? 0.5 : 1 }}
          >
            <span>Submit Quiz & View Score ({Object.keys(userAnswers).length}/{filteredQuestions.length} Answered)</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--accent-cyan)' }}>
            Review your answers above!
          </span>
        )}
      </div>
    </div>
  );
}
