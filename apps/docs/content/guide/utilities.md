---
outline: 2
---

# Utilities
This section introduces a collection of helpful utilities designed to simplify common tasks and enhance your development experience

## Splitwisify

The `splitwisify` utility helps convert nested parameters and booleans into a flat format that the Splitwise API accepts. This ensures your requests are clean, readable, and API-compliant.

### Why use `splitwisify`

Splitwise's API does **not directly support nested parameters or booleans**. You can technically send flattened keys manually, but that requires custom logic to match the correct index structure:

```ts
// 🔧 This will work, but requires manual indexing
createExpense({
  users__0__user_id: '23456789',
  users__1__user_id: '34567890',
  payment: false
})
```

Using `splitwisify`, you can simplify that:

```ts
// ✅ Recommended approach
createExpense(splitwisify({
  users: [
    { user_id: '23456789' },
    { user_id: '34567890' }
  ],
  payment: false
}))
```

---

### Example

```ts
splitwisify({
  message: "This is an expense",
  paid: "234",
  users: [
    { id: '0', description: 'Salad' },
    { id: '1', description: 'Pizza' },
    { id: '2', description: 'Again Salad' }
  ]
})
```

#### Output
```ts
{
  message: "This is an expense",
  paid: "234",
  users_0_id: '0',
  users_0_description: 'Salad',
  users_1_id: '1',
  users_1_description: 'Pizza',
  users_2_id: '2',
  users_2_description: 'Again Salad'
}
```

---

### Integration Example

```ts
import { Client, OAuth2User, splitwisify } from 'splitwise-ts'

const user = new OAuth2User({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET'
})

await user.requestAccessToken()
const client = new Client(user)

await client.expenses.createExpense(
  splitwisify({
    users: [
      { user_id: '123' },
      { user_id: '456' }
    ],
    cost: '12.00',
    payment: false
  })
)
```

---
