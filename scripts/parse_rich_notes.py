import json
import re

def parse_blocks(raw_text):
    blocks = []
    lines = raw_text.split('\n')
    i = 0
    
    callout_keywords = {
        'Intuition': 'intuition',
        'Philosophical Note': 'mnemonic',
        'Definition': 'theory',
        'Agent — Simple Definition': 'theory',
        'Exam Tip': 'tip',
        'Exam ka favourite distinction': 'tip',
        'WA* Exam Tip': 'tip',
        'TSP BnB Exam Strategy': 'tip',
        'Tie Breaker — IMPORTANT for Exam': 'tip',
        'Yaad Rakho': 'exam',
        'Remember This': 'exam',
        'In galtiyon se bacho': 'trap',
        'Common Mistakes': 'trap',
        'Common Mistake in TSP BnB': 'trap',
        'Hill Climbing ki Problems': 'trap',
        'Memory Trick': 'mnemonic',
        'Memory Trick for All 4 Operators': 'mnemonic',
        'Core idea': 'theory',
        'Week ka Quote': 'quote',
        'Simple Path Example': 'intuition',
        'Manhattan Distance Formula': 'theory',
        'DFS — Kaise Kaam Karta Hai': 'theory',
        'BFS — Kaise Kaam Karta Hai': 'theory',
        'DFID — Kaise Kaam Karta Hai': 'theory',
        'Best First Search — Algorithm': 'theory',
        'Hill Climbing — Features': 'theory',
        'Branch & Bound — Key Concepts': 'theory',
        'A* — Core Formula': 'theory',
        'A* Step-by-Step Algorithm': 'theory',
        'Admissibility Conditions': 'exam',
        'WA* Formula': 'theory',
        'Simulated Annealing — Key Idea': 'theory',
        'Genetic Algorithm — Teen Steps': 'theory',
        'TSP BnB — Key Terminology': 'theory',
        'Lower Bound Calculation': 'exam',
        'When Does a Segment Become Permanent?': 'exam',
        'Game Tree — Key Terms': 'theory',
        'Minimax Rules': 'theory',
        'Alpha-Beta — Core Concept': 'theory',
        'Alpha Cut vs Beta Cut': 'exam',
        'SSS* Key Concepts': 'theory',
        'SSS* Algorithm — Step by Step Logic': 'theory',
        'STRIPS Domain — Simple Rules': 'theory',
        'Blocks World — PREDICATES': 'theory',
        'Operator 1: Pickup': 'theory',
        'Operator 2: Putdown': 'theory',
        'Operator 3: Unstack': 'theory',
        'Operator 4: Stack': 'theory',
        'GSP — Key Rules': 'exam',
        'A* Exam Checklist': 'exam',
        'Blocks World Exam Checklist': 'exam',
        'Game Trees Exam Checklist': 'exam',
        'TSP BnB Exam Checklist': 'exam',
        'Monotone / Consistent Heuristic': 'theory',
        'CSP — Triple Definition': 'theory',
        'Arc Consistency': 'theory',
        'Backtracking Improvements': 'exam'
    }

    while i < len(lines):
        line = lines[i].strip()
        if not line:
            i += 1
            continue
            
        # 1. Heading check: e.g. "0.1 ...", "1.2.1 ...", "Chapter 3 ..."
        m_head = re.match(r'^(Chapter\s+\d+.*|[0-9]{1,2}\.[0-9]{1,2}(?:\.[0-9]{1,2})?\s+.*)', line)
        if m_head:
            blocks.append({
                'type': 'heading',
                'level': 2 if line.startswith('Chapter') or line.count('.') == 1 else 3,
                'text': line
            })
            i += 1
            continue

        # 2. Callout check
        matched_callout = None
        for k, v in callout_keywords.items():
            if line.startswith(k):
                matched_callout = (k, v)
                break
                
        if matched_callout:
            c_title, c_type = matched_callout
            c_lines = []
            # Check if there is extra text on the same line after title
            rest_of_line = line[len(c_title):].strip()
            if rest_of_line.startswith('—') or rest_of_line.startswith(':'):
                rest_of_line = rest_of_line[1:].strip()
            if rest_of_line:
                c_lines.append(rest_of_line)
                
            i += 1
            while i < len(lines):
                nxt = lines[i].strip()
                if not nxt:
                    # check lookahead for new block
                    if i + 1 < len(lines):
                        peek = lines[i+1].strip()
                        if re.match(r'^(Chapter\s+\d+|[0-9]{1,2}\.[0-9]{1,2})\s+', peek) or any(peek.startswith(k) for k in callout_keywords.keys()):
                            break
                    c_lines.append('')
                    i += 1
                    continue
                if re.match(r'^(Chapter\s+\d+|[0-9]{1,2}\.[0-9]{1,2})\s+', nxt) or any(nxt.startswith(k) for k in callout_keywords.keys()):
                    break
                c_lines.append(lines[i])
                i += 1
                
            blocks.append({
                'type': 'callout',
                'calloutType': c_type,
                'title': c_title,
                'content': '\n'.join(c_lines).strip()
            })
            continue

        # 3. Bullet list check
        if line.startswith('•') or line.startswith('- ') or line.startswith('* '):
            list_items = []
            while i < len(lines):
                curr = lines[i].strip()
                if not curr:
                    break
                if curr.startswith('•') or curr.startswith('- ') or curr.startswith('* '):
                    item_text = re.sub(r'^[•\-\*]\s*', '', curr)
                    list_items.append(item_text)
                    i += 1
                elif list_items and not (re.match(r'^(Chapter\s+\d+|[0-9]{1,2}\.[0-9]{1,2})\s+', curr) or any(curr.startswith(k) for k in callout_keywords.keys())):
                    # continuation of previous bullet
                    list_items[-1] += ' ' + curr
                    i += 1
                else:
                    break
            blocks.append({
                'type': 'bullet_list',
                'items': list_items
            })
            continue

        # 4. Numbered list check: e.g. "1. ...", "2. ..."
        if re.match(r'^\d+\.\s+', line):
            num_items = []
            while i < len(lines):
                curr = lines[i].strip()
                if not curr:
                    break
                if re.match(r'^\d+\.\s+', curr):
                    item_text = re.sub(r'^\d+\.\s*', '', curr)
                    num_items.append(item_text)
                    i += 1
                elif num_items and not (re.match(r'^(Chapter\s+\d+|[0-9]{1,2}\.[0-9]{1,2})\s+', curr) or any(curr.startswith(k) for k in callout_keywords.keys())):
                    num_items[-1] += ' ' + curr
                    i += 1
                else:
                    break
            blocks.append({
                'type': 'numbered_list',
                'items': num_items
            })
            continue

        # 5. Default Paragraph
        p_lines = [line]
        i += 1
        while i < len(lines):
            curr = lines[i].strip()
            if not curr:
                break
            if (re.match(r'^(Chapter\s+\d+|[0-9]{1,2}\.[0-9]{1,2})\s+', curr) or 
                any(curr.startswith(k) for k in callout_keywords.keys()) or
                curr.startswith('•') or curr.startswith('- ') or re.match(r'^\d+\.\s+', curr)):
                break
            p_lines.append(lines[i])
            i += 1
            
        blocks.append({
            'type': 'paragraph',
            'text': ' '.join(p_lines)
        })

    return blocks

# Load existing modules
with open('src/data/notesData.json', 'r', encoding='utf-8') as f:
    modules = json.load(f)

for m in modules:
    raw = m.get('rawText', '')
    blocks = parse_blocks(raw)
    m['blocks'] = blocks
    print(f"Module {m['id']}: parsed {len(blocks)} rich content blocks")

with open('src/data/notesData.json', 'w', encoding='utf-8') as f:
    json.dump(modules, f, indent=2, ensure_ascii=False)

# Update notesData.js export
with open('src/data/notesData.js', 'w', encoding='utf-8') as f:
    f.write(f"""// AI: Search Methods for Problem Solving — Master Study Notes
// Source: AI_Master_Ebook_Anmol.pdf, AI_Search_Methods_Complete_Hinglish_Notes, & Week 1 Hinglish Edition
// Compiled for IIT Madras Degree Level Course

export const courseModules = {json.dumps(modules, indent=2, ensure_ascii=False)};
""")

print("Successfully updated notesData.json and notesData.js with structured blocks!")
