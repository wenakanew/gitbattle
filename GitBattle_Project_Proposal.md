# GitBattle: A Real-Time Multiplayer 1v1 Battle Game for Learning Git
### Project Proposal — Version 1.0
**Author:** [Your Name]
**Course/Program:** Computer Science, Year 2
**Date:** May 2026

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Proposed Solution](#3-proposed-solution)
4. [Market & Competitive Analysis](#4-market--competitive-analysis)
5. [Core Concept & Game Design](#5-core-concept--game-design)
6. [Feature Specification](#6-feature-specification)
7. [System Architecture](#7-system-architecture)
8. [Database Design](#8-database-design)
9. [Tech Stack](#9-tech-stack)
10. [API Design](#10-api-design)
11. [Real-Time Communication Design](#11-real-time-communication-design)
12. [UI/UX Design Plan](#12-uiux-design-plan)
13. [Security Considerations](#13-security-considerations)
14. [Development Phases & Milestones](#14-development-phases--milestones)
15. [Risk Analysis](#15-risk-analysis)
16. [Scalability Considerations](#16-scalability-considerations)
17. [Success Metrics](#17-success-metrics)
18. [Future Roadmap](#18-future-roadmap)
19. [Conclusion](#19-conclusion)

---

## 1. Executive Summary

**GitBattle** is a real-time, multiplayer, browser-based strategy game in which players use actual Git commands — such as `git add`, `git commit`, `git push`, `git merge`, and others — as their battle mechanics. Each command maps to a specific in-game action: recruiting soldiers, launching attacks, retreating, scouting, or executing advanced tactical maneuvers.

The platform operates on a room-based model: an administrator (the server/game master) creates rooms, invites players who authenticate via GitHub OAuth, and manually or algorithmically selects 1v1 matchups. Non-playing participants can spectate ongoing matches in real time. A persistent leaderboard tracks player rankings across sessions.

The core philosophy of GitBattle is **learning through doing** — players are not reading about Git, they are typing Git commands under pressure, in a competitive context, with immediate visual feedback. The competitive stakes, time pressure, and the social element of spectators make the learning experience emotionally engaging and significantly more memorable than tutorials or documentation.

GitBattle fills a genuine gap in the existing developer education market: no product currently combines real Git command input, real-time competitive multiplayer, battlefield-style visualization, and GitHub-native authentication into a single cohesive experience.

---

## 2. Problem Statement

### 2.1 The Git Learning Problem

Git is arguably the most universally required tool in software engineering. Whether working at a startup, a large corporation, or on an open-source project, developers are expected to understand and use Git fluently from day one. Yet Git has a notoriously steep learning curve, particularly for:

- Understanding the staging area (`git add` → `git commit` pipeline)
- Branching and merging strategies
- Rebasing vs. merging debates
- Remote workflows (`push`, `pull`, `fetch`)
- Recovering from mistakes (`reset`, `revert`, `stash`)

### 2.2 Why Existing Solutions Fall Short

Current Git learning tools fall into one of two categories:

**Category 1 — Static/Passive Learning:**
Documentation (git-scm.com), YouTube tutorials, articles, and courses. These are passive — the learner reads or watches but does not practice under realistic pressure. Retention rates for passive learning are consistently low.

**Category 2 — Solo Interactive Games:**
Tools like "Oh My Git!", "git-game", "LearnGitBranching", "GitMastery", and "Game4Git" allow users to practice commands interactively. These are significantly better than static resources, but they are all single-player, completion-based experiences. They lack:

- Real-time pressure and urgency
- Social/competitive motivation
- Immediate consequences for using the wrong command
- The emotional memory that competitive experiences create

### 2.3 The Opportunity

There is a proven body of educational psychology research showing that competitive, social, and emotionally charged learning environments dramatically improve retention. Chess players remember openings better when they lose to them. Poker players internalize probability by losing money. The same principle — **consequences create memory** — applies to Git command learning.

No product currently applies this insight to Git education. GitBattle is built on exactly this principle.

---

## 3. Proposed Solution

GitBattle addresses the gap described above by making the learning of Git commands inseparable from the joy and stakes of competitive gameplay.

### 3.1 Core Value Proposition

- **Learning disguised as gaming:** Players focus on winning, not on memorizing syntax. The memorization happens as a side effect.
- **Immediate feedback loop:** Every command typed has an instant visual outcome on the battlefield. The cause-and-effect relationship between command and result is never ambiguous.
- **Social pressure as a learning amplifier:** Being watched by spectators and competing against a human opponent creates the emotional context that makes memories stick.
- **GitHub-native identity:** Logging in with GitHub means the game feels like a natural extension of the developer's existing identity and workflow, not a separate toy.

### 3.2 Target Audience

**Primary:** CS students (years 1–3) who have been introduced to Git but don't yet feel confident with it.

**Secondary:** Bootcamp students and self-taught developers who need to learn Git quickly.

**Tertiary:** CS educators who can use GitBattle in classrooms as an engagement tool during lab sessions.

---

## 4. Market & Competitive Analysis

### 4.1 Existing Competitors

| Product | Type | Multiplayer | Git Commands | Battlefield | Auth |
|---|---|---|---|---|---|
| Oh My Git! | Desktop game | No | Yes (card UI) | No | No |
| LearnGitBranching | Web tutorial | No | Yes | No | No |
| git-game | Terminal puzzle | No | Yes | No | No |
| GitMastery | Web game | No | Yes | No | No |
| Game4Git | Web sandbox | No | Yes | No | No |
| GitBattle (proposed) | Web game | **Yes (1v1)** | **Yes (direct input)** | **Yes** | **GitHub OAuth** |

### 4.2 Key Differentiators

GitBattle is the only product that simultaneously offers:

1. **Real typed Git command input** — not menus, not cards, not dropdowns. You type `git merge branch-name` and something happens on screen.
2. **Live 1v1 competitive format** — against another human, in real time.
3. **Spectator system** — social context amplifies the game experience.
4. **Room/admin system** — designed for structured use in classrooms and group sessions.
5. **GitHub OAuth** — identity rooted in the developer ecosystem.

### 4.3 Market Positioning

GitBattle is not trying to replace documentation or comprehensive Git courses. It is positioning itself as a **practice and retention layer** that sits on top of introductory Git knowledge. The ideal user has already heard of `git add` and `git commit` but hasn't internalized the full command set. GitBattle is where that internalization happens.

---

## 5. Core Concept & Game Design

### 5.1 The Battlefield

The battlefield is a 2D horizontal arena with two sides: Player A on the left, Player B on the right. Each side has:

- A **base** (represented visually as a repository icon/castle)
- A **troop formation** showing current deployed soldiers
- A **health bar** representing base integrity
- A **staging area** showing soldiers that have been added but not yet committed (deployed)

The battlefield is fully visible to both players and all spectators simultaneously. All troop movements and changes are animated in real time.

### 5.2 Command → Game Action Mapping

This is the heart of the game. Every typed command maps to a specific, thematically consistent game action:

| Git Command | Game Action | Effect |
|---|---|---|
| `git add <name>` | Recruit soldier | Adds 1 soldier to your staging area (not yet deployed) |
| `git add .` | Mass recruit | Adds 3 soldiers to staging area at once |
| `git commit -m "<msg>"` | Deploy troops | Moves all staged soldiers onto the battlefield. The `-m` message appears as a battle announcement |
| `git push` | Launch attack | Deployed troops charge the enemy. Damage calculated by troop count |
| `git pull` | Reinforce | Heals base by a small amount (simulates pulling in support) |
| `git merge <branch>` | Combine flanks | Doubles the power of your next attack |
| `git branch <name>` | Open new front | Creates a secondary attack lane for flanking |
| `git checkout <branch>` | Switch formation | Changes your active attack lane |
| `git stash` | Tactical retreat | Moves deployed troops back to staging (safe but loses momentum) |
| `git stash pop` | Re-engage | Brings stashed troops back to the battlefield |
| `git rebase` | Power formation | Reorganizes troops into optimal formation — next push does 1.5x damage |
| `git revert HEAD` | Undo last move | Cancels your last command (limited to 2 uses per match) |
| `git reset --hard` | Nuclear reset | Wipes your entire army (desperate last resort — for comeback mechanic) |
| `git cherry-pick <id>` | Defection | Converts 1 random enemy soldier to your side |
| `git log` | Intel | Reveals your opponent's last 3 commands in the spectator feed |
| `git diff` | Scout | Shows exact troop count difference between you and opponent |
| `git clone` | Call reinforcements | Summons a temporary NPC ally (5-second duration, once per match) |
| `git tag <name>` | Fortify position | Creates a defensive shield around your base (blocks next attack) |

### 5.3 Turn Structure

GitBattle uses a **simultaneous-input turn model**:

- Each turn lasts **30 seconds** (configurable by room admin)
- Both players type their commands at the same time
- Commands are submitted either by pressing Enter or when the timer expires
- The game engine resolves both commands simultaneously at the end of each turn
- Resolution order: Defensive commands → Recruitment → Deployment → Attacks
- Animations play out for approximately 5 seconds, then the next turn begins

This simultaneous model means players must anticipate their opponent's moves, not just react to them — introducing genuine strategic depth.

### 5.4 Win Conditions

A player wins if any of the following occur:

1. **Base Destruction:** The enemy base's health reaches zero through sustained attacks
2. **Troop Elimination:** The opponent has zero troops for 3 consecutive turns
3. **Forfeit:** The opponent disconnects or concedes
4. **Timeout:** After 15 turns, the player with the higher base health wins; if tied, troop count decides

### 5.5 Starting Conditions

- Each player begins with **1 soldier** already deployed on the battlefield
- Each player's base starts at **100 HP**
- No staging area troops at the start
- No special abilities unlocked at the start
- Turn 1 begins immediately after both players confirm readiness

### 5.6 Difficulty Tiers / Room Types

| Room Type | Commands Allowed | Turn Timer | Audience |
|---|---|---|---|
| Rookie | `add`, `commit`, `push`, `pull` | 45 seconds | Beginners, day 1 Git learners |
| Developer | + `merge`, `branch`, `checkout`, `stash` | 30 seconds | Students who know the basics |
| Senior | All commands | 20 seconds | Advanced users |
| Speedrun | All commands | 10 seconds | Competitive/experienced players |

---

## 6. Feature Specification

### 6.1 Authentication Module

- GitHub OAuth 2.0 login
- On first login, user profile is created: GitHub username, avatar, bio, public repo count
- Session management via JWT tokens stored in HTTP-only cookies
- Logout functionality
- No password system — GitHub is the sole identity provider

### 6.2 Player Dashboard

- View personal stats: matches played, won, lost, win rate
- View personal leaderboard rank
- View command usage breakdown (which commands they use most)
- View match history with command-by-command replay
- View earned badges
- Room browser: see available open rooms to join

### 6.3 Room System

**Admin/Server Side:**
- Create rooms with configurable settings: max players, room type/difficulty, turn timer, public/private toggle
- View all players in the waiting lobby
- Select any two players for a match (drag-and-drop or click-to-select)
- Pause/resume ongoing matches
- Force-end a match and declare a winner
- Remove/kick disruptive players
- View real-time stats for all ongoing matches
- Generate a shareable room invite link

**Player Side:**
- Join a room via room code or invite link
- See the waiting lobby (list of players in the room)
- See which players are currently in a match
- Wait for the admin to call their name for a match
- See a notification pop-up when selected for a match ("You have been called to the battlefield!")

### 6.4 Match/Battle System

- Live battlefield rendering showing troop positions and counts for both sides
- Command input text field with syntax highlighting
- Command validation with real-time feedback (invalid commands are rejected with an error message and a hint)
- Turn timer countdown (visible to both players and spectators)
- Turn resolution animations
- Battle log: a running feed of all commands used by both players (visible to spectators, hidden from players to prevent copying)
- Base health bars for both sides
- Troop count indicators
- Post-match result screen: winner, total turns, most effective command, stats summary

### 6.5 Spectator System

- All non-playing room members automatically become spectators for any ongoing match
- Spectators see the full battlefield, both players' troop counts, base health, and the battle log
- Spectators can react using emoji reactions (⚔️ 🔥 😱 👏) that briefly appear on screen
- Spectators cannot see either player's command input until after resolution
- Spectator count displayed on the battlefield

### 6.6 Leaderboard

- Global leaderboard across all rooms
- Room-specific leaderboard (scoped to a single room/session)
- ELO-based ranking system
- Columns: Rank, Player (GitHub avatar + username), Wins, Losses, Win Rate, Favourite Command, ELO Score
- Updated in real time as matches conclude
- Filterable by time period: all time, this week, today

### 6.7 Badge System

Badges are awarded for specific achievements and displayed on player profiles:

| Badge | Trigger |
|---|---|
| First Blood | Win your first match |
| Git Commit | Play 10 matches |
| Branching Out | Use `git branch` successfully in a match |
| Rebase God | Win a match using `git rebase` as the deciding blow |
| Cherry Picker | Convert an enemy soldier using `git cherry-pick` |
| Speed Demon | Win a Speedrun room match |
| The Tactician | Win 5 matches without using `git reset --hard` |
| Clutch Merge | Win with fewer troops at the halfway point |
| Sensei | Win 50 matches |

### 6.8 Command Parser

The command parser is a server-side module that:

- Accepts raw text input from the player
- Validates syntax against a whitelist of allowed commands
- Identifies the command type and arguments
- Returns a structured action object (e.g., `{ type: "RECRUIT", count: 1, source: "add" }`)
- Provides human-readable error messages for invalid or misspelled commands
- Does NOT execute real Git — it is a purpose-built parser for the game's command set

---

## 7. System Architecture

### 7.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│   React Frontend  ←→  Socket.IO Client  ←→  GitHub Auth │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                    SERVER (Node.js)                      │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  REST API    │  │ Socket.IO    │  │ Command       │  │
│  │  (Express)   │  │ Server       │  │ Parser Engine │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                 │                   │          │
│  ┌──────▼─────────────────▼───────────────────▼───────┐  │
│  │                  Game State Manager                 │  │
│  └──────────────────────────┬──────────────────────────┘  │
└─────────────────────────────┼───────────────────────────┘
                              │
        ┌─────────────────────┼──────────────────┐
        │                     │                  │
┌───────▼──────┐   ┌──────────▼────────┐  ┌──────▼──────┐
│  PostgreSQL  │   │     Redis          │  │  GitHub API │
│  (Persistent │   │  (Active game      │  │  (OAuth &   │
│   data)      │   │   state, sessions) │  │   profile)  │
└──────────────┘   └───────────────────┘  └─────────────┘
```

### 7.2 Key Architectural Decisions

**Why separate Redis from PostgreSQL?**
Active game state changes dozens of times per match (every turn resolution updates troop counts, health, command history). Writing this to PostgreSQL on every update would be slow and expensive. Redis is an in-memory store that handles these rapid, ephemeral updates instantly. Once a match ends, the final result is persisted to PostgreSQL.

**Why Socket.IO over raw WebSockets?**
Socket.IO adds automatic reconnection, rooms/namespaces, event-based messaging, and fallback support for environments where WebSockets are blocked — all of which are critical for a real-time multiplayer game.

**Why GitHub OAuth as the sole auth?**
The target audience (developers) already has GitHub accounts. Eliminating password management reduces friction, removes a security attack surface, and gives the game native access to the player's GitHub profile (avatar, username, bio) for a richer user experience.

### 7.3 Game State Manager

The Game State Manager is the core server-side module responsible for:

- Maintaining the canonical state of every active match
- Receiving resolved actions from both players at turn end
- Applying game logic (damage calculation, troop movement, ability resolution)
- Broadcasting updated state to both players and all spectators
- Detecting win conditions and triggering match-end flows
- Persisting match results to PostgreSQL when a match ends

---

## 8. Database Design

### 8.1 PostgreSQL Schema

**users**
```
id              UUID PRIMARY KEY
github_id       VARCHAR(255) UNIQUE NOT NULL
username        VARCHAR(255) NOT NULL
avatar_url      TEXT
github_bio      TEXT
elo             INTEGER DEFAULT 1000
matches_played  INTEGER DEFAULT 0
matches_won     INTEGER DEFAULT 0
created_at      TIMESTAMP DEFAULT NOW()
last_active     TIMESTAMP
```

**rooms**
```
id              UUID PRIMARY KEY
name            VARCHAR(255) NOT NULL
room_code       VARCHAR(8) UNIQUE NOT NULL
admin_id        UUID REFERENCES users(id)
room_type       ENUM('rookie', 'developer', 'senior', 'speedrun')
max_players     INTEGER DEFAULT 20
is_active       BOOLEAN DEFAULT true
is_public       BOOLEAN DEFAULT true
turn_duration   INTEGER DEFAULT 30 (seconds)
created_at      TIMESTAMP DEFAULT NOW()
```

**room_members**
```
id              UUID PRIMARY KEY
room_id         UUID REFERENCES rooms(id)
user_id         UUID REFERENCES users(id)
joined_at       TIMESTAMP DEFAULT NOW()
is_active       BOOLEAN DEFAULT true
```

**matches**
```
id              UUID PRIMARY KEY
room_id         UUID REFERENCES rooms(id)
player_a_id     UUID REFERENCES users(id)
player_b_id     UUID REFERENCES users(id)
winner_id       UUID REFERENCES users(id) NULLABLE
status          ENUM('pending', 'active', 'completed', 'aborted')
total_turns     INTEGER
player_a_hp     INTEGER (final)
player_b_hp     INTEGER (final)
started_at      TIMESTAMP
ended_at        TIMESTAMP NULLABLE
spectator_count INTEGER DEFAULT 0
```

**match_turns**
```
id              UUID PRIMARY KEY
match_id        UUID REFERENCES matches(id)
turn_number     INTEGER
player_a_command TEXT
player_b_command TEXT
player_a_troops  INTEGER (after resolution)
player_b_troops  INTEGER (after resolution)
player_a_hp      INTEGER (after resolution)
player_b_hp      INTEGER (after resolution)
resolved_at      TIMESTAMP
```

**badges**
```
id              UUID PRIMARY KEY
user_id         UUID REFERENCES users(id)
badge_type      VARCHAR(100)
awarded_at      TIMESTAMP DEFAULT NOW()
```

### 8.2 Redis Schema (Key Structure)

```
game:room:{roomId}:state          → Room metadata + player list
game:match:{matchId}:state        → Live game state (troops, HP, staging area, turn number)
game:match:{matchId}:turn:{n}     → Commands submitted for current turn
game:match:{matchId}:timer        → Turn countdown TTL key
session:{userId}                  → JWT session data
```

---

## 9. Tech Stack

### 9.1 Frontend

| Technology | Purpose | Why |
|---|---|---|
| React 18 + TypeScript | UI framework | Component model maps well to game UI; TypeScript catches bugs early |
| Vite | Build tool | Fastest dev server and build for React projects |
| Tailwind CSS | Styling | Rapid UI development without context-switching to CSS files |
| Framer Motion | Animations | Declarative, performant animations for troop movements and transitions |
| Socket.IO Client | Real-time comms | Event-based API for receiving game state updates |
| React Query | Data fetching | Caching and synchronization for REST API calls (leaderboard, history) |
| Zustand | Client state | Lightweight state management for game state and UI state |
| React Router | Navigation | Client-side routing between dashboard, room, battlefield |

### 9.2 Backend

| Technology | Purpose | Why |
|---|---|---|
| Node.js + Express | HTTP server & REST API | JavaScript on both ends; large ecosystem; async I/O suits WebSockets |
| Socket.IO | WebSocket server | Handles rooms, namespaces, reconnection out of the box |
| Passport.js | GitHub OAuth | Battle-tested middleware for OAuth flows in Express |
| JSON Web Tokens | Session auth | Stateless auth that works alongside WebSockets |
| Joi / Zod | Input validation | Validate all incoming REST API requests server-side |

### 9.3 Database

| Technology | Purpose | Why |
|---|---|---|
| PostgreSQL | Primary database | Relational model fits the game's entities; ACID compliance for match results |
| Prisma ORM | DB access layer | Type-safe queries; auto-generates types from schema; excellent for TS projects |
| Redis | Game state cache | In-memory speed for high-frequency game state updates |
| ioredis | Redis client | Most feature-complete Node.js Redis client |

### 9.4 Infrastructure & DevOps

| Technology | Purpose | Why |
|---|---|---|
| Railway | Deployment (backend + DB) | Dead-simple Node.js + PostgreSQL + Redis deployment; free tier available |
| Vercel | Deployment (frontend) | Zero-config React deployment; global CDN |
| GitHub Actions | CI/CD | Automated testing and deployment on push to main |
| Docker Compose | Local dev environment | Run Postgres + Redis locally without manual installation |
| dotenv | Environment management | Standard environment variable management |

### 9.5 Testing

| Technology | Purpose |
|---|---|
| Vitest | Unit tests for game logic (command parser, damage calculation) |
| Supertest | Integration tests for REST API endpoints |
| Playwright | End-to-end browser tests for critical flows (login, join room, match) |

---

## 10. API Design

### 10.1 Authentication Endpoints

```
GET  /auth/github               → Initiates GitHub OAuth flow
GET  /auth/github/callback      → OAuth callback; sets session cookie; redirects to dashboard
POST /auth/logout               → Clears session; returns 200
GET  /auth/me                   → Returns current authenticated user's profile
```

### 10.2 Room Endpoints

```
POST   /api/rooms               → Create a new room (admin only)
GET    /api/rooms               → List all public active rooms
GET    /api/rooms/:code         → Get room details by room code
POST   /api/rooms/:code/join    → Join a room as a player
DELETE /api/rooms/:id           → Close a room (admin only)
GET    /api/rooms/:id/members   → Get list of players currently in room
```

### 10.3 Match Endpoints

```
POST   /api/matches             → Start a match between two players (admin only)
GET    /api/matches/:id         → Get match details
GET    /api/matches/:id/turns   → Get full turn-by-turn history of a match
POST   /api/matches/:id/end     → Force-end a match (admin only)
GET    /api/users/:id/matches   → Get match history for a user
```

### 10.4 Leaderboard & Profile Endpoints

```
GET    /api/leaderboard                    → Global leaderboard (paginated)
GET    /api/leaderboard/room/:roomId       → Room-scoped leaderboard
GET    /api/users/:id                      → Get user profile + stats
GET    /api/users/:id/badges               → Get user's earned badges
GET    /api/users/:id/command-stats        → Get user's command usage breakdown
```

---

## 11. Real-Time Communication Design

### 11.1 Socket.IO Namespaces

```
/lobby          → General room lobby events (join, leave, player list updates)
/match          → Match-specific events (game state, turn resolution, battle log)
/spectate       → Spectator-specific events (read-only game state stream)
```

### 11.2 Event Specification

**Client → Server (player actions):**
```
submit_command      { matchId, command: string }
player_ready        { matchId }
request_surrender   { matchId }
spectate_match      { matchId }
```

**Server → Client (game events):**
```
room_update         { players: [], activeMatches: [] }
match_selected      { matchId, opponent: User }
match_start         { matchId, gameState }
turn_start          { turnNumber, timeLimit }
turn_resolved       { gameState, playerAAction, playerBAction, animations[] }
match_end           { winnerId, finalState, stats }
spectator_update    { spectatorCount }
battle_log_update   { entry: { player, command, result, turn } }
error               { code, message }
```

### 11.3 Game State Object (Broadcast to All Clients)

```json
{
  "matchId": "uuid",
  "turnNumber": 4,
  "playerA": {
    "userId": "uuid",
    "username": "octocat",
    "avatar": "https://...",
    "troops": 7,
    "staged": 2,
    "baseHp": 85,
    "revertsRemaining": 1
  },
  "playerB": {
    "userId": "uuid",
    "username": "torvalds",
    "avatar": "https://...",
    "troops": 4,
    "staged": 0,
    "baseHp": 100,
    "revertsRemaining": 2
  },
  "activeBranches": {
    "playerA": ["main", "attack-flank"],
    "playerB": ["main"]
  },
  "stashedTroops": {
    "playerA": 0,
    "playerB": 3
  },
  "status": "active",
  "timerEndsAt": "ISO timestamp"
}
```

---

## 12. UI/UX Design Plan

### 12.1 Page Map

```
/                       → Landing page (game description, Login with GitHub CTA)
/dashboard              → Player home (stats, recent matches, room browser, badges)
/rooms                  → Room browser (list of public rooms)
/rooms/create           → Room creation form (admin)
/rooms/:code            → Room lobby (waiting room, player list, admin controls)
/match/:id              → Active battlefield (game arena, command input, battle log)
/match/:id/spectate     → Spectator view (same battlefield, no command input)
/match/:id/results      → Post-match results screen
/leaderboard            → Global leaderboard
/profile/:username      → Public player profile (stats, badges, command history)
```

### 12.2 Battlefield Layout (Match Screen)

```
┌─────────────────────────────────────────────────────────────────┐
│  [Avatar A] octocat  HP: ████████░░ 85   ||   HP: ██████████ 100  torvalds [Avatar B]  │
├───────────────────────────────┬─────────────────────────────────┤
│                               │                                 │
│     🏰  [Troops A: 7]    ⚔️ ──→──  [Troops B: 4]  🏰          │
│      ▲▲▲▲▲▲▲                  │         ▲▲▲▲                   │
│   Staging: 2                  │      Staging: 0                 │
│                               │                                 │
├───────────────────────────────┴─────────────────────────────────┤
│  Turn 4  |  Timer: ⏱ 22s                                        │
├─────────────────────────────────────────────────────────────────┤
│  > git merge attack-flank_                [SUBMIT]              │
├─────────────────────────────────────────────────────────────────┤
│  BATTLE LOG (spectators only)          SPECTATORS: 👁 14        │
│  Turn 3: octocat used git push → 3 damage                       │
│  Turn 3: torvalds used git stash → 3 troops retreated           │
└─────────────────────────────────────────────────────────────────┘
```

### 12.3 Key UX Principles

- **Clarity above all:** The player should always know exactly what's happening and why. Every animation should have a clear cause (the command that triggered it).
- **Minimal distraction during turns:** During the 30-second input window, the UI should be focused on the command input. No distracting animations.
- **Mobile-aware but desktop-first:** The command input model requires a keyboard, so desktop is the primary target. Mobile can be supported for spectating.
- **Terminal aesthetic:** The command input area should feel like a terminal — monospace font, dark background, blinking cursor. This reinforces the "this is real Git" feeling.
- **Sound design:** Optional sound effects for troop deployments, attacks, command rejections, and match-end should enhance the emotional experience.

---

## 13. Security Considerations

### 13.1 Authentication Security

- All session tokens stored in HTTP-only, SameSite=Strict cookies. Never in localStorage.
- JWT secrets stored in environment variables, never in source code.
- GitHub OAuth state parameter validated on callback to prevent CSRF attacks.
- Token expiry set to 24 hours; refresh flow implemented.

### 13.2 Input Validation & Command Security

- All command input validated server-side against a strict whitelist.
- No actual Git processes are executed on the server. The command parser is a pure string processor that maps input to game actions. There is zero shell execution risk.
- Rate limiting applied to the command submission Socket.IO event (max 1 per player per second) to prevent command flooding.
- Input length hard-capped at 200 characters.

### 13.3 WebSocket Security

- All Socket.IO connections require a valid JWT in the handshake.
- Server verifies that the user is actually a member of the room they're connecting to.
- Players cannot emit game events unless they are an active participant in the relevant match. Server checks this on every event.
- Admin events (start match, kick player, close room) verified server-side that the requester is the room's admin.

### 13.4 General Security

- HTTPS enforced in production (Vercel and Railway handle TLS termination).
- Helmet.js middleware on Express for standard HTTP security headers.
- SQL injection prevention via Prisma's parameterized queries.
- No user-generated content is executed or directly injected into HTML (XSS prevention via React's default escaping).

---

## 14. Development Phases & Milestones

### Phase 1 — Foundation (Weeks 1–3)

**Goal:** Get the skeleton running. Nothing game-related yet — just infrastructure.

- [ ] Initialize monorepo (frontend + backend in one repo, separate packages)
- [ ] Set up Express server with TypeScript
- [ ] Set up React + Vite + TypeScript frontend
- [ ] Implement GitHub OAuth login with Passport.js
- [ ] Design and migrate PostgreSQL schema with Prisma
- [ ] Set up Redis with Docker Compose for local dev
- [ ] Deploy a "Hello World" version to Railway + Vercel
- [ ] Set up GitHub Actions CI pipeline

**Milestone:** Users can log in with GitHub and see their profile on a basic dashboard.

---

### Phase 2 — Room System (Weeks 4–5)

**Goal:** Players can create rooms, join them, and see each other in a lobby.

- [ ] REST API for room creation, joining, and listing
- [ ] Socket.IO lobby namespace — real-time player list updates
- [ ] Room lobby UI (player cards, admin controls)
- [ ] Admin dashboard: see players, select matchup
- [ ] Room code generation and invite link sharing
- [ ] Room persistence in PostgreSQL

**Milestone:** 2 people can log in, join the same room, and an admin can see both of them in the lobby.

---

### Phase 3 — Core Game Engine (Weeks 6–9)

**Goal:** A playable 1v1 match with basic commands. This is the hardest phase.

- [ ] Build the Command Parser (validates and maps input to action objects)
- [ ] Build the Game State Manager (turn resolution, damage calculation, win detection)
- [ ] Implement turn timer (Redis TTL key + server-side auto-resolution on expiry)
- [ ] Socket.IO match namespace with full event set
- [ ] Battlefield UI (troop display, health bars, staging area)
- [ ] Command input terminal UI
- [ ] Turn countdown timer UI
- [ ] Implement core commands: `add`, `add .`, `commit`, `push`, `pull`
- [ ] Post-match results screen
- [ ] Match result persistence to PostgreSQL

**Milestone:** Two players can play a full match from start to finish using 5 core commands. One wins. Results are saved.

---

### Phase 4 — Spectating & Leaderboard (Weeks 10–11)

**Goal:** The social layer. Other players can watch and the competitive stakes feel real.

- [ ] Spectator Socket.IO namespace and UI
- [ ] Battle log (command history feed for spectators)
- [ ] Emoji reaction system
- [ ] Spectator count display
- [ ] Leaderboard page (global + room-scoped)
- [ ] ELO calculation logic on match end
- [ ] Leaderboard real-time updates via Socket.IO

**Milestone:** A room of 10 players can have 2 playing and 8 watching in real time. Leaderboard updates after each match.

---

### Phase 5 — Full Command Set & Polish (Weeks 12–14)

**Goal:** All planned commands implemented. The game feels polished and complete.

- [ ] Implement remaining commands: `merge`, `branch`, `checkout`, `stash`, `stash pop`, `rebase`, `revert`, `reset --hard`, `cherry-pick`, `log`, `diff`, `clone`, `tag`
- [ ] Add room difficulty tiers (command whitelists per room type)
- [ ] Badge system (award logic + display on profile)
- [ ] Command usage stats per user
- [ ] Match history with turn-by-turn replay
- [ ] Animations for troop movements and attacks (Framer Motion)
- [ ] Sound effects (optional toggle)
- [ ] Mobile-friendly spectator view
- [ ] Error messages and invalid command hints

**Milestone:** The full game is feature-complete and playable end-to-end.

---

### Phase 6 — Testing & Launch (Weeks 15–16)

**Goal:** Stable, tested, documented, and ready for real users.

- [ ] Unit tests for Command Parser (all valid + invalid inputs)
- [ ] Unit tests for Game State Manager (all command effects, win conditions)
- [ ] Integration tests for all API endpoints
- [ ] End-to-end test for full match flow
- [ ] Load test the Socket.IO server (simulate 50 concurrent users)
- [ ] Write README with setup instructions
- [ ] Record a demo video
- [ ] Public launch (share in developer communities, CS student groups)

**Milestone:** Public launch. Real users playing real matches.

---

## 15. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope creep — too many features | High | High | Strictly enforce MVP. Phases 1–4 must be done before Phase 5 starts. |
| Real-time sync bugs (desync between players) | Medium | High | Use server as single source of truth. Never trust client-side state. |
| Turn timer edge cases (player disconnects mid-turn) | Medium | Medium | Redis TTL auto-resolves; disconnected player gets a null/pass action |
| GitHub OAuth rate limits | Low | Medium | Cache GitHub profile data after first login; don't re-fetch on every request |
| Solo development bandwidth | High | Medium | Keep phase boundaries strict; don't start next phase until milestone is met |
| Command parser ambiguity (multiple valid interpretations) | Medium | Low | Define strict parsing rules and test exhaustively in Phase 3 |
| ELO manipulation (players intentionally losing) | Low | Low | Not a concern at early scale; flag unusual patterns in Phase 6+ |

---

## 16. Scalability Considerations

### 16.1 Current Design (MVP Scale: ~50–100 concurrent users)

The MVP architecture — a single Node.js server, one PostgreSQL instance, one Redis instance — is entirely sufficient for the scale of a student project or small community.

### 16.2 Path to Scale (100–10,000 users)

If the project grows beyond its initial scope, the following changes would be made:

- **Horizontal scaling of the Node.js server** — Run multiple instances behind a load balancer. Socket.IO rooms require sticky sessions or a Redis adapter (`@socket.io/redis-adapter`) so that WebSocket events can be shared across instances.
- **PostgreSQL read replicas** — Leaderboard and profile reads are high-frequency; route these to read replicas.
- **CDN for static assets** — Vercel handles this automatically.
- **Rate limiting at the edge** — Move rate limiting to a CDN layer (Cloudflare) rather than handling it in the application.

### 16.3 What This Architecture Cannot Handle (Without Major Refactoring)

- More than ~500 simultaneous WebSocket connections on a single server without Redis adapter
- Persistent game state if the server restarts (mitigated partially by Redis persistence)

These are acceptable limitations for a student project and would only need addressing at production scale.

---

## 17. Success Metrics

### 17.1 Quantitative Metrics

| Metric | Target (3 months post-launch) |
|---|---|
| Total registered users | 200+ |
| Total matches played | 500+ |
| Average session length | 15+ minutes |
| Return rate (users who play more than once) | 40%+ |
| Average commands used per match | 8+ distinct commands |
| Badges awarded | 1,000+ |

### 17.2 Qualitative Metrics

- Players report learning Git commands they didn't know before
- CS educators express interest in using it for lab sessions
- Players request new commands or features (a sign of engagement)
- Match replays are shared on social media

### 17.3 Educational Effectiveness Metric

A post-match survey (optional, non-intrusive) asking: *"Did you learn or practise a Git command today that you weren't confident with before?"* Target: 60% of respondents answer Yes.

---

## 18. Future Roadmap

The following features are explicitly out of scope for the MVP but represent logical next phases after launch:

### V2 Features
- **Tournament mode:** Admin creates a bracket tournament. Players compete in rounds. The bracket auto-updates after each match.
- **Team vs Team (2v2):** Two players on each side, coordinating their commands as a team over a shared chat.
- **Custom command mappings:** Room admins can define custom mappings (e.g., for teaching a specific Git workflow).
- **Practice mode (single player vs bot):** An AI opponent that plays at configurable difficulty levels, for players who want to practice before going head-to-head.

### V3 Features
- **Classroom mode:** Educators can create managed classrooms, assign Git curriculum tracks, and see students' command progress dashboards.
- **Mobile app:** A React Native app for spectating and leaderboard browsing (matches still require desktop for keyboard input).
- **Twitch integration:** A Twitch overlay that allows streamers to run public GitBattle tournaments with their audience.
- **API for custom clients:** Allow third parties to build alternative frontends (e.g., a VS Code extension battlefield view).

---

## 19. Conclusion

GitBattle is a novel, educational, and genuinely entertaining product that fills a clear and documented gap in the developer education market. By wrapping Git command learning inside the mechanics of a real-time competitive battle game — with GitHub OAuth identity, live spectating, and a persistent leaderboard — it creates the emotional and social context that makes learning stick.

The project is appropriately scoped for a 2nd-year CS student working over a 16-week development cycle. It is complex enough to demonstrate genuine engineering skill across multiple domains: real-time systems, database design, authentication, game logic, and frontend development. It is contained enough to be completed to a shippable MVP within the timeframe.

Beyond its academic value, GitBattle has genuine product potential. It is a project that can be demoed live in any interview, explained in one sentence to any developer, and shared with any student who has ever been confused by Git.

The question it answers — *"what if learning Git was actually fun?"* — is one that every developer who has ever stared at a merge conflict at 2am already knows the answer to.

---

*Proposal prepared by [Your Name] | CS Year 2 | May 2026*
*Feedback and questions welcome.*
