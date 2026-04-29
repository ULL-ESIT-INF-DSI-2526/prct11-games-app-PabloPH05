import { Game } from './gameSchema.js';
import { Genre, intGame, Platorm } from './gameInterface.js';
import './index.js';

interface filterOptions {
  genre?: Genre;
  platform?: Platorm;
  multiplayer?: boolean;
}

/**
 * Funcion para crear un documento de videojuego
 * @param videogame - Interfaz a añadir
 * @returns El mensaje de exito o un error dependiendo de si el juego ya estaba creado
 */
export async function createVideogame(videogame: intGame) {
  const gameToAdd = new Game(videogame);
  try {
    await gameToAdd.save();
    return 'Juego añadido con exito';
  } catch (error) {
    if (error.code === 11000) throw new Error('El título del juego ya existe');
    throw error;
  }
}

/**
 * Funcion para buscar un juego por el sigueinte filtro:
 * genre, platform y/o multiplayer.
 * @param filter - Objeto de filtro con los siguientes parametros
 * @returns Devuelve un array con los juegos buscados
 */
export async function findGames(filter: filterOptions) {
  try {
    const games = await Game.find(filter);

    if (games.length === 0) {
      throw new Error(
        'No se han encontrado juegos con el filtro especificado.',
      );
    }
    return games;
  } catch (error: any) {
    if (error) throw error;
  }
}

export async function findGameById(id: string) {
  try {
    const game = await Game.findById(id);
    return game;
  } catch (error) {
    if (error) throw new Error('No se ha encontrado el juego especificado.');
  }
}
