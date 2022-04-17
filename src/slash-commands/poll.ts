import { SlashCommandBuilder } from '@discordjs/builders';
import { SlashCommand } from '../types';

const EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

const OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  name: `option${i + 1}`,
  description: `Poll option #${i + 1}`,
  required: i <= 1,
}));

enum TimeUnit {
  seconds = 'seconds',
  minutes = 'minutes',
  hours = 'hours',
}

export const PollCommand: SlashCommand = {
  command: (() => {
    const slashCommand = new SlashCommandBuilder()
      .addIntegerOption((option) =>
        option
          .setName('time')
          .setDescription('How much time the poll is going to last')
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(60)
      )
      .addStringOption((option) =>
        option
          .setName('time_unit')
          .setDescription('Time unit to be used')
          .setRequired(true)
          .addChoices([
            [TimeUnit.seconds, TimeUnit.seconds],
            [TimeUnit.minutes, TimeUnit.minutes],
            [TimeUnit.hours, TimeUnit.hours],
          ])
      )
      .setName('poll')
      .setDescription('Creates a poll');

    OPTIONS.forEach(({ name, description, required }) => {
      slashCommand.addStringOption((option) =>
        option.setName(name).setDescription(description).setRequired(required)
      );
    });

    slashCommand
      .addStringOption((option) =>
        option.setName('title').setDescription('The title of the poll')
      )
      .addStringOption((option) =>
        option
          .setName('description')
          .setDescription('The description of the poll')
      )
      .addBooleanOption((option) =>
        option
          .setName('dm_notify')
          .setDescription(
            'Whether the bot should DM you if the poll completed successfully'
          )
      );

    return slashCommand;
  })(),
  async run(interaction) {
    if (!interaction.inGuild()) {
      await interaction.reply({
        content: 'You can only use this command inside a server.',
      });
    }

    if (!interaction.channel) {
      await interaction.reply({
        content:
          'You can only use this command in a channel or the client does not have the correct intents.',
      });
    }
  },
};
