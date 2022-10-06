true + 2;
// 3
true - 2;
//-1
"21" + true;
//'21true'
"21" - true;
//20
9999999999999999; //16
//10000000000000000
0.1 + 0.2 === 0.3;
//false
3 > 2 > 1;
//false
"21" - -1;
//22

//-----------------------------
console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "explicit convertion to string");
console.assert(
  ("hello" || 123) === "hello",
  "|| returns the first element if both are true"
);
console.assert(
  ("hello" && 123) === 123,
  "&& returns the last element if both are true"
);

//-----------------------------
const item = {
  name: "IgorCotrim",
  age: 23,
  // String: 1 se nao for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  // Number: 1 se nao for primitivo, chama o toString
  valueOf() {
    return { hey: "dude" };
    // return 007;
  },
  [Symbol.toPrimitive](coercionType) {
    // console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// // Vai retnroar Nan pos o toString retornou a string
// console.log("valueOf", Number(item));

//depois de adcionar o toPrimitive
// console.log("String", String(item));
// console.log("Number", Number(item));
// //Chama a conversao default!
// console.log("Date", new Date(item));

console.assert(item + 0 === '{"name":"IgorCotrim","age":23}0');
// console.log("!!item is true?", !!item);
console.assert(!!item);

// console.log("string.concat", "Ae".concat(item));
console.assert("Ae".concat(item) === 'Ae{"name":"IgorCotrim","age":23}');

// console.log("implicit + explicit coercion (using ==)", item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: "Fulano", age: 22 };
// console.log("New Object", item2);
console.assert(item2.name === "Fulano" && item2.age === 22);
