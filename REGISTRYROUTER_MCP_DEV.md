# RegistryRouter MCP Development Guide

This document describes the first local implementation of RegistryRouter MCP.

## Current state

The MCP server now exists as local code under:

```text
packages/registryrouter-mcp/
```

It is not published to npm yet. Use the local `node` path during development.

## Install dependencies

From the repository root:

```bash
npm install
```

This installs the workspace dependency for the MCP SDK.

## Smoke test the CLI

```bash
npm run registryrouter:smoke
```

Expected result: a Markdown preflight report for adding auth to a Next.js app.

Additional examples:

```bash
npm run registryrouter:classify -- "Add Stripe subscriptions" --stack Next.js,Supabase
npm run registryrouter:resolve -- "Add a command palette" --stack React,Tailwind --prefer-open-source
npm run registryrouter:preflight -- "Evaluate an MCP server for GitHub access" --stack GitHub,MCP
```

## Local MCP client config

Use an absolute path to the local server:

```json
{
  "mcpServers": {
    "registryrouter": {
      "command": "node",
      "args": ["/absolute/path/to/brainn-dev-site/packages/registryrouter-mcp/bin/server.js"],
      "env": {
        "REGISTRYROUTER_POLICY": "/absolute/path/to/brainn-dev-site/policies/default.policy.json"
      }
    }
  }
}
```

## Implemented tools

- `classify_task`
- `resolve_registry`
- `check_policy`
- `generate_preflight_report`

## Implemented resources

- `registryrouter://atlas/overview`
- `registryrouter://atlas/catalog`
- `registryrouter://policy/current`

## Seed catalog

The initial catalog is intentionally small and curated. It includes common sources for:

- UI/frontend
- packages/dependencies
- auth/identity
- payments/billing
- containers/deployment
- infrastructure/platform
- APIs/integrations
- AI/MCP/tools
- observability

The next step is to convert the larger atlas into structured JSON and merge it into `packages/registryrouter-mcp/data/catalog.json`.

## Publication guardrail

Do not publish `@brainn/registryrouter-mcp` until:

1. Local CLI smoke tests pass.
2. At least one MCP client can load the server and call all four tools.
3. Public website copy clearly distinguishes published package status from local development status.
4. The package has tests or a documented eval fixture set.
