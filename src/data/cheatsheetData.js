export const searchComplexityMatrix = [
  {
    algorithm: "DFS (Depth-First Search)",
    dataStruct: "Stack (LIFO)",
    timeComplexity: "O(b^m) worst, O(d+1) best",
    spaceComplexity: "O(b * m) [Linear!]",
    complete: "No (infinite graphs loop; Yes on finite with RemoveSeen)",
    optimal: "No (first path found)",
    usesHeuristic: "No",
    notes: "Dives deep; memory efficient; prune seen nodes to prevent infinite loops."
  },
  {
    algorithm: "BFS (Breadth-First Search)",
    dataStruct: "Queue (FIFO)",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b^d) [Exponential!]",
    complete: "Yes (finite branching, solution exists)",
    optimal: "Yes (for uniform / unit-cost edges in hops)",
    usesHeuristic: "No",
    notes: "Sweeps layer by layer; finds shortest hop path; memory is the bottleneck."
  },
  {
    algorithm: "DFID (Depth-First Iterative Deepening)",
    dataStruct: "Stack (LIFO) with depth bounds",
    timeComplexity: "O(b^d) [~b/(b-1) times BFS]",
    spaceComplexity: "O(b * d) [Linear!]",
    complete: "Yes",
    optimal: "Yes (shortest hop path)",
    usesHeuristic: "No",
    notes: "Combines DFS linear space with BFS optimality. Node counting detects finite saturation."
  },
  {
    algorithm: "Best-First Search",
    dataStruct: "Priority Queue sorted by h(n)",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b^d)",
    complete: "Yes (on finite graphs with RemoveSeen)",
    optimal: "No (greedy on heuristic, ignores g cost)",
    usesHeuristic: "Yes (h only)",
    notes: "Guided towards goal; fast in practice; does NOT guarantee shortest path."
  },
  {
    algorithm: "Hill Climbing (HC)",
    dataStruct: "None (O(1) current state only)",
    timeComplexity: "Linear in path length",
    spaceComplexity: "O(1) [Constant!]",
    complete: "No (stops at local optima, plateaus, ridges)",
    optimal: "No",
    usesHeuristic: "Yes (eval / h)",
    notes: "Pure exploitation; almost always returns NIL in exam trap grid problems."
  },
  {
    algorithm: "Simulated Annealing (SA)",
    dataStruct: "None (O(1) current state + temp T)",
    timeComplexity: "Depends on cooling schedule",
    spaceComplexity: "O(1) [Constant!]",
    complete: "No (Probabilistically approaches 1 with slow cooling)",
    optimal: "Probabilistically optimal with logarithmic cooling",
    usesHeuristic: "Yes (eval / fitness)",
    notes: "Accepts worse moves with P = 1/(1 + e^(-ΔE/T)). T large = Random Walk; T -> 0 = Hill Climbing."
  },
  {
    algorithm: "Branch & Bound (BnB)",
    dataStruct: "Priority Queue sorted by g(n)",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b^d)",
    complete: "Yes",
    optimal: "Yes (guaranteed minimum cost path)",
    usesHeuristic: "No (cost g only)",
    notes: "Expands lowest g first; Dijkstra in state space; no sense of direction."
  },
  {
    algorithm: "A* Algorithm (Admissible h)",
    dataStruct: "Priority Queue sorted by f = g + h",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b^d)",
    complete: "Yes (if branching finite & edge cost >= ε > 0)",
    optimal: "Yes (if h(n) <= h*(n) everywhere)",
    usesHeuristic: "Yes (f = g + h)",
    notes: "Ground truth (g) + Hope (h). May need Case-3 reopen of CLOSED nodes if h not monotone."
  },
  {
    algorithm: "A* with Consistent (Monotone) h",
    dataStruct: "Priority Queue sorted by f = g + h",
    timeComplexity: "O(b^d) [strictly fewer expansions]",
    spaceComplexity: "O(b^d)",
    complete: "Yes",
    optimal: "Yes",
    usesHeuristic: "Yes (f = g + h)",
    notes: "f-values non-decreasing. When node enters CLOSED, optimal path is guaranteed. Case 3 vanishes!"
  },
  {
    algorithm: "Weighted A* (WA*, w > 1)",
    dataStruct: "Priority Queue sorted by f = g + w*h",
    timeComplexity: "O(b^d) [much faster than A*]",
    spaceComplexity: "O(b^d) [smaller frontier]",
    complete: "Yes",
    optimal: "Approximate (cost <= w * optimal)",
    usesHeuristic: "Yes (g + w*h)",
    notes: "Trades optimality for speed and smaller memory. Common exam weight w = 1.5 or 2."
  },
  {
    algorithm: "IDA* (Iterative Deepening A*)",
    dataStruct: "Stack (LIFO) with f-value bounds",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b * d) [Linear!]",
    complete: "Yes",
    optimal: "Yes (if h admissible)",
    usesHeuristic: "Yes (f-bound)",
    notes: "Uses f-value bound instead of depth limit; linear memory like DFID."
  },
  {
    algorithm: "Beam Search (width w)",
    dataStruct: "Keeps best w candidates at each level",
    timeComplexity: "O(w * d)",
    spaceComplexity: "O(w * d) [Linear!]",
    complete: "No",
    optimal: "No",
    usesHeuristic: "Yes (f or h)",
    notes: "Prunes all candidates except top w. Inadmissible, but gives fast upper bound U."
  },
  {
    algorithm: "Beam Stack Search (BSS)",
    dataStruct: "Beam Stack of [f_min, f_max) pairs",
    timeComplexity: "Higher (re-explores on backtrack)",
    spaceComplexity: "O(w * d)",
    complete: "Yes",
    optimal: "Yes (admissible with backtracking)",
    usesHeuristic: "Yes (f-bounded)",
    notes: "Saves memory by retaining only beam and explicit backtracking stack."
  },
  {
    algorithm: "Minimax",
    dataStruct: "DFS game tree stack",
    timeComplexity: "O(b^d)",
    spaceComplexity: "O(b * d)",
    complete: "Yes (for finite trees)",
    optimal: "Yes (against optimal opponent)",
    usesHeuristic: "Evaluation function at horizon",
    notes: "Max node takes maximum; Min node takes minimum. Evaluates entire tree."
  },
  {
    algorithm: "Alpha-Beta Pruning (Best Ordering)",
    dataStruct: "DFS game tree stack + (α, β)",
    timeComplexity: "O(b^(d/2)) [Square Root of Minimax!]",
    spaceComplexity: "O(b * d)",
    complete: "Yes",
    optimal: "Yes (same exact value as Minimax)",
    usesHeuristic: "Evaluation function at horizon",
    notes: "Prunes provably irrelevant subtrees. Cutoff triggers when α >= β."
  },
  {
    algorithm: "SSS* (Stockman)",
    dataStruct: "Priority Queue over strategy clusters",
    timeComplexity: "O(b^(d/2))",
    spaceComplexity: "O(b^(d/2)) [Exponential PQ!]",
    complete: "Yes",
    optimal: "Yes (same value as Minimax)",
    usesHeuristic: "Evaluation function at horizon",
    notes: "Best-first game tree search. Dominates Alpha-Beta in node expansions, but large memory."
  },
  {
    algorithm: "Goal Stack Planning (GSP)",
    dataStruct: "LIFO Goal & Action Stack",
    timeComplexity: "Exponential worst-case",
    spaceComplexity: "Exponential worst-case",
    complete: "Sometimes No (fails on non-serializable subgoals)",
    optimal: "No",
    usesHeuristic: "Goal ordering heuristic",
    notes: "Linear planning. Fails on Sussman's Anomaly because goals undo each other."
  },
  {
    algorithm: "Partial Order Planning (POP)",
    dataStruct: "Plan space 4-tuple <A, O, L, B>",
    timeComplexity: "Exponential in worst case",
    spaceComplexity: "Polynomial in plan size",
    complete: "Yes",
    optimal: "Yes (with search over plans)",
    usesHeuristic: "Flaw selection heuristic",
    notes: "Principle of least commitment. Resolves threats via promotion, demotion, separation."
  },
  {
    algorithm: "AO* (Goal Trees)",
    dataStruct: "AND-OR Graph with marked best edges",
    timeComplexity: "Exponential in tree size",
    spaceComplexity: "Exponential (stores explored graph)",
    complete: "Yes (finite graphs)",
    optimal: "Yes (when h underestimates cost)",
    usesHeuristic: "Heuristic h on sub-goals",
    notes: "Solution is a subtree. AND node cost = sum(e + c); OR node cost = min(e + c)."
  },
  {
    algorithm: "Rete Algorithm (OPS5)",
    dataStruct: "Alpha Discrimination Tree + Beta Join Net",
    timeComplexity: "Polynomial per cycle (100-10000x faster)",
    spaceComplexity: "Stores partial matches (Tokens)",
    complete: "Declarative Turing complete",
    optimal: "N/A",
    usesHeuristic: "Conflict resolution strategy",
    notes: "Inter-cycle persistence + Intra-cycle sharing. Refractoriness prevents loops."
  },
  {
    algorithm: "AC-3 (Arc Consistency)",
    dataStruct: "Queue / Worklist of directed arcs",
    timeComplexity: "O(e * k^3) where e = edges, k = domain",
    spaceComplexity: "O(e * k)",
    complete: "Preprocessing / inference only",
    optimal: "N/A",
    usesHeuristic: "Constraint propagation",
    notes: "Revises arcs whose support is threatened. AC-1 is O(n * e * k^3); AC-3 is O(e * k^3)."
  }
];

export const essentialFormulas = [
  {
    category: "Search & Heuristics",
    name: "A* Evaluation Function",
    formula: "f(n) = g(n) + h(n)",
    meaning: "f(n): Total estimated cost through node n; g(n): Actual cost from Start to n; h(n): Estimated cost from n to Goal.",
    mnemonic: "Ground truth (so far) plus Hope (estimate)."
  },
  {
    category: "Search & Heuristics",
    name: "Weighted A* (WA*)",
    formula: "f(n) = g(n) + w * h(n),  w >= 1",
    meaning: "w = 1 is normal A*; w = 0 is pure Branch & Bound; w = ∞ is Best-First Search. Cost guaranteed <= w * optimal.",
    mnemonic: "Higher w = more aggressive heuristic guidance."
  },
  {
    category: "Search & Heuristics",
    name: "Manhattan Distance (Grid Taxi Metric)",
    formula: "h(n) = |x_1 - x_2| + |y_1 - y_2|",
    meaning: "Distance moving only horizontally or vertically on a grid. Admissible and consistent for grid road maps.",
    mnemonic: "Abs delta x plus abs delta y."
  },
  {
    category: "Search & Heuristics",
    name: "Euclidean Distance",
    formula: "h(n) = sqrt((x_1 - x_2)^2 + (y_1 - y_2)^2)",
    meaning: "Straight-line bird-flight distance. Admissible on continuous 2D Euclidean planes.",
    mnemonic: "Pythagorean distance."
  },
  {
    category: "Search & Heuristics",
    name: "Monotone / Consistency Condition",
    formula: "h(m) - h(n) <= k(m, n)   [or h(m) <= k(m, n) + h(n)]",
    meaning: "Heuristic satisfies triangle inequality across every edge. Implies non-decreasing f-values; Case 3 of A* vanishes.",
    mnemonic: "Local step cost must be >= heuristic drop."
  },
  {
    category: "Local & Stochastic Search",
    name: "Simulated Annealing Sigmoid Probability",
    formula: "P(accept) = 1 / (1 + e^(-ΔE / T))",
    meaning: "For maximization: ΔE = eval(neighbor) - eval(current). When ΔE > 0, P ≈ 1. When ΔE < 0, accepted with sigmoid probability.",
    mnemonic: "High T = Random Walk (P ≈ 0.5); Low T (T -> 0) = Hill Climbing (greedy)."
  },
  {
    category: "Population & TSP",
    name: "Total Distinct Tours for Symmetric TSP",
    formula: "Tours = (N - 1)! / 2",
    meaning: "Fix 1 city to eliminate rotational shifts: (N-1)!. Divide by 2 because clockwise and anticlockwise tours have equal cost.",
    mnemonic: "For N=4: 3!/2 = 3. For N=5: 4!/2 = 12. For N=6: 5!/2 = 60."
  },
  {
    category: "Population & TSP",
    name: "2-Exchange Neighbours of an N-City Tour",
    formula: "Neighbours = C(N, 2) - N = N(N - 3) / 2",
    meaning: "Choose any 2 unordered edges: C(N,2). Subtract the N adjacent pairs which yield the exact same tour.",
    mnemonic: "For N=4: 2. For N=5: 5. For N=6: 9. For N=7: 14."
  },
  {
    category: "Population & TSP",
    name: "Clarke-Wright Savings Formula",
    formula: "s(i, j) = d(F, i) + d(F, j) - d(i, j)",
    meaning: "Savings from merging out-and-back routes F-i-F and F-j-F into F-i-j-F. F is the fulcrum city.",
    mnemonic: "Radial return legs saved minus connecting bridge added."
  },
  {
    category: "Population & TSP",
    name: "Number of Merges in Savings Heuristic",
    formula: "Merges = N - 2",
    meaning: "Start with N-1 out-and-back loops. Each merge connects 2 routes into 1. Reaching a single tour takes (N-1) - 1 = N-2 merges.",
    mnemonic: "5 cities = 3 merges. 6 cities = 4 merges."
  },
  {
    category: "Population & TSP",
    name: "3-Edge Exchange (3-Opt) Non-Trivial Children",
    formula: "Children = 4 distinct new tours",
    meaning: "Removing 3 edges creates 3 segments. Reconnecting them yields 2^3 = 8 orientations: 1 original + 3 two-opts + 4 genuine 3-opt children.",
    mnemonic: "Always 4 distinct children for 3-opt."
  },
  {
    category: "Population & TSP",
    name: "Ant Colony Transition Probability",
    formula: "P_ij^k = ([τ_ij]^α * [η_ij]^β) / Σ ([τ_iu]^α * [η_iu]^β)",
    meaning: "τ_ij: learned pheromone on edge (i,j); η_ij = 1/d_ij: heuristic attractiveness (short edge); α, β: weight exponents.",
    mnemonic: "Pheromone strength times heuristic desire, normalized over unvisited allowed cities."
  },
  {
    category: "Game Playing",
    name: "Alpha-Beta Cutoff Rules",
    formula: "Alpha Cut (at Min node): α >= β;   Beta Cut (at Max node): α >= β",
    meaning: "α is Max's current guaranteed lower bound (-∞ to start, only increases). β is Min's current upper bound (+∞ to start, only decreases).",
    mnemonic: "Cutoff whenever α >= β. Alpha-cut at Min; Beta-cut at Max."
  },
  {
    category: "Game Playing",
    name: "Knuth-Moore Alpha-Beta Node Complexity",
    formula: "Best Case Nodes = O(b^(d/2))",
    meaning: "With optimal move ordering (best moves explored first), alpha-beta cuts the effective branching factor to sqrt(b).",
    mnemonic: "Can search twice as deep as Minimax for the same computational budget."
  },
  {
    category: "Automated Planning",
    name: "STRIPS Progression (Forward State Transition)",
    formula: "S' = (S ∪ E+) \\ E-",
    meaning: "State S' is obtained by adding the operator's ADD effects (E+) and deleting its DELETE effects (E-).",
    mnemonic: "Add what becomes true, remove what is no longer true."
  },
  {
    category: "Automated Planning",
    name: "STRIPS Regression (Backward Subgoal Pre-Image)",
    formula: "G' = (G \\ E+) ∪ pre(a)",
    meaning: "New subgoal G' removes the goals achieved by action a (E+) and adds the preconditions pre(a) needed to trigger a.",
    mnemonic: "Subtract achieved effects, add prerequisite causes."
  },
  {
    category: "Problem Decomposition",
    name: "AND-OR Tree Backed-Up Cost",
    formula: "cost(AND) = Σ (e_i + cost(c_i));   cost(OR) = min (e_i + cost(c_i))",
    meaning: "AND node requires solving all sub-problems (sum). OR node chooses the cheapest alternative (min).",
    mnemonic: "AND = Sum; OR = Min."
  }
];

export const tenRecurringThemes = [
  {
    number: 1,
    title: "Generate-and-Test",
    description: "Enumerate candidates with MoveGen, test them against GoalTest. Every search algorithm in this course is an optimization of this skeleton."
  },
  {
    number: 2,
    title: "Heuristics",
    description: "Domain-specific shortcuts that give the search direction. They trade theoretical optimality for computational tractability."
  },
  {
    number: 3,
    title: "Fundamental Trade-Offs",
    description: "Time vs Space (BFS vs DFS), Memory vs Recomputation (BFS vs DFID), Optimality vs Speed (A* vs WA*). There is never a free lunch in AI."
  },
  {
    number: 4,
    title: "Best-First Priority Ordering",
    description: "When you can estimate and score candidates, always expand the most promising one first. A*, AO*, SSS*, and Beam Search share this core."
  },
  {
    number: 5,
    title: "Forward vs Backward Duality",
    description: "FSSP progression vs BSSP regression; Forward data-driven chaining (OPS5/Rete) vs Backward goal-driven chaining (Prolog)."
  },
  {
    number: 6,
    title: "Least Commitment",
    description: "Do not commit to decisions (such as goal orders or variable bindings) until forced to. Partial Order Planning (POP) and MRV embody this."
  },
  {
    number: 7,
    title: "Eager Constraint Propagation",
    description: "Every decision has consequences. Propagating them immediately prevents wasted exploratory work (Rete join networks, AC-3, Waltz algorithm)."
  },
  {
    number: 8,
    title: "Partial Solution Refinement",
    description: "Instead of stepping state-to-state, maintain an abstract partial solution and refine its constraints (POP plan space, AO* subtrees, SSS* strategy clusters)."
  },
  {
    number: 9,
    title: "Symmetry Breaking & Duplicate Suppression",
    description: "Avoid redundant work through CLOSED lists, RemoveSeen, refractoriness, and transposition tables."
  },
  {
    number: 10,
    title: "Intelligent Caching & State Persistence",
    description: "Memoise partial computations to avoid re-evaluating unchanged subproblems (Rete beta memories, Pattern databases, transposition caches)."
  }
];
