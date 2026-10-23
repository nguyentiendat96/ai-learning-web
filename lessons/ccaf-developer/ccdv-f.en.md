# Claude Certified Developer: Foundations (CCDV-F)

A 16-lesson curriculum built from the "CCDV-F: The Full Exam Prep Course" (178 minutes) and checked against Anthropic documentation, October 2026. Source: [CCDV-F course video](https://www.youtube.com/watch?v=Lan-CbQ2IKM).

Each lesson has: objectives, theory, example, code, hands-on, exercises, pitfalls. The exam material lives separately under [Exam](exam.html).

## The four decisions

| Decision | Covers | Approx. |
|---|---|---|
| What runs | agent or workflow, tools, MCP | 13 questions |
| How the call is made | messages, streaming, batch, tier, cost | 12 questions |
| What the model sees and says | context, prompt, output schema | 13 questions |
| Whether it survives production | requirements, lifecycle, debugging, security | 14 questions |

Two rules used throughout:

1. **Constraint rule.** The stem names the binding constraint; the answer is the mechanism built for it. Generic knobs are distractors.
2. **Guarantee rule.** When the stem says `must`, `never`, `always` or `cannot` about what the model may do, every option that needs the model's cooperation is wrong.

---

## The eight official domains

| Domain | Weight | Lessons |
|---|---|---|
| Applications and Integration | 33.1% | 02, 04, 06, 09 |
| Model Selection and Optimization | 16.8% | 02, 03, 10, 11 |
| Agents and Workflows | 14.7% | 14, 15 |
| Prompt and Context Engineering | 11.0% | 07, 08, 09 |
| Tools and MCPs | 10.6% | 12, 13 |
| Security and Safety | 8.1% | 16 |
| Claude Code | 3.1% | 04, 06 |
| Eval, Testing, Debugging | 2.6% | 09 |

Domain 2 is the largest and the most under-read, because half of it is ordinary software engineering: REST, versioning, review, idempotent retries, and the fact that editing a prompt in production is a deployment.

## 01 · Every Question Is One of Four Decisions

**Objectives**

- Classify a question into one of the four decisions.
- Apply both distractor rules.
- Explain why a prompt is not a control.

### Theory

| Decision | Question inside | Example |
|---|---|---|
| What runs | workflow or agent, which tools, MCP or copy | Refund tool wired into the loop |
| How the call is made | sync or stream, realtime or batch, which tier | 10,000 tickets overnight |
| What the model sees | system, context, schema | Dashboard needs fields, not prose |
| Whether it survives | requirements, lifecycle, debugging, security | Prototype on a laptop |

| Rule | Signal | Action |
|---|---|---|
| Constraint | Stem says cost, overnight, "must not change model" | Pick the mechanism built for it |
| Guarantee | `must`, `never`, `always`, `cannot` | Prompt and classifiers are out; hooks, permissions, schema survive |

A business rule written in a prompt works "most of the time", and most of the time is not a control when money moves.

### Example

A ticket contains hidden text asking the model to refund the whole order. Requirement: ticket text must never trigger the refund tool.

| Option | Kind | Verdict |
|---|---|---|
| Add a line to the system prompt | Request | Wrong, can be talked around |
| Switch to the most capable model | Knob | Wrong, unrelated |
| Set temperature to zero | Knob | Wrong |
| Treat ticket text as untrusted, block with a hook | Control | Correct |

### Code

```python
def before_tool_call(name: str, args: dict, session) -> None:
    if name == "refund_order" and not session.verified_customer_id:
        raise PermissionError(
            "Missing verified customer ID. Call get_customer first."
        )
```

The point is placement, outside the model, where it cannot be persuaded.

### Hands-on

1. Take six sample questions.
2. Label each with its decision.
3. For three items containing `must`/`never`, strike every option that needs the model's cooperation.
4. Compare with the key and note misclassifications.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify eight items into four decisions | 10 min | None gets two labels |
| 2 | Rewrite both rules in your own words | 5 min | Each has an example |
| 3 | Find three generic knobs in a paper | 10 min | Each names the constraint it violates |

### Pitfall

Reading the options first. The most reasonable-sounding option is usually the generic knob that fits every question, so it fits none.

---

## 02 · One Ticket, One Call

**Objectives**

- Read all four response fields.
- Know that `max_tokens` is a ceiling, not a target.
- Understand why identical output cannot be forced.

### Theory

The model writes one token at a time, choosing among plausible continuations. There is no plan behind it. Tokens are not words.

| Field | Meaning | Use |
|---|---|---|
| `content` | List of blocks | Read the answer, branch on `type` |
| `stop_reason` | Why it stopped | Decide whether the answer is usable |
| `usage` | Input, output, cache tokens | Cost and cache detection |
| `id` | Request id | Support, log correlation |

Request structure:

| Part | Where | Note |
|---|---|---|
| Standing rules | `system` | Outside the messages |
| Turns | `messages` | user and assistant alternate |
| Two user turns in a row | Folded into one | No error raised |

Determinism: identical input can yield different wording. Temperature has been removed on the newest models, so do not chase identical output; assert on structure.

### Example

A summary cut mid-sentence, with no error.

| Check | Value | Conclusion |
|---|---|---|
| HTTP status | 200 | Not a transport error |
| `stop_reason` | `max_tokens` | Truncated |
| `usage.output_tokens` | Equal to the ceiling | Confirmed |

Fix: raise the ceiling, re-run, and check `stop_reason` on every call.

### Code

```python
import anthropic

client = anthropic.Anthropic()

msg = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system="You are a support assistant. Never invent order ids.",
    messages=[{"role": "user", "content": ticket_text}],
)

print(msg.stop_reason)
print(msg.usage.input_tokens, msg.usage.output_tokens)

if msg.stop_reason == "max_tokens":
    msg = client.messages.create(
        model="claude-opus-5-5",
        max_tokens=4096,
        system="You are a support assistant. Never invent order ids.",
        messages=[{"role": "user", "content": ticket_text}],
    )

text = "".join(b.text for b in msg.content if b.type == "text")
```

Note the last line: filter by `type`, do not take `content[0]`, because with thinking enabled the first block is thinking.

### Hands-on

1. Send a request with `max_tokens=16` to force truncation.
2. Print `stop_reason` and `usage`.
3. Raise the ceiling, re-run, compare.
4. Write a structure assertion and run it five times.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Force `max_tokens` then fix it | 10 min | Old and new ceilings named |
| 2 | Write a structure test | 15 min | Passes five consecutive runs |
| 3 | Price three requests from `usage` | 10 min | Matches the price table |

### Pitfall

Ignoring `stop_reason`. A truncated answer nobody notices is worse than an error.

---

## 03 · Streaming, Vision, Thinking

**Objectives**

- Read a stream's event order.
- Place the image block correctly.
- Count thinking as output cost.

### Theory

Streaming does not make the model faster; it changes when the text appears. A non-streaming call returns only when the last token is written, so long calls can exceed timeouts.

| Event | Content |
|---|---|
| `message_start` | Opens the response, names the model |
| `content_block_start` | Opens a block, carries its index |
| `content_block_delta` | Text or JSON fragment |
| `content_block_stop` | Closes the block |
| `message_delta` | Final `stop_reason` and usage |
| `message_stop` | Ends the stream |

The API uses one-way server-sent events. There is no websocket; an option offering one is a distractor.

Vision: an image is a block in `content`, placed before the question. Images are split into patches and cost tokens; if you already have the text, send the text. A PDF is counted twice: text plus each page rendered as an image.

Thinking: reasoning tokens are billed as output and count against `max_tokens`.

### Example

A console calls the model with long tickets and a large output ceiling; agents need to see progress.

| Option | Result |
|---|---|
| Raise the timeout | Still silent |
| Stream | First words appear in seconds |
| Split the ticket | Does not solve visible progress |
| Lower the ceiling | Loses content |

### Code

```python
with client.messages.stream(
    model="claude-opus-5-5",
    max_tokens=2048,
    messages=[{"role": "user", "content": "Explain the context window."}],
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            print(event.delta.text, end="", flush=True)
    final = stream.get_final_message()
```

```python
import base64

with open("receipt.jpg", "rb") as f:
    img = base64.b64encode(f.read()).decode()

resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image",
             "source": {"type": "base64", "media_type": "image/jpeg", "data": img}},
            {"type": "text", "text": "Extract the total and the date as JSON."},
        ],
    }],
)
```

### Hands-on

1. Run a stream and print each event type.
2. Count deltas against the final text length.
3. Send one image and compare input tokens with a text-only request.
4. Enable thinking and compare `usage`.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Print the six event types in order | 20 min | Order matches the table |
| 2 | Compare image and text cost | 15 min | Both token counts recorded |
| 3 | Confirm thinking is billed as output | 10 min | The field is named |

### Pitfall

Options mentioning websockets or two-way streams. This API is one-way.

---

## 04 · The Quarter That Isn't About Claude

**Objectives**

- Separate functional and infrastructure requirements.
- Place a system in the right lifecycle stage.
- Recognise that most items here need no Claude knowledge.

### Theory

A quarter of the questions is ordinary software engineering.

| Type | Answers | Example |
|---|---|---|
| Functional | What the system does | Summarise tickets, read images, stream |
| Infrastructure | Where it runs, who operates it, how to roll back | Shared server, deploy, revert |

Four stages:

| Stage | Meaning | Check question |
|---|---|---|
| Develop | Build it | Who writes it? |
| Implement | Put it where users run it | Who deploys? |
| Operate | Run it daily | Who is on call at 2am? |
| Maintain | Change it safely over years | When is it retired? |

Production credit is earned in operate and maintain, never in develop.

### Example

A prototype runs on Daniel's laptop; the team needs to deploy, fix and roll back.

| Check | Result |
|---|---|
| Functional requirements | Met: summarise, stream, read images |
| Infrastructure requirements | All unmet |
| Stage | Still in develop |

### Code

No specific code. The exercise is to split a scenario into two columns on paper.

### Hands-on

1. Pick an internal tool.
2. Write both requirement lists.
3. For each infrastructure item, name its owner.
4. Decide the current stage, with evidence.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Split one requirement into two lists | 10 min | No item is in both |
| 2 | Place a real system in a stage | 10 min | Evidence is stated |
| 3 | Write three checkable infrastructure requirements | 10 min | Each has a check |

### Pitfall

Skipping this because "there is no Claude in it". It is the heaviest part of a whole quarter.

---

## 05 · The Three Surfaces

**Objectives**

- Know how each surface reads your instructions.
- Never place third-party data in `system`.
- Recognise that a `system` message role does not exist.

### Theory

The same sentence, "never promise a refund date", behaves differently in three places.

| Surface | Where your words land | Remember |
|---|---|---|
| Chat product | Layered over Anthropic's own system prompt | Behaviour does not transfer to the API |
| Coding tool | Arrives as a user message | No higher authority than later messages |
| API | The `system` field | No message may carry role `system` |

Third-party data goes in **tool results**, never pasted into system or mixed into user text. The reverse also holds: do not put your own instructions inside a tool result.

### Example

| Placement | Result |
|---|---|
| Prototype chat prompt | Works, because Anthropic's system prompt sits underneath |
| `CLAUDE.md` | Works, but at the same level as later messages |
| API message text | Wrong: the rule is treated as conversation |
| API `system` | Correct |

### Code

```python
# Right: standing rule in system
resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=512,
    system="Never promise a specific refund date.",
    messages=[{"role": "user", "content": ticket}],
)

# Wrong: rule inside the user turn
resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=512,
    messages=[{"role": "user",
               "content": "Never promise a refund date. " + ticket}],
)

# Wrong: role "system" inside messages does not exist
```

### Hands-on

1. Run the same rule on all three surfaces.
2. Record where it was ignored.
3. Move the rule to `system`, re-run.
4. Try a `system` message role and observe the error.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write one rule for three surfaces | 15 min | The weakest surface is named |
| 2 | Port a chat prototype to the API | 20 min | Rule lands in `system` |
| 3 | Classify six passages into system, user, tool result | 10 min | No third-party text in system |

### Pitfall

An option offering a message with role `system` describes an API that does not exist. Eliminate it on sight.

---

## 06 · Same Repo, Three Different Claudes

**Objectives**

- Separate rule files from switch files.
- Know that rules stack and switches pick a winner.
- Fix "works on my machine".

### Theory

Two file kinds, four locations.

| Kind | Holds | Combination |
|---|---|---|
| `CLAUDE.md` | Written rules | Stack, broadest first |
| `settings.json` | Switches | Exactly one wins, by precedence |

Precedence: organisation > command line > `settings.local.json` > project `settings.json` > home.

| Detail | Behaviour |
|---|---|
| Lists in settings | Merge, do not replace |
| File in a subfolder | Loads when work reaches that folder |
| Editing `CLAUDE.md` mid-session | Takes effect next session |
| `settings.local.json` | Never committed |

Consequence: two contradictory `CLAUDE.md` rules raise no error; both live and the model chooses.

### Example

Three engineers, one repo, three behaviours.

| Cause | Check with |
|---|---|
| Rule sits in one person's home file | `/memory` |
| Different pinned models | Each machine's `settings.json` |
| Someone has a private `settings.local.json` | Compare repo files |

### Code

```json
{
  "model": "claude-opus-5-5",
  "permissions": {
    "deny": ["Bash(rm -rf *)", "Bash(git push --force*)"]
  }
}
```

Commit this so the team shares the model and the deny rules. Deny is a control; ordinary settings can be overridden from the command line.

### Hands-on

1. Run `/memory` and list loaded files.
2. Create a contradiction between a home and a project `CLAUDE.md`.
3. Observe both applying.
4. Pin the model in committed settings and test a second machine.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | List the four `CLAUDE.md` locations | 10 min | Confirmed with `/memory` |
| 2 | Create a two-layer contradiction | 15 min | Both rules are live |
| 3 | Pin the model | 10 min | A second machine matches |

### Pitfall

Assuming `CLAUDE.md` files override each other. They stack; only settings have a winner.

---

## 07 · Asking Is Not Making Sure

**Objectives**

- Place a technique on the request-to-guarantee line.
- Write few-shot examples correctly.
- Know that prefill is gone.

### Theory

One line: a request at one end, a structure that cannot produce anything else at the other.

| Approach | Position |
|---|---|
| Sentence in the prompt | Request |
| Allow "I do not know", require quotes | Better request |
| Three different few-shot examples | Stronger |
| Schema constraining output | Near the guarantee end |
| Prefill the assistant turn | Removed, returns an error |

Few-shot done right: several examples, genuinely different, each wrapped in its own tag so they do not blur into the instructions.

Placement:

| Content | Where |
|---|---|
| Role, standing rules | `system` |
| Examples | In `system` or before the ask |
| Long document | Start of the user turn |
| Question | End of the user turn |

A tool description is also a prompt: it is the only thing the model reads when choosing a tool.

### Example

Every answer must start with a fixed structure.

| Option | Result |
|---|---|
| Add an instruction | Mostly correct |
| Prefill an opening brace | Error on current models |
| Schema | Shape guaranteed |
| Validate after receipt | Still required |

### Code

```python
SYSTEM = """You classify tickets.
<examples>
<example><input>Order has not arrived</input><output>{"category":"shipping","urgent":false}</output></example>
<example><input>Charged twice</input><output>{"category":"billing","urgent":true}</output></example>
<example><input>Unclear</input><output>{"category":"unclear","urgent":false}</output></example>
</examples>
Return exactly one JSON object, nothing else."""

resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=256,
    system=SYSTEM,
    messages=[{"role": "user", "content": ticket}],
)
```

### Hands-on

1. Write three genuinely different examples.
2. Run 10 inputs, count format failures.
3. Remove one example, re-run, compare.
4. Swap document and question order, compare.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write three different examples | 20 min | No two are near-duplicates |
| 2 | Measure format failures before and after | 15 min | Numbers recorded |
| 3 | Swap document order | 10 min | Difference stated |

### Pitfall

Assuming a prompt instruction is a guarantee. When the stem says "must", the answer is a mechanism.

---

## 08 · A Bigger Window Makes It Worse

**Objectives**

- Explain context rot.
- Distinguish the two overflow cases.
- Choose between pruning, compaction and redesign.

### Theory

The API remembers nothing; every turn resends the whole conversation. Cost grows and older detail sinks.

| Phenomenon | Meaning |
|---|---|
| Context rot | A fuller window is a less reliable one |
| Input exceeds the window | Request rejected before running |
| Input plus `max_tokens` exceeds | Runs, stops partway, `stop_reason` reports it |
| Lost in the middle | Detail in the middle is skipped more often |

Four ways to fight tool-driven bloat:

| Approach | Effect |
|---|---|
| Load fewer tools, call them from code | Fewer repeated definitions |
| Cache the stable prefix | Lower read cost |
| Prune old tool results | Cuts what is sent, not your records |
| Compaction | Replaces history with a summary block, records unchanged |

Two compaction edges: the summarising step can call a tool and return an empty block; and the summary is written by the same model you are calling, so a cheaper summariser cannot be substituted.

### Example

A 40-turn conversation forgets a refund promise made at turn 6.

| Approach | Result |
|---|---|
| Bigger window | Still buried, more expensive |
| Prune old tool results | Keeps the important part |
| Compaction | Keeps the thread, check the block is non-empty |
| Separate case-facts block | Best for amounts, dates, order ids |

### Code

Measure first:

```python
resp = client.messages.create(...)
u = resp.usage
print("in", u.input_tokens,
      "cache_read", u.cache_read_input_tokens,
      "cache_write", u.cache_creation_input_tokens)
```

If `input_tokens` climbs every turn, history is not being trimmed.

### Hands-on

1. Measure token usage by source in a long conversation.
2. Identify the largest source.
3. Prune old tool results, measure again.
4. Confirm your own records are intact.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Measure four token sources | 15 min | Each has a number |
| 2 | Prune and re-measure | 15 min | Records are still complete |
| 3 | Cause an overflow and read `stop_reason` | 10 min | The two cases are distinguished |

### Pitfall

Enlarging the window. A full window lowers accuracy, it does not only raise cost.
---

## 09 · The Three Places a Call Can Break

**Objectives**

- Locate a failure in the integration layer or the model layer.
- Know that a schema is not an absolute guarantee.
- Parse a streamed tool call correctly.

### Theory

A call passes four stages: code sends, model answers, parser reads, app renders. Failures sit in only three places.

| Where it broke | Readable signal | Layer |
|---|---|---|
| Never ran | HTTP 400, 401, 429, 5xx | Integration |
| Ran and stopped early | `stop_reason` | Model |
| Ran normally, body unusable | No signal | Yours |

Schema compliance is guaranteed in most cases, with documented exceptions: the model may refuse, output may be truncated, and an enum value may come back in different casing.

Two different questions:

| Question | Answer |
|---|---|
| How do I guarantee the shape? | Schema |
| What does my code do on receipt? | Validate, because a schema makes the bad case rarer, not the parser optional |

### Example

A dashboard panel is empty and the call returned 200.

| Check | Finding |
|---|---|
| HTTP | 200, no error |
| `stop_reason` | `max_tokens` |
| Conclusion | Not a broken model; the ceiling is too low for this schema |

The harder case: `end_turn` but a missing field. That is your layer: the parser trusted the schema.

### Code

```python
import json

resp = client.messages.create(...)

if resp.stop_reason != "end_turn":
    raise RuntimeError(f"unexpected stop: {resp.stop_reason}")

text = "".join(b.text for b in resp.content if b.type == "text")

try:
    data = json.loads(text)
except json.JSONDecodeError as e:
    raise ValueError(f"unparseable body: {e}; raw={text[:200]}")
```

Streamed tool call: accumulate fragments, parse once when the block closes.

```python
buf = ""
async for event in stream:
    if event.type == "content_block_delta" and event.delta.type == "input_json_delta":
        buf += event.delta.partial_json
    elif event.type == "content_block_stop":
        args = json.loads(buf)
        buf = ""
```

### Hands-on

1. Cause a 400, a `max_tokens` stop and a parse failure.
2. Classify each into one of the three places.
3. Add validation after the schema.
4. Try parsing a fragment to see the fake error.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify six failures | 10 min | Each names its signal |
| 2 | Add validation after schema | 15 min | Parser is not skipped |
| 3 | Parse a streamed tool call | 15 min | No fragment parsing |

### Pitfall

Trusting the schema. It lowers the odds, it does not replace your parser.

---

## 10 · input_tokens Is Not Your Input

**Objectives**

- Read all four `usage` fields.
- Place the cache breakpoint correctly.
- Detect silent cache failure.

### Theory

Every request has a repeating front and a changing tail. Caching works on the front only.

| Field | Meaning |
|---|---|
| `input_tokens` | Content after the last breakpoint |
| `cache_creation_input_tokens` | Just written to cache |
| `cache_read_input_tokens` | Read from cache |
| `output_tokens` | Generated, including thinking |

Render order is fixed: tools, system, messages. Put the breakpoint after the last stable block.

| Silent failure | Detection |
|---|---|
| Prefix shorter than the minimum | No cache, no error; read the two cache fields |
| Changing content in the middle | Stable content after it loses caching |
| A timestamp in system | Every request is a new prefix |

### Example

| Cost approach | Verdict |
|---|---|
| Move to a cheaper model | Possible, but the stem forbids it |
| Shorten user messages | The small part |
| Send the document once and reference it | The API keeps no state |
| Cache the identical prefix | Correct |

### Code

```python
resp = client.messages.create(
    model="claude-opus-5-5",
    max_tokens=1024,
    system=[
        {"type": "text", "text": "You are a support assistant."},
        {"type": "text", "text": policy_document,
         "cache_control": {"type": "ephemeral"}},
    ],
    messages=[{"role": "user", "content": question}],
)

u = resp.usage
print(u.cache_creation_input_tokens, u.cache_read_input_tokens)
# Call 1: write > 0, read = 0
# Call 2: write = 0, read > 0
# read always 0: prefix too short, or something changes between calls
```

### Hands-on

1. Run three calls with the breakpoint after system.
2. Print both cache fields each time.
3. Move the breakpoint after the user turn, re-run.
4. Add a timestamp to system, re-run.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Place the breakpoint, read cache | 20 min | Calls 2 and 3 show reads |
| 2 | Misplace it, confirm zero | 10 min | Numbers recorded |
| 3 | Project monthly cost | 15 min | Assumptions stated |

### Pitfall

Caching without reading usage. Nothing errors; the bill is just higher.

---

## 11 · Batch: Results in Any Order

**Objectives**

- Choose the lane by "is anyone waiting", not by speed.
- Correlate results by `custom_id`.
- Retry only the failures.

### Theory

| Lane | When | Traits |
|---|---|---|
| Synchronous | Someone is waiting | Immediate, full price |
| Batch | Nobody is waiting | Cheaper, window up to 24 hours, no streaming |

| Detail | Value |
|---|---|
| Correlation | `custom_id` you assign |
| Result order | Not submission order |
| Status | `in_progress` to `ended` |
| `ended` | Does not mean every request succeeded |
| Expired | Unprocessed requests return `expired` |
| Cache | Best effort |

Disqualifiers: the stem requires streaming, or the agent makes multi-turn tool calls.

### Example

10,000 tickets, nothing needed before morning.

| Option | Result |
|---|---|
| 10,000 concurrent calls | Rate limited, full price anyway |
| Batch | Correct lane |
| Batch with realtime fallback on timeout | Unnecessary complexity |

### Code

```python
requests = [{
    "custom_id": f"ticket-{i}",
    "params": {
        "model": "claude-opus-5-5",
        "max_tokens": 512,
        "messages": [{"role": "user", "content": t}],
    },
} for i, t in enumerate(tickets)]

job = client.beta.messages.batches.create(requests=requests)

while client.beta.messages.batches.retrieve(job.id).processing_status != "ended":
    time.sleep(30)

for row in client.beta.messages.batches.results(job.id):
    if row.result.type == "succeeded":
        save(row.custom_id, row.result.message)
    else:
        retry_later(row.custom_id)
```

### Hands-on

1. Submit five requests with distinct `custom_id`s.
2. Poll until `ended`.
3. Print results keyed by `custom_id`, not order.
4. Fail one request and retry only that one.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Correlate results | 20 min | No positional matching |
| 2 | Isolate one failure | 15 min | Whole batch not resent |
| 3 | Compute submission cadence for an SLA | 10 min | Worst-case window used |

### Pitfall

Streaming inside a batch. Nobody is watching and the API does not support it.

---

## 12 · The Description Is the Interface

**Objectives**

- Write a description with four parts.
- Tell client, built-in and server tools apart.
- Return structured tool errors.

### Theory

Three of the four loop steps are your code; the model only picks a tool and fills arguments from what you wrote.

| Crosses the boundary | Role |
|---|---|
| `name` | Identifier |
| `description` | Prose, the only place explaining when to use it |
| `input_schema` | Argument shape |

| Tool kind | Runs on |
|---|---|
| Client tool you wrote | Your machine |
| Built-in (bash, text editor) | Your machine; prefer these |
| Server tool (web search) | Anthropic side |

A good description answers four questions: what it does, when to use it, when not to, what the parameters mean and what it cannot do.

### Example

| Missing | Symptom |
|---|---|
| "When to use" | The tool is skipped |
| "When not to use" | The tool fires on everything |
| Parameter descriptions | Customer names sent where order ids belong |
| Value format | `order 10,493` instead of `A10493` |

### Code

```python
tools = [{
    "name": "get_order_status",
    "description": (
        "Look up an order. Takes an order_id shaped ANNNNN, returns status and ETA. "
        "Use for order questions, not for account details or refunds."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "order_id": {"type": "string", "description": "Order id shaped ANNNNN, e.g. A10493"}
        },
        "required": ["order_id"],
        "additionalProperties": False,
    },
    "strict": True,
}]
```

```python
{"type": "tool_result", "tool_use_id": block.id, "is_error": True,
 "content": "Order not found. The id must be shaped ANNNNN."}
```

### Hands-on

1. Rewrite one tool description with all four parts.
2. Run 10 questions, count correct tool choices.
3. Remove the "when not to" sentence, re-run.
4. Return a bare error and observe the loop.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Write a four-part description | 20 min | It contains "when not to" |
| 2 | Measure correct-choice rate | 15 min | Before and after numbers |
| 3 | Compare structured and bare errors | 15 min | The agent recovers only with the first |

### Pitfall

Fixing tool choice by adding a line to the system prompt. The selection step only reads the description.

---

## 13 · An MCP Server Is Not a Bag of Tools

**Objectives**

- Draw host, client and server correctly.
- Distinguish the three primitives and who controls each.
- Choose a transport by server location.

### Theory

| Part | Role |
|---|---|
| Host | The app the person uses |
| Client | One per server; five servers means five clients |
| Server | Separate program exposing capabilities over one interface |

| Primitive | Controlled by | Example |
|---|---|---|
| Tools | Model | Order lookup |
| Resources | Application | Pull the refund policy |
| Prompts | User | Pick a reply template |

Transport: `stdio` on the same machine, streamable HTTP across machines. With `stdio`, stdout carries protocol messages only; logs go to stderr.

### Example

Copying a tool into a second app. When the system changes, one copy is fixed and the other is not, and two customers get different answers for the same order.

### Code

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

Never paste a real token into the file, even if the file is gitignored.

### Hands-on

1. Draw host, client and server for three apps sharing one server.
2. Count the clients.
3. Sort six capabilities into the three primitives.
4. Run a `stdio` server and log to stderr.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Sort six capabilities | 10 min | Each names its controller |
| 2 | Write a secret-free config | 15 min | Grep finds no token |
| 3 | Move one copied tool to a server | 30 min | Both apps use one copy |

### Pitfall

Calling an MCP server a "bag of tools". Resources and prompts are not model-controlled.

---

## 14 · Usually Fewer Agents

**Objectives**

- Identify who picks the next step.
- Choose among five workflow shapes.
- Know when an agent loses explainability.

### Theory

| Position | Who picks the step |
|---|---|
| One call | No steps |
| Workflow | Your code |
| Agent | The model |

| Shape | Use when | What it costs |
|---|---|---|
| Prompt chaining | Sequential steps | Added latency |
| Routing | Several input types | Needs correct classification |
| Parallelization | Independent parts | Duplicated context |
| Orchestrator-workers | Subtasks unknown in advance | Model may split badly |
| Evaluator-optimizer | Clear criteria exist | Needs a bounded loop |

The last two are still workflows: the model picks content, code picks the path.

Decision question: if your code picks the next step, you are in a workflow. If you cannot predict the number of steps, you need an agent.

### Example

| Case | Verdict |
|---|---|
| 12 categories, explanation required | Routing |
| Investigating a failed nightly job | Agent |
| Content with clear grading criteria | Evaluator-optimizer |
| Six independent checks | Parallelization |

### Code

```python
MAX_ROUNDS = 3
draft = generate(task)

for _ in range(MAX_ROUNDS):
    verdict = evaluate(draft, criteria)
    if verdict.passed:
        break
    draft = revise(draft, verdict.fixes)

return draft
```

### Hands-on

1. Classify six systems.
2. For one real task, choose a shape and name the rejected one.
3. Measure cost of workflow versus agent on the same task.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify six systems | 15 min | Each names who picks the step |
| 2 | Choose a shape for one task | 15 min | The cost is stated |
| 3 | Measure both approaches | 20 min | Numbers recorded |

### Pitfall

Choosing an agent for flexibility. If explaining the path is a requirement, an agent is the wrong pick.

---

## 15 · Self-Hosted Is Not Air-Gapped

**Objectives**

- Separate the loop from the harness.
- Choose a build tier.
- Know where hooks run.

### Theory

| Concept | Meaning |
|---|---|
| Loop | Call model, run tool, return result, repeat |
| Harness | Tools, context management and execution environment around the loop |

| Tier | Who owns the harness | What you give up |
|---|---|---|
| Raw Messages API | You | Considerable work |
| Agent SDK | A library inside your process | Python or TypeScript only |
| Managed agents | Anthropic | Runtime control |

| Mechanism | Effect |
|---|---|
| Compaction | Summarises history; early instructions can be summarised away |
| `CLAUDE.md` | Reloaded every turn, not summarised |
| Resume | Keeps the session across runs |
| Hook | Runs at a fixed point, deterministically |

### Example

"Never delete anything without asking Priya." A prompt does not guarantee it; a hook before the tool does.

### Code

```python
from claude_agent_sdk import ClaudeAgentOptions, query

async for msg in query(
    prompt="Read the repo and list endpoints without tests.",
    options=ClaudeAgentOptions(
        allowed_tools=["Read", "Glob", "Grep"],
        system_prompt="You are a review engineer. Read only, do not edit files.",
    ),
):
    print(msg)
```

### Hands-on

1. Draw the loop and the harness for a running system.
2. Choose a build tier for one project.
3. Add a hook blocking a delete.
4. Confirm the hook runs before the tool.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Draw loop and harness | 15 min | The two layers are distinct |
| 2 | Choose a tier | 15 min | The trade is named |
| 3 | Add a blocking hook | 20 min | It runs before the tool |

### Pitfall

Assuming self-hosted means isolated. A server runs with your permissions and reaches what you reach.

---

## 16 · The Attack Arrives as a Ticket

**Objectives**

- Tell direct and indirect injection apart.
- Separate guidance from control.
- Order the four defence layers.

### Theory

| Kind | Who attacks | Inlet |
|---|---|---|
| Direct | The app's user | What they type |
| Indirect | Content the app fetches | Web pages, email, tool results |

The base rule: permissions are enforced by the tool, not by the model. A prompt shapes what the model **intends** to do, not what it **may** do.

| Layer | Guarantees? | Note |
|---|---|---|
| Least privilege | Yes | Decided before any call exists |
| Output classifier | No | Reduces risk, does not enforce |
| Permission rules | Yes | Deny outranks allow |
| Human approval | Yes | Only if the human can actually say no |

### Example

A ticket carries a pasted block asking for the customer list.

| Option | Verdict |
|---|---|
| Tell the model to ignore instructions in tickets | Guidance, can be talked around |
| Add a classifier | Reduces, does not guarantee |
| A tool that can read one order only | Control |
| A deny rule in settings | Strongest control |

### Code

```json
{
  "permissions": {
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl * | sh)",
      "Read(./.env)"
    ]
  }
}
```

```python
messages.append({
    "role": "user",
    "content": [{
        "type": "tool_result",
        "tool_use_id": block.id,
        "content": [{"type": "text", "text": fetched_page}]   # data, not instructions
    }],
})
```

### Hands-on

1. Classify five attacks as direct or indirect.
2. Write three defence layers for a data-reading tool.
3. Attempt an injection and record which layer stopped it.
4. Remove the strongest layer and retry.

### Exercises

| # | Task | Time | Pass criteria |
|---|---|---|---|
| 1 | Classify five attacks | 10 min | Each names its inlet |
| 2 | Write three layers | 20 min | At least two are controls |
| 3 | Test an injection | 20 min | The stopping layer is named |

### Pitfall

Putting a security rule in the prompt. When the stem says "must never", the answer is something that cannot be persuaded.
