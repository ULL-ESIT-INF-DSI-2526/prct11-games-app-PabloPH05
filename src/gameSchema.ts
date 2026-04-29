import { Schema, model } from 'mongoose';
import { intGame } from './gameInterface.js';

// export interface intGame {
//     title: string,
//     developer: string,
//     publisher: string,
//     genre: Genre[],
//     platform: Platorm[],
//     releaseDate: Date,
//     price: number,
//     score?: number,
//     multiplayer: boolean,
//     dlcs: DLC[]
// }

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  genre: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    required: true,
    validate: {
      validator: (value: string[]) => {
        return value.length > 0;
      },
      message: 'El array debe contener por lo menos un elemento',
    },
    enum: [
      'Action',
      'RPG',
      'Strategy',
      'Puzzle',
      'Sports',
      'Simulation',
      'Horror',
      'Adventure',
    ],
  },
  platform: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    required: true,
    validate: {
      validator: (value: string[]) => {
        return value.length > 0;
      },
      message: 'El array debe contener por lo menos un elemento',
    },
    enum: ['Pc', 'PS5', 'Xbox', 'Switch', 'Mobile'],
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    validate: {
      validator: (value: number) => {
        return value >= 0;
      },
      message: 'El precio debe no ser negativo',
    },
  },
  score: {
    type: Number,
    validate: {
      validator: (value: number) => {
        return value >= 0 && value <= 100;
      },
      message: 'La puntuación debe estar entre 0 y 100',
    },
  },
  multiplayer: {
    type: Boolean,
    default: false,
  },
  dlcs: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        priceEur: {
          type: Number,
          validate: {
            validator: (value: number) => {
              return value >= 0;
            },
            message: 'El precio del DLC debe no ser negativo',
          },
        },
      },
    ],
  },
});

export const Game = model<intGame>('Game', gameSchema);
