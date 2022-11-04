import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import OrderBusiness from "../src/business/orderBusiness.js";
import Order from "../src/entities/order.js";

describe("Test suit for Template Method design pattern", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#OrderBusiness", () => {
    test("execution Order Business without Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "ferrari" }],
      });
      const orderBusiness = new OrderBusiness();
      // Todos os devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execucao
      // se alguem esquecer de chamar a funcao de valdiacao, pode quebrar todo o sistema
      const isValid = orderBusiness._validateRequiredFields(order);
      const result = orderBusiness._create(order);

      expect(isValid).toBeTruthy();
      expect(result).toBeTruthy();
    });

    test("execution Order Business with Template Method", () => {
      const order = new Order({
        customerId: 1,
        amount: 100.0,
        products: [{ description: "ferrari" }],
      });
      const orderBusiness = new OrderBusiness();
      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      );
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      );

      // com template method, a sequencia de passos é sempre executada
      // evita a replicacao de logica
      const result = orderBusiness.create(order);

      expect(result).toBeTruthy();
      expect(calledValidationFn).toHaveBeenCalled();
      expect(calledCreateFn).toHaveBeenCalled();
    });
  });
});
