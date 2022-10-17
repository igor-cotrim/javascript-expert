const { evaluateRegex } = require("./util");
const Person = require("./person");

// o objetivo do Fluent API é executar tarefas como um pipeline, step by step
// e no fim, chama o build. MUITO similar ao padrao Builder
// a diferença que aqui é sobre processos, o Builder sobre construcao de objetos

class TextProcessorFluentAPI {
  // propriedade privada!
  #content;

  constructor(content) {
    this.#content = content;
  }

  extractPeopleData() {
    // ?<= fala que vai extrair os dados que virao depois desse grupo
    // [contratante|contratada] ou um ou outro, (e tem o flag no fim da expressao para pegar maiusculo e minusculo)
    // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaco
    // tudo acima fica dentro de um paraenteses para falar "vamos pegar dai para frente"

    // (?!s) nagative look around, vai ignorar os contratantes do fim do documento (que tem so espaco a frente deles)
    // .*\n pega qualquer coisa ate o primeiro \n
    // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

    // $ informa que a pesquisa acaba no fim da linha
    // g -> global
    // m -> multiline
    // i -> insensitive

    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gim
    );
    // faz o match para encontrar a string inteira que contem os dados que precisamos
    const onLyPerson = this.#content.match(matchPerson);
    this.#content = onLyPerson;

    return this;
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));

    return this;
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpaces, ""))
    );

    return this;
  }

  mapPerson() {
    // passa o array de itens para o constructor de pessoa
    this.#content = this.#content.map((line) => new Person(line));

    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = TextProcessorFluentAPI;
