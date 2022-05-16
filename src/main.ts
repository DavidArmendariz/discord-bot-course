import { Client, Intents } from 'discord.js';
import { TOKEN } from './config';
import {
  onMessageCreate,
  onReady,
  onInteractionCreate,
  onMessageReactionAdd,
  onMessageReactionRemove,
} from './listeners';

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  partials: ['CHANNEL'],
});

onReady(client);
onMessageCreate(client);
onInteractionCreate(client);
onMessageReactionAdd(client);
onMessageReactionRemove(client);

client.login(TOKEN);
