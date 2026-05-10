# GitHub repository rulesets (GitBattle)

These JSON files match the body shape for GitHub’s **[Create a repository ruleset](https://docs.github.com/en/rest/repos/rules#create-a-repository-ruleset)** REST API. Use them to recreate the same protections on **wenakanew/gitbattle** or a fork.

## Files

| File | Purpose |
|------|--------|
| [`default-branch.json`](default-branch.json) | **Recommended default:** blocks branch deletion and force-push; requires changes via **pull request**; allows squash/merge/rebase; **0** required reviewers (solo-friendly); rejects blobs **> 50 MB**. |
| [`default-branch-with-required-review.json`](default-branch-with-required-review.json) | Stricter: **1** approval, **CODEOWNERS** review when paths match [`.github/CODEOWNERS`](../../.github/CODEOWNERS), resolved review threads required — switch to this when you have regular collaborators. |
| [`release-tags.json`](release-tags.json) | Protects tags matching `v*` and `release-*` from deletion and force-updates. |

`~DEFAULT_BRANCH` targets whatever branch GitHub marks as default (usually `main`).

---

## Apply via GitHub UI

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset** (or tag ruleset).
2. Recreate the rules manually using the JSON as a checklist, **or**
3. Use the API / CLI below for an exact match.

---

## Apply via API (`gh` CLI)

Install [GitHub CLI](https://cli.github.com/), authenticate (`gh auth login`), then from the repo root:

```bash
# Default branch protection (edit owner/repo if needed)
gh api --method POST repos/wenakanew/gitbattle/rulesets \
  --input github/rulesets/default-branch.json

# Optional: release tags
gh api --method POST repos/wenakanew/gitbattle/rulesets \
  --input github/rulesets/release-tags.json
```

To **replace** an existing ruleset, note its numeric `id` from `gh api repos/wenakanew/gitbattle/rulesets` and use `PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}` with the same JSON body plus updates.

---

## Bypass actors (maintainers)

For **organization** repos you can add `bypass_actors` (teams, admin roles). On **personal** repositories, repository admins typically retain bypass capability through GitHub’s UI behavior; for API-created rulesets see **[bypass actors](https://docs.github.com/en/rest/repos/rules#create-a-repository-ruleset)** (`RepositoryRole`, `Team`, etc.) and set numeric `actor_id` values from the GitHub API.

---

## CI enforcement (later)

When GitHub Actions workflows exist, add a **`required_status_checks`** or **`workflows`** rule using the GitHub API — those need real **check names** or **`repository_id` + workflow path**. Extend these JSON files once CI is merged.

---

## Enforcement modes

- **`active`** — rules enforced (used here).
- **`disabled`** — stored but not enforced.
- **`evaluate`** — log-only (GitHub Enterprise).

See [About rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets).
