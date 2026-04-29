import { describe, test, expect, beforeEach } from 'vitest';
import { createVideogame } from '../src/gameFunctions';
import { Game } from '../src/gameSchema';

beforeEach(async () => {
  await Game.deleteMany();
});

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

describe('Pruebas para la creación de juegos', () => {
  test('Debe devolver un caso exitoso', async () => {
    const result = await createVideogame(myGame);
    expect(result).toEqual('Juego añadido con exito');
  });

  test('Debe dar error si se intenta añadir un videojuego con titutlo ya registrado', async () => {
    await createVideogame(myGame);

    const myGame2 = new Game({
      title: 'Zelda',
      developer: 'EA',
      publisher: 'Nintendo',
      genre: ['Action'],
      platform: ['PS5'],
      releaseDate: new Date(),
      price: 14.99,
      score: 85,
    });

    await createVideogame(myGame2).catch((error) => {
      expect(error.message).toEqual('El título del juego ya existe');
    });
  });
});
