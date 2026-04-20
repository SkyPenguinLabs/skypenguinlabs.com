import { toolById, toolBySlug, toolsTree } from "/static/assets/js/tools-data.js";

const card = document.querySelector("#node-card");
let hideCardTimer = null;
const branchState = new Map();
const mobileCardMedia = window.matchMedia("(max-width: 720px), (hover: none), (pointer: coarse)");
const docsBasePath = window.toolsPagesConfig?.docsBasePath || "/content/tools/";

function createTreeNode(node, depth = 0, isLast = true) {
  const item = document.createElement("li");
  item.className = "tree-item";
  if (depth === 0) item.classList.add("root-node");

  if (typeof node === "string") {
    const tool = toolById.get(node);
    if (!tool) return item;
    const link = document.createElement("a");
    link.className = "tree-leaf";
    link.href = tool.href;
    link.dataset.nodeId = tool.id;
    link.innerHTML = `<span class="tree-icon">${isLast ? "└─&gt;" : "├─&gt;"}</span><span class="tree-leaf-label">${tool.label}</span>`;
    attachCardEvents(link, tool);
    item.append(link);
    return item;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "tree-node";
  button.dataset.nodeId = node.id;
  const initialExpanded = branchState.has(node.id) ? branchState.get(node.id) : Boolean(node.defaultExpanded);
  button.setAttribute("aria-expanded", initialExpanded ? "true" : "false");
  button.innerHTML = `<span class="tree-icon">${node.children?.length ? (initialExpanded ? "-" : "+") : "•"}</span><span class="tree-node-label">${node.label}</span>`;
  attachCardEvents(button, node);
  item.append(button);

  if (node.children?.length) {
    const childList = document.createElement("ul");
    childList.className = "tree-children";
    if (!initialExpanded) childList.hidden = true;

    node.children.forEach((child, index) => {
      childList.append(createTreeNode(child, depth + 1, index === node.children.length - 1));
    });

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const nextExpanded = !expanded;
      branchState.set(node.id, nextExpanded);
      button.setAttribute("aria-expanded", nextExpanded ? "true" : "false");
      button.querySelector(".tree-icon").textContent = nextExpanded ? "-" : "+";
      childList.hidden = !nextExpanded;
    });

    item.append(childList);
  }

  return item;
}

function attachCardEvents(element, node) {
  const update = () => {
    if (hideCardTimer) {
      clearTimeout(hideCardTimer);
      hideCardTimer = null;
    }
    renderCard(node, element);
  };
  element.addEventListener("mouseenter", update);
  element.addEventListener("focus", update);
  element.addEventListener("mouseleave", scheduleHideCard);
  element.addEventListener("blur", scheduleHideCard);
}

function scheduleHideCard() {
  if (!card) return;
  hideCardTimer = window.setTimeout(() => {
    card.hidden = true;
  }, 90);
}

function positionCard(anchor) {
  if (!card || !anchor) return;
  if (mobileCardMedia.matches) {
    card.style.left = "";
    card.style.top = "";
    return;
  }
  const rect = anchor.getBoundingClientRect();
  const gap = 18;
  const cardWidth = Math.min(352, window.innerWidth - 16);
  let left = rect.right + gap;
  let top = rect.top - 8;

  if (left + cardWidth > window.innerWidth - 12) {
    left = Math.max(8, rect.left - cardWidth - gap);
  }

  const estimatedHeight = Math.max(card.offsetHeight || 220, 180);
  if (top + estimatedHeight > window.innerHeight - 12) {
    top = Math.max(8, window.innerHeight - estimatedHeight - 12);
  }

  card.style.left = `${Math.max(8, left)}px`;
  card.style.top = `${Math.max(8, top)}px`;
}

function handleViewportModeChange() {
  if (!card) return;
  card.hidden = true;
  if (mobileCardMedia.matches) {
    card.style.left = "";
    card.style.top = "";
  }
}

function renderCard(node, anchor) {
  if (!card) return;
  const meta = node.meta
    ? Object.values(node.meta).map((value) => `<span>${value}</span>`).join("")
    : "";
  const detailLink = node.type === "tool" ? `<a class="node-card-link" href="${node.href}">Open tool page</a>` : "";
  card.innerHTML = `
    <p class="node-card-kicker">${node.type === "tool" ? "Tool preview" : "Branch preview"}</p>
    <h3>${node.label}</h3>
    <p>${node.description}</p>
    ${meta ? `<div class="node-card-meta">${meta}</div>` : ""}
    ${detailLink}
  `;
  card.hidden = false;
  positionCard(anchor);
}

function renderCatalogue() {
  const root = document.querySelector("#tree-root");
  if (!root) return;
  const list = document.createElement("ul");
  list.className = "tree-list";
  list.append(createTreeNode(toolsTree));
  root.append(list);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeHref(href) {
  if (/^(https?:|mailto:|\/|#)/.test(href)) {
    return href;
  }
  return "#";
}

function renderInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(sanitizeHref(href))}">${label}</a>`);
}

function parseFrontMatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { attributes: {}, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { attributes: {}, body: markdown };
  }

  const raw = markdown.slice(4, endIndex).split("\n");
  const body = markdown.slice(endIndex + 5);
  const attributes = {};
  let currentKey = null;

  raw.forEach((line) => {
    if (/^\s*-\s+/.test(line) && currentKey) {
      if (!Array.isArray(attributes[currentKey])) {
        attributes[currentKey] = [];
      }
      attributes[currentKey].push(line.replace(/^\s*-\s+/, "").trim());
      return;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      return;
    }

    const [, key, value] = match;
    currentKey = key;
    attributes[key] = value.trim() ? value.trim() : [];
  });

  return { attributes, body };
}

function renderMarkdownBlocks(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const chunks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const language = fence[1] || "";
      index += 1;
      const code = [];
      while (index < lines.length && !/^```/.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      chunks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      chunks.push(`<h${level}>${renderInlineMarkdown(heading[2].trim())}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*-\s+/.test(lines[index])) {
        items.push(`<li>${renderInlineMarkdown(lines[index].replace(/^\s*-\s+/, "").trim())}</li>`);
        index += 1;
      }
      chunks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const paragraph = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{2,3})\s+/.test(lines[index]) &&
      !/^\s*-\s+/.test(lines[index]) &&
      !/^```/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    chunks.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
  }

  return chunks.join("");
}

function getToolSlugFromLocation() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("tool")) {
    return params.get("tool");
  }

  const pathMatch = window.location.pathname.match(/\/tools\/([^/]+)\/?$/);
  if (pathMatch && pathMatch[1] !== "view") {
    return pathMatch[1];
  }

  return "";
}

function renderDetailError(detailRoot, message) {
  const docsTarget = detailRoot.querySelector("[data-tool-docs]");
  const nameTarget = detailRoot.querySelector("[data-tool-name]");
  const purposeTarget = detailRoot.querySelector("[data-tool-purpose]");
  const summaryTarget = detailRoot.querySelector("[data-tool-summary]");
  if (nameTarget) nameTarget.textContent = "tool not found";
  if (purposeTarget) purposeTarget.textContent = message;
  if (summaryTarget) summaryTarget.textContent = "The requested tool detail document could not be loaded from the local markdown source.";
  if (docsTarget) docsTarget.innerHTML = `<p>${escapeHtml(message)}</p>`;
}

async function renderDetail() {
  const detailRoot = document.querySelector("[data-tool-detail-root]");
  if (!detailRoot) return;

  const slug = getToolSlugFromLocation();
  const tool = toolBySlug.get(slug);
  if (!tool) {
    renderDetailError(detailRoot, "Unknown tool slug.");
    return;
  }

  let parsed = { attributes: {}, body: "" };
  try {
    const response = await fetch(`${docsBasePath}${tool.slug}.md`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load ${tool.slug}.md`);
    }
    parsed = parseFrontMatter(await response.text());
  } catch (error) {
    renderDetailError(detailRoot, error.message);
    return;
  }

  const attributes = parsed.attributes;
  const name = attributes.title || tool.label;
  const purpose = attributes.purpose || tool.description;
  const summary = attributes.summary || tool.description;
  const category = attributes.category || tool.category;
  const usage = attributes.usage || tool.usage;
  const capabilities = Array.isArray(attributes.capabilities) && attributes.capabilities.length
    ? attributes.capabilities
    : tool.capabilities;
  const related = Array.isArray(attributes.related) && attributes.related.length
    ? attributes.related
    : tool.related;
  const meta = {
    stack: attributes.stack || tool.meta.stack,
    platform: attributes.platform || tool.meta.platform,
    status: attributes.status || tool.meta.status
  };

  document.title = `${name} | /tools`;

  const nameTarget = detailRoot.querySelector("[data-tool-name]");
  const purposeTarget = detailRoot.querySelector("[data-tool-purpose]");
  const metaTarget = detailRoot.querySelector("[data-tool-meta]");
  const summaryTarget = detailRoot.querySelector("[data-tool-summary]");
  const capabilitiesTarget = detailRoot.querySelector("[data-tool-capabilities]");
  const usageTarget = detailRoot.querySelector("[data-tool-usage]");
  const relatedTarget = detailRoot.querySelector("[data-tool-related]");
  const asideCategory = detailRoot.querySelector("[data-tool-category]");
  const docsTarget = detailRoot.querySelector("[data-tool-docs]");

  if (nameTarget) nameTarget.textContent = name;
  if (purposeTarget) purposeTarget.textContent = purpose;
  if (summaryTarget) summaryTarget.textContent = summary;
  if (asideCategory) asideCategory.textContent = category;

  if (metaTarget) {
    metaTarget.innerHTML = Object.entries(meta)
      .map(([key, value]) => `<li class="chip">${escapeHtml(key)}: ${escapeHtml(value)}</li>`)
      .join("");
  }

  if (capabilitiesTarget) {
    capabilitiesTarget.innerHTML = capabilities.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  if (usageTarget) {
    usageTarget.textContent = usage;
  }

  if (relatedTarget) {
    relatedTarget.innerHTML = related
      .map((id) => {
        const relatedTool = toolById.get(id);
        return relatedTool ? `<li><a href="${relatedTool.href}">${escapeHtml(relatedTool.label)}</a></li>` : "";
      })
      .join("");
  }

  if (docsTarget) {
    docsTarget.innerHTML = renderMarkdownBlocks(parsed.body);
  }
}

renderCatalogue();
renderDetail();

mobileCardMedia.addEventListener("change", handleViewportModeChange);
window.addEventListener("resize", () => {
  if (mobileCardMedia.matches && card) {
    card.style.left = "";
    card.style.top = "";
  }
});
