import { Client } from 'discord.js';

export const onMessageCreate = (client: Client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) {
      return;
    }

    const content = message.content.toLowerCase();

    if (content === 'ping') {
      await message.reply(
        `${message.member?.displayName || message.author.username}: pong`
      );
    }
  });
};
