---
description: Run the Ralph Wiggum autonomous PRD iteration loop
---

# Ralph Loop — Autonomous PRD-Driven Execution

Run the autonomous loop pattern popularized by Geoffrey Huntley and Ryan Carson.
Each iteration operates on a single user story from `prd.json`, verifies tests/lints/types, commits with atomic messages, records learnings to `progress.txt`, and loops until all stories pass.

## Workflow Modes

### 1. Planning Phase
- **Create a PRD**: Use `/prd` or trigger the PRD skill.
- **Convert to Ralph Format**: Use `/ralph` to convert `tasks/prd-[feature].md` to `scripts/ralph/prd.json` or root `prd.json`.
- **Verify Story Sizes**: Each user story MUST fit in a single context window.

### 2. Execution Phase
When the user requests running or executing Ralph:
1. Locate `prd.json` (check `./scripts/ralph/prd.json` or root `./prd.json`).
2. Read `progress.txt` (or initialize with `# Ralph Progress Log`).
3. Check `branchName` in `prd.json` and ensure git branch is created or checked out.
4. Find the highest priority user story where `passes: false`.
5. Implement that single story cleanly:
   - Read relevant codebase files first.
   - Follow project standards in `AGENTS.md`.
6. Run verification checks:
   - TypeScript: `npx tsc --noEmit`
   - Build / Lint / Test
   - Browser check (if frontend UI story)
7. If checks pass:
   - Git commit: `git commit -m "feat: [Story ID] - [Story Title]"`
   - Update `prd.json`: Set `passes: true` for the completed story.
   - Append learnings and changed files to `progress.txt`.
8. Check if all stories now pass:
   - If ALL stories are complete: Output `<promise>COMPLETE</promise>`
   - If stories remain: Prompt user or loop to the next story.
