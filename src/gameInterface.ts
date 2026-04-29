export enum Genre {
  'Action',
  'RPG',
  'Strategy',
  'Puzzle',
  'Sports',
  'Simulation',
  'Horror',
  'Adventure',
}

export enum Platorm {
  'Pc',
  'PS5',
  'Xbox',
  'Switch',
  'Mobile',
}

interface DLC {
  name: string;
  priceEur: number;
}

export interface intGame {
  title: string;
  developer: string;
  publisher: string;
  genre: Genre[];
  platform: Platorm[];
  releaseDate: Date;
  price: number;
  score?: number;
  multiplayer: boolean;
  dlcs: DLC[];
}
