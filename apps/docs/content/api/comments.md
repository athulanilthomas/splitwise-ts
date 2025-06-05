# Comments
Add or manage comments on expenses or groups. Useful for collaboration and communication.

## `getComments()`

**Description:** Retrieves comments on expenses or groups.

**Parameters:**
- `params: object`

**Example:**
```ts
client.comments.getComments(params)
```

## `createComment()`

**Description:** Creates a new comment.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.comments.createComment(request_body)
```

## `deleteComment()`

**Description:** Deletes a comment by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.comments.deleteComment(id)
```
