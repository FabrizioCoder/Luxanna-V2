import { Declare, Command, AutoLoad, LocalesT } from 'seyfert';

@Declare({
  name: 'sum',
  description:
    'Get information about a summoner like profile, rank, and match history',
})
@LocalesT('commands.core.parent.name', 'commands.core.parent.description')
@AutoLoad()
export default class SummonerCommand extends Command {}
