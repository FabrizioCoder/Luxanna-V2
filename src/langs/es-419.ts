import type English from './en-US';

export default {
  middlewares: {
    cooldown: {
      user: (timeLeft: string) => {
        return `⚠️ Estás en enfriamiento por **${timeLeft}** segundos`;
      },
      channel: (timeLeft: string) => {
        return `⚠️ Este canal está en enfriamiento por **${timeLeft}** segundos`;
      },
    },
  },
  commands: {
    ping: {
      name: 'ping',
      description: 'Muestra la latencia con Discord',
      res: ({ ping }: { ping: number }) => `El ping es \`${ping}ms\``,
    },
    core: {
      parent: {
        name: 'sum',
        description:
          'Obtén información sobre un invocador como perfil, rango e historial de partidas',
      },
    },
  },
} satisfies typeof English;
