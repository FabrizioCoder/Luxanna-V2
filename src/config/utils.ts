import type { OKFunction } from 'seyfert';

import { createStringOption, createUserOption } from 'seyfert';

import type { PlatformRegion } from './regions';

import { FORMATTED_PLATFORM_REGIONS } from './regions';
import Spanish from '../langs/es-419';
import English from '../langs/en-US';

const baseSearchOptions = {
  'riot-id': createStringOption({
    description: 'The Riot ID is your universal ID used across all Riot games',
    locales: {
      description: 'commands.core.parent.options.riotId.description'
    },
    value: ({ value, context }, ok: OKFunction<string>, fail) => {
      const [name, _] = value.split('#');
      if (name.length >= 3 && name.length <= 16 && value.includes('#')) {
        ok(value); return;
      }
      fail(context.t.commands.core.parent.options.riotId.fail.get());
    }
  }),
  region: createStringOption({
    description: 'The region where the summoner is located',
    locales: {
      name: 'commands.core.parent.options.region.name',
      description: 'commands.core.parent.options.region.description'
    },
    choices: Object.entries(FORMATTED_PLATFORM_REGIONS).map(([key, value]) => ({
      name: value,
      value: key,
      name_localizations: {
        'es-419': Spanish.extra.regions(key),
        'en-US': English.extra.regions(key)
      }
    })),
    value: ({ value, context }, ok: OKFunction<PlatformRegion>, fail) => {
      if (Object.keys(FORMATTED_PLATFORM_REGIONS).includes(value)) {
        ok(value as PlatformRegion); return;
      }
      fail(
        context.t.commands.core.parent.options.region
          .fail(Object.keys(FORMATTED_PLATFORM_REGIONS))
          .get()
      );
    }
  }),
  user: createUserOption({
    description: 'If the user has a Riot ID associated with their account',
    locales: {
      name: 'commands.core.parent.options.user.name',
      description: 'commands.core.parent.options.user.description'
    },
    value: ({ value }, ok: OKFunction<string>) => {
      ok(value.id);
    }
  })
};

export { baseSearchOptions };
