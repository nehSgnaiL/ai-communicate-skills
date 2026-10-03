# Worked examples

These prompts show how to invoke the skill. Adapt the source material and requested depth to the actual work.

## Review a change

```text
Use $communicate-clearly to help me review this diff.
Explain the changed behavior with one concrete input.
Link the relevant source, state what was tested, and identify any
important failure case that the checks do not cover.
```

For a small change, a few clear sentences may satisfy the request. For a complex request path, a diagram can expose the mechanism.

## Trace a lost response

```text
Use $communicate-clearly with the supplied request-handler code and logs.
Draw the path where the server commits a write but the client receives
no response. Explain what a retry does and which claims are hypotheses.
```

See the [illustrative sequence diagram](../skills/communicate-clearly/references/diagrams.md). Its idempotency-key behavior is hypothetical unless the supplied implementation supports it.

## Explore retry parameters

```text
Use $communicate-clearly to make an offline HTML explainer of a retry policy.
Let me vary the retry budget and failure probability. Show total attempts,
success probability, expected request volume, and backoff wait.
Use a synthetic model and expose the assumptions and equations.
```

[retry-explainer.html](retry-explainer.html) is an original self-contained example. Download and open it locally. It has no network dependencies or external assets.

The example assumes independent failures with a fixed probability `p`, at most `r` retries, and a stop after the first success. It uses a 250 ms base delay, doubles the delay for each retry, and caps each delay at 4 seconds. It ignores request duration and server recovery. It makes no claim about a real service.

## Request a video

```text
Use $communicate-clearly to explain this state machine in a short video.
Build the diagram step by step and include the failure transition.
Use original visuals, provide captions and a transcript, and keep the
source editable. Use available local tools; tell me if rendering or
narration is unavailable.
```

This repository does not ship a rendered video. The [video guide](../skills/communicate-clearly/references/video-explainers.md) tells the agent how to choose an available production path and report its actual deliverable.
