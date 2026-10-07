import json
import re

with open('src/data/pyqData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Parse Top 50 questions
top50_raw = data.get('top50', '')
top50_items = []

# Items start with #1., #2., etc.
item_splits = re.split(r'\n(?=#\d+\.\s+)', top50_raw)
for chunk in item_splits:
    chunk = chunk.strip()
    if not chunk or not chunk.startswith('#'):
        continue
    first_line = chunk.split('\n')[0].strip()
    m = re.match(r'#(\d+)\.\s+([^\.]+)\.\s*(?:Freq\s+([^—\n]+))?(?:—\s*Years\s+([^—\n]+))?(?:—\s*([^\.]+))?', first_line)
    
    num = ""
    title = first_line
    freq = ""
    years = ""
    imp = "High"
    
    if m:
        num = m.group(1)
        title = m.group(2).strip()
        freq = m.group(3).strip() if m.group(3) else ""
        years = m.group(4).strip() if m.group(4) else ""
        imp = m.group(5).strip() if m.group(5) else "High"
    else:
        num_m = re.search(r'#(\d+)', first_line)
        if num_m:
            num = num_m.group(1)
            
    body = '\n'.join(chunk.split('\n')[1:]).strip()
    
    # Determine category
    n_val = int(num) if num.isdigit() else 1
    if n_val <= 18:
        category = "Search (DFS/BFS/Best-First/HC)"
    elif n_val <= 30:
        category = "TSP Heuristics (NN/Greedy/Savings)"
    elif n_val <= 40:
        category = "Genetic Algorithm & Representations"
    elif n_val <= 46:
        category = "State Space & Puzzles"
    else:
        category = "Algorithm Meta-Questions"
        
    top50_items.append({
        "id": f"top50_{num}",
        "rank": int(num) if num.isdigit() else len(top50_items)+1,
        "title": title,
        "category": category,
        "frequency": freq,
        "years": years,
        "importance": imp,
        "content": body,
        "fullText": chunk
    })

print(f"Parsed {len(top50_items)} Top 50 items.")

# Parse Predicted Questions
pred_raw = data.get('predicted', '')
# Let's organize predicted questions into categories
data['parsedTop50'] = top50_items

with open('src/data/pyqData.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Now write pyqData.js
js_code = f"""// AI SMPS: Complete PYQ Bank & Top Questions
// Sourced from AI_QUIZ1_PYQ_Handbook.pdf
// Covers all 7 released papers (2024 T1, T2, T3; 2025 T1, T2, T3; 2026 T1)

import rawPyqData from './pyqData.json';

export const pyqPapers = rawPyqData.papers;
export const top50Questions = rawPyqData.parsedTop50;
export const rawPredicted = rawPyqData.predicted;
export const rawRevision4Hour = rawPyqData.revision4hour;
export const rawReferenceSheet = rawPyqData.referenceSheet;
export const rawGapsAndTraps = rawPyqData.gapsAndTraps;
"""

with open('src/data/pyqData.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Saved src/data/pyqData.js successfully!")
