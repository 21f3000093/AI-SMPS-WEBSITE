import subprocess
import re
import json

def clean(s):
    if not s:
        return ""
    lines = s.split('\n')
    filtered = []
    for l in lines:
        st = l.strip()
        if re.search(r'AI: Search Methods|Original notes: Anmol Kansal|Page \d+|AI PYQ Handbook', st) and len(st) < 60:
            continue
        filtered.append(l)
    return '\n'.join(filtered).strip()

def extract_comp_chapters():
    text = subprocess.check_output(['pdftotext', '/home/shubham/Desktop/IITM Degree Level/AI/AI_Search_Methods_Complete_Hinglish_Notes.docx.pdf', '-']).decode('utf-8', errors='ignore')
    norm = text.replace('\x0c', '\n\n')
    ch_matches = list(re.finditer(r'(Chapter\s+(\d+)\s*—\s*([^\n]+))', norm))
    chapters = {}
    for i, m in enumerate(ch_matches):
        start = m.start()
        end = ch_matches[i+1].start() if i+1 < len(ch_matches) else len(norm)
        ch_num = int(m.group(2))
        ch_title = m.group(3).strip()
        ch_body = clean(norm[start:end])
        chapters[ch_num] = {
            "title": ch_title,
            "body": ch_body
        }
    return chapters

def extract_week1():
    text = subprocess.check_output(['pdftotext', '/home/shubham/Desktop/IITM Degree Level/AI/Hinglish Notes Anmol/AI_Week1_Hinglish_Notes.pdf', '-']).decode('utf-8', errors='ignore')
    return clean(text.replace('\x0c', '\n\n'))

def extract_master_ebook():
    text = subprocess.check_output(['pdftotext', '/home/shubham/Desktop/IITM Degree Level/AI/AI_Master_Ebook_Anmol.pdf', '-']).decode('utf-8', errors='ignore')
    return clean(text.replace('\x0c', '\n\n'))

def main():
    comp_chs = extract_comp_chapters()
    w1_text = extract_week1()
    master_text = extract_master_ebook()
    
    # Parse Week 1 sections
    w1_sections = []
    w1_sec_splits = re.split(r'\n(?=1\.\d+\s+)', w1_text)
    for s in w1_sec_splits:
        s = s.strip()
        if not s:
            continue
        first_line = s.split('\n')[0].strip()
        body = '\n'.join(s.split('\n')[1:]).strip()
        sec_m = re.match(r'(1\.\d+)\s+(.*)', first_line)
        sec_num = sec_m.group(1) if sec_m else ""
        sec_title = sec_m.group(2) if sec_m else first_line
        w1_sections.append({
            "id": f"sec-{sec_num.replace('.', '-')}",
            "num": sec_num,
            "title": sec_title,
            "content": body
        })
        
    modules = [
        {
            "id": "week-0",
            "week": 0,
            "title": "Foundation: Shuru se Shuru — AI Kya Hai?",
            "subtitle": "Zero level se AI, Agents aur Search ki basic understanding",
            "examWeight": "Foundation (1-2 Marks)",
            "summary": "AI ka matlab machine ko samajhne aur decide karne ki taaqat dena. Is module me hum Agent, Problem Solving, State Space, Manhattan Distance aur Search complexities ko bilkul aasaan Hinglish me samjhenge.",
            "rawText": comp_chs[0]["body"],
            "diagramType": "roadmap"
        },
        {
            "id": "week-1",
            "week": 1,
            "title": "Week 1: Introduction, Philosophy aur AI ka Landscape",
            "subtitle": "Intelligent Agents, Turing Test, Winograd Schema & 6 Assumptions",
            "examWeight": "4-5 Marks (~20% in Quiz 1)",
            "summary": "AI ka goal, intelligent agent ke 4 lakshan (P-A-P-G), 3 layers (Signal, Neuro-fuzzy, Symbolic), Turing Test vs Winograd Schema Challenge, aur classical search ke 6 simplifying assumptions (SCOAR-D).",
            "rawText": w1_text,
            "sections": w1_sections,
            "diagramType": "onion-layers"
        },
        {
            "id": "week-2",
            "week": 2,
            "title": "Week 2: State Space Search, DFS, BFS aur DFID",
            "subtitle": "Blind Search Algorithms, OPEN/CLOSED Lists & Complexity Analysis",
            "examWeight": "6-7 Marks (~28% in Quiz 1)",
            "summary": "State space ek implicit graph hai. DFS (stack LIFO), BFS (queue FIFO), NodePair parent tracing, RemoveSeen, b^d complexity, aur DFID (Depth-First Iterative Deepening) jo DFS ki linear memory ke saath BFS ki optimality deta hai.",
            "rawText": comp_chs[1]["body"],
            "diagramType": "search-tree"
        },
        {
            "id": "week-3",
            "week": 3,
            "title": "Week 3: Heuristic Search, Best First & Hill Climbing",
            "subtitle": "Informed Search, Local Optima, Beam Search, Tabu & Simulated Annealing",
            "examWeight": "4-6 Marks (~22% in Quiz 1)",
            "summary": "Heuristic function h(n) search ko direction deta hai. Best First search, Hill Climbing (constant space, lekin local maxima trap), Beam Search, Tabu Search (tenure & aspiration), aur Simulated Annealing (sigmoid acceptance probability).",
            "rawText": comp_chs[2]["body"] + "\n\n" + comp_chs[4]["body"],
            "diagramType": "heuristic-landscape"
        },
        {
            "id": "week-4",
            "week": 4,
            "title": "Week 4: Population-Based Methods — GA, TSP Heuristics & ACO",
            "subtitle": "Genetic Algorithms, Crossovers (PMX, CX), Ordinal Rep & Ant Colony",
            "examWeight": "8-9 Marks (~35% in Quiz 1 — Single Largest Chunk!)",
            "summary": "Population-based search. Darwinian evolution, Roulette wheel selection, TSP representations (Path, Adjacency, Ordinal), Cycle Crossover (CX multi-cycle), PMX, Nearest Neighbour, Greedy Edges (saturation trap), Savings Heuristic aur Ant Colony (ACO).",
            "rawText": comp_chs[4]["body"] + "\n\n" + comp_chs[5]["body"],
            "diagramType": "crossover-map"
        },
        {
            "id": "week-5",
            "week": 5,
            "title": "Week 5: Optimal Paths — Branch & Bound, Dijkstra aur Algorithm A*",
            "subtitle": "f(n) = g(n) + h(n), Admissibility Theorem, 3 Cases & 6 Lemmas",
            "examWeight": "8-10 Marks in Quiz 2 / End-Term (★★★★★ Highest)",
            "summary": "A* search Branch & Bound (cost g) aur Best First (heuristic h) ko combine karta hai: f(n) = g(n) + h(n). Admissible heuristic (kabhi overestimate nahi karta) guarantees optimal path. 6 Lemmas aur Case-3 reopen mechanics.",
            "rawText": comp_chs[3]["body"],
            "diagramType": "astar-graph"
        },
        {
            "id": "week-6",
            "week": 6,
            "title": "Week 6: Monotone Condition, Space-Saving A* & Sequence Alignment",
            "subtitle": "Consistent Heuristic (Case 3 Vanishes), Frontier Search & Beam Stack Search",
            "examWeight": "4-5 Marks in Quiz 2 / End-Term",
            "summary": "Monotone (consistent) condition: h(m) - h(n) <= k(m,n). Isse f-values non-decreasing hoti hain aur CLOSED nodes ko kabhi reopen nahi karna padta (Case 3 vanishes). Sequence alignment, Frontier Search, SMGS, BFHS, aur DCBSS.",
            "rawText": comp_chs[8]["body"],
            "diagramType": "monotone-triangle"
        },
        {
            "id": "week-7",
            "week": 7,
            "title": "Week 7: Game Playing — Minimax, Alpha-Beta aur SSS*",
            "subtitle": "2-Player Zero-Sum Games, α/β Pruning Cutoffs & Strategy Clusters",
            "examWeight": "4-6 Marks in Quiz 2 / End-Term",
            "summary": "Adversarial search. Max player (maximize) vs Min player (minimize). Minimax backup rule, Alpha-Beta pruning (alpha >= beta par cutoff), Knuth-Moore b^(d/2) complexity, evaluation functions, horizon effect, aur SSS* best-first game tree search.",
            "rawText": comp_chs[6]["body"],
            "diagramType": "minimax-tree"
        },
        {
            "id": "week-8",
            "week": 8,
            "title": "Week 8: Automated Domain-Independent Planning",
            "subtitle": "STRIPS, Blocks World (5 Predicates & 4 Operators), GSP, Sussman's Anomaly & POP",
            "examWeight": "8-10 Marks in Quiz 2 / End-Term (★★★★★ Highest)",
            "summary": "Action-centric problem solving. STRIPS operators (preconditions, ADD, DELETE). Blocks World ke 4 operators. Forward (FSSP) vs Backward (BSSP) planning. Goal Stack Planning (GSP), Sussman's Anomaly (non-serializable subgoals), aur Partial Order Planning (POP).",
            "rawText": comp_chs[7]["body"],
            "diagramType": "blocks-world"
        },
        {
            "id": "week-9",
            "week": 9,
            "title": "Week 9: Problem Decomposition aur Algorithm AO*",
            "subtitle": "AND-OR Graphs, Solution Subtrees, Backed-Up Cost & Prolog Chaining",
            "examWeight": "3-5 Marks in Quiz 2 / End-Term",
            "summary": "Hierarchical problem solving. AND-OR trees me OR nodes alternatives hain aur AND nodes me sabhi sub-goals solve karne padte hain. Backed-up cost: AND = sum, OR = min. AO* algorithm, Means-Ends Analysis (GPS), DENDRAL expert system aur Prolog.",
            "rawText": """Chapter 9 (Master E-Book) — Problem Decomposition and Algorithm AO*

9.1 Linear Plans se Hierarchical Decomposition tak
Socho doston ke saath evening plan kar rahe ho:
Activity choose karo -> Movie choose karo -> Restaurant choose karo.
Agar friend ne mall reject kar diya, toh pure combination (mall+movie+dinner) ko baar-baar DFS se explore karna wasteful hai.
Solution: Independent sub-goals ko alag solve karo. Activity, movie aur restaurant independent hain.

9.2 AND-OR Trees (Goal Trees)
- OR nodes: Alternatives represent karte hain. Ek bhi child solve hua toh OR node SOLVED ho jaata hai.
- AND nodes (arc se judey hue): Sub-goals me decompose karte hain. Sabhi children ka solve hona compulsory hai!
- Solution: Ek subtree hota hai (path nahi!), jahan har OR node ka 1 child aur har AND node ke saare children SOLVED primitives hote hain.

9.3 Backed-Up Cost Formula (YAAD KARO!)
Internal AND node n:
cost(n) = Sum of (edge_cost_i + cost(child_i))
Internal OR node n:
cost(n) = Min of (edge_cost_i + cost(child_i))

9.4 Algorithm AO*
AO* partial solution subtrees par best-first search karta hai.
1. Forward phase: Root se marked best edges follow karke unsolved leaf n tak pahuncho. n ko expand karo.
2. Backward phase: Newly generated children se n ka cost recompute karo. Ancestors me propagate karo aur OR nodes par cheapest child ko re-mark karo.
3. Solved propagation: Agar AND node ke sabhi children SOLVED hain, toh AND node SOLVED ho jaata hai. Root SOLVED hone par terminate!

⚠️ Exam Trap: AO* lowest raw-h wale node ko nahi, balki CHEAPEST PARTIAL SOLUTION ke leaf ko expand karta hai!""",
            "diagramType": "and-or-tree"
        },
        {
            "id": "week-10",
            "week": 10,
            "title": "Week 10: Pattern-Directed Inference Systems aur Rete Algorithm",
            "subtitle": "Production Systems, Conflict Resolution, Discrimination Trees & Joins",
            "examWeight": "3-4 Marks in End-Term",
            "summary": "MoveGen ko rules me todna: pattern => action. Working Memory Elements (WMEs), Match-Resolve-Execute cycle, conflict resolution strategies (refractoriness, recency, specificity, MEA). Rete algorithm ke alpha nodes aur beta join network.",
            "rawText": """Chapter 10 (Master E-Book) — Pattern-Directed Inference Systems aur Rete Algorithm

10.1 MoveGen se Rules tak: Declarative AI
Pehle saari knowledge MoveGen ke andar hardcode hoti thi.
Pattern-Directed Inference System me knowledge independent rules me hoti hai:
IF pattern matches THEN take action.

10.2 Production System Architecture
1. Working Memory (WM): Short-term memory jisme WMEs (facts) hote hain.
2. Productions (Rules): LHS (Patterns) -> RHS (Actions).
3. Inference Engine: Match-Resolve-Execute cycle chalata hai:
   - Match: WM aur rule patterns ko match karke CONFLICT SET banata hai.
   - Resolve: Conflict resolution strategy se ek rule chunta hai.
   - Execute: RHS actions run karta hai (make, remove, modify WME).

10.3 Conflict Resolution Strategies (Exam Favourites!)
1. Refractoriness: Ek rule instance same WME binding par sirf EK baar fire karta hai (infinite loop se bachata hai).
2. Lexical Order: Program me pehle likha rule pehle chalega (Prolog style).
3. Specificity: Jis rule me zyada tests/patterns honge, wo pehle chalega (default vs specific).
4. Recency: Sabse recently add hue WME ko use karne wala rule pehle chalega.
5. MEA: First pattern ke context par recency lagao, phir specificity se tie break karo.

10.4 The Rete Algorithm (Charles Forgy, 1979)
Brute-force matching bahut slow hota hai: O(|R| * |WM|^k).
Rete algorithm do ideas use karta hai:
1. Inter-cycle persistence: Jo partial matches pichle cycle me bane the, unhe save rakho; sirf changed WME process karo.
2. Intra-cycle sharing: Agar do rules me common pattern hai, test ek hi baar run karo.
Architecture:
- Alpha network: Single-WME attribute tests (discrimination tree). Leaves par Alpha Memory hoti hai.
- Beta network: Multi-WME joins jo shared variables par bind karte hain. Complete match par Conflict Set me jata hai.""",
            "diagramType": "rete-network"
        },
        {
            "id": "week-11",
            "week": 11,
            "title": "Week 11: Constraint Satisfaction Problems (CSP)",
            "subtitle": "CSPs <X,D,C>, Arc Consistency AC-3, Forward Checking & Waltz Algorithm",
            "examWeight": "4-6 Marks in End-Term",
            "summary": "CSPs search aur reasoning ko unify karta hai. Triple <X, D, C>, Map colouring, N-Queens column encoding, Backtracking with Dynamic Variable Ordering (MRV fail-first), Arc Consistency (AC-1, AC-3), Forward Checking, aur Waltz line drawing algorithm.",
            "rawText": comp_chs[9]["body"],
            "diagramType": "constraint-graph"
        },
        {
            "id": "week-12",
            "week": 12,
            "title": "Week 12: Course Revision aur Big Picture of AI",
            "subtitle": "First Principles vs Knowledge-Based, Master Taxonomy & Complexity Matrix",
            "examWeight": "Summary & Synthesis",
            "summary": "Poore 12 weeks ka mahasangam. First principles (search) vs Knowledge-based (rules/memory/induction). Full algorithm comparison cheat-sheet, Bayesian networks, causality ladder, 3 reasoning forms (deduction, induction, abduction) aur final exam survival tips.",
            "rawText": comp_chs[10]["body"],
            "diagramType": "taxonomy-tree"
        }
    ]
    
    with open('src/data/notesData.json', 'w', encoding='utf-8') as f:
        json.dump(modules, f, indent=2, ensure_ascii=False)
        
    print(f"Saved notesData.json with {len(modules)} complete modules!")

if __name__ == '__main__':
    main()
