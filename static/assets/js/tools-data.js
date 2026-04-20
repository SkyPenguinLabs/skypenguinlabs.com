export const toolsTree = {
  id: "tools-root",
  type: "root",
  label: "tools/",
  description: "Top-level catalogue for automation engineering, cybersecurity tooling, and reusable snippets.",
  children: [
    {
      id: "categories-root",
      type: "branch",
      label: "categories/",
      description: "Primary branch set used to organize the catalogue into operational domains.",
      defaultExpanded: true,
      children: [
        {
          id: "automation",
          type: "branch",
          label: "Automation",
          description: "Workflow automation, fleet bootstrap, orchestration, and operational tooling that reduces repetitive engineering effort.",
          defaultExpanded: false,
          children: [
            "orchestrator-fabric",
            "endpoint-bootstrap",
            "ops-scheduler"
          ]
        },
        {
          id: "cybersecurity",
          type: "branch",
          label: "Cybersecurity",
          description: "Security operations, triage, telemetry normalization, and defensive workflow tooling.",
          defaultExpanded: false,
          children: [
            "cred-sentry",
            "phishlens",
            "tracevault"
          ]
        },
        {
          id: "snippets",
          type: "branch",
          label: "Snippets",
          description: "Reusable field snippets, compact helpers, and fast-drop reference utilities for common engineering tasks.",
          defaultExpanded: false,
          children: [
            "pwsh-entra-kit",
            "yara-lab",
            "shell-probe"
          ]
        }
      ]
    }
  ]
};

const detailBasePath = window.toolsPagesConfig?.detailBasePath || "/tools/view/";

export const toolEntries = [
  {
    id: "orchestrator-fabric",
    type: "tool",
    slug: "orchestrator-fabric",
    label: "orchestrator-fabric",
    parent: "automation",
    category: "Automation",
    href: `${detailBasePath}?tool=orchestrator-fabric`,
    description: "Distributed job runner for scheduled automation, task fan-out, and operator-visible execution state.",
    meta: {
      stack: "Python · Bash",
      platform: "Linux / Hybrid",
      status: "Production-minded"
    },
    capabilities: [
      "Dispatches repeatable workflows across nodes or utility hosts.",
      "Normalizes job logs into one operator-readable execution stream.",
      "Supports safe reruns, targeted retries, and audit-friendly task naming."
    ],
    usage: "orchestrator-fabric run nightly-patch --targets fleet-a",
    related: ["endpoint-bootstrap", "ops-scheduler"]
  },
  {
    id: "endpoint-bootstrap",
    type: "tool",
    slug: "endpoint-bootstrap",
    label: "endpoint-bootstrap",
    parent: "automation",
    category: "Automation",
    href: `${detailBasePath}?tool=endpoint-bootstrap`,
    description: "Provisioning toolkit for bringing endpoints into a known-good baseline with repeatable package, config, and policy setup.",
    meta: {
      stack: "PowerShell · Bash",
      platform: "Windows / Linux",
      status: "Field-ready"
    },
    capabilities: [
      "Applies baseline configuration to fresh or rebuilt endpoints.",
      "Pins package and service setup into a repeatable bootstrap sequence.",
      "Produces a concise completion summary for handoff or review."
    ],
    usage: "endpoint-bootstrap apply --profile workstation-secure",
    related: ["orchestrator-fabric", "pwsh-entra-kit"]
  },
  {
    id: "ops-scheduler",
    type: "tool",
    slug: "ops-scheduler",
    label: "ops-scheduler",
    parent: "automation",
    category: "Automation",
    href: `${detailBasePath}?tool=ops-scheduler`,
    description: "A compact operator scheduler for maintenance windows, recurring tasks, and dependency-aware IT routines.",
    meta: {
      stack: "Go",
      platform: "Cross-platform",
      status: "Stable core"
    },
    capabilities: [
      "Models recurring jobs without a heavy orchestration platform.",
      "Captures dependency ordering and maintenance windows directly in config.",
      "Surfaces next-run, drift, and failure state with minimal noise."
    ],
    usage: "ops-scheduler plan --window patching-q2",
    related: ["orchestrator-fabric"]
  },
  {
    id: "cred-sentry",
    type: "tool",
    slug: "cred-sentry",
    label: "cred-sentry",
    parent: "cybersecurity",
    category: "Cybersecurity",
    href: `${detailBasePath}?tool=cred-sentry`,
    description: "Credential exposure and hygiene monitor that flags risky secret placement, aging credentials, and weak storage patterns.",
    meta: {
      stack: "Python",
      platform: "Cross-platform",
      status: "Internal ops"
    },
    capabilities: [
      "Scans configured paths and repos for secret-handling drift.",
      "Highlights ownership gaps and risky credential persistence patterns.",
      "Produces compact triage notes suitable for engineering follow-up."
    ],
    usage: "cred-sentry audit --scope repos --severity high",
    related: ["tracevault", "shell-probe"]
  },
  {
    id: "phishlens",
    type: "tool",
    slug: "phishlens",
    label: "phishlens",
    parent: "cybersecurity",
    category: "Cybersecurity",
    href: `${detailBasePath}?tool=phishlens`,
    description: "Message triage helper for rapidly extracting indicators, suspicious routing traits, and analyst notes from email artifacts.",
    meta: {
      stack: "Python · HTML parsing",
      platform: "Cross-platform",
      status: "Analyst utility"
    },
    capabilities: [
      "Pulls indicators and routing metadata from suspicious messages.",
      "Normalizes message artifacts into a compact analyst-ready summary.",
      "Speeds first-pass review without forcing a full mail-client workflow."
    ],
    usage: "phishlens inspect sample.eml --emit summary",
    related: ["tracevault", "yara-lab"]
  },
  {
    id: "tracevault",
    type: "tool",
    slug: "tracevault",
    label: "tracevault",
    parent: "cybersecurity",
    category: "Cybersecurity",
    href: `${detailBasePath}?tool=tracevault`,
    description: "Incident evidence organizer for logs, timelines, extracted indicators, and operator comments across an investigation.",
    meta: {
      stack: "Go · SQLite",
      platform: "Cross-platform",
      status: "Investigation core"
    },
    capabilities: [
      "Collects trace fragments, timeline notes, and evidence references in one place.",
      "Makes incident reconstruction easier to review and continue later.",
      "Preserves structured notes without forcing a heavy case-management suite."
    ],
    usage: "tracevault case open --name vpn-anomaly-0418",
    related: ["phishlens", "cred-sentry"]
  },
  {
    id: "pwsh-entra-kit",
    type: "tool",
    slug: "pwsh-entra-kit",
    label: "pwsh-entra-kit",
    parent: "snippets",
    category: "Snippets",
    href: `${detailBasePath}?tool=pwsh-entra-kit`,
    description: "Reusable PowerShell snippets for Entra ID and Graph-driven tenant operations with cleaner auth and object handling patterns.",
    meta: {
      stack: "PowerShell",
      platform: "Windows / Linux",
      status: "Snippet pack"
    },
    capabilities: [
      "Collects proven Graph and Entra snippets into a cleaner operator toolkit.",
      "Reduces rework around auth, pagination, and output shaping.",
      "Acts as a ready reference when writing tenant automation quickly."
    ],
    usage: "Import-Module ./pwsh-entra-kit.psm1",
    related: ["endpoint-bootstrap", "shell-probe"]
  },
  {
    id: "yara-lab",
    type: "tool",
    slug: "yara-lab",
    label: "yara-lab",
    parent: "snippets",
    category: "Snippets",
    href: `${detailBasePath}?tool=yara-lab`,
    description: "Compact YARA helpers and test harness snippets for iterating on rules, false positives, and sample validation faster.",
    meta: {
      stack: "Python · YARA",
      platform: "Cross-platform",
      status: "Rapid utility"
    },
    capabilities: [
      "Wraps common YARA test loops into simpler repeatable snippets.",
      "Makes sample validation and false-positive checking faster.",
      "Keeps rule iteration lightweight when a full pipeline is unnecessary."
    ],
    usage: "yara-lab test rules/ samples/ --explain",
    related: ["phishlens", "shell-probe"]
  },
  {
    id: "shell-probe",
    type: "tool",
    slug: "shell-probe",
    label: "shell-probe",
    parent: "snippets",
    category: "Snippets",
    href: `${detailBasePath}?tool=shell-probe`,
    description: "A set of shell-first diagnostics snippets for confirming host posture, service state, and basic runtime health quickly.",
    meta: {
      stack: "Bash",
      platform: "Linux",
      status: "Operator staple"
    },
    capabilities: [
      "Provides fast host inspection snippets for common troubleshooting paths.",
      "Summarizes service, process, network, and filesystem checks cleanly.",
      "Works as a drop-in field reference during triage or provisioning."
    ],
    usage: "./shell-probe.sh --mode host-health",
    related: ["endpoint-bootstrap", "cred-sentry"]
  }
];

export const toolById = new Map(toolEntries.map((tool) => [tool.id, tool]));
export const toolBySlug = new Map(toolEntries.map((tool) => [tool.slug, tool]));
