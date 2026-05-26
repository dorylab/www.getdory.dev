---
title: "Introducing Organization-Level BYOK for AI in Dory"
description: "Dory now supports organization-level BYOK for AI, so teams can choose their own provider, model, and endpoint while keeping a system provider as fallback."
category: "AI Providers"
ogVariant: "ai-providers"
---

# Introducing Organization-Level BYOK for AI in Dory

Dory now supports organization-level BYOK for AI.

Teams can configure an AI provider for a specific organization, choose the model they want to use, and route Dory's AI workflows through their own provider credentials. The system provider remains available as a fallback, so admins can give each organization more control without losing a server-managed default.

This matters for teams that use Dory across different environments, customers, departments, or compliance boundaries. One organization may want OpenAI, another may use Anthropic, another may route through OpenRouter, and another may point Dory at an OpenAI-compatible local endpoint. Dory can now model that at the organization level.

## Why Organization-Level BYOK Matters

AI is becoming part of the normal database workflow. People ask AI to write SQL, fix failed queries, explain schema, summarize results, and help them move from a question to a usable query.

But AI configuration is rarely one-size-fits-all.

Some teams already have approved provider accounts. Some have regional provider requirements. Some run through an internal gateway. Some want to use a local or self-hosted model behind an OpenAI-compatible API. Some organizations in the same Dory workspace may need different providers entirely.

Before organization-level BYOK, AI configuration was primarily server-managed. That is useful for a simple default, but it is too coarse for teams that need per-organization control.

Now Dory supports a cleaner model:

- A **System Provider** can be configured globally by the server administrator.
- An **Organization Provider** can override that default for a specific organization.
- A **Fallback** remains visible when an organization provider is active.

That gives teams control where they need it, while preserving a stable system-level baseline.

## What You Can Configure

Organization admins can add AI providers from the AI settings page.

For each organization provider, Dory supports:

- Provider selection
- Default model
- Base URL
- API key
- Provider testing before saving
- Default-provider selection
- Enable, disable, edit, and delete flows

The organization provider becomes active only when it is enabled, configured, and allowed by the current plan or license. If the organization provider is disabled, incomplete, or unavailable for the current entitlement, Dory falls back to the system provider.

## Supported Providers

Dory's organization-level BYOK flow supports the providers teams commonly ask for:

- OpenAI
- Anthropic
- Azure OpenAI
- OpenRouter
- Google Gemini
- Qwen
- xAI
- Meta
- OpenAI Compatible

The OpenAI Compatible option is important for teams using local models, internal gateways, or hosted inference services that expose an OpenAI-style API. For this provider, the Base URL is required and the API key can be optional, depending on the endpoint.

## Built for Real Team Boundaries

Organization-level BYOK is designed for multi-organization workspaces.

Instead of treating AI as a single global switch, Dory can now reflect how teams actually operate:

- A customer-facing organization can use its approved provider.
- A data team can test a different model without changing every organization.
- A self-hosted deployment can keep a system provider while allowing selected organizations to override it.
- A local or private model can be configured through an OpenAI-compatible endpoint.

This is especially useful when Dory is used by teams with different budgets, data policies, latency needs, or provider preferences.

## Safer Defaults, Clearer Fallbacks

The organization provider is an override, not a destructive replacement for the system provider.

When an organization provider is active, Dory still shows the system provider as the fallback. If the organization provider is later disabled or no longer configured correctly, AI execution can return to the global provider instead of leaving the organization in an unclear state.

Saved organization provider records can also remain available for later reuse. Switching back to the system provider does not need to erase the provider details an admin may want to use again.

## Direct Provider Execution

When an organization provider is active, Dory routes AI execution through that provider and model instead of sending the request through the cloud proxy path used for system-managed cloud AI.

That makes organization-level BYOK useful for teams that want AI behavior to follow their own provider setup: their endpoint, their model, and their provider account.

## Availability

Organization-level BYOK is available where organization AI provider management is enabled:

- Dory Pro for cloud-plan based environments
- Dory Enterprise for self-hosted license based environments

Organizations without access can still see the current system provider state, but editing organization providers requires the matching plan or license.

## How to Start

To configure organization-level BYOK:

1. Open Dory.
2. Go to the organization's Settings.
3. Open AI.
4. Add an Organization Provider.
5. Choose a provider and model.
6. Enter the Base URL and API key when required.
7. Test the provider.
8. Save it and set it as the default for the organization.

Once active, Dory's AI features use the organization provider for that organization. The global system provider remains available as the fallback.

## What's Next

Organization-level BYOK is part of Dory's broader direction: making AI useful inside real data workflows without forcing every team into the same provider setup.

Database teams need AI that understands their schema, SQL dialect, query errors, and result context. They also need provider control that matches how their organization actually works.

With organization-level BYOK, Dory can support both.
