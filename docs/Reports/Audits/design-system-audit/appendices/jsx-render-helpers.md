# JSX render helpers outside the component registry

These functions return JSX but use lowercase names and are invoked as ordinary render helpers, so they are not counted as React component identities.

## renderInlineMarkdown

- Source: `src/components/admin/learning/learning-detail-modal.tsx`:323-329.
- Signature: `value: string`.

```tsx
function renderInlineMarkdown(value: string) {
  return value.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong className="font-black text-foreground" key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-brand-2" key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
    return part;
  });
}
```

