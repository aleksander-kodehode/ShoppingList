import express from "express";
import cors from "cors";
import "dotenv/config";
import getUserPost from "./routes/getUserListsRoute";
import saveUser from "./routes/postUserSaveRoute";

const app = express();

//middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//routing;
app.use("/lists", getUserPost);
app.use("/user/", saveUser);

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
