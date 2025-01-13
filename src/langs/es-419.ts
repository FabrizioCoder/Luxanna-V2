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
          'Obtén información sobre un invocador o un usuario con un ID de Riot',
        options: {
          riotId: {
            description:
              'El Riot ID es tu ID universal para todos los juegos de Riot',
            fail: '⚠️ ID de Riot inválido proporcionado. Debe tener entre 3 y 21 caracteres y debe incluir el símbolo "#"',
          },
          region: {
            description: 'La región donde se encuentra el invocador',
            fail: (regions: string[]) =>
              `⚠️ Región inválida proporcionada. Regiones disponibles: ${regions.map((value) => `\`${value}\``).join(', ')}`,
          },
          user: {
            description: 'Si el usuario tiene un Riot ID asociado a su cuenta',
            fail: '⚠️ Usuario inválido proporcionado. Asegúrate de que el usuario tenga un Riot ID asociado a su cuenta',
          },
        },
      },
      profile: {
        name: 'profile',
        description: 'Obtén estadísticas sobre un invocador',
        fail: '⚠️ No se pudo encontrar al invocador, por favor verifica el ID de Riot y la región',
      },
    },
  },
} satisfies typeof English;
