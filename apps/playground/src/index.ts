import { createApp, eventHandler } from "h3";
import { OAuth2User, Client } from 'splitwise-ts'

export const app = createApp();

/**
 * This is a simple handler that retrieves the current user
 * using the Splitwise TypeScript SDK.
 * You can run this app using the command: `pnpm dev`
 */
app.use("/", eventHandler(async (event) => {
    // Replace <consumer-key> and <consumer-secret> with your actual Splitwise OAuth credentials
    const user = new OAuth2User({
        clientId: process.env.SPLITWISE_CONSUMER_KEY as string,
        clientSecret: process.env.SPLITWISE_CONSUMER_SECRET as string,
    })

    // Request an access token with error handling
    try {
        await user.requestAccessToken()
    } catch (error) {
        return { error: "Failed to obtain access token", details: error instanceof Error ? error.message : String(error) }
    }

    // Create a new Splitwise client with the authenticated user
    const client = new Client(user)

    const myGroup = (await client.groups.getGroups()).groups?.find(group => {
        return group.name === 'Test Group in Town'
    })

    const expense = await client.expenses.createExpense({
        group_id: myGroup?.id,
        description: 'This is a text expense from splitwise-ts client',
        cost: '5000',
        split_equally: true,
    })

    return expense
}));