---
title: "Introducing SQL Server Support in Dory"
description: "Dory now supports Microsoft SQL Server, bringing database exploration, SQL editing, and AI-assisted analysis to SQL Server teams."
---

# Introducing SQL Server Support in Dory

Dory now supports Microsoft SQL Server.

If your team keeps operational data, reporting tables, customer records, finance data, or internal business logic in SQL Server, you can now connect it to Dory and work with it through the same modern workspace you already use for other databases.

This release is not just about opening a connection. SQL Server now works across Dory's core data workflow: creating a connection, browsing databases, exploring tables and views, inspecting functions and procedures, running T-SQL, previewing data, and using AI assistance with SQL Server-aware context.

## Why SQL Server Support Matters

SQL Server is still at the center of many production systems. It often powers the parts of a business that people depend on every day: orders, billing, logistics, sales operations, internal tools, reporting pipelines, and enterprise applications.

But working with SQL Server data can still feel fragmented. One tool is used for writing SQL, another for browsing schemas, another for sharing results, and another for asking questions about the data. Dory brings these workflows into one place.

With SQL Server support, Dory helps teams move from “I need to find the right database object first” to “I can understand and query this data directly.”

## What You Can Do

### Connect to SQL Server

You can create a SQL Server connection from Dory's connection page using the standard connection form.

Dory supports the connection details SQL Server users expect:

- Host and port, with `1433` as the default port
- Default database selection
- Encrypted connections
- Trust certificate option for environments that need it
- SQL Server-style connection URLs

After the connection is saved, it appears alongside your other data sources, with a dedicated SQL Server icon so it is easy to recognize in the workspace.

### Browse Databases, Schemas, Tables, and Views

Once connected, SQL Server becomes available in Dory Explorer.

You can browse:

- Databases
- Schemas
- Tables
- Views
- Functions
- Procedures
- Sequences

This makes it easier to understand what exists inside a SQL Server instance before writing a query. You can move through the database structure, inspect objects, and find the right starting point without switching tools.

### Inspect Table Details

For SQL Server tables, Dory can show useful object-level details such as:

- Columns and data types
- Primary keys
- Table size
- Row estimates
- Indexes
- Table preview
- Generated table definition

This gives analysts and engineers the context they need before querying production data. Instead of guessing which columns exist or whether a table is large, you can inspect the object directly.

### Explore Functions and Procedures

SQL Server databases often contain important business logic in functions and stored procedures. Dory now treats those as explorable database objects.

You can open a function or procedure and see:

- Signature
- Parameters
- Return type or return columns
- Source definition
- Dependencies
- Objects that depend on it
- A sample call

You can also copy the sample call or open it in SQL Console. This is useful when you are trying to understand legacy logic, audit database behavior, or reuse an existing stored procedure safely.

### Run T-SQL in SQL Console

SQL Console now understands SQL Server as its own SQL dialect.

That means Dory can handle SQL Server-specific syntax more naturally, including row limits with `TOP` and `OFFSET/FETCH` instead of `LIMIT`.

This matters because SQL Server is close enough to other SQL databases to look familiar, but different enough that small syntax mistakes can break a workflow. Dory now treats SQL Server as SQL Server, not as a generic SQL database.

### Use AI Assistance with SQL Server Context

Dory's AI assistance now has SQL Server-aware instructions.

When you ask Dory to help write or fix a query, it can account for SQL Server conventions:

- Use T-SQL syntax
- Use `TOP` or `OFFSET/FETCH` for limits
- Use SQL Server catalog views and `INFORMATION_SCHEMA` when metadata is needed
- Avoid PostgreSQL-only or MySQL-only syntax

Dory also passes SQL error context into Copilot when a query fails. Instead of only seeing that something went wrong, the assistant can use the actual SQL Server error message to help revise the query.

The result is a smoother loop: ask a question, run SQL, inspect the result, fix errors, and continue.

## A Better Workflow for SQL Server Teams

SQL Server support makes Dory more useful for teams that work across multiple database systems.

For analysts, it means faster access to data without needing to memorize every schema detail.  
For engineers, it means a cleaner way to inspect tables, functions, procedures, and dependencies.  
For operators and data teams, it means SQL Server can sit next to Postgres, MySQL, DuckDB, ClickHouse, SQLite, and file-based datasets in one workspace.

The goal is simple: make SQL Server feel native inside Dory.

## Getting Started

To try it:

1. Open Dory.
2. Go to Connections.
3. Create a new SQL Server connection.
4. Enter your host, port, credentials, and default database.
5. Configure SSL if your environment requires it.
6. Test and save the connection.
7. Open Explorer or SQL Console to start working with your data.

From there, you can browse database objects, preview tables, inspect functions, and ask Dory to help write T-SQL queries.

## What's Next

SQL Server support is a step toward making Dory a better workspace for real-world data environments, where teams rarely use only one database.

As more teams connect SQL Server to Dory, we will continue improving the experience around schema exploration, query assistance, database object understanding, and cross-database workflows.

If SQL Server is part of your data stack, Dory can now meet it where it is.
