import RickAndMortyUSA from "../integrations/rickAndMortyUSA";

export default class RickAndMortyUSAAdapter {
  static async getCharaters() {
    return RickAndMortyUSA.getCharactersFromXML();
  }
}
