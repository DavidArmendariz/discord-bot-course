import { Client } from 'discord.js';
import { TOKEN } from './config';
import { onReady } from './listeners';

const client = new Client({
  intents: [],
});

onReady(client);

client.login(TOKEN);
