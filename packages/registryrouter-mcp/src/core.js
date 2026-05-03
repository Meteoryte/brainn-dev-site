import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_CATALOG_PATH = path.resolve(__dirname, "../data/catalog.json");

const HIGH_RISK_LAYERS = new Set([
  "auth_identity",
  "payments_billing",
  "infrastructure_platform",
  "security_compliance",
  "ai_models_tools"
]);

const AUTHORITY_SCORE = {
  official_install_source: 30,
  official_docs_source: 28,
  official_marketplace: 24,
  trusted_discovery_source: 16,
  community_reference: 8,
  internal_policy_source: 30,
  historical_only: -20,
  unknown: 0
};

const COST_SCORE = {
  free_open: 8,
  freemium: 4,
  paid_commercial: 1,
  mixed_marketplace: 2,
  deprecated_caution: -20,
  internal_private: 8,
  unknown_verify: 0
};

export function loadCatalog(catalogPath = DEFAULT_CATALOG_PATH) {
  const raw = fs.readFileSync(catalogPath, "utf8");
  return JSON.parse(raw);
}

export function loadPolicy(policyPath) {
  if (!policyPath) return defaultPolicy();
  const resolved = path.resolve(process.cwd(), policyPath);
  if (!fs.existsSync(resolved)) return defaultPolicy();
  const raw = fs.readFileSync(resolved, "utf8");
  return { ...defaultPolicy(), ...JSON.parse(raw) };
}

export function defaultPolicy() {
  return {
    id: "default",
    name: "Default RegistryRouter Policy",
    preferredRegistries: ["shadcn-ui", "radix-ui", "npm", "pypi", "authjs", "terraform-registry"],
    approvedRegistries: [],
    blockedRegistries: [],
    requireApprovalForLayers: ["auth_identity", "payments_billing", "infrastructure_platform", "ai_models_tools"],
    requireApprovalForCostModels: ["paid_commercial"],
    requireApprovalForRiskChecks: ["data_access", "secret_scope", "auth_scope", "human_approval", "customer_data", "cloud_permissions"]
  };
}

export function classifyTask(input, catalog = loadCatalog()) {
  const task = normalizeInput(input?.task ?? input ?? "");
  const stack = Array.isArray(input?.stack) ? input.stack : [];
  const text = `${task} ${stack.join(" ")}`.toLowerCase();

  const layerScores = catalog.layers.map((layer) => {
    let score = 0;
    const matches = [];
    for (const keyword of layer.keywords ?? []) {
      const normalizedKeyword = keyword.toLowerCase();
      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 3 : 2;
        matches.push(keyword);
      }
    }
    return { layer, score, matches };
  }).sort((a, b) => b.score - a.score);

  const top = layerScores[0];
  const primaryLayer = top?.score > 0 ? top.layer.id : "packages_dependencies";
  const secondaryLayers = layerScores
    .filter((item) => item.layer.id !== primaryLayer && item.score > 0)
    .slice(0, 3)
    .map((item) => item.layer.id);

  const requiredChecks = requiredChecksForLayer(primaryLayer, catalog);
  const confidence = top?.score > 0 ? Math.min(0.95, 0.45 + top.score * 0.08) : 0.35;

  return {
    task: input?.task ?? input ?? "",
    primary_layer: primaryLayer,
    primary_layer_label: labelForLayer(primaryLayer, catalog),
    secondary_layers: secondaryLayers,
    confidence: Number(confidence.toFixed(2)),
    matched_terms: top?.matches ?? [],
    required_checks: requiredChecks,
    human_approval_default: HIGH_RISK_LAYERS.has(primaryLayer),
    reason: top?.score > 0
      ? `Matched ${top.matches.length} source-routing signal(s) for ${labelForLayer(primaryLayer, catalog)}.`
      : "No strong layer match was found; defaulting to package/source verification."
  };
}

export function resolveRegistry(input, catalog = loadCatalog(), policy = defaultPolicy()) {
  const classification = classifyTask(input, catalog);
  const constraints = input?.constraints ?? {};
  const stack = Array.isArray(input?.stack) ? input.stack : [];
  const stackText = stack.join(" ").toLowerCase();

  const candidates = catalog.registries
    .map((registry) => {
      const layerMatch = registry.layer === classification.primary_layer ? 40 : classification.secondary_layers.includes(registry.layer) ? 18 : 0;
      const authorityScore = AUTHORITY_SCORE[registry.authority_level] ?? 0;
      const costScore = scoreCost(registry.cost_model, constraints);
      const policyScore = scorePolicy(registry, policy);
      const tagScore = (registry.tags ?? []).reduce((sum, tag) => stackText.includes(tag.toLowerCase()) ? sum + 4 : sum, 0);
      const riskPenalty = policy.blockedRegistries?.includes(registry.id) ? 100 : 0;
      return {
        registry,
        score: layerMatch + authorityScore + costScore + policyScore + tagScore - riskPenalty
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const primary = candidates.slice(0, 3).map(({ registry, score }) => formatSource(registry, score));
  const fallback = candidates.slice(3, 6).map(({ registry, score }) => formatSource(registry, score));
  const riskChecks = unique([
    ...classification.required_checks,
    ...primary.flatMap((source) => source.risk_checks ?? [])
  ]).slice(0, 12);
  const policyResult = checkPolicy({
    source_ids: primary.map((source) => source.id),
    task_layer: classification.primary_layer,
    risk_checks: riskChecks,
    cost_models: primary.map((source) => source.cost_model)
  }, policy, catalog);

  return {
    task: input?.task ?? input ?? "",
    classification,
    recommended_sources: primary,
    fallback_sources: fallback,
    risk_checks: riskChecks,
    policy_result: policyResult,
    human_approval_required: policyResult.status === "requires_approval" || policyResult.status === "blocked",
    agent_instruction: agentInstructionFor(classification.primary_layer, policyResult.status),
    uncertainty: primary.length === 0 ? "No matching registry source was found in the seed catalog." : null
  };
}

export function checkPolicy(input, policy = defaultPolicy(), catalog = loadCatalog()) {
  const sourceIds = input?.source_ids ?? (input?.source ? [input.source] : []);
  const registries = sourceIds
    .map((id) => catalog.registries.find((registry) => registry.id === id || registry.name.toLowerCase() === String(id).toLowerCase()))
    .filter(Boolean);

  const reasons = [];
  const blockingRules = [];
  const approvalRules = [];

  for (const registry of registries) {
    if (policy.blockedRegistries?.includes(registry.id)) {
      blockingRules.push(`blocked_registry:${registry.id}`);
      reasons.push(`${registry.name} is blocked by policy.`);
    }
    if (policy.requireApprovalForCostModels?.includes(registry.cost_model)) {
      approvalRules.push(`cost_model:${registry.cost_model}`);
      reasons.push(`${registry.name} has cost model ${registry.cost_model}.`);
    }
    for (const risk of registry.risk_checks ?? []) {
      if (policy.requireApprovalForRiskChecks?.includes(risk)) {
        approvalRules.push(`risk:${risk}`);
      }
    }
  }

  if (policy.requireApprovalForLayers?.includes(input?.task_layer)) {
    approvalRules.push(`layer:${input.task_layer}`);
    reasons.push(`${input.task_layer} requires approval under the active policy.`);
  }

  for (const risk of input?.risk_checks ?? []) {
    if (policy.requireApprovalForRiskChecks?.includes(risk)) approvalRules.push(`risk:${risk}`);
  }

  if (blockingRules.length > 0) {
    return {
      status: "blocked",
      reason: unique(reasons).join(" "),
      blocking_rules: unique(blockingRules),
      approval_rules: unique(approvalRules),
      allowed_alternatives: suggestAlternatives(input?.task_layer, catalog, policy)
    };
  }

  if (approvalRules.length > 0) {
    return {
      status: "requires_approval",
      reason: unique(reasons).join(" ") || "One or more selected sources or risk checks require human approval.",
      blocking_rules: [],
      approval_rules: unique(approvalRules),
      allowed_alternatives: suggestAlternatives(input?.task_layer, catalog, policy)
    };
  }

  return {
    status: "allowed",
    reason: "No active policy rule blocks or gates this source decision.",
    blocking_rules: [],
    approval_rules: [],
    allowed_alternatives: []
  };
}

export function generatePreflightReport(input, catalog = loadCatalog(), policy = defaultPolicy()) {
  const resolution = resolveRegistry(input, catalog, policy);
  const sourceLines = resolution.recommended_sources.length
    ? resolution.recommended_sources.map((source) => `- ${source.name}: ${source.best_for}`).join("\n")
    : "- No matching source found in the current seed catalog.";
  const fallbackLines = resolution.fallback_sources.length
    ? resolution.fallback_sources.map((source) => `- ${source.name}: ${source.best_for}`).join("\n")
    : "- None identified in the current seed catalog.";
  const checkLines = resolution.risk_checks.map((check) => `- ${humanize(check)}`).join("\n");

  return `# RegistryRouter Preflight Report\n\n## Task\n${resolution.task}\n\n## Classification\n- Primary layer: ${resolution.classification.primary_layer_label} (${resolution.classification.primary_layer})\n- Secondary layers: ${resolution.classification.secondary_layers.length ? resolution.classification.secondary_layers.join(", ") : "none"}\n- Confidence: ${resolution.classification.confidence}\n\n## Recommended sources\n${sourceLines}\n\n## Fallback sources\n${fallbackLines}\n\n## Required checks\n${checkLines}\n\n## Policy result\n- Status: ${resolution.policy_result.status}\n- Reason: ${resolution.policy_result.reason}\n\n## Human approval\n${resolution.human_approval_required ? "Required before implementation." : "Not required by the current policy."}\n\n## Agent instruction\n${resolution.agent_instruction}\n`;
}

function requiredChecksForLayer(layerId, catalog) {
  const registries = catalog.registries.filter((registry) => registry.layer === layerId);
  const checks = unique(registries.flatMap((registry) => registry.risk_checks ?? []));
  if (checks.length > 0) return checks.slice(0, 10);
  return ["authority", "license", "maintenance", "version_compatibility"];
}

function labelForLayer(layerId, catalog) {
  return catalog.layers.find((layer) => layer.id === layerId)?.label ?? layerId;
}

function scoreCost(costModel, constraints) {
  if (constraints?.avoid_paid_saas && costModel === "paid_commercial") return -30;
  if (constraints?.prefer_open_source && costModel === "free_open") return 12;
  return COST_SCORE[costModel] ?? 0;
}

function scorePolicy(registry, policy) {
  if (policy.blockedRegistries?.includes(registry.id)) return -100;
  if (policy.preferredRegistries?.includes(registry.id)) return 14;
  if (policy.approvedRegistries?.includes(registry.id)) return 10;
  return 0;
}

function formatSource(registry, score) {
  return {
    id: registry.id,
    name: registry.name,
    url: registry.url,
    layer: registry.layer,
    cost_model: registry.cost_model,
    authority_level: registry.authority_level,
    best_for: registry.best_for,
    use_when: registry.use_when,
    avoid_when: registry.avoid_when ?? null,
    risk_checks: registry.risk_checks ?? [],
    fit_score: score
  };
}

function suggestAlternatives(layerId, catalog, policy) {
  return catalog.registries
    .filter((registry) => registry.layer === layerId)
    .filter((registry) => !policy.blockedRegistries?.includes(registry.id))
    .slice(0, 3)
    .map((registry) => registry.name);
}

function agentInstructionFor(layerId, policyStatus) {
  const approval = policyStatus === "requires_approval" || policyStatus === "blocked"
    ? "Do not implement until the user reviews the policy result and approves the source decision."
    : "Present the source decision before implementation and cite the chosen authority.";

  const layerInstruction = {
    ui_frontend: "Use registry code for behavior and structure; adapt visible UI to the host product design system.",
    auth_identity: "Confirm provider, session model, token handling, and storage model before writing auth code.",
    payments_billing: "Confirm billing model, webhook strategy, API keys, and test mode before writing payment code.",
    infrastructure_platform: "Confirm provider, permissions, state/rollback strategy, and environment before changing infrastructure.",
    ai_models_tools: "Verify tool identity, permissions, data access, logging behavior, and prompt-injection risk before connecting the tool."
  }[layerId] ?? "Verify source authority, compatibility, license, maintenance, and rollback path before implementation.";

  return `${layerInstruction} ${approval}`;
}

function humanize(value) {
  return String(value).replaceAll("_", " ");
}

function normalizeInput(value) {
  return String(value ?? "").trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
