import { GameFull, SystemRequirements } from '../../api/freeToPlayApi';

export const getGameDescription = (game: GameFull) => [
  {
    key: 'genre',
    label: 'Genre',
    children: game.genre,
  },
  {
    key: 'platform',
    label: 'Platform',
    children: game.platform,
  },
  {
    key: 'publisher',
    label: 'Publisher',
    children: game.publisher,
  },
  {
    key: 'release_date',
    label: 'Release date',
    children: new Date(game.release_date).toLocaleDateString(),
  },
  {
    key: 'developer',
    label: 'Developer',
    span: 2,
    children: game.developer,
  },
  {
    key: 'description',
    children: <div style={{ textAlign: 'justify' }}>{game.description}</div>,
  },
];

export const getGameRequirements = (requirements: SystemRequirements) => [
  {
    key: 'os',
    label: 'Os',
    children: requirements?.os,
  },
  {
    key: 'processor',
    label: 'Processor',
    children: requirements?.processor,
  },
  {
    key: 'graphics',
    label: 'Graphics',
    children: requirements?.graphics,
  },
  {
    key: 'memory',
    label: 'Memory',
    children: requirements?.memory,
  },
  {
    key: 'storage',
    label: 'Storage',
    children: requirements?.storage,
  },
];
