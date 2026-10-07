import subprocess
import re
import json

def clean_text(t):
    if not t:
        return ""
    # remove header/footer lines like 'AI PYQ Handbook Made by Anmol Kansal with AI' or page numbers
    lines = t.split('\n')
    filtered = []
    for l in lines:
        s = l.strip()
        if re.search(r'AI PYQ Handbook|Made by Anmol Kansal with AI|Page \d+|\b\d+\b$', s) and len(s) < 50:
            continue
        filtered.append(l)
    return '\n'.join(filtered).strip()

def parse_box_sections(section_text):
    # Splits by standard boxes
    boxes = {}
    box_names = [
        "Topic Identification", "What You Should Notice First", "Thought Process",
        "Relevant Theory", "Step-by-Step Solution", "Final Answer", 
        "Why This Answer Makes Sense", "Common Mistakes", "Exam Trick / Shortcut",
        "Setup", "Graph", "Distance matrix", "Tour graph", "Potential Issue Detected",
        "Question", "PMX procedure", "Cycle Crossover", "Greedy edge rule"
    ]
    
    # Create regex pattern for box names
    pattern = r'\n\s*(' + '|'.join([re.escape(b) for b in box_names]) + r')\s*\n'
    splits = re.split(pattern, '\n' + section_text)
    
    # First part before any box is usually intro/preamble or question text
    if splits[0].strip():
        boxes["preamble"] = splits[0].strip()
        
    for i in range(1, len(splits), 2):
        name = splits[i].strip()
        content = splits[i+1].strip() if i+1 < len(splits) else ""
        boxes[name] = content
        
    return boxes

def main():
    raw = subprocess.check_output(['pdftotext', '/home/shubham/Desktop/IITM Degree Level/AI/AI_QUIZ1_PYQ_Handbook.pdf', '-']).decode('utf-8', errors='ignore')
    text = raw.replace('\x16', '—').replace('\x0c', '\n')
    
    papers_meta = [
        {"id": "2024_t1", "term": "2024 Term 1", "ch": 8, "marks": 25, "questions_count": 22},
        {"id": "2024_t2", "term": "2024 Term 2", "ch": 9, "marks": 25, "questions_count": 22},
        {"id": "2024_t3", "term": "2024 Term 3", "ch": 10, "marks": 25, "questions_count": 22},
        {"id": "2025_t1", "term": "2025 Term 1", "ch": 11, "marks": 25, "questions_count": 21},
        {"id": "2025_t2", "term": "2025 Term 2", "ch": 12, "marks": 25, "questions_count": 21},
        {"id": "2025_t3", "term": "2025 Term 3", "ch": 13, "marks": 25, "questions_count": 21},
        {"id": "2026_t1", "term": "2026 Term 1", "ch": 14, "marks": 23, "questions_count": 25},
    ]
    
    parsed_papers = []
    
    for i, p in enumerate(papers_meta):
        curr_ch = p["ch"]
        next_ch = curr_ch + 1
        start_pat = rf'Chapter\s+{curr_ch}\s*\n\s*Fully Solved Paper\s*—\s*{re.escape(p["term"])}'
        m_start = re.search(start_pat, text)
        if not m_start:
            continue
        start_idx = m_start.end()
        if i < len(papers_meta) - 1:
            end_pat = rf'Chapter\s+{next_ch}\s*\n\s*Fully Solved Paper'
            m_end = re.search(end_pat, text[start_idx:])
            ch_text = text[start_idx: start_idx + m_end.start()] if m_end else text[start_idx:start_idx+35000]
        else:
            end_pat = r'Chapter\s+15'
            m_end = re.search(end_pat, text[start_idx:])
            ch_text = text[start_idx: start_idx + m_end.start()] if m_end else text[start_idx:start_idx+35000]
            
        # Extract individual questions in this chapter
        # Questions look like: \n(\d+\.\d+(?:\.\d+)?)\s*(?:\[\d+\s*M\])?\s*Q\d+... or \n(\d+\.\d+)\s+Q\d+
        q_splits = re.split(r'\n(?=(?:\d+\.\d+(?:\.\d+)?\s+)?Q\d+)', ch_text)
        
        glance = ""
        questions = []
        if len(q_splits) > 0 and 'Paper at a Glance' in q_splits[0]:
            glance = q_splits[0].strip()
            
        for chunk in q_splits[1:]:
            chunk = chunk.strip()
            if not chunk:
                continue
            first_line = chunk.split('\n')[0].strip()
            # match question header e.g. "Q22 [1 M] — DFID Node-Count Purpose" or "8.1 Q22 [1 M] — ..."
            header_match = re.search(r'(?:(\d+\.\d+(?:\.\d+)?)\s+)?(Q\d+(?:\s*—?\s*Q\d+)?)\s*(?:\[(\d+)\s*M\])?\s*—?\s*([^\n]+)', first_line)
            
            q_num = ""
            marks = "1"
            title = first_line
            sec_num = ""
            
            if header_match:
                sec_num = header_match.group(1) or ""
                q_num = header_match.group(2)
                marks = header_match.group(3) or "1"
                title = header_match.group(4) or first_line
            else:
                m_simple = re.search(r'(Q\d+)', first_line)
                if m_simple:
                    q_num = m_simple.group(1)
                    
            body = '\n'.join(chunk.split('\n')[1:]).strip()
            boxes = parse_box_sections(body)
            
            questions.append({
                "id": f"{p['id']}_{q_num.replace(' ', '_').replace('—', '_')}",
                "sec": sec_num,
                "qNum": q_num,
                "marks": int(marks) if marks.isdigit() else 1,
                "title": title.strip(),
                "fullHeader": first_line,
                "boxes": boxes,
                "raw": clean_text(chunk)
            })
            
        parsed_papers.append({
            "id": p["id"],
            "title": p["term"],
            "marks": p["marks"],
            "glance": clean_text(glance),
            "questions": questions
        })
        print(f"Extracted {len(questions)} questions from {p['term']}")
        
    # Extract Chapter 15 (Top 50)
    ch15_idx = re.search(r'Chapter\s+15\s*\n', text).start()
    ch16_idx = re.search(r'Chapter\s+16\s*\n', text).start()
    ch15_txt = clean_text(text[ch15_idx:ch16_idx])
    
    # Extract Chapter 16 (Predicted)
    ch17_idx = re.search(r'Chapter\s+17\s*\n', text).start()
    ch16_txt = clean_text(text[ch16_idx:ch17_idx])
    
    # Extract Chapter 17 (4-Hour Plan)
    ch18_idx = re.search(r'Chapter\s+18\s*\n', text).start()
    ch17_txt = clean_text(text[ch17_idx:ch18_idx])
    
    # Extract Chapter 18 (Reference Sheet)
    ch19_idx = re.search(r'Chapter\s+19\s*\n', text).start()
    ch18_txt = clean_text(text[ch18_idx:ch19_idx])
    
    # Extract Chapter 19 (Gaps)
    ch19_txt = clean_text(text[ch19_idx:])
    
    output_data = {
        "papers": parsed_papers,
        "top50": ch15_txt,
        "predicted": ch16_txt,
        "revision4hour": ch17_txt,
        "referenceSheet": ch18_txt,
        "gapsAndTraps": ch19_txt
    }
    
    with open('src/data/pyqData.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
        
    print("Saved pyqData.json successfully!")

if __name__ == '__main__':
    main()
