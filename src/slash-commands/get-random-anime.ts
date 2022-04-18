import { SlashCommandBuilder } from '@discordjs/builders';
import axios from 'axios';
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
  },
};
