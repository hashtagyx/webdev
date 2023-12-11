const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

// Insert a single document using insertOne

const myDB = client.db("shopDB");

const myColl = myDB.collection("products");

const doc = { name: "Neapolitan pizza", shape: "round" };

(async function () {
  //   const result = await myColl.insertOne(doc);

  const findResult = await myColl.find();
  for await (const doc of findResult) {
    console.log(doc);
  }
  //   console.log(`A document was inserted with the _id: ${result.insertedId}`);
})();

// Insert multiple documents using insertMany

// (async function () {
//   try {
//     const myDB = client.db("shopliDB");

//     const myColl = myDB.collection("products");
//     const docs = [
//       { _id: 6, color: "purple" },

//       { _id: 7, color: "yellow" },

//       { _id: 8, color: "blue" },
//     ];

//     const insertManyResult = await myColl.insertMany(docs);

//     const insertedCount = insertManyResult.insertedCount;

//     const insertedIds = insertManyResult.insertedIds;

//     console.log(`${insertedCount} documents were inserted.`);

//     for (const id of Object.values(insertedIds)) {
//       console.log(`Inserted a document with id ${id}`);
//     }
//   } catch (e) {
//     console.log("An error occurred while inserting documents:", e);
//   }
// })();
