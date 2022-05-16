import { Client } from 'discord.js';
import { SlashCommands } from '../slash-commands';

export const onReady = (client: Client) => {
  client.on('ready', async () => {
    console.log(`${client.user?.username} is online`);

    const commands = SlashCommands.map(({ command }) => command.toJSON());
    await client.application?.commands.set(commands);
  });
};
