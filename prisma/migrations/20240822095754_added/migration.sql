/*
  Warnings:

  - You are about to drop the column `enable` on the `journey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `journey` DROP COLUMN `enable`,
    ADD COLUMN `gym_split_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `GymSplit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GymSplitDays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day_name` VARCHAR(191) NOT NULL,
    `split` VARCHAR(191) NOT NULL,
    `gym_split_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupMuscle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GymSplitDaysMuscle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gym_split_day_id` INTEGER NOT NULL,
    `group_muscle_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GymSplitDays` ADD CONSTRAINT `GymSplitDays_gym_split_id_fkey` FOREIGN KEY (`gym_split_id`) REFERENCES `GymSplit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GymSplitDaysMuscle` ADD CONSTRAINT `GymSplitDaysMuscle_gym_split_day_id_fkey` FOREIGN KEY (`gym_split_day_id`) REFERENCES `GymSplitDays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GymSplitDaysMuscle` ADD CONSTRAINT `GymSplitDaysMuscle_group_muscle_id_fkey` FOREIGN KEY (`group_muscle_id`) REFERENCES `GroupMuscle`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_gym_split_id_fkey` FOREIGN KEY (`gym_split_id`) REFERENCES `GymSplit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
