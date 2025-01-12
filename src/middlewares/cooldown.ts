import { createMiddleware } from 'seyfert';
import { LimitedCollection } from 'seyfert/lib/collection';
import { Snowflake } from 'seyfert/lib/types';
import { Ratelimit } from 'src/config/types';

const cooldowns = new LimitedCollection<Snowflake, Ratelimit>({});

export default createMiddleware<void>(async (middle) => {
  if (!middle.context.isChat()) return;

  const commandCooldown = middle.context.command.props.ratelimit;
  if (!commandCooldown) return middle.next();

  const commandName = middle.context.resolver.fullCommandName;
  const t = middle.context.t.get(middle.context.author.locale);

  const id =
    commandCooldown.type === 'channel'
      ? (middle.context.interaction.channel?.id ?? middle.context.author.id)
      : middle.context.author.id;

  const key = `${id}:${commandName}`;
  const currentCooldown = cooldowns.raw(key);

  if (!currentCooldown) {
    cooldowns.set(key, commandCooldown, commandCooldown.time);
    return middle.next();
  }

  const timeLeft = (currentCooldown.expireOn - Date.now()) / 1000;

  const replyContent =
    commandCooldown.type === 'user'
      ? t.middlewares.cooldown.user(timeLeft.toFixed(1))
      : t.middlewares.cooldown.channel(timeLeft.toFixed(1));

  await middle.context.interaction.editOrReply({
    content: replyContent,
    flags: 64,
  });

  middle.stop(`cooldown (${commandCooldown.type}: ${id})`);
});
