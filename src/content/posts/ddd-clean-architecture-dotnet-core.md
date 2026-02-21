---
title: "Domain-Driven Design and Clean Architecture in .NET Core"
date: 2025-02-20
excerpt: "A deep dive into DDD tactical patterns, Clean Architecture layers, and how to implement them in .NET Core with a clear dependency rule."
---

Building maintainable .NET Core applications often comes down to how we structure the problem space and the code. **Domain-Driven Design (DDD)** and **Clean Architecture** give us a shared vocabulary and a clear place for every concern. This post goes into the tactical patterns, the dependency rule, and a concrete way to map them onto a .NET Core solution.

## Why DDD and Clean Architecture together?

DDD focuses on the **domain**: the part of the world your software models. It emphasises a **ubiquitous language** shared with stakeholders, **bounded contexts** so that the same word in different contexts can mean different things, and **tactical patterns** — entities, value objects, aggregates, domain events, and domain services — to express that language in code. Clean Architecture focuses on **dependencies**: the domain sits at the centre; infrastructure, UI, and frameworks depend on it, never the other way around. So the domain never references a database, an HTTP client, or a framework. That keeps business logic testable in isolation and stable when you change delivery mechanisms or persistence.

Together: DDD tells you *what* to put in the centre (the domain model and its boundaries); Clean Architecture tells you *how* to keep that centre independent (the dependency rule and layers).

## The dependency rule and layers

The core idea of Clean Architecture is the **dependency rule**: source code dependencies point only inward. The innermost layer is the **Domain**. The next layer is the **Application** (use cases, application services, ports). The outer layers are **Infrastructure** (persistence, messaging, external APIs) and **Presentation** (API, UI). Nothing in Domain references Application or Infrastructure. Application references only Domain and declares interfaces (ports) for things it needs — e.g. `IOrderRepository`, `IUnitOfWork` — and Infrastructure implements those interfaces (adapters). The API project references Application and Infrastructure only to wire them up; it does not contain business logic.

In .NET Core this translates to project references: **Domain** has no project references. **Application** references Domain only. **Infrastructure** and **Api** reference Application (and optionally Domain if you need to use domain types in API contracts). Infrastructure implements interfaces defined in Application.

## DDD tactical patterns in the Domain project

**Entities** have identity that persists over time (e.g. `Order`, `Customer`). Two entities with the same id are considered the same even if other attributes differ. **Value objects** have no identity; they are defined by their attributes (e.g. `Money`, `Address`). Use value objects for concepts that are interchangeable when their fields match and that carry no lifecycle of their own.

**Aggregates** are clusters of entities and value objects with a single **aggregate root**. External code holds references only to the root; changes to the aggregate go through the root so that invariants are enforced in one place. The aggregate root is also the boundary for persistence: you load and save the whole aggregate. Designing small, consistent aggregates reduces contention and keeps the domain model easier to reason about.

**Domain events** represent something that happened in the domain (e.g. `OrderPlaced`). The aggregate raises them after a state change. Application or Infrastructure code can subscribe and trigger side effects (e.g. sending an email, updating a read model) without the domain depending on those details. In .NET you can collect events on the aggregate and dispatch them after the unit of work completes.

**Domain services** are operations that don’t naturally belong to a single entity or value object (e.g. “transfer money between two accounts”). They are stateless and work with domain types only.

## A concrete .NET Core solution layout

```
MyProduct.sln
├── MyProduct.Domain
│   ├── Entities/           # Order, Customer (aggregate roots and entities)
│   ├── ValueObjects/      # Money, Address
│   ├── Events/            # OrderPlaced, PaymentReceived
│   └── Services/          # IDomainService interfaces, implementations
├── MyProduct.Application
│   ├── Ports/             # IOrderRepository, IUnitOfWork, IEmailSender
│   ├── UseCases/          # or Commands/Queries if you use CQRS
│   ├── DTOs/              # Input/output for use cases
│   └── Exceptions/        # Domain or application exceptions
├── MyProduct.Infrastructure
│   ├── Persistence/       # EF Core, repositories
│   ├── Messaging/         # Domain event handlers, external queues
│   └── ExternalServices/ # HTTP clients, adapters
└── MyProduct.Api
    ├── Controllers/
    ├── Middleware/
    └── Program.cs         # Composition root: register Application + Infrastructure
```

The **Domain** holds only C# types and logic that depend on nothing outside the domain. No attributes from EF Core or ASP.NET in the Domain project. The **Application** layer defines use cases: they orchestrate the domain (load aggregate, call methods, raise events) and use ports for persistence and side effects. **Infrastructure** implements those ports with EF Core, HTTP clients, etc. The **Api** project is thin: it maps HTTP to application calls and registers dependencies.

## Implementing the Domain layer

Keep constructors and factory methods on the aggregate root so that invalid state is impossible to create. Enforce invariants in the root’s methods and reject invalid operations there.

```csharp
// Domain/Entities/Order.cs (simplified)
public sealed class Order : Entity
{
    private readonly List<OrderLine> _lines = new();
    public IReadOnlyList<OrderLine> Lines => _lines;
    public OrderStatus Status { get; private set; }

    private Order() { } // EF or deserialization

    public static Result<Order> Create(CustomerId customerId, IReadOnlyList<OrderLineRequest> lines)
    {
        if (lines?.Count == 0)
            return Result.Fail<Order>("Order must have at least one line.");
        var order = new Order();
        foreach (var line in lines)
            order._lines.Add(OrderLine.Create(line.ProductId, line.Quantity, line.UnitPrice));
        order.Raise(new OrderPlaced(order.Id, customerId));
        return order;
    }

    public Result Cancel()
    {
        if (Status != OrderStatus.Pending)
            return Result.Fail("Only pending orders can be cancelled.");
        Status = OrderStatus.Cancelled;
        Raise(new OrderCancelled(Id));
        return Result.Ok();
    }
}
```

Value objects are immutable; use records in modern C# for equality by value.

## Implementing the Application layer

Use cases load aggregates through repository interfaces, call domain methods, and persist. They do not contain business rules; they orchestrate.

```csharp
// Application/UseCases/CancelOrder.cs
public class CancelOrderHandler
{
    private readonly IOrderRepository _orders;
    private readonly IUnitOfWork _uow;

    public async Task<Result> Handle(CancelOrderRequest request, CancellationToken ct)
    {
        var order = await _orders.GetByIdAsync(request.OrderId, ct);
        if (order is null) return Result.Fail("Order not found.");
        var result = order.Cancel();
        if (result.IsFailure) return result;
        await _uow.CommitAsync(ct); // also dispatches domain events if you do it there
        return Result.Ok();
    }
}
```

Interfaces like `IOrderRepository` and `IUnitOfWork` live in Application; their implementations live in Infrastructure. The API only references Application and Infrastructure to register and resolve these types.

## Validation and cross-cutting concerns

Input validation (e.g. “order id must be a valid guid”) can live in the API or in the Application layer as a pipeline step or validator. Domain validation is different: it enforces invariants (e.g. “cannot cancel a shipped order”) and belongs in the domain. Keep the domain focused on business rules and use the application layer to coordinate and validate use-case-level input.

With this structure, the domain and application layers stay free of framework and infrastructure details. You can test use cases with in-memory implementations of repositories and add new delivery mechanisms or swap persistence without touching the core. In the next post we’ll look at **CQRS** and how to separate reads from writes in this same layout.
