import json
import re

with open('src/data/notesData.json', 'r', encoding='utf-8') as f:
    modules = json.load(f)

# Let's inspect the modules
print(f"Loaded {len(modules)} modules.")

# Add curated checkpoint quizzes for each week
checkpoint_quizzes = {
    0: [
        {
            "id": "q0_1",
            "question": "AI Agent ke 4 pramukh lakshan (features) kaun se hain?",
            "options": [
                "(a) Fast, Strong, Smart, Reliable",
                "(b) Persistent, Autonomous, Proactive, Goal-directed (P-A-P-G)",
                "(c) Linear, Deterministic, Static, Discrete",
                "(d) Input, Processing, Memory, Output"
            ],
            "answer": 1,
            "explanation": "Khemani ke anusaar har intelligent agent 'P-A-P-G' hota hai: Persistent (chalta rehta hai), Autonomous (khud decide karta hai), Proactive (apne subgoals banata hai), aur Goal-directed (goals achieve karta hai)."
        },
        {
            "id": "q0_2",
            "question": "Grid par (2, 3) se Goal (5, 1) tak ka Manhattan Distance kya hoga?",
            "options": ["(a) 3.6", "(b) 5", "(c) 7", "(d) 4"],
            "answer": 1,
            "explanation": "Manhattan Distance = |x1 - x2| + |y1 - y2| = |2 - 5| + |3 - 1| = 3 + 2 = 5."
        }
    ],
    1: [
        {
            "id": "q1_1",
            "question": "Autonomous agent ki 3 concentric layers me se Classical AI kis layer par kaam karta hai?",
            "options": [
                "(a) Outer Layer (Signal processing)",
                "(b) Middle Layer (Neuro-fuzzy / Pattern matching)",
                "(c) Inner Layer (Symbolic reasoning / GOFAI)",
                "(d) Sare layers barabar"
            ],
            "answer": 2,
            "explanation": "Classical AI (GOFAI) sabse andar wali layer yaani Symbolic Reasoning me rehta hai. Perception signals ko symbols me convert karta hai aur search symbols par reasoning karta hai."
        },
        {
            "id": "q1_2",
            "question": "Winograd Schema Challenge (WSC) ko Turing Test se behtar aur 'Google-proof' kyun mana jaata hai?",
            "options": [
                "(a) Kyunki isme mathematical equations solve karni padti hain",
                "(b) Kyunki sirf ek word badalta hai jo statistically similar hota hai, isliye sirf common-sense world knowledge se hi answer nikalta hai",
                "(c) Kyunki isme image recognition test hoti hai",
                "(d) Kyunki isse kisi computer ne aaj tak attempt nahi kiya"
            ],
            "answer": 1,
            "explanation": "WSC binary forced-choice ambiguity par based hai. 'Feared' vs 'Advocated' jaise words statistically n-gram statistics me differentiate nahi hote, isliye superficial language models fail ho jaate hain."
        },
        {
            "id": "q1_3",
            "question": "Classical search ke 6 simplifying assumptions ka mnemonic kya hai?",
            "options": ["(a) P-A-P-G", "(b) SCOAR-D (Static, Completely known, One agent, Actions never fail, Representation given, Discrete)", "(c) STRIPS", "(d) BFS-DFS"],
            "answer": 1,
            "explanation": "SCOAR-D: Static, Completely known, One agent, Actions never fail, Representation given, Discrete actions."
        }
    ],
    2: [
        {
            "id": "q2_1",
            "question": "DFS aur BFS ke implementation code me mukhyatya kya farak hota hai?",
            "options": [
                "(a) DFS recursive hota hai aur BFS nahi",
                "(b) DFS me new children OPEN list ke HEAD (front) par lagte hain (Stack), jabki BFS me TAIL (back) par lagte hain (Queue)",
                "(c) DFS heuristic use karta hai, BFS nahi",
                "(d) BFS OPEN list use nahi karta"
            ],
            "answer": 1,
            "explanation": "Sirf ek line ka farak hai: OPEN <- newPairs ++ OPEN (prepend = DFS stack) vs OPEN <- OPEN ++ newPairs (append = BFS queue)."
        },
        {
            "id": "q2_2",
            "question": "DFID (Depth-First Iterative Deepening) ki space complexity kya hoti hai?",
            "options": ["(a) O(b^d) [Exponential]", "(b) O(b * d) [Linear!]", "(c) O(1) [Constant]", "(d) O(d!)"],
            "answer": 1,
            "explanation": "DFID har iteration me depth-bounded DFS chalata hai, isliye iski space complexity DFS ki tarah Linear O(b*d) hoti hai jabki solution BFS jaisa optimal shortest-hop milta hai!"
        },
        {
            "id": "q2_3",
            "question": "DFID me node-counting ka main purpose kya hai?",
            "options": [
                "(a) Algorithm ki speed badhana",
                "(b) Finite disconnected graph me agar goal exist na kare toh infinite loop ko rokna",
                "(c) Shortest path calculate karna",
                "(d) Tree ki depth napna"
            ],
            "answer": 1,
            "explanation": "Agar finite graph ke connected component me goal na ho, to bina node-counting ke DFID depth limit badhata chala jayega aur infinite loop me fas jayega. Node-count saturation detect karta hai."
        }
    ],
    3: [
        {
            "id": "q3_1",
            "question": "Kya Best-First Search hamesha optimal (cheapest cost) path deta hai?",
            "options": [
                "(a) Haan, hamesha optimal hota hai",
                "(b) Nahi, kyunki wo sirf heuristic h(n) dekhta hai aur already spent cost g(n) ko ignore karta hai",
                "(c) Sirf grid maps par optimal hota hai",
                "(d) Haan, agar heuristic admissible ho"
            ],
            "answer": 1,
            "explanation": "Best-First Search greedy heuristic search hai. Ye path cost g(n) ko consider nahi karta, isliye cheapest path guarantee nahi karta. Cheaper path ke liye A* chahiye."
        },
        {
            "id": "q3_2",
            "question": "Simulated Annealing me High Temperature (T -> ∞) par algorithm kaisa behave karta hai?",
            "options": [
                "(a) Pure Greedy Hill Climbing",
                "(b) Pure Random Walk (har move ki acceptance probability ~ 0.5)",
                "(c) Algorithm turant halt ho jaata hai",
                "(d) DFS jaisa"
            ],
            "answer": 1,
            "explanation": "P(accept) = 1/(1 + e^(-ΔE/T)). Jab T -> ∞, -ΔE/T -> 0, e^0 = 1, so P -> 1/(1+1) = 0.5. Har move 50/50 chance se accept hota hai (Random Walk)."
        }
    ],
    4: [
        {
            "id": "q4_1",
            "question": "Symmetric TSP me N cities ke liye kul kitne distinct tours sambhav hain?",
            "options": ["(a) N!", "(b) (N - 1)!", "(c) (N - 1)! / 2", "(d) N(N - 3) / 2"],
            "answer": 2,
            "explanation": "Symmetric TSP me starting city fix karne se (N-1)! orderings banti hain, aur clockwise/anticlockwise tour identical cost ke hote hain, isliye divide by 2: (N - 1)! / 2."
        },
        {
            "id": "q4_2",
            "question": "Tour [C, A, D, B, E] ko reference [A, B, C, D, E] ke respect me Ordinal Representation me convert karein:",
            "options": [
                "(a) [3, 1, 2, 1, 1]",
                "(b) [3, 1, 4, 2, 5]",
                "(c) [1, 2, 3, 4, 5]",
                "(d) [3, 2, 1, 1, 1]"
            ],
            "answer": 0,
            "explanation": "1. C in [A,B,C,D,E] is index 3 -> remaining [A,B,D,E]; 2. A is index 1 -> [B,D,E]; 3. D is index 2 -> [B,E]; 4. B is index 1 -> [E]; 5. E is index 1 -> Result: [3, 1, 2, 1, 1]."
        },
        {
            "id": "q4_3",
            "question": "N cities ke TSP me Savings heuristic (Clarke-Wright) me kul kitne merge operations hote hain?",
            "options": ["(a) N", "(b) N - 1", "(c) N - 2", "(d) (N - 1)/2"],
            "answer": 2,
            "explanation": "Shuruat me N-1 out-and-back routes hote hain. Har merge se 1 route kam hota hai. Ek single tour banane ke liye (N-1) - 1 = N - 2 merges lagte hain."
        }
    ],
    5: [
        {
            "id": "q5_1",
            "question": "A* algorithm kis condition me optimal solution guarantee karta hai (Admissible hota hai)?",
            "options": [
                "(a) Sirf jab graph acyclic ho",
                "(b) Finite branching factor, edge cost >= ε > 0, aur admissible heuristic h(n) <= h*(n)",
                "(c) Jab heuristic strictly monotone ho",
                "(d) Jab search depth <= 10 ho"
            ],
            "answer": 1,
            "explanation": "A* admissibility ke 3 criteria: (1) Finite branching factor, (2) Edge costs bounded below by ε > 0 (Arvind Narayanan condition), aur (3) Heuristic kabhi overestimate na kare: h(n) <= h*(n)."
        },
        {
            "id": "q5_2",
            "question": "Agar do admissible heuristics me h2(n) > h1(n) ho sabhi non-goal nodes ke liye, toh Lemma L6 ke anusaar kya hoga?",
            "options": [
                "(a) A2 A1 se zyada nodes expand karega",
                "(b) A2 dwara expand kiye gaye sabhi nodes A1 bhi expand karega (More informed means less search)",
                "(c) Dono exact barabar nodes expand karenge",
                "(d) A2 suboptimal solution dega"
            ],
            "answer": 1,
            "explanation": "Lemma L6 (Dominance): A more informed admissible heuristic strictly prunes the search space. A2 expands a subset of the nodes expanded by A1."
        }
    ],
    6: [
        {
            "id": "q6_1",
            "question": "Monotone (Consistent) heuristic hone par A* me kaunsa case completely vanish ho jaata hai?",
            "options": [
                "(a) Case 1 (New node add karna)",
                "(b) Case 2 (OPEN list ke node ka g update karna)",
                "(c) Case 3 (CLOSED list ke node ko reopen karna)",
                "(d) Goal test"
            ],
            "answer": 2,
            "explanation": "Consistent heuristic me f-values along any path non-decreasing hoti hain. Jab koi node CLOSED me jata hai, to uska optimal path mil chuka hota hai, isliye CLOSED nodes ko reopen karne ki zaroorat nahi padti (Case 3 vanishes)."
        }
    ],
    7: [
        {
            "id": "q7_1",
            "question": "Alpha-Beta pruning me Cutoff condition kab trigger hoti hai?",
            "options": [
                "(a) Jab α < β",
                "(b) Jab α >= β",
                "(c) Jab leaf node -∞ ho",
                "(d) Jab root node Min ho"
            ],
            "answer": 1,
            "explanation": "Jab Max ka guaranteed lower bound (α) Min ke guaranteed upper bound (β) ke barabar ya bada ho jaata hai (α >= β), to remaining siblings prune ho jaate hain."
        },
        {
            "id": "q7_2",
            "question": "Knuth-Moore theorem ke anusaar optimal move ordering par Alpha-Beta ki time complexity kya hoti hai?",
            "options": ["(a) O(b^d)", "(b) O(b^(d/2))", "(c) O(d * log b)", "(d) O(b * d)"],
            "answer": 1,
            "explanation": "Best move ordering par Alpha-Beta sirf O(b^(d/2)) nodes inspect karta hai — effectively search depth ko double kar deta hai!"
        }
    ],
    8: [
        {
            "id": "q8_1",
            "question": "Sussman's Anomaly kis cheez ka classic example hai?",
            "options": [
                "(a) Infinite loop in DFS",
                "(b) Non-serializable subgoals jahan linear planners (jaise GSP) ek goal achieve karte waqt doosre ko undo kar dete hain",
                "(c) Admissible heuristic ka fail hona",
                "(d) Alpha cutoff failure"
            ],
            "answer": 1,
            "explanation": "Sussman's Anomaly shows that some goal sets cannot be linearized in ANY order without undoing progress. POP (Partial Order Planning) isse solve karta hai interleaving ke zariye."
        }
    ]
}

# Attach quizzes to modules
for m in modules:
    w = m["week"]
    m["checkpointQuiz"] = checkpoint_quizzes.get(w, [])

# Save as formatted JavaScript file with export
code = f"""// AI: Search Methods for Problem Solving — Master Study Notes
// Source: AI_Master_Ebook_Anmol.pdf, AI_Search_Methods_Complete_Hinglish_Notes, & Week 1 Hinglish Edition
// Compiled for IIT Madras Degree Level Course

export const courseModules = {json.dumps(modules, indent=2, ensure_ascii=False)};
"""

with open('src/data/notesData.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved src/data/notesData.js with rich structured modules and checkpoint quizzes!")
