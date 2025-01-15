import { AutoLoad, LocalesT, Declare, Command, } from 'seyfert';

@Declare({
  name: 'sum',
  description:
    'Get information about a summoner or a user with a Riot ID',
})
@LocalesT('commands.core.parent.name', 'commands.core.parent.description')
@AutoLoad()
export default class SummonerCommand extends Command { }
