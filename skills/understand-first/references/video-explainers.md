# Video explainers

Use this guide when time, movement, or paced visual reasoning materially helps, or when the developer explicitly requests a video.

## Design for understanding

Name what the viewer should understand at the end. Build a short sequence: the question, a concrete case, the mechanism, a failure or counterexample, and the resulting conclusion. Length should follow the topic and requested budget.

Use visual reasoning: build diagrams in stages, animate state changes, or map equations to a visible example. Requests for a 3Blue1Brown-like explainer can be interpreted as geometric intuition, paced construction, and synchronized explanation. Use original narration and assets; do not imply affiliation or reproduce a creator's identity.

Write a compact storyboard before rendering. Each scene should identify the displayed objects, the state change, the narration or on-screen text, and the evidence it depends on. Keep a transcript for readers who cannot use audio.

## Choose an available production path

| Capability | Useful path |
| --- | --- |
| A local animation and video renderer | Editable animation source and rendered video |
| HTML rendering and supported capture | Browser animation and captured video |
| Rendering without narration | Silent video with captions and transcript |
| No video renderer | Storyboard and editable animation source, clearly labeled as an unrendered fallback |

Tools such as Manim, an existing video framework, or FFmpeg can be useful when already available. Do not require a specific stack or install dependencies without considering the task's scope and environment.

## Narration

Use an authorized narration service when the developer requests it and credentials are available through the environment's supported mechanism. Keep keys out of source, artifacts, logs, and committed files. Sending project material to a narration provider and paid usage must fit the user's authorization.

If the developer asks for local or free narration, inspect the available local speech capabilities and verify any proposed dependency or license before installing it. Do not assume a cloud trial is free or that local compute is available. When narration is unavailable, a silent captioned video can still satisfy a request that permits it; otherwise report the limitation and deliver the useful fallback.

Do not hold completed independent work for a narration key. Do not label synthesized audio as a recording of a real person.

## Verify and deliver

Review the rendered video, not just the scene source. Check the start and end, important transitions, label readability, and the failure example. Listen to narration when present. Confirm that narration, captions, and visuals refer to the same state at the same time. Check output duration, audio presence, and supported encoding when tools permit.

Deliver the actual video and editable source, with a transcript or captions. If only a storyboard or source was produced, say exactly that. Mark any checks that could not run. Link technical claims to their supporting sources in the transcript or accompanying notes.
