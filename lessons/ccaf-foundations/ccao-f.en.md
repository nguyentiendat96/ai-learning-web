# Claude Certified Associate: Foundations (CCAO-F)

A 12-lesson curriculum built from the "CCAO-F: Full Course, All 12 Lessons" course (116 minutes), October 2026. Source: [CCAO-F course video](https://www.youtube.com/watch?v=O94JiAuQ9zY).

Each lesson has six parts: objectives, theory, example, hands-on, exercises, pitfalls. The exam material lives separately under [Exam](exam.html).

## The four moves

| Move | Meaning | When to use it |
|---|---|---|
| **Verify** | Check the claim against its source before acting | Numbers, citations, factual claims |
| **Match** | Fit the tool to the job | Before choosing a feature, model, or prompt shape |
| **Gate** | Protect data and policy first, then proceed | Personal data, contract-bound documents, policy |
| **Escalate** | Recognise the call is not yours | High-risk domains, silent policy |

## The exam

| Item | Value |
|---|---|
| Questions | 60 |
| Time | 120 minutes, about 2 minutes each |
| Format | multiple choice and multiple response |
| Pass | 720 on a 100 to 1,000 scale |
| Domain weights | D1 14%, D2 21%, D3 12%, D4 16%, D5 12%, D6 15%, D7 10% |

Multiple-response items always state how many answers to select. That number is information: two answers means the item wants two moves, not one perfect option.

Registration currently runs through Anthropic's partner network. Check the current registration page before booking.

---

## 01 · The Answer Pattern and the Blueprint

**Objectives**

- Recognise the four moves inside any question.
- Read the exam structure and budget study time by weight.
- Understand why the right answer is usually the small step, not the sweeping redesign.

### Theory

Every item has the same shape: a tempting shortcut, a fake safeguard, an overreaction, and one professional move.

| Part | Shape | Example |
|---|---|---|
| Shortcut | Fast because it sounds reasonable | Send it because Claude sounded sure |
| Fake safeguard | Looks like control, is not | Ask the model to rate its own confidence |
| Overreaction | Refuses work when a safe path exists | Drop the analysis entirely |
| Move | Small, correct step | Open the source and check the citation |

The four moves cover the seven domains:

| Domain | Dominant move |
|---|---|
| Prompting and task execution | Match |
| Output evaluation and validation | Verify |
| Product and model selection | Match |
| Workflow integration | Match, verify |
| Configuration and knowledge | Match |
| Governance and responsible use | Gate, escalate |
| Troubleshooting | Verify, match |

Weights are a study budget, not a study order. Output evaluation is the heaviest at about a fifth of the score, so it gets the most hours.

### Example

Anthropic's published sample: Maya summarises a new regulation, the summary cites "subsection 4B2", and her manager asks whether to send it.

| Option | Move | Why it fails |
|---|---|---|
| Send it, Claude sounded sure | none | Confidence is not evidence |
| Ask Claude to rate its confidence | none | Models are confident while wrong |
| Make it sound more formal | none | Formatting does not fix facts |
| Open the regulation and check 4B2 | Verify | Correct |

Second item, same shape: Dan hands over a spreadsheet full of names and account numbers, and policy forbids sharing regulated personal data.

| Option | Why it fails |
|---|---|
| Upload it, "it is internal only" | Internal is not a policy exemption |
| Upload it and tell Claude not to retain | An instruction to the model is not a control |
| Skip the analysis | Refusing work when a safe path exists is also a failure |
| Strip identifiers, then analyse | Correct: gate |

### Hands-on

1. Pick one piece of work where you use Claude.
2. Write down which move it needs: verify, match, gate or escalate.
3. Find one place where you took a shortcut instead.
4. Rewrite that step as the correct move.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Assign one of the four moves to five situations | 15 min | Each situation has exactly one main move |
| 2 | Rewrite the two sample items from memory | 10 min | You can explain why each distractor fails |
| 3 | Build a 40-hour study budget by weight | 15 min | The heaviest domain gets the most hours |

### Pitfall

Reading the options first and picking the most comprehensive one. The correct answer is usually a small step in the right place.

---

## 02 · Prompting and Task Execution (D1, 14%)

**Objectives**

- Write a four-part brief instead of a wall of commands.
- Split a large deliverable into reviewable stages.
- Choose the prompt shape by task type.

### Theory

Maya spends 40 minutes on a 15-line prompt and gets a flatter report than any short prompt that week. The problem is not length. It is length in the wrong places and silence in the right ones.

A brief a new contractor could act on has four parts:

| Part | Question | Example |
|---|---|---|
| Context | What is the situation, which data | Q3 campaign, figures in the attached file |
| Ask | What exactly to do | Build a six-section report, one chart each |
| Audience | Who reads it, what they do next | Director deciding the Q4 budget |
| Success | What good looks like | Every number sourced, under two pages |

A positive instruction beats a wall of prohibitions. One sample teaches more than ten sentences describing a voice.

Decomposition: a quarterly report is not one task, it is a chain: pull figures, find what changed, write, format. An error at step one gets baked into the finished draft.

| Concept | Meaning | Example |
|---|---|---|
| Grouping | Several small related questions in one message | Ask for three metrics together |
| Decomposition | One large task split into reviewable stages | Pull, review, write, review, format |

Feedback belongs in the same conversation, naming what to keep and what to change. Opening a new chat with a bigger prompt throws away all the context already built.

Four task types, four prompt shapes:

| Type | Emphasis |
|---|---|
| Analysis | Maximum specificity: which metrics, which window, which calculation, which format |
| Research | Match scope to the lookup tool |
| Drafting | Voice sample and audience |
| Brainstorming | State the goal and boundaries, ask for many varied options |

### Example

Five vendor proposals, a scored comparison and a recommendation.

| Option | Outcome |
|---|---|
| "Compare and pick one for me" | No criteria, nothing to check against |
| One long prompt with every criterion and format | A finished deliverable in one shot, unverifiable |
| Five separate chats, merge by hand | No chat ever sees two proposals side by side |
| Ask for the comparison criteria and data first, review, then score one criterion at a time | Correct |

Maya also has a cheaper safeguard than decomposition: ask for the data needed and the assumptions to be used, then review before any work. The plan usually exposes one wrong assumption.

### Hands-on

1. Pick a task you repeat weekly.
2. Write the four-part brief.
3. Add: "list the data you need and the assumptions you will make, for me to review first".
4. Run it, read the plan, fix the wrong assumption.
5. Continue, then give targeted feedback: keep this, change that.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Rewrite a long prompt into four parts | 15 min | No "do not" line remains |
| 2 | Split one deliverable into four reviewable stages | 15 min | An error at stage one is caught before stage four |
| 3 | Run the plan-first step on real work | 10 min | The plan exposes at least one wrong assumption |
| 4 | Write prompts for four different task types | 20 min | Each type has a different emphasis |

### Pitfall

Assuming a long prompt is skilled. The issue is length in the wrong places, and missing the four parts.

---

## 03 · Catching Confident Lies (D2, 21%)

**Objectives**

- Explain why a model produces citations that do not exist.
- Apply three habits that cut fabrication.
- Catch missing content, not just wrong content.

### Theory

Maya puts a statistic on a slide: "73% of buyers shortlist a vendor before talking to sales, according to The Everling Group's annual survey". The company does not exist.

A model does not look facts up in a database; it predicts the next piece of text. The phrase "according to a report by" is usually followed by a firm name, a survey title and a tidy number. It completes the shape of a citation, it does not retrieve one.

Three failure types:

| Type | Sign | Check |
|---|---|---|
| Stale training data | Prices, leaders, rules stated as current | Check the current source |
| Fabricated citation | Report, organisation, figure all look real | Open the source |
| Plausible-sounding error | No source to open | Check against the source data |

Three habits that cut fabrication sharply:

1. Allow "I do not have enough information". Anthropic's documentation says permission to admit uncertainty drastically reduces false information.
2. Require a verbatim supporting quote for every claim.
3. Open the source yourself for anything important.

**Completeness** is harder: every sentence is true but something that changes the conclusion is missing. A six-market study summarised into five insights can drop two markets without a single wrong sentence.

A tell: ask the same factual question twice and get two different answers. Disagreement between runs means neither is verified.

### The HHH axes and measurable criteria

| Axis | Question | Note |
|---|---|---|
| Helpful | Does it help with the job | |
| Honest | Is it truthful | The most skipped axis; "able to say I do not know" lives here |
| Harmless | Does it cause harm | |

| Dimension | Example measurement |
|---|---|
| Faithfulness | Citation precision |
| Consistency | Agreement across runs |
| Relevance | Off-topic content present |
| Tone | Rubric score |
| Privacy | PII detection rate |
| Safety | Toxicity flags per 10,000 runs |

Scoring method order: code is fastest and most reliable, use it wherever the answer is decidable in code; humans are most flexible but slow; LLM judges are fast but need a good rubric. Many coarse automated scores usually beat a few careful human ones.

### Example

A market-share analysis with citations, destined for a public webinar.

| Option | Why |
|---|---|
| Ship it, it has citations | An unopened citation is unverified |
| Ask Claude to double-check | Same machine, same failure modes |
| Spot-check the surprising number | Dangerous fabrications usually look ordinary |
| Open every cited report and check every figure | Correct |

Completeness check: the original brief listed six markets, the summary has five insights. Count and compare, do not read for gaps.

### Hands-on

1. Take an output with figures.
2. Mark every checkable claim.
3. Require a verbatim quote for each claim; withdraw claims with none.
4. Open the source for the two most important claims.
5. Compare the summary against the original requirement list.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Demand quotes for 10 claims, withdraw the unsupported | 15 min | At least one claim withdrawn |
| 2 | Check completeness against the brief | 10 min | One missing item found |
| 3 | Ask the same question twice and compare | 5 min | The divergence is written down |

### Pitfall

Asking "are you sure". The answer is generated by the same mechanism that produced the claim.

---

## 04 · The Validation Playbook (D2, 21%)

**Objectives**

- Run a one-page validation routine every time.
- Recognise when the answer is not yours to give.
- Hand off to a qualified reviewer correctly.

### Theory

Priya asks: "Who verified this before it goes out?" Reading it twice is not an answer.

The one-page routine:

| Step | Action | Blocks |
|---|---|---|
| 1 | Attach the source documents, require only those | The model drawing on general knowledge |
| 2 | Add "if there is not enough information, say so" | Fabrication filling gaps |
| 3 | Every claim carries a verbatim quote; no quote, no claim | Unsourced claims |
| 4 | Open the source yourself, read each figure in place | Fabricated citations |
| 5 | Re-ask one important question in a fresh chat and compare | Silent divergence |

Order matters: inside the model reduces errors, outside the model is the real gate.

When to escalate:

| Signal | Action |
|---|---|
| High-risk domain | Qualified human reviews before the recipient sees it |
| Policy is silent or needs an exception | Route to the policy owner |
| Answer will be published | Check every claim, not a sample |

High-risk domains named in policy: legal, medical, insurance, lending and investment, hiring, housing, admissions, published journalism. In these, a qualified professional must review before delivery, and the recipient must be told AI was involved. Claude reviewing its own draft is not a review.

### Example

A 100-page contract, assess penalty and termination clauses.

| Option | Why it fails |
|---|---|
| "Be extremely careful, this document matters" | Tone does not ground a claim in the text |
| Split into 20 short chunks | The risk is fabricated clause content, not long answers |
| Ask Claude for its confidence per finding | Same generating mechanism |
| Extract verbatim clauses first, analyse only from those quotes | Correct |

The tax treatment of a customer invoice passes every step above but is still not Maya's call. It goes to a qualified reviewer before publication, and the customer is told.

### Hands-on

1. Pick a real document with figures.
2. Run all five steps.
3. Record every withdrawn claim and why.
4. For each answer, ask whether it sits in a high-risk domain.
5. If it does, name the reviewer in the process before sending.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Run the five steps on a real document | 25 min | At least one claim withdrawn |
| 2 | Classify five answers: routine or high-risk | 10 min | Each names its reviewer |
| 3 | Write two versions for two readers | 15 min | Each states the reader and their next action |
| 4 | Write a five-step checklist for the team | 15 min | Someone else can follow it unaided |

### Pitfall

Treating "I read it again" as verification. Verification means opening the source.

---

## 05 · Product and Model Selection (D3, 12%)

**Objectives**

- Choose a feature by the weakness it fixes.
- Choose a model tier using three axes.
- Handle a long conversation correctly.

### Theory

| Feature | Weakness it fixes | Use when |
|---|---|---|
| Plain chat | Default | One-off work, nothing to remember |
| Project | Context resets | Recurring work with background documents |
| Research | Many sources needed | Investigation with citations |
| Artifact | Output needs a life of its own | A deliverable you will edit, share, version |

No feature is a "smarter mode". Each fixes a specific weakness.

Lookup family:

| Tool | Use for |
|---|---|
| Search | Finding one fact |
| Thinking | Reasoning over data you already hold |
| Research | Gathering many sources and citing them |

Three tiers:

| Tier | Use for |
|---|---|
| Fast, cheap | Well-scoped, high-volume work |
| Middle | The sensible default |
| Most capable | When a wrong answer costs more than the compute |

Three axes: how good it must be, whether a human is waiting, and how often it runs. Volume is the axis people forget: one call on the expensive model is rounding error, the same choice a thousand times a day is a budget line.

Long conversations:

| Move | When |
|---|---|
| Restart | The chat has drifted across topics |
| Summarise | You need the thread but less detail |
| Persist | The underlying facts do not change and must survive |

### Six features, chosen by the purpose verb

| Feature | What it does | Use when |
|---|---|---|
| Projects | A workspace with instructions and knowledge | Recurring work on the same premises |
| Artifacts | Editable, reusable deliverables in their own panel | Documents, code, charts used later |
| Agent Skills | Packaged expertise, loaded on demand | A procedure you repeat often |
| Code Execution | Python and bash in a sandbox | Computation, data analysis |
| Research mode | Searches and synthesises many sources | Open-ended information gathering |
| Memory | Holds facts across sessions | Preferences, premises, settled decisions |

How to choose: state the purpose as one verb. Gather is Research, compute is Code Execution, repeat is Projects, reuse is Artifacts, procedure is Skills, remember is Memory. If no verb fits, an inline reply is enough.

Four model tiers, bottom up: Haiku, Sonnet, Opus, Fable. Higher means slower and more expensive; that is a design trade, not a defect. Before switching tiers, try tuning effort, because effort tuning usually beats switching models.

### Example

100 short customer replies a day, speed and cost matter.

| Option | Why it fails |
|---|---|
| The most capable model for every reply | Capability the task never uses is pure spend |
| Disable features to cut cost | Still the wrong tier |
| Switch platforms | The mismatch travels with you |
| A fast, cheap tier for simple high-volume work | Correct |

Maya has two jobs that morning: 100 short replies and one deep analysis. Running both on the same tier is a matching error, not a model problem.

### Hands-on

1. List five things you do with Claude in a week.
2. For each, pick a feature and name the weakness it fixes.
3. For each, pick a tier and name the deciding axis.
4. Re-run one expensive job on a cheaper tier and compare.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Choose a feature for six real tasks | 10 min | Each choice names the weakness fixed |
| 2 | Choose a tier for each step of one workflow | 15 min | At least two tiers appear |
| 3 | For one long chat, choose restart, summarise or persist | 10 min | The reason cites how long the facts last |

### Pitfall

Choosing the most capable model "to be safe". The exam rewards stepping down when the task is clear.

---

## 06 · Workflow Integration (D4, 16%)

**Objectives**

- Map the real week before automating anything.
- Pick the step with leverage, not the one that demos well.
- Design a pilot with criteria written first.

### Theory

Dan wants Maya's prompt forwarded to the whole team by Friday. That is how most Claude rollouts die: a tool is not a workflow.

| Step | Action | Common mistake |
|---|---|---|
| 1 | Map the real week: documents, threads, calendar | Asking people where their week goes instead of reading the material |
| 2 | Split into steps, mark rule-based versus judgment | Skipping the judgment steps |
| 3 | Find where the hours leak | Picking the demo-friendly step |
| 4 | Analyse before automating | Building a skill before the process is settled |
| 5 | Pilot one person, one step, one week | Rolling out to everyone |
| 6 | Write the pass criteria first | Writing them afterwards, when they bend to fit |
| 7 | Measure, then widen | Widening because it felt good |

Maya assumes the time sink is social copy. Mapping the week shows it is assembling the Friday review.

### Choosing a use case and presenting value

| Task | Method |
|---|---|
| Find a use case | Review departmental processes, pick recurring and measurable work |
| Prioritise | Score by impact and feasibility, not by appeal |
| Start | The simplest approach with confirmed effect, then add |
| Compose | Connect Claude to existing tools rather than replacing the workflow |

Presenting to a decision maker: give quantified outcomes, frame it as augmentation rather than replacement, and state cost and limits. Routing example: easy work to a cheap model, hard work to a stronger one.

### Example

Requirements for automating invoice processing; the process doc and three months of exception logs already exist.

| Option | Why |
|---|---|
| Ask Claude to write the requirements | No internal evidence, generic output |
| Run research on how other companies do it | The real constraints are in your own documents |
| Build a skill encoding the workflow first | Freezing a process that is not settled |
| Upload the documents and logs, split steps, classify, find gaps, then draft | Correct |

Pass criteria written in advance: every figure in the draft carries a source citation; the human review pass stays under one hour.

### Hands-on

1. For one week, log every recurring task and its real duration.
2. Pick the largest time sink.
3. Split it into sub-steps and mark which need judgment.
4. Write two measurable pass criteria for a small change.
5. Run it for a week, measure, then decide.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Map your week step by step | 20 min | The largest time sink is named |
| 2 | Write two pass criteria before trying a change | 10 min | Both are measurable |
| 3 | Design a one-person, one-week pilot | 15 min | A measurement date and a decision owner are named |
| 4 | Draw before and after for one step | 15 min | Who does what on each side is explicit |

### Pitfall

Automating the demo-friendly step. Leverage sits in the step that costs time.

---

## 07 · Configuration and Knowledge (D5, 12%)

**Objectives**

- Separate instructions from knowledge.
- Put each rule at the right scope: personal, project, organisation.
- Keep knowledge from going stale.

### Theory

Maya pastes the same brand-voice paragraph into a new chat for the fifth time that week. The fix is not a better prompt; it is the right home for the context.

| Place | Answers | Holds |
|---|---|---|
| Instructions | How should Claude behave | Tone, standing rules, prohibitions |
| Knowledge | What is true here | Documents, price sheets, samples |

A project's name and description are for humans. Claude does not read them.

Instructions have three scopes:

| Scope | Reach | Holds |
|---|---|---|
| Personal | Every chat you open | Personal preferences |
| Project | Inside the project | Team agreements |
| Organisation | Everyone | Company policy |

Durable rules belong in instructions; a one-off ask belongs in the prompt. When personal and organisation conflict, the organisation wins.

Curating knowledge:

| Practice | Why |
|---|---|
| File names state content and date | Avoids citing last quarter with confidence |
| Related documents grouped | Retrieval finds the right cluster |
| Name the file when you need it | Points at the right source |
| Remove superseded documents | Old files get used while they exist |

Connectors inherit your permissions: Claude sees what you can see. Actions wait for a human; drafts do not send themselves.

### Two kinds of knowledge and connector scope

| Kind | Nature | Example |
|---|---|---|
| Uploaded file | Static, fixed at upload | PDF, spreadsheet, code |
| Sync source via connector | Live, always current | Google Drive, Gmail, Slack |

Connectors inherit the user's permissions: a file you cannot open in Drive is not readable by Claude either.

| Task | Correct |
|---|---|
| Scope | Narrow to the folders or labels actually needed |
| Connect the whole drive and tell it to ignore the rest | Unreliable: noise enters the search target and accuracy drops |
| Unused connectors | Disconnect them early |
| Contradictory documents in one project | The model cannot decide what to ground in; output wobbles |

On paid plans, RAG enables automatically as knowledge nears the context limit, expanding capacity roughly tenfold. On Team and Enterprise, an owner must enable connectors at the organisation level, and sync connectors work only in private projects, not shared ones.

### Example

Legal wants every contract review chat to use the firm checklist and a formal tone, without affecting other work.

| Option | Why it fails |
|---|---|
| Paste the checklist at the start of each chat | Exactly what Maya does every morning |
| Put it in personal instructions | Wrong scope: every chat that person opens is affected |
| Rename the project | Claude does not read names |
| Project instructions for tone, checklist in knowledge | Correct |

A project named "Always formal" with no instruction inside answers normally.

### Hands-on

1. Open a project you use.
2. List everything in its instructions; mark items that are facts, not behaviour.
3. Move the facts into knowledge.
4. Rename knowledge files by content and date.
5. Delete or replace superseded documents.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Sort 10 items into instructions or knowledge | 15 min | No item is both |
| 2 | Rename and group 10 documents | 10 min | Names state content and date |
| 3 | Assign a scope to three rules | 10 min | Durable rules sit at the wider scope |
| 4 | Write a monthly knowledge review step | 15 min | It names an owner |

### Pitfall

Putting rules into a knowledge document. A rule book inside knowledge is not a standing instruction.

---

## 08 · Governance and Responsible Use (D6, 15%)

**Objectives**

- Place a proposal on the three policy tiers.
- Recognise data that must be handled before prompting.
- Know when to stop and ask the policy owner.

### Theory

Dan: "Write personalised financial advice emails to customers, and keep it quiet so legal does not slow us down." The sentence carries two traps at once.

Three policy tiers:

| Tier | Contents |
|---|---|
| Universal | No deception, no misleading health/legal/financial content, no fake media, no misuse of personal data |
| High-risk | A qualified professional reviews before delivery; the recipient is told AI was involved |
| Additional | Guidance for consumer-facing chatbots |

Four placement questions:

1. Is this deceptive?
2. Does it advise or decide something consequential for a real person?
3. What class of data goes in?
4. What does company policy say, and who owns it?

Data classes needing handling: government identifiers, account numbers, health records, payment cards, passwords, documents under NDA.

| Handling | Use for |
|---|---|
| Remove or anonymise identifiers | Customer data |
| Generalise | Date of birth to age band |
| Aggregate | Revenue by region |
| Refuse | Clearly prohibited work |

### Three valid escalation triggers, and two invalid ones

| Valid trigger | Action |
|---|---|
| The customer explicitly asks for a human | Escalate immediately, do not attempt resolution first |
| Outside policy or needing an exception | Escalate |
| No meaningful progress after legitimate attempts | Escalate |

| Invalid trigger | Why |
|---|---|
| The customer is upset | Emotion does not measure complexity |
| Low self-reported confidence | Models are confidently wrong on hard cases |

Nuance: an upset customer with a simple issue gets acknowledgement and a proposed resolution, not an escalation. A customer who repeats the request for a human after being offered help is escalated.

Ambiguous name match: always ask for one more identifier (email, phone, order id). Never pick the newest, most active or nearest account.

### Example

| Situation | Conclusion |
|---|---|
| Personalised financial advice emails | Claude drafts, a licensed reviewer signs off, customer is told AI helped |
| Five invented testimonials for a landing page | No; use real survey quotes, each verified |
| "Internal only" analysis of named customer data | Still gate it |
| Incognito mode to "be compliant" | Incognito does not change the data agreement |

### Hands-on

1. Take a Claude proposal under discussion.
2. Answer the four placement questions.
3. Identify the data class and the handling.
4. Write the reply to the proposer: yes, under what conditions, who signs off.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Place five proposals on the three tiers | 15 min | Each names a reviewer |
| 2 | Classify six data types and their handling | 10 min | None is "just use it" |
| 3 | Reply to a "keep it quiet" request | 10 min | Names the policy owner, decides nothing |
| 4 | Write a gate checklist for the team | 15 min | It has an explicit stop step |

### Pitfall

Treating a disclaimer at the end as the safeguard. Review happens before the decision reaches the recipient.

---

## 09 · Troubleshooting and Optimization (D7, 10%)

**Objectives**

- Drop three wrong reflexes: regenerate, switch models, shout louder.
- Run the four-step ladder.
- Read symptoms to find the real cause.

### Theory

Thursday, same prompt, same chat, the output turns flat.

| Reflex | Why it fails |
|---|---|
| Regenerate | Adds no information, rerolls the dice |
| Switch model | A model cannot supply context it never received |
| Add all-caps instructions | Adds complexity; the right direction is simplification |

The four-step ladder:

1. Restate the ask simply and clearly.
2. Add context as if briefing someone with no background.
3. Break a complex task into steps.
4. Give specific feedback: keep this, change that.

Symptom table:

| Symptom | Cause | Fix |
|---|---|---|
| Generic output | Missing specificity | Add detail and one good example |
| Off topic | Goal unclear | Restate the goal |
| Wrong format | No format was ever shown | Show a sample |
| Complex answer that wobbles | Task needs splitting | Split it |

A fabrication tell: running the same question twice yields two conclusions. Asking for the reasoning can expose a stale assumption, for example a constraint from Tuesday still being honoured.

### Example

A flat brief where the four-step ladder passes: the ask is clear, the context was loaded.

| Check | Finding |
|---|---|
| Re-run and compare | Two different answers: fabrication tell |
| Ask for step-by-step reasoning | The model still honours a stale constraint |
| Conclusion | Old context never cleared, not a weak model |

### Hands-on

1. Take a recent poor output.
2. Grade it against the symptom table.
3. Run the ladder, one step at a time.
4. Record which step changed the result.
5. If still poor, re-run twice to check for fabrication.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Run the ladder on one poor output | 20 min | The responsible step is identified |
| 2 | Classify five symptoms | 10 min | Each maps to one fix |
| 3 | Ask for the reasoning to expose a wrong assumption | 10 min | The assumption is named |

### Pitfall

Hitting regenerate. The exam treats that as rerolling the dice and calling it debugging.

---

## 10 · Capstone: One Workday

**Objectives**

- Run all seven domains in one real working day.
- See that the domains are not separate.
- Turn the four moves into habits.

### Theory

| Time | Work | Domain |
|---|---|---|
| Morning | Launch brief: four parts, a sample, plan reviewed first | D1 |
| Mid-morning | A footnote on the press release: open the source, find last quarter's figure | D2 |
| Noon | 100 short replies on the fast tier; one deep analysis on the capable tier | D3 |
| Early afternoon | The update passes through a named human review box | D4 |
| Afternoon | Nobody pastes the brand voice; chats open inside a prepared project | D5 |
| Mid-afternoon | Dan hands over a named customer list, "internal only" | D6 |
| End of day | One flat output: run the ladder instead of regenerating | D7 |

The point: one day, one person, four moves. The exam mixes domains inside one scenario, so people who study each domain separately miss the join.

### Example

Which domain owns the named review box? The answer is workflow integration, because review is a step in the process, verification made institutional. If the reviewer must be qualified, it is also governance. The right question is which aspect the scenario is asking about.

### Hands-on

1. Pick a real working day.
2. Log every Claude use and the move taken.
3. At the end, count which domains appeared.
4. Rewrite one of your processes as a four-step checklist.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Run a real day and log the domains | 1 day | At least five domains appear |
| 2 | Log the move for every Claude use | 1 day | No use is left unclassified |
| 3 | Rewrite one process as a four-step checklist | 30 min | Someone else can follow it |
| 4 | Re-run that process a week later | 1 week | Before and after are comparable |

### Pitfall

Studying the seven domains as seven separate subjects. The exam mixes them in one scenario.
