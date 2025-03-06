-- CreateTable
CREATE TABLE `Enemy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TINYTEXT NOT NULL,
    `description` TEXT NOT NULL,
    `health` INTEGER NOT NULL,
    `damage` INTEGER NOT NULL,
    `physicalResistance` INTEGER NOT NULL,
    `magicalResistance` INTEGER NOT NULL,
    `playerLives` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
