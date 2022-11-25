/*
  Warnings:

  - The primary key for the `listData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `itemId` to the `listData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listData` DROP PRIMARY KEY,
    ADD COLUMN `itemId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`itemId`);
