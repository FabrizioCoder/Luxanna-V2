import {
  Declare,
  Command,
  LocalesT,
  Middlewares,
  type CommandContext,
} from 'seyfert';

@Declare({
  name: 'ping',
  description: 'Show latency with Discord',
  props: {
    ratelimit: { type: 'user', time: 5000 },
  },
})
@LocalesT('commands.ping.name', 'commands.ping.description')
@Middlewares(['Cooldown'])
export default class PingCommand extends Command {
  async run(ctx: CommandContext) {
    await ctx.deferReply();
    const ping = ctx.client.gateway.latency;

    await ctx.editOrReply({
      content: ctx.t.commands.ping.res({ ping }).get(),
    });
  }
}
