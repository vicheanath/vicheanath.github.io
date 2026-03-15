---
title: "When a Modular Monolith Beats Microservices in .NET"
date: 2025-03-05
excerpt: "Why many .NET teams move faster with a modular monolith first, and how to structure modules so the codebase stays clean as the product grows."
---

Microservices solve real problems, but they also introduce many of their own: network boundaries, distributed tracing, deployment coordination, duplicated infrastructure, and cross-service consistency concerns. For many .NET teams, a **modular monolith** is the better default because it preserves strong boundaries without paying distributed-systems cost too early.

## A modular monolith is not a big ball of mud

The word "monolith" often gets blamed for problems that really come from weak boundaries. A modular monolith can still have:

- clear domain areas
- separate application flows per module
- internal contracts
- isolated data access code
- independent ownership at the code level

The difference is that modules run in one deployable unit and communicate in-process.

## Why it works well in .NET

.NET solutions make module boundaries straightforward. You can model modules with folders, namespaces, or separate projects depending on the size of the system. A common pattern looks like this:

```text
src/
  Sales/
    Application/
    Domain/
    Infrastructure/
  Billing/
    Application/
    Domain/
    Infrastructure/
  Shared/
```

Each module owns its use cases and persistence details. Cross-module access happens through explicit interfaces or events rather than direct table sharing and random method calls.

## You keep the good parts of separation

A modular monolith still gives you many service-like benefits:

- focused areas of ownership
- smaller reasoning scope during changes
- fewer accidental dependencies
- a path to future extraction if a module truly needs it

What you avoid is operating multiple services before the team has evidence that distribution is worth it.

## Most teams underestimate operational complexity

Moving to microservices means taking on:

- service discovery
- per-service CI/CD concerns
- cross-service authentication
- resilient communication
- distributed monitoring
- more failure modes

If the core product and domain are still changing quickly, those costs can dominate engineering time. A modular monolith lets the team focus on product learning first.

## Design module boundaries intentionally

The main risk in a monolith is boundary erosion. To avoid that:

- keep module APIs explicit
- do not let modules reach into each other's persistence internals
- prefer events or request interfaces for cross-module collaboration
- review dependencies regularly

If everything can reference everything, the monolith stops being modular and becomes hard to maintain.

## Extraction becomes a business decision later

A well-structured modular monolith gives you options. If a module later needs independent scaling, separate ownership, or different runtime requirements, you can extract it with much less pain because the seam already exists.

That is a better position than starting with microservices and discovering the boundaries were wrong all along.

## A practical default

For many .NET teams, the right path is:

1. start with a modular monolith
2. enforce boundaries in code review and architecture
3. measure actual scaling and ownership pain
4. extract only where the evidence is strong

That approach is not anti-microservices. It is pro-timing. In software engineering, the best architecture is often the one that solves today's complexity without locking you out of tomorrow's change.
