---
title: "EF Core Performance Checklist for Production"
date: 2025-03-08
excerpt: "A practical EF Core checklist for reducing slow queries, oversized object graphs, and unnecessary database work in production systems."
tags: ["EF Core", "Performance", "Databases"]
---

Entity Framework Core is productive, but productivity can hide expensive defaults. Many slow .NET applications are not suffering from a lack of hardware. They are suffering from overly broad queries, unnecessary tracking, and data access patterns that look fine in development but fall apart at scale.

A good EF Core performance approach is not to memorize tricks. It is to apply a repeatable checklist.

## Project only what you need

The most common problem is loading entire entities when the screen or API only needs three fields. If a query is read-only, project directly to a DTO:

```csharp
var orders = await _db.Orders
    .Where(x => x.Status == OrderStatus.Pending)
    .Select(x => new OrderSummaryDto(x.Id, x.Number, x.Total))
    .ToListAsync(ct);
```

Projection reduces transferred columns, avoids large object graphs, and makes query intent clearer.

## Turn off tracking for read paths

Change tracking is useful for updates, but it costs memory and CPU. For query endpoints and dashboards, use `AsNoTracking()` unless you truly plan to modify the entities.

```csharp
var product = await _db.Products
    .AsNoTracking()
    .SingleOrDefaultAsync(x => x.Id == id, ct);
```

Read models and report queries are usually better off without tracking.

## Watch for N+1 queries

N+1 happens when you load a list and then trigger additional queries per item while iterating. It is easy to miss in local testing and painful in production. Watch for:

- lazy loading in hot paths
- loops that access navigation properties one item at a time
- handlers that call the database repeatedly for related data

Prefer a single shaped query or a deliberate batching strategy.

## Be explicit with includes

`Include` is helpful, but it is not free. Pulling several nested navigations into memory can explode row counts and create duplicated data in SQL results. Before adding another `Include`, ask:

- do I need the full related entity?
- could projection shape this better?
- is this read path better served by a custom query?

If the answer is "I only need a summary," use projection instead of building a big graph.

## Keep write units small

On the write side, large tracked graphs can make `SaveChangesAsync()` slower and harder to reason about. Load the aggregate or rows you need, apply the change, save, and stop. Do not keep a `DbContext` alive for too long or allow it to accumulate unrelated entities.

In most web applications, one request equals one short-lived `DbContext`. That is a healthy default.

## Measure generated SQL

If a query is slow, inspect the SQL before guessing. EF Core often gets blamed for problems that are really index issues, cartesian explosions, or unbounded filters.

Look at:

- the SQL text
- query duration
- execution plan
- missing indexes
- whether filtering happens in SQL or after materialization

Performance work improves quickly when you debug the actual query instead of the LINQ shape alone.

## Use pagination intentionally

Returning thousands of rows from an API is rarely a good default. Add pagination to list endpoints and make sort order explicit. Stable ordering plus sensible page sizes is one of the easiest ways to control database and API cost.

## Cache where it helps, not where it hides problems

Caching can improve read performance, but it should not be used to excuse poor queries. Fix the data access shape first. Then cache results that are expensive, popular, and safe to reuse.

## A simple production checklist

Before shipping an EF Core query path, check:

- projection over full entities where possible
- `AsNoTracking()` for reads
- no accidental N+1 behavior
- indexes match filters and joins
- pagination on list endpoints
- reasonable query times under realistic data volume

EF Core performs well when the model and query shape stay intentional. Most teams do not need exotic optimization. They need fewer oversized queries, better visibility into SQL, and the discipline to treat data access as part of software design rather than a black box.
