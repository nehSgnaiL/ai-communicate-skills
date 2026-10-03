---
name: communicate-clearly
description: Help human developers understand agent work, code behavior, architecture, debugging evidence, and technical tradeoffs. Use for explanations, review handoffs, or complex changes that need an inspectable mental model; choose clear prose, diagrams, interactive HTML, or a video explainer to fit the question. Keep routine status and simple answers brief.
license: MIT
---

# Communicate Clearly

Make the developer able to explain the mechanism, check the evidence, and make the next decision. Reduce the effort needed to understand agent output while continuing the requested work.

## Identify the understanding gap

Infer what the developer needs to understand from the task: what changed, why it works, where a failure happens, or how options differ. Use their language and level of detail. When the missing context would change the work, ask one focused question and continue independent work. Otherwise, make a reasonable assumption and state it when it affects the conclusion.

An explanation request can justify an explainer artifact. A routine fix usually needs a short handoff. Do not turn every task into an explainer project or delay authorized work for an unnecessary approval.

## Ground the explanation

Inspect the supplied code, diff, logs, data, or documents before describing their behavior. Separate observed facts, inferences, proposals, and unknowns. Attach file paths, symbols, test results, or primary-source links where they help the developer check a claim. Verify line numbers before citing them.

Show a concrete input and resulting behavior. For changes, explain the difference from the previous behavior and the relevant failure case. Report verification that actually ran and its limits. A polished artifact or plausible animation does not prove the system behaves that way.

## Choose a useful medium

Honor an explicit format request. Otherwise, choose the simplest medium that makes the mechanism inspectable. The formats below are options, not a required sequence or a ranking of quality. Combine them only when each adds understanding.

| Understanding gap | Useful output | Read when using this mode |
| --- | --- | --- |
| What happened? What should I do? | Concise prose, with a worked example if useful | [Clear writing](references/clear-writing.md) |
| How are parts connected? Where does control or data flow? | A diagram with a short caption | [Diagrams](references/diagrams.md) |
| What changes when I vary an input or compare alternatives? | An interactive HTML explainer | [Interactive HTML](references/interactive-html.md) |
| How does a process evolve over time? | A paced animation or narrated video | [Video explainers](references/video-explainers.md) |

Read only the guide needed for the selected mode. For a simple answer, apply the writing principles directly: concrete verbs, stable terminology, one main idea per sentence, and the result first.

## Build an inspectable artifact

Start with the developer's question. Give a useful default view, a concrete example, and evidence or assumptions next to the claim they support. Add detail where it explains a dependency, tradeoff, or failure condition. Keep implementation scaffolding out of the reader's way.

Use the tools already available. Prefer editable sources and local artifacts for disposable explainers. Keep supporting files together. Do not change production behavior just to illustrate it. An explainer request does not authorize deployment, uploading private code, installing a new service, or spending money beyond the existing scope.

If a required renderer or audio service is unavailable, deliver the most useful supported artifact and name the missing capability. Label a storyboard, simulation, or silent animation accurately; do not claim to have produced or verified a video that does not exist.

## Check comprehension and hand off

Check the artifact against the inspected sources. For a diagram, trace a real path through it. For an interactive page, exercise the main controls and boundary values. For a video, review the rendered sequence and timing. Explain anything that remains unverified.

Lead the handoff with the conclusion and a link or inline artifact. Add only the evidence, assumptions, material limitations, and next decision the developer needs. For implementation work, include what changed, why, and how it was checked. Do not invent a decision or ask a comprehension question when the task is already complete.

If the developer says the explanation is unclear, identify the missing relationship, example, or evidence and revise that part. More words alone are not a reliable fix. Stop expanding when the developer can understand the relevant behavior and the authorized task is complete.
