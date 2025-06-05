# Groups
Handle creation and management of groups. Ideal for organizing shared expenses.

## `getGroups()`

**Description:** Retrieves all groups the user is part of.

**Example:**
```ts
client.groups.getGroups()
```

## `getGroup()`

**Description:** Fetches details of a specific group by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.groups.getGroup(id)
```

## `createGroup()`

**Description:** Creates a new group.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.groups.createGroup(request_body)
```

## `deleteGroup()`

**Description:** Deletes a group by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.groups.deleteGroup(id)
```

## `unDeleteGroup()`

**Description:** Restores a previously deleted group by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.groups.unDeleteGroup(id)
```

## `addUserToGroup()`

**Description:** Adds a user to a group.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.groups.addUserToGroup(request_body)
```

## `removeUserFromGroup()`

**Description:** Removes a user from a group.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.groups.removeUserFromGroup(request_body)
```
