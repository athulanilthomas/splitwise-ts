---
outline: deep
---
# Getting Started
This section provides all the essential information and guidance you need to get started

## Installation

To install the SDK, use **npm**, **yarn**, or **pnpm**:

```sh
# Using pnpm
pnpm add splitwise-ts

# Using npm
npm install splitwise-ts

# Using yarn
yarn add splitwise-ts
```

## Usage

To get started with `splitwise-ts`, you need to authenticate using OAuth2 and create a client instance to interact with the Splitwise API. 🧠🛠️📚

### Import the SDK

```ts
import { Client, OAuth2User } from 'splitwise-ts'
```

### Authenticate with OAuth2

Create a new `OAuth2User` instance using your **client ID** and **client secret** from Splitwise:

```ts
const user = new OAuth2User({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
})
```

> **Note:** Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your actual credentials from the Splitwise developer portal.

### Request an Access Token

Before making API requests, you must obtain an access token:

```ts
await user.requestAccessToken().catch(console.error)
```

This will request a new access token.

### Create the Splitwise Client

Once the user is authenticated, create a new `Client` instance using the authenticated `OAuth2User`:

```ts
const client = new Client(user)
```

### Make API Calls

You can now make fully typed API calls. For example, to get the current authenticated user:

```ts
const response = await client.users.getCurrentUser().catch((error) => {
  console.error('Error fetching user:', error)
})
```

You’ll get a response object containing the current user’s details.
