# Clear writing

Use this guide for prose explanations, change handoffs, or a developer's request for STE-inspired writing.

## Default: relaxed technical clarity

Apply the readability intent of ASD-STE100 without claiming standards compliance. The project uses a relaxed style inspired by Karpathy's suggestion; it does not reproduce the standard or its controlled dictionary.

- Put the outcome before the implementation detail that explains it.
- Use one main idea per sentence. Prefer short sentences without forcing a fixed word count.
- Name the actor: the client retries, the worker writes, the cache expires.
- Use one term for one concept. Do not alternate between job, task, and request when they name different objects in the code.
- Prefer concrete verbs such as read, send, fail, and retry over abstract nouns.
- Keep code identifiers, units, equations, and conditions exact. Define necessary technical terms at first use.
- State the condition before a conditional instruction: when the token expires, request a new token.
- Distinguish cannot, may, and will. Preserve uncertainty and exceptions during simplification.
- Use numbered steps for an actual procedure and tables for comparable options. Keep a normal explanation in connected paragraphs when that reads better.
- Keep the user's language. In other languages, apply the clarity principles without calling the result ASD-STE100 English.

## Choose detail by the reader's job

A handoff can be a few sentences: the changed behavior, the reason, and the verification with any meaningful limit. A learning request may need a worked example or a diagram. Show public behavior first; include internals when they help the reader check the mechanism.

Example, using an illustrative retry configuration:

**Dense:** The retry policy implements bounded exponential backoff to mitigate transient upstream unavailability while avoiding uncontrolled request amplification.

**Clear:** The client retries a failed request at most three times. It waits longer before each retry. This gives the server time to recover. The client stops after the fourth failed attempt, including the first request.

The numbers in this example are hypothetical. Use inspected configuration when explaining a real system.

## When the developer asks for strict ASD-STE100

Use the applicable edition and approved vocabulary if the developer supplies them or they are available through an authorized source. Ask for the applicable reference when strict compliance is essential and unavailable. Do not invent approved-word status or treat model familiarity as validation. Label an unchecked draft as STE-inspired or unverified for compliance.

The phrase “80% of the way” is a style preference, not a measurable compliance score. Do not report invented percentages.

## Check the result

Read it as someone who did not perform the work. Can they identify the actor, the trigger, the outcome, and the exception? Did simplification preserve every condition that changes the behavior? Keep the explanation of evidence separate from guesses.

Official background: [ASD-STE100](https://www.asd-ste100.org/) and [the maintenance group's FAQ](https://www.asd-ste100.org/STE_faq.html). These are references, not a bundled copy of the standard.
