export default {
  middlewares: {
    cooldown: {
      user: (timeLeft: string) => {
        return `⚠️ You are on cooldown for **${timeLeft}** second(s)`;
      },
      channel: (timeLeft: string) => {
        return `⚠️ This channel is on cooldown for **${timeLeft}** second(s)`;
      },
    },
  },
  commands: {
    ping: {
      name: 'ping',
      description: 'Show latency with Discord',
      res: ({ ping }: { ping: number }) => `The ping is \`${ping}ms\``,
    },
    core: {
      parent: {
        name: 'sum',
        description:
          'Get information about a summoner or a user with a Riot ID',
        options: {
          riotId: {
            description:
              'The Riot ID is your universal ID used across all Riot games',
            fail: '⚠️ Invalid Riot ID provided. It must be 3-21 characters long and can include "#" symbol',
          },
          region: {
            description: 'The region where the summoner is located',
            fail: (regions: string[]) =>
              `⚠️ Invalid region provided. Available regions: ${regions.map((value) => `\`${value}\``).join(', ')}`,
          },
          user: {
            description:
              'If the user has a Riot ID associated with their account',
            fail: '⚠️ Invalid user provided. Ensure the user has a Riot ID associated with their account',
          },
        },
      },
      profile: {
        name: 'profile',
        description: 'Get statistics about a summoner',
        fail: '⚠️ Unable to find the summoner, please check the Riot ID and region',
      },
    },
  },
};
