# Brainn.dev Static Site Deploy

This repository is the deployable static website for `brainn.dev`.

## Current pages

- `index.html` — RegistryRouter MCP landing page
- `atlas.html` — cleaner product-facing atlas landing page
- `full_stack_registry_llm_reference.html` — long-form full-stack registry atlas reference
- `mcp.html` — MCP setup and tool contract
- `examples.html` — preflight report examples
- `about.html` — Brainn.dev / RegistryRouter positioning and roadmap
- `styles.css` — shared visual system
- `CNAME` — custom domain for GitHub Pages
- `robots.txt` and `sitemap.xml` — basic search support

## Local preview

Open `index.html` directly in a browser.

No build step is required.

## Free GitHub Pages deploy

1. Create or open the public GitHub repository, for example `brainn-dev-site`.
2. Copy every file in this folder into the repository root.
3. Rename `GITIGNORE_TEMPLATE.txt` to `.gitignore` locally if needed.
4. Commit and push.
5. In GitHub, open the repository settings.
6. Go to **Pages**.
7. Set source to `Deploy from a branch`.
8. Choose branch `main` and folder `/root`.
9. Save.
10. Under custom domain, enter `brainn.dev`.
11. Wait for DNS checks, then enable **Enforce HTTPS**.

## DNS records for GitHub Pages

The current custom domain is `brainn.dev`.

Use these records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | meteoryte.github.io |

## Scope rule

The active site scope is RegistryRouter MCP / source routing for AI coding agents.

Older AI-agency, FieldOps, Knowledge Copilot, and finance-platform planning material should stay out of the public site unless intentionally reintroduced later.

## Next implementation steps

1. Polish `atlas.html` as the public entry point to the long-form atlas.
2. Configure email forwarding before making `hello@brainn.dev` a primary CTA.
3. Convert the atlas HTML data into versioned JSON.
4. Build `packages/registryrouter-data` with schema validation.
5. Build the deterministic core functions:
   - `classifyTask`
   - `resolveRegistry`
   - `compareSources`
   - `checkPolicy`
   - `generatePreflightReport`
6. Publish the local-first MCP package.
7. Replace the placeholder install instructions with the live package command.
