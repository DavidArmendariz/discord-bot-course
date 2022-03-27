import { Client, Intents } from 'discord.js';
import { TOKEN } from './config';
import { onMessageCreate, onReady } from './listeners';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  partials: ['CHANNEL'],
});

onReady(client);
onMessageCreate(client);

client.login(TOKEN);
