# Expenses
Create, view, and manage expense entries. Core functionality for tracking financial records.

## `getExpense()`

**Description:** Fetches a specific expense by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.expenses.getExpense(id)
```

## `getExpenses()`

**Description:** Retrieves a list of expenses.

**Parameters:**
- `params: object`

**Example:**
```ts
client.expenses.getExpenses(params)
```

## `createExpense()`

**Description:** Creates a new expense.

**Parameters:**
- `request_body: object`

**Example:**
```ts
client.expenses.createExpense(request_body)
```

## `updateExpense()`

**Description:** Updates an expense by ID.

**Parameters:**
- `id: string`
- `request_body: object`

**Example:**
```ts
client.expenses.updateExpense(id, request_body)
```

## `deleteExpense()`

**Description:** Deletes an expense by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.expenses.deleteExpense(id)
```

## `unDeleteExpense()`

**Description:** Restores a deleted expense by ID.

**Parameters:**
- `id: string`

**Example:**
```ts
client.expenses.unDeleteExpense(id)
```
