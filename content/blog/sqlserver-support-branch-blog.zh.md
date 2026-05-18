---
title: "Dory 现已支持 SQL Server"
description: "Dory 现已支持 Microsoft SQL Server，让团队可以在一个工作区里完成数据库探索、T-SQL 查询和 AI 辅助分析。"
---

# Dory 现已支持 SQL Server

Dory 现在可以连接 Microsoft SQL Server 了。

如果你的团队把运营数据、报表数据、客户记录、财务数据，或者内部业务逻辑放在 SQL Server 中，现在可以直接把它接入 Dory，并用同一个现代化数据工作区来浏览、查询和分析这些数据。

这次支持不只是“能连上 SQL Server”。SQL Server 已经进入 Dory 的核心数据工作流：创建连接、浏览数据库、查看表和视图、探索函数和存储过程、运行 T-SQL、预览数据，以及使用带有 SQL Server 上下文的 AI 辅助。

## 为什么支持 SQL Server 很重要

SQL Server 仍然是许多企业和生产系统的核心数据库。订单、账单、物流、销售运营、内部工具、报表管道、企业应用，很多关键数据都可能运行在 SQL Server 上。

但在日常工作中，围绕 SQL Server 的数据分析往往是割裂的：写 SQL 用一个工具，浏览 schema 用另一个工具，分享结果又换一个地方，遇到复杂查询时还需要额外寻找帮助。

Dory 希望把这些流程放到一个地方。接入 SQL Server 后，团队可以更快地从“我先找一下这个数据在哪”进入到“我可以直接理解并查询这份数据”。

## 你可以做什么

### 连接 SQL Server

你可以在 Dory 的 Connections 页面创建 SQL Server 连接。

Dory 支持 SQL Server 用户常见的连接配置：

- Host 和端口，默认端口为 `1433`
- 默认数据库
- 加密连接
- Trust certificate 选项
- SQL Server 风格的连接 URL

保存后，SQL Server 会和你的其他数据源一起出现在工作区中，并显示专属的 SQL Server 图标，方便你快速识别当前正在使用的数据源。

### 浏览数据库、Schema、表和视图

连接成功后，SQL Server 会出现在 Dory Explorer 中。

你可以浏览：

- Databases
- Schemas
- Tables
- Views
- Functions
- Procedures
- Sequences

这让你在写 SQL 之前，就能先了解 SQL Server 实例里有哪些数据库对象。你可以顺着数据库结构逐层查看，找到合适的表、视图或函数，而不需要在多个工具之间来回切换。

### 查看表详情

对于 SQL Server 表，Dory 可以展示常用的对象级信息：

- 字段和数据类型
- 主键
- 表大小
- 行数估计
- 索引
- 数据预览
- 表定义

这些信息能帮助分析师和工程师在查询生产数据前获得必要上下文。你不用先猜字段名，也不用先跑一条大查询来判断表的规模，可以直接在对象详情里查看。

### 探索函数和存储过程

许多 SQL Server 数据库会把重要业务逻辑放在函数和存储过程中。Dory 现在会把这些对象也作为可探索的数据库资源展示出来。

打开一个函数或存储过程后，你可以看到：

- 签名
- 参数
- 返回类型或返回列
- 源定义
- 依赖对象
- 哪些对象依赖它
- 示例调用 SQL

你也可以复制示例调用，或者直接打开到 SQL Console 中执行。这对于理解历史逻辑、审计数据库行为、复用已有存储过程都很有帮助。

### 在 SQL Console 中运行 T-SQL

SQL Console 现在会把 SQL Server 作为独立 SQL 方言处理。

这意味着 Dory 可以更自然地处理 SQL Server 语法，例如使用 `TOP` 或 `OFFSET/FETCH` 控制返回行数，而不是使用其他数据库常见的 `LIMIT`。

SQL Server 和其他 SQL 数据库看起来很像，但一些小的方言差异就会让查询失败。Dory 现在会把 SQL Server 当作 SQL Server 来处理，而不是当成一个泛化的 SQL 数据库。

### 使用带 SQL Server 上下文的 AI 辅助

Dory 的 AI 辅助现在也理解 SQL Server 的查询习惯。

当你让 Dory 帮你写 SQL 或修复 SQL 时，它会参考 SQL Server 相关规则：

- 使用 T-SQL 语法
- 使用 `TOP` 或 `OFFSET/FETCH` 控制结果数量
- 需要元数据时，优先使用 SQL Server catalog views 和 `INFORMATION_SCHEMA`
- 避免使用 PostgreSQL 或 MySQL 专属语法

当查询失败时，Dory 也会把 SQL Server 返回的错误信息传给 Copilot。这样 AI 不只是知道“查询失败了”，而是能看到具体错误，并基于错误原因帮助你修正 SQL。

这会让整个工作流更顺：提出问题，生成 SQL，运行查询，查看结果，遇到错误后继续修正。

## 更适合 SQL Server 团队的数据工作区

SQL Server 支持让 Dory 更适合真实的数据环境。很多团队并不是只使用一种数据库，而是同时使用 SQL Server、Postgres、MySQL、DuckDB、ClickHouse、SQLite，甚至还有文件型数据集。

对于分析师，这意味着可以更快找到数据并开始分析。  
对于工程师，这意味着可以更清楚地查看表、函数、存储过程和依赖关系。  
对于数据和运营团队，这意味着 SQL Server 可以和其他数据源一起放在同一个工作区中管理和使用。

目标很简单：让 SQL Server 在 Dory 里成为自然的一部分。

## 如何开始

你可以按下面的步骤试用：

1. 打开 Dory。
2. 进入 Connections。
3. 创建一个新的 SQL Server 连接。
4. 填写 host、端口、账号、密码和默认数据库。
5. 如果你的环境需要，配置 SSL。
6. 测试并保存连接。
7. 打开 Explorer 或 SQL Console，开始浏览和查询数据。

接下来，你就可以浏览数据库对象、预览表数据、查看函数和存储过程，并让 Dory 帮你编写 T-SQL 查询。

## 接下来

SQL Server 支持是 Dory 面向真实多数据库环境迈出的重要一步。

我们会继续改进 schema 探索、查询辅助、数据库对象理解，以及跨数据源工作流，让团队可以更顺畅地处理复杂的数据系统。

如果 SQL Server 是你数据栈的一部分，现在 Dory 已经可以和它一起工作。
