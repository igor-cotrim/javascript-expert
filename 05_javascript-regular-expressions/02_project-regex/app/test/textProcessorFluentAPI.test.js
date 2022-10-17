const { describe, it } = require("mocha");
const { expect } = require("chai");

const TextProcessorFluentAPI = require("../src/textProcessorFluentAPI");
const mock = require("./mock/valid");

describe("textProcessorFluentAPI", () => {
  it("#build", () => {
    const result = new TextProcessorFluentAPI(mock).build();

    expect(result).to.be.deep.equal(mock);
  });

  it("#extractPeopleData", () => {
    const result = new TextProcessorFluentAPI(mock).extractPeopleData().build();
    const expected = [
      [
        "Igor  Cotrim,  pessoa  jurídica  de  direito  privado,  inscrita  no  CNPJ  n°",
        "2222222222222, com sede em Rua a numero 111 , doravante denominado CONTRATADA e",
      ].join("\n"),
      [
        "DEV  MANIA,  pessoa  jurídica  de  direito  privado,  inscrita  no  CNPJ  n°",
        "23333333333, com sede em rua b, 222 , doravante denominado CONTRATANTE e neste ato",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("#divideTextInColumns", () => {
    const content = [
      [
        "Igor  Cotrim,  pessoa  jurídica  de  direito  privado,  inscrita  no  CNPJ  n°",
        "2222222222222, com sede em Rua a numero 111 , doravante denominado CONTRATADA e",
      ].join("\n"),
    ];
    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();
    const expected = [
      [
        "Igor  Cotrim",
        "  pessoa  jurídica  de  direito  privado",
        "  inscrita  no  CNPJ  n°\n2222222222222",
        " com sede em Rua a numero 111 ",
        " doravante denominado CONTRATADA e",
      ],
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
