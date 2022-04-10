import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommand } from '../types';

const GOOGLE_URL = 'https://google.com';

export const GoogleCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Returns a link to Google'),
  async run(interaction) {
    const linkButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL(GOOGLE_URL)
        .setStyle('LINK')
        .setLabel('Visit Google')
    );

    await interaction.reply({ components: [linkButton] });
  },
};
