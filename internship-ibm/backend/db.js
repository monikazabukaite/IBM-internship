// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const { MongoClient } = require("mongodb");

// export const getMongoClient = () => {
//   const uri = process.env.DATABASE_CONNECTION_STRING;
//   console.log(uri);

//   const client = new MongoClient(uri);
//   return client;
// };

// // const database = client.database("internship_project");
// // const coll = db.collection("userActions");

// // const docs = [
// //   {
// //     userId: "192.168.10.24",
// //     searchPhrase: "Apple Inc",
// //     dateFrom: "2022-07-10",
// //     dateTo: "2022-07-13",
// //   },
// //   {
// //     userId: "192.168.10.25",
// //     searchPhrase: "Apple Inc",
// //     dateFrom: "2022-07-10",
// //     dateTo: "2022-07-13",
// //   },
// //   {
// //     userId: "192.168.10.26",
// //     searchPhrase: "Apple Inc",
// //     dateFrom: "2022-07-10",
// //     dateTo: "2022-07-13",
// //   },
// //   {
// //     userId: "192.168.10.27",
// //     searchPhrase: "Apple Inc",
// //     dateFrom: "2022-07-10",
// //     dateTo: "2022-07-13",
// //   },
// // ];
// // const result = await coll.insertMany(docs);
