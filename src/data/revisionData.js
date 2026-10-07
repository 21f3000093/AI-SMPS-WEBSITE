export const fourHourPlan = [
  {
    hour: 1,
    title: "Hour 1: State Space & Search Traversal",
    timeAllocated: "60 mins",
    targetTopics: ["DFS & BFS", "NodePair Parent Tracing", "RemoveSeen", "Best-First Search", "Hill Climbing NIL Trap", "DFID-N vs DFID-C"],
    memorizeFacts: [
      "DFS uses a Stack (LIFO). Push neighbours in reverse-alphabetical order so the alphabetically-first child pops first.",
      "BFS uses a Queue (FIFO). Push neighbours at tail in MoveGen order. Finds shortest path in hops on unweighted graphs.",
      "Both use RemoveSeen: drop neighbours already present in OPEN or CLOSED before pushing.",
      "Best-First Search orders OPEN by h. Pops smallest h; ties broken alphabetically.",
      "Hill Climbing moves ONLY to a strictly-better neighbour. If none is better, it halts immediately (often returns NIL).",
      "Goal test happens on inspection (pop from OPEN), NOT on push/generation. This distinguishes whether goal is 'inspected' or merely 'in OPEN'."
    ],
    drill: "Pick any 3 solved papers (e.g., 2024T1, 2025T1, 2026T1) and re-trace the 9-node / knight search grid by hand for DFS, BFS, and Best-First. Check step-by-step with the solution accordion."
  },
  {
    hour: 2,
    title: "Hour 2: TSP Heuristics (NN, Greedy, Savings)",
    timeAllocated: "60 mins",
    targetTopics: ["Nearest Neighbour", "Greedy Edge Addition", "Saturation Trap Lookahead", "Clarke-Wright Savings", "Merge Operations"],
    memorizeFacts: [
      "Nearest Neighbour: Visited = {start}; repeatedly jump to cheapest unvisited city from current; close tour by returning to start.",
      "Greedy Edge Heuristic: Sort edges ascending. Add cheapest edge if neither endpoint exceeds degree 2 and no premature cycle forms. Watch for the saturation trap!",
      "Greedy Saturation Trap: If adding the cheapest edge isolates or blocks remaining cities from forming a valid Hamiltonian cycle, lookahead and skip it.",
      "Savings Formula: With fulcrum F, s(i, j) = d(F, i) + d(F, j) - d(i, j). Always compute all pairwise savings and sort descending.",
      "Total Merges in Savings: Always exactly N - 2 merges for N cities.",
      "Counting Tours: Symmetric TSP has (N - 1)! / 2 tours. 2-exchange neighbours = N(N - 3) / 2."
    ],
    drill: "Pick the 5-city matrix from 2025 Term 1 or 2026 Term 1. Calculate NN from city A, Greedy from city A, and Savings with fulcrum A. Verify that your total costs match the answer key."
  },
  {
    hour: 3,
    title: "Hour 3: Genetic Algorithms & Tour Representations",
    timeAllocated: "60 mins",
    targetTopics: ["Path Representation", "Adjacency Representation", "Ordinal Representation", "Cycle Crossover (CX)", "PMX Crossover"],
    memorizeFacts: [
      "Path Representation is an OPEN list of length N (e.g. [A, B, C, D]). The wrap-around return is implicit. A list of length N+1 repeating the start is INVALID!",
      "Adjacency Representation: Index i stores the successor of city i in the tour. Traversal must form a single N-cycle. A symmetric tour and its reverse both give valid adjacency vectors.",
      "Ordinal Representation: Start with reference list R. For each city in tour, record its 1-based index in R, then DELETE that city from R. The last index is always 1.",
      "Cycle Crossover (CX): You MUST find ALL cycles partitioning the indices. Alternate parents per cycle (Cycle 1 from P1, Cycle 2 from P2, Cycle 3 from P1...). Do NOT stop after the first cycle!",
      "PMX Crossover: Copy segment [i..j] from P1 to Child 1; establish mapping pairs; fill non-segment slots from P2 resolving collisions via the mapping chain.",
      "Tour Reversal Invariance: For symmetric TSP, reversing raw path, adjacency, or ordinal list represents the same physical tour."
    ],
    drill: "Convert the tour [E, F, A, C, D, B] to ordinal using reference [A, B, C, D, E, F]. Output: [5, 5, 1, 2, 2, 1]. Try parents P1 and P2 for Cycle Crossover and verify all cycles."
  },
  {
    hour: 4,
    title: "Hour 4: Algorithms Meta, Puzzles & State Space",
    timeAllocated: "60 mins",
    targetTopics: ["Reversibility vs Reachability", "Completeness MSQs", "Stochastic HC & SA Temperature", "Puzzle State Spaces", "Water Jug & Knight Tours"],
    memorizeFacts: [
      "Reversibility != Reachability: Reversibility means every directed edge has an inverse. Reachability means an undirected or strongly-connected path exists between states.",
      "Completeness: BFS is complete; Best-First is complete on finite graphs with RemoveSeen; DFS is complete on finite graphs with RemoveSeen (incomplete on infinite trees); Hill Climbing is NOT complete.",
      "Shortest Path in Hops: BFS and DFID-C guarantee shortest hops. DFID-N does NOT guarantee shortest path because closed nodes are never reopened.",
      "Stochastic HC / SA Temperature: T -> ∞ behaves like uniform Random Walk (P ≈ 0.5); T -> 0 behaves like greedy Hill Climbing.",
      "Constructive vs Perturbative: NN, Greedy, and Savings are CONSTRUCTIVE. 2-exchange, 3-opt, and Crossover are PERTURBATIVE.",
      "Ant Colony Optimization: Each ant constructs its tour independently using local pheromone and distance; there is NO leader ant."
    ],
    drill: "Review the Common Mistake Checklist and check the 7-Term PYQ Heatmap to ensure you have reviewed all Tier 1 concepts."
  }
];

export const examDayTactics = [
  {
    title: "1. Read the Figure First, Not the Question",
    text: "Every search comprehension lives or dies by the figure. Spend 30 seconds extracting nodes, coordinates, edges, and distance matrix before attempting the first sub-question."
  },
  {
    title: "2. Precompute the Heuristic Table",
    text: "Annotate the Manhattan distance (|x_1 - x_2| + |y_1 - y_2|) or Euclidean distance for each node to the goal on your scratch paper right at the start. 4 minutes spent here saves 12 minutes during algorithm traces."
  },
  {
    title: "3. Use a Structured Trace Table",
    text: "For DFS, BFS, and Best-First, keep three columns: Step, OPEN (head left), and CLOSED. Strike through duplicate nodes using RemoveSeen before inserting."
  },
  {
    title: "4. Expect Hill Climbing to Return NIL",
    text: "In 6 out of 7 historical exam papers, the answer to 'Hill Climbing path' is NIL because the algorithm hits a local maximum or plateau on the start node or within 2 hops. Trace carefully to confirm, but don't panic if it halts early."
  },
  {
    title: "5. Cross-Check NN and Greedy Costs",
    text: "NN and Greedy costs often differ by a small edge-swap. If they disagree by more than 30%, double check your edge saturation checks in Greedy."
  },
  {
    title: "6. Don't Fall for the N+1 Closed Path Rep Trap",
    text: "Exam options often include [A, B, C, D, A] as a path representation. In this course, path representation is strictly OPEN (length N, no duplicate start city at the end)."
  }
];

export const commonMistakeChecklist = [
  "Did I apply RemoveSeen before pushing neighbors to OPEN in DFS and BFS?",
  "In DFS, did I push neighbors in reverse-alphabetical order so that the alphabetically-first child stays on top?",
  "In Best-First Search, did I break ties between equal heuristic nodes alphabetically?",
  "In Hill Climbing, did I enforce STRICT improvement (h(neighbor) < h(current))?",
  "In TSP tour cost calculations, did I remember to include the final return-to-start edge?",
  "In Path -> Ordinal conversion, did I delete each visited city from the reference list before looking up the next one?",
  "In Cycle Crossover (CX), did I find ALL cycles and alternate parents for every cycle?",
  "In Savings Heuristic, did I check whether the fulcrum matches the question's specified city?",
  "In State-Space MSQs, did I evaluate reversibility (individual moves) and reachability (connected component) separately?"
];

export const conceptsMissingFromNotes = [
  {
    id: "gap-1",
    title: "Gap 1: Greedy TSP Saturation Trap & Lookahead",
    trap: "Pure mechanical edge-addition can saturate vertices (degree 2) before the partial tour can be closed, stranding remaining cities.",
    example: "In 2026 Term 1, adding cheapest edges blindly leaves city A with degree 0 while all other 4 cities are saturated at degree 2. The algorithm stalls without completing the tour.",
    fix: "Lookahead: Track which vertices are still join-eligible. If adding edge (u, v) leaves some vertex w with no valid remaining incident edges, skip (u, v) even if it is the cheapest available edge."
  },
  {
    id: "gap-2",
    title: "Gap 2: Hill Climbing on Plateaus",
    trap: "Textbooks define HC as requiring strict improvement, but how do plateau neighbors behave in exam questions?",
    example: "2025 Term 1 exam convention: HC moves to the best neighbor even if equal (non-strict), but halts when no neighbor is strictly better than the current state.",
    fix: "Across the 7 exam papers, HC = NIL is the dominant pattern. If your hand trace finds a full path to the goal, double check whether HC accepted a plateau move that the official key disallowed."
  },
  {
    id: "gap-3",
    title: "Gap 3: Cycle Crossover (The Multi-Cycle Method)",
    trap: "Many student notes describe CX with a single cycle and fill the rest in order from P2. This produces invalid tours with duplicate or missing cities!",
    example: "In 2024 Term 3 Q36, P1 and P2 have 3 distinct cycles: C1 = {1, 2, 5}, C2 = {3, 4, 6}, C3 = {7, 8, 9, 10}. Single-cycle CX produces an invalid child.",
    fix: "Partition all indices into cycles. Alternate parents: Cycle 1 and 3 from P1, Cycle 2 from P2. Never mix parents within the same cycle."
  },
  {
    id: "gap-4",
    title: "Gap 4: Savings with Missing Distance Entries",
    trap: "Exam questions sometimes leave two entries in the savings table blank, asking you to fill them before proceeding with merges.",
    example: "In 2024 Term 2 Q41, entries s(A, D) and s(B, D) are given as '?' in the savings list.",
    fix: "Compute s(i, j) = d(F, i) + d(F, j) - d(i, j) using the distance matrix. Insert them into the savings list and RE-SORT descending. The missing entries often sit near the very top of the list!"
  },
  {
    id: "gap-5",
    title: "Gap 5: Closed Knight's Tour on Small Obstacle Grids",
    trap: "Students attempt to apply general 8x8 chessboard theorems to small 4x3 boards with obstacle cells.",
    example: "In 2026 Term 1 Q8, a 4x3 board has 2 central blocked cells leaving 10 valid states.",
    fix: "Check corner and degree pinch points. Two cells with only 2 neighbors each can pinch the tour, and bipartite color parity violations make a closed tour impossible."
  }
];
