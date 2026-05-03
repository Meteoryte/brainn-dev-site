#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CATALOG_PATH = path.resolve(__dirname, "../data/catalog.json");

const REQUIRED_REGISTRY_FIELDS = [
  "id",
  "name",
  "url",
  "layer",
  "cost_model",
  "authority_level",
  "best_for",
  "use_when",
  "risk_checks",
  "tags"
];

const VALID_AUTHORITY_LEVELS = new Set([
  "official_install_source",
  "official_docs_source",
  "official_marketplace",
  "trusted_discovery_source",
  "community_reference",
  "internal_policy_source",
  "historical_only",
  "unknown"
]);

const VALID_COST_MODELS = new Set([
  "free_open",
  "freemium",
  "paid_commercial",
  "mixed_marketplace",
  "deprecated_caution",
  "internal_private",
  "unknown_verify"
]);

function validate() {
  let raw;
  try {
    raw = fs.readFileSync(CATALOG_PATH, "utf8");
  } catch (err) {
    error(`Cannot read catalog file: ${err.message}`);
    process.exit(1);
  }

  let catalog;
  try {
    catalog = JSON.parse(raw);
  } catch (err) {
    error(`catalog.json is not valid JSON: ${err.message}`);
    process.exit(1);
  }

  const errors = [];

  // Validate top-level structure
  if (!Array.isArray(catalog.layers)) {
    errors.push("catalog.layers must be an array");
  }
  if (!Array.isArray(catalog.registries)) {
    errors.push("catalog.registries must be an array");
  }

  if (errors.length > 0) {
    printErrors(errors);
    process.exit(1);
  }

  const layerIds = new Set(catalog.layers.map(l => l.id));

  // Validate layers
  const seenLayerIds = new Set();
  for (const [i, layer] of catalog.layers.entries()) {
    const prefix = `layers[${i}] (${layer.id ?? "?"})`;
    if (!layer.id) errors.push(`${prefix}: missing required field "id"`);
    if (!layer.label) errors.push(`${prefix}: missing required field "label"`);
    if (!Array.isArray(layer.keywords) || layer.keywords.length === 0) {
      errors.push(`${prefix}: "keywords" must be a non-empty array`);
    }
    if (layer.id) {
      if (seenLayerIds.has(layer.id)) {
        errors.push(`${prefix}: duplicate layer id "${layer.id}"`);
      }
      seenLayerIds.add(layer.id);
    }
  }

  // Validate registries
  const seenIds = new Set();
  for (const [i, reg] of catalog.registries.entries()) {
    const prefix = `registries[${i}] (${reg.id ?? "?"})`;

    for (const field of REQUIRED_REGISTRY_FIELDS) {
      if (reg[field] === undefined || reg[field] === null || reg[field] === "") {
        errors.push(`${prefix}: missing required field "${field}"`);
      }
    }

    if (reg.id) {
      if (seenIds.has(reg.id)) {
        errors.push(`${prefix}: duplicate id "${reg.id}"`);
      }
      seenIds.add(reg.id);
    }

    if (reg.layer && !layerIds.has(reg.layer)) {
      errors.push(`${prefix}: unknown layer "${reg.layer}" — not defined in catalog.layers`);
    }

    if (reg.authority_level && !VALID_AUTHORITY_LEVELS.has(reg.authority_level)) {
      errors.push(`${prefix}: unknown authority_level "${reg.authority_level}"`);
    }

    if (reg.cost_model && !VALID_COST_MODELS.has(reg.cost_model)) {
      errors.push(`${prefix}: unknown cost_model "${reg.cost_model}"`);
    }

    if (reg.url && !reg.url.startsWith("https://")) {
      errors.push(`${prefix}: url "${reg.url}" should start with https://`);
    }

    if (reg.risk_checks !== undefined && !Array.isArray(reg.risk_checks)) {
      errors.push(`${prefix}: "risk_checks" must be an array`);
    }

    if (reg.tags !== undefined && !Array.isArray(reg.tags)) {
      errors.push(`${prefix}: "tags" must be an array`);
    }
  }

  if (errors.length > 0) {
    printErrors(errors);
    process.exit(1);
  }

  console.log(
    `✓ catalog.json valid — ${catalog.layers.length} layers, ${catalog.registries.length} registries`
  );
}

function printErrors(errors) {
  console.error(`\ncatalog.json validation failed with ${errors.length} error(s):\n`);
  for (const msg of errors) {
    console.error(`  ✗ ${msg}`);
  }
  console.error("");
}

function error(msg) {
  console.error(`  ✗ ${msg}`);
}

validate();
