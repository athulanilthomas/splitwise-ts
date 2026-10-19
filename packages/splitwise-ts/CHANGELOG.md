# splitwise-ts

## 1.2.0

### Minor Changes

- 25fd5b0: Exports `SplitwiseError`, `createError` and the public types `AuthClient`, `OAuthCredentials`, `UseAuthResponse`, `RestOptions`, `SplitwiseErr`, `OperationQueryParams`, `OperationRequestBodyContent` and `Primitive` from the package entry point.

  Fixes: unauthorized responses now report status code `401` (previously `402`); `flatten` now honours the custom `delimiter` for nested values.

  Changes: `AuthClient` is now an interface (use `implements`), `OAuth2User` keeps its token in a private field, `RestOptions.method` is restricted to HTTP verbs, and the client and types are generated at build time from the OpenAPI spec instead of being committed. Adds Vitest unit tests, CI workflow, and updates dependencies (vitest 4, handlebars 4.7.10, fast-uri, js-yaml).

## 1.1.3

### Patch Changes

- Updated the spec file to reflect the latest documentation.

## 1.1.2

### Patch Changes

- 24deb51: Fixes an issue where the request body was not being correctly passed to the Splitwise client. This patch ensures the client receives and processes the body as expected.

## 1.1.1

### Patch Changes

- 51b7e28: Update readme and documentation

## 1.1.0

### Minor Changes

- 2861ed5: Resolve issues on importing types

## 1.0.1-alpha.1

### Patch Changes

- a11844f: Update documentation typo

## 1.0.1-alpha.0

### Patch Changes

- 9e510fb: This release will update the documentation and reference

## 1.0.0

### Patch Changes

- 260a3f0: Update docs and add changeset configurations
