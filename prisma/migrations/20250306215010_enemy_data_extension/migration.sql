/*
  Warnings:

  - Added the required column `imageUrl` to the `Enemy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Enemy` ADD COLUMN `imageUrl` TINYTEXT NOT NULL;
