const assert = require("assert");

const myMap = new Map();

// podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Igor", { text: "two" })
  .set(true, () => "hello");

// usando um construtor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// console.log("myMap.get(1)", myMap.get(1));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Igor"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objetcts a chave so pode ser string ou symbol (number é coergido a string)
const onlyRefenceWorks = { id: 1 };
myMap.set(onlyRefenceWorks, { name: "IgorCotrim" });

// console.log("get", myMap.get(onlyRefenceWorks));
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), { name: "IgorCotrim" });

// utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// o jeito certo em Object é ({ name: 'Igor' }).hasOwnProperty('name')
assert.ok(myMap.has(onlyRefenceWorks));

// para remover um item do objeto
// delete item.id - imperformatico para o Javascript
assert.ok(myMap.delete(onlyRefenceWorks));

// nao da para iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
assert.deepStrictEqual(
  JSON.stringify([...myMap]),
  JSON.stringify([
    [1, "one"],
    ["Igor", { text: "two" }],
    [true, () => {}],
  ])
);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() => ['object Object']
// ({toString: () => 'Hey'}).toString() === 'Hey'

// qualquer chave pode colidir, com as propriedades heradas do objecto, como
// constructor, toString, valueOf e etc

const actor = {
  name: "Xuxa",
  toString: "Queen: Xuxa da Silva",
};

// nao tem restricao de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Nao da para limpar um Obj sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// -- WeakMap
// Pode ser coletado apos perder as referencias
// usado em casos bem especificos

// tem a maioria dos beneficios do Map
// MAS: nao é iteravel
// So chaves de referencia e que voce ja conhece
// mais leve e preve leak de memoria, pq depois que as instancias saeam da memoria, tudo é limpo

const weakMap = new WeakMap();
const hero = { name: "Flash" };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);
