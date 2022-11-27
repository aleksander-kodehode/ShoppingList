import { Prisma } from "@prisma/client";
import { NextFunction } from "express";
import prisma from "../prisma/prismaClient";
//TODO: Make this work maybe, Or change delete list to soft delete instead of using middleware
export const softDelete = async () => {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/
  await prisma.$connect();
  console.log("starting soft delete");
  prisma.$use(async (params, next) => {
    // Check incoming query type
    console.log("inside function");
    if (params.model == "ShoppingList") {
      console.log("--> shoppingList");
      if (params.action == "delete") {
        // Delete queries
        // Change action to an update
        params.action = "update";
        params.args["data"] = { deleted: true };
      }
      console.log("--> Changed actions to update instead");
      if (params.action == "deleteMany") {
        // Delete many queries
        params.action = "updateMany";
        if (params.args.data != undefined) {
          params.args.data["deleted"] = true;
        } else {
          params.args["data"] = { deleted: true };
        }
      }
    }
    return next(params);
  });
};
