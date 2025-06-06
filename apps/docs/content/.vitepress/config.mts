import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "splitwise-ts",
  description: "Documentation for Splitwise SDK",
  base: '/splitwise-ts/',
  lastUpdated: true,
  themeConfig: {
    logo: '/splitwise-ts-logo.png',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/users' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Utilities', link: '/guide/utilities' }
        ]
      },
      {
        text: `Available API's`,
        items: [
          { text: 'Users', link: '/api/users' },
          { text: 'Groups', link: '/api/groups' },
          { text: 'Friends', link: '/api/friends' },
          { text: 'Expenses', link: '/api/expenses' },
          { text: 'Comments', link: '/api/comments' },
          { text: 'Notifications', link: '/api/notifications' },
          { text: 'Other', link: '/api/other' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/athulanilthomas/splitwise-ts' }
    ],
    footer: {
      message: 'Made with ❤️ by Athul Anil Thomas',
    },
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})
