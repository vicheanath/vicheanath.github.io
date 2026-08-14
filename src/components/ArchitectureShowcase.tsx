import React, { useState, useRef, useEffect } from 'react';
import { Play, CheckCircle2, Cpu, Database, Globe, Zap, ArrowRight, ShieldCheck, RefreshCw, Layers, GitBranch } from 'lucide-react';
import gsap from 'gsap';

type ArchTab = 'cqrs-command' | 'query-cache' | 'efcore-outbox';

interface Step {
  id: number;
  title: string;
  tech: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
}

export default function ArchitectureShowcase() {
  const [activeTab, setActiveTab] = useState<ArchTab>('cqrs-command');
  const [simulating, setSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const flows: Record<ArchTab, { label: string; badge: string; steps: Step[]; initialLog: string; telemetryLogs: string[] }> = {
    'cqrs-command': {
      label: '1. DDD & CQRS Command Flow',
      badge: 'HTTP 201 · 24ms · Atomic Transaction',
      initialLog: '[00:00.000] React Client: useCreateOrderMutation.mutateAsync() triggered with payload...',
      steps: [
        {
          id: 0,
          title: '1. React Query Client',
          tech: 'TanStack Query v5 + Optimistic UI',
          desc: 'Optimistic cache snapshot in onMutate, Bearer JWT injection, client-side input normalization.',
          icon: <Globe size={20} className="node-icon node-icon--client" />,
          tag: 'Presentation',
        },
        {
          id: 1,
          title: '2. Minimal API & Auth',
          tech: 'ASP.NET Core 9 + Rate Limiter',
          desc: 'JWT validation, rate-limiter bucket (100 req/s), MediatR IPipelineBehavior pre-validation.',
          icon: <ShieldCheck size={20} className="node-icon node-icon--gateway" />,
          tag: 'API Gateway',
        },
        {
          id: 2,
          title: '3. Command Handler & DDD',
          tech: 'MediatR + Order Aggregate Root',
          desc: 'CreateOrderCommandHandler loads aggregate, executes business invariants, and raises OrderCreatedDomainEvent.',
          icon: <Cpu size={20} className="node-icon node-icon--core" />,
          tag: 'Domain Core',
        },
        {
          id: 3,
          title: '4. EF Core & Outbox Commit',
          tech: 'EF Core 9 + SaveChangesInterceptor',
          desc: 'Single ACID transaction writes Order entity + OutboxMessage table. Concurrency token verified.',
          icon: <Database size={20} className="node-icon node-icon--data" />,
          tag: 'Persistence',
        },
        {
          id: 4,
          title: '5. Outbox Event Dispatch',
          tech: 'Azure Service Bus / RabbitMQ Worker',
          desc: 'HTTP 201 Created returned. Background Outbox Worker publishes domain events to subscribers.',
          icon: <Zap size={20} className="node-icon node-icon--cloud" />,
          tag: 'Eventual Consistency',
        },
      ],
      telemetryLogs: [
        '[00:00.004] ASP.NET Core: JWT validated. FluentValidation passed (CreateOrderCommandValidator).',
        '[00:00.010] Domain Layer: Order.Create() aggregate initialized; invariants valid; OrderCreatedDomainEvent raised.',
        '[00:00.018] EF Core 9: Transaction committed (Orders + OutboxMessages tables updated in 1 ACID roundtrip).',
        '[00:00.024] HTTP 201 Created returned (24ms). React Query warms cache via orderKeys.detail(id).',
      ],
    },
    'query-cache': {
      label: '2. Query Fast-Path & React Query',
      badge: 'HTTP 200 · 8ms · Direct DTO Projection',
      initialLog: '[00:00.000] TanStack Query: Evaluating useOrderDetailsQuery("ord_9f82d1c7")...',
      steps: [
        {
          id: 0,
          title: '1. Query Key Lookup',
          tech: 'orderKeys.detail(orderId)',
          desc: 'Query client checks in-memory cache. If fresh (< 5min staleTime), returns instant memory data.',
          icon: <Globe size={20} className="node-icon node-icon--client" />,
          tag: 'Query Cache',
        },
        {
          id: 1,
          title: '2. API Fast-Path',
          tech: 'HTTP GET /api/v1/orders/{id}',
          desc: 'Lightweight Minimal API endpoint maps request directly to GetOrderDetailsQuery via MediatR.',
          icon: <ShieldCheck size={20} className="node-icon node-icon--gateway" />,
          tag: 'Read Gateway',
        },
        {
          id: 2,
          title: '3. CQRS Query Handler',
          tech: 'GetOrderDetailsQueryHandler',
          desc: 'Bypasses Domain Aggregate and repository overhead; directly queries DbContext read context.',
          icon: <GitBranch size={20} className="node-icon node-icon--core" />,
          tag: 'Asymmetric Read',
        },
        {
          id: 3,
          title: '4. EF Core AsNoTracking',
          tech: 'EF Core 9 Direct Projection',
          desc: 'Single SELECT query projected directly into OrderDetailsResponse record with zero change tracking.',
          icon: <Database size={20} className="node-icon node-icon--data" />,
          tag: 'Data Stream',
        },
        {
          id: 4,
          title: '5. SWR Client Hydration',
          tech: 'RFC 7807 + Stale-While-Revalidate',
          desc: 'Client state seamlessly updated. Memory footprint < 10KB. Instant sub-10ms UI render.',
          icon: <Zap size={20} className="node-icon node-icon--cloud" />,
          tag: 'Client Sync',
        },
      ],
      telemetryLogs: [
        '[00:00.001] Client: Cache miss on orderKeys.detail("ord_9f82d1c7"); fetching from server...',
        '[00:00.003] ASP.NET Core: Direct MediatR dispatch to GetOrderDetailsQueryHandler.',
        '[00:00.006] EF Core: Executed AsNoTracking().Select() with index seek on IX_Orders_Id (2.1ms).',
        '[00:00.008] HTTP 200 OK (8ms). TanStack Query cache updated and subscribed UI re-rendered.',
      ],
    },
    'efcore-outbox': {
      label: '3. EF Core Persistence & Outbox',
      badge: 'Zero Event Loss · Complex Types · ACID',
      initialLog: '[00:00.000] SaveChangesAsync: ChangeTracker intercepted with uncommitted domain events...',
      steps: [
        {
          id: 0,
          title: '1. Domain Aggregate State',
          tech: 'Order Aggregate + Money Value Object',
          desc: 'Encapsulated entity modified via domain methods. Private backing fields protect internal collections.',
          icon: <Cpu size={20} className="node-icon node-icon--core" />,
          tag: 'Domain Invariants',
        },
        {
          id: 1,
          title: '2. SaveChanges Interceptor',
          tech: 'ConvertDomainEventsToOutboxInterceptor',
          desc: 'Intercepts saving process, extracts IDomainEvent list, and converts to JSON OutboxMessage records.',
          icon: <Layers size={20} className="node-icon node-icon--gateway" />,
          tag: 'Interceptor',
        },
        {
          id: 2,
          title: '3. EF Core Complex Mapping',
          tech: 'EF Core 9 ComplexProperty & RowVersion',
          desc: 'Maps Money value object columns (Amount + Currency) and verifies optimistic concurrency token.',
          icon: <Database size={20} className="node-icon node-icon--data" />,
          tag: 'EF Core Mapping',
        },
        {
          id: 3,
          title: '4. ACID DB Transaction',
          tech: 'SQL Server / PostgreSQL Transaction',
          desc: 'Orders, OrderItems, and OutboxMessages tables committed atomically in one database trip.',
          icon: <ShieldCheck size={20} className="node-icon node-icon--data" />,
          tag: 'ACID Boundary',
        },
        {
          id: 4,
          title: '5. Outbox Background Consumer',
          tech: 'Quartz.NET / Azure Worker Service',
          desc: 'Polls unread OutboxMessages, publishes to message broker, and marks ProcessedOnUtc.',
          icon: <Zap size={20} className="node-icon node-icon--cloud" />,
          tag: 'Reliable Messaging',
        },
      ],
      telemetryLogs: [
        '[00:00.003] Interceptor: Collected 2 uncommitted events (OrderCreatedDomainEvent, OrderSubmittedDomainEvent).',
        '[00:00.008] EF Core: Serialized domain events into OutboxMessage table payloads.',
        '[00:00.015] SQL Server: BEGIN TRANSACTION -> INSERT Orders, OrderItems, OutboxMessages -> COMMIT.',
        '[00:00.021] Background Worker: Outbox batch of 1 message published to Azure Service Bus topic.',
      ],
    },
  };

  const currentFlow = flows[activeTab];

  const handleSimulate = () => {
    if (simulating) return;
    setSimulating(true);
    setActiveStep(0);
    setLogs([currentFlow.initialLog]);

    if (diagramRef.current) {
      gsap.fromTo(
        '.arch-node--active',
        { scale: 1 },
        { scale: 1.03, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    }

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < currentFlow.steps.length) {
        setActiveStep(step);
        const logIndex = step - 1;
        if (currentFlow.telemetryLogs[logIndex]) {
          setLogs((prev) => [...prev, currentFlow.telemetryLogs[logIndex]]);
        }
      } else {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 650);
  };

  // Scroll-triggered entrance for the entire Architecture section
  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            container.querySelectorAll('.section-header, .arch-tabs, .arch-card'),
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

  useEffect(() => {
    setActiveStep(-1);
    setLogs([]);
    setSimulating(false);

    if (typeof window === 'undefined' || !diagramRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.arch-node',
        { scale: 0.96, opacity: 0, y: 12 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'opacity,transform' }
      );
    }, diagramRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section className="arch-section" id="architecture" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <Cpu size={14} aria-hidden />
          <span>Full-Stack Architecture &amp; Patterns</span>
        </div>
        <h2 className="section-title">
          Clean Production with <span className="text-highlight">DDD, CQRS, EF Core &amp; React Query</span>
        </h2>
        <p className="section-subtitle">
          Explore how enterprise systems handle decoupled domain business logic, high-throughput asynchronous persistence, and optimistic frontend cache synchronization.
        </p>
      </div>

      <div className="arch-tabs" role="tablist" aria-label="Architecture view tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'cqrs-command'}
          className={`arch-tab ${activeTab === 'cqrs-command' ? 'arch-tab--active' : ''}`}
          onClick={() => setActiveTab('cqrs-command')}
        >
          <Cpu size={16} aria-hidden />
          <span>DDD &amp; CQRS Command Flow</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'query-cache'}
          className={`arch-tab ${activeTab === 'query-cache' ? 'arch-tab--active' : ''}`}
          onClick={() => setActiveTab('query-cache')}
        >
          <Globe size={16} aria-hidden />
          <span>Query Fast-Path &amp; React Query</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'efcore-outbox'}
          className={`arch-tab ${activeTab === 'efcore-outbox' ? 'arch-tab--active' : ''}`}
          onClick={() => setActiveTab('efcore-outbox')}
        >
          <Database size={16} aria-hidden />
          <span>EF Core 9 &amp; Outbox Pattern</span>
        </button>
      </div>

      <div className="arch-container" ref={diagramRef}>
        <div className="arch-control-bar">
          <div className="arch-control-info">
            <span className="arch-status-dot" />
            <span>{currentFlow.label}</span>
          </div>
          <button
            type="button"
            className="btn btn--sm btn--primary"
            onClick={handleSimulate}
            disabled={simulating}
            aria-label="Simulate Live Request Flow"
          >
            {simulating ? (
              <>
                <RefreshCw size={14} className="spin-icon" aria-hidden />
                <span>Simulating (Step {activeStep + 1}/{currentFlow.steps.length})...</span>
              </>
            ) : (
              <>
                <Play size={14} aria-hidden />
                <span>Simulate Flow ▶</span>
              </>
            )}
          </button>
        </div>

        <div className="arch-flow">
          {currentFlow.steps.map((s, idx) => (
            <div
              key={s.id}
              className={`arch-node ${activeStep === idx ? 'arch-node--active' : ''} ${
                activeStep > idx ? 'arch-node--completed' : ''
              }`}
            >
              <div className="arch-node__header">
                <div className="arch-node__icon-wrap">{s.icon}</div>
                <div className="arch-node__meta">
                  <span className="arch-node__tag">{s.tag}</span>
                  <h3 className="arch-node__title">{s.title}</h3>
                </div>
                {activeStep > idx && (
                  <CheckCircle2 size={16} className="arch-node__check" aria-label="Completed" />
                )}
              </div>
              <div className="arch-node__tech">{s.tech}</div>
              <p className="arch-node__desc">{s.desc}</p>
              {idx < currentFlow.steps.length - 1 && (
                <div className="arch-connector" aria-hidden="true">
                  <ArrowRight size={16} className="arch-connector__icon" />
                </div>
              )}
            </div>
          ))}
        </div>

        {logs.length > 0 && (
          <div className="arch-telemetry">
            <div className="arch-telemetry__header">
              <span className="arch-telemetry__title">Telemetry Stream &amp; Diagnostics</span>
              <span className="arch-telemetry__badge">{currentFlow.badge}</span>
            </div>
            <div className="arch-telemetry__logs">
              {logs.map((log, i) => (
                <div key={i} className="arch-telemetry__line">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="arch-highlights-grid">
        <div className="arch-card">
          <div className="arch-card__icon-box">
            <Cpu size={22} />
          </div>
          <h4 className="arch-card__title">Domain-Driven Invariants</h4>
          <p className="arch-card__text">
            Encapsulated Aggregate Roots (`Order`) guard business rules with strongly typed IDs and Value Objects (`Money`). Domain events are captured inside aggregates without premature dispatch.
          </p>
        </div>
        <div className="arch-card">
          <div className="arch-card__icon-box">
            <Database size={22} />
          </div>
          <h4 className="arch-card__title">Transactional Outbox with EF Core 9</h4>
          <p className="arch-card__text">
            `SaveChangesInterceptor` atomically persists Domain Events into an Outbox table alongside business state changes, guaranteeing At-Least-Once Delivery with zero distributed dual-write bugs.
          </p>
        </div>
        <div className="arch-card">
          <div className="arch-card__icon-box">
            <Globe size={22} />
          </div>
          <h4 className="arch-card__title">React Query v5 &amp; CQRS Asymmetry</h4>
          <p className="arch-card__text">
            Query Key Factories govern caching, while mutations leverage `onMutate` optimistic rollbacks. Read queries bypass domain entities to execute fast `AsNoTracking` DTO projections.
          </p>
        </div>
      </div>
    </section>
  );
}

