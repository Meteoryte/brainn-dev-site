# RegistryRouter MCP Execution & User-Testing Workflow

**Parent brand:** Brainn.dev  
**Flagship system:** RegistryRouter MCP  
**Core promise:** Before an AI coding agent writes code, RegistryRouter tells it where to look, what to trust, what to avoid, and what needs human approval.

---

## 1. Product thesis

RegistryRouter MCP is a model-agnostic source-routing layer for AI-assisted software development.

Most coding agents fail in predictable ways:

- They invent package names, APIs, config keys, pricing, and capabilities.
- They use stale install commands or old documentation.
- They choose attractive but inappropriate UI/component sources.
- They treat unofficial examples as implementation authority.
- They ignore license, cost, security, maintenance, privacy, and governance.
- They connect tools, APIs, or MCP servers to sensitive data without enough review.
- They cannot distinguish between discovery sources, official docs, package registries, security databases, cloud marketplaces, and internal service catalogs.

RegistryRouter solves this by acting as a preflight routing layer.

Instead of asking an agent to immediately implement a request, the agent first calls RegistryRouter:

```text
User asks agent to build something
        ↓
Agent calls RegistryRouter MCP
        ↓
RegistryRouter classifies the task layer
        ↓
RegistryRouter recommends authoritative sources, registries, checks, risks, and approvals
        ↓
Agent writes safer, more current, more policy-aware code
```

The first version should not try to crawl the entire internet in real time. The first version should be a trusted, curated, structured intelligence layer wrapped in an MCP server and optionally exposed as an HTTP API.

---

## 2. Product boundaries

### 2.1 What RegistryRouter is

RegistryRouter is:

- A source-routing system for coding agents.
- A curated registry atlas converted into structured data.
- An MCP server exposing resources, tools, and prompts.
- A preflight API for source selection, package/integration evaluation, and policy checks.
- A reference site at Brainn.dev for humans and models.
- A future commercial layer for freshness checks, organization policy packs, private registries, and audit trails.

### 2.2 What RegistryRouter is not

RegistryRouter is not initially:

- A replacement for npm, PyPI, Docker Hub, Terraform Registry, or MCP Registry.
- A dependency scanner like Snyk, Socket, or Dependabot.
- A docs retriever like Context7.
- A full internal developer portal like Backstage.
- A tool marketplace like Smithery or Glama.
- A package installer.
- A code generator.

RegistryRouter sits above those systems. It routes the agent to the right source and tells the agent how to use that source responsibly.

### 2.3 Strategic wedge

The wedge is narrow and strong:

> Give coding agents a reliable preflight decision before they act.

The MVP should make one thing excellent:

> Given a software task, stack, and constraints, return the right registry/source strategy with risks and required approvals.

---

## 3. Target users

### 3.1 Primary users

#### AI coding tool power users

People using Cursor, Claude Code, Codex-style agents, Windsurf, Continue, Aider, Cline, or local coding agents.

They need:

- Less hallucinated dependency selection.
- Better source choice.
- Faster architecture decisions.
- Better prompts to constrain agents.
- A reusable system they can drop into many projects.

#### Solo builders and agencies

They build across stacks and client requirements.

They need:

- Fast stack/source decisions.
- Safer vendor/package choices.
- Evidence they can show clients.
- Repeatable implementation protocols.

#### Platform engineering teams

They maintain internal golden paths, approved vendors, private packages, templates, service catalogs, and cloud standards.

They need:

- Agents to follow organization policy.
- Allow/deny lists.
- Preferred source routing.
- Audit trails.
- Private registry integration.

#### DevSecOps teams

They care about supply chain, license, secrets, data access, tool permissions, and compliance.

They need:

- Dependency and registry risk checks before implementation.
- Human approval gates.
- MCP/tool trust boundaries.
- Security-oriented preflight reports.

### 3.2 Secondary users

- Developer advocates creating agent-ready docs.
- Open-source maintainers who want their registry/package/tool to be discovered correctly.
- Enterprise architects standardizing stacks.
- AI product teams building coding-agent workflows.
- Internal enablement teams teaching safe AI development.

---

## 4. Core user stories

### 4.1 Individual developer

> As a developer using an AI coding agent, I want the agent to check authoritative registries and sources before writing code, so I do not get stale, invented, or risky implementation output.

### 4.2 Platform team

> As a platform engineer, I want to define preferred registries, vendors, packages, templates, and cloud services, so internal agents follow company-approved paths.

### 4.3 Security reviewer

> As a security reviewer, I want a preflight report showing source authority, maintenance, license, cost, secrets, data access, and approval requirements before an agent adds a dependency or integration.

### 4.4 Agency developer

> As an agency developer, I want a portable source-routing system that works across models and clients, so I can keep implementation decisions consistent without rebuilding agent instructions every time.

### 4.5 Tool builder

> As an AI tool builder, I want a structured API that classifies tasks and returns registry/source recommendations, so my product can reduce hallucinated dependencies and stale source usage.

---

## 5. Product architecture

### 5.1 System layers

```text
Brainn.dev public site
        ↓
Registry Atlas HTML reference
        ↓
Canonical registry catalog JSON
        ↓
Scoring + policy engine
        ↓
RegistryRouter MCP server
        ↓
Optional HTTP API
        ↓
Agent clients, IDEs, CLIs, CI bots, internal dev portals
```

### 5.2 Knowledge layers

#### Layer 1: Human-readable reference

A single HTML page that explains:

- Lookup protocol.
- Cost model.
- Selection criteria.
- Prompt templates.
- Registry categories.
- Maintenance checklist.
- Machine-readable summary.

This remains useful even without MCP. It is the portable reference artifact.

#### Layer 2: Canonical data

A structured catalog derived from the HTML reference.

This should be stored as versioned JSON/YAML, not only embedded in the HTML.

#### Layer 3: Decision engine

A deterministic routing layer that maps:

- User task.
- Stack.
- category/layer.
- Registry candidates.
- Risk checks.
- Cost model.
- Governance rules.
- Human approval thresholds.

The first version can be mostly rule-based. Later versions can add live metadata, embeddings, ranking models, and freshness scoring.

#### Layer 4: MCP interface

Exposes the system to agents through:

- Resources.
- Tools.
- Prompts.

#### Layer 5: API interface

Exposes the same functionality to:

- IDE plugins.
- Internal platform bots.
- CI systems.
- Web apps.
- Commercial customers.

---

## 6. Brainn.dev site structure

### 6.1 Main navigation

```text
brainn.dev
├── /                         Landing page
├── /registryrouter           Product page
├── /atlas                    Public registry atlas
├── /mcp                      MCP setup docs
├── /api                      API docs
├── /policies                 Policy pack docs
├── /examples                 Example workflows
├── /pricing                  Pricing / waitlist
├── /changelog                Release notes
└── /docs                     Full documentation
```

### 6.2 Landing page message

Headline options:

```text
Registry intelligence for AI coding agents.
```

```text
Before your agent writes code, tell it where to look.
```

```text
Source routing for agentic software development.
```

Subheadline:

```text
RegistryRouter MCP classifies coding tasks, routes agents to authoritative registries and docs, checks policy and risk, and returns preflight instructions before implementation begins.
```

Primary CTA:

```text
Install RegistryRouter MCP
```

Secondary CTA:

```text
Explore the Atlas
```

### 6.3 Product page sections

1. Problem.
2. How RegistryRouter works.
3. Example MCP call.
4. Supported registry layers.
5. Policy overlay.
6. Security/risk checks.
7. Integrations.
8. Pricing/waitlist.
9. FAQ.

### 6.4 Atlas page

The atlas should remain model-agnostic and human-readable.

It should support:

- Search.
- Filters by layer.
- Filters by cost model.
- Filters by risk.
- Copyable prompt templates.
- Copyable MCP examples.
- Download JSON.
- Download HTML.
- View version/changelog.

### 6.5 MCP docs page

Should include:

- Install command.
- Client configuration examples.
- Supported tools.
- Example prompts.
- Policy file configuration.
- Troubleshooting.

---

## 7. Visual design direction

### 7.1 Brand posture

Brainn.dev should feel like a technical intelligence layer, not a generic SaaS docs site.

Design keywords:

- Dense.
- Precise.
- Technical.
- Trustworthy.
- Terminal-adjacent.
- Searchable.
- Agent-readable.
- Not overly playful.
- Not overly glossy.

### 7.2 Relationship to BrainnStation visual system

Brainn.dev can borrow from the BrainnStation design language without becoming a trading terminal.

Use:

- Ultra-dark base.
- Mono labels.
- Dense data rows.
- Sharp or low-radius data surfaces.
- Semantic accents.
- Technical status indicators.
- Matrix/table layouts.

Avoid:

- Overly rounded SaaS cards.
- Heavy glows.
- Decorative gradients that reduce legibility.
- Marketing animation that fights utility.
- Large empty hero sections with little function.

### 7.3 Recommended visual system for Brainn.dev

#### Colors

```css
--bg: #070b14;
--surface-1: #0b1020;
--surface-2: #111827;
--surface-3: #172033;
--line: rgba(255,255,255,.10);
--text: #edf3ff;
--muted: #9ca8bd;
--faint: #687386;
--accent: #50e3a4;
--info: #69c7ff;
--warn: #ffd166;
--danger: #ff6b8a;
--purple: #b69cff;
```

#### Typography

- Headings: Inter, Geist, or system sans.
- Data/labels/code: JetBrains Mono or ui-monospace.
- Body: readable sans.
- Registry names and commands should use mono or semi-mono treatments.

#### Component vocabulary

- Source cards.
- Risk meters.
- Registry matrix.
- Layer classifier.
- Preflight report panel.
- Tool call inspector.
- Policy badge.
- Approval gate chip.
- Authority score rail.
- Source provenance row.

### 7.4 Brainn.dev page modules

#### Hero module

Should show a realistic preflight interaction, not just marketing copy.

```text
Task: Add auth to a Next.js + Postgres app
Layer: Auth / Identity
Primary source: Auth.js official docs
Alternatives: Clerk, Supabase Auth
Risks: Session model, OAuth scopes, pricing, data residency
Approval: Required if SaaS provider selected
```

#### Registry coverage module

Use a compact matrix:

```text
UI     Packages     Containers     Infra     APIs
Auth   Data         AI/Models      MCP       Security
```

#### Before/after module

Before:

```text
Agent: npm install cool-auth-lib
```

After:

```text
Agent calls RegistryRouter → verifies source → checks policy → writes implementation plan
```

#### Trust module

Show:

- No invented package names.
- Official source preference.
- Policy-aware recommendations.
- Human approval gates.
- Risk checks before implementation.

---

## 8. Canonical data model

The HTML atlas should be converted into a durable catalog schema.

### 8.1 Registry category schema

```ts
export type RegistryCategory = {
  id: string;
  title: string;
  layer: RegistryLayer;
  purpose: string;
  llmUsageNote: string;
  commonTasks: string[];
  defaultRiskChecks: RiskCheck[];
  registries: RegistryEntry[];
};
```

### 8.2 Registry entry schema

```ts
export type RegistryEntry = {
  id: string;
  name: string;
  url: string;
  layer: RegistryLayer;
  costModel: CostModel;
  authorityLevel: AuthorityLevel;
  sourceType: SourceType;
  bestFor: string;
  useWhen: string;
  avoidWhen?: string;
  installAuthority?: boolean;
  docsAuthority?: boolean;
  discoveryOnly?: boolean;
  riskChecks: RiskCheck[];
  tags: string[];
  integrations?: string[];
  notes?: string;
  lastReviewedAt: string;
  reviewStatus: ReviewStatus;
};
```

### 8.3 Task classification schema

```ts
export type TaskClassification = {
  task: string;
  primaryLayer: RegistryLayer;
  secondaryLayers: RegistryLayer[];
  confidence: number;
  reason: string;
  likelyRegistries: string[];
  requiredChecks: RiskCheck[];
  humanApprovalDefault: boolean;
};
```

### 8.4 Policy schema

```ts
export type RegistryPolicy = {
  id: string;
  name: string;
  organization?: string;
  preferredRegistries: string[];
  approvedRegistries: string[];
  blockedRegistries: string[];
  approvedVendors: string[];
  blockedVendors: string[];
  preferredStacks: string[];
  restrictedLayers: RegistryLayer[];
  requireApprovalFor: ApprovalRule[];
  notes?: string;
};
```

### 8.5 Risk check enum

```ts
export type RiskCheck =
  | "authority"
  | "license"
  | "pricing"
  | "maintenance"
  | "security_advisories"
  | "package_identity"
  | "version_compatibility"
  | "runtime_compatibility"
  | "framework_compatibility"
  | "data_access"
  | "secret_scope"
  | "auth_scope"
  | "compliance"
  | "privacy"
  | "region_availability"
  | "supply_chain"
  | "installation_method"
  | "rollback"
  | "accessibility"
  | "bundle_impact"
  | "visual_fit"
  | "human_approval";
```

### 8.6 Cost model enum

```ts
export type CostModel =
  | "free_open"
  | "freemium"
  | "paid_commercial"
  | "mixed_marketplace"
  | "deprecated_caution"
  | "internal_private"
  | "unknown_verify";
```

### 8.7 Authority levels

```ts
export type AuthorityLevel =
  | "official_install_source"
  | "official_docs_source"
  | "official_marketplace"
  | "trusted_discovery_source"
  | "community_reference"
  | "internal_policy_source"
  | "historical_only"
  | "unknown";
```

---

## 9. MCP server design

### 9.1 MCP package name

Possible package names:

```text
@brainn/registryrouter-mcp
registryrouter-mcp
@brainn-dev/registryrouter
```

Recommendation:

```text
@brainn/registryrouter-mcp
```

Use a scoped package if possible. It reads as official and leaves room for future packages.

### 9.2 MCP resources

Resources are static or semi-static context agents can read.

#### Resource: atlas overview

```text
registryrouter://atlas/overview
```

Returns:

- Core rules.
- Layer list.
- Cost models.
- Authority model.
- Preflight behavior.

#### Resource: registry catalog

```text
registryrouter://atlas/catalog
```

Returns:

- Canonical registry categories and entries.

#### Resource: cost model

```text
registryrouter://guidance/cost-model
```

Returns:

- Free/open.
- Freemium.
- Paid/commercial.
- Mixed marketplace.
- Deprecated/caution.
- Internal/private.

#### Resource: policy

```text
registryrouter://policy/current
```

Returns:

- Active allowlist/denylist.
- Approval rules.
- Preferred stacks.
- Restricted layers.

#### Resource: prompt templates

```text
registryrouter://prompts/preflight
```

Returns:

- Copyable prompt templates for agent workflows.

### 9.3 MCP tools

#### Tool 1: `classify_task`

Purpose:

Classify a user request into a software layer before any implementation.

Input:

```json
{
  "task": "Add authentication to a Next.js app",
  "stack": ["Next.js", "React", "Postgres", "Vercel"]
}
```

Output:

```json
{
  "primary_layer": "auth_identity",
  "secondary_layers": ["packages_dependencies", "apis_integrations", "deployment_hosting"],
  "confidence": 0.91,
  "reason": "The task requires choosing an authentication provider or library and integrating it with the app runtime.",
  "required_checks": ["pricing", "auth_scope", "data_access", "version_compatibility", "secret_scope"],
  "human_approval_default": true
}
```

Acceptance criteria:

- Returns one primary layer.
- May return secondary layers.
- Includes confidence.
- Includes required checks.
- Does not recommend implementation yet.

#### Tool 2: `resolve_registry`

Purpose:

Given a task and stack, recommend authoritative source categories and specific registries.

Input:

```json
{
  "task": "Add a command palette to my React app",
  "stack": ["React", "Vite", "Tailwind", "shadcn/ui"],
  "constraints": {
    "prefer_source_owned_components": true,
    "avoid_paid_saas": true
  }
}
```

Output:

```json
{
  "task_layer": "ui_frontend",
  "primary_sources": [
    {
      "name": "shadcn/ui",
      "authority_level": "official_install_source",
      "cost_model": "free_open",
      "why": "Best fit for source-owned React components that can be adapted to the existing design system."
    },
    {
      "name": "Radix UI",
      "authority_level": "official_docs_source",
      "cost_model": "free_open",
      "why": "Good primitive layer for accessible command/menu behavior."
    }
  ],
  "fallback_sources": ["React Aria Components"],
  "risk_checks": ["accessibility", "visual_fit", "bundle_impact", "dependencies_added"],
  "agent_instruction": "Use registry components for behavior and structure only. Restyle all visible pixels to the app's existing design system.",
  "human_approval_required": false
}
```

Acceptance criteria:

- Returns specific sources.
- Explains why each source fits.
- Separates primary and fallback sources.
- Includes risk checks and implementation warning.
- Includes approval requirement.

#### Tool 3: `compare_sources`

Purpose:

Compare candidate registries or vendors for a task.

Input:

```json
{
  "task": "Choose an error monitoring tool for a SaaS app",
  "candidates": ["Sentry", "Datadog", "OpenTelemetry"],
  "constraints": {
    "prefer_open_source": true,
    "enterprise_ready": true
  }
}
```

Output:

```json
{
  "recommended": "Sentry",
  "reason": "Best balance of developer ergonomics, mature docs, open-source roots, and SaaS availability.",
  "comparison": [
    {
      "name": "Sentry",
      "fit": "high",
      "cost_model": "freemium",
      "risks": ["pricing at scale", "data retention", "PII scrubbing"]
    },
    {
      "name": "Datadog",
      "fit": "medium",
      "cost_model": "paid_commercial",
      "risks": ["cost", "enterprise procurement", "scope creep"]
    },
    {
      "name": "OpenTelemetry",
      "fit": "medium",
      "cost_model": "free_open",
      "risks": ["requires backend/storage choice", "more setup"]
    }
  ],
  "human_approval_required": true
}
```

Acceptance criteria:

- Compares at least two candidates.
- Does not claim unverified current pricing.
- Labels risk clearly.
- Suggests what to verify.

#### Tool 4: `check_policy`

Purpose:

Apply a local/team/org policy to a source recommendation.

Input:

```json
{
  "source": "Clerk",
  "task_layer": "auth_identity",
  "policy_id": "default"
}
```

Output:

```json
{
  "status": "requires_approval",
  "reason": "Auth providers access user identity data and require vendor approval under the active policy.",
  "blocking_rules": [],
  "approval_rules": ["external_saas_auth", "user_data_processor"],
  "allowed_alternatives": ["Auth.js", "internal_sso"]
}
```

Acceptance criteria:

- Returns allowed, blocked, or requires approval.
- Includes specific policy reason.
- Suggests alternatives when blocked.

#### Tool 5: `generate_preflight_report`

Purpose:

Produce a complete pre-implementation report an agent can show the user before coding.

Input:

```json
{
  "task": "Add Stripe subscriptions to my app",
  "stack": ["Next.js", "Supabase", "Vercel"],
  "policy_id": "default",
  "format": "markdown"
}
```

Output:

```markdown
# RegistryRouter Preflight Report

## Task
Add Stripe subscriptions to a Next.js + Supabase + Vercel app.

## Classification
Primary layer: Payments / billing  
Secondary layers: API integration, auth, database, deployment

## Authoritative sources
- Stripe official docs: implementation authority
- Stripe API reference: schema authority
- Stripe sample repos: discovery/examples only

## Required checks
- Pricing and fees
- Webhook security
- API key handling
- Customer data storage
- Tax/subscription rules
- Refund/cancellation handling
- Local/test mode setup

## Human approval
Required before implementation because this touches payments and customer billing data.
```

Acceptance criteria:

- Markdown is readable by humans and agents.
- Includes classification, sources, risks, and approval.
- Does not write implementation code unless explicitly requested.

#### Tool 6: `list_registries`

Purpose:

List registry entries by layer, cost, source type, or tag.

Input:

```json
{
  "layer": "ui_frontend",
  "cost_model": "free_open"
}
```

Output:

```json
{
  "matches": [
    { "name": "shadcn/ui", "best_for": "Source-owned UI components" },
    { "name": "Radix UI", "best_for": "Accessible primitives" },
    { "name": "React Aria Components", "best_for": "Accessibility-first interactions" }
  ]
}
```

#### Tool 7: `explain_registry`

Purpose:

Return a concise explanation of one registry.

Input:

```json
{
  "registry": "Terraform Registry"
}
```

Output:

```json
{
  "name": "Terraform Registry",
  "layer": "infrastructure_platform",
  "cost_model": "free_open",
  "authority_level": "official_install_source",
  "best_for": "Terraform providers and modules",
  "use_when": "The task involves Terraform-managed infrastructure resources or reusable modules.",
  "risk_checks": ["provider_version", "module_variables", "cloud_permissions", "state_management", "rollback"]
}
```

---

## 10. MCP prompts

### 10.1 Prompt: source preflight before coding

```text
Before writing code, use RegistryRouter to classify the task, identify the authoritative registry/source, check relevant risks, and determine whether human approval is required. Do not invent package names, APIs, pricing, config keys, or capabilities. Return the preflight result before implementation.
```

### 10.2 Prompt: safe dependency install

```text
Use RegistryRouter to identify the official package registry and docs for this dependency. Verify package identity, current install command, supported versions, license, maintenance status, security concerns, and rollback path. Then produce an implementation plan with pinned versions where appropriate.
```

### 10.3 Prompt: UI component evaluation

```text
Use RegistryRouter to evaluate candidate UI component sources. Prefer source-owned or accessible primitives when the app has an existing design system. Check visual fit, accessibility, dependency footprint, bundle impact, license, and whether the component can be restyled without fighting the product's visual language.
```

### 10.4 Prompt: MCP/tool integration evaluation

```text
Use RegistryRouter to evaluate the MCP server or agent tool before connecting it. Check tool identity, source authority, permissions, transport, authentication, data access, logging behavior, prompt-injection risk, installation method, and human approval requirements.
```

---

## 11. HTTP API design

The API should mirror the MCP tools.

### 11.1 Endpoints

```text
GET  /v1/health
GET  /v1/catalog
GET  /v1/catalog/categories
GET  /v1/catalog/registries
GET  /v1/catalog/registries/:id
POST /v1/classify
POST /v1/resolve
POST /v1/compare
POST /v1/policy/check
POST /v1/preflight
POST /v1/feedback
```

### 11.2 `POST /v1/resolve`

Request:

```json
{
  "task": "Add a dashboard chart library to a React app",
  "stack": ["React", "Vite", "Tailwind"],
  "constraints": {
    "prefer_open_source": true,
    "avoid_large_dependencies": true,
    "needs_accessibility": true
  },
  "policy_id": "default"
}
```

Response:

```json
{
  "request_id": "rr_01J...",
  "task_layer": "data_visualization",
  "confidence": 0.88,
  "recommended_sources": [
    {
      "name": "Recharts",
      "source_type": "package_docs",
      "authority_level": "official_docs_source",
      "fit": "high",
      "reason": "Good React-native charting fit for dashboard components."
    }
  ],
  "fallback_sources": ["visx", "ECharts"],
  "risk_checks": ["bundle_impact", "accessibility", "SSR_compatibility", "license", "maintenance"],
  "policy_result": {
    "status": "allowed",
    "reason": "No active policy blocks open-source charting packages."
  },
  "agent_instruction": "Review official docs and current install command before coding. Do not assume chart API names from memory."
}
```

### 11.3 API principles

- Return structured JSON first.
- Include human-readable explanation fields.
- Avoid claiming live facts unless actually verified.
- Distinguish static atlas knowledge from live metadata.
- Include `last_reviewed_at` and `evidence` fields when possible.
- Make approval requirements explicit.
- Make uncertainty explicit.

---

## 12. Repository structure

Recommended monorepo:

```text
brainn-dev/
├── apps/
│   ├── web/                         # Brainn.dev site
│   ├── api/                         # HTTP API server
│   └── playground/                  # Interactive MCP/API demo
├── packages/
│   ├── registryrouter-core/         # Classification, catalog, policy, scoring
│   ├── registryrouter-mcp/          # MCP server
│   ├── registryrouter-schemas/      # Shared TS/Zod schemas
│   ├── registryrouter-data/         # Canonical catalog JSON/YAML
│   ├── registryrouter-cli/          # Local CLI
│   └── registryrouter-ui/           # Shared site/demo UI components
├── docs/
│   ├── atlas/                       # Human-readable atlas source
│   ├── design/                      # Brand/design system docs
│   ├── mcp/                         # MCP setup docs
│   ├── api/                         # API docs
│   └── research/                    # User testing scripts and findings
├── policies/
│   ├── default.policy.json
│   ├── startup.policy.json
│   ├── enterprise.policy.json
│   └── brainnstation.policy.json
├── scripts/
│   ├── extract-atlas.ts
│   ├── validate-catalog.ts
│   ├── build-html-atlas.ts
│   └── generate-docs.ts
├── tests/
│   ├── fixtures/
│   ├── evals/
│   └── integration/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

### 12.1 Initial tech stack

Recommended:

- TypeScript.
- Node.js MCP server.
- Zod for schemas.
- Vitest for tests.
- Next.js or Astro for Brainn.dev.
- SQLite or JSON files for MVP catalog.
- Postgres later for hosted API.
- OpenAPI spec for HTTP API.
- pnpm workspace.

### 12.2 Why TypeScript first

TypeScript is a good fit because:

- MCP server examples commonly fit JS/TS workflows.
- The catalog schema can be shared across site, MCP, API, and CLI.
- Zod can validate input/output contracts.
- Developers evaluating the product can inspect and contribute quickly.

---

## 13. Execution roadmap

## Phase 0 — Decision lock

**Goal:** Freeze the product thesis and reduce ambiguity before building.

### Tasks

- Confirm product name: `RegistryRouter MCP`.
- Confirm parent domain: `Brainn.dev`.
- Confirm positioning: `source intelligence for AI coding agents`.
- Confirm MVP interface: MCP first, static site second, API third.
- Confirm initial catalog scope: use existing atlas categories as seed data.
- Confirm no live crawling in MVP.
- Confirm local/offline mode for first release.

### Deliverables

- One-page product brief.
- Naming/positioning doc.
- MVP scope doc.
- Non-goals list.

### Acceptance criteria

- A new contributor can explain the product in one sentence.
- The MVP can be built without debating every category.
- The product does not drift into a generic docs/search engine.

---

## Phase 1 — Convert the atlas into canonical data

**Goal:** Turn the single HTML reference into structured, testable source data.

### Tasks

1. Extract all categories from the existing HTML.
2. Extract all registry entries.
3. Normalize cost labels.
4. Normalize layer names.
5. Add stable IDs.
6. Add `last_reviewed_at`.
7. Add authority levels.
8. Add default risk checks per category.
9. Add tags.
10. Add validation tests.

### Data files

```text
packages/registryrouter-data/src/catalog.json
packages/registryrouter-data/src/categories.json
packages/registryrouter-data/src/registries.json
packages/registryrouter-data/src/layers.json
packages/registryrouter-data/src/risk-checks.json
```

### Validation rules

Every registry entry must have:

- `id`
- `name`
- `url`
- `layer`
- `costModel`
- `authorityLevel`
- `bestFor`
- `useWhen`
- `riskChecks`
- `lastReviewedAt`

Every category must have:

- `id`
- `title`
- `layer`
- `purpose`
- `llmUsageNote`
- `registries`

### Acceptance criteria

- Catalog builds without schema errors.
- All existing atlas entries are represented.
- Site can render from JSON instead of hardcoded JS.
- MCP can read the same JSON.

---

## Phase 2 — Build the core decision engine

**Goal:** Create deterministic functions that classify tasks and resolve sources.

### Core functions

```ts
classifyTask(input): TaskClassification
resolveRegistry(input): RegistryResolution
compareSources(input): SourceComparison
checkPolicy(input): PolicyResult
generatePreflightReport(input): PreflightReport
```

### Classification approach for MVP

Start with rules and keyword maps.

Example mappings:

```ts
const layerKeywords = {
  ui_frontend: ["component", "button", "modal", "dashboard", "React", "Tailwind", "shadcn"],
  packages_dependencies: ["install", "library", "package", "dependency", "npm", "pip"],
  containers_deployment: ["Docker", "image", "container", "OCI"],
  infrastructure_platform: ["Terraform", "Pulumi", "Helm", "Kubernetes", "AWS", "GCP", "Azure"],
  apis_integrations: ["API", "webhook", "SDK", "integration", "Zapier"],
  auth_identity: ["auth", "login", "OAuth", "SSO", "session", "JWT"],
  ai_models_tools: ["model", "LLM", "embedding", "MCP", "agent", "tool server"],
  security_compliance: ["vulnerability", "license", "SBOM", "secrets", "CVE"]
};
```

The classifier should be transparent. For MVP, explain why it classified the task.

### Ranking approach for MVP

Rank sources by:

1. Layer match.
2. Authority level.
3. Policy fit.
4. Cost constraints.
5. Risk fit.
6. Stack tags.
7. Use-case tags.

### Scoring sketch

```ts
score =
  layerMatch * 40 +
  authorityScore * 25 +
  policyScore * 20 +
  stackMatch * 10 +
  costFit * 5 -
  riskPenalty;
```

### Acceptance criteria

- Given 50 common coding tasks, classifier returns plausible layers.
- `resolveRegistry` returns useful sources for each major layer.
- Results include uncertainty when confidence is low.
- No function requires a network call.

---

## Phase 3 — Build the MCP server

**Goal:** Make the system callable from MCP-compatible agent clients.

### Tasks

1. Create `packages/registryrouter-mcp`.
2. Load catalog data from `registryrouter-data`.
3. Register resources.
4. Register tools.
5. Register prompts.
6. Add local policy file loading.
7. Add config discovery.
8. Add examples for common clients.
9. Add integration tests.

### MCP configuration example

```json
{
  "mcpServers": {
    "registryrouter": {
      "command": "npx",
      "args": ["@brainn/registryrouter-mcp"],
      "env": {
        "REGISTRYROUTER_POLICY": "./registryrouter.policy.json"
      }
    }
  }
}
```

### Local policy file example

```json
{
  "id": "my-project-policy",
  "name": "My Project Policy",
  "preferredRegistries": ["shadcn-ui", "radix-ui", "npm", "docker-hub"],
  "approvedRegistries": ["npm", "pypi", "docker-hub", "terraform-registry"],
  "blockedRegistries": ["unknown-random-github-list"],
  "requireApprovalFor": [
    { "layer": "payments_billing", "reason": "Touches customer billing" },
    { "layer": "auth_identity", "reason": "Touches user identity" },
    { "costModel": "paid_commercial", "reason": "May require procurement" },
    { "riskCheck": "data_access", "reason": "May access sensitive data" }
  ]
}
```

### Acceptance criteria

- Can be installed locally.
- Can be called by an MCP-compatible client.
- Returns deterministic JSON.
- Includes useful resources and prompts.
- Does not require Brainn.dev hosted API.

---

## Phase 4 — Build the Brainn.dev public site

**Goal:** Create a public home for the idea and make the atlas accessible.

### Pages

#### `/`

- Hero.
- Problem.
- Product demo.
- Supported layers.
- Example preflight output.
- CTA to install MCP.
- CTA to explore atlas.

#### `/atlas`

- Searchable registry atlas.
- Filter by layer, cost, authority, risk.
- Registry detail pages.
- Download JSON.

#### `/registryrouter`

- Product positioning.
- MCP tools.
- API preview.
- Policy packs.
- Examples.

#### `/mcp`

- Install instructions.
- Client config examples.
- Tool reference.
- Prompt reference.

#### `/api`

- API overview.
- Endpoint docs.
- Waitlist if API is not public yet.

#### `/examples`

Example tasks:

- Add auth to Next.js.
- Pick UI component source.
- Add payments.
- Add observability.
- Choose a Docker base image.
- Evaluate an MCP server.
- Add Terraform module.

### Acceptance criteria

- A visitor understands the product in under 30 seconds.
- A developer can install the MCP in under 5 minutes.
- The atlas is searchable and fast.
- The site communicates that the product is about source routing, not code generation.

---

## Phase 5 — Build CLI and local developer workflow

**Goal:** Let users run RegistryRouter outside an MCP client.

### CLI commands

```text
registryrouter classify "Add auth to my Next.js app"
registryrouter resolve "Add charts to a React dashboard" --stack React,Vite,Tailwind
registryrouter compare Sentry Datadog OpenTelemetry --task "error monitoring"
registryrouter preflight "Add Stripe subscriptions" --stack Next.js,Supabase,Vercel
registryrouter validate-policy ./registryrouter.policy.json
registryrouter export-catalog --format json
```

### Acceptance criteria

- CLI returns same results as MCP tools.
- CLI can be used in CI.
- CLI can read local policy files.
- CLI output supports JSON and markdown.

---

## Phase 6 — Add hosted API

**Goal:** Create a commercial path and support non-MCP integrations.

### MVP hosted features

- API keys.
- Rate limits.
- Catalog access.
- Classify/resolve/preflight endpoints.
- Feedback endpoint.
- Basic dashboard.

### Later hosted features

- Live freshness checks.
- Organization policy packs.
- Team audit logs.
- Private registry connectors.
- Security/license enrichment.
- Enterprise SSO.
- Custom scoring.

### Acceptance criteria

- HTTP API mirrors MCP behavior.
- API output is stable and versioned.
- Users can provide feedback on recommendations.
- Hosted API does not block local MCP usage.

---

## Phase 7 — Add enrichment signals

**Goal:** Improve recommendations with current metadata and risk signals.

### Signal categories

- Package metadata.
- Last release date.
- License.
- Security advisories.
- Maintainer activity.
- Stars/downloads where available.
- Deprecation status.
- Official docs status.
- Pricing model verification.
- MCP server trust signals.

### Important boundary

Static catalog claims and live checks must be separated.

Example:

```json
{
  "source": "npm",
  "static_catalog": {
    "cost_model": "free_open",
    "authority_level": "official_install_source"
  },
  "live_metadata": {
    "checked_at": "2026-05-02T00:00:00Z",
    "package_latest_version": "...",
    "security_advisories": []
  }
}
```

### Acceptance criteria

- Recommendations disclose whether they used static or live metadata.
- Live failures degrade gracefully.
- No stale live data is presented as current.

---

## Phase 8 — Launch private beta

**Goal:** Test the system with real agent users before monetization.

### Beta audience

Start with 20–30 users:

- 8 solo AI coding power users.
- 6 startup/full-stack engineers.
- 5 agency developers.
- 5 platform/security engineers.
- 3 AI tool builders.

### Beta package

Give them:

- Brainn.dev site.
- RegistryRouter MCP install.
- CLI.
- Example policy file.
- 10 example workflows.
- Feedback form.
- Discord/Slack/email support channel.

### Beta success criteria

- 70% can install and run the MCP without help.
- 60% use it on a real coding task.
- 50% report it changed or improved an agent decision.
- 30% would keep it installed after the test.
- At least 5 users say they would pay for a hosted/policy/freshness version.

---

## 14. Testing strategy

Testing should happen in four layers:

1. Product concept testing.
2. Workflow usability testing.
3. Agent-output evaluation.
4. Willingness-to-pay testing.

---

## 15. User testing plan

## Test 1 — Concept validation

### Goal

Determine whether users understand and value the idea before installing anything.

### Participants

8–12 people:

- AI coding-agent users.
- Full-stack developers.
- Engineering leads.
- Platform/security people.

### Format

30-minute moderated call.

### Materials

- Landing page mockup.
- Example preflight report.
- Atlas screenshot.
- MCP tool list.

### Script

#### Opening

```text
I am testing a product concept, not testing you. The idea is an MCP server called RegistryRouter. Before an AI coding agent writes code, it classifies the task, chooses the authoritative registry/source, checks risk and policy, and returns a preflight report. I want to understand whether this solves a real problem for you.
```

#### Questions

1. What AI coding tools do you currently use?
2. What kinds of mistakes do those agents make when choosing packages, APIs, or docs?
3. Have you seen an agent invent dependencies, use stale APIs, or choose the wrong source?
4. How do you currently prevent that?
5. What do you think RegistryRouter does based on this page?
6. What part is most useful?
7. What part feels unnecessary?
8. Would this be more useful as an MCP server, API, CLI, docs site, or browser page?
9. What would it need to do for you to install it?
10. What would it need to do for your team to pay for it?

### Metrics

- Concept clarity: can they explain it back?
- Pain intensity: how often they experience the problem.
- Value perception: whether they believe it would reduce mistakes.
- Install intent.
- Payment intent.

### Pass criteria

- 8/12 understand it within 2 minutes.
- 6/12 report having the problem recently.
- 5/12 say they would try it.
- 3/12 identify a paid use case.

---

## Test 2 — Landing page comprehension

### Goal

Test whether the Brainn.dev site explains the product without a walkthrough.

### Format

Unmoderated 5–7 minute test.

### Tasks

1. Open the homepage.
2. Spend up to 90 seconds reading.
3. Answer:
   - What does this product do?
   - Who is it for?
   - What would you click next?
   - What is unclear?

### Metrics

- Time to comprehension.
- Correct product description.
- CTA clarity.
- Confusion points.

### Pass criteria

- 70% correctly describe it as source/registry routing for AI coding agents.
- 60% identify the MCP install as the likely next step.
- Fewer than 30% think it is a package registry or code generator.

---

## Test 3 — MCP install usability

### Goal

Determine whether developers can install and call RegistryRouter MCP.

### Participants

8–10 developers who use at least one MCP-capable client.

### Task

```text
Install RegistryRouter MCP, connect it to your coding agent, and use it to evaluate a task you would normally ask the agent to implement.
```

### Observation points

- Do they know which config file to edit?
- Does install command work?
- Does the MCP server start?
- Does the client show the tools?
- Do they know which tool to call?
- Is output useful?
- Do they trust the result?

### Success metrics

- Install completion rate.
- Time to first successful tool call.
- Number of setup errors.
- User-reported confidence.
- Whether output influenced implementation.

### Pass criteria

- 7/10 complete setup.
- Median time to first tool call under 10 minutes.
- 6/10 say the output would change or improve agent behavior.

---

## Test 4 — Agent-output A/B test

### Goal

Measure whether RegistryRouter improves coding-agent responses.

### Method

Run the same tasks through an agent with and without RegistryRouter preflight.

### Tasks

Use 10 realistic tasks:

1. Add auth to a Next.js app.
2. Add charts to a trading dashboard.
3. Add error monitoring to a FastAPI service.
4. Add Stripe subscriptions.
5. Choose a Docker base image.
6. Add a Terraform module for S3.
7. Add a command palette to React.
8. Evaluate an MCP server for GitHub access.
9. Add feature flags.
10. Add embeddings search.

### Evaluation criteria

Score each response 1–5 on:

- Source authority.
- Package/API hallucination avoidance.
- Risk awareness.
- Policy/approval awareness.
- Implementation readiness.
- Clarity.

### Expected improvement

RegistryRouter should improve:

- Source choice.
- Risk checks.
- Approval gates.
- Avoidance of invented details.

It may not improve:

- Code quality directly.
- Speed directly.
- Creativity directly.

### Pass criteria

- RegistryRouter-assisted responses score at least 20% higher on source authority and risk awareness.
- Hallucinated or questionable package choices decrease.
- Human reviewers prefer RegistryRouter-assisted response in at least 7/10 tasks.

---

## Test 5 — Policy overlay test

### Goal

Test whether team policies make the product significantly more valuable.

### Participants

5 platform/security/engineering-lead users.

### Task

Give each participant a sample policy file and ask them to customize it for their team.

### Questions

1. What sources would your team approve by default?
2. What sources would you block?
3. Which task layers require approval?
4. What data access rules matter?
5. Would this be useful in a real development workflow?
6. Where should the policy live?
7. Who should own it?

### Pass criteria

- 4/5 can imagine a real policy file.
- 3/5 say policy overlays are more valuable than the public atlas alone.
- 2/5 identify enterprise/team willingness to pay.

---

## Test 6 — Willingness-to-pay interview

### Goal

Find what people would actually pay for.

### Do not ask

Avoid asking:

```text
Would you pay for this?
```

People often say yes abstractly.

### Ask instead

1. What would you replace with this?
2. What budget would pay for this?
3. Who would approve it?
4. What would trigger purchase?
5. What would make this a no-brainer?
6. What would make this impossible to buy?
7. Would you pay for local-only MCP, hosted API, private policy packs, or live metadata?
8. What price would feel too cheap to trust?
9. What price would require approval?
10. What price would be clearly too expensive?

### Pricing hypotheses

#### Individual Pro

- $10–$29/month.
- Hosted API key.
- Higher limits.
- Live package/source metadata.
- Personal policies.

#### Team

- $99–$299/month.
- Shared policies.
- Audit logs.
- Team source approvals.
- Private config sync.

#### Enterprise

- Annual contract.
- Private registry connectors.
- SSO.
- Custom policy packs.
- VPC/on-prem option.
- Compliance reporting.

### Pass criteria

- At least 5 users identify a paid feature.
- At least 3 users accept the Pro price range.
- At least 2 team/enterprise users identify budget owner.

---

## 16. Evaluation harness

Build an internal evaluation suite so improvements can be measured repeatedly.

### 16.1 Test fixture format

```json
{
  "id": "task_auth_nextjs_001",
  "task": "Add authentication to a Next.js app with Postgres and Vercel",
  "stack": ["Next.js", "Postgres", "Vercel"],
  "expected_primary_layer": "auth_identity",
  "expected_required_checks": ["pricing", "auth_scope", "data_access", "secret_scope"],
  "must_include": ["official docs", "human approval", "session model"],
  "must_not_include": ["invented package", "assumed pricing"]
}
```

### 16.2 Evaluation dimensions

- Classification correctness.
- Source recommendation quality.
- Risk check completeness.
- Policy behavior.
- Output consistency.
- Clarity.
- Refusal/uncertainty quality.

### 16.3 Regression tests

Every catalog update should run:

```text
pnpm test
pnpm validate:catalog
pnpm eval:fixtures
pnpm build:mcp
pnpm build:web
```

---

## 17. Registry curation workflow

RegistryRouter needs a repeatable editorial process.

### 17.1 Add a new registry

1. Identify source.
2. Confirm official URL.
3. Assign layer.
4. Assign cost model.
5. Assign authority level.
6. Add best-for statement.
7. Add use-when statement.
8. Add avoid-when statement if relevant.
9. Add risk checks.
10. Add tags.
11. Record review date.
12. Run catalog validation.
13. Add changelog entry.

### 17.2 Review cadence

- Critical/high-use registries: monthly.
- Stable official registries: quarterly.
- Community lists: quarterly or on change.
- Deprecated/caution sources: verify before every release.
- Pricing labels: verify before commercial claims.

### 17.3 Registry quality rubric

Score each source:

```text
Authority:       1–5
Maintenance:     1–5
Documentation:   1–5
Security posture:1–5
Agent usefulness:1–5
Policy clarity:  1–5
```

Do not overexpose numeric scores in the MVP unless they are meaningful. Use them internally first.

---

## 18. Security and trust model

### 18.1 Core trust principles

- RegistryRouter should not install packages.
- RegistryRouter should not execute arbitrary code.
- RegistryRouter should not connect to sensitive systems by default.
- RegistryRouter should not claim live verification unless live verification occurred.
- RegistryRouter should distinguish official, community, marketplace, and internal sources.
- RegistryRouter should require explicit approval for high-risk layers.

### 18.2 High-risk layers

Default human approval should be required for:

- Payments and billing.
- Authentication and identity.
- Production infrastructure.
- Secrets management.
- Security tools.
- MCP servers or tools with broad data access.
- Customer data processors.
- Paid SaaS or procurement-triggering vendors.
- Anything that can delete, mutate, or exfiltrate sensitive data.

### 18.3 Prompt-injection and tool safety

For MCP/tool registry evaluation, check:

- Server identity.
- Maintainer identity.
- Install method.
- Permissions.
- Data access.
- Logging behavior.
- Remote transport.
- Secrets required.
- Tool descriptions.
- Whether the tool can read/write files.
- Whether the tool can make network calls.

### 18.4 Auditability

For hosted/team versions, log:

- Task.
- Classification.
- Recommended sources.
- Policy result.
- Approval requirement.
- User feedback.
- Timestamp.

Avoid logging:

- Secrets.
- Private code.
- Sensitive customer data.
- Full prompts unless user opts in.

---

## 19. Commercial packaging

### 19.1 Free layer

- Public Brainn.dev atlas.
- Local MCP server.
- Basic catalog.
- Basic CLI.
- Static policy files.

Purpose:

- Build trust.
- Gain adoption.
- Make the standard useful.
- Collect feedback.

### 19.2 Pro layer

- Hosted API key.
- Live registry/package metadata.
- Personal policy profiles.
- Higher limits.
- Saved preflight reports.
- Exportable evidence.

### 19.3 Team layer

- Shared policies.
- Team-approved registry lists.
- Audit logs.
- Private config sync.
- Role-based access.
- CI integration.

### 19.4 Enterprise layer

- Private registry connectors.
- Internal service catalog integration.
- Custom policy packs.
- SSO/SAML.
- On-prem/VPC option.
- Compliance workflows.
- Dedicated support.

### 19.5 Pricing experiments

Run pricing tests after the beta, not before.

Test landing page tiers:

```text
Free: local MCP + public atlas
Pro: $19/mo — live metadata + personal policy
Team: $199/mo — shared policy + audit logs
Enterprise: custom — private registries + compliance
```

---

## 20. Launch workflow

### 20.1 Pre-alpha

Audience:

- You.
- 2–3 trusted technical friends.
- BrainnStation workflow.

Goals:

- Validate catalog structure.
- Validate MCP tool output.
- Prove useful on real tasks.

### 20.2 Alpha

Audience:

- 10 invited users.

Goals:

- Install success.
- Output usefulness.
- First feedback loop.

### 20.3 Private beta

Audience:

- 20–30 users.

Goals:

- Measure adoption.
- Measure real workflow impact.
- Identify paid features.

### 20.4 Public beta

Audience:

- Hacker News.
- AI developer Twitter/X.
- Reddit developer communities.
- MCP directories.
- GitHub open source.

Goals:

- Awareness.
- Stars/downloads.
- Feedback.
- Integration requests.

### 20.5 Paid pilot

Audience:

- 3–5 teams.

Goals:

- Validate policy overlays.
- Validate private registries.
- Validate team audit logs.
- Validate buyer/user split.

---

## 21. Success metrics

### 21.1 Product metrics

- MCP installs.
- Weekly active tool calls.
- Repeat usage per user.
- Preflight reports generated.
- Catalog searches.
- Policy files created.
- Feedback submitted.

### 21.2 Quality metrics

- Classification accuracy.
- Source recommendation acceptance.
- Human preference score in A/B tests.
- Reduction in hallucinated package/source recommendations.
- Number of corrections submitted.
- Stale source reports.

### 21.3 Business metrics

- Waitlist signups.
- Pro conversion intent.
- Team pilot requests.
- API key requests.
- Inbound enterprise/security interest.
- Willingness-to-pay evidence.

---

## 22. Biggest risks and mitigations

### Risk 1: The atlas becomes too broad to be useful

Mitigation:

- Keep the top-level protocol short.
- Make the MCP tools task-driven.
- Avoid asking users to browse 250 entries manually.
- Use the catalog as backend intelligence, not the product experience.

### Risk 2: Users think it is just a list

Mitigation:

- Lead with `resolve_registry` demos.
- Show before/after agent behavior.
- Make the preflight report the hero artifact.
- Position as routing, not listing.

### Risk 3: Live metadata becomes expensive or unreliable

Mitigation:

- Start static/local.
- Add live checks only for high-value sources.
- Cache results.
- Clearly mark live verification time.

### Risk 4: Too many adjacent competitors

Mitigation:

- Do not compete with package scanners or MCP marketplaces directly.
- Integrate signals from them when possible.
- Own the layer above them: task-to-source routing.

### Risk 5: Enterprise buyers need private data support

Mitigation:

- Design policy/private-registry abstraction early.
- Do not hardcode public-only assumptions.
- Add local mode from day one.

### Risk 6: Agent clients vary in MCP support

Mitigation:

- Provide MCP, CLI, and HTTP API.
- Make outputs copyable as Markdown/JSON.
- Keep the HTML atlas useful independently.

---

## 23. Immediate next actions

### Day 1–2

- Create repository.
- Add current HTML atlas.
- Create `catalog.schema.ts`.
- Extract categories and registries into JSON.
- Validate JSON.

### Day 3–5

- Build core functions:
  - `classifyTask`
  - `resolveRegistry`
  - `checkPolicy`
  - `generatePreflightReport`
- Add 30 fixture tasks.
- Add tests.

### Day 6–8

- Build MCP server.
- Expose resources/tools/prompts.
- Add install docs.
- Test with at least one MCP client.

### Day 9–12

- Build Brainn.dev landing page.
- Build `/atlas` page from JSON.
- Build `/mcp` install docs.
- Add 5 example workflows.

### Day 13–15

- Run internal dogfood on BrainnStation tasks.
- Fix confusing outputs.
- Add policy file support.
- Prepare user testing materials.

### Day 16–25

- Run 8–12 concept tests.
- Run 5–8 install tests.
- Run A/B agent output evaluation.
- Summarize findings.
- Prioritize next build round.

---

## 24. Dogfood tasks using BrainnStation

Use BrainnStation as the first real test environment.

### Task A: Evaluate UI component source

```text
We need a production command palette for BrainnStation's Electron React app. Use RegistryRouter to classify the task, choose the best source, check risks, and return a preflight report.
```

Expected:

- Layer: UI/frontend.
- Sources: shadcn/ui command, Radix primitives, maybe React Aria.
- Risks: accessibility, keyboard behavior, visual fit, dependency footprint.
- Instruction: restyle to BrainnStation tokens; do not copy default shadcn look.

### Task B: Add charting surface

```text
We need a compact sparkline and score visualization for the scanner signal cell.
```

Expected:

- Layer: data visualization/UI.
- Sources: Recharts, SVG custom, TradingView Lightweight Charts depending on use case.
- Risks: bundle size, real-time performance, density, hover behavior.

### Task C: Evaluate MCP server

```text
We want an MCP server that lets the agent read GitHub issues and pull requests for the private BrainnStation repo.
```

Expected:

- Layer: AI tools/MCP/dev workflow.
- Risks: repo access, auth scopes, write permissions, secrets, private code exposure.
- Approval: required.

### Task D: Add package dependency

```text
We need a virtualization library for dense scanner rows.
```

Expected:

- Layer: packages/UI performance.
- Sources: npm official package pages and docs.
- Risks: React compatibility, row height assumptions, keyboard accessibility, maintenance.

---

## 25. Final product definition

RegistryRouter MCP should be defined as:

```text
RegistryRouter MCP is the source-routing layer for AI coding agents. It classifies software tasks, maps them to authoritative registries and docs, checks policy and risk, and returns a preflight report before implementation begins.
```

Brainn.dev should be defined as:

```text
Brainn.dev builds registry intelligence and preflight systems for AI-assisted software development.
```

The first public promise should be:

```text
Before your agent writes code, RegistryRouter tells it where to look, what to trust, what to avoid, and what needs approval.
```

---

## 26. Definition of done for MVP

The MVP is done when:

- The atlas is converted into structured catalog data.
- The MCP server exposes useful resources, tools, and prompts.
- A developer can install and call it locally.
- `resolve_registry` works for at least 50 realistic tasks.
- `generate_preflight_report` produces useful Markdown.
- Policy files can allow/block/require approval.
- Brainn.dev explains the product and hosts the atlas.
- At least 10 users have tested it.
- At least 5 users say it improves agent behavior.
- At least 3 users identify a paid use case.

---

## 27. North-star evaluation

Ask this after every build iteration:

```text
Would a coding agent make a safer, more accurate source decision after calling RegistryRouter than it would without it?
```

If yes, continue.

If no, simplify the product until the answer is yes.

