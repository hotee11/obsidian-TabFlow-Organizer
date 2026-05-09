# TabFlow Organizer

> Organize your Obsidian tabs into clean manual or path-based groups, with a vertical sidebar and a floating quick switcher.

**中文名：标签流管家**

TabFlow Organizer is an Obsidian plugin for users who keep many tabs open while reading, writing, researching, or managing projects. It gives your workspace a grouped vertical tab panel, so related notes can stay together instead of getting lost in the default horizontal tab bar.

---

## Languages

- [English](#english)
- [中文](#中文)

---

## English

### Overview

TabFlow Organizer helps you manage open Obsidian tabs with a grouped vertical sidebar and a compact floating entry. You can create manual tab groups, assign tabs to groups, collapse groups, color-code groups, or let the plugin automatically group Markdown files by folder path.

It is designed for people who work with many open notes at once and want a smoother way to switch context without constantly scanning the top tab bar.

### Features

- **Grouped vertical tabs**: View open tabs in a left sidebar organized by groups.
- **Manual tab grouping**: Create custom groups and drag tabs into them.
	-  ![86a1f580af1ca6999827cdeaccc88de9.png](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/86a1f580af1ca6999827cdeaccc88de9.png?hotee)
- **Automatic path-based grouping**: Group tabs automatically by folder level.
	- ![67a1b0a0c5208ef0307a5c8800fadd7c.png](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/67a1b0a0c5208ef0307a5c8800fadd7c.png?hotee)
	- ![b827bd66ca345f881116caec4cd3ddd4.png|335](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/b827bd66ca345f881116caec4cd3ddd4.png?hotee)
- **Floating quick switcher**: Show a small floating entry in the editor corner for quick tab switching.
- **Editor-anchored floating entry**: The floating entry stays attached to a Markdown editor instead of moving onto views such as Search or File Explorer.
- **Collapsible groups**: Collapse or expand groups to keep the panel tidy.
- **Group colors**: Assign colors to groups for faster visual recognition.
- **Hide top horizontal tabs**: Optionally hide Obsidian's default top tab bar when the grouped sidebar is visible.
- **Markdown-only mode**: Choose whether to show only Markdown tabs or include other view types such as PDF, Canvas, and web views.
- **Ungrouped section in manual mode**: Keep unassigned tabs visible in a dedicated section when using manual grouping.
- **Close tabs from the panel**: Close open tabs directly from the vertical list.
- **Bilingual UI**: Includes English and Simplified Chinese interface text.

### Screenshots

> Add your screenshots or demo GIFs here after publishing the plugin.
>
> Suggested screenshots:
>
> 1. Grouped vertical sidebar
> 2. Floating quick switcher
> 3. Settings panel
> 4. Manual grouping / automatic path grouping

### Installation

#### Manual installation

1. Download the latest release from the GitHub Releases page.
2. Create a folder for the plugin inside `.obsidian/plugins/`:

```text
.obsidian/plugins/<your-plugin-folder>/
```

3. Copy these files into that folder:

```text
manifest.json
main.js
styles.css
```

4. Restart Obsidian or reload plugins.
5. Go to **Settings → Community plugins**.
6. Enable **TabFlow Organizer**.

#### BRAT installation

If you use [BRAT](https://github.com/TfTHacker/obsidian42-brat), you can install this plugin by adding this repository as a beta plugin.

### Release checklist

For each release:

1. Keep `manifest.json` `version` in semver format and update `versions.json` mapping.
2. Create a GitHub Release with attached files:
   - `manifest.json`
   - `main.js`
   - `styles.css`
3. Ensure release tag/version is the same as `manifest.json` `version`.

### Usage

#### Open the sidebar

Open the Command Palette and run:

```text
Open TabFlow Organizer
```

The grouped tab sidebar will open in the left side dock.

#### Create a manual group

1. Make sure **Grouping mode** is set to **Manual grouping**.
2. Click the new group button in the sidebar header.
3. Enter a group name and choose a color.
4. Drag tabs into the group, or right-click a tab and assign it to a group.

#### Use automatic grouping by path

1. Open the plugin settings.
2. Set **Grouping mode** to **Automatic by path**.
3. Choose the folder level used for grouping.

For example, if your notes are organized like this:

```text
Projects/Research/Note A.md
Projects/Writing/Note B.md
```

Grouping by level 1 will group them under `Projects`, while grouping by level 2 can separate them into `Research` and `Writing`.

#### Use the floating quick switcher

When the floating entry is enabled, a small button appears in a Markdown editor corner. Hover or click it to show grouped tabs without opening the full sidebar.

You can configure its position and offset in the plugin settings.

### Settings

| Setting | Description |
| --- | --- |
| Open grouped tabs sidebar on startup | Automatically opens the grouped sidebar when Obsidian starts. |
| Hide top horizontal tabs | Hides the default top tab bar when the grouped vertical sidebar is visible. |
| Show Markdown tabs only | Shows only Markdown tabs when enabled. When disabled, other view types can also appear. |
| Show ungrouped section | Displays tabs that are not assigned to any manual group. Only used in manual grouping mode. |
| Grouping mode | Switch between manual grouping and automatic path-based grouping. |
| Path level | Choose which folder level is used for automatic grouping. |
| Show floating entry | Enables or disables the floating quick switcher. |
| Floating position | Choose bottom-left, bottom-right, top-left, or top-right. |
| Horizontal offset | Adjust the floating entry's horizontal distance from the editor edge. |
| Vertical offset | Adjust the floating entry's vertical distance from the editor edge. |

### Commands

| Command | Description |
| --- | --- |
| Open TabFlow Organizer | Opens the grouped vertical tabs sidebar. |
| Assign group to active tab | Assigns the current active tab to a manual group. |
| Clear group from active tab | Removes the current active tab from its manual group. |

---

## 中文

### 简介

**TabFlow Organizer（标签流管家）** 是一个用于管理 Obsidian 标签页的插件。它可以把当前打开的标签页整理成分组式垂直侧边栏，也可以在编辑器角落显示一个轻量的悬浮快速切换入口。

如果你经常同时打开很多笔记、论文、项目文档或写作材料，这个插件可以帮你更快地在不同上下文之间切换，不用一直在顶部横向标签栏里找来找去。

### 功能亮点

- **分组式垂直标签栏**：在左侧边栏中以分组方式显示当前打开的标签页。
- **手动标签分组**：可以新建自定义分组，并把标签拖入对应分组。
	-  ![837a530b01b7394bee0b5df60e30101e.png|475](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/837a530b01b7394bee0b5df60e30101e.png?hotee)
	-  ![13aab704aa57676d52b203bd9857a760.png|318](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/13aab704aa57676d52b203bd9857a760.png?hotee)
- **按路径自动分组**：可以根据文件夹层级自动整理标签页。
	-  ![37a11b43d695b6a90f1dfb3149efe624.png|321](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/37a11b43d695b6a90f1dfb3149efe624.png?hotee)
	-  ![33959164cbb8c1fbbe611d9f3e84e1d9.png|343](https://picgo-1317544872.cos.ap-guangzhou.myqcloud.com/33959164cbb8c1fbbe611d9f3e84e1d9.png?hotee)
- **悬浮快速入口**：在 Markdown 编辑页面角落显示小按钮，快速查看和切换分组标签。
- **编辑页固定悬浮**：悬浮入口会固定在 Markdown 编辑页，不会跑到搜索、文件管理器等非编辑页面上。
- **分组折叠 / 展开**：减少视觉干扰，让工作区更清爽。
- **分组颜色**：为不同分组设置颜色，提升识别速度。
- **隐藏顶部横向标签栏**：当垂直分组标签栏显示时，可以隐藏 Obsidian 默认顶部 tabs。
- **只显示 Markdown 标签**：可选择只显示 Markdown 标签，也可显示 PDF、Canvas、网页等其他视图。
- **手动模式未分组区域**：未加入任何手动分组的标签可以集中显示在“未分组”区域。
- **直接关闭标签**：可以从垂直标签列表中直接关闭打开的标签页。
- **中英文界面**：内置英文和简体中文界面文案。

### 安装方法

#### 手动安装

1. 从 GitHub Releases 下载最新版本。
2. 在你的 Obsidian 仓库 `.obsidian/plugins/` 下创建一个插件文件夹：

```text
.obsidian/plugins/<你的插件文件夹>/
```

3. 将以下文件复制进去：

```text
manifest.json
main.js
styles.css
```

4. 重启 Obsidian，或重新加载插件。
5. 打开 **设置 → 第三方插件**。
6. 启用 **TabFlow Organizer**。

#### 使用 BRAT 安装

如果你使用 [BRAT](https://github.com/TfTHacker/obsidian42-brat)，可以把本仓库作为 beta 插件添加进去。

### 发布检查清单

每次发版请确认：

1. `manifest.json` 的 `version` 使用 semver，并同步更新 `versions.json` 映射。
2. 创建 GitHub Release，并上传以下文件：
   - `manifest.json`
   - `main.js`
   - `styles.css`
3. Release 标签/版本号与 `manifest.json` 的 `version` 保持一致。

### 使用方法

#### 打开垂直分组标签栏

打开命令面板，运行：

```text
Open TabFlow Organizer
```

插件会在左侧边栏打开分组标签面板。

#### 创建手动分组

1. 确认 **分组模式** 设置为 **手动分组**。
2. 点击侧边栏顶部的新建分组按钮。
3. 输入分组名称，并选择颜色。
4. 将标签拖入对应分组，或右键标签并选择添加到某个分组。

#### 使用按路径自动分组

1. 打开插件设置。
2. 将 **分组模式** 改为 **按路径自动分组**。
3. 选择用于分组的路径层级。

例如你的文件路径是：

```text
Projects/Research/Note A.md
Projects/Writing/Note B.md
```

按一级目录分组时，它们会归到 `Projects`；按二级目录分组时，则可以分为 `Research` 和 `Writing`。

#### 使用悬浮快速入口

开启悬浮入口后，Markdown 编辑页角落会出现一个小按钮。悬停或点击后，可以快速查看分组标签并切换标签页。

你可以在设置中调整它的位置和偏移距离。

### 设置项

| 设置项 | 说明 |
| --- | --- |
| 启动时打开左侧分组标签栏 | 打开 Obsidian 后自动显示分组标签侧边栏。 |
| 隐藏顶部横向标签栏 | 当垂直分组标签栏可见时，隐藏默认顶部 tabs。 |
| 只显示 Markdown 标签 | 开启后仅显示 Markdown 标签；关闭后可显示 PDF、Canvas、网页等其他视图。 |
| 显示未分组区域 | 显示尚未加入任何手动分组的标签页。仅在手动分组模式下使用。 |
| 分组模式 | 在手动分组和按路径自动分组之间切换。 |
| 路径层级 | 设置自动分组时使用第几级文件夹。 |
| 显示悬浮入口 | 开启或关闭编辑器角落的悬浮快速切换入口。 |
| 悬浮位置 | 可选择左下角、右下角、左上角或右上角。 |
| 水平距离 | 设置悬浮入口距离左右边缘的距离。 |
| 垂直距离 | 设置悬浮入口距离上下边缘的距离。 |

### 命令

| 命令 | 说明 |
| --- | --- |
| Open TabFlow Organizer | 打开标签流管家面板。 |
| Assign group to active tab | 给当前活动标签页设置分组。 |
| Clear group from active tab | 清除当前活动标签页的分组。 |
