import json

# Define the complete structured notes with authentic Hinglish text and explicit HTML-ready tables
def get_clean_modules():
    return [
        # WEEK 0: Foundation
        {
            "id": "week-0",
            "week": 0,
            "title": "Foundation: Shuru se Shuru — AI Kya Hai?",
            "subtitle": "Zero level se AI, Agents aur Search ki basic understanding",
            "examWeight": "Foundation (1-2 Marks)",
            "summary": "AI ka matlab machine ko samajhne aur decide karne ki taaqat dena. Is module me hum Agent, Problem Solving, State Space, Manhattan Distance aur Search complexities ko bilkul aasaan Hinglish me samjhenge.",
            "diagramType": "roadmap",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.1 AI — Artificial Intelligence Matlab Kya?"
                },
                {
                    "type": "paragraph",
                    "text": "Socho ek robot hai. Usse ek kaam diya — Agra se Delhi pahuncho, sabse sasta rasta dhundho. Ab wo robot kaise karega? Woh apne dimaag (program) se raaste explore karta hai, compare karta hai, aur best path choose karta hai. Yahi hai Artificial Intelligence — machine ko 'samajhne' aur 'decide karne' ki taaqat dena."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Simple Definition: AI",
                    "content": "AI = Ek machine ya program jo apne environment ko samjhta hai, goals set karta hai, aur un goals ko achieve karne ke liye actions leta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.2 Agent Kya Hota Hai?"
                },
                {
                    "type": "paragraph",
                    "text": "Ye subject ka sabse important word hai — AGENT."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Agent — Simple Definition",
                    "content": "Agent = Koi bhi cheez jo apne environment ko sense kare aur uske hisaab se action le.\n\nExamples: Tumhare phone ka navigation app (agent), chess game ka computer player (agent), ek delivery robot (agent).\n\nInsaan bhi ek agent hai — hum duniya ko dekhte hain, sochte hain, aur action lete hain."
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 Agent ke 4 Khaas Features (P-A-P-G = Papa-G)",
                    "content": "1. Persistent: Hamesha chalta rehta hai (ek baar chal kar band nahi hota, state yaad rakhta hai).\n2. Autonomous: Khud decide karta hai, har kadam par koi insaan guide nahi karta.\n3. Proactive: Khud apne subgoals decide karta hai.\n4. Goal-directed: Goals fix karne ke baad unhe achieve karne ki koshish karta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.3 Problem Solving — Agent Ka Kaam"
                },
                {
                    "type": "paragraph",
                    "text": "Jab bhi ek agent koi kaam karta hai, ye 5 steps follow karta hai:"
                },
                {
                    "type": "numbered_list",
                    "items": [
                        "World ko samjho (current state kya hai?)",
                        "Goal pehchano (main kahaan pahunchna chahta hoon?)",
                        "Possible actions explore karo (kya kya kar sakta hoon?)",
                        "Best path ya action choose karo",
                        "Action execute karo"
                    ]
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 Core Insight",
                    "content": "Ye saari process hi hai — SEARCH! Aur yahi ye poora subject hai: kaise smart tareeqe se possible actions me se best path dhundha jaaye."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.4 Important Terminology — Ye Words Yaad Kar Lo"
                },
                {
                    "type": "paragraph",
                    "text": "Exam me ye technical terms baar-baar aate hain. Inhe table se achhi tarah samajh lo:"
                },
                {
                    "type": "table",
                    "headers": ["Term (Shabd)", "Meaning (Matlab & Example)"],
                    "rows": [
                        ["State (Sthiti)", "World ki ek specific situation. Jaise chess board ki ek specific position."],
                        ["Initial State", "Starting point jahan se journey shuru hoti hai. Jaise Agra-Delhi trip me 'Agra'."],
                        ["Goal State", "Wo state jahan pahunchna hai. Jaise 'Delhi'."],
                        ["Operator / Action", "Ek move ya step jo ek state se doosri state me le jaata hai. Jaise 'Car chalao Mathura ki taraf'."],
                        ["State Space", "Saari possible states ka collection. Jaise map problem me desh ke saare sheher."],
                        ["Path", "Initial state se Goal state tak states aur actions ka sequence."],
                        ["Cost", "Har action lene ki keemat (petrol cost, time ya distance)."],
                        ["Node", "Graph me ek point/circle. Har state ek node hoti hai."],
                        ["Edge", "Do nodes ke beech ka connection (raasta). Har edge pe ek cost hoti hai."],
                        ["MoveGen(N)", "Function jo node N ke saare legal neighbors (next possible states) return karta hai."],
                        ["GoalTest(N)", "Function jo check karta hai — kya node N goal hai?"],
                        ["OPEN List", "Wo nodes jinhe abhi explore karna baaki hai (frontier / waiting list)."],
                        ["CLOSED List", "Wo nodes jinhe already explore kar chuke hain (done list)."],
                        ["Heuristic h(N)", "Ek ESTIMATE — node N se goal tak kitna door hoga. Ye exact nahi hoti, guess hoti hai."],
                        ["Optimal Path", "Sabse kam total cost wala path (cheapest path)."],
                        ["Branching Factor (b)", "Ek node ke average kitne neighbors (branches) hote hain."]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.5 Ek Simple Example — Roadmap Problem"
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 Simple Path Example",
                    "content": "Maano cities hain ek map pe: S → A → B → G. S se G tak pahunchna hai.\n\n• S — start node (shuruat)\n• G — goal node (manzil)\n• Edge costs: S-A = 3, A-B = 4, B-G = 2\n• Direct edge bhi hai: S-B = 8\n\nPath 1: S → A → B → G = 3 + 4 + 2 = 9\nPath 2: S → B → G = 8 + 2 = 10\nOptimal Path = Path 1 (Cost 9, kam hai!)."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.6 Search Algorithms — Do Types"
                },
                {
                    "type": "table",
                    "headers": ["Type", "Algorithms", "Kaise Kaam Karta Hai"],
                    "rows": [
                        ["Uninformed / Blind Search", "DFS, BFS, DFID", "Goal kahan hai — nahi pata. Andha dhundna (systematic exploration)."],
                        ["Informed / Heuristic Search", "Best First, A*, WA*, Branch & Bound", "Heuristic h(N) se guide hokar smart tareeqe se goal ki taraf badhna."]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.7 Manhattan Distance — Heuristic Ka Most Common Example"
                },
                {
                    "type": "paragraph",
                    "text": "Exam me grid search questions me Manhattan Distance baar-baar use hoti hai. Isko samajhna mandatory hai:"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Manhattan Distance Formula",
                    "content": "Manhattan Distance = |x1 - x2| + |y1 - y2|\n\nExample: Node A hai (2, 3) aur Goal G hai (5, 1) pe:\nh(A) = |2 - 5| + |3 - 1| = 3 + 2 = 5.\n\nKyun kehte hain? Ye diagonal nahi jaata, sirf horizontally ya vertically move karta hai — jaise New York ke Manhattan blocks me taxi chalti hai!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.8 Graph vs Tree — Antar Samjho"
                },
                {
                    "type": "paragraph",
                    "text": "• Tree: Koi cycle nahi hoti. Root se kisi bhi node tak sirf ek hi path hota hai.\n• Graph: Cycles ho sakti hain. Ek node tak pahunchne ke multiple paths ho sakte hain."
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ Exam Tip: Closed List ki Zaroorat",
                    "content": "Exam me grids (maps) par questions aate hain — ye graphs hote hain. Isliye CLOSED list maintain karna zaroori hai taaki same node baar-baar explore hoke infinite loop na ban jaaye!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.9 Complexity — Time aur Space ka Darr"
                },
                {
                    "type": "paragraph",
                    "text": "Har algorithm ke baare me 4 baatein poochhi jaati hain:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "Time Complexity: Kitne nodes explore karne padenge? b^d notation use hoti hai (b = branching factor, d = depth of goal).",
                        "Space Complexity: Ek waqt kitne nodes memory me rakhne padenge?",
                        "Completeness: Kya algorithm hamesha solution dhundh lega agar solution exist karta hai?",
                        "Optimality: Kya algorithm hamesha BEST (lowest cost) solution dega?"
                    ]
                }
            ]
        },

        # WEEK 1: Introduction, Philosophy & Landscape
        {
            "id": "week-1",
            "week": 1,
            "title": "Week 1: Introduction, Philosophy aur AI ka Landscape",
            "subtitle": "Intelligent Agents, Turing Test, Winograd Schema & 6 Assumptions",
            "examWeight": "4-5 Marks (~20% in Quiz 1)",
            "summary": "AI ka goal, intelligent agent ke 4 lakshan (P-A-P-G), 3 layers (Signal, Neuro-fuzzy, Symbolic), Turing Test vs Winograd Schema Challenge, aur classical search ke 6 simplifying assumptions (SCOAR-D).",
            "diagramType": "onion-layers",
            "blocks": [
                {
                    "type": "callout",
                    "calloutType": "quote",
                    "title": "Week ka Quote (John Haugeland, 1985)",
                    "content": "“Artificial Intelligence research ka fundamental goal sirf intelligence ki nakal karna ya koi clever fake banana nahi hai. AI ko asli cheez chahiye: aisi machines jinke paas mind ho, poore aur literal sense me.”"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.1 Artificial Intelligence Kya Hai?"
                },
                {
                    "type": "paragraph",
                    "text": "AI ki koi ek single definition nahi hai. Dekhte hain 4 bade thinkers ne ise kaise define kiya hai:"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "AI ki Chaar Classical Definitions",
                    "content": "• Herbert Simon: Hum un programs ko intelligent kehte hain jo aisa behaviour dikhate hain jise agar insaan dikhata to hum use intelligent maante.\n• Barr & Feigenbaum: Physicists poochte hain universe kaisa hai; biologists poochte hain living hona kya hai; hum AI wale sochte hain kaunsa information-processing system aise sawaal pooch sakta hai.\n• Elaine Rich: AI un techniques ka study hai jinse exponentially hard problems ko polynomial time me solve kiya jaata hai, domain knowledge ka use karke.\n• Charniak & McDermott: AI computational models ke zariye mental faculties ka study hai."
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 AI ke Do Chehre",
                    "content": "Ek practical face (self-driving cars, expert systems, planners banana) aur ek cognitive face (human intelligence ko samajhna). Ye course practical face (search & planning) par focus karta hai."
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 Elaine Rich ki Subtle Definition",
                    "content": "Rich kehti hain AI exponential problems ko polynomial me solve karta hai. Strictly P=NP nahi ho sakta, iska matlab hai: domain knowledge use karke hum optimal guarantee chhodte hain aur GOOD ENOUGH answer jaldi le lete hain. Yahi Heuristic Search ki aatma hai!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.2 Intelligent Agent & The 4 Characteristics"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Definition: Intelligent Agent",
                    "content": "Ek autonomous program (ya robot) jo:\n• Perceives: Apne environment ko sensors se sense karta hai,\n• Deliberates: Duniya ke ek internal model ka use karke sochta hai,\n• Acts: Environment par effectors ke through action leta hai apne goals pursue karne ke liye."
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 4 Characteristics: P-A-P-G (Papa-G)",
                    "content": "1. Persistent: Hamesha chalta rehta hai, state yaad rakhta hai.\n2. Autonomous: Khud faisla karta hai bina human interference ke.\n3. Proactive: Khud apne subgoals generate karta hai.\n4. Goal-directed: Goals ko actively achieve karne ki koshish karta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.3 Intelligence ke Teen Pillars"
                },
                {
                    "type": "table",
                    "headers": ["Time", "Capacity", "Techniques"],
                    "rows": [
                        ["Past yaad rakhna", "Past se seekhna (Learn from it)", "Case-based reasoning (CBR), Machine Learning, Deep Neural Nets se pattern recognition."],
                        ["Present ko samajhna", "Duniya ke baare me aware rehna", "Knowledge representation, Logic aur reasoning (inference)."],
                        ["Future imagine karna", "Goals ki taraf kaam karna", "Heuristic Search, Automated Planning — YEHI IS COURSE KA FOCUS HAI!"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.4 Autonomous Agent ki Teen Layers"
                },
                {
                    "type": "paragraph",
                    "text": "Khemani agent ko pyaaz (onion) ki concentric layers ki tarah draw karte hain:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "Outer layer (Signal Processing): World se raw signals aate hain (camera photons, audio waves, motor currents). Computer vision aur robot control yahan rehta hai.",
                        "Middle layer (Neuro-Fuzzy): Signals ko SYMBOLS me convert kiya jaata hai (Classifiers, Neural Nets). Ek billi ki photo 'cat' symbol ban jaati hai.",
                        "Inner layer (Symbolic Reasoning / GOFAI): Jab symbols mil gaye, to hum unpar logical reasoning aur search karte hain. Ye course yahin operate karta hai!"
                    ]
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 Yaad Rakho",
                    "content": "Ye course innermost (symbolic) layer me kaam karta hai. Jo bhi hum padhenge (DFS, A*, Minimax, Planning, CSPs), sab symbols ko manipulate karte hain, raw signals ko nahi."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.6 Machine Learning ka ek Dashak (ML ≠ AI kyun hai?)"
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ Performance vs Competence (Rodney Brooks)",
                    "content": "Jo computer photo dekh kar label karta hai 'Park me log Frisbee khel rahe hain', use pata hi nahi ki Frisbee kya hoti hai, use kha sakte hain ya nahi, mausam kya hota hai! Uske paas PERFORMANCE (labelling) hai lekin COMPETENCE (understanding) nahi hai! Isliye sirf ML ka matlab AI nahi hota."
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 Suitcase Words (Marvin Minsky)",
                    "content": "Minsky ne 'learning', 'intelligence', 'understanding' ko suitcase words kaha — ye aise words hain jinme bahut saare alag-alag meanings pack hote hain."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.9 Physical Symbol System Hypothesis (Newell & Simon, 1976)"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "PSSH Statement (EXAM GOLD)",
                    "content": "“A physical symbol system has the necessary and sufficient means for general intelligent action.”\n\n• Necessary: Har intelligent system ko physical symbol system hona padega.\n• Sufficient: Agar aapne kaafi rich symbol system bana liya, to aapne intelligence generate kar li!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.10 Turing Test vs 1.11 Winograd Schema Challenge"
                },
                {
                    "type": "table",
                    "headers": ["Feature", "Turing Test (1950)", "Winograd Schema Challenge (2011)"],
                    "rows": [
                        ["Format", "Conversational (Human judge chat window me machine se baat karta hai).", "Forced binary choice (Do sentences jisme sirf 1 word badalta hai)."],
                        ["Testing Target", "Behavioural mimicry (kya insaan jaisa answer deta hai).", "Real world knowledge aur common-sense reasoning."],
                        ["Kamzori / Vulnerability", "Sasti tricks se pass ho sakta hai (ELIZA chatbots fake kar lete hain).", "Google-proof! Co-occurrence statistics se solve nahi hota."],
                        ["Classic Example", "ELIZA: 'Tell me about your family.'", "'The trophy would not fit in the suitcase because it was too small / big.' (Small = suitcase, Big = trophy)."]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "1.13 Classical Search ke 6 Simplifying Assumptions"
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 SCOAR-D Mnemonic (Pehle chalo, phir daudo!)",
                    "content": "1. S - Static: World static hai, agent ke move ke bina kuch nahi badalta.\n2. C - Completely known: Agent ke paas perfect information hai.\n3. O - One agent: Duniya me sirf ek agent hai (Week 7 Game Playing me relax hoga).\n4. A - Actions never fail: Actions deterministic hain.\n5. R - Representation given: World ka model pehle se diya hai.\n6. D - Discrete: Actions finite aur discrete hain."
                }
            ]
        },

        # WEEK 3: Branch & Bound aur A*
        {
            "id": "week-5",
            "week": 5,
            "title": "Week 5: Optimal Paths — Branch & Bound, Dijkstra aur Algorithm A*",
            "subtitle": "f(n) = g(n) + h(n), Admissibility Theorem, 3 Cases & 6 Lemmas",
            "examWeight": "8-10 Marks in Quiz 2 / End-Term (★★★★★ Highest)",
            "summary": "A* search Branch & Bound (cost g) aur Best First (heuristic h) ko combine karta hai: f(n) = g(n) + h(n). Admissible heuristic (kabhi overestimate nahi karta) guarantees optimal path. 6 Lemmas aur Case-3 reopen mechanics.",
            "diagramType": "astar-graph",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.1 Branch and Bound (BnB) — Basic Idea"
                },
                {
                    "type": "paragraph",
                    "text": "Branch & Bound ka matlab hai: agar mujhe pata hai ki is raaste pe aage jaane se jo bhi cost aayegi, wo already meri best known solution se zyada hogi — toh is raaste pe aage mat jao! Prune kar do."
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 Taxi Analogy",
                    "content": "Tumhare paas already ek taxi booking hai jo Rs 500 me jaati hai. Ab tum doosra route explore kar rahe ho — wahan abhi tak Rs 600 kharch ho gaya aur manzil abhi bhi door hai. Clearly is route ko PRUNE kar do!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.2 A* Algorithm — Star Algorithm (Sabse Important!)"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "A* Core Formula (YAAD KARO!)",
                    "content": "f(N) = g(N) + h(N)\n\n• f(N): Total estimated cost of best path through node N.\n• g(N): Actual cost from Start to N (already known, exact).\n• h(N): Estimated cost from N to Goal (heuristic guess).\n\nOPEN list ko f(N) ke hisaab se sort karo — smallest f pehle expand hoga!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.3 A* Admissibility — Kab Optimal Hota Hai?"
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 Admissibility Conditions — Teen Conditions Zaroor Yaad Karo",
                    "content": "A* optimal (admissible) hota hai agar ye TEEN conditions poori hon:\n1. Branching factor finite ho (har node ke finite neighbors hon).\n2. Har edge ki cost > 0 (koi free edge nahi, minimum ε > 0 cost ho — Arvind Narayanan condition).\n3. h(N) <= h*(N) for all N (heuristic kabhi OVERESTIMATE nahi karta)."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.4 WA* — Weighted A* (Ek Important Variation)"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "WA* Formula",
                    "content": "f(N) = g(N) + w * h(N), jahan w >= 1.\n\n• w = 1 → Normal A* (Optimal guaranteed, thoda slow).\n• w > 1 → Weighted A* (Tez chalta hai, smaller frontier, cost <= w * optimal).\n• w = 0 → Pure Branch & Bound (No heuristic, slow).\n• w → ∞ → Pure Best First Search (Fastest, no optimality guarantee)."
                },
                {
                    "type": "callout",
                    "calloutType": "tip",
                    "title": "🔥 WA* Exam Tip",
                    "content": "Exam me EXACT SAME steps hote hain jo A* ke hain, sirf formula change ho jaati hai: f(N) = g(N) + w*h(N). Usually exam me w = 2 diya hota hai — toh bas h(N) ko 2 se multiply karo!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.5 A* vs BnB vs Best First — Comparison Table"
                },
                {
                    "type": "table",
                    "headers": ["Feature", "Branch & Bound", "A* Algorithm", "Best-First Search"],
                    "rows": [
                        ["Formula", "f = g(N) only", "f = g(N) + h(N)", "f = h(N) only"],
                        ["Optimal?", "YES (always)", "YES (if h admissible)", "NO"],
                        ["Speed", "Slow", "Fast", "Fastest"],
                        ["Direction", "Cost se explore karta hai, no direction", "Goal ki taraf guided by h", "Goal ki taraf guided by h"],
                        ["WA* Equivalent", "w = 0", "w = 1", "w = ∞"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.6 Tie Breaking Rule — Alphabetical Order"
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 Tie Breaker — IMPORTANT for Exam",
                    "content": "Jab do ya zyada nodes ka f-value same ho, toh ALPHABETICAL ORDER me pehle wala choose karo.\n\nExample: OPEN me hain A(f=10), C(f=10), B(f=10) → A pehle pop hoga kyunki A < B < C."
                }
            ]
        },

        # WEEK 6: Monotone Condition & IDA*
        {
            "id": "week-6",
            "week": 6,
            "title": "Week 6: Monotone Condition, Space-Saving A* & Sequence Alignment",
            "subtitle": "Consistent Heuristic (Case 3 Vanishes), Frontier Search & Beam Stack Search",
            "examWeight": "4-5 Marks in Quiz 2 / End-Term",
            "summary": "Monotone (consistent) condition: h(m) - h(n) <= k(m,n). Isse f-values non-decreasing hoti hain aur CLOSED nodes ko kabhi reopen nahi karna padta (Case 3 vanishes). Sequence alignment, Frontier Search, SMGS, BFHS, aur DCBSS.",
            "diagramType": "monotone-triangle",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "6.1 Monotone / Consistent Heuristic Kya Hai?"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Monotone Condition Formula",
                    "content": "Ek heuristic h consistent/monotone hoti hai agar har node m aur uske successor n ke liye:\n\nh(m) - h(n) <= k(m, n)   [yaani h(m) <= k(m, n) + h(n)]\n\nMatlab: m se n tak ki estimated cost, m-se-n ki actual edge cost + n se goal ki estimate se zyada nahi ho sakti (Triangle Inequality)."
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 KEY PROPERTY: Case 3 Vanishes!",
                    "content": "Agar heuristic consistent hai, toh jab A* kisi node ko expand karta hai (CLOSED me daalta hai), us node par optimal path ALREADY mil chuka hota hai! CLOSED list me wapas propagation ya reopening ki zaroorat nahi padti (Case 3 vanishes)!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "6.2 IDA* — Iterative Deepening A*"
                },
                {
                    "type": "paragraph",
                    "text": "A* ki sabse badi kami hai uski memory: OPEN list exponential size tak grow kar sakti hai. IDA* ise linear memory me solve karta hai:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "DFID depth bound use karta tha; IDA* f-value bound use karta hai.",
                        "Start: bound = f(Start) = h(Start).",
                        "DFS chalao — agar f(N) > bound ho to prune karo aur next-f-value note karo.",
                        "Agar goal na mile, to bound = smallest f value exceeded last iteration.",
                        "Space Complexity: O(bd) [Linear, jaise DFS!].",
                        "Optimal?: YES agar h admissible ho."
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "6.3 Comparison Table — All Search Algorithms"
                },
                {
                    "type": "table",
                    "headers": ["Algorithm", "Data Structure", "Optimal?", "Complete?", "Space", "Uses Heuristic?"],
                    "rows": [
                        ["DFS", "Stack (LIFO)", "NO", "NO (infinite graphs)", "O(bd) [Linear]", "NO"],
                        ["BFS", "Queue (FIFO)", "YES (steps)", "YES", "O(b^d) [Exponential]", "NO"],
                        ["DFID", "Stack with bounds", "YES (steps)", "YES", "O(bd) [Linear]", "NO"],
                        ["BestFirst", "Priority Queue (h)", "NO", "YES", "O(b^d)", "YES (h only)"],
                        ["Branch & Bound", "Priority Queue (g)", "YES", "YES", "O(b^d)", "NO (g only)"],
                        ["A*", "Priority Queue (f=g+h)", "YES", "YES", "O(b^d)", "YES (f=g+h)"],
                        ["WA* (w>1)", "Priority Queue (g+wh)", "Approx (<= w*opt)", "YES", "O(b^d)", "YES"],
                        ["IDA*", "Stack (f-bound)", "YES", "YES", "O(bd) [Linear]", "YES (f-bound)"]
                    ]
                }
            ]
        },

        # WEEK 7: Game Trees
        {
            "id": "week-7",
            "week": 7,
            "title": "Week 7: Game Playing — Minimax, Alpha-Beta aur SSS*",
            "subtitle": "2-Player Zero-Sum Games, α/β Pruning Cutoffs & Strategy Clusters",
            "examWeight": "4-6 Marks in Quiz 2 / End-Term",
            "summary": "Adversarial search. Max player (maximize) vs Min player (minimize). Minimax backup rule, Alpha-Beta pruning (alpha >= beta par cutoff), Knuth-Moore b^(d/2) complexity, evaluation functions, horizon effect, aur SSS* best-first game tree search.",
            "diagramType": "minimax-tree",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.1 Game Tree — Concept Samjho"
                },
                {
                    "type": "paragraph",
                    "text": "Imagine karo Tic-Tac-Toe ya Chess khel rahe ho. Har move ke baad nayi state banti hai. In saari states ka tree = Game Tree."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Game Tree — Key Terms",
                    "content": "• MAX player: Tum (jo score MAXIMIZE karna chahte ho, △).\n• MIN player: Opponent (jo score MINIMIZE karna chahta hai, ▽).\n• ROOT: Game ki starting state.\n• HORIZON / LEAF NODES: Last level ke nodes jinpe evaluation function score assign karta hai.\n• k-PLY SEARCH: k depth tak search (1 ply = 1 player ka move).\n• EVALUATION FUNCTION h(N): Board position dekhkar score dene wala function. Positive = MAX ke liye achha, Negative = MIN ke liye achha."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.2 Minimax Algorithm"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Minimax Rules",
                    "content": "• MAX node pe: Apne saare children me se MAXIMUM value lo.\n• MIN node pe: Apne saare children me se MINIMUM value lo.\n• LEAF node pe: h(N) evaluation function ki value lo.\n• Bottom-up propagate karo: Leaves se root tak."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.3 Alpha-Beta Pruning — Smart Minimax"
                },
                {
                    "type": "paragraph",
                    "text": "Minimax poore tree ko visit karta hai. Alpha-Beta pruning useless branches ko bina result badle skip kar deta hai!"
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Alpha (α) aur Beta (β) Bounds",
                    "content": "• ALPHA (α): MAX node ke liye current best value found so far (Lower bound). Starts at -∞, sirf UPWARD badhta hai.\n• BETA (β): MIN node ke liye current best value found so far (Upper bound). Starts at +∞, sirf DOWNWARD girta hai.\n\nRule: α = max we can guarantee; β = min opponent will allow. Jab α >= β ho jaaye, is branch ko explore karne ka koi fayda nahi!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.4 Alpha Cut vs Beta Cut — Clearly Samjho"
                },
                {
                    "type": "table",
                    "headers": ["Cut Type", "Kab Hota Hai?", "Kahan Hota Hai?", "Kya Prune Hota Hai?"],
                    "rows": [
                        ["Alpha Cut (β-pruning)", "α ≥ β", "MIN node pe", "Us MIN node ke baaki remaining children"],
                        ["Beta Cut (α-pruning)", "α ≥ β", "MAX node pe", "Us MAX node ke baaki remaining children"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.5 Minimax vs Alpha-Beta vs SSS* — Comparison"
                },
                {
                    "type": "table",
                    "headers": ["Feature", "Minimax", "Alpha-Beta Pruning", "SSS* Algorithm"],
                    "rows": [
                        ["Strategy", "Saare nodes expand karta hai", "α, β bounds se prune karta hai", "Best-First search over strategies"],
                        ["Nodes Explored", "O(b^d)", "Best case: O(b^(d/2))", "Best case: O(b^(d/2))"],
                        ["Move Order Matters?", "Nahi", "HAAN (Best moves pehle dekhne se double depth milti hai!)", "Nahi"],
                        ["Optimal Value?", "YES", "YES (Exact same as Minimax)", "YES"],
                        ["Memory Needed", "O(bd) [Linear stack]", "O(bd) [Linear stack]", "O(b^(d/2)) [Exponential Priority Queue]"]
                    ]
                }
            ]
        },

        # WEEK 8: Automated Planning & STRIPS
        {
            "id": "week-8",
            "week": 8,
            "title": "Week 8: Automated Domain-Independent Planning",
            "subtitle": "STRIPS, Blocks World (5 Predicates & 4 Operators), GSP, Sussman's Anomaly & POP",
            "examWeight": "8-10 Marks in Quiz 2 / End-Term (★★★★★ Highest)",
            "summary": "Action-centric problem solving. STRIPS operators (preconditions, ADD, DELETE). Blocks World ke 4 operators. Forward (FSSP) vs Backward (BSSP) planning. Goal Stack Planning (GSP), Sussman's Anomaly (non-serializable subgoals), aur Partial Order Planning (POP).",
            "diagramType": "blocks-world",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "8.1 Planning Kya Hai? — Introduction"
                },
                {
                    "type": "paragraph",
                    "text": "Ab tak hum state-centric soch rahe the. Planning me hum action-centric sochte hain: solution ek sequence of actions hai jo world ko initial state se goal state me convert karta hai."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "STRIPS Domain Rules (Fikes & Nilsson, 1971)",
                    "content": "• World finite aur static hai (sirf agent hi changes karta hai).\n• Agent ko world ki complete knowledge hai.\n• Actions instantaneous aur deterministic hain.\n• Goals = hard constraints on final state."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "8.2 Blocks World — 5 PREDICATES (Yaad Karo!)"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "armEmpty: Robot arm khaali hai (kuch hold nahi kar raha).",
                        "holding(X): Robot arm ne block X ko pakda hua hai.",
                        "onTable(X): Block X seedha table par hai.",
                        "clear(X): Block X ke upar kuch nahi hai (accessible hai).",
                        "on(X, Y): Block X directly block Y ke upar hai."
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "8.3 The FOUR Operators — Heart of Blocks World"
                },
                {
                    "type": "table",
                    "headers": ["Action / Operator", "Preconditions (Pehle Sach)", "ADD Effects (Naya Sach)", "DELETE Effects (Ab Jhooth)"],
                    "rows": [
                        ["Pickup(X)", "armEmpty, clear(X), onTable(X)", "holding(X)", "armEmpty, onTable(X)"],
                        ["Putdown(X)", "holding(X)", "armEmpty, onTable(X)", "holding(X)"],
                        ["Unstack(X, Y)", "armEmpty, clear(X), on(X, Y)", "clear(Y), holding(X)", "armEmpty, on(X, Y)"],
                        ["Stack(X, Y)", "holding(X), clear(Y)", "armEmpty, on(X, Y)", "holding(X), clear(Y)"]
                    ]
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 Memory Trick for All 4 Operators",
                    "content": "• Rakhne (Putdown, Stack) me armEmpty ADD hota hai.\n• Uthane (Pickup, Unstack) me armEmpty DELETE hota hai.\n• Stack(X, Y) me Y ke upar X aa jaata hai, to clear(Y) DELETE hota hai aur on(X, Y) ADD hota hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "8.4 Forward vs Backward Planning — FSSP vs BSSP"
                },
                {
                    "type": "table",
                    "headers": ["Feature", "FSSP (Forward Planning)", "BSSP (Backward Planning)"],
                    "rows": [
                        ["Start from", "Start state S0", "Goal description G"],
                        ["Move type", "Applicable actions (pre(a) ⊆ S)", "Relevant actions (E+(a) ∩ G ≠ ∅)"],
                        ["Transition", "Progression: S' = (S ∪ E+) \\ E-", "Regression: G' = (G \\ E+) ∪ pre(a)"],
                        ["Branching Factor", "High (bahut saare actions applicable)", "Low (kam actions relevant hote hain)"],
                        ["Soundness", "Sound (hamesha valid plan)", "Unsound (spurious subgoals produce kar sakta hai)"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "8.5 Sussman's Anomaly — When Linear Planning Fails"
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ Sussman's Anomaly (Gerald Sussman, 1973)",
                    "content": "Start: C on A, A on table, B on table. Goal: On(A, B) and On(B, C).\n\n• Agar On(B, C) pehle solve karo: C hatakar B ko C pe rakho. Ab On(A, B) ke liye B ke upar A rakhna hai, lekin A abhi C ke neeche tha... pura plan kharab!\n• Agar On(A, B) pehle solve karo: A ko B par rakh diya. Lekin ab B ke upar A hai, to B clear nahi raha! B ko C par rakhne ke liye wapas A ko UNSTACK karna padega!\n\nYe classic example hai NON-SERIALIZABLE SUBGOALS ka. Iska optimal 6-step solution sirf INTERLEAVING (Partial Order Planning) se nikalta hai!"
                }
            ]
        },

        # WEEK 12: Course Revision
        {
            "id": "week-12",
            "week": 12,
            "title": "Week 12: Course Revision aur Big Picture of AI",
            "subtitle": "First Principles vs Knowledge-Based, Master Taxonomy & Complexity Matrix",
            "examWeight": "Summary & Synthesis",
            "summary": "Poore 12 weeks ka mahasangam. First principles (search) vs Knowledge-based (rules/memory/induction). Full algorithm comparison cheat-sheet, Bayesian networks, causality ladder, 3 reasoning forms (deduction, induction, abduction) aur final exam survival tips.",
            "diagramType": "taxonomy-tree",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "12.1 The Master Taxonomy of Problem Solving"
                },
                {
                    "type": "paragraph",
                    "text": "Khemani ka wrap-up diagram poore field ko ek roof ke neeche lata hai:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "First Principles (Search-based): Kisi prior knowledge par trust mat karo; systematic search chalao (DFS, BFS, A*, Planning). Used when domain is novel.",
                        "Knowledge-Based: Experts ki knowledge ko encode karo (Rules, Cases, Learning patterns).",
                        "Real systems dono ka combination use karte hain: Deep Blue ne Kasparov ko harane ke liye heuristic evaluator (knowledge) ko massive alpha-beta search (first principles) ke saath joda!"
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "12.2 Quick Topic Frequency — Exam Me Kitni Baar Aaya?"
                },
                {
                    "type": "table",
                    "headers": ["Topic", "Marks Weight", "Priority Level"],
                    "rows": [
                        ["A* Algorithm (nodes, f-values, path, parents)", "~8-10 marks", "★★★★★ HIGHEST"],
                        ["Goal Stack Planning (Blocks World)", "~8-10 marks", "★★★★★ HIGHEST"],
                        ["TSP Branch & Bound (Lower Bound, Segments)", "~5-7 marks", "★★★★ HIGH"],
                        ["Game Trees + Alpha-Beta Pruning", "~4-6 marks", "★★★★ HIGH"],
                        ["SSS* Algorithm", "~2-3 marks", "★★★ MEDIUM"],
                        ["Weighted A* (WA*)", "~2-3 marks", "★★★ MEDIUM"],
                        ["Branch & Bound (simple path)", "~1-2 marks", "★★ LOW-MED"],
                        ["Stochastic Search (SA, GA)", "~1-2 marks", "★★ Theory only"],
                        ["DFS / BFS / DFID Traversal", "~0-1 marks", "★ Foundation only"],
                        ["CSP / Arc Consistency", "~1-2 marks", "★★ LOW"]
                    ]
                }
            ]
        }
    ]

# Merge with existing modules to preserve all 13 modules
with open('src/data/notesData.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

clean_mods = get_clean_modules()
clean_map = {m['id']: m for m in clean_mods}

for ex in existing:
    if ex['id'] in clean_map:
        ex['blocks'] = clean_map[ex['id']]['blocks']

with open('src/data/notesData.json', 'w', encoding='utf-8') as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

# Update notesData.js
with open('src/data/notesData.js', 'w', encoding='utf-8') as f:
    f.write(f"""// AI: Search Methods for Problem Solving — Master Study Notes
// Source: AI_Master_Ebook_Anmol.pdf, AI_Search_Methods_Complete_Hinglish_Notes, & Week 1 Hinglish Edition
// Compiled for IIT Madras Degree Level Course

export const courseModules = {json.dumps(existing, indent=2, ensure_ascii=False)};
""")

print("Successfully rebuilt notesData.json and notesData.js with pristine tables and callouts!")
