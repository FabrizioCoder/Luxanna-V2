import {
  type CommandContext,
  Declare,
  LocalesT,
  SubCommand,
  Options,
} from 'seyfert';
import { baseSearchOptions } from '../../config/utils';
import {
  createPlatformAxiosInstance,
  createRegionalAxiosInstance,
} from '../../config/axios-config';
import { SummonerService } from '../../services/summoner-service';
import { AccountService } from '../../services/account-service';
import { PLATFORM_TO_REGIONAL } from '../../config/regions';

@Declare({
  name: 'profile',
  description: 'Get statistics about a summoner',
})
@LocalesT('commands.core.profile.name', 'commands.core.profile.description')
@Options(baseSearchOptions)
export default class ProfileCommand extends SubCommand {
  async run(ctx: CommandContext<typeof baseSearchOptions>) {
    await ctx.deferReply();

    const options = ctx.options!;

    const regionalAxios = createRegionalAxiosInstance(
      PLATFORM_TO_REGIONAL(options.region!)
    );
    const platformAxios = createPlatformAxiosInstance(options.region!);

    const accountService = new AccountService(regionalAxios);
    const summonerService = new SummonerService(platformAxios);

    const account = await accountService.getAccountByRiotId(
      options['riot-id']!
    );
    if (!account) {
      return ctx.editOrReply({
        content: ctx.t.commands.core.profile.fail.get(),
      });
    }

    const summoner = await summonerService.getSummonerByPuuid(account.puuid);
    if (!summoner) {
      return ctx.editOrReply({
        content: ctx.t.commands.core.profile.fail.get(),
      });
    }

    console.log(summoner);
  }
}
