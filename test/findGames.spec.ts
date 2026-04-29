import { describe, test, expect, beforeEach } from 'vitest';
import { findGames, createVideogame, findGameById } from '../src/gameFunctions';
import { Game } from '../src/gameSchema';
import { Genre } from '../src/gameInterface';

const myGame = new Game({
  title: 'Zelda',
  developer: 'Nintendo',
  publisher: 'Nintendo',
  genre: ['Action'],
  platform: ['PS5'],
  releaseDate: new Date(),
  price: 14.99,
  score: 85,
});

beforeEach(async () => {
  await Game.deleteMany();
});

describe('Pruebas para la función findGame', () => {
  test('Debe permitir buscar por un úncio campo', async () => {
    await createVideogame(myGame);

    const filter = { genre: 'Action' };
    const games = await findGames(filter);

    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0].genre).toContain('Action');
  });

  test('Debe permitir buscar por un varios campos', async () => {
    await createVideogame(myGame);

    const filter = { genre: 'Action', platform: 'PS5' };
    const games = await findGames(filter);

    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0].genre).toContain('Action');
  });
});
