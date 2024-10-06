-- AlterTable
ALTER TABLE `gymsplitdays` ADD COLUMN `weekSplitId` INTEGER NULL;

-- AlterTable
ALTER TABLE `journey` ADD COLUMN `week_split_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `WeekSplit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monday` VARCHAR(191) NULL,
    `tuesday` VARCHAR(191) NULL,
    `wednesday` VARCHAR(191) NULL,
    `thursday` VARCHAR(191) NULL,
    `friday` VARCHAR(191) NULL,
    `saturday` VARCHAR(191) NULL,
    `sunday` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GymSplitDays` ADD CONSTRAINT `GymSplitDays_weekSplitId_fkey` FOREIGN KEY (`weekSplitId`) REFERENCES `WeekSplit`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_week_split_id_fkey` FOREIGN KEY (`week_split_id`) REFERENCES `WeekSplit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
