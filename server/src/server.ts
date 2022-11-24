import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./routes";
import prisma from "./prisma/prismaClient";

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routing;
app.use(router);
// app.use("/lists", getUserPost);
// app.use("/user/", saveUser);

const prismaTest = async () => {
  await prisma.$connect();
  const createList = await prisma.listData.findMany({
    where: {
      shoppingListId: "faad2263-5207-4918-8efc-148cb52f41f3",
    },
  });
  console.log(createList);
};
prismaTest()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Prisma diconnected");
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });

// const prismaTest = async () => {
//   await prisma.$connect();
//   const createList = await prisma.user.create({
//     data: {
//       name: "Aleksander",
//       shoppingLists: {
//         create: {
//           title: "My new list",
//           listItems: {
//             create: [
//               {
//                 item: "Choco",
//               },
//               {
//                 item: "New choco",
//               },
//               {
//                 item: "bananas",
//               },
//             ],
//           },
//         },
//       },
//     },
//   });
//   console.log(createList);
// };

app.listen(process.env.APP_PORT);
console.log(`App running on port: ${process.env.APP_PORT}`);
