-- CreateTable
CREATE TABLE `Tower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `modelUrl` TINYTEXT NOT NULL,
    `description` TEXT NOT NULL,
    `price` INTEGER NOT NULL,
    `range` INTEGER NOT NULL,
    `damage` INTEGER NOT NULL,
    `cooldown` INTEGER NOT NULL,

    UNIQUE INDEX `Tower_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
