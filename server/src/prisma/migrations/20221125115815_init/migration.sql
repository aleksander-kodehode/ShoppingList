-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `tokenId` VARCHAR(255) NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_tokenId_key`(`tokenId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShoppingList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creatorId` VARCHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `title` VARCHAR(100) NULL,
    `shoppingListId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `ShoppingList_shoppingListId_key`(`shoppingListId`),
    INDEX `ShoppingList_creatorId_fkey`(`creatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listData` (
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `isChecked` BOOLEAN NOT NULL DEFAULT false,
    `amount` INTEGER NOT NULL DEFAULT 1,
    `item` VARCHAR(255) NOT NULL,
    `shoppingListId` VARCHAR(36) NULL,

    UNIQUE INDEX `listData_item_key`(`item`),
    INDEX `listData_shoppingListId_fkey`(`shoppingListId`),
    PRIMARY KEY (`item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShoppingList` ADD CONSTRAINT `ShoppingList_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listData` ADD CONSTRAINT `listData_shoppingListId_fkey` FOREIGN KEY (`shoppingListId`) REFERENCES `ShoppingList`(`shoppingListId`) ON DELETE SET NULL ON UPDATE CASCADE;
