---
title: "Async and Await Best Practices in .NET"
date: 2025-03-09
excerpt: "How to use async and await in .NET without creating hidden deadlocks, thread starvation, or unnecessarily complicated code."
---

`async` and `await` make .NET code easier to read, but they do not remove concurrency problems. Many production issues in .NET systems come from mixing synchronous and asynchronous code, blocking threads unnecessarily, or starting work without a clear ownership model.

The goal is not to make every method async. The goal is to make I/O-bound work non-blocking and keep the execution model understandable.

## Make async contagious at the edges

If a database call, HTTP request, or file operation is asynchronous, the methods above it usually need to be asynchronous too. Trying to force async work back into sync code with `.Result` or `.Wait()` is where trouble starts.

This is the pattern to avoid:

```csharp
var user = _client.GetUserAsync(id).Result;
```

That kind of blocking can lead to deadlocks in some contexts and wasted threads in all of them. Prefer carrying `Task` all the way up to the request boundary.

## Use async for I/O, not for pretend parallelism

A common mistake is wrapping synchronous work in `Task.Run` inside ASP.NET Core request handlers. That does not make the work cheaper; it only moves it to another thread pool thread.

Use async when the underlying operation supports non-blocking I/O:

- EF Core queries
- HTTP calls
- queue or blob storage operations
- file access

For CPU-heavy work, either do it synchronously if it is small or move it to a background workflow if it is expensive.

## Always pass cancellation tokens

Asynchronous code becomes more useful when it is cancellable. In web apps, cancellation means the server can stop spending resources on abandoned work.

```csharp
public Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken ct)
{
    return _db.Orders
        .Where(x => x.Id == id)
        .Select(x => new OrderDto(x.Id, x.Number))
        .SingleOrDefaultAsync(ct);
}
```

If your top-level handler receives a `CancellationToken`, pass it through database and HTTP calls by default.

## Be careful with parallel awaits

Running independent async operations in parallel can be a good optimization:

```csharp
var customerTask = _customers.GetAsync(customerId, ct);
var pricingTask = _pricing.GetAsync(productIds, ct);

await Task.WhenAll(customerTask, pricingTask);
```

But parallelism should be intentional. If both tasks hit the same constrained resource, you may increase latency rather than reduce it. It is also easy to lose good error handling if you parallelize everything without thinking about failure modes.

## Prefer clear lifetimes over fire-and-forget

Fire-and-forget tasks inside request flows are risky. Exceptions can go unobserved, shutdown becomes messy, and work may continue long after the request is gone. If something must happen after the request, move it into:

- a queue-backed background worker
- a hosted service
- a durable messaging workflow

That creates an owned place for retries, logging, and monitoring.

## Keep async APIs honest

Do not mark a method `async` if it never awaits anything meaningful. Likewise, avoid returning `Task` from methods that do purely synchronous work unless you have a specific abstraction reason.

Honest APIs make code review easier. When a method is async, readers should assume it may yield, be cancelled, and fail asynchronously.

## Consistency beats cleverness

Most .NET teams do well with a few simple rules:

- never block on async code
- use async for I/O boundaries
- pass cancellation tokens
- avoid fire-and-forget inside request handling
- parallelize only independent work with clear limits

`async` and `await` are at their best when they disappear into the background. If the flow is still easy to read and the app wastes fewer threads under load, you are using them well.
