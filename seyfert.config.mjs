import { config } from 'seyfert';
import 'dotenv/config';

export default config.bot({
  token: process.env.BOT_TOKEN ?? '',
  locations: {
    base: 'dist',
    commands: 'commands',
    langs: 'langs',
    events: 'events',
  },
  intents: ['Guilds'],
});
