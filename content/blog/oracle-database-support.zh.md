---
title: "Dory 现已支持 Oracle"
description: "Dory 现已支持 Oracle Database，让团队可以在同一个工作区里连接 Oracle、浏览对象、运行 Oracle SQL，并使用带 Oracle 上下文的 AI 辅助。"
---

# Dory 现已支持 Oracle

Dory 现在可以连接 Oracle Database 了。

如果你的团队把核心业务数据、财务数据、ERP 数据、订单系统、报表系统，或者长期运行的企业应用放在 Oracle 中，现在可以直接把 Oracle 接入 Dory，并在同一个现代化数据工作区里完成浏览、查询和分析。

这次支持不只是“新增一个 Oracle 连接类型”。Oracle 已经进入 Dory 的核心数据工作流：创建连接、识别 Oracle 服务、浏览 schema、查看表和视图、探索函数和存储过程、预览数据、运行 Oracle SQL，以及使用带 Oracle 上下文的 AI 辅助。

## 为什么支持 Oracle 很重要

Oracle 仍然是很多企业系统的关键数据库。它经常承载稳定运行多年的生产数据，也常常和财务、供应链、客户管理、内部运营、审计报表等高价值业务绑定在一起。

但 Oracle 的日常使用并不总是轻量。分析师需要知道 service name、schema、表名大小写、系统 catalog 视图；工程师需要理解表、视图、索引、主键、序列和存储过程；遇到查询问题时，还要注意 Oracle 和其他 SQL 数据库之间的方言差异。

Dory 支持 Oracle 后，团队可以把这些上下文放进一个统一工作区。你不需要先在多个工具之间切换来确认对象在哪里，也不需要把 Oracle 当成一个泛化的 SQL 数据源来猜语法。

## 你可以做什么

### 连接 Oracle

你可以在 Dory 的 Connections 页面创建 Oracle 连接。

Dory 支持 Oracle 用户常见的连接方式：

- Host 和端口，默认端口为 `1521`
- Oracle service name，例如 `ORCLPDB1`
- Easy Connect 风格的 host 输入，例如 `oracle://db.example.com:1521/ORCLPDB1`
- 可选的 Connect String，用于更复杂的 listener 或部署环境
- 用户名、密码，以及 Dory 现有的连接测试和保存流程

保存后，Oracle 会和你的其他数据源一起出现在工作区中。Dory 会把它识别为独立的数据库类型，而不是伪装成 Postgres、MySQL 或 SQL Server。

### 浏览 Schema、表、视图、函数和序列

连接成功后，Oracle 会进入 Dory Explorer 和 SQL Console 侧边栏。

你可以浏览：

- Schemas
- Tables
- Views
- Functions
- Procedures
- Sequences

Dory 会过滤常见的 Oracle 系统 schema，把工作重点放在用户维护的业务对象上。对于 Oracle 这种对象层级较多、历史对象较多的数据库，这一点很重要：打开连接后，看到的应该是可以直接开始工作的业务数据，而不是被系统对象淹没。

SQL Console 侧边栏也会优先匹配当前连接身份对应的 schema，让你更快进入实际查询上下文。

### 查看表详情

对于 Oracle 表和视图，Dory 可以展示常用的对象级信息：

- 字段和数据类型
- 默认表达式
- 字段注释
- 主键
- 表或视图注释
- 表大小和行数估计
- 索引
- 数据预览
- 表或视图 DDL

这让你在写 SQL 前就能获得必要上下文。你可以先确认字段类型、主键、索引和表规模，再决定如何查询，而不是先跑一条大查询来试探数据结构。

预览数据时，Dory 会使用 Oracle 的 `FETCH FIRST n ROWS ONLY` 和 `OFFSET ... FETCH NEXT ...` 语法，而不是使用其他数据库的 `LIMIT`。

### 探索函数和存储过程

很多 Oracle 数据库会把关键业务逻辑放在函数和存储过程中。Dory 现在会把这些对象作为可探索的数据库资源展示出来。

打开函数或存储过程后，你可以看到：

- 所属 schema
- 对象类型
- 参数
- 参数方向
- 创建时间和修改时间
- 示例调用 SQL

对于存储过程，Dory 会生成 `BEGIN ... END;` 风格的示例调用；对于函数，Dory 会生成从 `dual` 查询的示例调用。这些细节可以帮助你更快理解已有数据库逻辑，也能减少手写调用语句时的反复试错。

### 在 SQL Console 中运行 Oracle SQL

SQL Console 现在会把 Oracle 作为独立 SQL 方言处理。

这意味着 Dory 会更自然地处理 Oracle 语法，例如：

- 使用 `FETCH FIRST n ROWS ONLY` 或 `ROWNUM` 控制返回行数
- 避免把 `LIMIT` 加到 Oracle 查询后面
- 支持 Oracle 风格的命名参数
- 在需要单行来源时使用 `dual`
- 保留 Oracle 标识符大小写和引用规则

Oracle 和其他关系型数据库都使用 SQL，但细节差异足以让查询失败。Dory 现在会把 Oracle 当作 Oracle 来处理，而不是把它放进一个过度简化的通用 SQL 模板里。

### 使用带 Oracle 上下文的 AI 辅助

Dory 的 AI 辅助现在也理解 Oracle 的查询习惯。

当你让 Dory 帮你生成 SQL、修复 SQL 或解释查询时，它会参考 Oracle 相关规则：

- 使用 Oracle SQL 语法
- 使用 `FETCH FIRST n ROWS ONLY` 或 `ROWNUM` 控制结果数量
- 需要元数据时，优先使用 `ALL_*` 和 `USER_*` catalog 视图
- 只在 Oracle 需要单行来源时查询 `dual`
- 避免 PostgreSQL、SQL Server、MySQL 专属语法

这对真实工作流很关键。AI 不应该给 Oracle 用户生成 `LIMIT`，也不应该用 PostgreSQL 的 `pg_catalog` 或 SQL Server 的 `sys` catalog 来查询 Oracle 元数据。

## 更适合企业数据库环境的数据工作区

Oracle 支持让 Dory 更适合真实的多数据库环境。

很多团队不是只使用一种数据库。生产系统可能在 Oracle，分析服务可能在 Postgres 或 ClickHouse，内部工具可能使用 MySQL 或 SQL Server，本地分析还可能依赖 DuckDB、SQLite 或文件数据。

对于分析师，这意味着可以更快找到 Oracle 里的业务数据并开始分析。  
对于工程师，这意味着可以更清楚地查看 schema、表、视图、索引、函数和存储过程。  
对于数据和运营团队，这意味着 Oracle 可以和其他数据源一起放在同一个工作区里管理和使用。

Dory 的目标不是把所有数据库抹平成同一种体验，而是在统一工作区里尊重每一种数据库自己的行为。

## 如何开始

你可以按下面的步骤试用：

1. 打开 Dory。
2. 进入 Connections。
3. 创建一个新的 Oracle 连接。
4. 填写 host、端口、用户名、密码和 service name。
5. 如果你的环境需要，填写 Connect String。
6. 测试并保存连接。
7. 打开 Explorer 或 SQL Console，开始浏览和查询 Oracle 数据。

接下来，你就可以浏览 schema、查看表和视图、预览数据、探索函数和存储过程，并让 Dory 帮你编写或修复 Oracle SQL。

## 接下来

Oracle 支持是 Dory 面向真实企业数据环境的重要一步。

我们会继续改进 schema 探索、查询辅助、数据库对象理解，以及跨数据源工作流，让团队可以更顺畅地处理复杂的数据系统。

如果 Oracle 是你数据栈的一部分，现在 Dory 已经可以和它一起工作。
