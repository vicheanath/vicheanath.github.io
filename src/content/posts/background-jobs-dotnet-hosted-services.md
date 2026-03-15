---
title: "Background Jobs in .NET with Hosted Services"
date: 2025-03-06
excerpt: "How to implement background processing in .NET with hosted services without turning your web app into an unreliable job runner."
---

Background work shows up quickly in real systems: sending email, syncing data, generating reports, cleaning expired records, or processing queue messages. .NET gives us `IHostedService` and `BackgroundService` to handle this, but the hard part is not starting a loop. The hard part is owning execution, retries, shutdown, and visibility.

## Know when hosted services are enough

Hosted services work well when:

- the workload lives in the same deployment unit as the app
- throughput is moderate
- restart and retry requirements are simple
- the team wants minimal infrastructure

They are less ideal when job execution must be highly durable, horizontally distributed, or independently scaled. In that case, a queue-backed worker or dedicated job platform is usually safer.

## Prefer queue-based background work over fire-and-forget

Inside a request handler, it is tempting to do this:

```csharp
_ = Task.Run(() => _emailSender.SendAsync(message));
```

That code has no real lifecycle management. Exceptions can be lost, retries are unclear, and the task may be abandoned during shutdown. A better pattern is to enqueue work and let a hosted background worker process it.

## A simple channel-based worker

For in-process workloads, `System.Threading.Channels` is a solid option:

```csharp
public sealed class EmailQueue
{
    private readonly Channel<EmailMessage> _channel = Channel.CreateUnbounded<EmailMessage>();

    public ValueTask QueueAsync(EmailMessage message, CancellationToken ct) =>
        _channel.Writer.WriteAsync(message, ct);

    public IAsyncEnumerable<EmailMessage> ReadAllAsync(CancellationToken ct) =>
        _channel.Reader.ReadAllAsync(ct);
}
```

Then a background service can consume queued work in one place with consistent logging and error handling.

## Build for shutdown

Good background services stop cleanly. That means:

- observe the provided cancellation token
- finish or abandon work intentionally
- avoid blocking shutdown with unbounded retries
- log what happened to in-flight items

Teams often discover shutdown bugs only during deployment, which is exactly when predictable behavior matters.

## Separate scheduling from work execution

A background service should usually coordinate work, not contain all the business logic inline. Keep the processing logic in a dedicated service or handler so that:

- it can be unit tested
- the same logic can be reused elsewhere
- retry rules are easier to centralize

This also keeps the background loop small and readable.

## Retries need policy, not hope

When a job fails, decide what type of failure it is:

- transient: network timeout, temporary downstream issue
- permanent: invalid input, missing required data

Transient failures may deserve limited retries with backoff. Permanent failures should be recorded and moved aside quickly. Retrying everything forever is how background systems quietly clog themselves.

## Add visibility from day one

At minimum, log:

- when work is queued
- when processing starts
- when it succeeds
- when it fails
- how many retries happened

Metrics help even more. Queue depth, processing time, and failure rate give you early warning before users notice stale data or missing emails.

## Choose the simplest durable option that fits

Hosted services are a good tool, especially for internal workflows and moderate workloads. Just treat them like production infrastructure, not a side note. Queue the work, define retry behavior, respect shutdown, and make execution observable.

That is usually the difference between "we have background jobs" and "we can trust our background jobs."
