#!/usr/bin/env node
import { classifyTask, generatePreflightReport, loadCatalog, loadPolicy, resolveRegistry, checkPolicy } from "../src/core.js";

const [command, ...rest] = process.argv.slice(2);
const options = parseOptions(rest);
const task = options._.join(" ").trim();
const catalog = loadCatalog();
const policy = loadPolicy(options.policy ?? process.env.REGISTRYROUTER_POLICY);

try {
  if (!command || command === "help" || command === "--help") {
    printHelp();
    process.exit(0);
  }

  if (command === "classify") {
    requireTask(task);
    printJson(classifyTask({ task, stack: parseStack(options.stack) }, catalog));
  } else if (command === "resolve") {
    requireTask(task);
    printJson(resolveRegistry({ task, stack: parseStack(options.stack), constraints: parseConstraints(options) }, catalog, policy));
  } else if (command === "preflight") {
    requireTask(task);
    console.log(generatePreflightReport({ task, stack: parseStack(options.stack), constraints: parseConstraints(options) }, catalog, policy));
  } else if (command === "policy") {
    printJson(checkPolicy({ task_layer: options.layer, source_ids: parseList(options.sources), risk_checks: parseList(options.risks) }, policy, catalog));
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(`registryrouter: ${error.message}`);
  process.exit(1);
}

function parseOptions(args) {
  const options = { _: [] };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      options._.push(arg);
      continue;
    }
    const [rawKey, rawValue] = arg.slice(2).split("=");
    const key = rawKey.replaceAll("-", "_");
    const next = args[index + 1];
    if (rawValue !== undefined) {
      options[key] = rawValue;
    } else if (next && !next.startsWith("--")) {
      options[key] = next;
      index += 1;
    } else {
      options[key] = true;
    }
  }
  return options;
}

function parseStack(value) {
  return parseList(value);
}

function parseList(value) {
  if (!value || value === true) return [];
  return String(value).split(",").map((item) => item.trim()).filter(Boolean);
}

function parseConstraints(options) {
  return {
    prefer_open_source: Boolean(options.prefer_open_source),
    avoid_paid_saas: Boolean(options.avoid_paid_saas)
  };
}

function requireTask(value) {
  if (!value) throw new Error("A task is required. Example: registryrouter preflight \"Add auth to a Next.js app\"");
}

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}

function printHelp() {
  console.log(`RegistryRouter CLI

Usage:
  registryrouter classify "Add auth to a Next.js app" --stack Next.js,Postgres,Vercel
  registryrouter resolve "Add a command palette" --stack React,Tailwind --prefer-open-source
  registryrouter preflight "Add Stripe subscriptions" --stack Next.js,Supabase

Commands:
  classify   Classify a software task into a source-routing layer.
  resolve    Recommend authoritative sources and risk checks.
  preflight  Generate a Markdown preflight report.
  policy     Check a source/layer against the active policy.
`);
}
