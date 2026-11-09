# Karpathy Guidelines (LLM Coding Rules)

Derived from Andrej Karpathy's observations on reducing common LLM coding mistakes:

## 1. Think Before Coding
- **Don't assume. Don't hide confusion. Surface tradeoffs.**
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, propose it. Push back when warranted.
- If something is unclear, stop, name what is confusing, and clarify.

## 2. Simplicity First
- **Minimum code that solves the problem. Nothing speculative.**
- No features beyond what was explicitly asked.
- No abstractions or factories for single-use code.
- No speculative flexibility, configuration, or premature optimization.
- No error handling for impossible scenarios.
- If it can be done in 30 clean lines instead of 100, keep it simple.

## 3. Surgical Changes
- **Touch only what you must. Clean up only your own mess.**
- Do not "improve", reformat, or refactor adjacent, unrelated code or comments.
- Do not rewrite things that aren't broken.
- Match existing repository style and conventions.
- Remove variables, imports, or dead code created by your own changes; do not delete pre-existing dead code unless asked.
- Every changed line must trace directly to the user's request.

## 4. Goal-Driven Execution
- **Define success criteria. Loop until verified.**
- Formulate each task with clear verification steps.
- Always run available typechecks, builds, or browser verifications before declaring completion.

