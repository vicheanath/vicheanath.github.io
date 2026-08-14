import { useState, useRef, useEffect } from 'react';
import { Play, Check, Terminal, Cpu, Braces, Clock, HardDrive, Copy, Layers, Database } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gsap from 'gsap';

type SnippetKey = 'ddd' | 'cqrs' | 'efcore' | 'reactquery';

export default function InteractivePlayground() {
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetKey>('ddd');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);

  const snippets = {
    ddd: {
      title: 'Domain Aggregate Root & Value Objects (C# 13 / .NET 9)',
      lang: 'csharp',
      code: `// Domain/Orders/Order.cs - Pure DDD Invariants & Domain Events
public sealed class Order : AggregateRoot<OrderId>
{
    private readonly List<OrderItem> _items = [];
    public Guid CustomerId { get; private set; }
    public OrderStatus Status { get; private set; }
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    private Order() { } // EF Core reflection

    public static Order Create(Guid customerId)
    {
        var order = new Order(OrderId.New(), customerId);
        order.RaiseDomainEvent(new OrderCreatedDomainEvent(Guid.NewGuid(), order.Id, customerId));
        return order;
    }

    public Result AddItem(Guid productId, int quantity, Money unitPrice)
    {
        if (Status != OrderStatus.Draft)
            return Result.Failure(new Error("Order.NotModifiable", "Cannot edit locked order."));

        if (quantity <= 0)
            return Result.Failure(new Error("Order.InvalidQty", "Quantity must be > 0."));

        _items.Add(new OrderItem(Guid.NewGuid(), productId, quantity, unitPrice));
        return Result.Success();
    }

    public Money TotalAmount => _items.Count == 0 
        ? Money.Zero("USD") 
        : _items.Select(i => i.TotalPrice).Aggregate((a, b) => (a + b).Value);
}`,
      output: {
        status: 'Domain Invariants Validated (0 Violations)',
        latency: '0.04ms (In-Memory)',
        memory: '1.2 KB heap',
        json: `{
  "aggregateRoot": "Domain.Orders.Order",
  "aggregateId": "ord_9f82d1c7",
  "status": "Draft -> Submitted",
  "invariantsGuarded": [
    "Quantity > 0 (Passed)",
    "Status == Draft for mutations (Passed)",
    "Currency match ISO-4217 (Passed)"
  ],
  "uncommittedDomainEvents": [
    {
      "eventType": "Domain.Orders.OrderCreatedDomainEvent",
      "eventId": "evt_4bf92f35",
      "occurredOnUtc": "${new Date().toISOString()}"
    }
  ]
}`,
      },
    },
    cqrs: {
      title: 'CQRS Command Handler with Railway-Oriented Result Pattern',
      lang: 'csharp',
      code: `// Application/Orders/Commands/CreateOrder/CreateOrderCommandHandler.cs
public sealed class CreateOrderCommandHandler(
    IOrderRepository orderRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateOrderCommand, Result<Guid>>
{
    public async Task<Result<Guid>> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        var order = Order.Create(request.CustomerId);

        foreach (var item in request.Items)
        {
            var moneyResult = Money.Create(item.UnitPrice, item.Currency);
            if (moneyResult.IsFailure)
                return Result<Guid>.Failure(moneyResult.Error);

            var addResult = order.AddItem(item.ProductId, item.Quantity, moneyResult.Value);
            if (addResult.IsFailure)
                return Result<Guid>.Failure(addResult.Error);
        }

        var submitResult = order.Submit();
        if (submitResult.IsFailure)
            return Result<Guid>.Failure(submitResult.Error);

        await orderRepository.AddAsync(order, ct);
        await unitOfWork.SaveChangesAsync(ct);

        return Result<Guid>.Success(order.Id.Value);
    }
}`,
      output: {
        status: '201 Created (MediatR Pipeline OK)',
        latency: '16.4ms',
        memory: '12.8 KB alloc',
        json: `{
  "command": "CreateOrderCommand",
  "pipelineBehaviors": [
    "LoggingBehavior (0.2ms)",
    "ValidationBehavior (FluentValidation passed)",
    "UnitOfWorkTransactionBehavior"
  ],
  "result": {
    "isSuccess": true,
    "orderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  "httpMapping": "Results.Created('/api/v1/orders/3fa85f64-...')"
}`,
      },
    },
    efcore: {
      title: 'EF Core 9 Complex Types & Outbox Interceptor',
      lang: 'csharp',
      code: `// Infrastructure/Persistence/Configurations/OrderConfiguration.cs
public sealed class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.ToTable("Orders");
        builder.HasKey(o => o.Id);

        // Strongly Typed ID Value Conversion
        builder.Property(o => o.Id)
            .HasConversion(id => id.Value, val => OrderId.From(val))
            .ValueGeneratedNever();

        builder.Property(o => o.Version).IsRowVersion(); // Concurrency token

        // Encapsulate backing field navigation
        builder.HasMany(o => o.Items)
            .WithOne()
            .HasForeignKey("OrderId")
            .OnDelete(DeleteBehavior.Cascade);

        builder.Metadata.FindNavigation(nameof(Order.Items))!
            .SetPropertyAccessMode(PropertyAccessMode.Field);

        builder.Ignore(o => o.DomainEvents);
    }
}`,
      output: {
        status: 'Atomic Transaction Committed (2 Tables)',
        latency: '3.8ms SQL Execution',
        memory: '8.4 KB alloc',
        json: `{
  "database": "Microsoft SQL Server 2022 / PostgreSQL 17",
  "sqlExecutionPlan": "Clustered Index Insert on [Orders], [OrderItems], [OutboxMessages]",
  "transactions": {
    "isolationLevel": "ReadCommitted",
    "atomicWrites": 3,
    "outboxMessagesStored": 1
  },
  "outboxStatus": "Pending dispatch to Azure Service Bus"
}`,
      },
    },
    reactquery: {
      title: 'TanStack React Query v5 Optimistic Mutation Hook',
      lang: 'typescript',
      code: `// features/orders/hooks/useCreateOrder.ts - Type-Safe Key Factory & Optimistic UI
export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation<OrderResponse, ApiProblemDetails, CreateOrderPayload>({
    mutationFn: orderApi.create,
    onMutate: async (newOrder) => {
      // 1. Cancel in-flight queries
      await queryClient.cancelQueries({ queryKey: orderKeys.lists() });
      const previousOrders = queryClient.getQueryData<OrderResponse[]>(orderKeys.lists());

      // 2. Optimistically update cache with instant response
      queryClient.setQueryData(orderKeys.lists(), (old = []) => [
        { ...newOrder, id: 'temp-' + Date.now(), status: 'Submitted' },
        ...old,
      ]);

      return { previousOrders };
    },
    onError: (_err, _vars, context) => {
      // 3. Rollback cache on server failure
      if (context?.previousOrders) {
        queryClient.setQueryData(orderKeys.lists(), context.previousOrders);
      }
    },
    onSettled: () => {
      // 4. Invalidate to sync server truth
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
    },
  });
}`,
      output: {
        status: 'Optimistic State Committed (0ms UI Latency)',
        latency: '0.4ms (UI Cache) · 18ms (Server Reconciliation)',
        memory: '0.8 KB alloc',
        json: `{
  "queryKey": ["orders", "list"],
  "optimisticUpdate": "Instant 0ms UI render",
  "serverSync": "201 Created in 18ms",
  "reconciliation": "Clean match on orderId",
  "coreWebVitals": { "INP": "8ms", "CLS": 0.00 }
}`,
      },
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered section reveal
  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            container.querySelectorAll('.section-header, .playground-tabs, .playground-window'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'opacity,transform' }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      if (typeof window !== 'undefined') {
        gsap.fromTo(
          '.playground-output',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,transform' }
        );
      }
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(snippets[selectedSnippet].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = snippets[selectedSnippet];

  return (
    <section className="playground-section" id="playground" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <Terminal size={14} aria-hidden />
          <span>Interactive Code Sandbox</span>
        </div>
        <h2 className="section-title">
          Clean Code &amp; <span className="text-highlight">Production Idioms</span>
        </h2>
        <p className="section-subtitle">
          Inspect how I write clean, resilient, and performant code with DDD Aggregate Roots, CQRS Handlers, EF Core 9 Persistence, and TanStack React Query.
        </p>
      </div>

      <div className="playground-tabs" role="tablist" aria-label="Code snippet selector">
        <button
          type="button"
          role="tab"
          aria-selected={selectedSnippet === 'ddd'}
          className={`playground-tab ${selectedSnippet === 'ddd' ? 'playground-tab--active' : ''}`}
          onClick={() => {
            setSelectedSnippet('ddd');
            setHasRun(false);
          }}
        >
          <Cpu size={15} aria-hidden />
          <span>1. DDD Aggregate &amp; Invariants</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedSnippet === 'cqrs'}
          className={`playground-tab ${selectedSnippet === 'cqrs' ? 'playground-tab--active' : ''}`}
          onClick={() => {
            setSelectedSnippet('cqrs');
            setHasRun(false);
          }}
        >
          <Layers size={15} aria-hidden />
          <span>2. CQRS &amp; Result Pattern</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedSnippet === 'efcore'}
          className={`playground-tab ${selectedSnippet === 'efcore' ? 'playground-tab--active' : ''}`}
          onClick={() => {
            setSelectedSnippet('efcore');
            setHasRun(false);
          }}
        >
          <Database size={15} aria-hidden />
          <span>3. EF Core 9 &amp; Outbox</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={selectedSnippet === 'reactquery'}
          className={`playground-tab ${selectedSnippet === 'reactquery' ? 'playground-tab--active' : ''}`}
          onClick={() => {
            setSelectedSnippet('reactquery');
            setHasRun(false);
          }}
        >
          <Braces size={15} aria-hidden />
          <span>4. React Query v5 Optimistic UI</span>
        </button>
      </div>

      <div className="playground-window">
        <div className="playground-window__header">
          <div className="playground-window__title">
            <span className="playground-window__lang">{current.lang.toUpperCase()}</span>
            <span>{current.title}</span>
          </div>
          <div className="playground-window__controls">
            <button
              type="button"
              className="playground-window__copy-btn"
              onClick={handleCopy}
              title="Copy code"
              aria-label="Copy snippet"
            >
              {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              className="btn btn--sm btn--primary"
              onClick={handleRun}
              disabled={isRunning}
              aria-label="Run Code in Sandbox"
            >
              <Play size={14} className={isRunning ? 'spin-icon' : ''} aria-hidden />
              <span>{isRunning ? 'Executing...' : 'Run Code ▶'}</span>
            </button>
          </div>
        </div>

        <div className="playground-window__editor">
          <SyntaxHighlighter
            style={oneDark}
            language={current.lang}
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '1.25rem',
              borderRadius: 0,
              border: 'none',
              background: '#111015',
              fontSize: '0.86rem',
              lineHeight: 1.65,
            }}
            showLineNumbers={true}
          >
            {current.code}
          </SyntaxHighlighter>
        </div>

        {(hasRun || isRunning) && (
          <div className="playground-output">
            <div className="playground-output__header">
              <div className="playground-output__status">
                <Check size={14} className="text-success" aria-hidden />
                <span>{isRunning ? 'Processing request through pipeline...' : current.output.status}</span>
              </div>
              <div className="playground-output__stats">
                <span className="playground-stat">
                  <Clock size={12} aria-hidden />
                  {current.output.latency}
                </span>
                <span className="playground-stat">
                  <HardDrive size={12} aria-hidden />
                  {current.output.memory}
                </span>
              </div>
            </div>
            {!isRunning && (
              <pre className="playground-output__json">
                <code>{current.output.json}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

