import { Client } from 'discord.js';

export const onReady = (client: Client) => {
  client.on('ready', () => {
    console.log(`${client.user?.username} is online`);
  });
};
