---
title: "CQRS in .NET Core with Clean Architecture"
date: 2025-02-19
excerpt: "A deep dive into CQRS: when to use it, how to implement commands and queries, read models, and how it fits with DDD and Clean Architecture."
---

**CQRS** — Command Query Responsibility Segregation — means splitting the model and the code paths for *writing* (commands) from *reading* (queries). In a .NET Core solution that already follows Clean Architecture and DDD, CQRS fits naturally into the **Application** layer. This post goes deeper: when CQRS pays off, how to structure commands and queries, how to handle read models, and how to keep the domain at the centre.

## When CQRS is worth it

Not every feature needs CQRS. A single model for both reads and writes is simpler and enough for many systems. CQRS becomes useful when:

- **Read and write shapes differ a lot** — e.g. dozens of query screens with different filters and projections vs a few write flows. One domain model forced to serve both often becomes a compromise: either the writes are awkward or the reads are slow and complex.
- **Read scale is much higher than write scale** — you want to optimize reads (denormalized views, caches, read replicas, or even a different store) without complicating the write model or touching the domain.
- **Different consistency requirements** — writes need strong consistency and transactional boundaries; reads can tolerate eventual consistency or stale data in exchange for speed and flexibility.
- **Team or boundary reasons** — different teams own read and write flows, or you are evolving toward event-driven or microservices and want a clear seam.

In those cases, separating commands and queries keeps the domain write-model focused and lets you tailor read paths independently. You can start simple (same database, separate handlers and DTOs) and introduce read models or separate stores later if needed.

## The dependency rule with CQRS

In Clean Architecture, the Application layer holds use cases. With CQRS you split them into:

- **Commands** — actions that change state. They go through the domain (aggregates, domain services), then persistence. They define interfaces (ports) for repositories and units of work; Infrastructure implements them.
- **Queries** — read-only. They often bypass the domain model and hit a repository, a read model, or a dedicated query service. They return DTOs. Query handlers can use the same repository interfaces as commands (e.g. “get order by id for display”) or separate read-only interfaces that map to views or raw SQL.

The domain layer does not know about CQRS. It still exposes aggregates and domain services. The Application layer decides whether a use case is a command (load aggregate, call method, persist) or a query (load data, map to DTO, return). So the dependency rule is unchanged: Domain has no outward dependencies; Application depends on Domain and declares ports; Infrastructure implements ports.

## Structuring commands and handlers

A command is an immutable object (a record in C#) that carries the data needed to perform one write operation. A command handler loads the required aggregates, calls domain methods, and persists. Validation can be done in the handler or in a pipeline (e.g. FluentValidation) before the handler runs.

```csharp
// Application/Commands/CreateOrderCommand.cs
public record CreateOrderCommand(Guid CustomerId, List<OrderLineDto> Lines);

// Application/Commands/CreateOrderCommandHandler.cs
public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Result<OrderId>>
{
    private readonly IOrderRepository _orders;
    private readonly IUnitOfWork _uow;

    public CreateOrderCommandHandler(IOrderRepository orders, IUnitOfWork uow)
    {
        _orders = orders;
        _uow = uow;
    }

    public async Task<Result<OrderId>> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        var result = Order.Create(request.CustomerId, request.Lines);
        if (result.IsFailure) return result;
        var order = result.Value;
        await _orders.Add(order, ct);
        await _uow.CommitAsync(ct); // persist and optionally dispatch domain events
        return order.Id;
    }
}
```

You can use **MediatR** or similar to dispatch commands and queries and add pipelines (logging, validation, transaction). Or you can keep it minimal: an interface `ICommandHandler<TCommand, TResponse>` and manual dispatch from the API. Either way, the handler stays a use case: it orchestrates the domain and ports; it does not contain business rules.

## Structuring queries and read models

A query is also an immutable object that carries the criteria for a read (e.g. order id, customer id, date range). A query handler returns a DTO or a list of DTOs. It does not change state.

```csharp
// Application/Queries/GetOrderByIdQuery.cs
public record GetOrderByIdQuery(Guid OrderId);

// Application/Queries/GetOrderByIdQueryHandler.cs
public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, Result<OrderDto>>
{
    private readonly IOrderReadRepository _readRepo; // or IOrderRepository if same

    public async Task<Result<OrderDto>> Handle(GetOrderByIdQuery request, CancellationToken ct)
    {
        var order = await _readRepo.GetByIdAsync(request.OrderId, ct);
        if (order is null) return Result.Fail<OrderDto>("Order not found.");
        return OrderDto.From(order); // or a dedicated read model type
    }
}
```

For simple cases, the same repository that commands use can expose read methods that return DTOs or domain entities mapped to DTOs in the handler. For more complex scenarios you introduce a **read model**: a dedicated shape optimized for one or more queries (e.g. `OrderSummaryDto`, `OrderDetailView`). That read model can be:

- **Built from the same store** — e.g. a separate set of tables or views that the query handler reads; updated in the same transaction as the write (dual-write) or via domain events (eventual consistency).
- **Built from events** — if you introduce domain events and persistence of events, projectors subscribe to events and update read-model tables or a separate read store. Queries then hit only the read model.

You don’t need event sourcing or message buses to start. A single database with separate command and query handlers and, if needed, a few read-model tables or views is enough. Add event-driven updates or a separate read store when the complexity justifies it.

## Consistency and transactions

Commands usually run in a single transaction: load aggregate, perform operation, persist, commit. Domain events can be dispatched after commit (from the same process or via an outbox) so that read-model updates or side effects run with eventual consistency. Queries read from the same database or from a read model; if the read model is updated asynchronously, queries may return stale data for a short window. For many use cases that’s acceptable; for others you might need to read your own writes (e.g. return the aggregate state immediately after a command) or expose a “consistent read” path that waits for the read model to catch up.

## Testing

Command handlers: unit test by mocking the repository and unit of work; feed a command and assert that the correct domain methods were invoked and that the repository received the expected aggregate. Integration tests run against a real database and assert end-to-end behaviour. Query handlers: test with in-memory or test doubles that return known data and assert the returned DTOs. The domain remains unchanged by CQRS, so existing domain tests stay valid.

## Summary

Using CQRS in .NET Core with Clean Architecture keeps the domain at the centre: commands drive the write model through aggregates and domain services; queries serve the read side with DTOs and optional read models. You can start with a single database and separate handlers, then introduce read models, event-driven updates, or a separate read store as the system evolves. The dependency rule and the place of DDD tactical patterns stay the same; CQRS only organises how the Application layer uses them.
