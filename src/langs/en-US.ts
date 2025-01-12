export default {
  middlewares: {
    cooldown: {
      user: (timeLeft: string) => {
        return `⚠️ You are on cooldown for **${timeLeft}** seconds.`;
      },
      channel: (timeLeft: string) => {
        return `⚠️ This channel is on cooldown for **${timeLeft}** seconds.`;
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
          'Get information about a summoner like profile, rank, and match history',
      },
    },
  },
};
