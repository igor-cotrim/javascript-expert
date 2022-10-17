const { describe, it } = require("mocha");
const { expect } = require("chai");

const Person = require("../src/person");

describe("Person", () => {
  it("should generate a person instance from properties list", () => {
    const content = [
      "Igor Cotrim",
      "brasileiro",
      "solteiro",
      "CPF 062.461.885-40",
      "residente e domiciliada a Rua dos bobos",
      "zero",
      "bairro Alphaville",
      "Bahia.",
    ];
    const result = new Person(content);
    const expected = {
      nome: "Igor Cotrim",
      nacionalidade: "Brasileiro",
      estadoCivil: "Solteiro",
      documento: "06246188540",
      rua: "Rua dos bobos",
      numero: "zero",
      bairro: "Alphaville",
      estado: "Bahia",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
