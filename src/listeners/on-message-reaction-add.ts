import { Client } from 'discord.js';
import { SELF_ROLES } from '../self-roles';

export const onMessageReactionAdd = (client: Client): void => {
  client.on('messageReactionAdd', async (reaction, user) => {
    const reactionRole = SELF_ROLES.find(
      (role) => role.emoji.id === reaction.emoji.id
    );
    if (
      reaction.message.interaction?.commandName === 'add_roles' &&
      reactionRole &&
      reaction.message.inGuild() &&
      !user.bot
    ) {
      const guildId = reaction.message.guildId;
      const guild =
        client.guilds.cache.get(guildId) ||
        (await client.guilds.fetch(guildId));
      const existingRoles = guild.roles.cache;
      const roleToAdd = existingRoles.find(
        (existingRole) => existingRole.name === reactionRole.name
      );

      if (!roleToAdd) {
        return;
      }

      const userId = user.id;
      const member =
        guild.members.cache.get(userId) || (await guild.members.fetch(userId));

      if (member.roles.cache.has(roleToAdd.id)) {
        return;
      }

      await member.roles.add(roleToAdd.id);
    }
  });
};
