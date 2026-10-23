# Claude Certified Architect: Foundations (CCA-F)

A 12-lesson curriculum, consolidated from 35 modules and checked against Anthropic documentation, October 2026. Source: [Architect playlist](https://www.youtube.com/playlist?list=PLTw_BnRTtaD4) and the [16-lesson course](https://www.youtube.com/watch?v=cLa3Qf9SUYs).

Each lesson has: objectives, theory, example, code, hands-on, exercises, pitfalls. The exam material lives separately under [Exam](exam.html).

## The exam

| Item | Value |
|---|---|
| Questions | 60 |
| Time | 120 minutes |
| Pass | 720 on a 100 to 1,000 scale |
| Scenarios | 4 of 6, 15 questions each |
| Fee | 49 USD, retake after 6 months |

Five domains: agentic architecture 27%, Claude Code configuration 20%, prompting and structured output 20%, tools and MCP 18%, context and reliability 15%.

---

## 01 · The Exam and the First Decision

**Objectives**

- Read the format and budget time by weight.
- Classify a system as workflow, agent or conversation.
- Apply proportionate intervention.

### Theory

The exam tests reading speed as much as knowledge: 60 questions in 120 minutes, about two minutes each.

| Shape | Who picks the next step | Signal |
|---|---|---|
| Workflow | Your code | Every branch can be listed in advance |
| Agent | The model | The path emerges while running |
| Conversation | No plan | One turn at a time |

The only question: can you write the whole sequence down in advance? If yes, it is a workflow, however hard each step is. A model, tools and a retry loop do not make an agent; who wrote the branches does.

Proportionate intervention: fix the root cause at the lowest cost.

| Symptom | Right fix | Over-engineering |
|---|---|---|
| Picks the wrong one of two tools | Rewrite the descriptions | Add a routing classifier |
| Review of many files is shallow | Per-file passes plus an integration pass | Bigger context window |
| A financial rule must hold | Code gate | Stronger prompt |

The line: irreversible actions get code, not prompts.

### Example

An invoice system with a model, tools, retries and a ledger write looks agentic.

| Question | Answer |
|---|---|
| Can the sequence be written first | Yes: read, validate, retry on failure, post |
| Who decides to retry | Code |
| Verdict | Workflow |

Choosing wrong does not fail loudly: an agent costs several times more and takes longer for the same result, and nothing in the output says the shape was wrong.

### Code

No specific code. On exam paper, write two columns: steps, and who picks the next step.

### Hands-on

1. Pick three systems you know.
2. Write every branch for each.
3. If you can, the verdict is workflow.
4. Note what you give up with the other shape.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify five systems | 15 min | Each names who picks the step |
| 2 | Try writing every branch of an "agent" | 20 min | Reclassify if you can |
| 3 | Build a study budget by weight | 10 min | Heaviest domain gets the most hours |

### Pitfall

Confusing difficulty with autonomy. The exam always presents a system with a model, tools and a loop, and the answer is workflow because a human wrote every branch.

---

## 02 · Decomposition, Patterns, Topology

**Objectives**

- Split along natural seams, not token counts.
- Choose a pattern by data dependency.
- Choose a topology and name its cost.

### Theory

Split along the material's own seams: file boundaries, discovery steps. Token chunking cuts through reasoning, and no later step recovers it.

Every split needs a **recombination step** owning the coherence of the final output.

| Pattern | Use when | Cost |
|---|---|---|
| Sequential | The next step needs the previous output | Latency adds up |
| Parallel | Steps are independent | Duplicated context, more failure points |
| Adaptive | Scope is unknown | Slower than a fixed plan |

In the Agent SDK, parallel means the coordinator emits several task calls in **one** response. One task per turn is serial, whatever the diagram says.

| Topology | Observability | Failure behaviour |
|---|---|---|
| Hub and spoke | One coordinator sees everything | Coordinator notices immediately |
| Pipeline | Each output feeds one input | Every seam needs error handling |
| Peer-to-peer | No centre | Each agent discovers the failure at a different time |

Two subagent rules: each gets only its role's tools; the coordinator picks which run, rather than always running the full pipeline.

### Example

A 14-file pull request under security review.

| Approach | Result |
|---|---|
| One prompt with all 14 files | Uniformly shallow, misses cross-file issues |
| Token chunks | One chunk flags a dangerous pattern another approves |
| 14 per-file passes plus one integration pass | The integration pass follows a value from validation to use |

A four-agent research system: "capital of France" needs only the searcher and reporter. Running all four is still correct, just slower and noisier.

### Code

```python
# Parallel in the Agent SDK: several task calls in ONE response
tasks = [
    {"type": "task", "agent": "searcher", "prompt": "..."},
    {"type": "task", "agent": "analyst", "prompt": "..."},
]
```

### Hands-on

1. Split one large task along natural seams.
2. Name the step that owns coherence.
3. Choose a pattern by data dependency.
4. Draw hub-and-spoke, then count the seams a pipeline would need.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Split with seams recorded | 15 min | No chunk cuts a data flow |
| 2 | Identify the recombination step | 10 min | It consumes every other output |
| 3 | Compare topologies | 15 min | Seam count is stated |

### Pitfall

Token chunking plus concatenation. The exam always adds a symptom of contradiction between chunks, and the answer adds a recombination step.

---

## 03 · Configuring Claude Code

**Objectives**

- Separate the three configuration tiers and know which wins.
- Choose between command, skill and subagent.
- Place rules at the right scope.

### Theory

| Tier | Holds | Example |
|---|---|---|
| Enterprise | Non-negotiable constraints | Security, compliance |
| User | Personal preference | Length, formatting |
| Project | Team agreements | ORM, test framework |

The more specific tier wins, not the higher organisational rank. It is replacement for conflicting directives, not merging: enterprise still applies where the project is silent.

| Tool | Trigger | Context |
|---|---|---|
| Slash command | The human types it | Main context |
| Skill | Automatic, by description | May fork |
| Subagent | Coordinator delegates | Isolated |

### Example

| Need | Choice | Why |
|---|---|---|
| Review checklist, invoked when reviewing | Command | Human decides when |
| Diagram on every design discussion | Skill with a narrow description | Automatic by context |
| Full-repo API scan | Subagent | Large output, isolated context |

### Code

```json
{
  "model": "claude-opus-5-5",
  "permissions": {
    "deny": ["Bash(rm -rf *)", "Read(./.env)"]
  }
}
```

Commit it so the team shares the model and deny rules. `CLAUDE.md` files do not override each other; they stack.

### Hands-on

1. Run `/memory` and see which files load.
2. Move one personal rule to project scope and commit.
3. Turn a repeatedly pasted prompt into a command.
4. Write a skill description and check it does not fire wrongly.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Place three rules across three tiers | 15 min | Winner explained by specificity |
| 2 | Convert a prompt into a command | 15 min | Two machines behave the same |
| 3 | Write a narrow skill description | 10 min | It states when not to fire |

### Pitfall

Assuming three broad rules outvote one project rule. Only specificity decides.

---

## 04 · Headless, CI and Hooks

**Objectives**

- Run Claude unattended the documented way.
- Tell the two hook families apart.
- Write a blocking hook with a redirect.

### Theory

| Task | Documented mechanism | Trap |
|---|---|---|
| Unattended run | `-p` | `claude headless`, `batch` do not exist |
| Context in CI | `CLAUDE.md` | CI has no session history |
| Enforce an invariant | Hook | A prompt is probabilistic |
| Choose a response mode | By who consumes the output | Treating it as a performance setting |

Two hook families: Claude Code hooks (shell, per repository or team) and Agent SDK hooks (code inside the agent process). "Pipeline" and "team" signal the first; "agent" and "tool result" signal the second.

### Example

A pipeline hangs when calling Claude.

| Step | Action | Why |
|---|---|---|
| 1 | Add `-p` | Stops hanging |
| 2 | `--output-format json` | No prose |
| 3 | A five-field schema | Comments land correctly |
| 4 | Do not use `stdin < /dev/null` | Masks the symptom |

### Code

```bash
claude -p "Review staged diff for security issues" \
  --output-format json \
  --allowedTools "Read,Grep,Glob"
```

```python
def before_tool(name, args, session):
    if name == "bash" and args["command"].startswith("rm -rf"):
        raise PermissionError(
            "Recursive delete blocked. Use a branch and open a PR."
        )
```

### Hands-on

1. Write a headless command with `-p` and JSON.
2. Add a blocking hook.
3. Block with a bare error and watch the agent stall.
4. Fix it to return a reason and an alternative tool.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write a correct CI command | 15 min | No invented flags |
| 2 | Write a hook with a redirect | 20 min | The agent can use the alternative |
| 3 | Classify five rules as hook or prompt | 10 min | Invariants become hooks |

### Pitfall

Blocking with a hook but returning a bare error. The exam treats that as a design flaw, not safety.

---

## 05 · System-Scale Prompting and Structured Output

**Objectives**

- Treat the system prompt as an interface contract.
- Pick few-shot or chain of thought by the failure.
- Use schemas correctly and know their limit.

### Theory

The system prompt is a contract: role, boundaries, when to escalate, output shape. Not a notebook.

| Symptom | Technique | Cost |
|---|---|---|
| Clear, stable classification | Zero shot | None |
| Hesitation at the boundary | Few shot, 2-4 different examples | Tokens per request |
| Genuine multi-step reasoning | Chain of thought | Latency |

CoT on classification is a trap: cost without quality.

Structured output constrains shape, not truth.

| Situation | Configuration |
|---|---|
| Unknown document type | `tool_choice: any` |
| Prose answer acceptable | `auto`, but the parser breaks |
| Type known for certain | Force the tool name |

| Schema rule | Reason |
|---|---|
| Do not mark a possibly-absent source field `required` | The model invents a value |
| Include an `other` enum value with detail | Enums are open-ended |
| Validate after receipt | The schema only makes the bad case rarer |

### Example

An annual report summary with a suspicious litigation figure.

| Option | Verdict |
|---|---|
| Ship it, it has citations | Unopened citations are unverified |
| Ask the model to check itself | Same mechanism |
| Require verbatim quotes, withdraw unsupported claims | Correct |
| Check completeness against the original list | Catches missing items |

### Code

```python
resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system=(
        "You classify tickets. Return JSON matching the schema. "
        "If information is missing, return category=unclear, do not guess."
    ),
    messages=[{"role": "user", "content": ticket}],
)
```

For an unknown document type, `tool_choice: any` forces a tool call and lets the model choose the schema.

### Hands-on

1. Write a system prompt under 200 tokens doing one job.
2. Add few-shot for the boundary case and measure error rate.
3. Write a schema with a nullable field.
4. Validate after the schema and feed it a missing field.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write a lean system prompt | 20 min | No tool-specific detail inside |
| 2 | Compare zero shot and few shot | 15 min | Error counts recorded |
| 3 | Write a nullable schema | 15 min | No field is required without cause |

### Pitfall

Marking every field `required`. It induces fabrication and is the classic wrong answer.

---

## 06 · Tool Design and MCP

**Objectives**

- Choose tool granularity.
- Write a four-part description.
- Scope an MCP server and its primitives.

### Theory

| Symptom | Fix |
|---|---|
| One tool doing unrelated jobs, blurred description | Split |
| Too many tools, poor selection | Consolidate |
| Adding a `mode` parameter | Wrong: the ambiguity stays inside one description |

The description is the model's only documentation. Four sentences: what it does, when to use it, when not to, what the parameters mean and what it cannot do.

MCP:

| Decision | Choice |
|---|---|
| Shared server | Project scope, commit the config |
| Personal experiment | User scope |
| Secret | Environment variable |
| Common integration | Community server |
| Content catalogue | Resources, not a list-all tool |

Three primitives, three controllers: tools by the model, resources by the application, prompts by the user.

### Example

| Failure | Cause | Fix |
|---|---|---|
| Wrong tool chosen | No boundary sentence | Rewrite the description |
| Wrong argument | Format not stated | Give an example such as `A10493` |
| Tool skipped | No "when to use" | Add that sentence |

### Code

```python
tools = [{
    "name": "get_order_status",
    "description": (
        "Look up an order. Takes an order_id shaped ANNNNN. "
        "Use for order questions, not for account details or refunds."
    ),
    "input_schema": {
        "type": "object",
        "properties": {"order_id": {"type": "string", "description": "Shaped ANNNNN"}},
        "required": ["order_id"],
        "additionalProperties": False,
    },
    "strict": True,
}]
```

```json
{
  "mcpServers": {
    "inventory": {
      "command": "python",
      "args": ["-m", "inventory_mcp"],
      "env": { "INVENTORY_TOKEN": "${INVENTORY_TOKEN}" }
    }
  }
}
```

### Hands-on

1. Rewrite one tool description with all four parts.
2. Measure the correct-choice rate before and after.
3. Sort six capabilities into the three primitives.
4. Write an MCP config with no secret.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write a four-part description | 20 min | It contains "when not to" |
| 2 | Measure the correct-choice rate | 15 min | Before and after numbers |
| 3 | Sort the primitives | 10 min | Each names its controller |

### Pitfall

Fixing tool selection with a system prompt line. The selection step only reads the description.

---

## 07 · Context and the Two Scenario Labs

**Objectives**

- Budget context and trim at the boundary.
- Keep transactional facts out of summaries.
- Read a scenario for its binding constraint.

### Theory

| Task | Where | Do not |
|---|---|---|
| Budget | Measure each source first | Guess |
| Trim | At the boundary, in a post-tool-use hook | Let the model see everything, then compact |
| Oversized result | Truncate and say so | Drop silently |
| Compaction | A case-facts block outside the summary | Ask the summariser to keep details |

Context rot: a fuller window is less accurate. Models recall the beginning and end better than the middle.

Scenario labs teach one skill: find the binding constraint and use it as an elimination filter.

| Constraint | Eliminates |
|---|---|
| Irreversible action | Every probabilistic mechanism |
| A resolution-rate target | Escalating on confidence |
| No irreversible action | Enforcement gates |
| A cited report | Prose handoffs |

### Example

Scenario A: a support agent targeting 80% first-contact resolution.

| Option | Eliminated because |
|---|---|
| Handle everything autonomously | Guesses on ambiguous cases |
| Escalate below a confidence threshold | Escalates what it could close |
| Handle clear policy cases, escalate policy gaps | Survives |

Scenario B: a four-agent research system with a cited report. The difference is isolated context and provenance, so an enforcement gate has no place.

### Code

```python
CASE = """Amount: 247.83
Date: 3 March
Order: 4471
Promise: refund within 5 business days"""
```

### Hands-on

1. Measure tokens across four sources in a long conversation.
2. Write a hook trimming one tool result.
3. Write case facts for one real case.
4. For a brief, list the constraint and eliminated options.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Measure tokens by source | 20 min | Each has a number |
| 2 | Write a case-facts block | 15 min | Every figure is verbatim |
| 3 | Build the elimination table | 15 min | Nothing eliminated on feeling |

### Pitfall

Weighing pros and cons between options. If you are weighing, you missed an elimination.

---

## 08 · The Agentic Loop and Spawning Subagents

**Objectives**

- Write the loop against `stop_reason`.
- Pass context explicitly.
- Emit parallel task calls correctly.

### Theory

The loop: send, read `stop_reason`, run tools, return results, repeat.

| Part | Role |
|---|---|
| `stop_reason` | The only reliable stop signal |
| `tool_result` with `tool_use_id` | Every tool call must be answered, all of them |
| Iteration cap | A safety net, not the ending mechanism |

Spawning uses the task tool. The coordinator must have `task` in its allowed tools; without it, it does the work itself and says nothing.

| Task | How |
|---|---|
| Parallel | Several task calls in one response |
| Serial | One task per turn |
| Tool scope | Each subagent gets only its role's tools |
| Context | Written explicitly, nothing inherited |

### Example

The model returns three tool calls in one turn.

| Response shape | Result |
|---|---|
| Three `tool_result` blocks in one user message | Correct |
| Two of three | API error |
| One message per result | The model learns not to batch |

| Agent | Tools | If over-granted |
|---|---|---|
| Searcher | web search | |
| Synthesizer | no web search | It researches on its own, the report covers a third |

### Code

```python
while True:
    resp = client.messages.create(
        model="claude-opus-5-5", max_tokens=2048,
        messages=messages, tools=tools,
    )
    if resp.stop_reason != "tool_use":
        break
    results = []
    for block in resp.content:
        if block.type == "tool_use":
            out = run_tool(block.name, block.input)
            results.append({"type": "tool_result",
                            "tool_use_id": block.id, "content": out})
    messages.append({"role": "assistant", "content": resp.content})
    messages.append({"role": "user", "content": results})
```

### Hands-on

1. Write a loop that never parses text to stop.
2. Handle a turn with three tool calls.
3. Add an iteration cap returning a partial result.
4. Write a structured handoff payload between two agents.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write the loop | 20 min | No text parsing |
| 2 | Handle three tool calls | 15 min | All answered in one message |
| 3 | Write claim, evidence, source, date | 15 min | No free-prose field |

### Pitfall

Parsing "I am done" in the text, or using the iteration count as the main stop condition.

---

## 09 · Gates, Handoffs and SDK Hooks

**Objectives**

- Gate actions that must never go wrong.
- Write a handoff that replaces the transcript.
- Use hooks to normalise and block.

### Theory

A gate is code blocking a tool until a prerequisite is done.

| Gate when | Something else when |
|---|---|
| Consequence is severe and must never happen | The tool was merely mis-chosen: fix the description |
| Money, safety, legal | Ordering is suboptimal: prompt |

A block must return a structured error naming the missing prerequisite and the supplying tool.

A human handoff payload replaces the transcript:

| Field | Answers |
|---|---|
| Customer id, order id | What is this |
| Root cause | What happened |
| Evidence | Based on what |
| Amount | How much at risk |
| Recommendation | What to do |

| Hook | Runs | Use |
|---|---|---|
| Post tool use | After the tool, before the model sees it | Normalise, trim |
| Interception | Before the tool runs | Block violations |

### Example

Three tools return three time formats: epoch, ISO, and a numeric status code.

| Tool returns | Hook rewrites |
|---|---|
| `1755300000000` | ISO 8601 |
| ISO | unchanged |
| `status: 3` | `refunded` |

Refund above 500: the hook blocks and points to `escalate_to_human`. A bare block stalls the agent.

### Code

```python
def post_tool_use(name, result):
    if name == "get_customer" and isinstance(result.get("created"), int):
        result["created"] = to_iso(result["created"])
    if name == "billing" and isinstance(result.get("status"), int):
        result["status"] = {3: "refunded"}.get(result["status"], "unknown")
    return result
```

### Hands-on

1. Write a gate for a money-moving tool.
2. Write a five-field handoff for a real case.
3. Write a hook normalising an unusual format.
4. Write a blocking hook with a redirect.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write the gate | 20 min | The error names the supplying tool |
| 2 | Write the handoff | 15 min | No transcript needed |
| 3 | Write two hooks | 25 min | One normalises, one blocks |

### Pitfall

Strengthening the system prompt for a rule that must hold 100% of the time. Prompts are probabilistic.

---

## 10 · Sessions, Built-in Tools, Configuration Memory

**Objectives**

- Choose resume, fork or a fresh session by staleness.
- Match the built-in tool to the question.
- Place rules at the right tier and scope.

### Theory

| Situation | Choice |
|---|---|
| Context still valid | Resume |
| A few files changed, known which | Resume with targeted reanalysis |
| Baseline changed broadly | Fresh session with a summary |
| Several branches must not cross | Fork |

| Question | Tool |
|---|---|
| Where does this string live | grep |
| Which files match a pattern | glob |
| What is in this file | read |
| Change exactly one spot | edit with a unique anchor |

If the anchor is not unique, widen it with surrounding context. For a small file with many changes, read then write.

| Rule | Scope |
|---|---|
| Whole team | Project, committed |
| Personal | User |
| Per file type | Rule with `paths` glob |
| Per directory | `CLAUDE.md` in that directory |

### Example

An overnight refactor moved 40 files.

| Approach | Result |
|---|---|
| Resume silently | Confident answers about paths that no longer exist |
| Resume, naming three changed files | Re-reads only those three |
| Fresh session with a summary | Keeps conclusions about unchanged code |

Forty directories each holding a copy of the test convention drift apart. One rule with `**/*.test.tsx` replaces all forty.

### Code

```yaml
---
paths: ["**/*.test.tsx"]
---
All tests use testing-library, not enzyme.
```

```json
{
  "context": "fork",
  "allowed-tools": ["Read", "Grep"],
  "argument-hint": "<module path>"
}
```

### Hands-on

1. For three situations, choose resume, fork or fresh.
2. Write a resume message naming changed files.
3. Write a `paths` rule and verify when it loads.
4. Write frontmatter for a large-output skill.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Choose a session for three cases | 10 min | Based on staleness |
| 2 | Write a glob rule | 15 min | Loads on matching files only |
| 3 | Write frontmatter | 15 min | Tool scope is limited |

### Pitfall

Always resuming because it looks cheaper. With stale data it costs more, because wrong conclusions must be unwound.

---

## 11 · From Plan Mode to Multi-Pass Review

**Objectives**

- Choose plan or direct by three signals.
- Replace prose with examples and tests.
- Design CI output and incremental review.

### Theory

Plan mode when: several valid approaches exist, an architectural decision is involved, or the blast radius is wide. Size is not a signal.

| Signal | Mode |
|---|---|
| Several approaches, wide scope | Plan, then execute |
| Obvious approach, one file | Direct |
| Unknown codebase | Plan plus explore subagent |

| Problem | Fix |
|---|---|
| Three runs, three results | Replace prose with input/output pairs |
| Vague bug report | A concrete test case |
| Missing constraints | Interview before writing code |

CI:

| Part | Value |
|---|---|
| Unattended | `-p` |
| Machine-readable | `--output-format json` |
| Contract | `path`, `line`, `severity`, `issue`, `fix` |

Incremental review: supply the previous output, report only deltas. Independent review: a session other than the one that wrote the code.

Batch: only for work that tolerates up to 24 hours. Results arrive unordered; correlate by `custom_id`.

Multi-file review: per-file passes plus one integration pass. The problem is attention dilution, not capacity.

### Example

A 14-file review in one pass: the first file is thorough, the last is skimmed, and the same pattern is criticised in file 3 and approved in file 11. Fix it with 14 file passes plus one integration pass.

### Code

```bash
claude -p "Review staged diff, output JSON per schema" \
  --output-format json \
  --allowedTools "Read,Grep,Glob"
```

```python
requests = [{
  "custom_id": f"ticket-{i}",
  "params": {"model": "claude-opus-5-5", "max_tokens": 512,
             "messages": [{"role": "user", "content": t}]},
} for i, t in enumerate(tickets)]
job = client.beta.messages.batches.create(requests=requests)
```

### Hands-on

1. Score three tasks against the plan signals.
2. Replace one vague instruction with three input/output pairs.
3. Write a CI command with a schema.
4. Run a review twice, the second time reporting deltas only.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Score tasks by signal | 10 min | Each gets a mode |
| 2 | Write three example pairs | 15 min | Two people agree on output |
| 3 | Run an incremental review | 20 min | No duplicate comments |

### Pitfall

Skipping the integration pass. A review without it misses cross-file defects.

---

## 12 · Escalation, Multi-Agent Errors, Reliability

**Objectives**

- Escalate for the right three reasons.
- Propagate errors a coordinator can act on.
- Segment accuracy and preserve provenance.

### Theory

Exactly three escalation triggers: the customer asks, policy is silent or needs an exception, or no meaningful progress was made after investigation.

| Not a trigger | Why |
|---|---|
| A complex case | Clear policy means the agent can handle it |
| An upset customer | Emotion does not measure authority |
| Low confidence | Models are confidently wrong on hard cases |

A failing subagent returns: failure type, attempted query, partial results, alternatives. An empty result is not a failure.

| Problem | Fix |
|---|---|
| Context degradation | Scratchpad, phase summaries, a manifest |
| Aggregate accuracy hides errors | Segment by document type and field |
| Uncalibrated confidence | Calibrate against a labelled set |
| Conflicting sources | Return both with sources, never average |
| Provenance lost in summarisation | Claim, evidence, URL, date through every step |

### Example

| Situation | Verdict |
|---|---|
| Damaged item, photos, clear policy | Handle it |
| Refund after 45 days, policy says 30 | Escalate |
| 90% of invoices at 99%, 10% handwritten at 79% | Keep humans on the handwritten segment |
| Two sources say 4.2bn and 7.1bn | Return both with method and date |

### Code

```python
return {
    "status": "error",
    "failure_type": "timeout",
    "query_attempted": q,
    "partial_results": found,
    "alternatives": ["rephrase_query", "different_engine"],
}
```

### Hands-on

1. Classify six cases by the three triggers.
2. Write a four-field error payload.
3. Split a pipeline into segments with separate accuracy.
4. Write the claim/evidence/URL/date schema.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify six escalations | 10 min | None is emotional |
| 2 | Write the error payload | 15 min | All four fields present |
| 3 | Segment accuracy | 15 min | Each segment has its own rate |

### Pitfall

Averaging two conflicting sources. The number belongs to no source, and the disagreement, which is the useful finding, is lost.
