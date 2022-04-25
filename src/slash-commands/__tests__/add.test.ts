import { CommandInteraction } from 'discord.js';
import { AddCommand } from '../add';

test('it replies with the sum of two numbers', async () => {
  const getNumber = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(5);
  const interaction = {
    options: {
      getNumber,
    },
    reply: jest.fn(),
  } as unknown as CommandInteraction;
  await AddCommand.run(interaction);
  expect(getNumber).toHaveBeenCalledTimes(2);
  expect(interaction.reply).toHaveBeenCalledWith({ content: '1 + 5 = 6' });
});
