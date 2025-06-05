# Friends
Manage your friend list and their details. Helps in assigning and tracking shared expenses.

## `getFriends()`

**Description:** Retrieves all friends of the user.

**Example:**
```ts
client.friends.getFriends()
```

## `getFriend()`

**Description:** Fetches a friend's information by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.friends.getFriend(id)
```

## `createFriend()`

**Description:** Creates a new friend.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.friends.createFriend(request_body)
```

## `createFriends()`

**Description:** Creates multiple friends in a single request.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.friends.createFriends(request_body)
```

## `deleteFriend()`

**Description:** Deletes a friend by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.friends.deleteFriend(id)
```
