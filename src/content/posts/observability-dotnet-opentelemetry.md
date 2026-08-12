---
title: "Observability in .NET with OpenTelemetry"
date: 2025-03-04
excerpt: "How to make .NET services easier to operate with logs, metrics, and traces that explain what the system is doing under real production load."
tags: [".NET", "Observability", "OpenTelemetry"]
---

When a .NET system slows down or starts failing, the first question is rarely "what code changed?" The first question is "what is happening right now?" Observability is how teams answer that quickly. Without it, outages become guesswork and blame shifts between APIs, databases, and downstream services.

OpenTelemetry gives .NET teams a common approach for collecting traces, metrics, and structured telemetry that can be exported to the tools they already use.

## Logs alone are not enough

Logs are useful, but they are only one piece of the picture. If a request touches five services and one database, logs from a single process may not explain where time was spent or where the failure started.

That is why observability should include:

- logs for detailed events
- metrics for trends and alerting
- traces for request flow across boundaries

These three signals complement each other.

## Start with the most important paths

You do not need perfect coverage on day one. Instrument the flows that matter most:

- incoming HTTP requests
- database calls
- outbound HTTP clients
- background job execution

Once those are visible, most production investigations become dramatically faster.

## Use structured logs

String-heavy logs make incident response harder. Prefer structured logs with meaningful properties:

```csharp
logger.LogInformation(
    "Processed order {OrderId} for customer {CustomerId} in {ElapsedMs}ms",
    orderId,
    customerId,
    elapsedMs);
```

This makes filtering and aggregation practical. It also helps connect log events back to a specific trace or request.

## Propagate correlation and trace context

In distributed systems, one request often becomes many downstream calls. Trace context lets you follow that path. When correlation ids and trace ids are available in logs, engineers can move from "customers are seeing timeouts" to "the inventory service is slow on this exact dependency call" much faster.

## Measure what operations care about

Metrics should reflect system health, not just framework activity. Good starting points include:

- request duration
- error rate
- throughput
- queue depth
- background job failure count
- dependency latency

These are the numbers that support alerts, dashboards, and capacity conversations.

## Make dashboards answer common questions

A useful dashboard helps a responder answer:

- are failures increasing?
- which endpoint or dependency is slow?
- did this start after a deployment?
- is the issue broad or isolated?

If a dashboard shows dozens of charts but answers none of those questions, it is decorative rather than operational.

## Instrumentation should serve people

Observability is not a compliance exercise. The point is to help engineers and operators understand the system quickly under pressure. That means naming metrics clearly, logging meaningful identifiers, and avoiding noisy telemetry that nobody uses.

## A practical rollout for .NET teams

For many teams, a strong first step is:

1. enable ASP.NET Core, HTTP client, and database instrumentation
2. add structured application logs
3. include trace or correlation ids in logs
4. create a few targeted dashboards and alerts

Once that is in place, incidents become easier to diagnose and architecture decisions become easier to validate with real data. Observability pays off not because it is trendy, but because it shortens the distance between symptoms and understanding.
