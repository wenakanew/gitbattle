# Open source publishing checklist

Canonical repository: **[wenakanew/gitbattle](https://github.com/wenakanew/gitbattle)** (`git@github.com:wenakanew/gitbattle.git`).

## Repository configuration

- [x] Public repo created — [github.com/wenakanew/gitbattle](https://github.com/wenakanew/gitbattle)
- [ ] Set **default branch** to `main` (align with docs).
- [ ] Enable **GitHub Security Advisories** for private vulnerability reporting (**Settings → Security**).
- [ ] Optionally enable **Discussions** for community Q&A (update SUPPORT.md if you do).

## Sync local ↔ GitHub

Push everything from this workspace so GitHub has the same docs and templates:

```bash
git remote add origin https://github.com/wenakanew/gitbattle.git
# if origin exists: git remote set-url origin https://github.com/wenakanew/gitbattle.git
git push -u origin main
```

## Maintainer visibility

- [x] [**MAINTAINERS.md**](../MAINTAINERS.md) lists [@wenakanew](https://github.com/wenakanew) and **kaniujeffray@gmail.com**.

## Legal & compliance

- [ ] Confirm [**LICENSE**](../LICENSE) (MIT) still matches your intent.
- [ ] Update [**THIRD_PARTY_NOTICES.md**](../THIRD_PARTY_NOTICES.md) when `package.json` and assets exist.
- [ ] Kenya optional: voluntary copyright registration via [KECOBO / NRR](https://nrr.copyright.go.ke/) if you want a dated record.

## Community health

- [ ] Complete GitHub **Community Standards** (README, CONTRIBUTING, Code of Conduct, Security).
- [ ] Add repository **topics** (e.g. `git`, `education`, `multiplayer`, `game`, `socket-io`, `typescript`).

## Releases

After tagging **v0.1.0** on GitHub, confirm [CHANGELOG.md](../CHANGELOG.md) link resolves:  
https://github.com/wenakanew/gitbattle/releases/tag/v0.1.0
