BrokeTonight — Web-First Research, Autonomous Planning, Parallel Implementation & Self-Review
Role and mission
Act as a founding engineer, product designer, researcher, and autonomous coding agent. Build BrokeTonight, a polished AI-powered local activity discovery application, by researching existing solutions, reusing proven code, and coordinating parallel subagents.
Your mission is to research the web, validate repositories and integrations, select an architecture, create an implementation plan, critically review that plan, and then implement, test, and refine the working application.
Optimize for maximum reuse, minimum unnecessary code, excellent UX, and a demonstrable result within four hours.
1. Product vision
BrokeTonight — “Bored? Broke? Let’s go.”
BrokeTonight helps college students discover fun, affordable activities around the University of California, San Diego (UCSD).
Users choose a location, budget ($0, $10, or $20 per person), vibe (Chill, Adventurous, Chaotic, or Romantic), and group size. They receive three locally relevant recommendations with attractive imagery, estimated costs, locations, maps, source links, and shareable plans.
The defining feature is Grok Bot as a local activity scout that researches real venues, campus activities, events, prices, operating hours, age restrictions, and logistics.
The experience should feel like an exciting Gen Z consumer product rather than a chatbot or administrative dashboard.
Priorities:
P0: Distinctive UI, functional filters, three relevant recommendations, attractive cards, transparent costs, reliable sources, shareable plans, and demonstrable Grok Bot contribution.
P1: Interactive maps, multi-stop itineraries, group voting, and polished animation.
P2: Accounts, authentication, payments, booking systems, and complex social features.
Build a complete P0 experience before expanding scope.
2. Web-first research
Start with current web research before choosing the architecture or writing application code.
Prioritize official documentation, GitHub source code, installation guides, API references, licenses, releases, recent issues, and deployment instructions. Cite direct sources for important findings and distinguish documented capabilities from source-verified and experimentally tested behavior.
Research these repositories:
TREK: https://github.com/liketrek/TREK
OpenMuse: https://github.com/CopilotKit/openmuse
Rallly: https://github.com/lukevella/rallly
Ignite: https://github.com/infinitered/ignite
OpenUI: https://github.com/thesysdev/openui
Also investigate current official documentation for Grok Bot, xAI APIs, MCP integrations, and the frontend libraries specified below.
Timebox initial research to approximately 25 minutes. Focus on evidence that materially affects implementation speed, functionality, and integration feasibility.
3. Investigate TREK first
TREK is the initial hypothesis for reusable itinerary, map, budget, sharing, and MCP functionality.
Investigate these candidate source paths and verify their current locations:
client/src/mobile/screens/trip/MTripShell.tsx
client/src/mobile/screens/trip/map/MMapArea.tsx
client/src/components/Map/usePoiExplore.ts
client/src/pages/SharedTripPage.tsx
client/src/mobile/screens/trip/tabs/MCollabPolls.tsx
wiki/MCP-Tools-and-Resources.md
Verify whether TREK supports local startup, itinerary creation, multiple destinations, maps, budgets, public sharing, and external MCP connectivity.
Investigate the implementation and actual schemas of tools resembling create_trip, create_and_assign_place, update_assignment_time, create_budget_item, and create_share_link.
Determine authentication requirements, dependencies, environment variables, required credentials, persistence behavior, and public-link accessibility. Verify its current license and reuse implications.
Run a minimal smoke test when terminal access is available. Estimate the time needed to reach one useful working flow and use the evidence to decide whether TREK or a standalone React app offers the fastest path.
4. Validate Grok Bot integration
Research official documentation to establish the actual capabilities of Grok Bot, the xAI model API, and related agent products.
Verify supported MCP connections, web research, programmatic task invocation, structured output, scheduled execution, publishing workflows, authentication, and costs.
The preferred workflow is:
Research affordable activities around UCSD.
Verify venues, prices, hours, restrictions, and logistics.
Generate structured recommendations or an itinerary.
Use TREK’s existing MCP tools when supported.
Produce a public share URL.
Display the results in BrokeTonight.
Use a working, documented integration that provides genuine and traceable research. If on-demand agent invocation is unavailable, choose the smallest practical alternative, such as publishing curated research into structured JSON or a minimal backend, and describe its behavior accurately.
5. Select the architecture
Evaluate three approaches:
A. TREK plus a custom React frontend: Reuse its verified backend, itinerary, map, budget, sharing, and MCP capabilities.
B. Fork and rebrand TREK: Adapt its existing application and workflows to the BrokeTonight experience.
C. Standalone React application: Build a lightweight discovery interface using a simple data source, shareable plans, and a verified Grok Bot integration.
Compare implementation time, reusable functionality, dependencies, setup effort, licensing, integration feasibility, and likelihood of delivering a working demo.
Choose exactly one architecture based on evidence.
6. Frontend stack and design
For a standalone frontend, prefer:
React + TypeScript
Vite
Tailwind CSS
shadcn/ui
Lucide React
React Bits
Documentation:
https://vite.dev/guide/
https://ui.shadcn.com/docs/installation/vite
https://lucide.dev/guide/packages/lucide-react
https://reactbits.dev/
Verify current installation instructions, scaffold the project using the supported tools, and install only the components needed for the MVP.
Design a visually distinctive college-oriented consumer product with bold typography, energetic colors, high-quality activity imagery, rounded cards, clear price indicators, intuitive filters, purposeful transitions, and excellent responsive behavior across desktop and mobile.
Build reusable components for discovery filters, budget and vibe selection, activity cards, source attribution, loading states, and sharing. Use Lucide consistently and incorporate one or two lightweight React Bits effects for visual polish.
Create a typed activity data model containing descriptions, locations, prices, vibe categories, images, source URLs, verification timestamps, and optional itinerary links.
Prioritize a functional discovery experience and real data before decorative effects.
When adapting an existing repository, retain useful working components and use the preferred stack where it improves delivery speed.
7. Autonomous execution workflow
Operate as an autonomous engineering lead. Move through research, planning, implementation, testing, and refinement without waiting for approval at each stage. Use available filesystem, terminal, browser, and coding tools to produce actual working deliverables.
Phase 1 — Research and feasibility
Investigate current web sources, inspect critical repository files, verify licenses, and run minimal smoke tests. Record evidence and identify the highest-risk assumptions.
Phase 2 — Create the implementation plan
Create docs/BROKETONIGHT_RESEARCH.md and docs/BROKETONIGHT_BUILD_PLAN.md.
The research document must contain repository findings, verified source links, licensing, dependencies, TREK feasibility, Grok Bot capabilities, a reuse matrix, and architecture selection.
The build plan must contain the chosen architecture, technology stack, directory structure, exact setup commands, implementation tasks, configuration, test strategy, deployment, time budget, and definition of done.
Phase 3 — Self-review the plan
Before implementing, review the plan as a skeptical senior engineer.
Check:
Whether the architecture is supported by evidence.
Whether each dependency and repository genuinely reduces implementation time.
Whether all commands, paths, APIs, and integrations are grounded in documentation or source code.
Whether the Grok Bot contribution is achievable and accurately represented.
Whether the scope fits within four hours.
Whether public sharing and activity sourcing work end to end.
Whether the proposed design is distinctive and coherent.
Whether there are simpler alternatives for high-risk tasks.
Update both documents to address the findings. Include a concise self-review summary and the final decisions in the research document.
Phase 4 — Delegate implementation to parallel subagents
After the plan passes review, delegate independent tasks to available coding subagents. Give each subagent a clear objective, relevant files, constraints, expected outputs, and validation criteria.
Use this suggested division, adapting it to the selected architecture:
Subagent A — Frontend and visual design: Scaffold or adapt the React application, configure shadcn/ui, Lucide React, Tailwind, and selected React Bits effects, and implement the discovery interface.
Subagent B — Data and research integration: Implement the verified Grok Bot/xAI workflow or the selected structured-data publishing approach, including source attribution and data validation.
Subagent C — Existing infrastructure and sharing: Validate and integrate reusable TREK functionality, MCP tools, maps, itineraries, and public sharing when required by the chosen architecture.
Lead agent — Coordination and quality: Own the architecture, define shared interfaces and data contracts, integrate changes, resolve conflicts, run tests, review the finished experience, and maintain the overall time budget.
Run tasks concurrently when their dependencies permit. Establish shared interfaces and file ownership before delegation. If only one agent is available, execute the same workstreams sequentially while preserving their boundaries.
Prefer parallel work that reduces elapsed time rather than creating extra integration overhead.
Phase 5 — Integrate and test
Review all subagent outputs. Resolve interface mismatches, merge compatible changes, run the application, and test the complete user journey.
Verify the application using real source data and the selected integration. Test filters, recommendation rendering, source links, cost presentation, and public sharing.
Phase 6 — Final self-review and refinement
Evaluate the actual running application against the product requirements and original plan.
Inspect visual hierarchy, responsiveness, usability, errors, data accuracy, integration behavior, loading states, and sharing.
Fix the highest-impact defects first. Update the planning documents to reflect the implemented result and any remaining limitations. Report completed tests truthfully.
8. Reuse matrix
Create a matrix for navigation, activity cards, maps, venue details, itineraries, budgets, public sharing, group voting, Grok Bot integration, and source attribution.
For each feature, record the existing implementation, verified file or URL, evidence status, reuse strategy, estimated time, and decision.
Classify each feature as reusable as-is, minor adaptation under 30 minutes, deferred, or unnecessary.
Prefer complete working flows and existing APIs over isolated component copying.
9. Four-hour time budget
The entire workflow, including research, planning, self-review, implementation, integration, testing, and deployment, must fit within 240 minutes.
Use this initial allocation:
Web research and feasibility: 25 minutes.
Planning and self-review: 20 minutes.
Setup and scaffolding: 20 minutes.
Parallel implementation: 100 minutes.
Integration and testing: 40 minutes.
Final refinement and demo preparation: 35 minutes.
Adjust allocations as evidence emerges while maintaining the four-hour limit. Keep the working application as the primary deliverable.
10. Acceptance criteria
The demo should show a student at UCSD opening BrokeTonight and selecting:
Location: UCSD, La Jolla, California.
Budget: $10 per person.
Vibe: Adventurous.
Group: Three friends.
The application displays three appealing, locally relevant activities with real destinations, verified or clearly estimated costs, photos, source links, and locations or maps. Users can select and share a plan through a working public URL.
Demonstrate genuine, traceable Grok Bot research or generation through the verified integration. Clearly label estimates and identify when information was checked.
The interface must be polished, responsive, functional, and visually cohesive. All major controls must work, and the main experience must run successfully in the available environment.
11. Final delivery
Produce:
docs/BROKETONIGHT_RESEARCH.md
docs/BROKETONIGHT_BUILD_PLAN.md
The implemented application and its required configuration files.
A concise test summary.
A final architecture and implementation summary.
A list of completed features and any remaining limitations.
The exact command to run the application.
The deployed URL, if deployment succeeds.
Start immediately with web-first research. Complete the research and reviewed plan, then proceed directly into parallel implementation, integration, testing, and refinement.
Success criterion: Deliver the strongest practical, evidence-backed, working BrokeTonight experience possible within four hours, using proven open-source functionality, a polished React UI, real local activity research, and efficient parallel execution.