-- CreateTable
CREATE TABLE `authentications` (
    `id` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
