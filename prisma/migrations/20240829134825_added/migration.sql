-- AlterTable
ALTER TABLE `journey` ADD COLUMN `progress_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(191) NOT NULL,
    `meditate` BOOLEAN NOT NULL DEFAULT false,
    `praying` BOOLEAN NOT NULL DEFAULT false,
    `gym` BOOLEAN NOT NULL DEFAULT false,
    `reading` BOOLEAN NOT NULL DEFAULT false,
    `water` BOOLEAN NOT NULL DEFAULT false,
    `work` BOOLEAN NOT NULL DEFAULT false,
    `journaling` BOOLEAN NOT NULL DEFAULT false,
    `diet` BOOLEAN NOT NULL DEFAULT false,
    `week_split_id` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Journey` ADD CONSTRAINT `Journey_progress_id_fkey` FOREIGN KEY (`progress_id`) REFERENCES `Progress`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
