-- DropForeignKey
ALTER TABLE `ShoppingList` DROP FOREIGN KEY `ShoppingList_creatorId_fkey`;

-- AddForeignKey
ALTER TABLE `ShoppingList` ADD CONSTRAINT `ShoppingList_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
