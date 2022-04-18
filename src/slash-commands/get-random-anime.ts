import { hyperlink, SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
import { MessageEmbed } from 'discord.js';
import { SlashCommand } from '../types';

const GET_RANDOM_ANIME_URL = 'https://api.jikan.moe/v4/random/anime';

type GetRandomAnimeResponse = {
  data: {
    url: string;
    title: string;
    title_japanese: string;
    type: string;
    episodes: number;
    airing: boolean;
    rank: number;
    synopsis: string;
    images: {
      webp: {
        image_url: string;
      };
    };
    score: number;
    scored_by: number;
    duration: string;
    status: string;
    rating: string;
    genres: Array<{ name: string; url: string }>;
    themes: Array<{ name: string; url: string }>;
  };
};

export const GetRandomAnimeCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('get_random_anime')
    .setDescription('Returns a random anime'),
  async run(interaction) {
    const addField = (field: string, value: string | number) => {
      if (value) {
        embed.addField(field, value.toString(), true);
      }
    };

    await interaction.deferReply();

    const response = await axios.get<GetRandomAnimeResponse['data']>(
      GET_RANDOM_ANIME_URL,
      {
        transformResponse: (response) => {
          const json: GetRandomAnimeResponse = JSON.parse(response);
          return json.data;
        },
      }
    );

    const {
      data: {
        title,
        title_japanese,
        images: {
          webp: { image_url },
        },
        rank,
        url,
        type,
        synopsis,
        status,
        score,
        scored_by,
        rating,
        duration,
        genres,
        themes,
      },
    } = response;

    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(url)
      .setImage(image_url)
      .setAuthor({ name: title_japanese })
      .setDescription(synopsis);

    addField('Rank', rank);
    addField('Type', type);
    addField('Score', score);
    addField('Scoredy by', scored_by);
    addField('Status', status);
    addField('Rating', rating);
    addField('Duration', duration);

    const genresString = genres
      .map(({ name, url }) => hyperlink(name, url))
      .join('\n');
    const themesString = themes
      .map(({ name, url }) => hyperlink(name, url))
      .join('\n');

    addField('Genres', genresString);
    addField('Themes', themesString);

    await interaction.editReply({ embeds: [embed] });
  },
};
