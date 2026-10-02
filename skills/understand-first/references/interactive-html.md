# Interactive HTML

Use this guide when the developer needs to vary an input, compare alternatives, inspect state transitions, or explore a tradeoff.

## Make the interaction answer a question

Choose one central question, such as how a retry budget affects requests and wait time. Select controls that change the answer: a slider, option selector, step control, or before/after switch. Update the explanation as well as the visual so the developer can interpret the result.

Include:

- A short conclusion visible before interaction.
- A meaningful default scenario and a way to reset it.
- Labels, units, and bounds for every control.
- A visual or table that responds to the inputs.
- A concrete example and the relevant failure case.
- Nearby assumptions and source pointers.
- A text explanation that remains useful without the animation.

Do not add a dashboard of unrelated metrics. An interactive page is useful only if its controls expose the mechanism or decision.

## Keep disposable artifacts easy to use

For a small explainer, prefer one local HTML file with inline CSS, JavaScript, and SVG. Avoid build tools, external fonts, analytics, and network calls when they do not help the task. For a larger existing project, follow its conventions instead of forcing a one-file architecture.

Use semantic elements, visible keyboard focus, labeled controls, sufficient contrast, and a layout that works on narrow screens. Provide an alternative to color-only encoding. Honor reduced-motion preferences and give the reader control of playback. Do not autoplay audio.

Make simulated data and simplified models visible as such. Do not present random demo numbers as benchmark results. Keep source data separate from presentation and expose equations or rules when that helps the developer check the model.

## Scope and capabilities

Generate source and a local artifact when available. If the environment offers inline interactive rendering, use its documented mechanism. If only text output is supported, provide the HTML source and explain how to save it.

Keep the explainer separate from production behavior. Do not embed credentials or private material in a public page. Deployment and external services require authorization within the current task; a request for HTML alone does not imply publication.

## Verify the interaction

Open the page in an available browser. Exercise the main controls, reset behavior, and boundary values. Compare at least one worked result with the underlying rule. Inspect a narrow viewport and check keyboard operation. Investigate errors that affect the result.

If browser access is unavailable, check what the available tools permit and disclose that visual or interactive behavior is unverified. Do not describe a syntax check as a browser test.

Deliver the artifact with its central conclusion, the model's important assumptions, and the checks that actually ran. Keep the source editable.
