import { createStringOption, createUserOption, OKFunction } from 'seyfert';
import { FORMATTED_PLATFORM_REGIONS, PlatformRegion } from './regions';
import Spanish from '../langs/es-419';
import English from '../langs/en-US';

const baseSearchOptions = {
  'riot-id': createStringOption({
    description: 'The Riot ID is your universal ID used across all Riot games',
    locales: {
      description: 'commands.core.parent.options.riotId.description',
    },
    value: ({ value, context }, ok: OKFunction<string>, fail) => {
      const [name, _] = value.split('#');
      if (name.length >= 3 && name.length <= 16 && value!.includes('#')) {
        return ok(value);
      }
      fail(context.t.commands.core.parent.options.riotId.fail.get());
    },
  }),
  region: createStringOption({
    description: 'The region where the summoner is located',
    locales: {
      name: 'commands.core.parent.options.region.name',
      description: 'commands.core.parent.options.region.description',
    },
    choices: Object.entries(FORMATTED_PLATFORM_REGIONS).map(([key, value]) => {
      return {
        name: value,
        value: key,
        name_localizations: {
          'es-419': Spanish.extra.regions(key),
          'en-US': English.extra.regions(key),
        },
      };
    }),
    value: ({ value, context }, ok: OKFunction<PlatformRegion>, fail) => {
      if (Object.keys(FORMATTED_PLATFORM_REGIONS).includes(value!)) {
        return ok(value as PlatformRegion);
      }
      fail(
        context.t.commands.core.parent.options.region
          .fail(Object.keys(FORMATTED_PLATFORM_REGIONS))
          .get()
      );
    },
  }),
  user: createUserOption({
    description: 'If the user has a Riot ID associated with their account',
    locales: {
      name: 'commands.core.parent.options.user.name',
      description: 'commands.core.parent.options.user.description',
    },
    value: ({ value, context }, ok: OKFunction<string>, fail) => {
      if (value) {
        return ok(value.id);
      }
      fail(context.t.commands.core.parent.options.user.fail.get());
    },
  }),
};

export { baseSearchOptions };
