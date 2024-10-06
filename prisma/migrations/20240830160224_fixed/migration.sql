/*
  Warnings:

  - You are about to drop the column `progress_id` on the `journey` table. All the data in the column will be lost.
  - You are about to drop the column `week_split_id` on the `progress` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `journey` DROP FOREIGN KEY `Journey_progress_id_fkey`;

-- AlterTable
ALTER TABLE `journey` DROP COLUMN `progress_id`,
    ADD COLUMN `journalId` INTEGER NULL,
    ADD COLUMN `progressId` INTEGER NULL;

-- AlterTable
ALTER TABLE `progress` DROP COLUMN `week_split_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Journal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `spiritual` VARCHAR(191) NOT NULL,
    `physical` VARCHAR(191) NOT NULL,
    `mental` VARCHAR(191) NOT NULL,
    `reflection` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `Progress`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_journalId_fkey` FOREIGN KEY (`journalId`) REFERENCES `Journal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
