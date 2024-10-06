/*
  Warnings:

  - Added the required column `journey_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `journey_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Journey` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enable` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_journey_id_fkey` FOREIGN KEY (`journey_id`) REFERENCES `Journey`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
