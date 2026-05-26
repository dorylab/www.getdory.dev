---
title: "Dory 现已支持组织级 AI BYOK"
description: "Dory 现已支持组织级 AI BYOK，让团队可以为不同组织选择自己的 AI Provider、模型和 endpoint，同时保留系统 Provider 作为 fallback。"
category: "AI Providers"
ogVariant: "ai-providers"
---

# Dory 现已支持组织级 AI BYOK

Dory 现在支持组织级 AI BYOK 了。

团队可以为某个组织单独配置 AI Provider，选择要使用的模型，并让 Dory 的 AI 工作流使用该组织自己的 Provider 凭据。系统 Provider 仍然会作为 fallback 保留，因此管理员可以给组织更多控制权，同时保留一个由服务器统一管理的默认配置。

这对在不同环境、客户、部门或合规边界中使用 Dory 的团队很重要。一个组织可能想用 OpenAI，另一个组织可能使用 Anthropic，另一个组织可能通过 OpenRouter 路由，还有一个组织可能希望把 Dory 指向 OpenAI Compatible 的本地模型端点。Dory 现在可以在组织级别表达这些差异。

## 为什么组织级 BYOK 很重要

AI 正在成为数据库工作流的一部分。人们会让 AI 编写 SQL、修复失败查询、解释 schema、总结结果，并帮助他们从一个问题走到一条可运行的查询。

但 AI 配置很少是“一套配置适用于所有团队”。

有些团队已经有经过批准的 Provider 账号。有些团队有区域合规要求。有些团队会经过内部网关。有些团队希望使用 OpenAI-compatible API 后面的本地或自托管模型。同一个 Dory 工作区里的不同组织，也可能需要完全不同的 Provider。

在组织级 BYOK 之前，AI 配置主要由服务器统一管理。这对于简单默认值很有用，但对于需要按组织控制 Provider 的团队来说粒度不够。

现在 Dory 支持更清晰的模型：

- **System Provider** 由服务器管理员全局配置。
- **Organization Provider** 可以为某个组织覆盖系统默认值。
- 当组织 Provider 生效时，**Fallback** 仍然会清楚展示。

这样既能让需要控制权的组织拥有独立配置，也能保留稳定的系统级默认值。

## 可以配置什么

组织管理员可以在 AI settings 页面添加 AI Provider。

每个组织 Provider 支持：

- 选择 Provider
- 设置默认模型
- 配置 Base URL
- 配置 API key
- 保存前测试 Provider
- 设置默认 Provider
- 启用、禁用、编辑和删除

只有当组织 Provider 已启用、配置完整，并且当前计划或 license 允许时，它才会成为 active provider。如果组织 Provider 被禁用、配置不完整，或者当前 entitlement 不可用，Dory 会 fallback 到系统 Provider。

## 支持的 Provider

Dory 的组织级 BYOK 支持团队常用的 Provider：

- OpenAI
- Anthropic
- Azure OpenAI
- OpenRouter
- Google Gemini
- Qwen
- xAI
- Meta
- OpenAI Compatible

OpenAI Compatible 对使用本地模型、内部网关，或提供 OpenAI 风格 API 的托管推理服务的团队尤其重要。对于这个 Provider，Base URL 是必填项，API key 是否需要取决于具体 endpoint。

## 为真实团队边界设计

组织级 BYOK 面向多组织工作区设计。

Dory 不再把 AI 当成一个全局开关，而是可以更接近真实团队的使用方式：

- 面向客户的组织可以使用自己批准过的 Provider。
- 数据团队可以测试不同模型，而不影响所有组织。
- 自托管部署可以保留系统 Provider，同时允许特定组织覆盖它。
- 本地或私有模型可以通过 OpenAI-compatible endpoint 接入。

当 Dory 被具有不同预算、数据政策、延迟要求或 Provider 偏好的团队共同使用时，这一点尤其有价值。

## 更安全的默认值，更清晰的 Fallback

组织 Provider 是 override，而不是对系统 Provider 的破坏性替换。

当组织 Provider 生效时，Dory 仍然会展示系统 Provider 作为 fallback。如果之后组织 Provider 被禁用，或者配置不再完整，AI 执行可以回到全局 Provider，而不是让组织处在不清楚的状态。

已保存的组织 Provider 记录也可以继续保留，方便之后再次使用。切回系统 Provider 不需要删除管理员以后可能还想复用的 Provider 详情。

## 直接使用组织自己的 Provider 执行

当组织 Provider 生效时，Dory 会使用该 Provider 和模型执行 AI 请求，而不是走系统托管 cloud AI 使用的 cloud proxy 路径。

这让组织级 BYOK 更适合希望 AI 行为跟随自己 Provider 设置的团队：使用自己的 endpoint、自己的模型，以及自己的 Provider 账号。

## 可用性

组织级 BYOK 会在组织 AI Provider 管理能力可用时开放：

- 基于 cloud plan 的环境中，Dory Pro 可用
- 基于自托管 license 的环境中，Dory Enterprise 可用

没有权限的组织仍然可以看到当前系统 Provider 状态，但编辑组织 Provider 需要对应的计划或 license。

## 如何开始

配置组织级 BYOK：

1. 打开 Dory。
2. 进入对应组织的 Settings。
3. 打开 AI。
4. 添加一个 Organization Provider。
5. 选择 Provider 和模型。
6. 在需要时填写 Base URL 和 API key。
7. 测试 Provider。
8. 保存，并把它设为该组织的默认 Provider。

生效后，Dory 的 AI 功能会在该组织内使用组织 Provider。全局系统 Provider 仍然会作为 fallback 保留。

## 接下来

组织级 BYOK 是 Dory 更大方向的一部分：让 AI 真正进入数据工作流，同时不强迫每个团队使用同一套 Provider 配置。

数据库团队需要理解 schema、SQL 方言、查询错误和结果上下文的 AI。他们也需要符合组织实际运作方式的 Provider 控制权。

有了组织级 BYOK，Dory 可以同时支持这两点。
