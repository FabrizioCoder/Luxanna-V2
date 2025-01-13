import { Client, ParseClient, ParseLocales, ParseMiddlewares } from 'seyfert';
import { Ratelimit } from './config/types';
import { AllMiddlewares } from './middlewares';
import { ActivityType, PresenceUpdateStatus } from 'seyfert/lib/types';
import { GameVersionService } from './services/version-service';
import { DataDragonService } from './services/data-dragon-service';
import type English from './langs/en-US';

const client = new Client({
  presence: () => ({
    afk: false,
    since: Date.now(),
    status: PresenceUpdateStatus.Online,
    activities: [{ name: "the summoner's rift", type: ActivityType.Playing }],
  }),
});

client.setServices({
  langs: { default: 'en-US' },
  middlewares: AllMiddlewares,
  cache: {
    disabledCache: {
      channels: true,
      roles: true,
      emojis: true,
      messages: true,
    },
  },
});

(async () => {
  try {
    await client.start();
    await client.uploadCommands({ cachePath: 'data-cache/commands.json' });
    GameVersionService.startAutoUpdate();
    setTimeout(async () => await DataDragonService.updateAllData(), 10000);
  } catch (error) {
    console.error(`Failed to start: ${(error as Error).message}`);
  }
})();

declare module 'seyfert' {
  interface UsingClient extends ParseClient<Client<true>> {}
  interface DefaultLocale extends ParseLocales<typeof English> {}
  interface ExtraProps {
    ratelimit?: Ratelimit;
  }
  interface RegisteredMiddlewares
    extends ParseMiddlewares<typeof AllMiddlewares> {}
}
