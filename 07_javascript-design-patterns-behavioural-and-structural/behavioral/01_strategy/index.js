import ContextStrategy from "./src/base/contextStrategy.js";
import MongoDBStrategy from "./src/strategies/mongoDBStrategy.js";
import PostgresStrategy from "./src/strategies/postgresStrategy.js";

const postgresConnectionString =
  "postgres://igorcotrim:igor1234@localhost:5432/heroes";
const postgresContext = new ContextStrategy(
  new PostgresStrategy(postgresConnectionString)
);

await postgresContext.connect();

const mongodbConnectionString =
  "mongodb://igorcotrim:admin@localhost:27017/heroes";
const mongoDBContext = new ContextStrategy(
  new MongoDBStrategy(mongodbConnectionString)
);

await mongoDBContext.connect();

const data = [
  {
    name: "igorcotrim",
    type: "transaction",
  },
  {
    name: "mariasilva",
    type: "activityLog",
  },
];

const contextTypes = {
  transaction: postgresContext,
  activityLog: mongoDBContext,
};

for (const { type, name } of data) {
  const context = contextTypes[type];

  await context.create({ name: name + Date.now() });

  console.log(type, context.dbStrategy.constructor.name);
  console.log(await context.read());
}
