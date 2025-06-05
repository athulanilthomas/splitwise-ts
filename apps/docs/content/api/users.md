# Users
Manage current and other user profiles. Useful for fetching and updating user information.


## `getCurrentUser()`

**Description:** Fetches the currently authenticated user's information.

**Example:**
```ts
client.users.getCurrentUser()
```

## `getUser()`

**Description:** Fetches a user's information by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.users.getUser(id)
```

## `updateUser()`

**Description:** Updates a user's information by ID.

**Parameters:**
- `id: string`
- `request_body: object`

**Example:**
```ts
client.users.updateUser(id, request_body)
```
