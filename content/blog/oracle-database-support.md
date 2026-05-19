---
title: "Introducing Oracle Support in Dory"
description: "Dory now supports Oracle Database, so teams can connect Oracle, explore objects, run Oracle SQL, and use Oracle-aware AI assistance in one workspace."
---

# Introducing Oracle Support in Dory

Dory now supports Oracle Database.

If your team keeps core business data, finance data, ERP data, order systems, reporting systems, or long-running enterprise applications in Oracle, you can now connect Oracle to Dory and work with it in the same modern data workspace.

This release is not just about adding another connection type. Oracle now works across Dory's core data workflow: creating connections, resolving Oracle services, browsing schemas, inspecting tables and views, exploring functions and procedures, previewing data, running Oracle SQL, and using AI assistance with Oracle-aware context.

## Why Oracle Support Matters

Oracle is still a critical database for many enterprise systems. It often holds production data that has run reliably for years, and it is frequently tied to finance, supply chain, customer management, internal operations, audit reporting, and other high-value workflows.

But working with Oracle is not always lightweight. Analysts need to understand service names, schemas, identifier casing, and system catalog views. Engineers need to inspect tables, views, indexes, primary keys, sequences, and stored procedures. When queries fail, Oracle's SQL dialect differences also matter.

With Oracle support, Dory brings that context into a unified workspace. You do not need to jump between tools just to find the right object, and you do not need to treat Oracle as a generic SQL source and guess the syntax.

## What You Can Do

### Connect to Oracle

You can create an Oracle connection from Dory's Connections page.

Dory supports the connection details Oracle users expect:

- Host and port, with `1521` as the default port
- Oracle service name, such as `ORCLPDB1`
- Easy Connect-style host input, such as `oracle://db.example.com:1521/ORCLPDB1`
- Optional Connect String for more complex listener or deployment setups
- Username, password, and Dory's existing connection test and save flow

After the connection is saved, Oracle appears alongside your other data sources. Dory recognizes it as a dedicated database type instead of treating it like Postgres, MySQL, or SQL Server.

### Browse Schemas, Tables, Views, Functions, and Sequences

Once connected, Oracle becomes available in Dory Explorer and the SQL Console sidebar.

You can browse:

- Schemas
- Tables
- Views
- Functions
- Procedures
- Sequences

Dory filters common Oracle system schemas so the workspace stays focused on user-maintained business objects. For a database with many object layers and long-lived historical objects, this matters: opening a connection should show the data you can work with, not bury it under system objects.

The SQL Console sidebar also prefers the schema that matches the current connection identity, helping you get into the right query context faster.

### Inspect Table Details

For Oracle tables and views, Dory can show useful object-level details:

- Columns and data types
- Default expressions
- Column comments
- Primary keys
- Table or view comments
- Table size and row estimates
- Indexes
- Data preview
- Table or view DDL

This gives you the context you need before writing SQL. You can confirm column types, primary keys, indexes, and table scale before deciding how to query, instead of running a large query just to learn the structure.

For data previews, Dory uses Oracle's `FETCH FIRST n ROWS ONLY` and `OFFSET ... FETCH NEXT ...` syntax instead of another database's `LIMIT`.

### Explore Functions and Procedures

Many Oracle databases keep important business logic in functions and stored procedures. Dory now treats these objects as explorable database resources.

When you open a function or procedure, you can see:

- Owning schema
- Object type
- Parameters
- Parameter direction
- Created and modified timestamps
- Sample call SQL

For procedures, Dory generates a `BEGIN ... END;` style sample call. For functions, Dory generates a sample call from `dual`. These details make it easier to understand existing database logic and reduce trial and error when calling it.

### Run Oracle SQL in SQL Console

SQL Console now handles Oracle as its own SQL dialect.

That means Dory can more naturally handle Oracle syntax, including:

- Using `FETCH FIRST n ROWS ONLY` or `ROWNUM` to limit rows
- Avoiding `LIMIT` on Oracle queries
- Supporting Oracle-style named parameters
- Using `dual` when Oracle requires a one-row source
- Preserving Oracle identifier casing and quoting rules

Oracle and other relational databases all use SQL, but small dialect differences are enough to break a query. Dory now treats Oracle as Oracle instead of pushing it through an oversimplified generic SQL template.

### Use Oracle-Aware AI Assistance

Dory's AI assistance now understands Oracle query conventions.

When you ask Dory to generate SQL, fix SQL, or explain a query, it can apply Oracle-specific rules:

- Use Oracle SQL syntax
- Use `FETCH FIRST n ROWS ONLY` or `ROWNUM` to limit result size
- Prefer `ALL_*` and `USER_*` catalog views when metadata is needed
- Query `dual` only when Oracle requires a one-row source
- Avoid PostgreSQL, SQL Server, and MySQL-specific syntax

This matters in real workflows. AI should not generate `LIMIT` for Oracle users, and it should not use PostgreSQL `pg_catalog` or SQL Server `sys` catalog views to inspect Oracle metadata.

## A Better Workspace for Enterprise Databases

Oracle support makes Dory a better fit for real multi-database environments.

Many teams do not use just one database. Production systems may run on Oracle, analytics services may use Postgres or ClickHouse, internal tools may use MySQL or SQL Server, and local analysis may depend on DuckDB, SQLite, or file-based data.

For analysts, this means finding Oracle business data and starting analysis faster.  
For engineers, this means seeing schemas, tables, views, indexes, functions, and procedures more clearly.  
For data and operations teams, this means Oracle can live in the same workspace as every other data source.

Dory's goal is not to flatten every database into the same experience. It is to respect each database's behavior inside a unified workspace.

## How to Start

You can try it with these steps:

1. Open Dory.
2. Go to Connections.
3. Create a new Oracle connection.
4. Enter the host, port, username, password, and service name.
5. Add a Connect String if your environment needs one.
6. Test and save the connection.
7. Open Explorer or SQL Console and start browsing or querying Oracle data.

From there, you can browse schemas, inspect tables and views, preview data, explore functions and procedures, and ask Dory to help write or fix Oracle SQL.

## What's Next

Oracle support is an important step toward supporting real enterprise data environments in Dory.

We will keep improving schema exploration, query assistance, database object understanding, and cross-source workflows so teams can work more smoothly across complex data systems.

If Oracle is part of your data stack, Dory can now work with it.
