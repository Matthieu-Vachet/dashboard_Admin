# Audit methodology, evidence and unknowns

## Evidence method

- TypeScript compiler AST over every JSX/TSX file in `Dashboard Admin/src`.
- Compatibility re-exports included as separate callable component identities.
- JSX hierarchy, props, imports, classes, state hooks, events, ARIA, assets and responsive prefixes extracted per definition.
- Global CSS parsed and preserved verbatim.
- Public assets inventoried by exact path, extension and byte size.
- No project source file was modified.

## Interpretation labels

- `Estimated from implementation`: a reconstruction inference where no direct exact token/contract exists.
- `Not found`: no static evidence was found.

## Known static-audit limits

- Runtime visual output, authenticated data and network-dependent branches: Not found.
- Browser layout rounding, font substitution and content-driven wrapping: Estimated from implementation.
- Hidden branches assembled dynamically through values not represented as JSX tags may require runtime captures.
- Figma instance architecture is a translation of current code structure, not an existing Figma source of truth.
