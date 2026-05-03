# Brainn.dev / RegistryRouter MCP Free Delivery Workflow

This document defines the full free-path workflow for turning Brainn.dev and RegistryRouter MCP from a static product site plus local scaffold into a usable public tool.

The goal is to avoid paid infrastructure until it is clearly needed.

---

## 1. Current state

### 1.1 Live site

- Domain: `https://brainn.dev`
- Hosting: GitHub Pages
- Cost: free
- Site type: static HTML/CSS
- Custom domain: configured
- HTTPS: enabled

### 1.2 Product direction

RegistryRouter MCP is a source-routing and registry-intelligence system for AI coding agents.

It helps agents answer:

> Which registry, package index, documentation source, marketplace, catalog, or policy path should I trust before I write code?

### 1.3 Repository state

The repository now contains:

```text
index.html
atlas.html
mcp.html
examples.html
about.html
full_stack_registry_llm_reference.html
styles.css
CNAME
robots.txt
sitemap.xml
README_DEPLOY.md
REGISTRYROUTER_MCP_DEV.md
package.json
packages/registryrouter-mcp/
policies/default.policy.json
```

### 1.4 MCP implementation state

The initial local MCP scaffold exists in:

```text
packages/registryrouter-mcp/
```

It includes:

- MCP stdio server
- CLI
- seed catalog
- source-routing core logic
- default policy file
- local development guide

Implemented core functions:

```text
classifyTask
resolveRegistry
checkPolicy
generatePreflightReport
```

Implemented MCP tools:

```text
classify_task
resolve_registry
check_policy
generate_preflight_report
```

Implemented MCP resources:

```text
registryrouter://atlas/overview
registryrouter://atlas/catalog
registryrouter://policy/current
```

### 1.5 What is not true yet

The project is not yet:

- published to npm
- installable through `npx @brainn/registryrouter-mcp`
- backed by a hosted API
- callable directly from the browser as an MCP server
- production-ready

---

## 2. Free delivery options

There are five practical free paths.

| Option | Cost | User experience | Best use | Limitation |
|---|---:|---|---|---|
| Local MCP from GitHub | Free | Clone repo, install, configure local path | Early technical users | Requires Git and local setup |
| Static browser demo | Free | Try source-routing directly on Brainn.dev | Public website visitors | Not a real MCP server |
| Public npm package | Free | `npx @brainn/registryrouter-mcp` | Real MCP adoption | Requires package testing/publishing |
| GitHub Release ZIP | Free | Download release artifact | Non-npm distribution | Less ergonomic than npm |
| Free hosted API tier | Free to start | Website/API calls `/resolve` or `/preflight` | Later demos/integrations | Adds platform dependency |

Recommended order:

```text
1. Local MCP from GitHub
2. Static browser demo
3. Public npm package
4. GitHub Release ZIP
5. Free hosted API only if needed
```

---

## 3. Phase 1 — Make the local MCP reliable

### Goal

Make the current local MCP scaffold work consistently for technical users.

### Why this comes first

A browser demo can prove the idea, but the actual product is an MCP. Before publishing or marketing it, the local MCP path must work.

### Required tasks

#### 3.1 Install dependencies locally

From the repo root:

```bash
npm install
```

Expected result:

- `node_modules/` is created
- MCP SDK installs
- Zod installs
- no dependency errors

#### 3.2 Run CLI smoke test

```bash
npm run registryrouter:smoke
```

Expected output:

```markdown
# RegistryRouter Preflight Report

## Task
Add auth to a Next.js app with Postgres and Vercel

## Classification
...
```

#### 3.3 Run direct CLI tests

```bash
node packages/registryrouter-mcp/bin/registryrouter-cli.js classify "Add auth to a Next.js app" --stack Next.js,Postgres,Vercel
```

```bash
node packages/registryrouter-mcp/bin/registryrouter-cli.js resolve "Add a command palette" --stack React,Tailwind --prefer-open-source
```

```bash
node packages/registryrouter-mcp/bin/registryrouter-cli.js preflight "Add Stripe subscriptions" --stack Next.js,Supabase
```

#### 3.4 Validate expected task classifications

Create a small manual test list:

| Task | Expected primary layer |
|---|---|
| Add auth to a Next.js app | `auth_identity` |
| Add Stripe subscriptions | `payments_billing` |
| Add a command palette | `ui_frontend` |
| Add Docker image for FastAPI | `containers_deployment` |
| Add Terraform S3 bucket | `infrastructure_platform` |
| Evaluate a GitHub MCP server | `ai_models_tools` |
| Add Sentry monitoring | `observability` |
| Install a Python package | `packages_dependencies` |

#### 3.5 Configure in an MCP client

Use a local absolute path.

Example:

```json
{
  "mcpServers": {
    "registryrouter": {
      "command": "node",
      "args": [
        "/absolute/path/to/brainn-dev-site/packages/registryrouter-mcp/bin/server.js"
      ],
      "env": {
        "REGISTRYROUTER_POLICY": "/absolute/path/to/brainn-dev-site/policies/default.policy.json"
      }
    }
  }
}
```

#### 3.6 Test MCP tools from client

Ask the client to call:

```text
Use RegistryRouter to classify this task: Add auth to a Next.js app with Postgres.
```

Then test:

```text
Use RegistryRouter to generate a preflight report for adding Stripe subscriptions to a Next.js + Supabase app.
```

Expected result:

- Tool list appears in the client
- `classify_task` returns JSON
- `resolve_registry` returns recommended sources
- `generate_preflight_report` returns Markdown
- high-risk tasks require approval

### Definition of done

Phase 1 is complete when:

- `npm install` works
- `npm run registryrouter:smoke` works
- all direct CLI examples work
- one MCP client can load the server
- all four MCP tools can be called successfully
- local setup instructions are accurate

---

## 4. Phase 2 — Add a free static browser demo

### Goal

Let visitors try the core RegistryRouter idea directly on Brainn.dev without installing anything.

### Why this matters

The website cannot run a stdio MCP server, but it can run the same source-routing logic in static JavaScript.

This gives users immediate value and validates the product before npm publishing.

### Page

Create:

```text
try.html
```

Optional supporting files:

```text
try.js
registryrouter.catalog.json
```

### User experience

User enters:

```text
Add auth to a Next.js app with Postgres
```

Optional stack input:

```text
Next.js, Postgres, Vercel
```

User clicks:

```text
Generate preflight
```

Page returns:

```text
Layer: Auth / identity
Recommended sources: Auth.js, Clerk
Required checks: session model, OAuth scopes, secrets, data access, pricing
Human approval: required if external SaaS is selected
```

### Static implementation approach

Use plain JavaScript. No build step.

Files:

```text
try.html
try.js
registryrouter.catalog.json
```

The browser demo should not depend on Node, npm, or a backend.

### Required functions

Browser version should include simplified equivalents of:

```text
classifyTask
resolveRegistry
generatePreflightReport
```

It does not need full policy support at first.

### UI sections

`try.html` should include:

1. Hero
2. Input form
3. Example task buttons
4. Preflight result panel
5. Link to MCP setup
6. Link to full atlas
7. Warning that browser demo is not a live MCP server

### Suggested example buttons

```text
Add auth to a Next.js app
Add Stripe subscriptions
Add a command palette
Evaluate a GitHub MCP server
Add Sentry monitoring
Create a Terraform S3 bucket
```

### Public copy

Use wording like:

```text
Try the source-routing model in your browser. This demo uses the same RegistryRouter concepts as the MCP package, but it does not run an MCP server or connect to your tools.
```

### Navigation update

Add `Try` to the main nav:

```text
Home | Try | Atlas | MCP | Examples | About
```

### Definition of done

Phase 2 is complete when:

- `try.html` works on GitHub Pages
- no backend is required
- users can test at least six example tasks
- the output is understandable
- it links clearly to MCP setup
- it does not imply the browser demo is the MCP server

---

## 5. Phase 3 — Expand and normalize the catalog

### Goal

Turn the long-form atlas into durable, reusable structured data.

### Current seed catalog

Current file:

```text
packages/registryrouter-mcp/data/catalog.json
```

It is intentionally small.

### Target catalog structure

Each registry entry should include:

```json
{
  "id": "shadcn-ui",
  "name": "shadcn/ui",
  "url": "https://ui.shadcn.com",
  "layer": "ui_frontend",
  "cost_model": "free_open",
  "authority_level": "official_install_source",
  "best_for": "Source-owned React components",
  "use_when": "Use when the app team wants editable component source.",
  "avoid_when": "Avoid treating the default visual style as final product design.",
  "risk_checks": ["accessibility", "dependencies_added", "visual_fit", "license"],
  "tags": ["react", "tailwind", "components"]
}
```

### Required layer fields

```json
{
  "id": "ui_frontend",
  "label": "UI / frontend",
  "keywords": ["ui", "component", "react", "tailwind"]
}
```

### Minimum catalog expansion targets

Add at least 5 sources for each of these layers:

- UI / frontend
- packages / dependencies
- auth / identity
- payments / billing
- containers / deployment
- infrastructure / platform
- APIs / integrations
- AI / MCP / tools
- observability
- security / compliance
- data / databases
- CI/CD
- cloud marketplaces
- model hubs
- internal catalogs

### Validation script

Add:

```text
packages/registryrouter-mcp/bin/validate-catalog.js
```

Validation rules:

- every registry has `id`
- every registry has `name`
- every registry has `url`
- every registry has `layer`
- every layer exists
- every `cost_model` is valid
- every `authority_level` is valid
- IDs are unique
- URLs are present
- risk checks are arrays

### Definition of done

Phase 3 is complete when:

- catalog has at least 75 high-quality entries
- validation script passes
- browser demo and MCP both consume the same catalog format
- old atlas remains available as long-form reference

---

## 6. Phase 4 — Prepare public npm package

### Goal

Make RegistryRouter installable with one command.

Target:

```bash
npx @brainn/registryrouter-mcp
```

### Prerequisites

Do not publish until:

- CLI smoke tests pass
- MCP client test passes
- catalog validation exists
- README is accurate
- package is no longer marked private
- package name is available or an alternate is chosen

### Package changes

In:

```text
packages/registryrouter-mcp/package.json
```

Change:

```json
"private": true
```

to:

```json
"private": false
```

Confirm package metadata:

```json
{
  "name": "@brainn/registryrouter-mcp",
  "version": "0.1.0",
  "description": "Source-routing MCP server for AI coding agents.",
  "type": "module",
  "bin": {
    "registryrouter-mcp": "./bin/server.js",
    "registryrouter": "./bin/registryrouter-cli.js"
  }
}
```

### npm account/org options

Free options:

1. Publish under personal npm account:

```text
registryrouter-mcp
```

2. Publish under scoped org if available:

```text
@brainn/registryrouter-mcp
```

Scoped public npm packages are free when published with public access.

Command:

```bash
npm publish --access public
```

### Pre-publish checklist

Run:

```bash
npm install
npm run registryrouter:smoke
node packages/registryrouter-mcp/bin/registryrouter-cli.js classify "Add auth to a Next.js app" --stack Next.js,Vercel
node packages/registryrouter-mcp/bin/registryrouter-cli.js resolve "Add a command palette" --stack React,Tailwind --prefer-open-source
node packages/registryrouter-mcp/bin/registryrouter-cli.js preflight "Evaluate a GitHub MCP server" --stack GitHub,MCP
```

Package dry run:

```bash
cd packages/registryrouter-mcp
npm pack --dry-run
```

Confirm included files:

```text
bin/server.js
bin/registryrouter-cli.js
src/core.js
data/catalog.json
README.md
package.json
```

### Website update after publish

Update `mcp.html` from local-development status to published status.

Replace:

```text
Package status: Implementation in progress
```

with:

```text
Package status: Available for local installation
```

Add:

```json
{
  "mcpServers": {
    "registryrouter": {
      "command": "npx",
      "args": ["@brainn/registryrouter-mcp"]
    }
  }
}
```

### Definition of done

Phase 4 is complete when:

- package is published
- `npx @brainn/registryrouter-mcp` starts the MCP server
- README install instructions work
- website install instructions are accurate
- at least one external machine can install and run it

---

## 7. Phase 5 — GitHub Release ZIP

### Goal

Provide a backup distribution method for users who do not want npm.

### Release artifact options

Free GitHub releases can include:

- source code ZIP
- packaged npm tarball
- catalog JSON
- policy templates
- release notes

### Release process

Create version tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Create GitHub release:

```text
Title: RegistryRouter MCP v0.1.0
```

Release notes:

```text
Initial local-first MCP release.

Includes:
- classify_task
- resolve_registry
- check_policy
- generate_preflight_report
- seed registry catalog
- default policy file
```

Attach npm tarball:

```bash
cd packages/registryrouter-mcp
npm pack
```

### Definition of done

Phase 5 is complete when:

- GitHub release exists
- release notes are clear
- users can download the source or tarball
- release links from Brainn.dev are accurate

---

## 8. Phase 6 — Optional free hosted API

### Goal

Only add a hosted API if the static browser demo and npm package are not enough.

### Free hosting options

Possible free or free-tier platforms:

- Cloudflare Workers
- Vercel Functions
- Netlify Functions
- Render free web service if available
- Fly.io free allowance if available
- GitHub Codespaces only for development, not production

### Best free option

Cloudflare Workers is likely the cleanest for a small source-routing API because:

- fast edge runtime
- generous free tier
- static JSON can be bundled
- simple HTTP endpoints

### API endpoints

Minimum:

```text
GET  /health
GET  /catalog
POST /classify
POST /resolve
POST /preflight
```

### API response example

Request:

```json
{
  "task": "Add auth to a Next.js app",
  "stack": ["Next.js", "Postgres", "Vercel"]
}
```

Response:

```json
{
  "primary_layer": "auth_identity",
  "recommended_sources": ["Auth.js", "Clerk"],
  "risk_checks": ["session_model", "oauth_scopes", "secret_scope"],
  "human_approval_required": true
}
```

### When to avoid this phase

Skip hosted API if:

- local MCP works
- npm package works
- browser demo works
- there is no clear need for remote calls

### Definition of done

Phase 6 is complete when:

- API deploys on free tier
- CORS is configured for Brainn.dev
- browser demo can optionally call hosted API
- API does not require secrets for public demo use
- rate limits or abuse protections are considered

---

## 9. Phase 7 — Update public website truthfully

### Goal

The website should always reflect the actual product state.

### Website states

#### State A — Design/spec only

Use this language:

```text
RegistryRouter MCP is in development. The site documents the source-routing model and intended MCP interface.
```

#### State B — Local scaffold available

Use this language:

```text
RegistryRouter MCP is available as a local development scaffold. Clone the repo to test the CLI and MCP server locally.
```

#### State C — npm package available

Use this language:

```text
RegistryRouter MCP is available for local installation through npm.
```

#### State D — hosted API available

Use this language:

```text
RegistryRouter is available through MCP, CLI, browser demo, and API.
```

### Current correct state

Current correct public state is:

```text
Local scaffold available.
```

The package is not yet published.

### Required website updates now

Update `mcp.html` to show:

```text
Local development scaffold available
```

Add local install commands:

```bash
git clone https://github.com/Meteoryte/brainn-dev-site.git
cd brainn-dev-site
npm install
npm run registryrouter:smoke
```

Show local MCP config:

```json
{
  "mcpServers": {
    "registryrouter": {
      "command": "node",
      "args": [
        "/absolute/path/to/brainn-dev-site/packages/registryrouter-mcp/bin/server.js"
      ]
    }
  }
}
```

Keep `npx` config under:

```text
Planned npm install path
```

### Definition of done

Phase 7 is complete when:

- website does not imply npm package is published
- website clearly explains local testing
- browser demo is clearly labeled as browser demo
- support CTA remains secondary

---

## 10. Phase 8 — Testing workflow

### 10.1 Local CLI tests

Run:

```bash
npm run registryrouter:smoke
npm run registryrouter:classify -- "Add auth to a Next.js app" --stack Next.js,Vercel
npm run registryrouter:resolve -- "Add a command palette" --stack React,Tailwind --prefer-open-source
npm run registryrouter:preflight -- "Add Stripe subscriptions" --stack Next.js,Supabase
```

### 10.2 MCP client tests

Test in at least one MCP client.

Tasks:

```text
Use RegistryRouter to classify adding auth to a Next.js app.
```

```text
Use RegistryRouter to resolve sources for adding a command palette to a React app.
```

```text
Use RegistryRouter to generate a preflight report for Stripe subscriptions.
```

### 10.3 Browser demo tests

Test in:

- Chrome
- Firefox
- Safari if available
- mobile viewport

Tasks:

- input empty task
- input known auth task
- input known UI task
- input known MCP task
- use example buttons
- copy output

### 10.4 Catalog validation tests

Add and run:

```bash
node packages/registryrouter-mcp/bin/validate-catalog.js
```

### 10.5 Regression task set

Use these fixed prompts:

```text
Add auth to a Next.js app with Postgres and Vercel
Add Stripe subscriptions to a Next.js and Supabase app
Add a command palette to a React Tailwind app
Evaluate a GitHub MCP server for private repo access
Add Sentry monitoring to a FastAPI service
Create a Terraform module for an S3 bucket
Choose a Docker base image for a Python API
Install a Python package for PDF parsing
```

For each, record:

- layer
- recommended sources
- risk checks
- approval status
- whether output is acceptable

---

## 11. Phase 9 — User testing workflow

### Goal

Validate that people understand and value RegistryRouter before investing in hosted infrastructure.

### Test group

Start with 10–15 users:

- AI coding power users
- solo builders
- agency developers
- platform engineers
- security-minded developers

### Test A — Website comprehension

Ask:

1. What does Brainn.dev do?
2. What problem does RegistryRouter solve?
3. Is it clear whether the MCP package is available?
4. What would you click next?
5. What is confusing?

Pass criteria:

- 70% describe it as source routing / registry intelligence for AI coding agents
- fewer than 20% think it writes code directly
- fewer than 20% think the browser demo is the MCP server

### Test B — Browser demo

Ask users to try:

```text
Add auth to a Next.js app
```

Then ask:

1. Is the result useful?
2. Would this change how you prompt an agent?
3. What source/risk was missing?
4. Would you use this before coding?

Pass criteria:

- 60% say output is useful
- 40% copy or reuse part of the output
- at least 5 missing catalog entries are discovered

### Test C — Local MCP install

Ask technical users to run:

```bash
git clone https://github.com/Meteoryte/brainn-dev-site.git
cd brainn-dev-site
npm install
npm run registryrouter:smoke
```

Then configure their MCP client.

Pass criteria:

- 70% can run CLI smoke test
- 50% can connect an MCP client
- 50% say the output improves agent behavior

---

## 12. Phase 10 — Free launch workflow

### Launch assets

Prepare:

- Brainn.dev homepage
- Try page
- Atlas page
- MCP page
- Examples page
- About page
- GitHub README
- package README
- demo GIF or screenshot
- launch post

### Launch message

Use:

```text
RegistryRouter MCP helps AI coding agents choose authoritative sources before they write code.

It classifies a software task, recommends trusted registries/docs/package indexes, checks policy, and returns a preflight report.
```

### Free launch channels

- GitHub repo
- personal Twitter/X or LinkedIn
- Hacker News Show HN
- Reddit developer communities where allowed
- MCP community directories when package is ready
- relevant Discord/Slack groups where allowed

### Avoid overclaiming

Do not say:

```text
Production-ready
Enterprise-ready
Live API
Published npm package
```

until true.

Use:

```text
Local-first scaffold
Browser demo
Early MCP implementation
Open feedback welcome
```

---

## 13. Phase 11 — Monetization later, without paid infrastructure now

### Free now

Keep free:

- static site
- browser demo
- open catalog
- local MCP
- npm package
- GitHub releases

### Possible paid later

Only after usage signal:

- hosted API
- live registry freshness checks
- private catalogs
- team policy management
- audit logs
- organization allowlists/denylists
- enterprise support

### Buy Me a Coffee

Use as a lightweight support option, not primary monetization.

Placement:

- About page secondary CTA
- small support callout
- maybe GitHub README footer

Avoid making it the primary CTA on the homepage.

---

## 14. Recommended immediate next steps

Do these next, in order.

### Step 1 — Update MCP page to show local scaffold truthfully

Add:

```bash
git clone https://github.com/Meteoryte/brainn-dev-site.git
cd brainn-dev-site
npm install
npm run registryrouter:smoke
```

Move `npx` instructions under “planned npm path.”

### Step 2 — Create `try.html`

Build the static browser demo.

Minimum:

- task input
- stack input
- example buttons
- generate button
- preflight output
- clear note: “This is a browser demo, not the MCP server.”

### Step 3 — Extract shared browser catalog

Create:

```text
registryrouter.catalog.json
```

Keep it compatible with MCP catalog.

### Step 4 — Add catalog validation

Create:

```text
packages/registryrouter-mcp/bin/validate-catalog.js
```

Add script:

```json
"registryrouter:validate": "node packages/registryrouter-mcp/bin/validate-catalog.js"
```

### Step 5 — Test MCP locally

Run CLI and one MCP client test.

### Step 6 — Expand catalog

Add sources from the long-form atlas until the seed catalog feels useful.

### Step 7 — Publish npm package

Only after local tests pass.

---

## 15. Final target workflow for users

### Browser-only user

```text
1. Visit brainn.dev
2. Open Try
3. Enter software task
4. Review source-routing preflight
5. Copy result into coding agent
```

### Local MCP user before npm publish

```text
1. Clone GitHub repo
2. npm install
3. npm run registryrouter:smoke
4. Add local MCP config to client
5. Ask agent to call RegistryRouter before coding
```

### Local MCP user after npm publish

```text
1. Add MCP config using npx
2. Restart MCP client
3. Call classify_task / resolve_registry / generate_preflight_report
4. Use output before implementation
```

### Team user later

```text
1. Add team policy file
2. Define approved and blocked registries
3. Require approval for auth/payments/infra/tools
4. Use RegistryRouter in agent workflows
5. Review preflight reports before code changes
```

---

## 16. Definition of success

The free delivery path is successful when:

- Brainn.dev explains the product clearly
- users can try the browser demo instantly
- technical users can run the MCP locally
- npm package can be installed without cloning
- output is useful enough to copy into real agent workflows
- users report fewer stale, invented, or risky source decisions

North star:

```text
A coding agent should make a better source decision after using RegistryRouter than it would without it.
```
