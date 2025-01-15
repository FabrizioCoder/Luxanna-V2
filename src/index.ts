import type { ParseMiddlewares, ParseLocales, ParseClient, } from 'seyfert';

import { PresenceUpdateStatus, ActivityType, } from 'seyfert/lib/types';
import { Client, } from 'seyfert';

import type { Ratelimit, } from './config/types';
import type English from './langs/en-US';

import { DataDragonService, } from './services/data-dragon-service';
import { GameVersionService, } from './services/version-service';
import { AllMiddlewares, } from './middlewares';

const client = new Client({
  presence: () => ({
    afk: false,
    since: Date.now(),
    status: PresenceUpdateStatus.Online,
    activities: [{
      name: 'the summoner\'s rift',
      type: ActivityType.Playing,
    },],
  }),
});

client.setServices({
  langs: { default: 'en-US', },
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

void (async () => {
  try {
    await client.start();
    await client.uploadCommands({ cachePath: 'data-cache/commands.json', });
    GameVersionService.startAutoUpdate();
    setTimeout(async () => DataDragonService.updateAllData(), 10_000);
  } catch (error) {
    console.error(`Failed to start: ${(error as Error).message}`);
  }
})();

declare module 'seyfert' {
  interface UsingClient extends ParseClient<Client<true>> { }
  interface DefaultLocale extends ParseLocales<typeof English> { }
  interface ExtraProps {
    ratelimit?: Ratelimit;
  }
  interface RegisteredMiddlewares
    extends ParseMiddlewares<typeof AllMiddlewares> { }
}
