---
"splitwise-ts": minor
---

Exports `SplitwiseError`, `createError` and the public types `AuthClient`, `OAuthCredentials`, `UseAuthResponse`, `RestOptions`, `SplitwiseErr`, `OperationQueryParams`, `OperationRequestBodyContent` and `Primitive` from the package entry point.

Fixes: unauthorized responses now report status code `401` (previously `402`); `flatten` now honours the custom `delimiter` for nested values.

Changes: `AuthClient` is now an interface (use `implements`), `OAuth2User` keeps its token in a private field, `RestOptions.method` is restricted to HTTP verbs, and the client and types are generated at build time from the OpenAPI spec instead of being committed. Adds Vitest unit tests, CI workflow, and updates dependencies (vitest 4, handlebars 4.7.10, fast-uri, js-yaml).
