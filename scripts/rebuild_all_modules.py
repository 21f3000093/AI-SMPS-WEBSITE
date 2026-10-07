import json

def get_all_modules():
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
                        ["GoalTest(N)", "Function jo check karta hai — kya node N goal hai?"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "0.5 Manhattan vs Euclidean Distance — Basic Maths"
                },
                {
                    "type": "table",
                    "headers": ["Metric", "Formula", "Intuition (Kab Use Karein?)"],
                    "rows": [
                        ["Manhattan Distance", "|x1 - x2| + |y1 - y2|", "Grid city me chalna jahan diagonal allowed nahi hai (sirf Left/Right/Up/Down). 8-puzzle ke liye standard admissible heuristic."],
                        ["Euclidean Distance", "√((x1 - x2)² + (y1 - y2)²)", "Seedhi line (as the crow flies) distance. Map routing aur 2D navigation ke liye standard lower bound."]
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
                    "headers": ["Time Horizon", "Human Capacity", "Computational Techniques"],
                    "rows": [
                        ["Past yaad rakhna", "Past se seekhna (Experience)", "Case-based reasoning (CBR), Machine Learning, Deep Neural Nets se pattern recognition."],
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
                    "text": "1.5 Physical Symbol System Hypothesis (Newell & Simon, 1976)"
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
                    "text": "1.6 Turing Test vs Winograd Schema Challenge"
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
                    "text": "1.7 Classical Search ke 6 Simplifying Assumptions"
                },
                {
                    "type": "callout",
                    "calloutType": "mnemonic",
                    "title": "🧠 SCOAR-D Mnemonic (Pehle chalo, phir daudo!)",
                    "content": "1. S - Static: World static hai, agent ke move ke bina kuch nahi badalta.\n2. C - Completely known: Agent ke paas perfect information hai.\n3. O - One agent: Duniya me sirf ek agent hai (Week 7 Game Playing me relax hoga).\n4. A - Actions never fail: Actions deterministic hain.\n5. R - Representation given: World ka model pehle se diya hai.\n6. D - Discrete: Actions finite aur discrete hain."
                }
            ]
        },

        # WEEK 2: State Space Search, DFS, BFS & DFID
        {
            "id": "week-2",
            "week": 2,
            "title": "Week 2: State Space Search, DFS, BFS aur DFID",
            "subtitle": "State Space Graphs, OPEN/CLOSED Lists, Systematic Search & Complexity Tradeoffs",
            "examWeight": "3-4 Marks in Quiz 1",
            "summary": "Problem formulation: State, Actions, MoveGen, GoalTest, PathCost. OPEN list (frontier) vs CLOSED list (visited). DFS (LIFO Stack, linear space O(bm) par non-optimal), BFS (FIFO Queue, step-optimal par exponential space O(b^d)), DFID (iterative deepening se BFS jaisi optimality aur DFS jaisi linear space O(bd)), aur Uniform Cost Search (Dijkstra).",
            "diagramType": "tree-search",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.1 Search Problem Formulation — State Space Graph"
                },
                {
                    "type": "paragraph",
                    "text": "Kisi bhi problem ko solve karne ke liye pehle use state space ke form me formulate karna padta hai: Initial state, Goal condition, MoveGen(N) [legal actions generate karne wala function], aur Step Cost c(x,a,y)."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Search Space Components",
                    "content": "• State: Ek configuration world ki.\n• MoveGen(N): Function jo current node ke legal successors return karta hai.\n• GoalTest(N): Boolean check jo batata hai target mil gaya ya nahi.\n• Path Cost: Initial state se current node tak ka total travel cost."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.2 OPEN aur CLOSED Lists — Search Engine Ka Dil"
                },
                {
                    "type": "paragraph",
                    "text": "Systematic graph search hamesha do data structures maintain karta hai:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "OPEN List (The Frontier): Wo nodes jo discover ho chuke hain par abhi unke children explore nahi huye.",
                        "CLOSED List (Explored / Visited): Wo nodes jo already expand ho chuke hain, taaki graph me cycles aur infinite loops se bacha ja sake."
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.3 DFS — Depth First Search (Gehraai Pehle)"
                },
                {
                    "type": "paragraph",
                    "text": "DFS LIFO Stack use karta hai — sabse recently added node pehle expand hoti hai. Ek branch ki gehraai me tab tak jaata hai jab tak dead end ya goal na mile."
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ DFS ke Do Bade Traps",
                    "content": "1. Incomplete in Infinite Graphs: Agar graph infinite ho ya cycles hon (bina CLOSED list ke), toh DFS loop me phans jaata hai.\n2. Non-Optimal: Pehla mila solution shortest ya cheapest nahi hota; ye sabse left-most leaf return kar deta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.4 BFS — Breadth First Search (Chaudai Pehle)"
                },
                {
                    "type": "paragraph",
                    "text": "BFS FIFO Queue use karta hai — root se doori ke hisaab se level-by-level explore karta hai. Sabhi d depth ke nodes d+1 depth se pehle visit hote hain."
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 BFS Step-Optimality",
                    "content": "Agar sabhi edges ki cost equal (unit cost = 1) ho, toh BFS hamesha fewest steps wala optimal path deta hai! Lekin iska space complexity O(b^d) exponential hai, memory bahut jaldi crash kar jaati hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.5 DFID — Depth-First Iterative Deepening (Dono Ka Hero)"
                },
                {
                    "type": "paragraph",
                    "text": "DFID DFS + BFS ka best combination hai. Depth limit L = 0, 1, 2, ... d set karke baar-baar bounded DFS chalata hai."
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 DFID Re-computation Paradox",
                    "content": "Lagta hai wasteful hai ki depth 0 se baar-baar start kar raha hai. Lekin branching factor b >= 2 par, last level (depth d) par b^d nodes hote hain, jo pichle saare levels ke sum se bhi zyada hote hain! Re-computation overhead sirf O(b/(b-1)) factor hoti hai, jo practical situations me negligible hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "2.6 Comparison Table — Blind Search Algorithms"
                },
                {
                    "type": "table",
                    "headers": ["Algorithm", "Data Structure", "Time Complexity", "Space Complexity", "Complete?", "Optimal?"],
                    "rows": [
                        ["DFS (Tree Search)", "Stack (LIFO)", "O(b^m)", "O(b * m) [Linear]", "NO (loops me fas sakta hai)", "NO"],
                        ["DFS (Graph Search)", "Stack + CLOSED", "O(b^m)", "O(b * m) [Linear]", "YES (finite graph)", "NO"],
                        ["BFS", "Queue (FIFO)", "O(b^d)", "O(b^d) [Exponential]", "YES", "YES (unit edge costs)"],
                        ["DFID", "Stack + Depth Bound", "O(b^d)", "O(b * d) [Linear!]", "YES", "YES (unit edge costs)"],
                        ["Uniform Cost Search (UCS)", "Priority Queue on g(n)", "O(b^(1 + ⌊C*/ε⌋))", "O(b^(1 + ⌊C*/ε⌋))", "YES", "YES (general costs >= ε)"]
                    ]
                },
                {
                    "type": "callout",
                    "calloutType": "tip",
                    "title": "🔥 Exam Rule for OPEN List Manipulation",
                    "content": "• DFS: Newly generated children ko OPEN ke START (Left/Top) par push karo.\n• BFS: Newly generated children ko OPEN ke END (Right/Bottom) par append karo.\n• UCS / Dijkstra: OPEN ko g(n) [cost from start] ke hisaab se sort karo."
                }
            ]
        },

        # WEEK 3: Heuristic Search & Local Search
        {
            "id": "week-3",
            "week": 3,
            "title": "Week 3: Heuristic Search, Best First & Hill Climbing",
            "subtitle": "Heuristic Evaluation h(n), Greedy Best-First, Hill Climbing Failure Modes & Beam Search",
            "examWeight": "4-5 Marks in Quiz 1",
            "summary": "Blind search brute force karta hai; heuristic search domain knowledge h(n) use karke goal ki taraf guide hota hai. Best First Search (Priority queue on h), Hill Climbing (Greedy local search), Local optima problems (Peak, Plateau, Ridge), Random Restart, Simulated Annealing introduction, aur Beam Search.",
            "diagramType": "heuristic-eval",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.1 Heuristic Function h(n) — Domain Ka Gyan"
                },
                {
                    "type": "paragraph",
                    "text": "Heuristic ek guess ya estimate function hota hai jo kisi node n se goal tak ki remaining distance ya cost batata hai: h(n) >= 0, aur Goal node ke liye h(Goal) = 0."
                },
                {
                    "type": "callout",
                    "calloutType": "intuition",
                    "title": "💡 Relaxed Problem Intuition",
                    "content": "Sabse acche heuristics 'relaxed problems' se aate hain — e.g. 8-puzzle me agar blocks ek doosre ke upar se jump kar sakein to Manhattan Distance heuristic banta hai, jo hamesha admissible hota hai!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.2 Best-First Search (Greedy)"
                },
                {
                    "type": "paragraph",
                    "text": "OPEN list ko h(n) ke ascending order me sort karo. Jo node goal ke sabse paas lagti hai, use pehle expand karo."
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ Best First Trap",
                    "content": "Greedy Best First optimal nahi hota! Ye misleading heuristics ke chalte lambe ya bhatke huye raste par ja sakta hai kyunki ye g(n) [already traveled cost] ko ignore karta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.3 Hill Climbing — Chadhai Chadho"
                },
                {
                    "type": "paragraph",
                    "text": "Hill Climbing ek local search algorithm hai. Ye memory me poora graph ya path store nahi karta — sirf CURRENT STATE aur uska score dekhta hai. Apne neighbors me se highest score wale par step le leta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.4 Hill Climbing ke Failure Modes — Exam Favourites!"
                },
                {
                    "type": "table",
                    "headers": ["Obstacle / Failure Mode", "Dikhne Me Kaisa (Topography)", "Kyun Atakta Hai?", "Standard Remedy / Fix"],
                    "rows": [
                        ["Local Maximum", "Chhoti pahadi jiske charon taraf neeche dhalan hai", "Sabhi neighbors ka score current node se kam hai, par ye global peak nahi hai", "Random Restarts (alag-alag starting states se run karo)"],
                        ["Plateau / Flat Local Max", "Sapaat flat zameen jahan sabhi neighbors ka score barabar hai", "Heuristic gradient zero ho jaata hai, koi best direction nahi dikhti", "Sideways moves allow karo (limit max consecutive sideways steps)"],
                        ["Ridge / Narrow Crest", "Do steep dhalano ke beech ki tedhi lambi patti", "Har single-variable move neeche girata hai, path diagonal hai", "Multi-step macro-moves ya multiple coordinate changes explore karo"],
                        ["Foothills", "Bahut saare chhote-chhote peaks", "Har bar algorithm alag suboptimal peak par atak jaata hai", "Stochastic search (Simulated Annealing / GA)"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "3.5 Beam Search"
                },
                {
                    "type": "paragraph",
                    "text": "Memory limit fix karne ke liye Beam Search har level par sirf TOP-k best nodes ko retain karta hai (Beam Width = k). Agar k=1 ho to Hill Climbing ban jaata hai; agar k=∞ ho to BFS/Best-First ban jaata hai."
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 Beam Search Incompleteness",
                    "content": "Beam Search incomplete hai kyunki best path beam width se bahar truncate ho sakti hai. Solution space prune hone ke baad backtrack nahi ho sakta."
                }
            ]
        },

        # WEEK 4: Population-Based Methods — GA, TSP Heuristics & ACO
        {
            "id": "week-4",
            "week": 4,
            "title": "Week 4: Population-Based Methods — GA, TSP Heuristics & ACO",
            "subtitle": "Simulated Annealing, Genetic Algorithms (CX, PMX, OX, Ordinal), TSP Heuristics & Ant Colony",
            "examWeight": "5-7 Marks in Quiz 1 & End-Term",
            "summary": "Stochastic local search. Simulated Annealing acceptance probability P = exp(-ΔE/T). Genetic Algorithms: Chromosome encodings (Path vs Ordinal), Selection, Crossover (Cycle Crossover CX, PMX, OX) and Mutation. Travelling Salesperson Problem (TSP) heuristics: Nearest Neighbour, Greedy edge addition with degree/cycle validation, Clarke-Wright Savings, 2-Opt/3-Opt, aur Ant Colony Optimization (ACO).",
            "diagramType": "ga-crossover",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "4.1 Simulated Annealing (SA) — Dhaat Ko Pighlaana"
                },
                {
                    "type": "paragraph",
                    "text": "Kirkpatrick (1983) ne metallurgy ke annealing process se inspired algorithm banaya: high temperature T par random exploration allow hoti hai, phir dheere-dheere temperature cool down hota hai."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "SA Acceptance Rule (Metropolis Criterion)",
                    "content": "• Agar naya state better hai (ΔE <= 0 for minimization): HAMESHA ACCEPT KARO.\n• Agar naya state worse hai (ΔE > 0): Probability P = e^(-ΔE / T) se accept karo.\n• High T par: P ≈ 1 (har move accept, random walk).\n• Low T par: P ≈ 0 (sirf downhill moves, pure Hill Climbing)."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "4.2 Genetic Algorithms (GA) — Natural Selection"
                },
                {
                    "type": "paragraph",
                    "text": "John Holland ka model: Individual solutions = Chromosomes, population of solutions, fitness evaluation, selection, crossover, aur mutation."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "4.3 Permutation Crossover Operators — TSP Ke Liye (EXAM GOLD)"
                },
                {
                    "type": "table",
                    "headers": ["Crossover Technique", "Mechanism (Kaise Banta Hai)", "Kya Preserve Karta Hai?", "Exam Trap / Rule"],
                    "rows": [
                        ["Cycle Crossover (CX)", "Parent 1 aur Parent 2 ke indices par disjoint cycles trace karo", "Absolute city positions preserve karta hai (no duplicates)", "Cycle 1 ke elements P1 se aayenge, baaki saare indices P2 se bharo"],
                        ["Partially Mapped (PMX)", "Two cut points chuno, middle segment swap karo, mapping table se duplicates resolve karo", "Relative positions aur ordering dono preserve karta hai", "Swap zone mapping se bahar wale duplicates ko target city se swap karo"],
                        ["Order Crossover (OX)", "Two cut points ke beech ka segment copy karo, baaki second parent se cyclic order me fill karo", "Relative sequence/order preserve karta hai", "Second cut point ke baad se start karke unvisited cities add karo"],
                        ["Ordinal Representation", "Permutation ko canonical reference list ke index sequence me map karo", "Standard single-point crossover safely kaam karta hai", "Hamesha valid permutation decode hoti hai, no repair needed!"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "4.4 TSP Heuristic Tour Construction Methods"
                },
                {
                    "type": "table",
                    "headers": ["TSP Heuristic", "Selection Strategy", "Time Complexity", "Key Validation Rule / Trap"],
                    "rows": [
                        ["Nearest Neighbour (NN)", "Current shehar se sabse cheapest unvisited neighbour par jao", "O(N^2)", "Last city se start city ka return edge arbitrarily expensive ho sakta hai"],
                        ["Greedy Edge Addition", "Poore graph ke edges ko sort karke cheapest edge jodo", "O(N^2 log N)", "Rule 1: Kisi bhi node ki degree <= 2 honi chahiye. Rule 2: Jab tak saare N cities connect na hon, koi sub-cycle allow nahi!"],
                        ["Clarke-Wright Savings", "Hub shehar H se savings S(i,j) = c(H,i) + c(H,j) - c(i,j) compute karo", "O(N^2 log N)", "Sirf tab merge kar sakte hain agar i aur j apne-apne routes ke endpoints hon!"],
                        ["2-Opt Local Search", "Do non-adjacent edges (A-B) aur (C-D) hata kar (A-C) aur (B-D) se reconnect karo", "O(N^2) per pass", "Untangles crossing lines; tour length decrease hone par swap accept karo"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "4.5 Ant Colony Optimization (ACO)"
                },
                {
                    "type": "paragraph",
                    "text": "Dorigo ka pheromone model: Cheetiyan chalte huye pheromone chhodti hain. Probability of choosing edge (i,j) is proportional to [τ_ij]^α * [η_ij]^β, jahan τ_ij pheromone trail hai aur η_ij = 1/d_ij heuristic visibility hai. Evaporation rate (1-ρ) stagnation se bachata hai."
                }
            ]
        },

        # WEEK 5: Optimal Paths — Branch & Bound, Dijkstra aur Algorithm A*
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
                    "text": "5.1 Branch and Bound (BnB) — Basic Idea"
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
                    "text": "5.2 A* Algorithm — Star Algorithm (Sabse Important!)"
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
                    "text": "5.3 A* Admissibility — Kab Optimal Hota Hai?"
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
                    "text": "5.4 WA* — Weighted A* (Ek Important Variation)"
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
                    "text": "5.5 A* vs BnB vs Best First — Comparison Table"
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
                    "text": "5.6 Tie Breaking Rule — Alphabetical Order"
                },
                {
                    "type": "callout",
                    "calloutType": "exam",
                    "title": "📌 Tie Breaker — IMPORTANT for Exam",
                    "content": "Jab do ya zyada nodes ka f-value same ho, toh ALPHABETICAL ORDER me pehle wala choose karo.\n\nExample: OPEN me hain A(f=10), C(f=10), B(f=10) → A pehle pop hoga kyunki A < B < C."
                }
            ]
        },

        # WEEK 6: Monotone Condition, Space-Saving A* & Sequence Alignment
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

        # WEEK 7: Game Playing — Minimax, Alpha-Beta aur SSS*
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
                    "title": "Minimax Logic",
                    "content": "• MAX Player (Hum): Apni utility ko MAXIMIZE karna chahta hai. MAX node par score = Max(Children).\n• MIN Player (Opponent): Hamaari utility ko MINIMIZE karna chahta hai. MIN node par score = Min(Children).\n• Leaf / Terminal: Game over ya horizon par evaluation function value hoti hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "7.2 Alpha-Beta Pruning — Speedup Technique"
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
                    "text": "7.3 Alpha Cut vs Beta Cut — Clearly Samjho"
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
                    "text": "7.4 Minimax vs Alpha-Beta vs SSS* — Comparison"
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

        # WEEK 9: Problem Decomposition aur Algorithm AO*
        {
            "id": "week-9",
            "week": 9,
            "title": "Week 9: Problem Decomposition aur Algorithm AO*",
            "subtitle": "AND-OR Graphs, Solution Subtrees, Backed-Up Cost & Prolog Chaining",
            "examWeight": "3-5 Marks in Quiz 2 / End-Term",
            "summary": "Hierarchical problem solving. AND-OR trees me OR nodes alternatives hain aur AND nodes me sabhi sub-goals solve karne padte hain. Backed-up cost: AND = sum, OR = min. AO* algorithm, Means-Ends Analysis (GPS), DENDRAL expert system aur Prolog.",
            "diagramType": "and-or-tree",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "9.1 Linear Plans se Hierarchical Decomposition tak"
                },
                {
                    "type": "paragraph",
                    "text": "Socho doston ke saath evening plan kar rahe ho: Activity choose karo -> Movie choose karo -> Restaurant choose karo. Agar friend ne mall reject kar diya, toh pure combination ko baar-baar DFS se explore karna wasteful hai. Solution: Independent sub-goals ko alag solve karo. AND-OR trees isi problem decomposition ko represent karte hain."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "9.2 AND-OR Graphs (Goal Trees) — Structure Samjho"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "OR Nodes: Alternatives represent karte hain. Ek bhi child solve hua toh OR node SOLVED ho jaata hai.",
                        "AND Nodes (arc se judey huye): Sub-goals me decompose karte hain. Sabhi children ka solve hona COMPULSORY hai!",
                        "Solution Subtree: Ek subtree hota hai (path nahi!), jahan har OR node ka exactly 1 child aur har AND node ke saare children shamil hon, aur saare leaves SOLVED primitive goals hon."
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "9.3 Backed-Up Cost Formula (YAAD KARO!)"
                },
                {
                    "type": "table",
                    "headers": ["Node Type", "Backed-Up Cost Formula", "Meaning in Hinglish"],
                    "rows": [
                        ["OR Node n", "cost(n) = min_i [ c(n, n_i) + cost(n_i) ]", "Sabse saste alternative child ki cost chuno"],
                        ["AND Node n", "cost(n) = Σ_i [ c(n, n_i) + cost(n_i) ]", "Sabhi subproblems ki costs ka jod (sum) lo"],
                        ["Solved Primitive Goal", "cost(n) = 0", "Directly achievable, zero cost"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "9.4 AO* vs A* Algorithm — Comparison Table"
                },
                {
                    "type": "table",
                    "headers": ["Feature", "Algorithm A*", "Algorithm AO*"],
                    "rows": [
                        ["Graph Type", "State Space Graph (OR Graph)", "AND-OR Graph (Goal Hypergraph)"],
                        ["Solution Shape", "Single linear path from Start to Goal", "Solution Subtree (AND branches + selected OR choice)"],
                        ["Search Strategy", "OPEN list se minimum f node pop karo", "Root se marked best edges follow karke unexpanded leaf expand karo"],
                        ["Cost Propagation", "Path cost g(n) forward accumulate hoti hai", "Leaves se root ki taraf cost backward backup hoti hai"],
                        ["Termination", "Goal node OPEN list ke head par aa jaye", "Root node SOLVED mark ho jaye"]
                    ]
                },
                {
                    "type": "callout",
                    "calloutType": "trap",
                    "title": "⚠️ Exam Trap: AO* Leaf Selection Rule",
                    "content": "AO* lowest raw heuristic h(n) wale node ko nahi, balki CURRENT CHEAPEST PARTIAL SOLUTION SUBTREE ke marked edges follow karke uske unexpanded leaf ko expand karta hai!"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "9.5 Means-Ends Analysis (GPS) & Expert Systems"
                },
                {
                    "type": "paragraph",
                    "text": "Newell & Simon ka General Problem Solver (GPS) difference reduction par kaam karta hai: Current state aur Goal state ka difference measure karo, us difference ko reduce karne wala operator dhundho, aur agar operator ke preconditions satisfied nahi hain toh unhe sub-goals bana kar recursive search chalao."
                }
            ]
        },

        # WEEK 10: Pattern-Directed Inference Systems aur Rete Algorithm
        {
            "id": "week-10",
            "week": 10,
            "title": "Week 10: Pattern-Directed Inference Systems aur Rete Algorithm",
            "subtitle": "Production Systems, Working Memory, Conflict Resolution & The Rete Network",
            "examWeight": "3-4 Marks in End-Term",
            "summary": "Declarative problem solving. Production System: Working Memory (WM), Rule Base, Inference Engine (Match-Resolve-Act). Conflict Resolution strategies (Refractoriness, Recency, Specificity). The Rete Algorithm (Alpha nodes, Beta nodes, Join memories, Tokens) jo matching complexity ko O(|R| * |WM|^k) se linear time me transform karta hai.",
            "diagramType": "rete-network",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "10.1 Production Systems — Architecture"
                },
                {
                    "type": "paragraph",
                    "text": "Pehle saari knowledge MoveGen algorithm ke andar procedural form me code hoti thi. Production systems me knowledge ko independent declarative rules ke roop me encode kiya jaata hai: IF <conditions> THEN <actions>."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "Production System ke 3 Main Components",
                    "content": "1. Working Memory (WM): Current world ke saare active facts ka collection (e.g., On(A, B), Clear(A)).\n2. Production Memory (Rule Base): Saare IF-THEN rules (Domain knowledge).\n3. Inference Engine: Match-Resolve-Act cycle chala kar rules ko execute karta hai."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "10.2 Conflict Resolution Strategies — Exam Favourites!"
                },
                {
                    "type": "paragraph",
                    "text": "Jab Match phase me multiple rules simultaneously trigger ho jaate hain (Conflict Set me multiple instantiations hote hain), toh kaunsa rule pehle execute hoga?"
                },
                {
                    "type": "table",
                    "headers": ["Strategy", "Rule Chune Ka Criteria", "Fayda / Purpose", "Exam Example"],
                    "rows": [
                        ["Refractoriness", "Same rule ko same fact bindings ke saath dobara execute hone se roko", "Infinite loops se bachata hai", "Rule: Agar fever hai toh Paracetamol do — ek hi cycle me baar-baar execute na ho!"],
                        ["Recency", "Jis rule ke conditions me sabse newly created/modified facts hon", "System ka focus current task par maintain rakhta hai", "Time-tag t=25 wala fact t=10 wale purane fact par bhari padta hai"],
                        ["Specificity (Subsumption)", "Jis rule me zyada number of conditions hon (more specific rule)", "General default rule se pehle exception case execute ho sake", "Bird(X) -> Fly(X) vs Bird(X) & Penguin(X) -> Swim(X)"],
                        ["Rule Priority / Salience", "Rules ko explicit priority weights diye jaate hain", "Emergency safety rules ko highest precedence milti hai", "Priority(AlarmRule) = 100 > Priority(NormalRule) = 10"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "10.3 The Rete Algorithm (Charles Forgy, 1979)"
                },
                {
                    "type": "paragraph",
                    "text": "Brute-force matching bahut slow hota hai: har cycle me O(|Rules| * |WM|^k) comparisons! Rete algorithm do core insights se is problem ko solve karta hai:"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "1. Structural Similarity: Agar multiple rules me identical conditions hon (jaise 'type == block'), to unka test ek hi node par share hota hai.",
                        "2. Temporal Redundancy: Ek cycle se doosre cycle me working memory ke sirf 1-2% facts badalte hain. Har cycle me sabhi rules re-evaluate karne ki bajaye sirf changes (tokens) network me flow karte hain!"
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "10.4 Rete Network Node Architecture"
                },
                {
                    "type": "table",
                    "headers": ["Node Type", "Inputs", "Kaam (Responsibility)", "Output Token"],
                    "rows": [
                        ["Root Node", "WM Changes", "Incoming add/delete fact events ko network me dispatch karta hai", "Raw fact tuple"],
                        ["Alpha Node (1-input)", "Single fact", "Constant pattern matching (e.g. type == block, color == red)", "Alpha Memory me store hota hai"],
                        ["Beta / Join Node (2-input)", "Left: Beta token, Right: Alpha fact", "Cross-condition variable binding test karta hai (e.g. X == Y)", "Beta Memory me extended binding list"],
                        ["Terminal Node", "Complete Match", "Poora rule instantiate ho gaya; conflict set me add karta hai", "Rule Activation record"]
                    ]
                }
            ]
        },

        # WEEK 11: Constraint Satisfaction Problems (CSP)
        {
            "id": "week-11",
            "week": 11,
            "title": "Week 11: Constraint Satisfaction Problems (CSP)",
            "subtitle": "Variables, Domains, Arc Consistency (AC-3), Forward Checking & Backtracking Heuristics",
            "examWeight": "3-4 Marks in End-Term",
            "summary": "State space me states black boxes nahi hote, balki variable-value assignments hote hain. CSP triple (X, D, C). Arc Consistency AC-3 algorithm, Backtracking search heuristics: MRV (Minimum Remaining Values), Degree heuristic, Least Constraining Value (LCV), Forward Checking, aur Map Colouring / 4-Queens examples.",
            "diagramType": "csp-network",
            "blocks": [
                {
                    "type": "heading",
                    "level": 2,
                    "text": "11.1 CSP Kya Hai? — The Formal Triple (X, D, C)"
                },
                {
                    "type": "paragraph",
                    "text": "Classical search me goal ek opaque condition hoti hai. CSP me world variables, unke allowed domains, aur unke beech ke constraints se define hoti hai."
                },
                {
                    "type": "callout",
                    "calloutType": "theory",
                    "title": "CSP Formal Triple",
                    "content": "• Variables X = {X_1, X_2, ..., X_n}\n• Domains D = {D_1, D_2, ..., D_n} (har variable ke possible values ka set)\n• Constraints C = {C_1, C_2, ..., C_m} (allowed value combinations)"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "11.2 Consistency Levels — Preprocessing Power"
                },
                {
                    "type": "table",
                    "headers": ["Consistency Level", "Mathematical Definition", "Standard Algorithm", "Complexity"],
                    "rows": [
                        ["Node Consistency (1-Consistency)", "Har variable ka domain uske unary constraints satisfy kare", "Direct domain scan", "O(v * d)"],
                        ["Arc Consistency (2-Consistency)", "Directed arc (Xi, Xj) consistent hai agar har x in Di ke liye koi y in Dj ho jo constraint satisfy kare", "AC-3 Algorithm", "O(e * d^3) [AC-4: O(e * d^2)]"],
                        ["Path Consistency (3-Consistency)", "Har pair (Xi, Xj) aur third variable Xk ke liye, pair consistent assignment Xk tak extend ho sake", "PC-2 Algorithm", "O(v^3 * d^5)"],
                        ["k-Consistency", "Kisi bhi k-1 variables ki consistent assignment k-th variable tak extend ho sake", "k-Consistency check", "Exponential in k"]
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "11.3 AC-3 (Arc Consistency 3) Algorithm Steps"
                },
                {
                    "type": "bullet_list",
                    "items": [
                        "Queue me initially graph ke sabhi directed arcs (Xi, Xj) daalo.",
                        "Queue se ek arc (Xi, Xj) pop karo.",
                        "Check karo: kya Xi ke domain me koi aisa x hai jiske liye Xj me koi compatible y nahi milta?",
                        "Agar haan, to x ko Di se REMOVE karo (domain prune).",
                        "CRITICAL: Agar Di modify hua, toh Xi ke saare incoming neighbors Xk ke arcs (Xk, Xi) ko wapas Queue me push karo!"
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "11.4 Backtracking Search Heuristics — Exam Key Rules"
                },
                {
                    "type": "table",
                    "headers": ["Heuristic / Technique", "Decides What?", "Strategy / Intuition", "Exam Trap / Nickname"],
                    "rows": [
                        ["MRV (Minimum Remaining Values)", "Which Variable to pick next?", "Sabse kam legal values bachi hui variable ko pehle chuno", "'Most Constrained Variable' ya 'Fail-First Heuristic'"],
                        ["Degree Heuristic", "Which Variable to pick next (Tie-breaker)?", "Baaki unassigned variables ke saath sabse zyada constraints share karne wali variable chuno", "MRV me tie hone par use hota hai"],
                        ["LCV (Least Constraining Value)", "Which Value to try first?", "Aisi value assign karo jo baaki variables ke options ko sabse kam restrict kare", "'Fail-Last Heuristic' — maximum flexibility chhodta hai"],
                        ["Forward Checking", "In-search pruning", "Jab variable assign ho, tabhi uske neighbours ke domain se conflicting values prune karo", "Domain size 0 hote hi immediately backtrack karo!"],
                        ["MAC (Maintaining Arc Consistency)", "In-search pruning", "Har assignment ke baad full AC-3 run karo", "Expensive per node, par branching drastically reduce karta hai"]
                    ]
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

def main():
    modules = get_all_modules()
    print(f"Total modules compiled: {len(modules)}")
    
    # Save to src/data/notesData.json
    with open('src/data/notesData.json', 'w', encoding='utf-8') as f:
        json.dump(modules, f, indent=2, ensure_ascii=False)
        
    # Save to src/data/notesData.js
    with open('src/data/notesData.js', 'w', encoding='utf-8') as f:
        f.write(f"""// AI: Search Methods for Problem Solving — Master Study Notes
// Source: AI_Master_Ebook_Anmol.pdf, AI_Search_Methods_Complete_Hinglish_Notes, & Week 1 Hinglish Edition
// Compiled for IIT Madras Degree Level Course

export const courseModules = {json.dumps(modules, indent=2, ensure_ascii=False)};
""")
        
    print("Successfully rebuilt ALL 13 modules in notesData.json and notesData.js with pristine tables, formulas, and Hinglish callouts!")

if __name__ == '__main__':
    main()
