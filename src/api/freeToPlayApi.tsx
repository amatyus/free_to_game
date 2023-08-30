import axios from 'axios';
import axiosRetry from 'axios-retry';

const BASE_URL = 'https://free-to-play-games-database.p.rapidapi.com/api';
const config = {
  headers: {
    'X-RapidAPI-Key': '2782374a74msh02f757fbc29e99bp1742d6jsna5f2c7dba63c',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
};

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 2000,
  retryCondition: () => true,
});

export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type GamesList = Array<Game>;

export type SystemRequirements = {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
};

export type Screenshots = {
  id: number;
  image: string;
};

export type GameFull = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: SystemRequirements;
  screenshots: Array<Screenshots>;
};

export type Filters = {
  platform: string;
  category: string;
  sortBy: string;
};

export const paramByFilter: Record<keyof Filters, string> = {
  platform: 'platform',
  category: 'category',
  sortBy: 'sort-by',
};

export async function getGamesList(
  params: { [key: string]: string },
  signal: AbortSignal,
) {
  const url = `${BASE_URL}/games`;

  const { data } = await axios.get<GamesList>(url, { ...config, signal, params });
  return data;
}

export async function getGameFull(params: { id: number }, signal: AbortSignal) {
  const url = `${BASE_URL}/game`;

  const { data } = await axios.get<GameFull>(url, { ...config, signal, params });
  return data;
}
