import subprocess
import re
import json

def extract_pyqs():
    raw = subprocess.check_output(['pdftotext', '/home/shubham/Desktop/IITM Degree Level/AI/AI_QUIZ1_PYQ_Handbook.pdf', '-']).decode('utf-8', errors='ignore')
    text = raw.replace('\x16', '—').replace('\x0c', '\n')
    
    # Extract papers
    papers = [
        {"id": "2024_t1", "term": "2024 Term 1", "ch": 8},
        {"id": "2024_t2", "term": "2024 Term 2", "ch": 9},
        {"id": "2024_t3", "term": "2024 Term 3", "ch": 10},
        {"id": "2025_t1", "term": "2025 Term 1", "ch": 11},
        {"id": "2025_t2", "term": "2025 Term 2", "ch": 12},
        {"id": "2025_t3", "term": "2025 Term 3", "ch": 13},
        {"id": "2026_t1", "term": "2026 Term 1", "ch": 14},
    ]
    
    parsed_papers = []
    
    for i, p in enumerate(papers):
        curr_ch = p["ch"]
        next_ch = curr_ch + 1
        
        # find start of chapter
        start_pat = rf'Chapter\s+{curr_ch}\s*\n\s*Fully Solved Paper\s*—\s*{re.escape(p["term"])}'
        m_start = re.search(start_pat, text)
        if not m_start:
            print(f"Could not find start for {p['term']}")
            continue
            
        start_idx = m_start.end()
        if i < len(papers) - 1:
            end_pat = rf'Chapter\s+{next_ch}\s*\n\s*Fully Solved Paper'
            m_end = re.search(end_pat, text[start_idx:])
            ch_text = text[start_idx: start_idx + m_end.start()] if m_end else text[start_idx:start_idx+35000]
        else:
            end_pat = r'Chapter\s+15'
            m_end = re.search(end_pat, text[start_idx:])
            ch_text = text[start_idx: start_idx + m_end.start()] if m_end else text[start_idx:start_idx+35000]
            
        parsed_papers.append({
            "id": p["id"],
            "title": p["term"],
            "raw_text": ch_text
        })
        print(f"Parsed {p['term']}, length: {len(ch_text)}")

extract_pyqs()
