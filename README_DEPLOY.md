# Brainn.dev Static Site Deploy

This folder is now a deployable static website for `brainn.dev`.

## Current pages

- `index.html` — RegistryRouter MCP landing page
- `full_stack_registry_llm_reference.html` — full-stack registry atlas
- `mcp.html` — MCP setup and tool contract
- `examples.html` — preflight report examples
- `styles.css` — shared visual system
- `CNAME` — custom domain for GitHub Pages
- `robots.txt` and `sitemap.xml` — basic search support

## Local preview

Open `index.html` directly in a browser.

No build step is required.

## Free GitHub Pages deploy

1. Create a new public GitHub repository, for example `brainn-dev-site`.
2. Copy every file in this folder into the repository root.
3. Rename `GITIGNORE_TEMPLATE.txt` to `.gitignore` locally.
4. Commit and push.
5. In GitHub, open the repository settings.
6. Go to **Pages**.
7. Set source to `Deploy from a branch`.
8. Choose branch `main` and folder `/root`.
9. Save.
10. Under custom domain, enter `brainn.dev`.
11. Wait for DNS checks, then enable **Enforce HTTPS**.

## GoDaddy DNS records for GitHub Pages

In GoDaddy DNS for `brainn.dev`, set these records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR-GITHUB-USERNAME.github.io |

Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

## Scope rule

The active site scope is RegistryRouter MCP / source routing for AI coding agents.

Older AI-agency, FieldOps, Knowledge Copilot, and finance-platform planning material should stay out of the public site unless intentionally reintroduced later.

## Next implementation steps

1. Convert the atlas HTML data into versioned JSON.
2. Build `packages/registryrouter-data` with schema validation.
3. Build the deterministic core functions:
   - `classifyTask`
   - `resolveRegistry`
   - `compareSources`
   - `checkPolicy`
   - `generatePreflightReport`
4. Publish the local-first MCP package.
5. Replace the placeholder install instructions with the live package command.
