# @prumo/ui

The Prumo **design system**: the durable, versioned token + component layer over
shadcn/ui (+ Tremor + TanStack Table + Tailwind v4) that every Prumo product build
provisions and the screen-author COMPOSES from — instead of re-authoring dense UI
per screen (which times out → a silent skeleton).

Built ONCE by us as real, engineered, tested, Storybook-reviewed components — not
by the LLM per run. The craft is paid once and reused across every product.

## Architecture — the token contract from the creative bundle

There are two halves of one spine:

1. **prumo-ui owns the CONTRACT** — the var-name *vocabulary* + scale structure +
   safe *defaults* (`src/tokens.css`, typed in `src/tokens.ts`). Components READ
   these names and NOTHING is hardcoded (no literal color/radius/shadow/spacing/
   motion). Defaults let a component render standalone in Storybook.
2. **The creative bundle supplies the VALUES** — per concept: color (#11/59),
   radius+shadow+density (56-finish), type (#11), motion (57). companycouncil's
   build emits them into the product's `:root` CSS vars, which OVERRIDE the
   defaults → the per-concept skin. Same component, warm-vs-sharp per concept.

**ONE canonical token vocabulary (NC-VOCAB-01):** prumo-ui READS the exact names;
companycouncil's emitter PRODUCES them. Drift = a silent dead component (the
`----duration-base` bug). See [`TOKENS.md`](./TOKENS.md) for the full contract +
the producer/consumer seam.

## Distribution — git-ref pin

No registry. companycouncil's `agents/build/stack/stack_manifest.py` pins
`github:prumoholdings/prumo-ui#<tag>`; the build npm-installs it. Reproducible.
The first pin candidate is the tag **`v0.1.0-scaffold`**.

## Storybook — the standing visual review surface

Every component × sample data × token variants. The chairman's review surface,
hosted at **`design.prumoholdings.com`** (a fixed-port service behind the existing
named cloudflared tunnel — the public hostname is added in the Cloudflare
Zero-Trust dashboard, same as `code.prumoholdings.com`). A component is trusted
only after Storybook review.

## Stack (pinned to match companycouncil's build env)

- Vite 5 + React 18 + TypeScript 5
- **Tailwind v4** (`@tailwindcss/vite`) — utilities resolve THROUGH the token vars
- shadcn baseline: `@radix-ui/react-slot`, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `lucide-react ^0.451`
- Tremor `^3.18`, TanStack Table `^8.20`, framer-motion `^11` (the sole motion lib)
- Fonts: Fraunces (display) + Figtree (body) via Fontsource (NO Inter/Roboto)
- Storybook 8 (react-vite) + `@storybook/addon-a11y` (axe)
- vitest + jsdom + `vitest-axe` (a11y) + Testing Library

## Develop

```bash
npm install
npm run storybook        # dev Storybook on :6007
npm run build-storybook  # static build -> storybook-static/
npm run test             # vitest + axe
npm run build            # the library build -> dist/
```

## Status

Stage 1 (scaffold) — the repo + the canonical token contract + a working
Storybook/vitest + a smoke component (`TokenSwatch`). The full shadcn primitive
palette + the composites (DataTable/ComparisonTable/CardCollection/StatDashboard/
Board/FormWizard) land in Stage 2.

## License

Proprietary — Copyright © 2026 Prumo Holdings. All rights reserved. Published
publicly solely for git-ref provisioning; no use/copy/modify/distribute rights
are granted. See [`LICENSE`](./LICENSE).
