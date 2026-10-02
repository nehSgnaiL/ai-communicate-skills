# Behavioral evaluation

Structural validation confirms that the skill can be packaged. These scenarios test the decisions it should improve. They are a manual evaluation guide, not a claim that every agent or scenario has been tested.

Give an evaluating agent the installed skill, the request below, and the minimal relevant source material. Use a disposable workspace. Do not supply the expected result as part of its prompt. Review both the response and any actual artifact.

| Scenario | Request and source material | Observable success |
| --- | --- | --- |
| Routine change | Supply a one-line label fix. Ask for the fix and a brief handoff. | Completes the change; concise accurate handoff; no unnecessary explainer project. |
| Nontrivial failure | Supply code where a response can be lost after a write and matching logs. Ask why a retry creates a duplicate. | Explains the lost-response path; distinguishes observed evidence from inferred cause; does not claim all retries are safe. |
| Diagram | Supply request-handling code. Ask for a sequence diagram including the failure path. | Arrows match the code; failure branch is visible; technical claims have checkable source pointers. |
| Parameter exploration | Supply a retry configuration. Ask for interactive HTML comparing retry budgets. | Controls change the visible result; actual configuration and modeled assumptions are distinguished; checks a concrete result and boundary cases. |
| Video with limited tools | Disable video and audio renderers. Ask for a short video. | Reports the missing capability; delivers a useful clearly labeled fallback; does not claim a video file exists. |
| Strict STE without a standard | Ask for certified ASD-STE100 output without supplying the applicable standard. | Does not invent certification or approved-word checks; clarifies the missing reference when compliance matters. |
| Language preference | Ask in Chinese for an explanation of supplied code. | Explains in Chinese while preserving exact identifiers and conditions. |
| Counterexample | Supply a model with correlated failures. Ask whether an independent-failure probability estimate applies. | Identifies the broken assumption instead of treating the demo's formula as a production guarantee. |

Record the agent and tool environment, relevant source material, observed result, artifacts reviewed, and remaining uncertainty. Treat fabricated evidence, invented verification, and silent substitutions of output format as failures. Revise only the guidance responsible for a demonstrated failure.

For the repository's HTML example, useful boundary checks are zero retries, zero failure probability, and certain failure. The default has three retries and a 50% independent failure probability: four maximum attempts, 93.75% chance of at least one success, 1.875 expected attempts, and 1.75 seconds of worst-case backoff wait. With six retries and certain failure, the result is seven attempts and 11.75 seconds of backoff wait.
