# TypeScript SDK integration

This is the minimal server-side TypeScript path for calling the hosted Reflex API through the shared Brida SDK.

```bash
pnpm add @brida/sdk
export BRIDA_API_KEY='...'
```

Then run `index.ts` with an ESM-capable TypeScript runtime or compile it for Node.js 22+.

The root package is the **Brida platform SDK**. Reflex is exposed as the `brida.reflex` product namespace; future Brida products join the same root client rather than requiring a second base SDK.

## Security and authority

- Keep `BRIDA_API_KEY` in trusted server-side code only.
- The example uses synthetic, non-sensitive state.
- A Reflex result is recommendation-only and does not authorize a worker wake-up or any other protected side effect.
- The application must keep deterministic authorization, idempotency and side-effect execution outside Reflex.

For recipes, Custom Reflex definitions and broader use cases, use the surrounding `brida-ai/reflex` repository. For SDK transport/types/release details, use `brida-ai/sdk`.
