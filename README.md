![splitwise-ts-logo](splitwise-ts-logo-main.png)

# Splitwise Typescript

A high-performance, fully typed SDK for integrating with Splitwise, designed for maximum speed and flexibility. This SDK is compatible with Web Workers, browsers, and Node.js, ensuring seamless usage across different environments. Built with TypeScript, it offers robust type safety and developer-friendly interfaces, making it the fastest and most reliable way to interact with Splitwise programmatically.

## Features 🎉

⚡ **Blazing Fast** – Optimized for performance across all supported environments.  
🔄 **Multi-Platform Support** – Works on Web Workers, browsers, and Node.js  
🛡️ **Fully Typed** – Provides complete TypeScript definitions.  
🔗 **Seamless API Integration** – Simplifies interaction with Splitwise’s API.  
📦 **Lightweight & Efficient** – Minimal dependencies to ensure a small footprint.

Perfect for developers who need a reliable and efficient way to manage expenses and group transactions programmatically with Splitwise. 

## 📦 Installation

To install the SDK, use **npm**, **yarn**, or **pnpm**:

```sh
# Using pnpm
pnpm add splitwise-ts

# Using npm
npm install splitwise-ts

# Using yarn
yarn add splitwise-ts
```

## 🚀 Usage

To get started with `splitwise-ts`, you need to authenticate using OAuth2 and create a client instance to interact with the Splitwise API. 🧠🛠️📚

### 1. Import the SDK 

```ts
import { Client, OAuth2User } from 'splitwise-ts'
```

### 2. Authenticate with OAuth2 

Create a new `OAuth2User` instance using your **client ID** and **client secret** from Splitwise:

```ts
const user = new OAuth2User({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
})
```

> Replace `YOUR_CLIENT_ID` and `YOUR_CLIENT_SECRET` with your actual credentials from the Splitwise developer portal.

### 3. Request an Access Token 

Before making API requests, you must obtain an access token:

```ts
await user.requestAccessToken().catch(console.error)
```

This will request a new access token

### 4. Create the Splitwise Client

Once the user is authenticated, create a new `Client` instance using the authenticated `OAuth2User`:

```ts
const client = new Client(user)
```

### 5. Make API Calls

You can now make fully typed API calls. For example, to get the current authenticated user:
```ts
const response = await client.users.getCurrentUser().catch((error) => {
  console.error('Error fetching user:', error)
})
```

You’ll get a response object containing the current user’s details.
