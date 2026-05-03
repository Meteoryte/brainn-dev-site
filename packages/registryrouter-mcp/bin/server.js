#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { classifyTask, defaultPolicy, generatePreflightReport, loadCatalog, loadPolicy, resolveRegistry, checkPolicy } from "../src/core.js";

const catalog = loadCatalog();
const policy = loadPolicy(process.env.REGISTRYROUTER_POLICY);

const server = new McpServer({
  name: "registryrouter",
  version: "0.0.1"
});

server.resource(
  "registryrouter-atlas-overview",
  "registryrouter://atlas/overview",
  async () => ({
    contents: [
      {
        uri: "registryrouter://atlas/overview",
        mimeType: "application/json",
        text: JSON.stringify({
          name: "RegistryRouter",
          purpose: "Classify coding tasks, route agents to authoritative sources, check policy, and produce preflight reports before implementation.",
          catalog_version: catalog.version,
          layers: catalog.layers.map((layer) => ({ id: layer.id, label: layer.label })),
          core_rule: "Choose the authoritative source for the software layer before writing code."
        }, null, 2)
      }
    ]
  })
);

server.resource(
  "registryrouter-catalog",
  "registryrouter://atlas/catalog",
  async () => ({
    contents: [
      {
        uri: "registryrouter://atlas/catalog",
        mimeType: "application/json",
        text: JSON.stringify(catalog, null, 2)
      }
    ]
  })
);

server.resource(
  "registryrouter-policy",
  "registryrouter://policy/current",
  async () => ({
    contents: [
      {
        uri: "registryrouter://policy/current",
        mimeType: "application/json",
        text: JSON.stringify(policy, null, 2)
      }
    ]
  })
);

server.tool(
  "classify_task",
  "Classify a software task into a source-routing layer before implementation.",
  {
    task: z.string().min(1),
    stack: z.array(z.string()).optional()
  },
  async (input) => jsonResult(classifyTask(input, catalog))
);

server.tool(
  "resolve_registry",
  "Recommend authoritative registries, docs, package indexes, marketplaces, or catalogs for a task.",
  {
    task: z.string().min(1),
    stack: z.array(z.string()).optional(),
    constraints: z.object({
      prefer_open_source: z.boolean().optional(),
      avoid_paid_saas: z.boolean().optional()
    }).optional()
  },
  async (input) => jsonResult(resolveRegistry(input, catalog, policy))
);

server.tool(
  "check_policy",
  "Check a source decision against the active RegistryRouter policy.",
  {
    task_layer: z.string().optional(),
    source_ids: z.array(z.string()).optional(),
    risk_checks: z.array(z.string()).optional(),
    cost_models: z.array(z.string()).optional()
  },
  async (input) => jsonResult(checkPolicy(input, policy, catalog))
);

server.tool(
  "generate_preflight_report",
  "Generate a Markdown preflight report before an agent writes code.",
  {
    task: z.string().min(1),
    stack: z.array(z.string()).optional(),
    constraints: z.object({
      prefer_open_source: z.boolean().optional(),
      avoid_paid_saas: z.boolean().optional()
    }).optional()
  },
  async (input) => ({
    content: [
      {
        type: "text",
        text: generatePreflightReport(input, catalog, policy)
      }
    ]
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);

function jsonResult(value) {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(value, null, 2)
      }
    ]
  };
}
