# GA4 `gtag` stub: `dataLayer` queue shape

This project loads GA4 with the same **contract** as Google’s install snippet. If the stub does not match, tracking can **fail with almost no visible errors**.

## Symptom

- `https://www.googletagmanager.com/gtag/js?id=G-…` **loads** (you see it in Network or Performance).
- `window.dataLayer` **grows** when you call `gtag(...)` or your `trackEvent(...)` helpers; custom event names look correct in the console.
- **`/g/collect`** requests **do not appear** in Network (or GA Realtime / DebugView stays empty).

So the app “looks” fine; only the **hit pipeline** is broken.

## Failing pattern (do not use)

ESLint’s `prefer-rest-params` (and “clean” TypeScript style) pushes you toward rest parameters. **That breaks the queue shape** `gtag.js` expects:

```js
window.dataLayer = window.dataLayer ?? []
window.gtag = function gtag(...args) {
  window.dataLayer.push(args)
}
```

### Why it fails

- `(...args)` builds a **real `Array`**.
- Google’s snippet uses **`dataLayer.push(arguments)`**, where `arguments` is an **`Arguments`** object: array-like, but **`Array.isArray(...) === false`** and not the same type as `[...]` internally.
- The minified **`gtag.js`** walks `dataLayer` and interprets entries using that contract. Entries that are plain arrays often **do not** go through the path that issues **`/g/collect`**.
- **`gtag.js` does not throw** into your app when it disagrees with an entry; it may simply **skip** sending hits → **silent failure**.

## Working pattern (required)

Match the official snippet:

```js
window.dataLayer = window.dataLayer ?? []
window.gtag = function gtag() {
  window.dataLayer.push(arguments)
}
```

### Why it works

- Each `gtag('config', …)`, `gtag('event', …)`, etc. queues **one `Arguments` object** per call, same as Google’s docs.
- **`gtag.js`** can process the queue and send measurement hits (e.g. `https://www.google-analytics.com/g/collect?…`).

In this repo, the same logic lives in [`src/utils/analytics.ts`](../src/utils/analytics.ts), with an **`eslint-disable-next-line prefer-rest-params`** only on the `push(arguments)` line so lint autofix cannot revert it.

## TypeScript note

Callers can still type `window.gtag` as a normal function, e.g. `(...args: unknown[]) => void`. That describes **how you invoke** `gtag`, not the **runtime type** of each `dataLayer` entry. Queued commands are modeled as `IArguments` (see `GtagQueuedCommand` in `analytics.ts`).

## How we prevent regressions

- **Unit test** in [`src/utils/analytics.test.ts`](../src/utils/analytics.test.ts):  
  `queues gtag commands as Arguments objects, not Arrays` — asserts `Array.isArray(entry)` is **false** and `Object.prototype.toString.call(entry) === '[object Arguments]'` for each entry.

## Quick manual checks

After a full reload and one interaction:

1. Console:  
   `window.dataLayer?.filter((x) => x[0] === 'event').map((x) => x[1])`  
   — should list your custom event names if wiring runs.

2. Network: filter **`collect`** or **`google-analytics`** — you should see **`/g/collect`** once the library sends (also check ad blockers / privacy tools if empty).

3. Performance:  
   `performance.getEntriesByType('resource').filter(r => /google-analytics|googletagmanager/i.test(r.name))`  
   — you should see **`gtag/js`** and, when working, **`g/collect`** (or regional equivalents).
