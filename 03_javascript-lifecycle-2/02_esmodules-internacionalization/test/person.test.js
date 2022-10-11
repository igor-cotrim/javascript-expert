import { describe, it } from "mocha";
import { expect } from "chai";

import Person from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "2 Bike,Aviao,Navio 2000000 2000-01-01 2002-01-01"
    );
    const expected = {
      id: "2",
      from: "2000-01-01",
      to: "2002-01-01",
      vehicles: ["Bike", "Aviao", "Navio"],
      kmTraveled: "2000000",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      id: "2",
      from: "2000-01-01",
      to: "2002-01-01",
      vehicles: ["Bike", "Aviao", "Navio"],
      kmTraveled: "2000000",
    });
    const result = person.formatted("pt-BR");
    const expected = {
      id: 2,
      vehicles: "Bike, Aviao e Navio",
      kmTraveled: "2.000.000 km",
      from: "01 de janeiro de 2000",
      to: "01 de janeiro de 2002",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
