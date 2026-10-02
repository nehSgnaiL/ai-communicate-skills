<div align="center">
  <img src="assets/banner.svg" alt="Understand First — 让开发者理解智能体的工作" width="100%">
  <p><a href="LICENSE">MIT 开源</a> · <a href="README.md">English</a> · <a href="skills/understand-first/SKILL.md">技能入口</a> · <a href="examples/README.md">示例</a></p>
</div>

# Understand First Skills

**Understand First** 让 AI 把工作讲清楚，帮助开发者理解并做出判断。

**AI 生成说明：** 本仓库内容由 AI 根据人类提供的需求生成。

项目受到 [Andrej Karpathy 关于理解语言模型输出的帖子](https://x.com/karpathy/status/2105819303471976479) 启发。它是独立项目，不代表作者的产品、指令或认可。

## 核心理念

**让开发者能够讲清机制、核查证据。**

- 先说明具体行为和结论，再给必要的实现细节。
- 根据实际代码、日志、差异、数据或一手资料解释。
- 用适合问题的表达形式；简单问题用简短回答就够。
- 明确区分事实、推断、方案和未知信息。
- 保留可编辑的讲解产物，方便修改和丢弃。
- 继续完成已授权的工作，让讲解服务于交付和审查。

文字、图解、网页、视频是可选择的表达方式，不是每次都必须完成的升级流程。

## 快速开始

安装后，可以直接这样说：

```text
使用 $understand-first 帮我理解这次改动，便于审查。
先说明行为变化，再用合适的表达方式解释机制。
给出可核查的依据，并标明尚未验证的部分。
```

| 需求 | 提示词示例 |
| --- | --- |
| 看懂代码改动 | “用清楚、简洁的中文解释这个 diff，保留条件和例外。” |
| 理解系统结构 | “画出一次请求的流向，包括失败分支和对应代码位置。” |
| 理解故障原因 | “结合这些日志和代码解释超时，区分观察事实和假设。” |
| 比较参数影响 | “做一个本地 HTML 讲解页，让我调整重试参数，并标明模型假设。” |
| 理解状态变化 | “生成状态机的视频讲解；没有配音时用字幕，同时交付可编辑源文件。” |

[离线 HTML 示例](examples/retry-explainer.html) 演示重试次数对成功概率、请求量和等待时间的影响。下载后用浏览器打开即可，无需服务器、账号或 API 密钥。示例采用合成模型，不是生产数据。

<details>
  <summary>查看交互讲解页预览</summary>
  <p><img src="assets/retry-explainer.png" alt="离线重试策略讲解页，包含参数控制、成功概率、请求量和模型假设" width="100%"></p>
</details>

## 安装

已安装 Node.js 和 npm 时，可通过 [开放技能 CLI](https://github.com/vercel-labs/skills) 安装：

```bash
npx skills add nehSgnaiL/understand-first-skills --list
npx skills add nehSgnaiL/understand-first-skills --skill understand-first --agent codex --copy
```

默认安装到当前项目；跨项目使用时添加 `--global`。Claude Code 使用 `--agent claude-code`，其他受支持的智能体可通过 CLI 选择。安装技能文件不会自动安装视频或配音工具。

手动安装时，先克隆仓库，再把完整的 `skills/understand-first/` 目录复制到目标智能体支持的技能目录，保留 `references/` 和 `agents/`。[Codex 官方技能文档](https://learn.chatgpt.com/docs/build-skills) 说明了技能格式和加载规则。

```bash
git clone https://github.com/nehSgnaiL/understand-first-skills.git
```

也可以让有文件访问权限的智能体直接读取 `SKILL.md`，但这不等于安装或自动发现。安装前请先阅读技能内容。

## 技能索引

只有一个可安装技能：[`understand-first`](skills/understand-first/SKILL.md)。它负责协作流程和表达形式选择，并按需读取以下指南：

| 模式 | 适用问题 | 指南 |
| --- | --- | --- |
| 清晰文字 | 结论、操作、改动交接 | [文字](skills/understand-first/references/clear-writing.md) |
| 图解 | 关系、边界、控制流 | [图解](skills/understand-first/references/diagrams.md) |
| 交互式 HTML | 参数变化、方案比较 | [HTML](skills/understand-first/references/interactive-html.md) |
| 视频讲解 | 时间过程、逐步视觉推理 | [视频](skills/understand-first/references/video-explainers.md) |

技能没有必需的外部服务或运行时依赖。丰富产物取决于智能体现有工具。仓库提供 HTML 示例与视频制作指导，没有内置视频渲染器，也没有预生成的视频。

## 贡献与验证

参见[贡献指南](CONTRIBUTING.md)与[行为评估场景](docs/evaluation.md)。结构检查需要 Python 3.10 或更新版本：

```bash
python -m pip install -r requirements-dev.txt
python scripts/validate.py
```

验证器检查技能元数据和本地 Markdown 链接。它不能证明智能体遵循了指令、技术结论正确或产物易用；这些需要真实任务和产物检查。

## 来源与许可

灵感来自 [Karpathy 的帖子](https://x.com/karpathy/status/2105819303471976479)。创建时无法直接读取 X，初始指导根据项目请求者提供的帖子文本整理，是本项目的解释与实现。

写作参考 [ASD-STE100 官方网站](https://www.asd-ste100.org/)及其 [FAQ](https://www.asd-ste100.org/STE_faq.html)。默认采用受其启发的宽松写作风格，不分发标准或受控词典，不声称符合标准。“80%”是风格偏好，不是合规分数。

仓库原创内容采用 [MIT 许可](LICENSE)。外部资料的权利归各自所有者。本项目不会因生成讲解而自动获得部署、上传私有代码或额外付费调用的授权。
