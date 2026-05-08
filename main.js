"use strict";

const {
  ItemView,
  Menu,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  TFile,
  setIcon,
} = require("obsidian");

const VIEW_TYPE = "edge-like-vertical-tabs-lite-view";
const UNGROUPED_ID = "__ungrouped__";

const GROUP_COLORS = [
  "slate",
  "gold",
  "amber",
  "orange",
  "tomato",
  "ruby",
  "crimson",
  "pink",
  "plum",
  "purple",
  "violet",
  "iris",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "jade",
  "green",
  "grass",
  "mint",
  "lime",
];
const COLOR_VALUES = {
  slate: "#697386",
  grey: "#8d8d8d",
  gray: "#8d8d8d",
  gold: "#f1a10d",
  amber: "#ffb224",
  yellow: "#f5d90a",
  orange: "#f76808",
  tomato: "#e54d2e",
  red: "#e5484d",
  ruby: "#e54666",
  crimson: "#e93d82",
  pink: "#d6409f",
  plum: "#ab4aba",
  purple: "#8e4ec6",
  violet: "#6e56cf",
  iris: "#5b5bd6",
  indigo: "#3e63dd",
  blue: "#0091ff",
  sky: "#7ce2fe",
  cyan: "#05a2c2",
  teal: "#12a594",
  jade: "#29a383",
  green: "#30a46c",
  grass: "#46a758",
  mint: "#86ead4",
  lime: "#bdee63",
};
const COLOR_LABELS = {
  slate: "Slate",
  gold: "Gold",
  amber: "Amber",
  orange: "Orange",
  tomato: "Tomato",
  ruby: "Ruby",
  crimson: "Crimson",
  pink: "Pink",
  plum: "Plum",
  purple: "Purple",
  violet: "Violet",
  iris: "Iris",
  indigo: "Indigo",
  blue: "Blue",
  sky: "Sky",
  cyan: "Cyan",
  teal: "Teal",
  jade: "Jade",
  green: "Green",
  grass: "Grass",
  mint: "Mint",
  lime: "Lime",
};
const COLOR_LABELS_ZH = {
  slate: "石板灰", gold: "金色", amber: "琥珀", orange: "橙色",
  tomato: "番茄红", ruby: "宝石红", crimson: "胭脂红", pink: "粉色",
  plum: "梅紫", purple: "紫色", violet: "堇紫", iris: "鸢尾蓝",
  indigo: "靛蓝", blue: "蓝色", sky: "天蓝", cyan: "青色",
  teal: "蓝绿", jade: "翡翠", green: "绿色", grass: "草绿",
  mint: "薄荷", lime: "青柠",
};
const TEXT_ZH = {
  tabGroups: "标签流管家", groupName: "分组名称", color: "颜色", cancel: "取消", ok: "确定",
  create: "创建", save: "保存", refresh: "刷新", emptyGroupName: "分组名称不能为空",
  verticalTabsTitle: "标签流管家", openOnStartup: "启动时打开左侧分组标签栏",
  openOnStartupDesc: "打开 Obsidian 后自动在左侧栏显示这个面板。", hideHorizontalTabs: "隐藏顶部横向标签栏",
  hideHorizontalTabsDesc: "仅在左侧垂直标签组面板可见时隐藏主编辑区顶部 tabs。", markdownOnly: "只显示 Markdown 标签",
  markdownOnlyDesc: "关闭后也会显示 PDF、Canvas、网页等其他视图。", showUngrouped: "显示未分组区域", grouping: "分组方式",
  groupingMode: "分组模式", groupingModeDesc: "可在手动分组与自动分组之间切换。", manualMode: "手动分组",
  autoMode: "按路径自动分组", autoByPath: "按文件路径", pathLevel: "路径层级", pathLevelDesc: "按第几级目录分组。",
  level1: "一级目录", level2: "二级目录", level3: "三级目录", level4: "四级目录", level5: "五级目录",
  rootFolder: "根目录",
  floatingEntry: "悬浮入口", showFloatingEntry: "显示悬浮入口",
  showFloatingEntryDesc: "关闭后，不在当前编辑页面角落显示悬浮标签组入口。", floatingPosition: "悬浮位置",
  floatingPositionDesc: "相对于当前编辑页面的四个角定位。", bottomLeft: "左下角", bottomRight: "右下角",
  topLeft: "左上角", topRight: "右上角", horizontalOffset: "水平距离",
  horizontalOffsetDesc: "离左边或右边的距离，单位 px。", verticalOffset: "垂直距离",
  verticalOffsetDesc: "离顶端或底端的距离，单位 px。", groups: "分组",
  noGroups: "暂无分组。可以在垂直标签组面板中新建。", newGroup: "新建分组",
  newTabGroup: "新建标签分组", renameTabGroup: "重命名标签分组", removedFromGroup: "已移出分组",
  noOpenTabs: "没有打开的标签", ungrouped: "未分组", renameGroup: "重命名分组",
  expandGroup: "展开分组", collapseGroup: "折叠分组", deleteGroup: "删除分组",
  activateTab: "激活标签", closeTab: "关闭标签", removeFromGroup: "移出分组", autoGroupingReadonly: "自动分组模式下不可手动改分组",
  addToGroup: "添加到分组", newGroupAndAdd: "新建分组并添加", unnamedTab: "未命名标签",
  openPanelCommand: "打开标签流管家", assignActiveCommand: "给当前标签页设置分组", clearActiveCommand: "清除当前标签页分组",
  tempTab: "临时标签",
};
const TEXT_EN = {
  tabGroups: "TabFlow Organizer", groupName: "Group name", color: "Color",
  cancel: "Cancel", ok: "OK", create: "Create", save: "Save", refresh: "Refresh", emptyGroupName: "Group name cannot be empty",
  verticalTabsTitle: "TabFlow Organizer", openOnStartup: "Open grouped tabs sidebar on startup",
  openOnStartupDesc: "Automatically show this pane in the left sidebar when Obsidian opens.",
  hideHorizontalTabs: "Hide top horizontal tabs", hideHorizontalTabsDesc: "Hide root horizontal tabs when the vertical tab group pane is visible.",
  markdownOnly: "Show Markdown tabs only", markdownOnlyDesc: "When disabled, PDF, Canvas, web views, and other view types are also shown.",
  showUngrouped: "Show ungrouped section", grouping: "Grouping", groupingMode: "Grouping mode",
  groupingModeDesc: "Switch between manual grouping and automatic grouping.", manualMode: "Manual grouping",
  autoMode: "Automatic by path", autoByPath: "By file path", pathLevel: "Path level", pathLevelDesc: "Group by which folder level.",
  level1: "Level 1", level2: "Level 2", level3: "Level 3", level4: "Level 4", level5: "Level 5",
  rootFolder: "Root", floatingEntry: "Floating entry", showFloatingEntry: "Show floating entry",
  showFloatingEntryDesc: "When disabled, the floating tab group entry is hidden from editor corners.",
  floatingPosition: "Floating position", floatingPositionDesc: "Position relative to the current editor page.",
  bottomLeft: "Bottom left", bottomRight: "Bottom right", topLeft: "Top left", topRight: "Top right",
  horizontalOffset: "Horizontal offset", horizontalOffsetDesc: "Distance from the left or right edge, in px.",
  verticalOffset: "Vertical offset", verticalOffsetDesc: "Distance from the top or bottom edge, in px.",
  groups: "Groups", noGroups: "No groups yet. Create one from the vertical tab group pane.", newGroup: "New group",
  newTabGroup: "New tab group", renameTabGroup: "Rename tab group", removedFromGroup: "Removed from group",
  noOpenTabs: "No open tabs", ungrouped: "Ungrouped", renameGroup: "Rename group", expandGroup: "Expand group",
  collapseGroup: "Collapse group", deleteGroup: "Delete group", activateTab: "Activate tab", closeTab: "Close tab",
  autoGroupingReadonly: "Manual group edits are disabled in auto mode.",
  removeFromGroup: "Remove from group", addToGroup: "Add to group", newGroupAndAdd: "New group and add",
  openPanelCommand: "Open TabFlow Organizer", assignActiveCommand: "Assign group to active tab", clearActiveCommand: "Clear group from active tab",
  unnamedTab: "Untitled tab", tempTab: "Temporary tab",
};
const DEFAULT_GROUP_COLORS = ["indigo", "teal", "amber", "ruby", "violet", "cyan"];
const DEFAULT_SETTINGS = {
  groups: [
    { id: "group-1", name: "ERRγ", color: "blue" },
    { id: "group-2", name: "写作", color: "green" },
  ],
  leafGroupMap: {},
  groupCollapsedMap: { [UNGROUPED_ID]: false },
  groupOrder: [],
  openOnStartup: true,
  autoHideHorizontalTabs: false,
  showUngrouped: true,
  showOnlyMarkdown: false,
  groupingMode: "manual",
  autoPathLevel: 2,
  showFloatingEntry: true,
  floatingCorner: "bottom-left",
  floatingOffsetX: 12,
  floatingOffsetY: 12,
};

function normalizeSettings(raw) {
  const merged = Object.assign({}, DEFAULT_SETTINGS, raw || {});
  merged.groups = Array.isArray(merged.groups) ? merged.groups : [];
  merged.groups = merged.groups.map((group, index) => ({
    id: group.id || `group-${Date.now()}-${index}`,
    name: group.name || "未命名分组",
    color: group.color || DEFAULT_GROUP_COLORS[index % DEFAULT_GROUP_COLORS.length],
  }));
  merged.leafGroupMap = merged.leafGroupMap && typeof merged.leafGroupMap === "object" ? merged.leafGroupMap : {};
  merged.groupCollapsedMap = merged.groupCollapsedMap && typeof merged.groupCollapsedMap === "object" ? merged.groupCollapsedMap : {};
  merged.groupOrder = Array.isArray(merged.groupOrder) ? merged.groupOrder : [];
  merged.openOnStartup = merged.openOnStartup !== false;
  merged.autoHideHorizontalTabs = !!merged.autoHideHorizontalTabs;
  merged.showUngrouped = merged.showUngrouped !== false;
  merged.showOnlyMarkdown = !!merged.showOnlyMarkdown;
  merged.groupingMode = merged.groupingMode === "auto" ? "auto" : "manual";
  const autoPathLevel = Number(merged.autoPathLevel);
  merged.autoPathLevel = Number.isFinite(autoPathLevel) ? Math.max(1, Math.min(5, Math.floor(autoPathLevel))) : 2;
  merged.showFloatingEntry = merged.showFloatingEntry !== false;
  merged.floatingCorner = ["bottom-left", "bottom-right", "top-left", "top-right"].includes(merged.floatingCorner)
    ? merged.floatingCorner
    : "bottom-left";
  merged.floatingOffsetX = Number.isFinite(Number(merged.floatingOffsetX)) ? Number(merged.floatingOffsetX) : 12;
  merged.floatingOffsetY = Number.isFinite(Number(merged.floatingOffsetY)) ? Number(merged.floatingOffsetY) : 12;

  for (const group of merged.groups) {
    if (!merged.groupCollapsedMap.hasOwnProperty(group.id)) {
      merged.groupCollapsedMap[group.id] = false;
    }
  }
  if (!merged.groupCollapsedMap.hasOwnProperty(UNGROUPED_ID)) {
    merged.groupCollapsedMap[UNGROUPED_ID] = false;
  }
  delete merged.autoGroupRule;
  delete merged.openOnHover;
  delete merged.hoverOpenDelayMs;
  return merged;
}

function isHexColor(value) {
  return typeof value === "string" && /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value.trim());
}

function normalizeHexColor(value) {
  if (!isHexColor(value)) return null;
  const trimmed = value.trim();
  if (trimmed.length === 4) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
  }
  return trimmed.toLowerCase();
}

function resolveGroupColor(color) {
  const custom = normalizeHexColor(color);
  if (custom) return custom;
  return COLOR_VALUES[color] || COLOR_VALUES.indigo;
}

function colorLabel(color) {
  const custom = normalizeHexColor(color);
  if (custom) return custom;
  const labels = currentLang() === "zh" ? COLOR_LABELS_ZH : COLOR_LABELS;
  return labels[color] || color || (currentLang() === "zh" ? "靛蓝" : "Indigo");
}

function currentLang() {
  const lang = (window.localStorage && localStorage.getItem("language")) || document.documentElement.lang || "";
  return lang.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key) {
  const dict = currentLang() === "zh" ? TEXT_ZH : TEXT_EN;
  return dict[key] || TEXT_EN[key] || key;
}

function generateGroupId() {
  return `group-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getLeafId(leaf) {
  return leaf && typeof leaf.id === "string" ? leaf.id : null;
}

function getLeafPath(leaf) {
  const file = leaf && leaf.view && leaf.view.file;
  if (file && file.path) return file.path;
  try {
    const statePath = leaf.getViewState && leaf.getViewState().state && leaf.getViewState().state.file;
    if (typeof statePath === "string" && statePath) return statePath;
  } catch (_) {
    // ignore
  }
  const id = getLeafId(leaf);
  return id ? `leaf:${id}` : null;
}

function getLeafFile(leaf) {
  const file = leaf && leaf.view && leaf.view.file;
  return file instanceof TFile ? file : null;
}

function stableHash(input) {
  const text = String(input || "");
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function getLeafTitle(leaf) {
  try {
    const display = leaf.getDisplayText && leaf.getDisplayText();
    if (display) return display;
  } catch (_) {
    // ignore
  }
  const file = leaf && leaf.view && leaf.view.file;
  return file && file.basename ? file.basename : t("unnamedTab");
}

function getLeafSubtitle(leaf) {
  const path = getLeafPath(leaf);
  if (!path) return "";
  if (path.startsWith("leaf:")) return t("tempTab");
  return path;
}

function isMarkdownLeaf(leaf) {
  const viewType = leaf && leaf.view && leaf.view.getViewType && leaf.view.getViewType();
  const path = getLeafPath(leaf);
  return viewType === "markdown" || typeof path === "string" && path.toLowerCase().endsWith(".md");
}

function collectRootLeaves(app, showOnlyMarkdown) {
  const leaves = [];
  const rootLeaves = [];
  const seen = new Set();
  const push = (leaf) => {
    if (!leaf || seen.has(leaf.id)) return;
    if (leaf.view && leaf.view.getViewType && leaf.view.getViewType() === VIEW_TYPE) return;
    if (showOnlyMarkdown && !isMarkdownLeaf(leaf)) return;
    seen.add(leaf.id);
    leaves.push(leaf);
  };
  const collectRootLeaf = (leaf) => {
    if (!leaf) return;
    rootLeaves.push(leaf);
    push(leaf);
  };

  if (app.workspace.iterateRootLeaves) {
    app.workspace.iterateRootLeaves(collectRootLeaf);
  } else if (app.workspace.rootSplit) {
    app.workspace.iterateLeaves(app.workspace.rootSplit, collectRootLeaf);
  }
  if (app.workspace.floatingSplit) {
    app.workspace.iterateLeaves(app.workspace.floatingSplit, collectRootLeaf);
  }

  if (typeof document !== "undefined" && document.querySelectorAll && app.workspace.getLeafById) {
    document.querySelectorAll(".workspace-tab-header[data-leaf-id]").forEach((header) => {
      const leafId = header.getAttribute("data-leaf-id");
      const leaf = leafId ? app.workspace.getLeafById(leafId) : null;
      push(leaf);
    });
  }

  if (app.workspace.getLeavesOfType) {
    for (const leaf of app.workspace.getLeavesOfType("markdown")) {
      push(leaf);
    }
  }

  if (app.workspace.getGroupLeaves) {
    for (const leaf of rootLeaves) {
      let groupLeaves = null;
      try {
        groupLeaves = app.workspace.getGroupLeaves(leaf);
      } catch (_) {
        groupLeaves = null;
      }
      if (!Array.isArray(groupLeaves)) continue;
      for (const groupLeaf of groupLeaves) {
        push(groupLeaf);
      }
    }
  }

  if (leaves.length === 0 && app.workspace.getLeavesOfType) {
    if (!showOnlyMarkdown) {
      for (const leaf of app.workspace.getLeavesOfType("canvas")) push(leaf);
      for (const leaf of app.workspace.getLeavesOfType("pdf")) push(leaf);
    }
  }

  if (leaves.length === 0) {
    const activeLeaf = app.workspace.activeLeaf;
    if (activeLeaf) push(activeLeaf);
  }

  return leaves;
}

class GroupNameModal extends Modal {
  constructor(app, options) {
    super(app);
    this.options = options;
    this.name = options.initialName || "";
    this.color = GROUP_COLORS.includes(options.initialColor) ? options.initialColor : "indigo";
  }

  onOpen() {
    this.titleEl.setText(this.options.title || t("tabGroups"));
    this.contentEl.empty();

    new Setting(this.contentEl).setName(t("groupName")).addText((text) => {
      text.setValue(this.name).onChange((value) => {
        this.name = value;
      });
      text.inputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") this.submit();
      });
      window.setTimeout(() => {
        text.inputEl.focus();
        text.inputEl.select();
      }, 0);
    });

    new Setting(this.contentEl).setName(t("color")).then((setting) => {
      const row = setting.controlEl.createDiv({ cls: "evtg-color-row" });
      for (const color of GROUP_COLORS) {
        const swatch = row.createEl("button", {
          cls: `evtg-color-swatch${this.color === color ? " is-selected" : ""}`,
          attr: { type: "button", "aria-label": colorLabel(color), title: colorLabel(color) },
        });
        swatch.style.setProperty("--evtg-color", resolveGroupColor(color));
        swatch.addEventListener("click", () => {
          this.color = color;
          row.querySelectorAll(".evtg-color-swatch").forEach((el) => el.removeClass("is-selected"));
          swatch.addClass("is-selected");
        });
      }
    });

    new Setting(this.contentEl)
      .addButton((button) => button.setButtonText(t("cancel")).onClick(() => this.close()))
      .addButton((button) => button.setButtonText(this.options.confirmText || t("ok")).setCta().onClick(() => this.submit()));
  }

  submit() {
    const name = this.name.trim();
    if (!name) {
      new Notice(t("emptyGroupName"));
      return;
    }
    this.options.onSubmit(name, this.color);
    this.close();
  }

  onClose() {
    this.contentEl.empty();
  }
}

class EdgeVerticalTabsView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.navigation = false;
    this.icon = "list-tree";
  }

  getViewType() {
    return VIEW_TYPE;
  }

  getDisplayText() {
    return t("tabGroups");
  }

  async onOpen() {
    this.containerEl.addClass("edge-vertical-tabs-view");
    this.render();
  }

  async onClose() {
    this.containerEl.empty();
  }

  render() {
    const root = this.containerEl;
    root.empty();
    root.addClass("edge-vertical-tabs-view");

    const panel = root.createDiv({ cls: "evtg-panel" });
    this.renderHeader(panel);

    const content = panel.createDiv({ cls: "evtg-content" });
    const leaves = collectRootLeaves(this.app, this.plugin.settings.showOnlyMarkdown);
    const activeLeaf = this.app.workspace.activeLeaf;
    const buckets = this.plugin.bucketLeaves(leaves);

    if (buckets.length === 0) {
      content.createDiv({ cls: "evtg-empty", text: t("noOpenTabs") });
      return;
    }

    for (const bucket of buckets) {
      this.renderGroup(content, bucket, activeLeaf);
    }
  }

  renderHeader(panel) {
    const header = panel.createDiv({ cls: "evtg-header" });
    const titleWrap = header.createDiv({ cls: "evtg-title-wrap" });
    const icon = titleWrap.createDiv({ cls: "evtg-title-icon" });
    setIcon(icon, "list-tree");
    titleWrap.createDiv({ cls: "evtg-title", text: t("tabGroups") });

    const actions = header.createDiv({ cls: "evtg-header-actions" });
    const refreshBtn = actions.createEl("button", {
      cls: "evtg-icon-button",
      attr: { type: "button", "aria-label": t("refresh") },
    });
    setIcon(refreshBtn, "refresh-cw");
    refreshBtn.addEventListener("click", () => this.render());

    if (this.plugin.isManualGrouping()) {
      const newGroupBtn = actions.createEl("button", {
        cls: "evtg-icon-button",
        attr: { type: "button", "aria-label": t("newGroup") },
      });
      setIcon(newGroupBtn, "folder-plus");
      newGroupBtn.addEventListener("click", () => this.plugin.promptCreateGroup());
    }
  }

  renderGroup(container, bucket, activeLeaf) {
    const group = bucket.group;
    const groupId = group ? group.id : UNGROUPED_ID;
    const isUngrouped = groupId === UNGROUPED_ID;
    const manualMode = this.plugin.isManualGrouping();
    if (isUngrouped && !this.plugin.settings.showUngrouped && bucket.leaves.length === 0) return;
    if (isUngrouped && !this.plugin.settings.showUngrouped) return;

    const collapsed = !!this.plugin.settings.groupCollapsedMap[groupId];
    const color = group ? resolveGroupColor(group.color) : "var(--text-faint)";
    const section = container.createDiv({ cls: `evtg-group${collapsed ? " is-collapsed" : ""}${isUngrouped ? " is-ungrouped" : ""}` });
    section.style.setProperty("--evtg-group-color", color);
    section.dataset.groupId = groupId;
    this.bindGroupDropTarget(section, groupId);

    const header = section.createDiv({ cls: "evtg-group-header" });
    header.dataset.groupId = groupId;
    header.draggable = manualMode && !isUngrouped;
    header.addEventListener("click", async () => {
      await this.plugin.toggleGroupCollapsed(groupId);
    });
    header.addEventListener("dragstart", (event) => {
      if (!manualMode || isUngrouped) return;
      event.stopPropagation();
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-evtg-group-id", groupId);
      event.dataTransfer.setData("text/plain", group ? group.name : groupId);
      header.addClass("is-dragging");
    });
    header.addEventListener("dragend", () => {
      header.removeClass("is-dragging");
      this.clearDragClasses();
    });
    header.addEventListener("dragover", (event) => {
      if (!manualMode) return;
      if (!this.hasDraggedGroup(event)) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      header.addClass("is-group-drag-over");
    });
    header.addEventListener("dragleave", () => header.removeClass("is-group-drag-over"));
    header.addEventListener("drop", async (event) => {
      if (!manualMode) return;
      const draggedGroupId = event.dataTransfer.getData("application/x-evtg-group-id");
      if (!draggedGroupId || draggedGroupId === groupId || isUngrouped) return;
      event.preventDefault();
      event.stopPropagation();
      await this.plugin.moveGroupBefore(draggedGroupId, groupId);
      this.clearDragClasses();
    });
    header.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.plugin.showGroupMenu(event, group);
    });

    const chevron = header.createDiv({ cls: "evtg-chevron" });
    setIcon(chevron, collapsed ? "chevron-right" : "chevron-down");
    header.createDiv({ cls: "evtg-group-dot" });
    header.createDiv({ cls: "evtg-group-name", text: group ? group.name : t("ungrouped") });
    header.createDiv({ cls: "evtg-group-count", text: String(bucket.leaves.length) });

    if (collapsed) return;

    const list = section.createDiv({ cls: "evtg-tab-list" });
    list.dataset.groupId = groupId;
    this.bindGroupDropTarget(list, groupId);
    if (bucket.leaves.length === 0) {
      list.createDiv({ cls: "evtg-empty", text: t("noOpenTabs") });
      return;
    }

    for (const leaf of bucket.leaves) {
      this.renderTabRow(list, leaf, group, activeLeaf);
    }
  }

  renderTabRow(list, leaf, group, activeLeaf) {
    const manualMode = this.plugin.isManualGrouping();
    const isActive = activeLeaf && activeLeaf.id === leaf.id;
    const row = list.createDiv({ cls: `evtg-tab-row${isActive ? " is-active" : ""}` });
    row.dataset.leafId = leaf.id || "";
    row.dataset.leafKey = this.plugin.leafKey(leaf) || "";
    row.draggable = manualMode;
    const file = leaf.view && leaf.view.file;
    const iconName = file instanceof TFile ? "file-text" : "panel-top";

    const icon = row.createDiv({ cls: "evtg-tab-icon" });
    setIcon(icon, iconName);

    const text = row.createDiv({ cls: "evtg-tab-text" });
    text.createDiv({ cls: "evtg-tab-title", text: getLeafTitle(leaf) });
    text.createDiv({ cls: "evtg-tab-subtitle", text: getLeafSubtitle(leaf) });

    const close = row.createEl("button", {
      cls: "evtg-tab-close",
      attr: { type: "button", "aria-label": "关闭标签" },
    });
    setIcon(close, "x");
    close.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      leaf.detach();
    });

    row.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      if (event.target && event.target.closest && event.target.closest(".evtg-tab-close")) return;
      this.app.workspace.setActiveLeaf(leaf, { focus: true });
    });
    if (manualMode) {
      row.addEventListener("dragstart", (event) => {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("application/x-evtg-leaf-key", this.plugin.leafKey(leaf) || "");
        event.dataTransfer.setData("application/x-evtg-leaf-id", leaf.id || "");
        event.dataTransfer.setData("text/plain", getLeafTitle(leaf));
        row.addClass("is-dragging");
      });
      row.addEventListener("dragend", () => {
        row.removeClass("is-dragging");
        this.clearDragClasses();
      });
    }
    row.addEventListener("auxclick", (event) => {
      if (event.button === 1) {
        event.preventDefault();
        leaf.detach();
      }
    });
    row.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.plugin.showLeafMenu(event, leaf, group);
    });
  }

  bindGroupDropTarget(element, groupId) {
    if (!this.plugin.isManualGrouping()) return;
    element.addEventListener("dragover", (event) => {
      if (!this.hasDraggedLeaf(event)) return;
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = "move";
      element.addClass("is-leaf-drag-over");
    });
    element.addEventListener("dragleave", () => element.removeClass("is-leaf-drag-over"));
    element.addEventListener("drop", async (event) => {
      const leafKey = event.dataTransfer.getData("application/x-evtg-leaf-key");
      const leafId = event.dataTransfer.getData("application/x-evtg-leaf-id");
      if (!leafKey && !leafId) return;
      event.preventDefault();
      event.stopPropagation();
      await this.plugin.assignLeafKeyToGroup(leafKey, groupId);
      this.clearDragClasses();
    });
  }

  hasDraggedLeaf(event) {
    return Array.from(event.dataTransfer.types || []).includes("application/x-evtg-leaf-key");
  }

  hasDraggedGroup(event) {
    return Array.from(event.dataTransfer.types || []).includes("application/x-evtg-group-id");
  }

  clearDragClasses() {
    this.containerEl.querySelectorAll(".is-leaf-drag-over, .is-group-drag-over, .is-dragging").forEach((el) => {
      el.removeClass("is-leaf-drag-over");
      el.removeClass("is-group-drag-over");
      el.removeClass("is-dragging");
    });
  }
}

class EdgeVerticalTabsSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: t("verticalTabsTitle") });

    new Setting(containerEl)
      .setName(t("openOnStartup"))
      .setDesc(t("openOnStartupDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.openOnStartup).onChange(async (value) => {
          this.plugin.settings.openOnStartup = value;
          await this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName(t("hideHorizontalTabs"))
      .setDesc(t("hideHorizontalTabsDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.autoHideHorizontalTabs).onChange(async (value) => {
          this.plugin.settings.autoHideHorizontalTabs = value;
          await this.plugin.saveSettings();
          this.plugin.applyBodyClasses();
        });
      });

    new Setting(containerEl)
      .setName(t("markdownOnly"))
      .setDesc(t("markdownOnlyDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showOnlyMarkdown).onChange(async (value) => {
          this.plugin.settings.showOnlyMarkdown = value;
          await this.plugin.saveSettings();
          this.plugin.refreshViews();
        });
      });

    if (this.plugin.isManualGrouping()) {
      new Setting(containerEl)
        .setName(t("showUngrouped"))
        .addToggle((toggle) => {
          toggle.setValue(this.plugin.settings.showUngrouped).onChange(async (value) => {
            this.plugin.settings.showUngrouped = value;
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
          });
        });
    }

    containerEl.createEl("h3", { text: t("grouping") });
    new Setting(containerEl)
      .setName(t("groupingMode"))
      .setDesc(t("groupingModeDesc"))
      .addDropdown((dropdown) => {
        dropdown
          .addOption("manual", t("manualMode"))
          .addOption("auto", t("autoMode"))
          .setValue(this.plugin.settings.groupingMode)
          .onChange(async (value) => {
            this.plugin.settings.groupingMode = value === "auto" ? "auto" : "manual";
            await this.plugin.saveSettings();
            this.plugin.refreshViews();
            this.display();
          });
      });

    if (this.plugin.settings.groupingMode === "auto") {
      new Setting(containerEl)
        .setName(t("pathLevel"))
        .setDesc(t("pathLevelDesc"))
        .addDropdown((dropdown) => {
          dropdown
            .addOption("1", t("level1"))
            .addOption("2", t("level2"))
            .addOption("3", t("level3"))
            .addOption("4", t("level4"))
            .addOption("5", t("level5"))
            .setValue(String(this.plugin.settings.autoPathLevel || 2))
            .onChange(async (value) => {
              const next = Number(value);
              this.plugin.settings.autoPathLevel = Number.isFinite(next) ? Math.max(1, Math.min(5, Math.floor(next))) : 2;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
            });
        });
    }

    containerEl.createEl("h3", { text: t("floatingEntry") });

    new Setting(containerEl)
      .setName(t("showFloatingEntry"))
      .setDesc(t("showFloatingEntryDesc"))
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.showFloatingEntry).onChange(async (value) => {
          this.plugin.settings.showFloatingEntry = value;
          await this.plugin.saveSettings();
          this.plugin.positionFloatingPanel();
          this.plugin.renderFloatingPanel();
        });
      });

    new Setting(containerEl)
      .setName(t("floatingPosition"))
      .setDesc(t("floatingPositionDesc"))
      .addDropdown((dropdown) => {
        dropdown
          .addOption("bottom-left", t("bottomLeft"))
          .addOption("bottom-right", t("bottomRight"))
          .addOption("top-left", t("topLeft"))
          .addOption("top-right", t("topRight"))
          .setValue(this.plugin.settings.floatingCorner)
          .onChange(async (value) => {
            this.plugin.settings.floatingCorner = value;
            await this.plugin.saveSettings();
            this.plugin.positionFloatingPanel();
          });
      });

    new Setting(containerEl)
      .setName(t("horizontalOffset"))
      .setDesc(t("horizontalOffsetDesc"))
      .addText((text) => {
        text
          .setPlaceholder("12")
          .setValue(String(this.plugin.settings.floatingOffsetX))
          .onChange(async (value) => {
            const next = Number(value);
            if (!Number.isFinite(next)) return;
            this.plugin.settings.floatingOffsetX = Math.max(0, next);
            await this.plugin.saveSettings();
            this.plugin.positionFloatingPanel();
          });
      });

    new Setting(containerEl)
      .setName(t("verticalOffset"))
      .setDesc(t("verticalOffsetDesc"))
      .addText((text) => {
        text
          .setPlaceholder("12")
          .setValue(String(this.plugin.settings.floatingOffsetY))
          .onChange(async (value) => {
            const next = Number(value);
            if (!Number.isFinite(next)) return;
            this.plugin.settings.floatingOffsetY = Math.max(0, next);
            await this.plugin.saveSettings();
            this.plugin.positionFloatingPanel();
          });
      });

    if (this.plugin.isManualGrouping()) {
      containerEl.createEl("h3", { text: t("groups") });
      if (this.plugin.settings.groups.length === 0) {
        containerEl.createEl("p", { cls: "setting-item-description", text: t("noGroups") });
      }

      for (const group of this.plugin.orderedGroups()) {
        const setting = new Setting(containerEl);
        const name = setting.nameEl.createDiv({ cls: "evtg-setting-name" });
        const dot = name.createSpan({ cls: "evtg-setting-dot" });
        dot.style.background = resolveGroupColor(group.color);
        name.createSpan({ text: group.name });
        setting
          .addDropdown((dropdown) => {
            for (const color of GROUP_COLORS) {
              dropdown.addOption(color, colorLabel(color));
            }
            dropdown.setValue(GROUP_COLORS.includes(group.color) ? group.color : "indigo");
            dropdown.onChange(async (value) => {
              group.color = value;
              await this.plugin.saveSettings();
              this.plugin.refreshViews();
              this.display();
            });
          })
          .addExtraButton((button) => {
            button.setIcon("pencil").setTooltip(t("renameGroup")).onClick(() => {
              this.plugin.promptRenameGroup(group, () => this.display());
            });
          })
          .addExtraButton((button) => {
            button.setIcon("trash-2").setTooltip(t("deleteGroup")).onClick(async () => {
              await this.plugin.deleteGroup(group.id);
              this.display();
            });
          });
      }

      new Setting(containerEl).addButton((button) => {
        button.setButtonText(t("newGroup")).setCta().onClick(() => this.plugin.promptCreateGroup(null, () => this.display()));
      });
    }
  }
}

class EdgeLikeVerticalTabsLitePlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE, (leaf) => new EdgeVerticalTabsView(leaf, this));
    this.addSettingTab(new EdgeVerticalTabsSettingTab(this.app, this));

    this.addCommand({
      id: "open-edge-vertical-tabs",
      name: t("openPanelCommand"),
      callback: () => this.openView(),
    });
    this.addCommand({
      id: "assign-active-tab-group",
      name: t("assignActiveCommand"),
      callback: async () => {
        if (!this.isManualGrouping()) {
          new Notice(t("autoGroupingReadonly"));
          return;
        }
        const leaf = this.app.workspace.activeLeaf;
        if (!leaf) return;
        this.showLeafMenu(null, leaf, this.getGroupForLeaf(leaf));
      },
    });
    this.addCommand({
      id: "clear-active-tab-group",
      name: t("clearActiveCommand"),
      callback: async () => {
        if (!this.isManualGrouping()) {
          new Notice(t("autoGroupingReadonly"));
          return;
        }
        const leaf = this.app.workspace.activeLeaf;
        if (!leaf) return;
        await this.clearLeafGroup(leaf);
        new Notice(t("removedFromGroup"));
      },
    });

    this.registerEvent(this.app.workspace.on("layout-change", () => this.refreshViews()));
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => this.refreshViews()));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => this.handleFileRename(file, oldPath)));
    this.registerDomEvent(document, "contextmenu", (event) => this.handleNativeTabContextMenu(event), true);
    this.applyBodyClasses();
    this.createFloatingPanel();

    this.app.workspace.onLayoutReady(async () => {
      if (this.settings.openOnStartup) await this.openView();
      this.refreshViews();
      window.setTimeout(() => this.refreshViews(), 300);
    });
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE);
    if (this.floatingEl) {
      this.floatingEl.remove();
      this.floatingEl = null;
    }
    document.body.removeClass("evtg-auto-hide-horizontal-tabs");
  }

  async loadSettings() {
    this.settings = normalizeSettings(await this.loadData());
    await this.saveSettings();
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async saveAndRefresh() {
    await this.saveSettings();
    this.refreshViews();
  }

  applyBodyClasses() {
    document.body.toggleClass("evtg-auto-hide-horizontal-tabs", !!this.settings.autoHideHorizontalTabs);
  }

  async openView() {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE)[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeftLeaf(false);
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    this.app.workspace.revealLeaf(leaf);
  }

  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      if (leaf.view && leaf.view.render) leaf.view.render();
    }
    this.positionFloatingPanel();
    this.renderFloatingPanel();
  }

  showMenu(menu, event) {
    if (event) menu.showAtMouseEvent(event);
    else menu.showAtPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  }

  createFloatingPanel() {
    if (this.floatingEl && this.floatingEl.isConnected) return;
    this.floatingEl = document.createElement("div");
    this.floatingEl.addClass("evtg-floating");
    const trigger = this.floatingEl.createEl("button", {
      cls: "evtg-floating-trigger",
      attr: { type: "button", "aria-label": t("tabGroups") },
    });
    setIcon(trigger, "list-tree");
    trigger.addEventListener("click", () => {
      this.floatingEl.toggleClass("is-pinned", !this.floatingEl.hasClass("is-pinned"));
    });
    this.floatingEl.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.openView();
    });
    this.floatingPanelEl = this.floatingEl.createDiv({ cls: "evtg-floating-panel" });
    this.positionFloatingPanel();
    this.renderFloatingPanel();
  }

  positionFloatingPanel() {
    if (!this.floatingEl) return;
    if (!this.settings.showFloatingEntry) {
      this.floatingEl.detach();
      return;
    }
    const hostLeaf = this.getFloatingHostLeaf();
    if (!hostLeaf) {
      this.floatingEl.detach();
      return;
    }
    const host = hostLeaf.containerEl || hostLeaf.view && hostLeaf.view.containerEl;
    if (!host) {
      this.floatingEl.detach();
      return;
    }
    host.addClass("evtg-floating-host");
    if (this.floatingEl.parentElement !== host) {
      host.appendChild(this.floatingEl);
    }
    this.floatingEl.removeClass("is-bottom-left", "is-bottom-right", "is-top-left", "is-top-right");
    this.floatingEl.addClass(`is-${this.settings.floatingCorner}`);
    this.floatingEl.style.setProperty("--evtg-floating-x", `${Math.max(0, Number(this.settings.floatingOffsetX) || 0)}px`);
    this.floatingEl.style.setProperty("--evtg-floating-y", `${Math.max(0, Number(this.settings.floatingOffsetY) || 0)}px`);
  }

  getFloatingHostLeaf() {
    const activeLeaf = this.app.workspace.activeLeaf;
    if (activeLeaf && isMarkdownLeaf(activeLeaf)) {
      this.lastMarkdownLeafId = activeLeaf.id;
      return activeLeaf;
    }
    if (this.lastMarkdownLeafId) {
      const rememberedLeaf = this.app.workspace.getLeafById && this.app.workspace.getLeafById(this.lastMarkdownLeafId);
      if (rememberedLeaf && isMarkdownLeaf(rememberedLeaf)) return rememberedLeaf;
    }
    const markdownLeaves = collectRootLeaves(this.app, true);
    const fallbackLeaf = markdownLeaves[0] || null;
    if (fallbackLeaf) this.lastMarkdownLeafId = fallbackLeaf.id;
    return fallbackLeaf;
  }

  renderFloatingPanel() {
    if (!this.floatingPanelEl) return;
    this.floatingPanelEl.empty();
    const leaves = collectRootLeaves(this.app, this.settings.showOnlyMarkdown);
    const activeLeaf = this.app.workspace.activeLeaf;
    const buckets = this.bucketLeaves(leaves).filter((bucket) => bucket.leaves.length > 0);
    if (buckets.length === 0) {
      this.floatingPanelEl.createDiv({ cls: "evtg-floating-empty", text: t("noOpenTabs") });
      return;
    }
    for (const bucket of buckets) {
      const group = bucket.group;
      const groupId = group ? group.id : UNGROUPED_ID;
      const color = group ? resolveGroupColor(group.color) : "var(--text-faint)";
      const section = this.floatingPanelEl.createDiv({ cls: `evtg-floating-group${group ? "" : " is-ungrouped"}` });
      section.style.setProperty("--evtg-group-color", color);
      const header = section.createDiv({ cls: "evtg-floating-group-title", text: group ? group.name : t("ungrouped") });
      header.addEventListener("click", async () => this.toggleGroupCollapsed(groupId));
      if (this.settings.groupCollapsedMap[groupId]) continue;
      for (const leaf of bucket.leaves) {
        const isActive = activeLeaf && activeLeaf.id === leaf.id;
        const row = section.createDiv({ cls: `evtg-floating-tab${isActive ? " is-active" : ""}` });
        row.createDiv({ cls: "evtg-floating-tab-title", text: getLeafTitle(leaf) });
        row.addEventListener("pointerdown", (event) => {
          if (event.button !== 0) return;
          this.app.workspace.setActiveLeaf(leaf, { focus: true });
        });
        row.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.showLeafMenu(event, leaf, this.getGroupForLeaf(leaf));
        });
      }
    }
  }

  orderedGroups() {
    const byId = new Map(this.settings.groups.map((group) => [group.id, group]));
    const ordered = [];
    for (const id of this.settings.groupOrder) {
      if (byId.has(id)) {
        ordered.push(byId.get(id));
        byId.delete(id);
      }
    }
    ordered.push(...this.settings.groups.filter((group) => byId.has(group.id)));
    return ordered;
  }

  isManualGrouping() {
    return this.settings.groupingMode !== "auto";
  }

  getAutoColorKey(groupId) {
    return GROUP_COLORS[stableHash(groupId) % GROUP_COLORS.length] || "indigo";
  }

  getAutoPathGroupForLeaf(leaf) {
    const path = getLeafPath(leaf);
    if (!path || path.startsWith("leaf:")) return null;
    const parts = path.split("/").filter((part) => part);
    if (parts.length <= 1) {
      const rootId = "auto:path:root";
      return { id: rootId, name: t("rootFolder"), color: this.getAutoColorKey(rootId), auto: true };
    }
    const folders = parts.slice(0, -1);
    if (folders.length === 0) {
      const rootId = "auto:path:root";
      return { id: rootId, name: t("rootFolder"), color: this.getAutoColorKey(rootId), auto: true };
    }
    const level = Math.max(1, Math.min(5, Number(this.settings.autoPathLevel) || 2));
    const index = Math.min(level, folders.length) - 1;
    const name = folders[index] || t("rootFolder");
    const key = folders.slice(0, index + 1).join("/");
    const id = `auto:path:${level}:${key || name}`;
    return { id, name, color: this.getAutoColorKey(id), auto: true };
  }

  getAutoGroupForLeaf(leaf) {
    return this.getAutoPathGroupForLeaf(leaf);
  }

  bucketLeaves(leaves) {
    if (!this.isManualGrouping()) {
      const buckets = [];
      const bucketById = new Map();
      for (const leaf of leaves) {
        const autoGroup = this.getAutoGroupForLeaf(leaf);
        if (!autoGroup) continue;
        let bucket = bucketById.get(autoGroup.id);
        if (!bucket) {
          bucket = { group: autoGroup, leaves: [] };
          bucketById.set(autoGroup.id, bucket);
          buckets.push(bucket);
        }
        bucket.leaves.push(leaf);
      }
      return buckets;
    }

    const groups = this.orderedGroups();
    const buckets = groups.map((group) => ({ group, leaves: [] }));
    const bucketById = new Map(buckets.map((bucket) => [bucket.group.id, bucket]));
    const ungrouped = { group: null, leaves: [] };

    for (const leaf of leaves) {
      const groupId = this.getLeafGroupId(leaf);
      const bucket = groupId ? bucketById.get(groupId) : null;
      if (bucket) bucket.leaves.push(leaf);
      else ungrouped.leaves.push(leaf);
    }

    return [...buckets.filter((bucket) => bucket.leaves.length > 0), ungrouped];
  }

  leafKey(leaf) {
    return getLeafPath(leaf);
  }

  getLeafGroupId(leaf) {
    if (!this.isManualGrouping()) return null;
    const key = this.leafKey(leaf);
    return key ? this.settings.leafGroupMap[key] || null : null;
  }

  getGroupForLeaf(leaf) {
    if (!this.isManualGrouping()) return this.getAutoGroupForLeaf(leaf);
    const groupId = this.getLeafGroupId(leaf);
    return groupId ? this.settings.groups.find((group) => group.id === groupId) || null : null;
  }

  findGroupById(groupId) {
    if (!groupId) return null;
    return this.settings.groups.find((group) => group.id === groupId) || null;
  }

  async updateGroup(groupId, patch) {
    const group = this.findGroupById(groupId);
    if (!group) return null;
    if (patch && typeof patch === "object") Object.assign(group, patch);
    await this.saveAndRefresh();
    return group;
  }

  async assignLeafToGroup(leaf, groupId) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return;
    }
    const key = this.leafKey(leaf);
    if (!key) return;
    this.settings.leafGroupMap[key] = groupId;
    await this.saveAndRefresh();
  }

  async assignLeafKeyToGroup(leafKey, groupId) {
    if (!this.isManualGrouping()) return;
    if (!leafKey) return;
    if (groupId === UNGROUPED_ID) {
      delete this.settings.leafGroupMap[leafKey];
    } else {
      this.settings.leafGroupMap[leafKey] = groupId;
      this.settings.groupCollapsedMap[groupId] = false;
    }
    await this.saveAndRefresh();
  }

  async clearLeafGroup(leaf) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return;
    }
    const key = this.leafKey(leaf);
    if (!key) return;
    delete this.settings.leafGroupMap[key];
    await this.saveAndRefresh();
  }

  async ensureGroup(name, color) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return null;
    }
    const existing = this.settings.groups.find((group) => group.name === name);
    if (existing) {
      if (color && !existing.color) existing.color = color;
      return existing;
    }
    const group = {
      id: generateGroupId(),
      name,
      color: color || DEFAULT_GROUP_COLORS[this.settings.groups.length % DEFAULT_GROUP_COLORS.length],
    };
    this.settings.groups.push(group);
    this.settings.groupOrder.push(group.id);
    this.settings.groupCollapsedMap[group.id] = false;
    await this.saveAndRefresh();
    return group;
  }

  async deleteGroup(groupId) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return;
    }
    this.settings.groups = this.settings.groups.filter((group) => group.id !== groupId);
    this.settings.groupOrder = this.settings.groupOrder.filter((id) => id !== groupId);
    delete this.settings.groupCollapsedMap[groupId];
    for (const key of Object.keys(this.settings.leafGroupMap)) {
      if (this.settings.leafGroupMap[key] === groupId) delete this.settings.leafGroupMap[key];
    }
    await this.saveAndRefresh();
  }

  async moveGroupBefore(sourceGroupId, targetGroupId) {
    if (!this.isManualGrouping()) return;
    if (!sourceGroupId || !targetGroupId || sourceGroupId === targetGroupId) return;
    const groupIds = this.settings.groups.map((group) => group.id);
    const existingOrder = this.settings.groupOrder.filter((id) => groupIds.includes(id));
    for (const id of groupIds) {
      if (!existingOrder.includes(id)) existingOrder.push(id);
    }
    const sourceIndex = existingOrder.indexOf(sourceGroupId);
    const targetIndex = existingOrder.indexOf(targetGroupId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    existingOrder.splice(sourceIndex, 1);
    const nextTargetIndex = existingOrder.indexOf(targetGroupId);
    existingOrder.splice(nextTargetIndex, 0, sourceGroupId);
    this.settings.groupOrder = existingOrder;
    await this.saveAndRefresh();
  }

  async toggleGroupCollapsed(groupId) {
    this.settings.groupCollapsedMap[groupId] = !this.settings.groupCollapsedMap[groupId];
    await this.saveAndRefresh();
  }

  async handleFileRename(file, oldPath) {
    if (!oldPath || oldPath.startsWith("leaf:")) return;
    if (!this.settings.leafGroupMap.hasOwnProperty(oldPath)) return;
    this.settings.leafGroupMap[file.path] = this.settings.leafGroupMap[oldPath];
    delete this.settings.leafGroupMap[oldPath];
    await this.saveAndRefresh();
  }

  promptCreateGroup(leaf, onDone) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return;
    }
    new GroupNameModal(this.app, {
      title: t("newTabGroup"),
      initialName: t("newGroup"),
      confirmText: t("create"),
      onSubmit: async (name, color) => {
        const group = await this.ensureGroup(name, color);
        if (!group) return;
        if (leaf) await this.assignLeafToGroup(leaf, group.id);
        if (onDone) onDone(group);
      },
    }).open();
  }

  promptRenameGroup(group, onDone) {
    if (!this.isManualGrouping()) {
      new Notice(t("autoGroupingReadonly"));
      return;
    }
    if (!group) return;
    const groupId = group.id;
    new GroupNameModal(this.app, {
      title: t("renameTabGroup"),
      initialName: group.name,
      initialColor: group.color || "indigo",
      confirmText: t("save"),
      onSubmit: async (name, color) => {
        const updated = await this.updateGroup(groupId, { name, color });
        if (onDone) onDone(updated || group);
      },
    }).open();
  }

  showGroupMenu(event, group) {
    const menu = new Menu();
    if (!this.isManualGrouping()) {
      if (!group) return;
      menu.addItem((item) => item.setTitle(this.settings.groupCollapsedMap[group.id] ? t("expandGroup") : t("collapseGroup")).setIcon("chevrons-up-down").onClick(() => this.toggleGroupCollapsed(group.id)));
      this.showMenu(menu, event);
      return;
    }
    if (group) {
      menu.addItem((item) => item.setTitle(t("renameGroup")).setIcon("pencil").onClick(() => this.promptRenameGroup(group)));
      menu.addItem((item) => item.setTitle(this.settings.groupCollapsedMap[group.id] ? t("expandGroup") : t("collapseGroup")).setIcon("chevrons-up-down").onClick(() => this.toggleGroupCollapsed(group.id)));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle(t("deleteGroup")).setIcon("trash-2").onClick(() => this.deleteGroup(group.id)));
    } else {
      menu.addItem((item) => item.setTitle(t("newGroup")).setIcon("folder-plus").onClick(() => this.promptCreateGroup()));
    }
    this.showMenu(menu, event);
  }

  showLeafMenu(event, leaf, currentGroup) {
    const menu = new Menu();
    menu.addItem((item) => item.setTitle(t("activateTab")).setIcon("mouse-pointer-click").onClick(() => this.app.workspace.setActiveLeaf(leaf, { focus: true })));
    menu.addItem((item) => item.setTitle(t("closeTab")).setIcon("x").onClick(() => leaf.detach()));
    if (this.isManualGrouping()) menu.addSeparator();

    if (this.isManualGrouping()) {
      if (currentGroup) {
        menu.addItem((item) => item.setTitle(`${t("removeFromGroup")}: ${currentGroup.name}`).setIcon("minus-circle").onClick(() => this.clearLeafGroup(leaf)));
      }

      const groups = this.orderedGroups();
      if (groups.length > 0) {
        menu.addItem((item) => {
          item.setTitle(t("addToGroup")).setIcon("folder");
          const submenu = item.setSubmenu();
          for (const group of groups) {
            submenu.addItem((subItem) => {
              subItem.setTitle(group.name).setChecked(currentGroup && currentGroup.id === group.id).onClick(() => this.assignLeafToGroup(leaf, group.id));
            });
          }
        });
      }

      menu.addItem((item) => item.setTitle(t("newGroupAndAdd")).setIcon("folder-plus").onClick(() => this.promptCreateGroup(leaf)));
    }
    this.showMenu(menu, event);
  }

  handleNativeTabContextMenu(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const header = target.closest(".workspace-tab-header[data-leaf-id]");
    if (!header || !header.dataset.leafId) return;
    const leaf = this.app.workspace.getLeafById(header.dataset.leafId);
    if (!leaf || leaf.view && leaf.view.getViewType && leaf.view.getViewType() === VIEW_TYPE) return;
    event.preventDefault();
    event.stopPropagation();
    this.showLeafMenu(event, leaf, this.getGroupForLeaf(leaf));
  }
}

module.exports = EdgeLikeVerticalTabsLitePlugin;
