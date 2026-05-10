# Security policy

## Supported versions

GitBattle is in **early development**. Security fixes apply to the **latest release or default branch** once versioning is established. This section will be updated when stable releases exist.

| Version | Supported          |
|---------|--------------------|
| latest `main` | Yes (best effort) |
| older tags    | Case-by-case      |

---

## Reporting a vulnerability

**Please do not** open a public GitHub issue for security vulnerabilities.

Instead:

1. Use **[GitHub Security Advisories](https://github.com/wenakanew/gitbattle/security/advisories/new)** for this repository (also: **Security** tab → **Report a vulnerability**).
2. If that is unavailable, email **[kaniujeffray@gmail.com](mailto:kaniujeffray@gmail.com)** with subject `[SECURITY] GitBattle` (do not include exploit details in the subject line).

Include:

- Description of the issue and impact
- Steps to reproduce (or proof-of-concept) if safe to share
- Affected versions or commit, if known

We aim to acknowledge reports within **72 hours** and coordinate disclosure once a fix is ready.

---

## Project-specific expectations

Per the GitBattle design:

- User command input must **never** spawn a shell or execute real Git binaries — only **validated parsing** server-side.
- Authentication tokens must remain **HTTP-only** and **server-validated** on WebSocket connections (see proposal).

If you find deviations from these rules in the implementation, treat them as **high severity**.

---

## Safe harbor

We support **good-faith** security research that follows this policy. Do not access data that does not belong to you, degrade service for others, or perform destructive testing without written approval.
