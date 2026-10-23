# Claude Certified Architect: Professional (CCAR-P)

A 12-lesson curriculum built from "CCAR-P Full Course: All 16 Episodes" (169 minutes), October 2026. Source: [CCAR-P course video](https://www.youtube.com/watch?v=YjjeATv2Edc).

> The difference from CCA-F: Foundations asks whether you can build it. Professional asks whether you **should**, and whether you can defend the call. Same technology, a different job.

Each lesson has: objectives, theory, example, code, hands-on, exercises, pitfalls.

## The exam

| Item | Value |
|---|---|
| Questions | 63 |
| Time | 120 minutes, under 2 minutes each |
| Pass | 720 on a 100 to 1,000 scale |
| Format | single choice, plus multiple response stating how many to pick |
| Proctoring | remote camera or test centre |
| Validity | 12 months, free renewal if not lapsed |
| Retakes | increasing intervals, capped per year |

No official practice test exists for this exam. Registration runs through Anthropic's partner network.

Seven domains; integration is the largest at nearly a fifth.

---

## 01 · The Exam Map and the Three Pattern Rungs

**Objectives**

- Remember three numbers: 63 questions, 120 minutes, 720.
- Place a problem on the right rung.
- Apply "simplest that still works".

### Theory

Each rung trades flexibility for predictability.

| Rung | Who picks the step | Trait |
|---|---|---|
| Augmented model | No steps | One call plus tools, memory |
| Workflow | Your code | Fixed path, knowable in advance |
| Agent | The model | Path drawn at runtime, possibly different each time |

The rule above the ladder: use the simplest pattern that meets the requirement, not one rung higher. Agentic systems trade latency and cost for performance, and that trade pays only when the task is genuinely open-ended.

Two architecture failures:

| Failure | Shape | Consequence |
|---|---|---|
| Over-orchestration | A team of agents for a straight line | Coordination dominates the work |
| Gold plating | Every tool and safeguard | Higher bill and wider attack surface |

The winning answer is almost always the lowest rung that satisfies every constraint in the stem.

### Example

A team teaches invoices to process themselves with an agent. The work is fixed: read fields, match a purchase order, send.

| Signal | Verdict |
|---|---|
| Same fields and checks each time | Workflow |
| Demo works, production takes a different path daily | Wrong pattern, not a tuning problem |
| Expert's fix | Delete the agent, replace with a sequence |

The treatment was deleting code, not tuning it.

### Code

No specific code. On paper, draw the three rungs and circle the lowest one that satisfies the stem.

### Hands-on

1. Pick three AI uses.
2. For each, identify who picks the next step.
3. Note what you give up by climbing a rung.
4. Re-choose the lowest sufficient rung.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify six systems | 15 min | Each names who picks the step |
| 2 | Find one over-orchestrated case | 10 min | Coordination cost is named |
| 3 | Defend the lower rung | 15 min | The violated constraint is named |

### Pitfall

Choosing an agent because the roadmap wants the word "autonomous". The exam rewards the lowest rung that works.

---

## 02 · When a Second Agent Is a Liability

**Objectives**

- Name the two legitimate reasons to split agents.
- Quantify multi-agent cost.
- Tie a design to one business value and state its price.

### Theory

| Reason | Mechanism |
|---|---|
| Context isolation | A subagent sees only its slice |
| Breadth | Independent directions run in parallel |

Outside those, splitting usually adds coordination. Every agent adds a handoff, and every handoff is a place context drops.

Anthropic's data: a multi-agent system burned about 15 times the tokens of plain chat. That is a budget decision, not a technical detail.

Disqualifier: if every agent needs the same context, or each step depends on the previous one, multi-agent is the wrong shape.

Five business values: efficiency, transformation, productivity, cost, and a promised performance target.

### Example

A five-agent research system: planner, searcher, summariser, checker, writer. In production it is slow and expensive, and half the bugs are agents waiting on each other.

| Analysis | Result |
|---|---|
| Trace where the work happens | Two agents do the real thinking |
| The other three | Pass notes |
| Fix | Cut three, keep two |

The team was told "transform the organisation" and chased the impressive build. The real constraint was cost and reliability, and five agents made both worse.

### Code

No specific code. The answer shape: "this design serves [value], and it worsens [other value] by [amount]".

### Hands-on

1. For a multi-agent system, count the handoffs.
2. Identify agents that only pass notes.
3. Compare token use with a single agent.
4. Write one sentence naming value and price.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Count handoffs and cost | 15 min | Numbers recorded |
| 2 | Name a redundant agent | 10 min | Its work is described |
| 3 | Write the two-step defence | 10 min | Value and price both present |

### Pitfall

Answering with the value someone said out loud instead of the constraint the stem actually names.

---

## 03 · Model Choice, Prompting, Caching

**Objectives**

- Choose a model by three axes and an eval set.
- Use the system prompt as a template with slots.
- Place the cache breakpoint correctly.

### Theory

| Axis | Question |
|---|---|
| Capability | Does it clear the quality bar |
| Speed | Is a human waiting |
| Cost | Multiplied by volume |

Two honest starts: the cheap model first, upgrading if it misses; or the most capable, measured, then optimised down. The eval set decides, not intuition.

One underused lever: some models expose an effort setting trading intelligence for speed and cost. Tuning effort often beats switching models.

Prompting: the system prompt is standing orders, written as a template with slots. Zero shot by default; few-shot when examples are needed; chain of thought only when reasoning genuinely needs steps, because it adds latency.

Caching: static content first, changing content last.

| Wrong | Right |
|---|---|
| Instructions first, user message in the middle, policy last | Policy and tools first, user message last |

### Example

An extraction pipeline runs on the top model, accuracy well past target, cost hurting.

| Option | Verdict |
|---|---|
| Keep the model, lower max_tokens and temperature | Turning knobs |
| Drop a tier, re-run the eval set | Correct |
| Add a routing layer | Building what is not needed |
| Add examples for confidence | Spending on the wrong problem |

### Code

```python
resp = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1024,
    system=[
        {"type": "text", "text": POLICY},
        {"type": "text", "text": TOOL_GUIDE,
         "cache_control": {"type": "ephemeral"}},
    ],
    messages=[{"role": "user", "content": question}],
)
print(resp.usage.cache_read_input_tokens)
```

### Hands-on

1. Run one task on two tiers.
2. Record quality, latency and price.
3. Split the prompt into static and changing parts.
4. Enable caching and measure the second call.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Compare two tiers on the eval set | 25 min | Three axes recorded |
| 2 | Write the prompt as a template | 15 min | Slots are explicit |
| 3 | Measure cache reads | 15 min | Second call above zero |

### Pitfall

Jumping to the largest model. The documentation says tuning effort usually beats switching models.

---

## 04 · Integration and Least Privilege

**Objectives**

- Read the tool list as a list of permissions.
- Remove capability instead of logging around it.
- Catch identity errors.

### Theory

At architect level, a tool is a **permission**. The question shifts from "what can this agent do for us" to "what could it do to us if someone else wrote its instructions".

| Problem | Fix |
|---|---|
| A tool nobody uses still exists | Remove it from the configuration |
| A dangerous tool | Remove the capability, do not log around it |
| A shared account sees every record | Per-user authority |

Logging tells you the barn door was open after the horse left. A tool the agent does not have is a tool an attacker cannot reach.

The second cost of a long tool list: every tool is described in full on **every** request, spending tokens before the user speaks and giving the model more tools to mis-select.

### Example

A support agent has four tools: read account, draft reply, issue refund, delete record. Nobody remembers the last refund or delete.

| Option | Verdict |
|---|---|
| Add logging to the dangerous tools | Does not prevent |
| Add confirmation before refunds | Reduces, does not remove |
| Remove both tools from the configuration | Correct |
| Switch to a stronger model | Wrong direction |

### Code

```json
{
  "tools": ["read_account", "draft_reply"]
}
```

The tool list is the permission list. If a tool is absent, there is no path to call it.

### Hands-on

1. List a running agent's tools.
2. Mark tools unused for 30 days.
3. Remove them and re-run.
4. Check identity: can the agent see other users' records?

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Audit the tool list | 15 min | At least one tool removed |
| 2 | Write the reason | 10 min | It names capability, not logging |
| 3 | Check identity | 15 min | Whose permissions run is stated |

### Pitfall

Adding logging and confirmation, then calling it handled. The capability is still there.

---

## 05 · RAG: Chunking and Retrieval

**Objectives**

- Chunk on semantic boundaries.
- Recognise a stale index behind confident wrong answers.
- Measure retrieval quality.

### Theory

The model does not know your documents. Each question fetches relevant passages and pastes them into the prompt. The answer is only as good as what is fetched.

| Step | Common failure |
|---|---|
| Chunk | Fixed-size cuts through a clause |
| Index | Not rebuilt after documents change |
| Retrieval | Measuring latency, not relevance |

Chunking principle: cut on the document's own boundaries (section, clause, function) so each chunk means something alone. Size is a deliberate trade-off, not a round number.

### Example

Product documentation was refreshed on a Friday. All weekend the assistant answers quickly, confidently, and wrongly about the new policy.

| Check | Result |
|---|---|
| Model | Unchanged |
| Prompt | Unchanged |
| Index | Copied before Friday |
| Verdict | Retrieval failure, not hallucination |

### Code

```python
chunks = []
for section in doc.sections:
    for para in section.paragraphs:
        chunks.append({"text": para.text, "section": section.title})
```

### Hands-on

1. Chunk a long document by character count.
2. Check for clauses split across chunks.
3. Re-chunk by structure.
4. Compare answer quality.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Find a split chunk | 15 min | At least one case |
| 2 | Re-chunk by structure | 20 min | No clause split |
| 3 | Score top-3 relevance | 15 min | A score is recorded |

### Pitfall

Enlarging the context window to fit more chunks. That is capacity, not a fix for where the cut happened.

---

## 06 · Monitoring: Green Dashboards, Garbage Answers

**Objectives**

- Explain why an LLM system fails while dashboards stay green.
- Name the four observation layers.
- Distinguish logging from watching.

### Theory

Ordinary software fails loudly. An LLM system can return 200, valid-looking content, and be wrong.

| Layer | Records |
|---|---|
| Trace | One request's full path, every stage, timed |
| Per-stage | Latency and output quality for each stage |
| Sampling and judges | Sampled answers scored against a rubric |
| Cost meter | Input and output tokens per request from `usage` |

A logged request is not a watched request.

### Example

A retrieval system degrades for a week with no alarm: latency normal, error rate flat.

| Missing | Consequence |
|---|---|
| Retrieval relevance score | No idea which stage broke |
| Per-stage timing | No idea where it slowed |
| Periodic sampling | Only learn when a customer complains |

### Code

```python
u = resp.usage
log.info("request", input=u.input_tokens, output=u.output_tokens,
         cache_read=u.cache_read_input_tokens,
         latency_ms=elapsed, stage="answer")
```

### Hands-on

1. Add tracing to a three-stage pipeline.
2. Record latency and one quality score per stage.
3. Sample 20 answers and score them.
4. Chart daily cost from usage.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Draw the four layers | 15 min | All four present |
| 2 | Add a per-stage quality score | 20 min | A chart exists |
| 3 | Score 20 samples | 20 min | Mean and spread recorded |

### Pitfall

Watching latency and error rate and calling it enough. Neither says whether the content is right.

---

## 07 · Evaluation: Better or Just Different

**Objectives**

- Build a golden set from real failures.
- Measure five things, not just accuracy.
- Use three grading methods and cross-check.

### Theory

"Better" only means something when measured against the same ruler: a **golden set** of real inputs paired with known-good outputs.

| Metric | Question |
|---|---|
| Accuracy | Is the answer right |
| Latency | Does it arrive in time |
| Cost | What it costs at real volume |
| Safety | Does it leak data or promise what you cannot deliver |
| Security | Can hostile input push it off the rails |

| Method | Use for | Trap |
|---|---|---|
| Code check | Clear right and wrong | Misses nuance |
| Model judge | Tone, soft criteria | Needs calibration |
| Human read | Confirms the other two measure the right thing | Expensive |

A happy-path-only set is a demo, not an evaluation. Include failures and adversarial inputs: sarcasm, typos, an attempt to override instructions.

Subtle point: test where a behaviour should **not** happen, not only where it should.

### Example

A prompt was tightened; replies read better. Shipped Friday. A week later compliance finds a slice of refund replies lost a required disclaimer.

| Missing | Consequence |
|---|---|
| Safety cases in the eval | Nobody saw the disclaimer disappear |
| Scoring untouched criteria | No collateral-damage check |

### Code

```python
cases = [
    {"id": "refund-01", "input": ticket, "must_contain": ["disclaimer"],
     "must_not_contain": ["refund within 24h"]},
]
score = sum(check(c) for c in cases) / len(cases)
```

### Hands-on

1. Take 25 real tickets and write the correct output.
2. Write one code check for a hard requirement.
3. Write a rubric for a model judge and score 20 cases.
4. Compare with a human and adjust.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Build a 25-case golden set | 45 min | Failure and adversarial cases included |
| 2 | Write a code check | 20 min | Runs without a model |
| 3 | Calibrate the judge | 25 min | Agrees with the human on 20 cases |

### Pitfall

Scoring only accuracy. Safety and security are first-class metrics with their own cases and thresholds.

---

## 08 · A/B Testing and Cost Optimisation

**Objectives**

- Run A/B with a baseline.
- Change one thing at a time.
- Trace a regression to its layer.

### Theory

Every change to a live system is a bet that it improves things without breaking others.

| Step | Action |
|---|---|
| 1 | Run the current system on the golden set, record the baseline |
| 2 | Change **one** thing |
| 3 | Re-run on the same set |
| 4 | Keep if it wins meaningfully, revert otherwise |

Change three things at once and a move in the score teaches nothing.

A demo is not a measurement. "It reads better" has a name: eval blindness.

### Example

Switching to a cheaper model because the demo looked fine. A week later, complaints.

| Check | Result |
|---|---|
| Golden set before | Never run |
| Golden set after | Lower than the old version |
| Verdict | Blind optimisation |

### Code

```python
baseline = run_eval(system_v1)
candidate = run_eval(system_v2)
assert candidate.total >= baseline.total, "revert"
assert candidate.safety >= baseline.safety, "safety must not drop"
```

### Hands-on

1. Record a baseline before changing anything.
2. Change one thing, re-run.
3. Record the delta on every metric, including untouched ones.
4. Keep or revert, with a reason.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Record the baseline | 20 min | Five metrics recorded |
| 2 | Run one change | 20 min | Nothing else changed |
| 3 | Write the keep/revert call | 10 min | Based on numbers |

### Pitfall

Bundling several changes in one release. Even if the score rises, you learn nothing.

---

## 09 · Guardrails: a Prompt Asks, Code Stops It

**Objectives**

- Separate guidance from control.
- Name five failure modes.
- Place guardrails at the right layer.

### Theory

"Never issue a large refund without approval" in a system prompt is **guidance**. It shapes what the model usually does, not what it cannot do.

| Word in the requirement | Where it belongs |
|---|---|
| must, never, cannot | Code: check, gate, permission |
| should, prefer | Prompt |

Five failure modes:

| Mode | Meaning |
|---|---|
| Hallucination | Confident false statement |
| Prompt injection | Read text carrying instructions |
| Tool misuse | Real tool, wrong arguments or wrong moment |
| Context poisoning | Bad information treated as truth for the rest of the session |
| Drift | Good at launch, degrading as the world changes |

Only hallucination is the model being wrong on its own. The other four are about what the system lets it read and do.

### Example

A refund agent auto-issues small refunds and waits for a human above a limit. One afternoon it misreads a currency field and queues a refund with too many zeros. The approver catches it in seconds.

| Option | Verdict |
|---|---|
| Stronger prompt wording | Guidance |
| Add logging | Does not stop |
| A code gate | Control |
| Change the model | Unrelated |

### Code

```python
def issue_refund(amount, session):
    if amount > session.limit and not session.human_approved:
        raise PermissionError("Above limit, human approval required.")
    return payments.refund(amount)
```

### Hands-on

1. List five invariant rules in your system.
2. Check which live in prompts.
3. Move them into code and verify they block.
4. For each failure mode, name one catching layer.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify eight rules | 10 min | Invariants become code |
| 2 | Write one gate | 20 min | Blocks the bad case |
| 3 | Map five failure modes to layers | 15 min | Each has a layer |

### Pitfall

Adding a disclaimer or a log and calling it a guardrail. A control runs before the action.

---

## 10 · Compliance: Where the Data Goes

**Objectives**

- Map the data flow before naming a regulation.
- Tell GDPR, HIPAA and FedRAMP apart.
- Choose controls by "must".

### Theory

Before any regulation, map the data flow: created where, passing through where, resting where, reachable by whom. Every arrow is a place data lives and a place a regulator points at.

| Regulation | Asks | Control |
|---|---|---|
| GDPR | Where personal data sits, can it be erased, is more sent than needed | Pin inference and storage regions; erasure and minimisation stay yours |
| HIPAA | Protected health information | Supported API with a signed BAA; encryption, access control, audit logging |
| FedRAMP | Is the environment authorised | The environment is authorised, not the model |

The line: FedRAMP does not certify a model; it authorises the environment the model runs in. The same model is compliant or not depending on the room.

| Control | Blocks |
|---|---|
| Zero data retention | No prompt or response stored |
| Region pinning | Data leaving the region |
| Redacting sensitive fields from logs | Logs becoming a leak |
| Human review before a decision | Errors reaching the recipient |

A log records what happened; it does not stop it.

### Example

A healthcare project is finished, demos well, and cannot launch because legal asks where patient data goes and nobody can draw it.

| Missing | Consequence |
|---|---|
| Data-flow map | Cannot answer the basic question |
| BAA | Cannot process health data |
| Storage region | Cannot prove residency |

### Code

No specific code. The deliverable is a map: boxes and arrows, each arrow labelled with data and who can read it.

### Hands-on

1. Draw a real system's data flow.
2. Mark where sensitive data appears.
3. For each regulation, write its question and control.
4. Find which "must" controls currently live in prompts.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Draw the flow | 20 min | Every arrow is labelled |
| 2 | Attach three regulations | 15 min | Each has a clear question |
| 3 | Choose two controls | 10 min | Both are controls, not logs |

### Pitfall

Turning on zero data retention and calling compliance done. It is one control among several.

---

## 11 · Defending the Design and Rolling Out to a Team

**Objectives**

- Find the deciding constraint in discovery.
- Present a decision, not a diagram.
- Place configuration at the right tier.

### Theory

Discovery keeps asking until it finds **one deciding constraint**: cost, compliance, or something that must never happen.

A defensible design has three parts:

| Part | Content |
|---|---|
| What it buys | Benefit in business language |
| What it costs | The honest downside |
| Which pillar | The value agreed in discovery |

A diagram shows what you build, not why you chose it over the cheaper option. The approver can only judge the why.

For Claude Code in a team, three configuration tiers:

| Tier | Controlled by |
|---|---|
| Personal | Each person |
| Team | Repository, inherited by every clone |
| Managed | Organisation, cannot be switched off |

Two file kinds, two jobs:

| Kind | Nature |
|---|---|
| Instruction files for the model | A note; usually followed, occasionally not |
| Settings and permissions | A wall; enforced regardless of the model |

### Example

A claims triage assistant stalls for a month. The design is right; the sentence was wrong.

| Director's question | Answer given | Answer needed |
|---|---|---|
| "Will it ever send a claim to the wrong place" | "Accuracy is very high" | "Yes, a small share; those go to a human before sending" |

The design did not change; the sentence did, and it was approved.

A 40-person team widened shared settings to stop permission prompts. A week later an agent ran a cleanup script against production instead of staging.

| Mistake | Correct tier |
|---|---|
| Open command execution for everyone | Managed or environment-scoped gate |
| Write "do not touch production" in an instruction file | Permission rule |

### Code

```json
{
  "permissions": {
    "deny": ["Bash(*production*)", "Bash(rm -rf *)"]
  }
}
```

### Hands-on

1. Run discovery: ask "what must absolutely never happen".
2. Write a three-part sentence defending a design.
3. Sort decisions into team and managed tiers.
4. Turn one "note" into a "wall".

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Find the deciding constraint | 15 min | One sentence eliminates options |
| 2 | Write the three-part sentence | 15 min | Benefit, cost, pillar |
| 3 | Place five settings across three tiers | 15 min | Invariants sit in managed or permissions |

### Pitfall

Presenting the architecture diagram. It does not show the approver why.

---

## 12 · Four Autopsies, Reading the Paper, Exam Day

**Objectives**

- Recognise four production failure signatures.
- Read a stem for constraint, not topic.
- Work the paper in two passes.

### Theory

Four autopsies, four signatures:

| Signature | Symptom | Real cause |
|---|---|---|
| Context rot | Worse as it grows, forgets old constraints | Full window, middle buried |
| Stale index | Confident, fluent, uniformly wrong | Re-ingest or embedding model changed |
| Tool noise | Wrong tool, token burn | Long tool list, blurred descriptions |
| Not measured | Green dashboards, customer complaints | No quality score |

Three questions for any broken system: what changed, at which layer, is it measured.

Reading method, three steps:

1. Read for the **constraint**, not the topic. `must`, `never`, a limit, a regulator, a cost ceiling.
2. Eliminate by principle: name the principle the item tests and drop options that break it.
3. Multiple response: judge each option true or false against the stem independently.

Exam day: two passes. Pass one answers what you recognise; as soon as an item pushes back, place your best answer, flag it, and move on. Never leave an item blank.

### Example

The published sample: an agent has four tools; staff only need to read tickets and draft replies; the worry is being talked into a dangerous tool.

| Option | Eliminated because |
|---|---|
| Log refund and delete tool use | Does not prevent |
| Remove both tools from the configuration | Correct |
| Keep tools, add confirmation | Reduces, does not remove |
| Use a larger model | Wrong direction |

The constraint sits in "only need to read and draft": surplus capability must be removed.

### Code

No code. This is reading and choosing.

### Hands-on

1. Take five items, underline the constraint before reading options.
2. Write the principle each item tests.
3. Eliminate by principle.
4. Work 20 items in 40 minutes, two passes.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Underline constraints in 10 stems | 15 min | One constraint per item |
| 2 | Name the principle for 10 items | 15 min | None is a topic label |
| 3 | Work 20 items in two passes | 40 min | Nothing left blank |

### Pitfall

Skimming the first three sentences and choosing. The deciding clause often sits in the third or fourth.
