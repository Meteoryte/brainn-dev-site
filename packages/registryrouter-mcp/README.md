# RegistryRouter MCP

Local-first MCP server for source routing and registry intelligence.

RegistryRouter helps an AI coding agent answer this question before it writes code:

> Which registry, package index, documentation source, marketplace, or internal catalog should I trust for this task?

## Status

This package is the initial implementation scaffold. It is private/unpublished while the interface is tested locally.

## What it includes

- Seed registry catalog in `data/catalog.json`
- Core source-routing functions in `src/core.js`
- CLI for local smoke testing
- MCP server over stdio
- Optional policy loading through `REGISTRYROUTER_POLICY`

## Local CLI usage

From the repository root:

```bash
npm run registryrouter:smoke
```

Or directly:

```bash
node packages/registryrouter-mcp/bin/registryrouter-cli.js classify "Add auth to a Next.js app" --stack Next.js,Postgres,Vercel
node packages/registryrouter-mcp/bin/registryrouter-cli.js resolve "Add a command palette" --stack React,Tailwind --prefer-open-source
node packages/registryrouter-mcp/bin/registryrouter-cli.js preflight "Add Stripe subscriptions" --stack Next.js,Supabase
```

## MCP client config

For local development, point your MCP client at the local server file:

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

After package publication, this can become:

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

## Tools

- `classify_task` — classify the software layer.
- `resolve_registry` — recommend authoritative sources and risk checks.
- `check_policy` — apply local/team rules.
- `generate_preflight_report` — return a reviewable Markdown report before implementation.

## Resources

- `registryrouter://atlas/overview`
- `registryrouter://atlas/catalog`
- `registryrouter://policy/current`

## Next steps

- Expand catalog coverage from the full atlas.
- Add validation tests.
- Add richer source comparison.
- Add generated JSON from the long-form atlas.
- Publish once local MCP smoke tests pass in target clients.
