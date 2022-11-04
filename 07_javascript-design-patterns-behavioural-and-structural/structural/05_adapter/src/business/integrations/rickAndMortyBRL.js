import axios from "axios";

import Character from "../../entities/character.js";

const URL = "https://rickandmortyapi.com/api/character";

export default class RickAndMortyBRL {
  static async getCharactersFromJSON() {
    const {
      data: { results = [] },
    } = await axios.get(URL);

    return results.map((data) => new Character(data));
  }
}
