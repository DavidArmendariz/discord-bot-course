import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
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
      return;
    }

    if (!interaction.channel) {
      await interaction.reply({
        content:
          'You can only use this command in a channel or the client does not have the correct intents.',
      });
      return;
    }

    const buildEmbed = () => {
      let formattedTimeUnit: TimeUnit | string = timeUnit;
      if (time === 1) {
        // 1 hours => 1 hour
        formattedTimeUnit = formattedTimeUnit.slice(0, -1);
      }

      const embed = new MessageEmbed()
        .setAuthor({
          name: member.displayName,
          iconURL: user.displayAvatarURL(),
        })
        .setTitle(title || 'Poll')
        .setDescription(
          description ||
            `React to vote. The poll is going to be available for ${time} ${formattedTimeUnit}`
        )
        .setColor('BLUE')
        .setFooter({ text: 'In case of a draw, a random is selected.' });

      shownOptions.forEach(({ label, value, emoji }) => {
        embed.addField(label, `${emoji} - ${value}`);
      });

      return embed;
    };

    const { options, user, guildId, client } = interaction;
    const guild = interaction.guild || (await client.guilds.fetch(guildId));
    const member =
      guild.members.cache.get(user.id) || (await guild.members.fetch(user.id));
    const shownOptions = OPTIONS.map(({ name, description }, i) => ({
      emoji: EMOJIS[i],
      label: description,
      value: options.getString(name),
    })).filter(
      (
        shownOption
      ): shownOption is { emoji: string; label: string; value: string } =>
        !!shownOption.value
    );
    const time = options.getInteger('time', true);
    const timeUnit = options.getString('time_unit', true) as TimeUnit;
    const title = options.getString('title');
    const description = options.getString('description');
    const dmNotify = options.getBoolean('dm_notify') ?? true;

    const embed = buildEmbed();
  },
};
